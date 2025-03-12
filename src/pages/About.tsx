
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/AboutHero";
import { Mission } from "@/components/Mission";
import { OurStory } from "@/components/OurStory";
import { Team } from "@/components/Team";
import { Values } from "@/components/Values";
import { Partners } from "@/components/Partners";
import { Recognition } from "@/components/Recognition";
import { AboutCTA } from "@/components/AboutCTA";
import { useEffect } from "react";

const About = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/80 to-background relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(123,97,255,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,rgba(59,130,246,0.08),transparent)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-30" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
      </div>
      
      <Header />
      <main className="flex-1 relative">
        <AboutHero />
        <Mission />
        <OurStory />
        <Team />
        <Values />
        <Partners />
        <Recognition />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}

export default About;
