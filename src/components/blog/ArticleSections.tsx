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
}

function SectionImage({
  src,
  alt,
  title,
  priority = false,
}: {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
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
}: {
  section: ParsedSection;
  image: { src: string; alt: string };
}) {
  return (
    <section
      id={section.id}
      className="py-12 md:py-16 border-t border-beige/50 scroll-mt-28"
    >
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-10">
        {section.title}
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <ArticleMarkdown content={section.body} variant="conclusion" />
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center mt-6 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm sm:text-base hover:bg-primary/90 hover:shadow-soft transition-all"
          >
            Смотреть каталог кофе
          </Link>
        </div>
        <SectionImage
          src={image.src}
          alt={image.alt}
          title={section.title}
        />
      </div>
    </section>
  );
}

function ContentSection({
  section,
  image,
  index,
}: {
  section: ParsedSection;
  image: { src: string; alt: string };
  index: number;
}) {
  const variant = section.isTips ? "tips" : "default";
  const imageOnLeft = index % 2 === 1;

  return (
    <section
      id={section.id}
      className="py-12 md:py-16 border-t border-beige/50 scroll-mt-28"
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
        <SectionImage src={image.src} alt={image.alt} title={section.title} />
      </div>
    </section>
  );
}

export default function ArticleSections({
  content,
  heroImage,
  heroImageAlt,
}: ArticleSectionsProps) {
  const parsed = parseArticleContent(content);
  const lead = parsed.intro;

  return (
    <div id="article-content">
      {lead && (
        <div className="pb-10 md:pb-12">
          <p className="text-primary/85 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl">
            {lead}
          </p>
        </div>
      )}

      {parsed.sections.map((section, index) => {
        const image = resolveSectionImage(
          section,
          index,
          heroImageAlt,
          heroImage,
        );

        if (section.isConclusion) {
          return (
            <ConclusionSection
              key={section.id}
              section={section}
              image={image}
            />
          );
        }

        return (
          <ContentSection
            key={section.id}
            section={section}
            image={image}
            index={index}
          />
        );
      })}
    </div>
  );
}
