import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram не настроен на сервере" },
      { status: 500 }
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы" }, { status: 400 });
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
    return NextResponse.json(
      { error: "Заполните обязательные поля" },
      { status: 400 }
    );
  }

  if (!/^\d{9}$/.test(unp)) {
    return NextResponse.json(
      { error: "Исправьте УНП: должно быть 9 цифр" },
      { status: 400 }
    );
  }

  if (priceListChannel !== "email" && priceListChannel !== "telegram") {
    return NextResponse.json(
      { error: "Выберите способ получения прайс-листа" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
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
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
