
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Brain, CircuitBoard, Beaker, Sparkles, Lock, Users, TestTube } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-16 lg:py-24 overflow-visible relative">
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

          <div className="hidden lg:block relative h-[550px]">
            <div className="sticky top-24 w-full h-[550px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50/80 rounded-full w-80 h-80 backdrop-blur-md border border-blue-100/50 z-0"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/10 blur-xl animate-pulse z-0"></div>
                
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
                  <Brain className="w-24 h-24 text-blue-500 mb-4" />
                  <div className="text-blue-600 font-bold text-4xl">MethodIQ</div>
                </div>

                {/* Feature Card 1 - AI-Powered Protocols */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% - 230px)",
                        left: "50%",
                        transform: "translateX(-50%)"
                     }}>
                  <Link 
                    to="/features/ai-protocols"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "800ms" }}
                  >
                    <Brain className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">AI-Powered<br/>Protocols</div>
                  </Link>
                </div>

                {/* Feature Card 2 - Real-Time IoT Data */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% - 115px)",
                        left: "calc(50% + 200px)",
                        transform: "translateY(-50%)"
                     }}>
                  <Link 
                    to="/features/iot-integration"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "950ms" }}
                  >
                    <CircuitBoard className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">Real-Time<br/>IoT Data</div>
                  </Link>
                </div>

                {/* Feature Card 3 - Blockchain Verification */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% + 115px)",
                        left: "calc(50% + 200px)",
                        transform: "translateY(-50%)"
                     }}>
                  <Link 
                    to="/features/blockchain-verification"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "1100ms" }}
                  >
                    <Lock className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">Blockchain<br/>Verification</div>
                  </Link>
                </div>

                {/* Feature Card 4 - Research Analytics */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% + 230px)",
                        left: "50%",
                        transform: "translateX(-50%)"
                     }}>
                  <Link 
                    to="/features/research-analytics"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "1250ms" }}
                  >
                    <TestTube className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">Research<br/>Analytics</div>
                  </Link>
                </div>

                {/* Feature Card 5 - Professional Networking */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% + 115px)",
                        left: "calc(50% - 200px)",
                        transform: "translateY(-50%)"
                     }}>
                  <Link 
                    to="/features/networking"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "1400ms" }}
                  >
                    <Users className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">Professional<br/>Networking</div>
                  </Link>
                </div>

                {/* Feature Card 6 - AR/VR Training */}
                <div className="absolute"
                     style={{ 
                        top: "calc(50% - 115px)",
                        left: "calc(50% - 200px)",
                        transform: "translateY(-50%)"
                     }}>
                  <Link 
                    to="/features/ar-vr"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[160px] flex flex-col items-center animate-fade-up hover:scale-105"
                    style={{ animationDelay: "1550ms" }}
                  >
                    <Sparkles className="w-10 h-10 mb-2 text-blue-500" />
                    <div className="font-medium text-sm text-center">AR/VR<br/>Training</div>
                  </Link>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full z-5 pointer-events-none">
                  {/* Line to Top Card */}
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="12%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
                  </line>
                  
                  {/* Line to Top Right Card */}
                  <line 
                    x1="50%" y1="50%" x2="75%" y2="25%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="0.6s" />
                  </line>
                  
                  {/* Line to Bottom Right Card */}
                  <line 
                    x1="50%" y1="50%" x2="75%" y2="75%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="1.2s" />
                  </line>
                  
                  {/* Line to Bottom Card */}
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="88%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="1.8s" />
                  </line>
                  
                  {/* Line to Bottom Left Card */}
                  <line 
                    x1="50%" y1="50%" x2="25%" y2="75%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="2.4s" />
                  </line>
                  
                  {/* Line to Top Left Card */}
                  <line 
                    x1="50%" y1="50%" x2="25%" y2="25%" 
                    className="stroke-blue-200" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="3s" />
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
