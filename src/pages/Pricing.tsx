
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingSection } from "@/components/PricingSection"

const Pricing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}

export default Pricing
