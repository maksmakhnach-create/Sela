import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { SEO_LANDING_SLUGS } from "@/data/seo-landings";

const pages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/catalog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/catalog?type=ground", changeFrequency: "weekly", priority: 0.8 },
  { path: "/catalog?type=beans", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/order", changeFrequency: "monthly", priority: 0.7 },
  ...SEO_LANDING_SLUGS.map((slug) => ({
    path: `/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
