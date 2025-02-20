
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UseCasesHero } from "@/components/UseCasesHero";
import { UseCasesGrid } from "@/components/UseCasesGrid";
import { UseCasesFlow } from "@/components/UseCasesFlow";
import { CaseStudies } from "@/components/CaseStudies";

const UseCases = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <UseCasesHero />
        <UseCasesGrid />
        <UseCasesFlow />
        <CaseStudies />
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;
