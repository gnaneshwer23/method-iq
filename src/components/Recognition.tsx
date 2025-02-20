
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

const awards = [
  {
    title: "Innovation Excellence Award 2023",
    organization: "Research Technology Institute",
    description: "Recognized for breakthrough advances in AI-driven research tools."
  },
  {
    title: "Best Research Platform 2023",
    organization: "Scientific Computing World",
    description: "Named the leading integrated research platform of the year."
  },
  {
    title: "Security Excellence Award",
    organization: "Blockchain Technology Review",
    description: "Awarded for outstanding implementation of secure research protocols."
  }
];

export function Recognition() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
          <p className="text-lg text-muted-foreground">
            Celebrating our commitment to excellence and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                <p className="text-primary text-sm mb-2">{award.organization}</p>
                <p className="text-muted-foreground">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
