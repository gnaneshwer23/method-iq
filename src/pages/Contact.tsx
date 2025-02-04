
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ContactSection } from "@/components/ContactSection"

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Contact
