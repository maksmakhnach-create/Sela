import CatalogBackground from "@/components/catalog/CatalogBackground";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  version: string;
  disclaimer: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  version,
  disclaimer,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-x-clip">
      <CatalogBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-beige mb-4 text-balance">
          {title}
        </h1>
        <p className="text-white/55 text-sm mb-8">
          Версия документа: {version}
        </p>
        <article className="bg-white rounded-card p-5 sm:p-8 lg:p-10 shadow-soft text-primary">
          <p className="text-sm text-primary/60 bg-beige/40 border border-beige rounded-2xl px-4 py-3 mb-8">
            {disclaimer}
          </p>
          <div className="space-y-8 text-[0.95rem] leading-relaxed text-primary/85">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl text-primary mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
