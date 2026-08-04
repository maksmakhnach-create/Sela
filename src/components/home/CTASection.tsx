"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function CTASection() {
  return (
    <AnimatedSection className="py-20 md:py-32 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-premium overflow-hidden bg-orange-gradient px-8 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 text-center"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-warm-gold/30 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 text-balance">
              Закажите кофе оптом в Беларуси
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto text-balance">
              Оставьте заявку — менеджер SELA подберёт ассортимент и рассчитает
              оптовую цену с доставкой по РБ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-coffee font-bold rounded-premium transition-all duration-400 hover:shadow-hover hover:scale-[1.05] active:scale-[0.98]"
            >
              Заполнить форму
            </Link>
            <Link
              href="/coffee-belarus"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/15 text-white font-semibold rounded-premium border border-white/30 transition-all duration-400 hover:bg-white/25 hover:scale-[1.05] active:scale-[0.98]"
            >
              Кофе оптом в Беларуси
            </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
