"use client";

import { motion, useReducedMotion } from "framer-motion";

function BeanIcon({
  className = "",
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.45}
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
      <div
        className="inline-flex items-end font-hero font-extrabold uppercase text-primary leading-[0.85] tracking-[0.04em] text-[clamp(4.5rem,14vw,10rem)] drop-shadow-[0_2px_0_rgba(61,43,31,0.08)]"
        aria-hidden
      >
        <span className="relative inline-block">
          <motion.span
            className="absolute left-1/2 -translate-x-[58%] -top-[0.26em] flex items-end gap-[0.06em] text-primary"
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <BeanIcon size={28} className="-rotate-[28deg] origin-bottom" />
            <BeanIcon size={28} className="rotate-[22deg] origin-bottom" />
          </motion.span>
          S
        </span>

        <span>E</span>
        <span>L</span>

        <span className="relative inline-block">
          A
          <span className="absolute -right-[0.22em] bottom-[0.04em] flex flex-col items-center gap-[0.01em] text-primary">
            <BeanIcon size={16} className="rotate-[18deg]" />
            <BeanIcon size={16} className="-rotate-[12deg]" />
          </span>
        </span>
      </div>

      <h1 className="mt-3 sm:mt-4 font-display font-extrabold text-primary leading-[1.02] text-[clamp(1.75rem,4.2vw,3.25rem)]">
        <span className="block">Премиальный</span>
        <span className="block">кофе для</span>
        <span className="block">вашего бизнеса</span>
      </h1>
    </motion.div>
  );
}
