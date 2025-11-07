import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CallToActionProps {
  visible: boolean;
}

export function CallToAction({ visible }: CallToActionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  return (
    <div ref={ref} className={cn(
      "mt-20 text-center relative transition-all duration-1000 transform",
      visible && isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
              <Link to="/register">
                Get Started Now
                <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-300">
              <Link to="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
