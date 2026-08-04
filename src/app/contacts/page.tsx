"use client";

import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import FeedbackForm from "@/components/FeedbackForm";

const socialLinks = [
  {
    name: "Wildberries",
    logo: "/images/social/wildberries-logo.webp",
    href: "https://www.wildberries.ru/seller/3924979",
    button: "Открыть на Wildberries",
    logoClass: "w-full h-full object-cover rounded-2xl",
    buttonClass:
      "bg-gradient-to-r from-[#7B2D8E] to-[#CB11AB] hover:from-[#8E35A3] hover:to-[#E015BC] text-white shadow-[0_8px_24px_rgba(123,45,142,0.28)]",
  },
  {
    name: "Instagram",
    logo: "/images/social/instagram-logo.webp",
    href: "https://www.instagram.com/sela_coffe/",
    button: "Перейти в Instagram",
    logoClass: "w-11 h-11 sm:w-12 sm:h-12 object-contain",
    buttonClass:
      "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110 text-white shadow-[0_8px_24px_rgba(221,42,123,0.28)]",
  },
  {
    name: "TikTok",
    logo: "/images/social/tiktok-logo.webp",
    href: "https://www.tiktok.com/@sela_coffe",
    button: "Смотреть в TikTok",
    logoClass: "w-11 h-11 sm:w-12 sm:h-12 object-contain",
    buttonClass:
      "bg-[#111111] hover:bg-[#1a1a1a] text-white border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
  },
];

const YANDEX_MAP_URL =
  "https://yandex.by/maps/10274/grodno/?ll=23.817020%2C53.639920&mode=routes&rtext=53.639923%2C23.816774&rtt=auto&ruri=&z=19.65";

const YANDEX_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?ll=23.817020%2C53.639920&z=19&pt=23.816774%2C53.639923%2Cpm2rdm";

export default function ContactsPage() {
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          <AnimatedSection className="h-full">
            <div className="bg-white rounded-card p-5 sm:p-8 lg:p-10 shadow-soft h-full">
              <h2 className="font-display text-2xl text-primary mb-8">
                Форма обратной связи
              </h2>
              <FeedbackForm />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="h-full">
            <div className="flex flex-col gap-8 h-full">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-card p-5 sm:p-8 shadow-soft">
                <h3 className="font-display text-xl text-primary mb-6">Мы есть тут</h3>
                <div className="space-y-5">
                  {socialLinks.map((social) => (
                    <div
                      key={social.name}
                      className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-beige/35 border border-beige/80"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 shadow-soft">
                        <Image
                          src={social.logo}
                          alt={social.name}
                          width={64}
                          height={64}
                          className={social.logoClass}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-primary/50 mb-2.5">{social.name}</p>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-target ${social.buttonClass}`}
                        >
                          {social.button}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-card p-5 sm:p-8 shadow-soft lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[140px] rounded-premium overflow-hidden bg-white/40">
                  <iframe
                    src={YANDEX_MAP_EMBED}
                    title="Карта — проспект Ивана Лебедева, 6, Гродно"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href={YANDEX_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center lg:text-left text-primary font-semibold text-base hover:text-accent transition-colors"
                >
                  Мы находимся тут: Ивана Лебедева 6
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
