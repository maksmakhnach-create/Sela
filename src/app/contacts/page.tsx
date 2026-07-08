"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-10 md:mb-16">
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
            Связаться с нами
          </span>
          <h1 className="font-display text-3xl sm:text-5xl text-beige mb-4 md:mb-6">
            Контакты
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          <AnimatedSection>
            <div className="bg-white rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
              <h2 className="font-display text-2xl text-primary mb-8">
                Форма обратной связи
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-primary mb-2">
                    Спасибо за обращение!
                  </h3>
                  <p className="text-primary/60">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-primary/70 mb-2 block">
                      Имя
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 bg-beige/50 border border-beige rounded-xl text-base text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary/70 mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-beige/50 border border-beige rounded-xl text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary/70 mb-2 block">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-beige/50 border border-beige rounded-xl text-primary focus:outline-none focus:border-accent transition-colors"
                      placeholder="+375 (__) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary/70 mb-2 block">
                      Сообщение
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-beige/50 border border-beige rounded-xl text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Ваше сообщение..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 bg-primary text-white font-medium rounded-2xl hover:bg-accent active:bg-accent transition-colors duration-300 touch-target"
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <div className="bg-white rounded-card p-5 sm:p-8 shadow-soft">
                <h3 className="font-display text-xl text-primary mb-6">
                  Контактная информация
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-beige rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-primary/50 mb-1">Телефон</p>
                      <a
                        href="tel:+375295889815"
                        className="text-primary font-medium hover:text-accent transition-colors"
                      >
                        +375 (29) 588-98-15
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-beige rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-primary/50 mb-1">Email</p>
                      <a
                        href="mailto:lcc.sela8@gmail.com"
                        className="text-primary font-medium hover:text-accent transition-colors"
                      >
                        lcc.sela8@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-beige rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-primary/50 mb-1">Адрес</p>
                      <p className="text-primary font-medium">
                        Гродно, ул. Ивана Лебедева, 6
                      </p>
                      <p className="text-sm text-primary/50 mt-1">
                        Пн–Пт: 9:00–20:00, Сб–Вс: 10:00–18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
