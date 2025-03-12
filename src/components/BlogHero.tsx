
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

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
    <section className="py-24 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_50%)]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm">
            <Sparkles className="h-4 w-4" />
            Research & Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight">
            Insights That Inspire Innovation
          </h1>
          <p className="text-xl mb-10 text-muted-foreground">
            Stay up-to-date with the latest research breakthroughs, industry trends, and thought leadership from MethodIQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={handleSubscribe}>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe for Updates
            </Button>
            <Button size="lg" variant="outline" className="group">
              Browse Articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
