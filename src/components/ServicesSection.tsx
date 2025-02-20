
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PresentationIcon, Award, Mail, Network, BarChart } from "lucide-react";

const services = [
  {
    icon: PresentationIcon,
    title: "Expert Consultations & Workshops",
    description: "Schedule personalized sessions with leading research experts to optimize your experimental designs and protocols."
  },
  {
    icon: Award,
    title: "Certification Programs",
    description: "Earn accredited certifications that validate your research skills and enhance your professional profile."
  },
  {
    icon: Mail,
    title: "Curated Newsletters & Insight Reports",
    description: "Stay informed with our regularly published insights, trend reports, and expert articles tailored to the research community."
  },
  {
    icon: Network,
    title: "Collaborative Networking Tools",
    description: "Access a dedicated community platform to share insights, build collaborations, and showcase your research portfolio."
  },
  {
    icon: BarChart,
    title: "Data Analytics & Trend Dashboards",
    description: "Utilize real-time analytics to track emerging trends, benchmark your research, and drive strategic decisions."
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5 relative">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive support services to enhance your research journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
