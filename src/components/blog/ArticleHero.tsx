import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "@/types/blog";

interface ArticleHeroProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  readingTime: number;
  category: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function ArticleHero({
  title,
  description,
  image,
  imageAlt,
  date,
  readingTime,
  category,
}: ArticleHeroProps) {
  return (
    <header className="relative min-h-[440px] sm:min-h-[500px] md:min-h-[560px] max-h-[85vh] flex items-end overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        title={title}
        fill
        priority
        className="object-cover object-[62%_center] scale-105"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/88 via-primary/55 to-primary/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-black/10"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px pt-28 md:pt-32 pb-10 md:pb-14">
        <nav
          aria-label="Хлебные крошки"
          className="text-sm text-white/75 mb-6 flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Главная
          </Link>
          <span aria-hidden>↓</span>
          <Link href="/blog" className="hover:text-white transition-colors">
            Блог
          </Link>
          <span aria-hidden>↓</span>
          <span className="text-white/90 line-clamp-1">{title}</span>
        </nav>

        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white mb-4 md:mb-5 text-balance max-w-4xl leading-tight">
          {title}
        </h1>

        <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl mb-6 md:mb-8">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-white/90">
          <span className="inline-flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(date)}
          </span>

          <span className="inline-flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {readingTime} мин чтения
          </span>

          <span className="inline-flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {getCategoryLabel(category)}
          </span>
        </div>
      </div>
    </header>
  );
}
