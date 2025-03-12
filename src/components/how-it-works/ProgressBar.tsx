
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  activeStep: number | null;
  totalSteps: number;
}

export function ProgressBar({ activeStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="hidden lg:block max-w-xs mx-auto mb-10">
      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{
            width: activeStep !== null ? `${((activeStep + 1) / totalSteps) * 100}%` : '16.6%',
          }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Start</span>
        <span>Process</span>
        <span>Complete</span>
      </div>
    </div>
  );
}
