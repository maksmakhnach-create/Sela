import CoffeeBelarusPage from "@/components/seo/CoffeeBelarusPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";
import { getSiteUrl } from "@/lib/site-url";

const landing = seoLandings["coffee-belarus"];
const siteUrl = getSiteUrl();
const baseMetadata = getSeoLandingMetadata("coffee-belarus");

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/coffee-belarus",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    url: `${siteUrl}/coffee-belarus`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function CoffeeBelarusRoute() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: landing.title,
    description: landing.description,
    url: `${siteUrl}/coffee-belarus`,
    inLanguage: "ru-BY",
    isPartOf: {
      "@type": "WebSite",
      name: "SELA",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <CoffeeBelarusPage landing={landing} />
    </>
  );
}
