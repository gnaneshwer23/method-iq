
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { HowItWorksStep } from "./how-it-works/HowItWorksStep";
import { ProgressBar } from "./how-it-works/ProgressBar";
import { CallToAction } from "./how-it-works/CallToAction";
import { SectionHeader } from "./how-it-works/SectionHeader";
import { steps } from "./how-it-works/stepsData";

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
        {/* Section Header */}
        <SectionHeader visible={visible} />

        {/* Progress Bar */}
        <ProgressBar activeStep={activeStep} totalSteps={steps.length} />

        {/* Enhanced Interactive Timeline */}
        <div className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-[52px] bottom-8 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 md:left-1/2 md:-translate-x-px" />
          
          {steps.map((step, index) => (
            <HowItWorksStep 
              key={index}
              step={step}
              index={index}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              visible={visible}
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <CallToAction visible={visible} />
      </div>
    </section>
  );
}
