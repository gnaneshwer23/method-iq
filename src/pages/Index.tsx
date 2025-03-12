
import { HeroSection } from "@/components/HeroSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IntroSection } from "@/components/IntroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { BenefitsSection } from "@/components/BenefitsSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { CallToAction } from "@/components/how-it-works/CallToAction"
import { useState, useEffect } from "react"

const Index = () => {
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    // Trigger CTA visibility after scrolling
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      
      // Show CTA when user has scrolled 70% of the page
      if (scrollPosition > pageHeight * 0.7) {
        setCtaVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 overflow-hidden">
        <section className="relative overflow-x-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(96,165,250,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(139,92,246,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]" />
          <HeroSection />
        </section>
        
        <IntroSection />
        
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#60A5FA]/15 via-[#8B5CF6]/10 to-transparent pointer-events-none" />
          <FeaturesSection />
        </section>
        
        <section className="relative bg-gradient-to-b from-white to-secondary/30">
          <BenefitsSection />
        </section>
        
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA]/15 via-[#8B5CF6]/10 to-transparent pointer-events-none" />
          <HowItWorksSection />
        </section>

        {/* Call To Action Section */}
        <CallToAction visible={ctaVisible} />
      </main>
      
      <Footer />
      
      {/* Enhanced animated glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#60A5FA]/25 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/25 rounded-full blur-[120px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#EC4899]/15 rounded-full blur-[100px] animate-pulse [animation-delay:2.5s]" />
      </div>
    </div>
  )
}

export default Index
