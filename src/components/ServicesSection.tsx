
import { Headphones, Award, MessageSquare, Users, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Headphones,
    title: "Expert Consultations & Workshops",
    description: "Schedule one-on-one sessions or group workshops with leading research experts to optimize your experimental design.",
  },
  {
    icon: Award,
    title: "Certification Programs",
    description: "Earn accredited certifications to validate your research skills and enhance your professional profile.",
  },
  {
    icon: MessageSquare,
    title: "Dedicated Customer Support",
    description: "Our support team is available 24/7 to help you integrate and get the most out of MethodIQ.",
  },
  {
    icon: Users,
    title: "Community Engagement and Networking",
    description: "Join our active research community to share insights, ask questions, and collaborate on projects.",
  },
  {
    icon: Mail,
    title: "Newsletter and Data Insights",
    description: "Subscribe to our curated newsletter for the latest research trends, data analytics reports, and expert insights.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive support to help you succeed with MethodIQ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4">{service.title}</CardTitle>
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
