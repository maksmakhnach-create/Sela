"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { SeoFaqItem } from "@/data/seo-landings";

interface CoffeeBelarusFaqProps {
  items: SeoFaqItem[];
}

export default function CoffeeBelarusFaq({ items }: CoffeeBelarusFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border border-beige/80 bg-cream/30 transition-colors duration-300 ${
              isOpen ? "bg-cream/55" : "hover:bg-cream/45"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              className="flex w-full cursor-pointer items-start justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 font-display font-semibold text-primary text-left text-base sm:text-lg touch-target"
            >
              <span className="text-pretty pr-1">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-caramel-orange transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-primary/75 text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
