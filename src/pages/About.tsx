
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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
