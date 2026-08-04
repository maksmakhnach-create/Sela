"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GermanyFlag from "@/components/flags/GermanyFlag";
import ItalyFlag from "@/components/flags/ItalyFlag";
import NetherlandsFlag from "@/components/flags/NetherlandsFlag";
import PolandFlag from "@/components/flags/PolandFlag";
import type { Product } from "@/data/products";

interface CatalogProductCardProps {
  product: Product;
  index?: number;
}

export default function CatalogProductCard({
  product,
  index = 0,
}: CatalogProductCardProps) {
  const imageFit = product.imageFit ?? "cover";
  const imageScale = product.imageScale ?? 1;
  const imageOffsetY = product.imageOffsetY ?? 0;
  const flagCountry = product.flagCountry ?? product.country;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex flex-col rounded-[28px] bg-[#E3D2B1] hover:bg-[#EDE4CE] overflow-visible px-5 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-colors duration-300"
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
          flagCountry === "Польша") ? (
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
