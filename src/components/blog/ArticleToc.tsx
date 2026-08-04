import type { BlogHeading } from "@/types/blog";

interface ArticleTocProps {
  headings: BlogHeading[];
}

export default function ArticleToc({ headings }: ArticleTocProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Содержание статьи"
      className="glass-card rounded-premium p-5 sm:p-6 mb-8 lg:mb-0 lg:sticky lg:top-28"
    >
      <h2 className="font-display font-bold text-lg text-primary mb-4">
        Содержание
      </h2>
      <ol className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-text-muted hover:text-caramel-orange transition-colors leading-relaxed"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
