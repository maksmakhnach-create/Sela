export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  popular?: boolean;
  faq?: BlogFaqItem[];
  relatedSlugs?: string[];
}

export interface BlogHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  readingTime: number;
  headings: BlogHeading[];
}

export interface BlogPostSummary extends BlogPostMeta {
  readingTime: number;
  searchText: string;
}

export const BLOG_CATEGORIES = [
  { id: "all", label: "Все статьи" },
  { id: "instant-coffee", label: "Растворимый кофе" },
  { id: "coffee-drinks", label: "Кофейные напитки" },
  { id: "instant-tea", label: "Растворимый чай" },
  { id: "wholesale", label: "Оптовые продажи" },
  { id: "for-shops", label: "Для магазинов" },
  { id: "for-cafes", label: "Для кофеен" },
  { id: "for-offices", label: "Для офисов" },
  { id: "business", label: "Бизнес" },
  { id: "tips", label: "Советы" },
  { id: "news", label: "Новости" },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export function getCategoryLabel(categoryId: string): string {
  const category = BLOG_CATEGORIES.find((item) => item.id === categoryId);
  return category?.label ?? "Статья";
}
