
import { HeroSection } from "@/components/HeroSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IntroSection } from "@/components/IntroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { BenefitsSection } from "@/components/BenefitsSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { FeaturedProtocols } from "@/components/protocols/FeaturedProtocols"
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Clean and focused */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <HeroSection />
        </section>
        
        {/* Intro Section - Better spacing */}
        <IntroSection />
        
        {/* Features Section - Clean background */}
        <section className="py-20 bg-secondary/30">
          <FeaturesSection />
        </section>
        
        {/* Benefits Section - Simplified */}
        <section className="py-20">
          <BenefitsSection />
        </section>
        
        {/* How It Works Section - Better spacing */}
        <section className="py-20 bg-secondary/20">
          <HowItWorksSection />
        </section>

        {/* Featured Protocols Section */}
        <section className="py-20">
          <FeaturedProtocols />
        </section>

        {/* Call To Action Section */}
        {ctaVisible && (
          <section className="py-20">
            <CallToAction visible={ctaVisible} />
          </section>
        )}
      </main>
      
      <Footer />
      
      {/* Subtle background accent - single minimal effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>
    </div>
  )
}

export default Index
