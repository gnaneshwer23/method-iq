
import { HeroSection } from "@/components/HeroSection"
import { IntroSection } from "@/components/IntroSection"
import { BenefitsSection } from "@/components/BenefitsSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { PricingSection } from "@/components/PricingSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
