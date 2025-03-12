
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Database, FlaskConical } from "lucide-react";

const services = [
  {
    icon: FlaskConical,
    title: "Research Protocol Management",
    description: "Streamline your research protocols with AI-powered optimization and version control."
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamlessly integrate with your existing lab equipment and data sources."
  },
  {
    icon: BarChart,
    title: "Analytics & Insights",
    description: "Get actionable insights from your research data with advanced analytics."
  }
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="backdrop-blur-sm bg-card/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
