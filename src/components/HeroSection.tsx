
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex animate-fade-up opacity-0 [--animation-delay:200ms] bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full">
            Introducing MethodIQ
          </span>
          
          <h1 className="animate-fade-up opacity-0 [--animation-delay:400ms] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Accelerate Your Research with <span className="text-primary">Intelligent Methods</span>
          </h1>
          
          <p className="animate-fade-up opacity-0 [--animation-delay:600ms] text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover MethodIQ—the platform that harnesses AI and cutting-edge technologies to recommend research methods tailored to your lab's unique needs.
          </p>
          
          <div className="animate-fade-up opacity-0 [--animation-delay:800ms] flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/how-it-works">
                Discover How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
