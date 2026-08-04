import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site-url";
import ArticleJsonLd from "@/components/blog/ArticleJsonLd";
import BlogArticleContent from "@/components/blog/BlogArticleContent";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Статья не найдена | SELA",
    };
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      locale: "ru_BY",
      type: "article",
      siteName: "SELA",
      publishedTime: post.date,
      images: [
        {
          url: `${siteUrl}${post.image}`,
          alt: post.imageAlt,
        },
      ],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      <ArticleJsonLd post={post} />
      <BlogArticleContent post={post} articleUrl={articleUrl} />
    </>
  );
}
