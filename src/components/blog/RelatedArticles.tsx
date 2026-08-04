import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/types/blog";

interface RelatedArticlesProps {
  title: string;
  posts: BlogPostSummary[];
}

export default function RelatedArticles({ title, posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14 md:mt-16">
      <h2 className="font-display text-2xl sm:text-3xl text-primary mb-6 md:mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}
