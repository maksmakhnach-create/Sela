import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { seoLandings } from "@/data/seo-landings";
import { getSeoLandingMetadata } from "@/lib/seo-landing-metadata";

export const metadata = getSeoLandingMetadata("espresso-blend");

export default function EspressoBlendPage() {
  return <SeoLandingPage landing={seoLandings["espresso-blend"]} />;
}
