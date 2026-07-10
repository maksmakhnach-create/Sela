"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const brands = [
  { name: "illy", logo: "/brands/illy.png" },
  { name: "Swisso Kaffee", logo: "/brands/swisso-kaffee.png" },
  { name: "Tchibo", logo: "/brands/tchibo.png" },
  { name: "Segafredo Zanetti", logo: "/brands/segafredo.png" },
  { name: "Mövenpick", logo: "/brands/movenpick.png" },
  { name: "Melitta", logo: "/brands/melitta.png" },
  { name: "Lucaffé", logo: "/brands/lucaffe.png" },
  { name: "Lavazza", logo: "/brands/lavazza.png" },
  { name: "King George", logo: "/brands/king-george.png" },
  { name: "Kimbo", logo: "/brands/kimbo.png" },
  { name: "Jacobs", logo: "/brands/jacobs.png" },
  { name: "Gevalia", logo: "/brands/gevalia.png" },
  { name: "Dallmayr", logo: "/brands/dallmayr.png" },
  { name: "Caffè Vergnano", logo: "/brands/vergnano.png" },
  { name: "Biorepair", logo: "/brands/biorepair.png" },
];

export default function BrandsSection() {
  return (
    <AnimatedSection className="pt-20 md:pt-32 pb-10 md:pb-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-balance">
            Бренды представленные у нас в магазине
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group glass-card rounded-card p-4 sm:p-5 aspect-[4/3] flex items-center justify-center transition-all duration-300 hover:shadow-glow-orange"
            >
              <div className="relative w-full h-full">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain p-0.5 sm:p-1 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
