
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { ServicesSection } from "@/components/ServicesSection"

const HowItWorks = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HowItWorksSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}

export default HowItWorks
