import { slugifyHeading } from "@/lib/blog-utils";

export interface ParsedSection {
  id: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
  isConclusion: boolean;
  isTips: boolean;
}

const IMAGE_MD_RE = /!\[([^\]]*)\]\(([^)]+)\)/;
const CONCLUSION_RE = /^(итог|заключение)|от sela$/i;
const TIPS_RE = /совет/i;

export const ARTICLE_SECTION_FALLBACK_IMAGES = [
  "/images/categories/coffee-beans.webp",
  "/images/categories/bestsellers.webp",
  "/images/brand-story/coffee-hero.webp",
  "/images/categories/new-products.webp",
  "/images/about/coffee-cup-hero.webp",
] as const;

export const ARTICLE_BUSINESS_FALLBACK_IMAGES = [
  "/images/about/coffee-cafe-office.webp",
  "/images/categories/coffee-beans.webp",
  "/images/categories/bestsellers.webp",
  "/images/categories/new-products.webp",
  "/images/brand-story/coffee-hero.webp",
] as const;

export function parseArticleContent(content: string): {
  intro: string;
  sections: ParsedSection[];
} {
  const normalized = content.trim();

  if (!normalized) {
    return { intro: "", sections: [] };
  }

  let intro = "";
  let sectionSource = normalized;

  if (!normalized.startsWith("## ")) {
    const firstBreak = normalized.search(/\n## /);
    if (firstBreak !== -1) {
      intro = normalized.slice(0, firstBreak).trim();
      sectionSource = normalized.slice(firstBreak + 1);
    }
  }

  const sectionChunks = sectionSource
    .split(/^## /m)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const sections = sectionChunks.map((chunk) => {
    const newlineIndex = chunk.indexOf("\n");
    const title =
      newlineIndex === -1 ? chunk.trim() : chunk.slice(0, newlineIndex).trim();
    let body =
      newlineIndex === -1 ? "" : chunk.slice(newlineIndex + 1).trim();

    let image: ParsedSection["image"] | undefined;
    const imgMatch = body.match(IMAGE_MD_RE);

    if (imgMatch) {
      image = { alt: imgMatch[1] || title, src: imgMatch[2] };
      body = body.replace(imgMatch[0], "").trim();
    }

    const isConclusion = CONCLUSION_RE.test(title);
    const isTips = TIPS_RE.test(title);

    return {
      id: slugifyHeading(title),
      title: /^(итог|заключение)/i.test(title) ? "Заключение" : title,
      body,
      image,
      isConclusion,
      isTips,
    };
  });

  return { intro, sections };
}

export function resolveSectionImage(
  section: ParsedSection,
  index: number,
  fallbackAlt: string,
  heroImage: string,
  layout: "lifestyle" | "business" = "lifestyle",
): { src: string; alt: string } {
  if (section.image) {
    return section.image;
  }

  if (section.isConclusion) {
    return { src: heroImage, alt: fallbackAlt };
  }

  const pool =
    layout === "business"
      ? ARTICLE_BUSINESS_FALLBACK_IMAGES
      : ARTICLE_SECTION_FALLBACK_IMAGES;

  return {
    src: pool[index % pool.length],
    alt: section.title,
  };
}
