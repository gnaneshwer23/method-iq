
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, Lock, ArrowUpRight } from "lucide-react";

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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide our mission and shape our culture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
