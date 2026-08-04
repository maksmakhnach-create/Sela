"use client";

import { motion, useReducedMotion } from "framer-motion";

function BeanIcon({
  className = "",
  size,
}: {
  className?: string;
  size?: number;
}) {
  const dimensionProps =
    size !== undefined
      ? { width: size, height: size * 1.45 }
      : {};

  return (
    <svg
      {...dimensionProps}
      viewBox="0 0 24 36"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse
        cx="12"
        cy="18"
        rx="9.5"
        ry="14.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 4.5 C10.2 18 13.8 31.5 12 31.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SelaHeroLogo() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="select-none"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative inline-block">
        <div
          className="inline-flex items-end font-hero font-extrabold uppercase text-primary leading-[0.85] tracking-[0.04em] text-[clamp(3.75rem,13vw,10rem)] drop-shadow-[0_2px_0_rgba(61,43,31,0.08)]"
          aria-hidden
        >
          <span className="relative inline-block">
            <motion.span
              className="absolute left-1/2 -translate-x-[58%] bottom-full mb-1 sm:mb-1.5 flex items-end gap-0.5 sm:gap-[0.06em] text-primary pointer-events-none"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BeanIcon className="w-[1.15rem] h-[1.65rem] sm:w-7 sm:h-[2.55rem] -rotate-[28deg] origin-bottom" />
              <BeanIcon className="w-[1.15rem] h-[1.65rem] sm:w-7 sm:h-[2.55rem] rotate-[22deg] origin-bottom" />
            </motion.span>
            S
          </span>

          <span>E</span>
          <span>L</span>

          <span className="relative inline-block">
            A
            <span className="absolute -right-[0.18em] sm:-right-[0.22em] bottom-[0.04em] flex flex-col items-center gap-[0.01em] text-primary pointer-events-none">
              <BeanIcon className="w-3 h-[1.15rem] sm:w-4 sm:h-[1.45rem] rotate-[18deg]" />
              <BeanIcon className="w-3 h-[1.15rem] sm:w-4 sm:h-[1.45rem] -rotate-[12deg]" />
            </span>
          </span>
        </div>
      </div>

      <h1
        className="mt-4 sm:mt-5 font-display font-extrabold text-primary leading-[1.05] text-[clamp(1.85rem,4.8vw,3.5rem)] text-balance drop-shadow-[0_2px_0_rgba(61,43,31,0.06)]"
      >
        <span className="bg-gradient-to-r from-[#3D2B1F] via-[#5E3D2A] to-[#B56A2E] bg-clip-text text-transparent">
          Кофе оптом в Беларуси
        </span>
      </h1>
    </motion.div>
  );
}
