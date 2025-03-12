
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, BriefcaseIcon, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_60%)]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-card/30 backdrop-blur-sm p-10 rounded-3xl border border-primary/10 shadow-lg">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
            Join Our Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Be part of the revolution in scientific research and discovery. Together, we can transform the future of scientific methodologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 group">
              <Link to="/contact" className="flex items-center px-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-primary/5 transition-all duration-300">
              <Link to="/careers" className="flex items-center px-6">
                <BriefcaseIcon className="mr-2 h-5 w-5" />
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 pt-10 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary flex items-center transition-colors">
              <ExternalLink className="w-3 h-3 mr-1" /> Privacy Policy
            </a>
            <a href="#" className="hover:text-primary flex items-center transition-colors">
              <ExternalLink className="w-3 h-3 mr-1" /> Terms of Service
            </a>
            <a href="#" className="hover:text-primary flex items-center transition-colors">
              <ExternalLink className="w-3 h-3 mr-1" /> Career Opportunities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
