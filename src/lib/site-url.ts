/** Базовый URL сайта для sitemap, robots и metadata. */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    "http://localhost:3000";

  return url.replace(/\/$/, "");
}
