"use client";

import { motion } from "framer-motion";

function CoffeeBean({ size, color }: { size: number; color: string }) {
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
  { top: "8%", left: "6%", size: 36, rotation: -25, color: "#D4A574", opacity: 0.2 },
  { top: "22%", left: "88%", size: 48, rotation: 40, color: "#B87333", opacity: 0.18 },
  { top: "55%", left: "4%", size: 42, rotation: 15, color: "#D4A574", opacity: 0.15 },
  { top: "70%", left: "78%", size: 32, rotation: -50, color: "#A67C52", opacity: 0.18 },
  { top: "40%", left: "45%", size: 24, rotation: 30, color: "#D4A574", opacity: 0.12 },
  { top: "85%", left: "30%", size: 38, rotation: -15, color: "#B87333", opacity: 0.15 },
];

export default function CatalogBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(212,165,116,0.25)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(184,115,51,0.12)_0%,transparent_50%)]" />

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
            y: [0, -10, 0, 8, 0],
            rotate: [bean.rotation, bean.rotation + 5, bean.rotation - 3, bean.rotation],
          }}
          transition={{
            duration: 10 + i,
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
