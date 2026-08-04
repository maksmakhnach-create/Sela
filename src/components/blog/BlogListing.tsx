"use client";

import { useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import GlassSelect from "@/components/catalog/GlassSelect";
import { BLOG_CATEGORIES, type BlogPostSummary } from "@/types/blog";

type SortMode = "newest" | "popular" | "alphabetical";

const SORT_OPTIONS = [
  { value: "newest", label: "Самые новые" },
  { value: "popular", label: "Самые популярные" },
  { value: "alphabetical", label: "По алфавиту" },
] as const;

interface BlogListingProps {
  posts: BlogPostSummary[];
  initialCategory?: string;
}

export default function BlogListing({
  posts,
  initialCategory = "all",
}: BlogListingProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortMode>("newest");

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = posts.filter((post) => {
      const matchesCategory =
        category === "all" || post.category === category;
      const matchesSearch = !query || post.searchText.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (sort === "popular") {
      result = [...result].sort(
        (a, b) => Number(b.popular) - Number(a.popular),
      );
    } else if (sort === "alphabetical") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title, "ru"),
      );
    }

    return result;
  }, [posts, search, category, sort]);

  return (
    <section id="blog-listing" className="pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="glass-card rounded-premium p-5 sm:p-6 mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-3">
            Блог SELA
          </h1>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
            Полезные статьи о кофе, кофейных напитках, чае, поставках, бизнесе
            и выборе продукции.
          </p>

          <label className="block mb-5">
            <span className="text-sm font-semibold text-primary mb-2 block">
              Поиск по статьям
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Введите тему, бренд или вопрос..."
              className="w-full rounded-premium border border-beige/80 bg-white px-4 py-3 text-primary placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-caramel-orange/40"
            />
          </label>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category === item.id
                      ? "bg-orange-gradient text-white shadow-soft"
                      : "bg-white/80 text-primary hover:bg-cream"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-56 shrink-0">
              <GlassSelect
                label="Сортировка"
                value={sort}
                options={SORT_OPTIONS.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) => setSort(value as SortMode)}
              />
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-premium p-10 text-center">
            <p className="font-display text-2xl text-primary mb-3">
              Статей не найдено
            </p>
            <p className="text-text-muted">
              Попробуйте изменить запрос или выбрать другую категорию.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
