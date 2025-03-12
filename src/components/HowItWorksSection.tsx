
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Database, Brain, Monitor, Users, Blocks, ArrowRight, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
    techDetail: "Secure user authentication with JWT/OAuth2 and encrypted data transmission"
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
    techDetail: "Microservices architecture using Docker and Kubernetes for scalable processing"
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
    techDetail: "LLM-powered analysis with explainable AI features"
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
    techDetail: "Edge computing for IoT data processing and digital twin synchronization"
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
    techDetail: "Secure networking platform with end-to-end encryption"
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
    techDetail: "High-performance AR/MR rendering with WebXR integration"
  }
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/95 to-background relative">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative">
        {/* Enhanced Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block text-primary font-medium text-sm mb-2 tracking-wide">OUR PROCESS</span>
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Discover How MethodIQ Transforms Research
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A step-by-step journey from data to discovery—see how our integrated ecosystem streamlines and accelerates your research process.
          </p>
          <p className="text-base text-muted-foreground">
            MethodIQ leverages advanced AI, blockchain, IoT, and immersive technologies to deliver personalized research protocols and real-time experimental insights. Explore our process—from setting up your profile to collaborating with peers and optimizing experiments using digital twins.
          </p>
        </div>

        {/* Enhanced Interactive Timeline */}
        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-[52px] bottom-8 w-px bg-primary/30 md:left-1/2 md:-translate-x-px" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connection Line */}
              <div 
                className={`absolute top-[28px] ${
                  index % 2 === 0 
                    ? 'left-[35px] w-8 md:left-auto md:right-1/2 md:w-8' 
                    : 'left-[35px] w-8 md:left-1/2 md:w-8'
                } h-px bg-primary/30 group-hover:bg-primary/60 transition-colors`}
              />
              
              {/* Timeline Node */}
              <div 
                className={`absolute left-0 top-4 w-[18px] h-[18px] rounded-full border-4 border-background ${
                  activeStep === index ? 'bg-primary' : 'bg-primary/40'
                } transition-colors md:left-1/2 md:-translate-x-1/2 z-10`}
              />

              {/* Animated Glow Effect when active */}
              {activeStep === index && (
                <div 
                  className="absolute left-0 top-4 w-[18px] h-[18px] rounded-full bg-primary/40 animate-ping md:left-1/2 md:-translate-x-1/2"
                  style={{ animationDuration: '2s' }}
                />
              )}

              <Card className={`
                relative ml-16 md:ml-0 md:w-[calc(100%-4rem)] 
                ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
                hover:shadow-lg transition-all duration-300 group-hover:shadow-primary/10
                overflow-hidden backdrop-blur-sm border-primary/10
                ${activeStep === index ? 'bg-primary/5' : ''}
              `}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.09] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-7 h-7 text-primary" />
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
                          <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-lg opacity-30" />
          <div className="relative px-6 py-10 backdrop-blur-sm rounded-lg">
            <Sparkles className="mx-auto w-10 h-10 text-primary/70 mb-4" />
            <h3 className="text-2xl font-semibold mb-6">Ready to Transform Your Research?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25 transition-all duration-300">
                <Link to="/contact">Get Started Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-300">
                <Link to="/demo">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
