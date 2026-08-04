"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const reasons = [
  "Контроль качества кофе",
  "Поставки кофе оптом по Беларуси",
  "Индивидуальные оптовые условия",
  "Надёжные поставки для бизнеса",
  "Быстрая логистика по РБ",
];

export default function WhyChooseSection() {
  return (
    <AnimatedSection className="pt-10 md:pt-14 pb-20 md:pb-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-14 md:mb-20">
          <span className="text-caramel-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Наши сильные стороны
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary text-balance">
            Почему заказывают кофе оптом в Беларуси у SELA
          </h2>
          <p className="mt-5 text-text-muted text-base sm:text-lg max-w-2xl mx-auto text-balance">
            Европейские бренды, стабильные поставки и гибкие условия для магазинов,
            кафе, ресторанов и корпоративных клиентов.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ x: 8 }}
              className="group flex items-center gap-5 glass-card rounded-premium px-6 sm:px-8 py-5 sm:py-6 transition-all duration-400 hover:shadow-glow hover:border-caramel-orange/30"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-orange-gradient flex items-center justify-center text-white font-bold text-lg group-hover:shadow-glow transition-shadow duration-400">
                ✓
              </div>
              <p className="font-display font-semibold text-lg sm:text-xl text-primary">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
