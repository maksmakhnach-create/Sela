"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CatalogProductCard from "@/components/CatalogProductCard";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import GlassSelect from "@/components/catalog/GlassSelect";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "@/data/products";

const ITEMS_PER_PAGE = 12;

const typeLabels: Record<string, string> = {
  beans: "Зерновой кофе",
  ground: "Молотый кофе",
  instant: "Растворимый кофе",
  drink: "Кофейный напиток",
  cappuccino: "Капучино",
  "instant-tea": "Чай растворимый",
  "pastry-filling": "Массовая начинка",
  toothpaste: "Зубная паста",
};

const countries = [...new Set(products.map((p) => p.country))];
const brands = [...new Set(products.map((p) => p.brand))].sort();

const countryOptions = [
  { value: "", label: "Все страны" },
  ...countries.map((c) => ({ value: c, label: c })),
];

const brandOptions = [
  { value: "", label: "Все бренды" },
  ...brands.map((b) => ({ value: b, label: b })),
];

const typeOptions = [
  { value: "", label: "Все" },
  ...Object.entries(typeLabels).map(([key, label]) => ({
    value: key,
    label,
  })),
];

function isValidType(value: string): value is keyof typeof typeLabels {
  return value in typeLabels;
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type") ?? "";
    setSelectedType(isValidType(type) ? type : "");
    setCurrentPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCountry && p.country !== selectedCountry) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedType && p.type !== selectedType) return false;
      return true;
    });
  }, [selectedCountry, selectedBrand, selectedType]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSelectedCountry("");
    setSelectedBrand("");
    setSelectedType("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCountry || selectedBrand || selectedType;

  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <h1 className="font-display text-3xl sm:text-5xl text-beige">
            Наши товары
          </h1>
        </AnimatedSection>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <aside className="lg:col-span-1 relative z-30">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden w-full flex items-center justify-between catalog-filter-bg rounded-[24px] p-4 mb-4 touch-target"
            >
              <span className="font-display text-lg text-primary">Фильтры</span>
              <svg
                className={`w-5 h-5 text-primary transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`relative overflow-visible catalog-filter-bg rounded-[28px] p-5 sm:p-6 lg:sticky lg:top-24 shadow-card ${filtersOpen ? "block" : "hidden lg:block"}`}
            >
              <h3 className="font-display text-lg text-primary mb-6 hidden lg:block">
                Фильтры
              </h3>

              <div className="space-y-5 sm:space-y-6">
                <GlassSelect
                  label="Страна"
                  value={selectedCountry}
                  options={countryOptions}
                  onChange={(val) => {
                    setSelectedCountry(val);
                    setCurrentPage(1);
                  }}
                />

                <GlassSelect
                  label="Бренд"
                  value={selectedBrand}
                  options={brandOptions}
                  onChange={(val) => {
                    setSelectedBrand(val);
                    setCurrentPage(1);
                  }}
                />

                <GlassSelect
                  label="Вид"
                  value={selectedType}
                  options={typeOptions}
                  onChange={(val) => {
                    setSelectedType(val);
                    setCurrentPage(1);
                  }}
                />

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="w-full py-3 text-sm text-accent hover:text-coffee transition-colors touch-target"
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            </motion.div>
          </aside>

          <div className="lg:col-span-3 relative z-10">
            <p className="text-sm text-beige/70 mb-6 sm:mb-8">
              Найдено: {filtered.length} товаров
            </p>

            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 pt-4">
                {paginated.map((product, index) => (
                  <CatalogProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-text-muted rounded-[28px] glass-card">
                По вашему запросу ничего не найдено
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-11 h-11 rounded-2xl border border-beige flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-target"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-2xl text-sm font-medium transition-colors touch-target ${
                        page === currentPage
                          ? "bg-orange-gradient text-white"
                          : "border border-beige text-text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 rounded-2xl border border-beige flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-target"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24" />
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
