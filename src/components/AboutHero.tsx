
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Empowering Innovation Through Integrated Research
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Discover the story behind MethodIQ and how our advanced technologies are transforming scientific discovery.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              const teamSection = document.getElementById('team');
              teamSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Meet Our Team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
