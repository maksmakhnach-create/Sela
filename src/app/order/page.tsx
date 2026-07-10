"use client";

import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import FeedbackForm from "@/components/FeedbackForm";

export default function OrderPage() {
  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <h1 className="font-display text-2xl sm:text-5xl text-gold mb-4 md:mb-6 text-balance">
            Оформление заявки
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Заполните форму обратной связи, и мы отправим на вашу почту прайс-лист со всеми позициями из каталога.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-white rounded-card p-6 sm:p-10 md:p-12 lg:p-14 shadow-card">
            <h2 className="font-display text-2xl sm:text-3xl text-primary mb-8 md:mb-10">
              Форма обратной связи
            </h2>
            <FeedbackForm size="large" />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
