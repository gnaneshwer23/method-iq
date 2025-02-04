
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AboutSection } from "@/components/AboutSection"

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default About
