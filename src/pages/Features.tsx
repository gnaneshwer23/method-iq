
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ServicesSection } from "@/components/ServicesSection";

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="py-12">
          <FeaturesSection />
        </div>
        <div className="py-12">
          <ServicesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Features;
