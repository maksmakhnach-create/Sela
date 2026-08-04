"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCategoryLabel } from "@/types/blog";
import type { BlogPostSummary } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostSummary;
  index?: number;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group glass-card rounded-premium overflow-hidden transition-all duration-300 hover:shadow-glow-orange"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream/50">
          <Image
            src={post.image}
            alt={post.imageAlt}
            title={post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
            {getCategoryLabel(post.category)}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-text-muted mb-3">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime} мин чтения</span>
          </div>

          <h2 className="font-display font-bold text-xl sm:text-2xl text-primary mb-3 text-balance group-hover:text-caramel-orange transition-colors">
            {post.title}
          </h2>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-5 line-clamp-3">
            {post.description}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-caramel-orange group-hover:gap-3 transition-all">
            Читать статью
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
