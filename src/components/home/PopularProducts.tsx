"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "@/data/products";

const popular = products.slice(0, 4);

export default function PopularProducts() {
  return (
    <AnimatedSection className="py-20 md:py-32 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-14 md:mb-20">
          <span className="text-caramel-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Бестселлеры
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary">
            Хиты продаж SELA
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-premium overflow-hidden transition-all duration-400 hover:shadow-glow-orange"
            >
              <div className="relative aspect-square bg-cream/50 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-orange-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-400" />
                <Image
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  loading="lazy"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-base text-primary mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-2">
                  {product.description}
                </p>
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-gradient text-white text-sm font-medium rounded-card transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
                >
                  Подробнее
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
