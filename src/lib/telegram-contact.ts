import { PERSONAL_DATA_CONSENT } from "@/data/legal";

interface ContactPayload {
  name: string;
  company: string;
  unp?: string;
  email: string;
  country?: string;
  phone?: string;
  priceListChannel?: "email" | "telegram";
  message: string;
  source?: "order" | "help";
  topic?: string;
  personalDataConsent?: boolean;
  consentVersion?: string;
  consentDocumentId?: string;
  consentAcceptedAt?: string;
}

function formatPriceListChannel(value: ContactPayload["priceListChannel"]): string {
  return value === "telegram" ? "Telegram" : "Электронная почта";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildTelegramMessage(
  data: ContactPayload,
  consentRecordedAt: string
): string {
  const phone = data.phone?.trim() || "Не указан";
  const unp = data.unp?.trim() || "Не указан";
  const country = data.country?.trim() || "Не указана";
  const channel = data.priceListChannel
    ? formatPriceListChannel(data.priceListChannel)
    : "Не указан";
  const title =
    data.source === "help"
      ? "<b>Заявка со страницы «Помощь»</b>"
      : "<b>Новая заявка с сайта SELA</b>";
  const topicLine = data.topic?.trim()
    ? [`<b>Тема:</b> ${escapeHtml(data.topic.trim())}`, ""]
    : [];

  return [
    title,
    "",
    ...topicLine,
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Компания:</b> ${escapeHtml(data.company)}`,
    `<b>УНП:</b> ${escapeHtml(unp)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Страна:</b> ${escapeHtml(country)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Прайс-лист:</b> ${escapeHtml(channel)}`,
    `<b>Сообщение:</b> ${escapeHtml(data.message)}`,
    "",
    "<b>Согласие на обработку ПД:</b> да (чекбокс установлен)",
    `<b>Версия согласия:</b> ${escapeHtml(data.consentVersion ?? PERSONAL_DATA_CONSENT.version)}`,
    `<b>Документ:</b> ${escapeHtml(data.consentDocumentId ?? PERSONAL_DATA_CONSENT.documentId)}`,
    `<b>Согласие (клиент):</b> ${escapeHtml(data.consentAcceptedAt?.trim() || "не передано")}`,
    `<b>Фиксация (сервер):</b> ${escapeHtml(consentRecordedAt)}`,
  ].join("\n");
}

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getTelegramConfig() {
  return {
    token: readEnv("TELEGRAM_BOT_TOKEN"),
    chatId: readEnv("TELEGRAM_CHAT_ID"),
  };
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function handleContactRequest(request: Request): Promise<Response> {
  const { token, chatId } = getTelegramConfig();

  if (!token || !chatId) {
    return jsonResponse({ error: "Telegram не настроен на сервере" }, 500);
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Некорректные данные формы" }, 400);
  }

  const name = body.name?.trim();
  const company = body.company?.trim();
  const unp = body.unp?.trim();
  const email = body.email?.trim();
  const country = body.country?.trim();
  const message = body.message?.trim();
  const phone = body.phone?.trim() ?? "";
  const priceListChannel = body.priceListChannel;
  const isHelp = body.source === "help";
  const topic = body.topic?.trim();

  if (!name || !company || !email || !message) {
    return jsonResponse({ error: "Заполните обязательные поля" }, 400);
  }

  if (isHelp && !phone) {
    return jsonResponse({ error: "Укажите телефон" }, 400);
  }

  if (!isHelp && (!unp || !country)) {
    return jsonResponse({ error: "Заполните обязательные поля" }, 400);
  }

  if (!isHelp && unp && !/^\d{9}$/.test(unp)) {
    return jsonResponse({ error: "Исправьте УНП: должно быть 9 цифр" }, 400);
  }

  if (!isHelp && priceListChannel !== "email" && priceListChannel !== "telegram") {
    return jsonResponse({ error: "Выберите способ получения прайс-листа" }, 400);
  }

  if (body.personalDataConsent !== true) {
    return jsonResponse(
      {
        error:
          "Чтобы отправить заявку, установите отметку о согласии на обработку персональных данных.",
      },
      400
    );
  }

  if (
    body.consentVersion !== PERSONAL_DATA_CONSENT.version ||
    body.consentDocumentId !== PERSONAL_DATA_CONSENT.documentId
  ) {
    return jsonResponse(
      { error: "Обновите страницу и подтвердите согласие на обработку персональных данных." },
      400
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return jsonResponse({ error: "Некорректный email" }, 400);
  }

  const consentRecordedAt = new Date().toISOString();
  const consentAcceptedAt = body.consentAcceptedAt?.trim();

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage(
          {
            name,
            company,
            unp,
            email,
            country,
            phone,
            priceListChannel,
            message,
            source: isHelp ? "help" : "order",
            topic,
            consentVersion: PERSONAL_DATA_CONSENT.version,
            consentDocumentId: PERSONAL_DATA_CONSENT.documentId,
            consentAcceptedAt,
          },
          consentRecordedAt
        ),
        parse_mode: "HTML",
      }),
    }
  );

  if (!telegramResponse.ok) {
    console.error("Telegram API error:", await telegramResponse.text());
    return jsonResponse(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      502
    );
  }

  return jsonResponse({ ok: true }, 200);
}
