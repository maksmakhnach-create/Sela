"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleSections from "@/components/blog/ArticleSections";
import ArticleFaq from "@/components/blog/ArticleFaq";
import ReadingProgress from "@/components/blog/ReadingProgress";
import BackToTop from "@/components/blog/BackToTop";
import ShareButtons from "@/components/blog/ShareButtons";
import type { BlogPost } from "@/types/blog";

interface BlogArticleContentProps {
  post: BlogPost;
  articleUrl: string;
}

export default function BlogArticleContent({
  post,
  articleUrl,
}: BlogArticleContentProps) {
  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <article className="pb-20 md:pb-28">
        <ArticleHero
          title={post.title}
          description={post.description}
          image={post.image}
          imageAlt={post.imageAlt}
          date={post.date}
          readingTime={post.readingTime}
          category={post.category}
        />

        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px py-12 md:py-16">
            <ArticleSections
              content={post.content}
              heroImage={post.image}
              heroImageAlt={post.imageAlt}
            />

            <div className="pt-8 border-t border-beige/50">
              <ShareButtons title={post.title} url={articleUrl} />
            </div>

            <ArticleFaq items={post.faq ?? []} />

            <AnimatedSection className="mt-12 md:mt-16">
              <div className="text-center py-8 md:py-10 border-t border-beige/50">
                <Link
                  href="/contacts"
                  className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full bg-orange-gradient text-white hover:shadow-glow-orange hover:scale-[1.02] transition-all"
                >
                  Получить консультацию
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </article>
    </>
  );
}
