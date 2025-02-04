
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HowItWorksSection } from "@/components/HowItWorksSection"

const HowItWorks = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}

export default HowItWorks
