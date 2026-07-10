interface ContactPayload {
  name: string;
  company: string;
  unp: string;
  email: string;
  country: string;
  phone?: string;
  priceListChannel: "email" | "telegram";
  message: string;
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

function buildTelegramMessage(data: ContactPayload): string {
  const phone = data.phone?.trim() || "Не указан";

  return [
    "<b>Новая заявка с сайта SELA</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Компания:</b> ${escapeHtml(data.company)}`,
    `<b>УНП:</b> ${escapeHtml(data.unp)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`,
    `<b>Страна:</b> ${escapeHtml(data.country)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Прайс-лист:</b> ${escapeHtml(formatPriceListChannel(data.priceListChannel))}`,
    `<b>Сообщение:</b> ${escapeHtml(data.message)}`,
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

  if (!name || !company || !unp || !email || !country || !message) {
    return jsonResponse({ error: "Заполните обязательные поля" }, 400);
  }

  if (!/^\d{9}$/.test(unp)) {
    return jsonResponse({ error: "Исправьте УНП: должно быть 9 цифр" }, 400);
  }

  if (priceListChannel !== "email" && priceListChannel !== "telegram") {
    return jsonResponse({ error: "Выберите способ получения прайс-листа" }, 400);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return jsonResponse({ error: "Некорректный email" }, 400);
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage({
          name,
          company,
          unp,
          email,
          country,
          phone,
          priceListChannel,
          message,
        }),
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
