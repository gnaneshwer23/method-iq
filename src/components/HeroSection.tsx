
import { HeroContent } from "./hero/HeroContent";
import { HeroFeatureMap } from "./hero/HeroFeatureMap";
import { HeroBackground } from "./hero/HeroBackground";

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32 relative min-h-[80vh] flex items-center">
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroContent />
          <HeroFeatureMap />
        </div>
      </div>
    </section>
  );
}
