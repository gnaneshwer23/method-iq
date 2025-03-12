
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Medal, Star, Calendar } from "lucide-react";

const awards = [
  {
    title: "Innovation Excellence Award 2023",
    organization: "Research Technology Institute",
    description: "Recognized for breakthrough advances in AI-driven research tools.",
    icon: Trophy
  },
  {
    title: "Best Research Platform 2023",
    organization: "Scientific Computing World",
    description: "Named the leading integrated research platform of the year.",
    icon: Award
  },
  {
    title: "Security Excellence Award",
    organization: "Blockchain Technology Review",
    description: "Awarded for outstanding implementation of secure research protocols.",
    icon: Medal
  }
];

export function Recognition() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our Achievements</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Awards & Recognition
          </h2>
          <p className="text-lg text-muted-foreground">
            Celebrating our commitment to excellence and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="relative group hover:shadow-xl transition-all duration-500 overflow-hidden h-full border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.1] to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16">
                  <div className="w-full h-full bg-primary/10 rounded-full filter blur-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                      <award.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>2023</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{award.title}</h3>
                  <p className="text-primary text-sm font-medium mb-3 flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {award.organization}
                  </p>
                  <p className="text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
