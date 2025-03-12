
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ServicesSection } from "@/components/ServicesSection";

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <FeaturesSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}

export default Features;
