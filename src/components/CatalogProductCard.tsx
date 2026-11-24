"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GermanyFlag from "@/components/flags/GermanyFlag";
import ItalyFlag from "@/components/flags/ItalyFlag";
import NetherlandsFlag from "@/components/flags/NetherlandsFlag";
import PolandFlag from "@/components/flags/PolandFlag";
import SwitzerlandFlag from "@/components/flags/SwitzerlandFlag";
import AustriaFlag from "@/components/flags/AustriaFlag";
import type { Product } from "@/data/products";

interface CatalogProductCardProps {
  product: Product;
  index?: number;
  onSelect?: (product: Product) => void;
}

export default function CatalogProductCard({
  product,
  onSelect,
}: CatalogProductCardProps) {
  const imageFit = product.imageFit ?? "cover";
  const imageScale = product.imageScale ?? 1;
  const imageOffsetY = product.imageOffsetY ?? 0;
  const flagCountry = product.flagCountry ?? product.country;

  return (
    <motion.article
      initial={false}
      whileTap={onSelect ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={
        onSelect
          ? `Открыть карточку: ${product.titleSubline ? `${product.name} ${product.titleSubline}` : product.name}`
          : undefined
      }
      onClick={onSelect ? () => onSelect(product) : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(product);
              }
            }
          : undefined
      }
      className={`catalog-product-card group flex flex-col w-[92%] sm:w-full mx-auto rounded-[24px] sm:rounded-[28px] bg-[#E3D2B1] hover:bg-[#EDE4CE] overflow-visible px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-colors duration-300 ${
        onSelect
          ? "cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          : ""
      }`}
    >
      <div className="relative flex justify-center h-[190px] sm:h-[210px] -mt-8 sm:-mt-10 mb-0 overflow-visible">
        <div className="relative h-full w-[74%] sm:w-[70%] overflow-visible">
          <div
            className="absolute inset-0 origin-bottom"
            style={{ transform: `translateY(${imageOffsetY}px) scale(${imageScale})` }}
          >
            <Image
              src={product.image}
              alt={
                product.titleSubline
                  ? `${product.name} ${product.titleSubline}`
                  : product.name
              }
              title={product.titleSubline ? `${product.name} ${product.titleSubline}` : product.name}
              loading="lazy"
              fill
              className={
                imageFit === "contain"
                  ? "object-contain object-bottom drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  : "object-cover object-center rounded-2xl"
              }
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center px-1 pt-1">
        <h3 className="font-catalog font-extrabold text-[1.05rem] sm:text-lg text-primary leading-tight min-h-[2.75rem] sm:min-h-[3.1rem] text-balance tracking-tight">
          {product.name}
          {product.titleSubline && (
            <span className="block text-[1.05rem] sm:text-lg font-extrabold mt-0.5 tracking-tight">
              {product.titleSubline}
            </span>
          )}
        </h3>
        {(flagCountry === "Германия" ||
          flagCountry === "Италия" ||
          flagCountry === "Нидерланды" ||
          flagCountry === "Польша" ||
          flagCountry === "Швейцария" ||
          flagCountry === "Австрия") ? (
          <div className="flex flex-col items-center mt-1.5">
            <p className="font-catalog font-normal text-sm sm:text-[0.95rem] text-primary/75 tracking-wide mb-2">
              {product.weightLabel ?? "1 KG"}
            </p>
            {flagCountry === "Германия" ? (
              <GermanyFlag />
            ) : flagCountry === "Италия" ? (
              <ItalyFlag />
            ) : flagCountry === "Нидерланды" ? (
              <NetherlandsFlag />
            ) : flagCountry === "Швейцария" ? (
              <SwitzerlandFlag />
            ) : flagCountry === "Австрия" ? (
              <AustriaFlag />
            ) : (
              <PolandFlag />
            )}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-primary/55 leading-relaxed line-clamp-2 mt-1.5">
            {product.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}
