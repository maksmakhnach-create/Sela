"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="hover:text-caramel-orange transition-colors duration-300"
    >
      Настройки Cookie
    </button>
  );
}
