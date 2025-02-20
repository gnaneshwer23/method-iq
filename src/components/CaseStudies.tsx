
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Research Director",
    institution: "Pacific Institute of Biotechnology",
    quote: "MethodIQ has transformed how we approach protocol optimization. The AI-driven recommendations have increased our success rate by 40%.",
    metric: "40% increase in experimental success rate"
  },
  {
    name: "Prof. James Williams",
    role: "Principal Investigator",
    institution: "European Research Center",
    quote: "The real-time monitoring and digital twin capabilities have revolutionized our lab operations. We can now predict and prevent issues before they occur.",
    metric: "60% reduction in failed experiments"
  },
  {
    name: "Dr. Maria Rodriguez",
    role: "Lead Researcher",
    institution: "Global Research Initiative",
    quote: "The collaborative features and immersive training modules have significantly accelerated our team's learning curve and productivity.",
    metric: "3x faster onboarding for new researchers"
  }
];

export function CaseStudies() {
  return (
    <section className="py-24 relative bg-secondary/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
          <p className="text-lg text-muted-foreground">
            Learn how leading researchers are achieving breakthrough results with MethodIQ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <CardTitle className="text-xl mb-2">{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.institution}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="p-3 rounded-lg bg-primary/10 inline-block">
                  <p className="text-sm font-medium text-primary">{testimonial.metric}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Ready to Transform Your Research?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">
                Experience the Future of Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/case-studies">View Detailed Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
