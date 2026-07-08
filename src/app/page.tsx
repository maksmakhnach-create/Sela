import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PopularProducts from "@/components/home/PopularProducts";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <PopularProducts />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
