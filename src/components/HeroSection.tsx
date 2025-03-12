
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Atom, Brain, CircuitBoard, Beaker, Sparkles, Lock, Users, TestTube } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 overflow-visible relative">
      {/* Enhanced futuristic background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-background/60 via-background/10 to-background/60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="text-left space-y-6">
            <span className="inline-flex animate-fade-up bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 text-primary text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-primary/10">
              <Atom className="w-4 h-4 mr-2" />
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
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-primary/5 transition-all duration-300">
                <Link to="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            <div className="sticky top-24 w-full h-[500px]">
              {/* Central Hub with MethodIQ logo and text */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-100/60 to-blue-100/40 rounded-full w-64 h-64 backdrop-blur-lg border border-blue-200/30 flex flex-col items-center justify-center animate-pulse duration-[4000ms] shadow-lg shadow-blue-300/10">
                <Brain className="w-10 h-10 text-blue-500 mb-2" />
                <div className="text-blue-600 font-semibold text-xl">MethodIQ</div>
              </div>

              {/* Feature Cards in a circular arrangement */}
              {[
                { label: "AI-Powered\nProtocols", icon: Brain, angle: 0, color: "text-blue-500", bgColor: "bg-white" },
                { label: "Research\nAnalytics", icon: TestTube, angle: 60, color: "text-blue-500", bgColor: "bg-white" },
                { label: "Professional\nNetworking", icon: Users, angle: 120, color: "text-blue-500", bgColor: "bg-white" },
                { label: "AR/VR\nTraining", icon: Sparkles, angle: 180, color: "text-blue-500", bgColor: "bg-white" },
                { label: "Real-Time\nIoT Data", icon: CircuitBoard, angle: 240, color: "text-blue-500", bgColor: "bg-white" },
                { label: "Blockchain\nVerification", icon: Lock, angle: 300, color: "text-blue-500", bgColor: "bg-white" }
              ].map((feature, index) => {
                const radius = 200; // Increased radius for more space
                const angle = (feature.angle * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${feature.bgColor} rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-32 flex flex-col items-center animate-fade-up`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 150 + 700}ms`,
                    }}
                  >
                    <feature.icon className={`w-8 h-8 mb-2 ${feature.color}`} />
                    <div className="font-medium text-sm whitespace-pre-line">{feature.label}</div>
                  </div>
                );
              })}

              {/* Enhanced Connection Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: 'rotate(-90deg)' }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${50 + Math.cos((angle * Math.PI) / 180) * 45}%`}
                    y2={`${50 + Math.sin((angle * Math.PI) / 180) * 45}%`}
                    className="stroke-blue-200"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.1;0.5;0.1"
                      dur="4s"
                      repeatCount="indefinite"
                      begin={`${index * 0.7}s`}
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
