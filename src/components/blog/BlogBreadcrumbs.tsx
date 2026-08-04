import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav
      aria-label="Хлебные крошки"
      className="text-sm text-text-muted mb-6 md:mb-8"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-caramel-orange transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-primary font-medium" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-text-muted/50">↓</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
