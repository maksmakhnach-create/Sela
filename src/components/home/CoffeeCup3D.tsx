"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const floatCup = {
  animate: {
    y: [0, -14, 0, 10, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function CoffeeCupImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] h-[min(70vh,580px)] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.3) 0%, rgba(245,223,200,0.1) 50%, transparent 75%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full overflow-visible"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          variants={floatCup}
          animate="animate"
          className="relative w-full h-full max-w-[680px] max-h-[min(75vh,620px)] mx-auto"
        >
          <Image
            src="/images/coffee-cup-hero-nobg.png"
            alt="Премиальная чашка кофе SELA"
            fill
            className="object-contain object-center drop-shadow-[0_28px_56px_rgba(61,43,31,0.2)]"
            sizes="(max-width: 768px) 90vw, 680px"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
