
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Join Our Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Be part of the revolution in scientific research and discovery
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25">
              <Link to="/contact" className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group hover:border-primary/50">
              <Link to="/careers" className="flex items-center">
                <BriefcaseIcon className="mr-2 h-5 w-5" />
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
