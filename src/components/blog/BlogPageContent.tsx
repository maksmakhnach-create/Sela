"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BlogListing from "@/components/blog/BlogListing";
import type { BlogPostSummary } from "@/types/blog";

interface BlogPageContentProps {
  posts: BlogPostSummary[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const section = document.getElementById("blog-listing");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  return (
    <BlogListing
      posts={posts}
      initialCategory={searchParams.get("category") ?? "all"}
    />
  );
}
