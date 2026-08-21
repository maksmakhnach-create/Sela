import Image from "next/image";
import Link from "next/link";
import ArticleMarkdown from "@/components/blog/ArticleMarkdown";
import {
  parseArticleContent,
  resolveSectionImage,
  type ParsedSection,
} from "@/lib/article-content";

interface ArticleSectionsProps {
  content: string;
  heroImage: string;
  heroImageAlt: string;
  layout?: "lifestyle" | "business";
}

function SectionImage({
  src,
  alt,
  title,
  priority = false,
  layout = "lifestyle",
}: {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
  layout?: "lifestyle" | "business";
}) {
  const isBusiness = layout === "business";
  const isLogo = /sela-logo/i.test(src);

  if (isLogo) {
    return (
      <div
        className="aspect-[16/10] rounded-3xl ring-1 ring-beige/70 bg-white flex items-center justify-center p-6 sm:p-10"
      >
        <Image
          src={src}
          alt={alt}
          title={title}
          width={520}
          height={520}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="max-h-[min(280px,70%)] w-auto h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        isBusiness
          ? "aspect-[16/10] rounded-3xl ring-1 ring-beige/70 shadow-soft"
          : "aspect-[4/3] rounded-2xl shadow-card"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 520px"
      />
    </div>
  );
}

function ConclusionSection({
  section,
  image,
  layout = "lifestyle",
}: {
  section: ParsedSection;
  image: { src: string; alt: string };
  layout?: "lifestyle" | "business";
}) {
  const isBusiness = layout === "business";

  return (
    <section
      id={section.id}
      className={`py-12 md:py-16 border-t border-beige/50 scroll-mt-28 ${
        isBusiness ? "bg-cream/25 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-premium" : ""
      }`}
    >
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-10">
        {section.title}
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <ArticleMarkdown content={section.body} variant="conclusion" />
          {isBusiness ? (
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/coffee-belarus"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-orange-gradient text-white font-semibold text-sm sm:text-base hover:shadow-glow-orange hover:scale-[1.02] transition-all"
              >
                Кофе оптом в Беларуси
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm sm:text-base hover:bg-primary/90 hover:shadow-soft transition-all"
              >
                Связаться с менеджером
              </Link>
            </div>
          ) : (
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center mt-6 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm sm:text-base hover:bg-primary/90 hover:shadow-soft transition-all"
            >
              Смотреть каталог кофе
            </Link>
          )}
        </div>
        <SectionImage
          src={image.src}
          alt={image.alt}
          title={section.title}
          layout={layout}
        />
      </div>
    </section>
  );
}

function ContentSection({
  section,
  image,
  index,
  layout = "lifestyle",
}: {
  section: ParsedSection;
  image: { src: string; alt: string };
  index: number;
  layout?: "lifestyle" | "business";
}) {
  const variant = section.isTips ? "tips" : "default";
  const isBusiness = layout === "business";
  const imageOnLeft = isBusiness ? index % 2 === 0 : index % 2 === 1;
  const banded = isBusiness && index % 2 === 0;

  return (
    <section
      id={section.id}
      className={`py-12 md:py-16 border-t border-beige/50 scroll-mt-28 ${
        banded
          ? "bg-cream/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-premium"
          : ""
      }`}
    >
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 md:mb-8">
        {section.title}
      </h2>

      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          imageOnLeft ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="min-w-0">
          <ArticleMarkdown content={section.body} variant={variant} />
        </div>
        <SectionImage
          src={image.src}
          alt={image.alt}
          title={section.title}
          layout={layout}
        />
      </div>
    </section>
  );
}

export default function ArticleSections({
  content,
  heroImage,
  heroImageAlt,
  layout = "lifestyle",
}: ArticleSectionsProps) {
  const parsed = parseArticleContent(content);
  const lead = parsed.intro;
  const isBusiness = layout === "business";

  return (
    <div id="article-content">
      {lead && (
        <div className={`pb-10 md:pb-12 ${isBusiness ? "" : ""}`}>
          {isBusiness ? (
            <div className="bg-cream/45 border border-beige/60 rounded-premium p-6 md:p-8 max-w-4xl">
              <p className="text-primary/85 text-base sm:text-lg leading-relaxed">
                {lead}
              </p>
            </div>
          ) : (
            <p className="text-primary/85 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl">
              {lead}
            </p>
          )}
        </div>
      )}

      {parsed.sections.map((section, index) => {
        const image = resolveSectionImage(
          section,
          index,
          heroImageAlt,
          heroImage,
          layout,
        );

        if (section.isConclusion) {
          return (
            <ConclusionSection
              key={section.id}
              section={section}
              image={image}
              layout={layout}
            />
          );
        }

        return (
          <ContentSection
            key={section.id}
            section={section}
            image={image}
            index={index}
            layout={layout}
          />
        );
      })}
    </div>
  );
}
