
import { Card } from "@/components/ui/card";
import { Brain, Blocks, Share2, Laptop, FlaskConical } from "lucide-react";

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
  },
  {
    icon: FlaskConical,
    title: "Smart Lab Automation",
    description: "Automate repetitive tasks and streamline your workflow with intelligent lab management tools."
  }
];

export function IntroSection() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-secondary/50" />
      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto mb-12 text-center relative z-20">
          <h2 className="text-3xl font-bold mb-4 text-foreground relative">
            Where Advanced Technology Meets Scientific Innovation
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines AI, VR/AR simulations, blockchain documentation, and IoT integration to deliver research methods optimized for your unique setup.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-20">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <feature.icon className="h-10 w-10 mb-4 text-primary relative z-10" />
              <h3 className="font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
