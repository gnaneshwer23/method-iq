
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Index;
