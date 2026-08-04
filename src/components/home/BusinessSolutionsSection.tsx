"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const solutions = [
  {
    href: "/coffee-belarus",
    title: "Кофе оптом в Беларуси",
    description: "Оптовые поставки кофе по всей Республике Беларусь",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M4 8h12v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16 10h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8 6V5M12 6V5M8 20v1M12 20v1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/coffee-dlya-kofeen",
    title: "Кофе для кофеен",
    description: "Смеси для эспрессо и профессионального оборудования",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M6 10h10v6a3 3 0 01-3 3H9a3 3 0 01-3-3v-6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M16 11h1.5a2 2 0 010 4H16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M9 6c0-1.1.9-2 2-2h2a2 2 0 012 2v1H9V6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M8 20h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/coffee-dlya-restoranov",
    title: "Кофе для ресторанов",
    description: "Индивидуальные условия сотрудничества",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M4 10h16M6 10l1 9h10l1-9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 10V7a3 3 0 016 0v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8 6h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/coffee-dlya-ofisa",
    title: "Кофе для офисов",
    description: "Кофе для сотрудников и переговорных",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M4 20V9l8-4 8 4v11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 20v-5h6v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M10 9h4M12 7v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BusinessSolutionsSection() {
  return (
    <AnimatedSection className="pt-10 md:pt-14 pb-20 md:pb-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-caramel-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            SELA для бизнеса
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary text-balance">
            Решения для бизнеса
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {solutions.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group flex h-full aspect-square flex-col rounded-card glass-card p-5 sm:p-6 transition-all duration-300 hover:shadow-glow-orange hover:border-caramel-orange/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-orange/50"
              >
                <div
                  className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-gradient text-white shadow-soft transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow"
                >
                  {item.icon}
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-primary mb-3 text-balance">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed flex-1">
                  {item.description}
                </p>

                <span
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-caramel-orange transition-all duration-300 group-hover:gap-3"
                >
                  Подробнее
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
