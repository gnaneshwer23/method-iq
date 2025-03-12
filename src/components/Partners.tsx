
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ExternalLink } from "lucide-react";

const partners = [
  {
    name: "BioTech Institute",
    logo: "https://via.placeholder.com/150x80",
    description: "Leading research institution specializing in biotechnology innovation."
  },
  {
    name: "Global Research Hub",
    logo: "https://via.placeholder.com/150x80",
    description: "International network of research facilities and laboratories."
  },
  {
    name: "TechFlow Solutions",
    logo: "https://via.placeholder.com/150x80",
    description: "Advanced technology provider for research automation."
  }
];

export function Partners() {
  return (
    <section className="py-24 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-secondary/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our Collaborators</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Our Partners
          </h2>
          <p className="text-lg text-muted-foreground">
            Collaborating with leading institutions to advance scientific research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-card/50 border-primary/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <CardContent className="p-6 text-center">
                <div className="mb-6 h-20 flex items-center justify-center">
                  <div className="rounded-xl bg-white/10 p-3 shadow-inner backdrop-blur-sm">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-14 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{partner.name}</h3>
                <p className="text-muted-foreground mb-4">{partner.description}</p>
                <a href="#" className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Visit website <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
