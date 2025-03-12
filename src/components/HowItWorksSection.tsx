
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Database, Brain, Monitor, Users, Blocks, ArrowRight, Info, Sparkles, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: User,
    title: "Profile Setup & Onboarding",
    description: "Register and create your personalized research profile",
    details: [
      "Input your research interests and lab environment",
      "Set data preferences and integration options",
      "Configure your personalized dashboard"
    ],
    techDetail: "Secure user authentication with JWT/OAuth2 and encrypted data transmission",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Database,
    title: "Data Aggregation & Integration",
    description: "Collect data from literature, lab sensors, and external databases",
    details: [
      "Continuous aggregation of scientific literature",
      "Real-time lab sensor data integration",
      "Patent and clinical trial data collection"
    ],
    techDetail: "Microservices architecture using Docker and Kubernetes for scalable processing",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Brain,
    title: "AI Analysis & Recommendations",
    description: "Advanced AI processes your data for tailored insights",
    details: [
      "Personalized protocol recommendations",
      "Automated literature reviews",
      "Hypothesis generation assistance"
    ],
    techDetail: "LLM-powered analysis with explainable AI features",
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    icon: Monitor,
    title: "Real-Time Experimentation",
    description: "Simulate experiments using digital twins and live IoT data",
    details: [
      "Virtual lab environment simulation",
      "Real-time protocol optimization",
      "Risk-free experiment testing"
    ],
    techDetail: "Edge computing for IoT data processing and digital twin synchronization",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Users,
    title: "Collaboration & Networking",
    description: "Engage with peers and build your research network",
    details: [
      "Connect with global researchers",
      "Share insights and protocols",
      "Build your research portfolio"
    ],
    techDetail: "Secure networking platform with end-to-end encryption",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Blocks,
    title: "Immersive Training (Optional)",
    description: "Enhance skills with AR/MR training modules",
    details: [
      "Interactive technique practice",
      "Risk-free virtual training",
      "Progress tracking and certification"
    ],
    techDetail: "High-performance AR/MR rendering with WebXR integration",
    color: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background via-background/95 to-background relative"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative">
        {/* Enhanced Header with Animations */}
        <div className={cn(
          "max-w-3xl mx-auto mb-16 text-center transition-all duration-1000 transform",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary font-medium text-sm mb-2 tracking-wide border border-primary/20 rounded-full px-4 py-1">OUR PROCESS</span>
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Discover How MethodIQ Transforms Research
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A step-by-step journey from data to discovery—see how our integrated ecosystem streamlines and accelerates your research process.
          </p>
          <div className="relative p-6 border border-primary/20 rounded-lg bg-primary/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg opacity-30" />
            <p className="text-base text-muted-foreground relative z-10">
              MethodIQ leverages advanced AI, blockchain, IoT, and immersive technologies to deliver personalized research protocols and real-time experimental insights. Explore our process—from setting up your profile to collaborating with peers and optimizing experiments using digital twins.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden lg:block max-w-xs mx-auto mb-10">
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{
                width: activeStep !== null ? `${((activeStep + 1) / steps.length) * 100}%` : '16.6%',
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Start</span>
            <span>Process</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Enhanced Interactive Timeline */}
        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-[52px] bottom-8 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 md:left-1/2 md:-translate-x-px" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "group relative", 
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto',
                visible ? "animate-fade-up opacity-100" : "opacity-0",
              )}
              style={{ animationDelay: `${100 + index * 150}ms` }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connection Line */}
              <div 
                className={cn(
                  "absolute top-[28px]",
                  index % 2 === 0 
                    ? 'left-[35px] w-8 md:left-auto md:right-1/2 md:w-8' 
                    : 'left-[35px] w-8 md:left-1/2 md:w-8',
                  "h-px bg-primary/30 group-hover:bg-primary/60 transition-colors"
                )}
              />
              
              {/* Timeline Node */}
              <div 
                className={cn(
                  "absolute left-0 top-4 w-[18px] h-[18px] rounded-full border-4 border-background z-10 transition-all duration-300",
                  activeStep === index ? "bg-primary scale-125" : "bg-primary/40",
                  "md:left-1/2 md:-translate-x-1/2"
                )}
              />

              {/* Animated Glow Effect when active */}
              {activeStep === index && (
                <div 
                  className="absolute left-0 top-4 w-[18px] h-[18px] rounded-full bg-primary/40 animate-ping md:left-1/2 md:-translate-x-1/2"
                  style={{ animationDuration: '2s' }}
                />
              )}

              {/* Step Number - Small screens only */}
              <div className="absolute left-0 top-4 -ml-8 md:hidden">
                <span className="text-xs font-medium text-primary/70">{index + 1}</span>
              </div>

              <Card className={cn(
                "relative ml-16 md:ml-0 md:w-[calc(100%-4rem)]", 
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto',
                "transition-all duration-500 hover:shadow-lg group-hover:shadow-primary/10",
                "overflow-hidden backdrop-blur-sm border-primary/10",
                activeStep === index ? 'bg-primary/5 scale-[1.02] shadow-lg' : '',
              )}>
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                  step.color
                )} />
                
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform duration-300",
                        step.bgColor
                      )}>
                        <step.icon className={cn("w-7 h-7", step.iconColor)} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-primary/90 transition-colors duration-300">{step.title}</h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{step.techDetail}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li 
                            key={detailIndex} 
                            className={cn(
                              "flex items-start gap-2 text-sm text-muted-foreground transition-all",
                              activeStep === index ? "translate-x-2" : ""
                            )}
                            style={{ transitionDelay: `${detailIndex * 50}ms` }}
                          >
                            <CheckCircle className={cn(
                              "w-4 h-4 mt-0.5 transition-colors",
                              step.iconColor
                            )} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Active Indicator */}
                      {activeStep === index && (
                        <div className="mt-4 flex items-center text-sm text-primary/80 animate-fade-up">
                          <Zap className="w-4 h-4 mr-1" />
                          <span>Currently viewing</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className={cn(
          "mt-20 text-center relative transition-all duration-1000 transform",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-lg opacity-30" />
          <div className="relative px-6 py-12 backdrop-blur-sm rounded-lg border border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 rounded-lg" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary/70" />
              </div>
              <h3 className="text-2xl font-semibold mb-6">Ready to Transform Your Research?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of researchers who have accelerated their discoveries and optimized their experimental processes with MethodIQ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25 transition-all duration-300 group">
                  <Link to="/contact">
                    Get Started Now
                    <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <Link to="/demo">Schedule a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
