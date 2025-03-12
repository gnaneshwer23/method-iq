
import { Button } from "@/components/ui/button";
import { Brain, Database, Shield, Cloud, Sparkles, Cpu, Network } from "lucide-react";
import { Link } from "react-router-dom";

export function TechnologyHero() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">OUR TECHNOLOGY</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Powering the Future of Research
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Discover how MethodIQ's advanced AI, real-time data integration, and secure infrastructure drive personalized research innovation.
          </p>
          <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary/30 pl-4 bg-primary/5 py-3 rounded-r-lg shadow-sm">
            At MethodIQ, we harness a suite of state-of-the-art technologies—ranging from explainable AI and large language models (LLMs) to blockchain, IoT, digital twins, and immersive AR/MR—to create a dynamic, secure, and fully integrated research ecosystem.
          </p>
        </div>

        {/* Animated Technology Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { icon: Brain, label: "Advanced AI", delay: "0ms", color: "bg-purple-500/10", textColor: "text-purple-600" },
            { icon: Database, label: "Real-time Data", delay: "200ms", color: "bg-blue-500/10", textColor: "text-blue-600" },
            { icon: Shield, label: "Secure Platform", delay: "400ms", color: "bg-emerald-500/10", textColor: "text-emerald-600" },
            { icon: Cloud, label: "Cloud Infrastructure", delay: "600ms", color: "bg-sky-500/10", textColor: "text-sky-600" },
            { icon: Cpu, label: "Edge Computing", delay: "800ms", color: "bg-amber-500/10", textColor: "text-amber-600" },
            { icon: Network, label: "Neural Networks", delay: "1000ms", color: "bg-indigo-500/10", textColor: "text-indigo-600" },
            { icon: Sparkles, label: "Machine Learning", delay: "1200ms", color: "bg-pink-500/10", textColor: "text-pink-600" },
            { icon: Brain, label: "Neural Interfaces", delay: "1400ms", color: "bg-teal-500/10", textColor: "text-teal-600" }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-fade-up text-center group"
              style={{ animationDelay: item.delay }}
            >
              <div className={`w-16 h-16 rounded-xl ${item.color} flex items-center justify-center mb-4 shadow-lg shadow-primary/5 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110`}>
                <item.icon className={`w-8 h-8 ${item.textColor}`} />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
            <Link to="/technology" className="flex items-center gap-2">
              Explore Our Technology
              <Sparkles className="w-4 h-4 transition-all duration-300 group-hover:rotate-12" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
            <Link to="/contact">Contact for Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
