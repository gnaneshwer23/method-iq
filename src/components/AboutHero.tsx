
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Clock, Users, Award, Target, Building } from "lucide-react";

export function AboutHero() {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex mb-4 bg-primary/10 rounded-full px-3 py-1 text-primary text-sm font-medium animate-fade-up">
            <Building className="w-4 h-4 mr-2" />
            <span>EST. 2020</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 animate-fade-up" style={{ animationDelay: "100ms" }}>
            About Us
          </h1>
          
          <p className="text-xl mb-12 text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
            Discover the story behind MethodIQ and how our advanced technologies are transforming scientific discovery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center gap-3 justify-center bg-gradient-to-br from-background to-secondary/30 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium">Innovation First</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-gradient-to-br from-background to-secondary/30 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 justify-center bg-gradient-to-br from-background to-secondary/30 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up" style={{ animationDelay: "500ms" }}>
              <Users className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium">Global Team</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 animate-fade-up"
            style={{ animationDelay: "600ms" }}
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
