"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WildberriesHero from "./WildberriesHero";
import SelaHeroLogo from "./SelaHeroLogo";
import HeroProductMarquee from "./HeroProductMarquee";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------
export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-x-hidden overflow-y-visible bg-warm-gradient">
      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 vignette z-[1]" />

      {/* Warm glow behind Wildberries block */}
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[50vw] max-w-[620px] h-[50vw] max-h-[620px] pointer-events-none z-[1]">
        <div
          className="w-full h-full rounded-full opacity-[0.2] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #D4A574 0%, #F5DFC8 45%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-0">
        <div className="relative grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-4 items-center w-full min-h-0 lg:min-h-[calc(100dvh-11rem)]">
          {/* ============ LEFT COLUMN: Text content ============ */}
          <div className="flex flex-col max-w-3xl">
            <SelaHeroLogo />

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg leading-relaxed text-[#5E5147] max-w-lg mb-10 mt-6 sm:mt-8 text-balance"
              variants={slideLeft}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              Оптовые поставки растворимого кофе и кофейных напитков высокого
              качества по РБ.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              <Link
                href="/catalog"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#B56A2E] text-white font-semibold rounded-premium overflow-hidden transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_32px_rgba(181,106,46,0.3)] hover:scale-[1.03] active:scale-[0.98] touch-target"
              >
                <span className="relative z-10">Каталог продукции</span>
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-[#B56A2E]/40 text-[#B56A2E] font-medium rounded-premium bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#B56A2E]/10 hover:border-[#B56A2E] hover:scale-[1.03] active:scale-[0.98] touch-target"
              >
                Связаться с нами
              </Link>
            </motion.div>
          </div>

          {/* ============ RIGHT COLUMN: Wildberries ============ */}
          <motion.div
            className="relative flex items-center justify-center w-full min-h-[280px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[calc(100dvh-10rem)] overflow-visible -mx-1 sm:mx-0"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={0.7}
          >
            <WildberriesHero />
          </motion.div>
        </div>
      </div>

      <HeroProductMarquee />
    </section>
  );
}
