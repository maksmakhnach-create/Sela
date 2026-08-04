import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/blog-utils";

type ArticleMarkdownVariant = "default" | "tips" | "conclusion";

interface ArticleMarkdownProps {
  content: string;
  variant?: ArticleMarkdownVariant;
}

function Heading2({
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  const text = String(children);
  return (
    <h2
      id={slugifyHeading(text)}
      className="font-display text-2xl sm:text-3xl font-bold text-primary mb-5 scroll-mt-28"
      {...props}
    >
      {children}
    </h2>
  );
}

function Heading3({
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  const text = String(children);
  return (
    <h3
      id={slugifyHeading(text)}
      className="flex items-start gap-3 font-display text-lg sm:text-xl font-bold text-primary mt-6 mb-2 scroll-mt-28"
      {...props}
    >
      <span className="article-h3-icon shrink-0 mt-1" aria-hidden />
      <span>{children}</span>
    </h3>
  );
}

export default function ArticleMarkdown({
  content,
  variant = "default",
}: ArticleMarkdownProps) {
  const listClass =
    variant === "tips"
      ? "article-tips-grid mb-8"
      : variant === "conclusion"
        ? "article-list-check mb-6"
        : "article-list-beans mb-6";

  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: Heading2,
          h3: Heading3,
          p: ({ children }) => (
            <p className="text-primary/85 text-base sm:text-lg leading-relaxed mb-5 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className={`${listClass} space-y-3 text-primary/85`}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="article-list-check space-y-3 mb-6 text-primary/85">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base sm:text-lg leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-primary">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-caramel-orange hover:underline font-medium"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={
                href?.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-8 rounded-2xl border border-beige/80">
              <table className="min-w-full text-sm sm:text-base">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-cream/80 text-primary">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold border-b border-beige/80">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-beige/50 text-primary/85">
              {children}
            </td>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;

            return (
              <span className="block my-8 relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={src}
                  alt={alt || "Иллюстрация в статье SELA"}
                  title={alt || "Иллюстрация в статье SELA"}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </span>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
