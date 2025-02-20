
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BlogCTA() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Never Miss an Insight</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of innovators and stay ahead of the latest research trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Subscribe Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Join the Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
