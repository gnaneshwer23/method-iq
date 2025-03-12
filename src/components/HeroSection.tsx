
import { HeroContent } from "./hero/HeroContent";
import { HeroFeatureMap } from "./hero/HeroFeatureMap";
import { HeroBackground } from "./hero/HeroBackground";

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 overflow-visible relative">
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <HeroContent />
          <HeroFeatureMap />
        </div>
      </div>
    </section>
  );
}
