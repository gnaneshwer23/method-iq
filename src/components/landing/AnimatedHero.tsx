import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-research.jpg";

export function AnimatedHero() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const floatingIcons = [
    { icon: Brain, delay: "0s", position: "top-20 left-[10%]" },
    { icon: Sparkles, delay: "0.5s", position: "top-40 right-[15%]" },
    { icon: Zap, delay: "1s", position: "bottom-32 left-[20%]" },
    { icon: Shield, delay: "1.5s", position: "bottom-20 right-[10%]" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="AI research neural network visualization"
          width={1600}
          height={1000}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, idx) => (
        <div
          key={idx}
          className={`absolute ${item.position} opacity-20 animate-float`}
          style={{ animationDelay: item.delay }}
        >
          <item.icon className="w-12 h-12 text-primary" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Research Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-fade-up">
            Transform Your Research
            <br />
            <span className="text-gradient bg-gradient-to-r from-primary via-primary/80 to-primary">
              Journey with MethodIQ
            </span>
          </h1>

          {/* Dynamic Feature Highlights */}
          <div className="h-20 flex items-center justify-center">
            <p className="text-xl text-muted-foreground animate-fade-in max-w-2xl transition-all duration-500">
              {activeFeature === 0 && "Discover protocols with AI-powered search and validation"}
              {activeFeature === 1 && "Collaborate with researchers worldwide in real-time"}
              {activeFeature === 2 && "Secure your work with blockchain verification"}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up [--animation-delay:400ms]">
            <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-all">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group backdrop-blur-sm">
              <Link to="/protocols">
                Explore Protocols
                <Brain className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fade-up [--animation-delay:600ms]">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Protocols</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
