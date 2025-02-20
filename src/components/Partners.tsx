
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
          <p className="text-lg text-muted-foreground">
            Collaborating with leading institutions to advance scientific research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="mx-auto mb-4 h-20 object-contain"
                />
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
