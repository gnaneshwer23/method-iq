
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Atom, Brain, CircuitBoard } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 overflow-visible relative">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-background/50 via-background/0 to-background/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-left space-y-6">
            <span className="inline-flex animate-fade-in bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 text-primary text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/10">
              <Atom className="w-4 h-4 mr-2" />
              Welcome to MethodIQ
            </span>
            
            <h1 className="animate-fade-in [--animation-delay:200ms] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
              Empowering Your Research Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70">Intelligent, Integrated Tools</span>
            </h1>
            
            <p className="animate-fade-in [--animation-delay:400ms] text-lg text-muted-foreground max-w-2xl text-balance">
              Discover personalized research protocols, verified methods, real-time lab insights, and a vibrant research community—all in one platform.
            </p>

            <p className="animate-fade-in [--animation-delay:500ms] text-base text-muted-foreground max-w-2xl text-balance">
              MethodIQ is a next-generation research ecosystem that transforms how scientists discover, validate, and share research protocols. Whether you're fine-tuning an experiment or exploring new research ideas, our integrated platform uses the latest AI tools and secure technologies to make your work more efficient, reproducible, and collaborative.
            </p>
            
            <div className="animate-fade-in [--animation-delay:600ms] flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group backdrop-blur-sm bg-background/50">
                <Link to="/demo">
                  Watch Demo
                  <Play className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            <div className="sticky top-24 w-full h-[500px]">
              {/* Central Hub - Enhanced with gradients */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full p-8 backdrop-blur-lg border border-primary/10 animate-pulse duration-[4000ms]">
                <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-full p-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-4">
                    <div className="text-primary font-semibold flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      MethodIQ
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Circles */}
              {[
                { label: "AI-Powered\nProtocols", angle: 0, Icon: Brain },
                { label: "Blockchain\nVerification", angle: 60, Icon: CircuitBoard },
                { label: "Real-Time\nIoT Data", angle: 120, Icon: CircuitBoard },
                { label: "Professional\nNetworking", angle: 180, Icon: CircuitBoard },
                { label: "AR/VR\nTraining", angle: 240, Icon: CircuitBoard },
                { label: "Research\nAnalytics", angle: 300, Icon: CircuitBoard }
              ].map((feature, index) => {
                const radius = 160;
                const angle = (feature.angle * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-background via-background/95 to-background/90 rounded-lg p-3 shadow-lg border border-primary/10 text-center text-sm font-medium whitespace-pre-line hover:bg-accent transition-colors backdrop-blur-sm animate-fade-in hover:scale-110 transition-transform duration-300"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 100 + 700}ms`,
                    }}
                  >
                    <feature.Icon className="w-4 h-4 mb-1 mx-auto text-primary/70" />
                    {feature.label}
                  </div>
                );
              })}

              {/* Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: 'rotate(-90deg)' }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos((angle * Math.PI) / 180) * 40}%`}
                    y2={`${50 + Math.sin((angle * Math.PI) / 180) * 40}%`}
                    className="stroke-primary/10"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.1;0.4;0.1"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={`${index * 0.5}s`}
                    />
                  </line>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
