"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Александр Петров",
    role: "Владелец кофейни «Аромат»",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    text: "Работаем с SELA уже три года. Стабильное качество, всегда вовремя доставляют. Наши гости отмечают отличный вкус кофе — это главное.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "Директор ресторана «Вкус»",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "Индивидуальный подход и гибкие условия — именно то, что нужно для ресторанного бизнеса. Рекомендую SELA как надёжного поставщика.",
    rating: 5,
  },
  {
    name: "Дмитрий Соколов",
    role: "Менеджер офиса IT-компании",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "Заказываем кофе и чай для офиса на 200 человек. SELA предложили оптимальные условия и широкий ассортимент. Сотрудники довольны!",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`Оценка ${count} из 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <AnimatedSection className="py-20 md:py-28 bg-coffee-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-gold text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            Отзывы
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Что говорят наши клиенты
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-card p-8 sm:p-10 text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-2 ring-gold/30">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <Stars count={testimonials[current].rating} />
              <p className="mt-6 text-text-secondary leading-relaxed text-base sm:text-lg italic">
                «{testimonials[current].text}»
              </p>
              <p className="mt-6 font-display font-semibold text-white">
                {testimonials[current].name}
              </p>
              <p className="text-sm text-text-secondary/70 mt-1">
                {testimonials[current].role}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Предыдущий отзыв"
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Отзыв ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-gold w-6" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Следующий отзыв"
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
