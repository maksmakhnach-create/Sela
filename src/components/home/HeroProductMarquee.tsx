"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const marqueeProductIds = [1, 4, 12, 16, 17, 18, 2, 13];

const marqueeProducts = marqueeProductIds
  .map((id) => products.find((product) => product.id === id))
  .filter((product): product is (typeof products)[number] => Boolean(product));

function ProductMarqueeItem({
  product,
}: {
  product: (typeof products)[number];
}) {
  const imageScale = product.imageScale ?? 1;
  const imageOffsetY = product.imageOffsetY ?? 0;

  return (
    <Link
      href="/catalog"
      className="group flex items-center gap-3 sm:gap-5 shrink-0 px-4 sm:px-7 py-3 sm:py-4 border-r border-primary/10 hover:bg-primary/5 transition-colors duration-300"
    >
      <div className="relative w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl sm:rounded-2xl bg-[#E3D2B1] shadow-[0_4px_16px_rgba(0,0,0,0.18)] overflow-visible shrink-0">
        <div className="absolute inset-x-1.5 sm:inset-x-2 -top-3 sm:-top-4 bottom-1.5 sm:bottom-2 overflow-visible">
          <div
            className="relative h-full w-full origin-bottom"
            style={{
              transform: `translateY(${imageOffsetY * 0.35}px) scale(${imageScale})`,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-bottom drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)]"
              sizes="88px"
            />
          </div>
        </div>
      </div>

      <p className="font-catalog font-extrabold text-sm sm:text-base text-primary group-hover:text-accent transition-colors duration-300 leading-tight max-w-[9.5rem] sm:max-w-[11rem] line-clamp-3">
        {product.name}
        {product.titleSubline && (
          <span className="block text-sm sm:text-base font-extrabold mt-0.5">
            {product.titleSubline}
          </span>
        )}
      </p>
    </Link>
  );
}

export default function HeroProductMarquee() {
  const items = [...marqueeProducts, ...marqueeProducts];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8 }}
      className="relative z-10 w-full px-3 sm:px-4 lg:px-6 safe-px mt-2 sm:mt-3 pb-6 sm:pb-8"
    >
      <div className="w-full max-w-none lg:max-w-[min(100%,1520px)] mx-auto rounded-2xl sm:rounded-[1.75rem] hero-marquee-bar backdrop-blur-sm border border-primary/10 shadow-[0_8px_28px_rgba(61,43,31,0.1)] overflow-hidden">
        <div className="relative overflow-hidden py-2.5 sm:py-3.5 marquee-pause">
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[rgba(255,232,189,0.95)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[rgba(255,232,189,0.95)] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex w-max items-stretch">
            {items.map((product, index) => (
              <ProductMarqueeItem
                key={`${product.id}-${index}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
