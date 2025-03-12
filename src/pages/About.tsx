
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

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(123,97,255,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,rgba(59,130,246,0.04),transparent)]" />
      
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
