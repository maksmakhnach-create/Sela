import type { BlogFaqItem } from "@/types/blog";

interface ArticleFaqProps {
  items: BlogFaqItem[];
}

export default function ArticleFaq({ items }: ArticleFaqProps) {
  if (!items?.length) return null;

  return (
    <section className="mt-12 md:mt-16 pt-10 border-t border-beige/50">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-6 md:mb-8">
        Частые вопросы
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-2xl border border-beige/80 bg-cream/30 open:bg-cream/50 transition-colors"
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 font-display font-semibold text-primary text-left"
            >
              <span>{item.question}</span>
              <span
                className="text-caramel-orange shrink-0 transition-transform group-open:rotate-180"
                aria-hidden
              >
                ▾
              </span>
            </summary>
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-primary/75 text-base leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
