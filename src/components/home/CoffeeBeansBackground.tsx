"use client";

import { motion } from "framer-motion";

function CoffeeBean({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 40 58"
      fill="none"
      aria-hidden
    >
      <ellipse cx="20" cy="29" rx="17" ry="26" fill={color} />
      <path
        d="M20 5 C17 29 23 53 20 53"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

const beans = [
  { top: "6%", left: "4%", size: 28, rotation: -30, color: "#D4A574", opacity: 0.12, duration: 7, delay: 0 },
  { top: "12%", left: "82%", size: 42, rotation: 45, color: "#C9A88A", opacity: 0.1, duration: 9, delay: 0.5 },
  { top: "28%", left: "12%", size: 52, rotation: 15, color: "#A8826A", opacity: 0.06, duration: 11, delay: 1 },
  { top: "35%", left: "68%", size: 36, rotation: -55, color: "#D4A574", opacity: 0.11, duration: 8, delay: 1.5 },
  { top: "55%", left: "88%", size: 30, rotation: 70, color: "#C9A88A", opacity: 0.08, duration: 10, delay: 0.8 },
  { top: "62%", left: "6%", size: 44, rotation: -20, color: "#D4A574", opacity: 0.07, duration: 12, delay: 2 },
  { top: "72%", left: "42%", size: 24, rotation: 35, color: "#A8826A", opacity: 0.05, duration: 7.5, delay: 0.3 },
  { top: "18%", left: "48%", size: 20, rotation: -40, color: "#C9A88A", opacity: 0.1, duration: 8.5, delay: 1.8 },
  { top: "78%", left: "72%", size: 38, rotation: -65, color: "#D4A574", opacity: 0.08, duration: 9.5, delay: 2.5 },
  { top: "45%", left: "92%", size: 22, rotation: 25, color: "#C9A88A", opacity: 0.09, duration: 6.5, delay: 0.6 },
  { top: "85%", left: "22%", size: 34, rotation: 50, color: "#D4A574", opacity: 0.06, duration: 10.5, delay: 1.2 },
  { top: "40%", left: "28%", size: 18, rotation: -15, color: "#A8826A", opacity: 0.04, duration: 7, delay: 3 },
];

export default function CoffeeBeansBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute z-[1] max-md:top-[calc(env(safe-area-inset-top)+5.5rem)] max-md:left-0 max-md:right-0 max-md:translate-x-0 max-md:translate-y-0 max-md:flex max-md:justify-center md:top-[32%] md:left-[8%] lg:left-[10%] md:-translate-y-1/2"
        animate={{
          y: [0, -14, 0, 10, 0],
          rotate: [-3, 1, -3],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p
          className="font-display font-semibold uppercase leading-none text-center md:text-left
            max-md:text-[4.75rem] max-md:tracking-[0.1em] max-md:text-[#A8826A] max-md:opacity-[0.3] max-md:blur-none
            sm:max-md:text-[5.25rem]
            md:text-[clamp(6rem,12vw,11rem)] md:tracking-[0.28em] md:text-[#C9A88A] md:opacity-[0.15] md:blur-[1px]"
          style={{
            textShadow: "0 1px 24px rgba(162, 130, 106, 0.25)",
          }}
        >
          SELA
        </p>
      </motion.div>

      {beans.map((bean, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: bean.top,
            left: bean.left,
            opacity: bean.opacity,
            rotate: bean.rotation,
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            rotate: [bean.rotation, bean.rotation + 8, bean.rotation - 5, bean.rotation],
          }}
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CoffeeBean size={bean.size} color={bean.color} />
        </motion.div>
      ))}
    </div>
  );
}
