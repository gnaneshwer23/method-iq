
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Database, BarChart, ArrowRight, Sparkles, Zap, LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: FlaskConical,
    title: "Research Protocol Management",
    description: "Streamline your research protocols with AI-powered optimization and version control.",
    benefits: ["Automated documentation", "Real-time collaboration", "Smart version tracking"]
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamlessly integrate with your existing lab equipment and data sources.",
    benefits: ["One-click connections", "Auto data normalization", "Secure data handling"]
  },
  {
    icon: BarChart,
    title: "Analytics & Insights",
    description: "Get actionable insights from your research data with advanced analytics.",
    benefits: ["Predictive modeling", "Pattern recognition", "Custom dashboards"]
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-background/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">OUR SERVICES</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Comprehensive Research Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We deliver end-to-end services designed to empower your research journey from protocol creation to data analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 border-primary/10 bg-card/70 backdrop-blur-sm animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-24 h-24 -translate-y-12 translate-x-12">
                <div className="w-full h-full bg-primary/10 rounded-full filter blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
              
              <CardHeader>
                <div className="mb-6 flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-3 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="group/btn px-0 py-0 h-auto text-primary hover:text-primary hover:bg-transparent">
                  <span className="flex items-center font-medium">
                    Learn more 
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Highlight */}
        <div className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-2xl border border-primary/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0">
              <LightbulbIcon className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3">Need a Custom Research Solution?</h3>
              <p className="text-muted-foreground mb-6">
                Our team of experts can design tailored solutions to meet your specific research requirements and challenges.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25 transition-all duration-300">
                <Link to="/contact">Contact Us Today <Zap className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
