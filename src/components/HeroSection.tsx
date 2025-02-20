
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 overflow-visible bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-left space-y-6">
            <span className="inline-flex bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full">
              Welcome to MethodIQ
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Empowering Your Research Journey with <span className="text-primary">Intelligent, Integrated Tools</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl text-balance">
              Discover personalized research protocols, verified methods, real-time lab insights, and a vibrant research community—all in one platform.
            </p>

            <p className="text-base text-muted-foreground max-w-2xl text-balance">
              MethodIQ is a next-generation research ecosystem that transforms how scientists discover, validate, and share research protocols. Whether you're fine-tuning an experiment or exploring new research ideas, our integrated platform uses the latest AI tools and secure technologies to make your work more efficient, reproducible, and collaborative.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link to="/demo">
                  Watch Demo
                  <Play className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            <div className="sticky top-24 w-full h-[500px]">
              {/* Central Hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full p-8">
                <div className="bg-primary/5 rounded-full p-6">
                  <div className="bg-primary/10 rounded-full p-4">
                    <div className="text-primary font-semibold">MethodIQ</div>
                  </div>
                </div>
              </div>

              {/* Feature Circles */}
              {[
                { label: "AI-Powered\nProtocols", angle: 0 },
                { label: "Blockchain\nVerification", angle: 60 },
                { label: "Real-Time\nIoT Data", angle: 120 },
                { label: "Professional\nNetworking", angle: 180 },
                { label: "AR/VR\nTraining", angle: 240 },
                { label: "Research\nAnalytics", angle: 300 }
              ].map((feature, index) => {
                const radius = 160;
                const angle = (feature.angle * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg p-3 shadow-lg border border-border text-center text-sm font-medium whitespace-pre-line hover:bg-accent transition-colors"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
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
                    className="stroke-border"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
