
import { HeroSection } from "@/components/HeroSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IntroSection } from "@/components/IntroSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { ServicesSection } from "@/components/ServicesSection"

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
