
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, Lock, ArrowUpRight, ExternalLink } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously push boundaries by integrating cutting-edge technology with creative problem-solving."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Our platform and culture foster teamwork, enabling researchers to share insights and achieve breakthrough discoveries together."
  },
  {
    icon: Lock,
    title: "Security",
    description: "We prioritize data protection and privacy through advanced blockchain and encryption technologies."
  },
  {
    icon: ArrowUpRight,
    title: "Continuous Improvement",
    description: "We're committed to constant evolution and refinement of our platform based on user feedback and emerging technologies."
  }
];

export function Values() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our Principles</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide our mission and shape our culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className="relative group hover:shadow-lg transition-all duration-500 h-full overflow-hidden border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-primary/5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                    <value.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{value.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <a href="#" className="flex items-center text-sm font-medium text-primary">
                      Learn more <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
