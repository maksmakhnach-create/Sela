import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("arabica-optom");

export default function ArabicaOptomPage() {
  return <SeoLandingPage landing={seoLandings["arabica-optom"]} />;
}
