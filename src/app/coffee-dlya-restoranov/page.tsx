import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("coffee-dlya-restoranov");

export default function CoffeeDlyaRestoranovPage() {
  return <SeoLandingPage landing={seoLandings["coffee-dlya-restoranov"]} />;
}
