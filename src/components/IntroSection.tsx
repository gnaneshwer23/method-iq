
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
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <span className="inline-block text-primary font-semibold text-sm mb-4 tracking-wide uppercase">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Where Advanced Technology<br />Meets Scientific Innovation
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our platform combines AI, VR/AR simulations, blockchain documentation, and IoT integration to deliver research methods optimized for your unique setup.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-xl transition-all duration-300 hover-scale border-border/50 group"
            >
              <feature.icon className="h-12 w-12 mb-6 text-primary group-hover:text-primary/80 transition-colors" />
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
