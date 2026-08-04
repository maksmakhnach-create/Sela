"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/types/blog";

interface BlogRecommendedSectionProps {
  posts: BlogPostSummary[];
}

export default function BlogRecommendedSection({
  posts,
}: BlogRecommendedSectionProps) {
  if (posts.length === 0) return null;

  return (
    <AnimatedSection className="py-20 md:py-28 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <span className="text-gold text-sm font-medium tracking-widest uppercase mb-3 block">
              Блог SELA
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary text-balance">
              Рекомендуемые статьи
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-caramel-orange hover:gap-3 transition-all"
          >
            Все статьи
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
