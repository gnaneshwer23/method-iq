
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";

export function BlogCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-secondary/70 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Never Miss an Insight
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join our community of innovators and stay ahead of the latest research trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
              <Mail className="mr-2 h-4 w-4" />
              Subscribe Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary">
              <MessageSquare className="mr-2 h-4 w-4" />
              Join the Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
