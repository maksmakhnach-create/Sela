"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  showPrice?: boolean;
  showBrand?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  showPrice = true,
  showBrand = false,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-card overflow-hidden shadow-soft hover:shadow-hover transition-shadow duration-500"
    >
      <div className="relative aspect-square overflow-hidden bg-beige">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="font-display text-base sm:text-lg text-primary mb-1">
          {product.name}
        </h3>
        {showBrand && (
          <p className="text-xs sm:text-sm text-accent font-medium mb-1">
            {product.brand}
          </p>
        )}
        <p className="text-sm text-primary/50 mb-3 sm:mb-4">{product.country}</p>
        <div
          className={`flex gap-3 ${
            showPrice
              ? "flex-col sm:flex-row sm:items-center sm:justify-between"
              : "flex-col"
          }`}
        >
          {showPrice && (
            <span className="font-display text-lg sm:text-xl text-accent">
              {product.price} ₽
            </span>
          )}
          <button
            className={`px-5 py-3 sm:py-2.5 bg-primary text-white text-sm font-medium rounded-2xl hover:bg-accent active:bg-accent transition-colors duration-300 touch-target ${
              showPrice ? "w-full sm:w-auto" : "w-full"
            }`}
          >
            В корзину
          </button>
        </div>
      </div>
    </motion.div>
  );
}
