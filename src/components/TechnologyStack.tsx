
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Server, Database, Cloud } from "lucide-react";

const stackLayers = [
  {
    icon: Laptop,
    title: "User Interface Layer",
    description: "Web & mobile apps, AR/MR modules",
    details: [
      "Responsive web applications",
      "Native mobile experiences",
      "AR/MR training modules",
      "Real-time data visualization"
    ]
  },
  {
    icon: Server,
    title: "Application & Microservices Layer",
    description: "AI engines, blockchain services, IoT integration",
    details: [
      "AI recommendation engine",
      "Blockchain verification",
      "IoT data processing",
      "Digital twin simulations"
    ]
  },
  {
    icon: Database,
    title: "Data & Security Layer",
    description: "Knowledge graphs, encryption, blockchain",
    details: [
      "Dynamic knowledge graphs",
      "End-to-end encryption",
      "Federated learning",
      "Secure data storage"
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure Layer",
    description: "Docker, Kubernetes, Cloud hosting",
    details: [
      "Container orchestration",
      "Auto-scaling",
      "Load balancing",
      "Global CDN"
    ]
  }
];

export function TechnologyStack() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-secondary/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive technology stack that powers the MethodIQ platform
          </p>
        </div>

        <div className="space-y-6">
          {stackLayers.map((layer, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 ${
                activeLayer === index ? 'shadow-lg shadow-primary/5' : ''
              }`}
              onMouseEnter={() => setActiveLayer(index)}
              onMouseLeave={() => setActiveLayer(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader className="flex md:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <layer.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{layer.title}</CardTitle>
                  <p className="text-muted-foreground">{layer.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {layer.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="p-3 rounded-lg bg-background/50 backdrop-blur-sm"
                    >
                      <p className="text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
