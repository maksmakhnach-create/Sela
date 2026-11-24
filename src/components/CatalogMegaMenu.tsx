"use client";

import Link from "next/link";
import { catalogMenuColumns } from "@/data/catalog-menu";

interface CatalogMegaMenuProps {
  onNavigate: () => void;
}

export default function CatalogMegaMenu({ onNavigate }: CatalogMegaMenuProps) {
  return (
    <div className="w-full bg-[#FFF8F0] border-t border-beige/70 shadow-[0_18px_48px_rgba(61,43,31,0.16)] max-h-[min(78vh,760px)] overflow-y-auto">
      <div className="max-w-[1440px] mx-auto px-6 xl:px-10 py-8 xl:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caramel-orange mb-2">
              Каталог SELA
            </p>
            <p className="font-display font-semibold text-xl text-primary">
              Категории и бренды
            </p>
          </div>
          <Link
            href="/catalog"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 rounded-full bg-caramel-orange px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(196,122,58,0.35)] hover:bg-accent hover:shadow-[0_10px_24px_rgba(196,122,58,0.45)] transition-all duration-200"
          >
            Смотреть весь каталог
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
          {catalogMenuColumns.map((column) => (
            <div key={column.type} className="min-w-0">
              <Link
                href={column.href}
                onClick={onNavigate}
                className="block font-display font-semibold text-primary hover:text-caramel-orange transition-colors mb-3 text-base"
              >
                {column.label}
              </Link>
              <ul className="space-y-1.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="block text-sm text-primary/70 hover:text-caramel-orange transition-colors py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
