import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime, slugifyHeading } from "@/lib/blog-utils";
import type {
  BlogHeading,
  BlogPost,
  BlogPostMeta,
  BlogPostSummary,
} from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function extractHeadings(content: string): BlogHeading[] {
  const headings: BlogHeading[] = [];

  for (const line of content.split("\n")) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h2Match) {
      headings.push({
        level: 2,
        text: h2Match[1].trim(),
        id: slugifyHeading(h2Match[1]),
      });
    }

    if (h3Match) {
      headings.push({
        level: 3,
        text: h3Match[1].trim(),
        id: slugifyHeading(h3Match[1]),
      });
    }
  }

  return headings;
}

function parsePostFile(fileName: string): BlogPost {
  const filePath = path.join(BLOG_DIR, fileName);
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const post: BlogPost = {
    slug: (data.slug as string) || slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    date: data.date as string,
    author: (data.author as string) || "SELA",
    image: data.image as string,
    imageAlt: (data.imageAlt as string) || (data.title as string),
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
    faq: data.faq as BlogPostMeta["faq"],
    relatedSlugs: (data.relatedSlugs as string[]) || [],
    content,
    readingTime: calculateReadingTime(content),
    headings: extractHeadings(content),
  };

  return post;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"));

  return files
    .map(parsePostFile)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    date: post.date,
    author: post.author,
    image: post.image,
    imageAlt: post.imageAlt,
    featured: post.featured,
    popular: post.popular,
    faq: post.faq,
    relatedSlugs: post.relatedSlugs,
    readingTime: post.readingTime,
    searchText: `${post.title} ${post.description} ${post.content}`.toLowerCase(),
  }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 3): BlogPostSummary[] {
  return getPostSummaries()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getPopularPosts(
  limit = 3,
  excludeSlug?: string,
): BlogPostSummary[] {
  return getPostSummaries()
    .filter((post) => post.popular && post.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRelatedPosts(
  slug: string,
  relatedSlugs: string[] = [],
  limit = 3,
): BlogPostSummary[] {
  const allPosts = getPostSummaries().filter((post) => post.slug !== slug);

  const explicit = relatedSlugs
    .map((relatedSlug) =>
      allPosts.find((post) => post.slug === relatedSlug),
    )
    .filter((post): post is BlogPostSummary => Boolean(post));

  const fallback = allPosts
    .filter((post) => !explicit.some((item) => item.slug === post.slug))
    .slice(0, limit - explicit.length);

  return [...explicit, ...fallback].slice(0, limit);
}
