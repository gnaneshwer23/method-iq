
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroContent() {
  return (
    <div className="text-left space-y-8">
      <span className="inline-flex animate-fade-up bg-primary/10 text-primary text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-primary/20 font-medium">
        <Brain className="w-4 h-4 mr-2" />
        Welcome to MethodIQ
      </span>
      
      <h1 className="animate-fade-up [--animation-delay:200ms] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
        Empowering Your Research Journey with <span className="text-primary">Intelligent Tools</span>
      </h1>
      
      <p className="animate-fade-up [--animation-delay:400ms] text-xl text-muted-foreground max-w-2xl leading-relaxed">
        Transform how you discover, validate, and share research protocols with AI-powered insights, secure blockchain documentation, and collaborative community features.
      </p>
      
      <div className="animate-fade-up [--animation-delay:600ms] flex flex-col sm:flex-row gap-4 pt-4">
        <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to="/protocols">
            Search Protocols
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="group">
          <Link to="/register">
            Get Started Free
            <Brain className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
