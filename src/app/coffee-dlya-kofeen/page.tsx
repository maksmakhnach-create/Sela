import CoffeeForCafesPage from "@/components/seo/CoffeeForCafesPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";
import { getSiteUrl } from "@/lib/site-url";

const landing = seoLandings["coffee-dlya-kofeen"];
const siteUrl = getSiteUrl();
const baseMetadata = getSeoLandingMetadata("coffee-dlya-kofeen");

export const metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/coffee-dlya-kofeen",
  },
  openGraph: {
    ...baseMetadata.openGraph,
    url: `${siteUrl}/coffee-dlya-kofeen`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function CoffeeDlyaKofeenPage() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <CoffeeForCafesPage landing={landing} />
    </>
  );
}
