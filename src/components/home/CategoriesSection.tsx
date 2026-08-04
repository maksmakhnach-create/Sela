"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const categories = [
  {
    title: "Кофейные напитки",
    href: "/catalog",
    image:
      "/images/categories/coffee-beans.webp",
  },
  {
    title: "Растворимый чай",
    href: "/catalog",
    image:
      "/images/categories/tea.webp",
  },
  {
    title: "Новинки",
    href: "/catalog",
    image:
      "/images/categories/new-products.webp",
  },
  {
    title: "Хиты продаж",
    href: "/catalog",
    image:
      "/images/categories/bestsellers.webp",
  },
];

export default function CategoriesSection() {
  return (
    <AnimatedSection className="py-20 md:py-28 bg-espresso" direction="up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-gold text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
            Ассортимент
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white">
            Категории товаров
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="group relative block aspect-[16/10] sm:aspect-[16/9] rounded-premium overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                      {category.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      Смотреть
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
