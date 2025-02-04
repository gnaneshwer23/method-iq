
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AboutSection } from "@/components/AboutSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <AboutSection />
    </main>
  );
};

export default Index;
