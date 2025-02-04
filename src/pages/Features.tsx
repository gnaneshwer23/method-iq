
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IntroSection } from "@/components/IntroSection"

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <IntroSection />
      </main>
      <Footer />
    </div>
  )
}

export default Features
