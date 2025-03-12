
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroContent() {
  return (
    <div className="text-left space-y-6">
      <span className="inline-flex animate-fade-up bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 text-primary text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/10">
        <Brain className="w-4 h-4 mr-2" />
        Welcome to MethodIQ
      </span>
      
      <h1 className="animate-fade-up [--animation-delay:200ms] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
        Empowering Your Research Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70">Intelligent, Integrated Tools</span>
      </h1>
      
      <p className="animate-fade-up [--animation-delay:400ms] text-lg text-muted-foreground max-w-2xl text-balance">
        Discover personalized research protocols, verified methods, real-time lab insights, and a vibrant research community—all in one platform.
      </p>

      <p className="animate-fade-up [--animation-delay:500ms] text-base text-muted-foreground max-w-2xl text-balance">
        MethodIQ is a next-generation research ecosystem that transforms how scientists discover, validate, and share research protocols. Whether you're fine-tuning an experiment or exploring new research ideas, our integrated platform uses the latest AI tools and secure technologies to make your work more efficient, reproducible, and collaborative.
      </p>
      
      <div className="animate-fade-up [--animation-delay:600ms] flex flex-col sm:flex-row gap-4 pt-4">
        <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-primary/25 transition-all duration-300">
          <Link to="/register">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-primary/5 transition-all duration-300">
          <Link to="/how-it-works">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Link>
        </Button>
      </div>
    </div>
  );
}
