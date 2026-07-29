import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("coffee-optom-belarus");

export default function CoffeeOptomBelarusPage() {
  return <SeoLandingPage landing={seoLandings["coffee-optom-belarus"]} />;
}
