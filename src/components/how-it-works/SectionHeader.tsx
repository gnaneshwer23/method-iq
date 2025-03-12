
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  visible: boolean;
}

export function SectionHeader({ visible }: SectionHeaderProps) {
  return (
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
  );
}
