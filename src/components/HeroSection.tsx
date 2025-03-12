
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Brain, CircuitBoard, Beaker, Sparkles, Lock, Users, TestTube } from "lucide-react";
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

          <div className="hidden lg:block relative h-[550px]">
            <div className="sticky top-24 w-full h-[550px] flex items-center justify-center">
              {/* Feature diagram with perfectly centered MethodIQ logo and evenly distributed elements */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Hub with MethodIQ logo - enlarged and properly centered */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100/60 rounded-full w-72 h-72 backdrop-blur-lg border border-blue-200/30 flex flex-col items-center justify-center z-10 shadow-lg shadow-blue-300/10">
                  <Brain className="w-12 h-12 text-blue-500 mb-3" />
                  <div className="text-blue-600 font-semibold text-2xl">MethodIQ</div>
                </div>

                {/* Feature Cards in a perfect circular arrangement with equal distances */}
                <div className="w-full h-full absolute inset-0">
                  {/* Top feature */}
                  <Link 
                    to="/features#ai-protocols"
                    className="absolute left-1/2 top-[8%] transform -translate-x-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "800ms" }}
                  >
                    <Brain className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">AI-Powered<br/>Protocols</div>
                  </Link>

                  {/* Top-right feature */}
                  <Link 
                    to="/features#iot"
                    className="absolute right-[18%] top-[26%] transform -translate-y-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "950ms" }}
                  >
                    <CircuitBoard className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">Real-Time<br/>IoT Data</div>
                  </Link>

                  {/* Bottom-right feature */}
                  <Link 
                    to="/features#blockchain"
                    className="absolute right-[18%] bottom-[26%] transform translate-y-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "1100ms" }}
                  >
                    <Lock className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">Blockchain<br/>Verification</div>
                  </Link>

                  {/* Bottom feature */}
                  <Link 
                    to="/features#research-analytics"
                    className="absolute left-1/2 bottom-[8%] transform -translate-x-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "1250ms" }}
                  >
                    <TestTube className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">Research<br/>Analytics</div>
                  </Link>

                  {/* Bottom-left feature */}
                  <Link 
                    to="/features#networking"
                    className="absolute left-[18%] bottom-[26%] transform translate-y-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "1400ms" }}
                  >
                    <Users className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">Professional<br/>Networking</div>
                  </Link>

                  {/* Top-left feature */}
                  <Link 
                    to="/features#ar-vr"
                    className="absolute left-[18%] top-[26%] transform -translate-y-1/2 bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-lg border border-blue-100 text-center w-[160px] flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: "1550ms" }}
                  >
                    <Sparkles className="w-10 h-10 mb-3 text-blue-500" />
                    <div className="font-medium text-sm">AR/VR<br/>Training</div>
                  </Link>
                </div>

                {/* Connection lines from center to each feature */}
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  {/* Line to Top */}
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="8%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
                  </line>
                  
                  {/* Line to Top-Right */}
                  <line 
                    x1="50%" y1="50%" x2="82%" y2="26%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="0.6s" />
                  </line>
                  
                  {/* Line to Bottom-Right */}
                  <line 
                    x1="50%" y1="50%" x2="82%" y2="74%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="1.2s" />
                  </line>
                  
                  {/* Line to Bottom */}
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="92%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="1.8s" />
                  </line>
                  
                  {/* Line to Bottom-Left */}
                  <line 
                    x1="50%" y1="50%" x2="18%" y2="74%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="2.4s" />
                  </line>
                  
                  {/* Line to Top-Left */}
                  <line 
                    x1="50%" y1="50%" x2="18%" y2="26%" 
                    className="stroke-blue-200/70" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  >
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" begin="3s" />
                  </line>
                </svg>
                
                {/* Subtle pulsing glow effect behind center logo */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-400/10 blur-xl animate-pulse z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
