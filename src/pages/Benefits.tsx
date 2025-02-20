
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BenefitsSection } from "@/components/BenefitsSection"
import { FeaturesSection } from "@/components/FeaturesSection"

const Benefits = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BenefitsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}

export default Benefits
