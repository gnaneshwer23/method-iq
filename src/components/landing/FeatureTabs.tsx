import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Brain, Microscope, Network, Cpu, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import protocolsImg from "@/assets/feature-protocols.jpg";
import experimentsImg from "@/assets/feature-experiments.jpg";
import federatedImg from "@/assets/feature-federated.jpg";
import twinsImg from "@/assets/feature-twins.jpg";

const featureImages: Record<string, string> = {
  protocols: protocolsImg,
  experiments: experimentsImg,
  federated: federatedImg,
  twins: twinsImg,
};

interface Feature {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

const features: Feature[] = [
  {
    id: "protocols",
    label: "Smart Protocols",
    icon: Brain,
    title: "AI-Powered Protocol Discovery",
    description: "Find, validate, and share research protocols with intelligent recommendations tailored to your research needs.",
    benefits: [
      "AI-powered search with semantic understanding",
      "Blockchain-verified protocol authenticity",
      "Community ratings and peer reviews",
      "Version control and protocol history"
    ],
    image: "protocols"
  },
  {
    id: "experiments",
    label: "Experiments",
    icon: Microscope,
    title: "Track & Analyze Experiments",
    description: "Monitor your experimental progress, analyze results in real-time, and share findings with your team.",
    benefits: [
      "Real-time data visualization",
      "Automated result analysis",
      "Collaborative experiment tracking",
      "Integration with lab equipment"
    ],
    image: "experiments"
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Network,
    title: "Federated Learning Network",
    description: "Train models collaboratively while maintaining data privacy through cutting-edge federated learning.",
    benefits: [
      "Privacy-preserving machine learning",
      "Distributed model training",
      "Reputation-based quality control",
      "Real-time model aggregation"
    ],
    image: "federated"
  },
  {
    id: "digital-twins",
    label: "Digital Twins",
    icon: Cpu,
    title: "Virtual Experiment Simulation",
    description: "Create digital replicas of your experiments to test hypotheses and optimize protocols before lab work.",
    benefits: [
      "3D visualization of experiments",
      "Parameter optimization",
      "Cost-effective testing",
      "Predictive analytics"
    ],
    image: "twins"
  }
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("protocols");
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className={cn(
        "container mx-auto px-4 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Research</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of tools designed to accelerate your research
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 lg:grid-cols-4 h-auto mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex items-center gap-2 py-3"
              >
                <feature.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{feature.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="animate-fade-in"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    <feature.icon className="w-4 h-4" />
                    {feature.label}
                  </div>
                  
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground">{feature.description}</p>

                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="mt-4">
                    <Link to={`/${feature.id}`}>
                      Explore {feature.label}
                    </Link>
                  </Button>
                </div>

                <Card className="p-2 sm:p-3 bg-gradient-to-br from-primary/5 to-transparent border-primary/10 overflow-hidden">
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={featureImages[feature.image]}
                      alt={feature.title}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
