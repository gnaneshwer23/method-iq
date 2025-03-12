
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
            <div className="sticky top-24 w-full h-[500px] flex items-center justify-center">
              {/* Feature diagram with centered MethodIQ logo */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Hub with MethodIQ logo and text - now properly centered */}
                <div className="absolute bg-gradient-to-br from-blue-100/60 to-blue-100/40 rounded-full w-64 h-64 backdrop-blur-lg border border-blue-200/30 flex flex-col items-center justify-center z-10 shadow-lg shadow-blue-300/10">
                  <Brain className="w-10 h-10 text-blue-500 mb-2" />
                  <div className="text-blue-600 font-semibold text-xl">MethodIQ</div>
                </div>

                {/* Feature Cards in a circular arrangement - evenly distributed */}
                <div className="w-full h-full absolute inset-0">
                  {/* Feature buttons with proper positioning and links */}
                  {[
                    { 
                      label: "AI-Powered\nProtocols", 
                      icon: Brain, 
                      position: "right-0 top-0", 
                      link: "/features#ai-protocols" 
                    },
                    { 
                      label: "Research\nAnalytics", 
                      icon: TestTube, 
                      position: "right-0 bottom-0", 
                      link: "/features#research-analytics" 
                    },
                    { 
                      label: "Professional\nNetworking", 
                      icon: Users, 
                      position: "left-0 bottom-0", 
                      link: "/features#networking" 
                    },
                    { 
                      label: "AR/VR\nTraining", 
                      icon: Sparkles, 
                      position: "left-0 top-0", 
                      link: "/features#ar-vr" 
                    },
                    { 
                      label: "Real-Time\nIoT Data", 
                      icon: CircuitBoard, 
                      position: "left-1/2 top-0 -translate-x-1/2", 
                      link: "/features#iot" 
                    },
                    { 
                      label: "Blockchain\nVerification", 
                      icon: Lock, 
                      position: "left-1/2 bottom-0 -translate-x-1/2", 
                      link: "/features#blockchain" 
                    }
                  ].map((feature, index) => (
                    <Link 
                      key={index}
                      to={feature.link}
                      className={`absolute ${feature.position} bg-white hover:bg-blue-50 transition-colors duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[140px] flex flex-col items-center animate-fade-up cursor-pointer`}
                      style={{
                        animationDelay: `${index * 150 + 700}ms`,
                        transform: feature.position.includes("translate") ? "" : "translate(-50%, -50%)"
                      }}
                    >
                      <feature.icon className="w-8 h-8 mb-2 text-blue-500" />
                      <div className="font-medium text-sm whitespace-pre-line">{feature.label}</div>
                    </Link>
                  ))}
                </div>

                {/* Connection lines to the center */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Top line */}
                  <line x1="50%" y1="0%" x2="50%" y2="30%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
                  </line>
                  {/* Bottom line */}
                  <line x1="50%" y1="70%" x2="50%" y2="100%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" begin="0.7s" />
                  </line>
                  {/* Top-right line */}
                  <line x1="70%" y1="20%" x2="50%" y2="40%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" begin="1.4s" />
                  </line>
                  {/* Bottom-right line */}
                  <line x1="70%" y1="80%" x2="50%" y2="60%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" begin="2.1s" />
                  </line>
                  {/* Top-left line */}
                  <line x1="30%" y1="20%" x2="50%" y2="40%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" begin="2.8s" />
                  </line>
                  {/* Bottom-left line */}
                  <line x1="30%" y1="80%" x2="50%" y2="60%" className="stroke-blue-200" strokeWidth="1" strokeDasharray="3,3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" begin="3.5s" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
