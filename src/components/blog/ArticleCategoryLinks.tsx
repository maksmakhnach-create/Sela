import Link from "next/link";
import { BLOG_CATEGORIES } from "@/types/blog";

const CATEGORY_LINKS = BLOG_CATEGORIES.filter((item) => item.id !== "all");

export default function ArticleCategoryLinks() {
  return (
    <section className="mt-12 glass-card rounded-premium p-6 sm:p-8">
      <h2 className="font-display text-2xl text-primary mb-5">
        Категории статей
      </h2>
      <div className="flex flex-wrap gap-3">
        {CATEGORY_LINKS.map((category) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.id}`}
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary hover:bg-cream hover:text-caramel-orange transition-colors"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
