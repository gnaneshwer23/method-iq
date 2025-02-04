
import { Card } from "@/components/ui/card";
import { Brain, Blocks, Share2, Laptop } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Advanced algorithms analyze research patterns to provide personalized method recommendations."
  },
  {
    icon: Blocks,
    title: "VR/AR Simulations",
    description: "Visualize and validate methods before implementation with immersive technology."
  },
  {
    icon: Share2,
    title: "Community Driven",
    description: "Connect with peers and leverage collective knowledge for better research outcomes."
  },
  {
    icon: Laptop,
    title: "IoT Integration",
    description: "Seamlessly connect with lab equipment for real-time data collection and analysis."
  }
];

export function IntroSection() {
  return (
    <section className="py-12 bg-secondary/50">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Where Advanced Technology Meets Scientific Innovation
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines AI, VR/AR simulations, blockchain documentation, and IoT integration to deliver research methods optimized for your unique setup.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <feature.icon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
