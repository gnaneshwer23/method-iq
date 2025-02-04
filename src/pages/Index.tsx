
import { HeroSection } from "@/components/HeroSection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
