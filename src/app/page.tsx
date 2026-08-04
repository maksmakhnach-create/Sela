import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getFeaturedPosts } from "@/lib/blog";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import BrandsSection from "@/components/home/BrandsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import BusinessSolutionsSection from "@/components/home/BusinessSolutionsSection";
import BlogRecommendedSection from "@/components/home/BlogRecommendedSection";
import CTASection from "@/components/home/CTASection";
import HomeJsonLd from "@/components/seo/HomeJsonLd";

const siteUrl = getSiteUrl();
const homeTitle = "Кофе оптом в Беларуси — поставки для бизнеса | SELA, Гродно";
const homeDescription =
  "Кофе оптом в Беларуси от SELA: зерновой, молотый и растворимый кофе, кофейные напитки. Оптовые цены, доставка по всей РБ для магазинов, кафе и ресторанов. Заявка на сайте.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Кофе оптом в Беларуси | SELA",
    description: homeDescription,
    url: siteUrl,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <AboutSection />
      <BrandsSection />
      <WhyChooseSection />
      <BusinessSolutionsSection />
      <BlogRecommendedSection posts={featuredPosts} />
      <CTASection />
    </>
  );
}
