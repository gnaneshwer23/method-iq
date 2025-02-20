
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function UseCasesHero() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Real-World Impact: How MethodIQ Transforms Research
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Explore practical examples of how our integrated platform accelerates discovery, optimizes experiments, and fosters collaboration.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            MethodIQ is designed to support every step of the research process. From personalized protocol discovery and real-time experimental adjustments to collaborative networking and immersive training, our platform empowers researchers to achieve breakthrough results.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/contact">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
