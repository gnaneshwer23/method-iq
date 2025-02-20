
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FeaturesSection } from "@/components/FeaturesSection"
import { BenefitsSection } from "@/components/BenefitsSection"

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FeaturesSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  )
}

export default Features
