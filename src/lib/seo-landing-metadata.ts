import type { Metadata } from "next";
import {
  type SeoLandingSlug,
  seoLandings,
} from "@/data/seo-landings";

export function getSeoLandingMetadata(slug: SeoLandingSlug): Metadata {
  const landing = seoLandings[slug];

  return {
    title: landing.title,
    description: landing.description,
    openGraph: {
      title: landing.title,
      description: landing.description,
    },
  };
}
