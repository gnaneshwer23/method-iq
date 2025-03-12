
import { HeroSection } from "@/components/HeroSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IntroSection } from "@/components/IntroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { BenefitsSection } from "@/components/BenefitsSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-x-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(96,165,250,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <HeroSection />
        </section>
        
        <IntroSection />
        
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#60A5FA]/10 via-[#8B5CF6]/5 to-transparent pointer-events-none" />
          <FeaturesSection />
        </section>
        
        <section className="relative bg-gradient-to-b from-white to-secondary/20">
          <BenefitsSection />
        </section>
        
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#60A5FA]/10 via-[#8B5CF6]/5 to-transparent pointer-events-none" />
          <HowItWorksSection />
        </section>
      </main>
      
      <Footer />
      
      {/* Animated glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#60A5FA]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
      </div>
    </div>
  )
}

export default Index
