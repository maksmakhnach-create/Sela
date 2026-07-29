import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("coffee-dlya-ofisa");

export default function CoffeeDlyaOfisaPage() {
  return <SeoLandingPage landing={seoLandings["coffee-dlya-ofisa"]} />;
}
