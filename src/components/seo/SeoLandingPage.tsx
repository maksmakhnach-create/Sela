"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import type { SeoLanding } from "@/data/seo-landings";

interface SeoLandingPageProps {
  landing: SeoLanding;
}

export default function SeoLandingPage({ landing }: SeoLandingPageProps) {
  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
            SELA — оптовые поставки
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-beige mb-4 md:mb-6 text-balance">
            {landing.h1}
          </h1>
          <p className="text-base sm:text-lg text-white/65 max-w-2xl mx-auto text-balance">
            {landing.lead}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mb-10 md:mb-14">
          <article className="bg-white rounded-card p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="space-y-5 text-primary/90 text-base sm:text-lg leading-relaxed">
              {landing.seoText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10 md:mb-14">
          <div className="bg-white rounded-card p-6 sm:p-8 shadow-soft">
            <h2 className="font-display text-2xl sm:text-3xl text-primary mb-6">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {landing.faq.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-beige/80 bg-cream/40 open:bg-cream/60 transition-colors"
                >
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5 sm:py-5 font-display font-semibold text-primary text-left"
                  >
                    <span>{item.question}</span>
                    <span
                      className="text-caramel-orange shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      ▾
                    </span>
                  </summary>
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-text-muted text-base leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mb-10 md:mb-14">
          <div className="bg-white rounded-card p-6 sm:p-8 shadow-soft">
            <h2 className="font-display text-2xl sm:text-3xl text-primary mb-6">
              Полезные материалы
            </h2>
            <nav className="grid sm:grid-cols-2 gap-3">
              {landing.internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border border-beige/80 px-4 py-3.5 text-sm sm:text-base text-primary hover:border-caramel-orange hover:text-caramel-orange transition-colors duration-300"
                >
                  <span className="text-caramel-orange" aria-hidden>→</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative rounded-premium overflow-hidden bg-orange-gradient px-6 py-12 sm:px-10 sm:py-14 text-center">
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-warm-gold/30 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4 text-balance">
                {landing.ctaTitle}
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                {landing.ctaText}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/contacts"
                  className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 bg-white text-coffee font-bold rounded-premium transition-all duration-300 hover:shadow-hover hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                >
                  Оставить заявку
                </Link>
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 bg-white/15 text-white font-semibold rounded-premium border border-white/30 transition-all duration-300 hover:bg-white/25 w-full sm:w-auto"
                >
                  Открыть каталог
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
