import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AnimatedHero } from "@/components/landing/AnimatedHero"
import { FeatureTabs } from "@/components/landing/FeatureTabs"
import { ProductShowcase } from "@/components/landing/ProductShowcase"
import { TrustSection } from "@/components/landing/TrustSection"
import { CallToAction } from "@/components/how-it-works/CallToAction"

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        <AnimatedHero />
        <FeatureTabs />
        <ProductShowcase />
        <TrustSection />
        <CallToAction visible={true} />
      </main>
      
      <Footer />
    </div>
  )
}

export default Index
