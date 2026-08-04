import { Suspense } from "react";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getPostSummaries } from "@/lib/blog";
import BlogPageContent from "@/components/blog/BlogPageContent";

const siteUrl = getSiteUrl();
const title = "Блог SELA — статьи о кофе, чае и оптовых поставках";
const description =
  "Полезные статьи о кофе, кофейных напитках, чае, поставках, бизнесе и выборе продукции от SELA в Беларуси.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/blog`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

function BlogListingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px pb-20">
      <div className="glass-card rounded-premium p-10 text-center text-text-muted">
        Загрузка статей...
      </div>
    </div>
  );
}

export default function BlogPage() {
  const posts = getPostSummaries();

  return (
    <Suspense fallback={<BlogListingFallback />}>
      <BlogPageContent posts={posts} />
    </Suspense>
  );
}
