import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("coffee-belarus");

export default function CoffeeBelarusPage() {
  return <SeoLandingPage landing={seoLandings["coffee-belarus"]} />;
}
