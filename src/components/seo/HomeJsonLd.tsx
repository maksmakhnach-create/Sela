import { getSiteUrl } from "@/lib/site-url";

export default function HomeJsonLd() {
  const siteUrl = getSiteUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SELA",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Кофе оптом в Беларуси: поставки зернового, молотого и растворимого кофе для бизнеса.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Ивана Лебедева, 6",
      addressLocality: "Гродно",
      addressCountry: "BY",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+375-29-588-98-15",
      contactType: "sales",
      areaServed: "BY",
      availableLanguage: "Russian",
    },
    sameAs: [
      "https://www.instagram.com/sela_coffe/",
      "https://www.wildberries.ru/seller/3924979",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: "SELA — кофе оптом в Беларуси",
    image: `${siteUrl}/logo.png`,
    url: siteUrl,
    telephone: "+375-29-588-98-15",
    email: "lcc.sela8@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Ивана Лебедева, 6",
      addressLocality: "Гродно",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.639923,
      longitude: 23.816774,
    },
    areaServed: {
      "@type": "Country",
      name: "Belarus",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Кофе оптом в Беларуси — SELA",
    description:
      "Кофе оптом в Беларуси от SELA: оптовые поставки для магазинов, кафе, ресторанов и офисов.",
    url: siteUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}
