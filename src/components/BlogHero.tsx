
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

export function BlogHero() {
  const { toast } = useToast();

  const handleSubscribe = () => {
    // This would typically open a modal or handle the subscription
    toast({
      title: "Coming Soon!",
      description: "Newsletter subscription will be available shortly.",
    });
  };

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Insights That Inspire Innovation
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Stay up-to-date with the latest research breakthroughs, industry trends, and thought leadership from MethodIQ.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleSubscribe}>
            Subscribe for Updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
