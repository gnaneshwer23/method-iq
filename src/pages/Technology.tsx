
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechnologyHero } from "@/components/TechnologyHero";
import { TechnologyStack } from "@/components/TechnologyStack";
import { TechnologyDetails } from "@/components/TechnologyDetails";

const Technology = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TechnologyHero />
        <TechnologyStack />
        <TechnologyDetails />
      </main>
      <Footer />
    </div>
  );
}

export default Technology;
