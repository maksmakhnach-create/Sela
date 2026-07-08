"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const WILDBERRIES_URL = "https://www.wildberries.ru/seller/3924979";

export default function WildberriesHero() {
  const reduceMotion = useReducedMotion();

  const bounce = reduceMotion
    ? {}
    : {
        y: [0, 12, 0],
        transition: {
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const pulse = reduceMotion
    ? {}
    : {
        scale: [1, 1.05, 1],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <motion.div
      className="flex flex-col items-center text-center w-full max-w-[min(100%,520px)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative w-full max-w-[min(100%,480px)] aspect-[16/7]">
        <Image
          src="/images/wildberries-logo-nobg.png"
          alt="Wildberries"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 85vw, 480px"
        />
      </div>

      <div className="mt-6 sm:mt-8 w-full px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] border-2 border-[#B56A2E]/45 bg-white/55 backdrop-blur-sm">
        <p className="text-base sm:text-xl font-semibold tracking-[0.2em] uppercase text-[#8B6347]">
          мы есть на WILDBERRIES
        </p>
      </div>

      <motion.div
        className="mt-5 sm:mt-6 text-[#B56A2E]"
        animate={bounce}
        aria-hidden
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="sm:w-10 sm:h-10"
        >
          <path d="M12 16l-6-6h12l-6 6z" />
        </svg>
      </motion.div>

      <motion.a
        href={WILDBERRIES_URL}
        target="_blank"
        rel="noopener noreferrer"
        animate={pulse}
        className="mt-4 sm:mt-5 inline-flex items-center justify-center min-w-[220px] px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#B56A2E] text-white font-semibold text-lg sm:text-xl tracking-wide shadow-[0_6px_24px_rgba(181,106,46,0.3)] hover:brightness-110 transition-[filter] duration-300"
      >
        нажми тут
      </motion.a>
    </motion.div>
  );
}
