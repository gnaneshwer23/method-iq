
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Brain, CircuitBoard, Lock, Users, TestTube, Sparkles } from "lucide-react";
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

          <div className="hidden lg:block relative h-[650px]">
            <div className="sticky top-24 w-full h-[650px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Logo */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex flex-col items-center justify-center">
                    <Brain className="w-36 h-36 text-primary mb-4" />
                    <div className="text-primary font-bold text-5xl">MethodIQ</div>
                  </div>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                  {/* Dashed lines connecting to each feature card */}
                  <line 
                    x1="50%" y1="50%" x2="25%" y2="25%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="15%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <line 
                    x1="50%" y1="50%" x2="75%" y2="25%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <line 
                    x1="50%" y1="50%" x2="75%" y2="75%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <line 
                    x1="50%" y1="50%" x2="50%" y2="85%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                  <line 
                    x1="50%" y1="50%" x2="25%" y2="75%" 
                    className="stroke-primary/30" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                </svg>

                {/* Feature Card - AR/VR Training */}
                <div className="absolute" style={{ left: "15%", top: "25%" }}>
                  <Link 
                    to="/features/ar-vr"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <Sparkles className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">AR/VR<br/>Training</div>
                  </Link>
                </div>

                {/* Feature Card - AI-Powered Protocols */}
                <div className="absolute" style={{ left: "50%", top: "8%", transform: "translateX(-50%)" }}>
                  <Link 
                    to="/features/ai-protocols"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <Brain className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">AI-Powered<br/>Protocols</div>
                  </Link>
                </div>

                {/* Feature Card - Real-Time IoT Data */}
                <div className="absolute" style={{ right: "15%", top: "25%" }}>
                  <Link 
                    to="/features/iot-integration"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <CircuitBoard className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">Real-Time<br/>IoT Data</div>
                  </Link>
                </div>

                {/* Feature Card - Blockchain Verification */}
                <div className="absolute" style={{ right: "15%", top: "75%" }}>
                  <Link 
                    to="/features/blockchain-verification"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <Lock className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">Blockchain<br/>Verification</div>
                  </Link>
                </div>

                {/* Feature Card - Research Analytics */}
                <div className="absolute" style={{ left: "50%", bottom: "8%", transform: "translateX(-50%)" }}>
                  <Link 
                    to="/features/research-analytics"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <TestTube className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">Research<br/>Analytics</div>
                  </Link>
                </div>

                {/* Feature Card - Professional Networking */}
                <div className="absolute" style={{ left: "15%", top: "75%" }}>
                  <Link 
                    to="/features/networking"
                    className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
                  >
                    <Users className="w-12 h-12 mb-3 text-primary" />
                    <div className="font-medium text-center">Professional<br/>Networking</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
