
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, Info, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProps } from "./types";

interface HowItWorksStepProps {
  step: StepProps;
  index: number;
  activeStep: number | null;
  setActiveStep: (index: number | null) => void;
  visible: boolean;
}

export function HowItWorksStep({ step, index, activeStep, setActiveStep, visible }: HowItWorksStepProps) {
  return (
    <div
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
  );
}
