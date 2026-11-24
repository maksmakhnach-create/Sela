"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  buildConsent,
  canLoadAnalytics,
  COOKIE_OPEN_SETTINGS_EVENT,
  isConsentCurrent,
  persistCookieConsent,
  readCookieConsent,
  type CookieConsentState,
} from "@/lib/cookie-consent";

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    if (isConsentCurrent(stored)) {
      setAnalytics(stored.analytics);
      setBannerOpen(false);
    } else {
      setBannerOpen(true);
    }
    setReady(true);

    const onOpen = () => {
      const current = readCookieConsent();
      setAnalytics(current?.analytics ?? false);
      setSettingsOpen(true);
      setBannerOpen(false);
    };
    window.addEventListener(COOKIE_OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const apply = (nextAnalytics: boolean) => {
    const state = buildConsent(nextAnalytics);
    persistCookieConsent(state);
    setAnalytics(nextAnalytics);
    setBannerOpen(false);
    setSettingsOpen(false);
    if (!canLoadAnalytics(state)) {
      return;
    }
  };

  const saveChoice = (state: CookieConsentState | ReturnType<typeof buildConsent>) => {
    apply(state.analytics);
  };

  if (!ready) return null;

  return (
    <>
      <AnimatePresence>
        {bannerOpen && !settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 bottom-0 z-[45] p-3 sm:p-4 pointer-events-none"
          >
            <div className="pointer-events-auto max-w-3xl mx-auto rounded-3xl bg-[#FFF8F0] border border-beige shadow-[0_16px_48px_rgba(61,43,31,0.22)] p-4 sm:p-5">
              <p className="text-sm sm:text-[0.95rem] text-primary/85 leading-relaxed mb-4">
                Мы используем файлы Cookie, чтобы обеспечить корректную работу сайта и
                анализировать посещаемость. Вы можете принять все Cookie, отказаться от
                необязательных или настроить их использование. Подробнее — в{" "}
                <Link
                  href="/cookie-policy"
                  className="text-caramel-orange font-semibold hover:text-accent underline-offset-2 hover:underline"
                >
                  Политике использования Cookie
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => saveChoice(buildConsent(true))}
                  className="flex-1 min-h-11 rounded-full bg-caramel-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-accent transition-colors"
                >
                  Принять все
                </button>
                <button
                  type="button"
                  onClick={() => saveChoice(buildConsent(false))}
                  className="flex-1 min-h-11 rounded-full bg-white border border-beige text-primary text-sm font-semibold px-4 py-2.5 hover:border-accent transition-colors"
                >
                  Отклонить необязательные
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(true);
                    setBannerOpen(false);
                  }}
                  className="flex-1 min-h-11 rounded-full bg-primary text-beige text-sm font-semibold px-4 py-2.5 hover:bg-primary/90 transition-colors"
                >
                  Настроить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Закрыть настройки Cookie"
              className="absolute inset-0 bg-primary/40"
              onClick={() => {
                setSettingsOpen(false);
                if (!isConsentCurrent(readCookieConsent())) setBannerOpen(true);
              }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#FFF8F0] border border-beige shadow-[0_20px_50px_rgba(61,43,31,0.28)] p-5 sm:p-6"
            >
              <h2
                id="cookie-settings-title"
                className="font-display text-xl text-primary mb-2"
              >
                Настройки Cookie
              </h2>
              <p className="text-sm text-primary/65 mb-5">
                Выберите категории. Необходимые Cookie всегда активны.
              </p>

              <div className="space-y-3 mb-6">
                <div className="rounded-2xl border border-beige bg-white px-4 py-3.5">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="font-semibold text-primary">Необходимые Cookie</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-caramel-orange">
                      Всегда
                    </span>
                  </div>
                  <p className="text-sm text-primary/65">
                    Обеспечивают работу основных функций сайта и сохраняют ваш выбор
                    в этом окне.
                  </p>
                </div>

                <label className="block rounded-2xl border border-beige bg-white px-4 py-3.5 cursor-pointer">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="font-semibold text-primary">Аналитические Cookie</p>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="w-5 h-5 accent-[#B87333]"
                    />
                  </div>
                  <p className="text-sm text-primary/65">
                    Используются для анализа посещаемости. Помогают понимать, как
                    пользуются сайтом. Сейчас счётчики аналитики на сайте не
                    подключены и не запускаются без этого согласия.
                  </p>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => apply(analytics)}
                  className="flex-1 min-h-11 rounded-full bg-caramel-orange text-white text-sm font-bold px-4 py-2.5 hover:bg-accent transition-colors"
                >
                  Сохранить настройки
                </button>
                <button
                  type="button"
                  onClick={() => apply(false)}
                  className="flex-1 min-h-11 rounded-full bg-white border border-beige text-primary text-sm font-semibold px-4 py-2.5 hover:border-accent transition-colors"
                >
                  Отклонить необязательные
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
