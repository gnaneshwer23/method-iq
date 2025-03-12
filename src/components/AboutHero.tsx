
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Clock, Users } from "lucide-react";

export function AboutHero() {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            About Us
          </h1>
          <p className="text-xl mb-12 text-muted-foreground leading-relaxed">
            Discover the story behind MethodIQ and how our advanced technologies are transforming scientific discovery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center gap-3 justify-center">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-lg">Innovation First</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-lg">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-lg">Global Team</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
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
