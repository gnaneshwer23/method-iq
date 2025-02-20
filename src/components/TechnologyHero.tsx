
import { Button } from "@/components/ui/button";
import { Brain, Database, Shield, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

export function TechnologyHero() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Our Cutting-Edge Technology: Powering the Future of Research
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Discover how MethodIQ's advanced AI, real-time data integration, and secure infrastructure drive personalized research innovation.
          </p>
          <p className="text-lg text-muted-foreground">
            At MethodIQ, we harness a suite of state-of-the-art technologies—ranging from explainable AI and large language models (LLMs) to blockchain, IoT, digital twins, and immersive AR/MR—to create a dynamic, secure, and fully integrated research ecosystem.
          </p>
        </div>

        {/* Animated Technology Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { icon: Brain, label: "Advanced AI", delay: "0ms" },
            { icon: Database, label: "Real-time Data", delay: "200ms" },
            { icon: Shield, label: "Secure Platform", delay: "400ms" },
            { icon: Cloud, label: "Cloud Infrastructure", delay: "600ms" }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-fade-up text-center"
              style={{ animationDelay: item.delay }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/demo">Explore Our Technology</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Contact for Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
