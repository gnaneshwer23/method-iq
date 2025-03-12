
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Server, Database, Cloud, Zap, Shield, Cpu, Globe } from "lucide-react";

const stackLayers = [
  {
    icon: Laptop,
    title: "User Interface Layer",
    description: "Web & mobile apps, AR/MR modules",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
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
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500",
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
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
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
    color: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-500",
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
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/50 opacity-50" />
      
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">OUR ARCHITECTURE</span>
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Technology Stack</h2>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive technology stack that powers the MethodIQ platform
          </p>
        </div>

        <div className="space-y-6">
          {stackLayers.map((layer, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-xl bg-opacity-70 backdrop-blur-sm animate-fade-up ${
                activeLayer === index ? 'scale-[1.02] shadow-lg shadow-primary/10' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveLayer(index)}
              onMouseLeave={() => setActiveLayer(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} transition-opacity duration-300 ${
                activeLayer === index ? 'opacity-100' : 'opacity-60'
              }`} />
              
              <CardHeader className="flex md:flex-row items-start gap-6 relative z-10">
                <div className={`w-16 h-16 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 ${
                  activeLayer === index ? 'scale-110' : ''
                }`}>
                  <layer.icon className={`w-8 h-8 ${layer.iconColor}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 flex items-center gap-2">
                    {layer.title}
                    {activeLayer === index && <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />}
                  </CardTitle>
                  <p className="text-muted-foreground">{layer.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {layer.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className={`p-4 rounded-lg bg-background/80 backdrop-blur-sm shadow-sm border border-primary/5 transition-all duration-300 ${
                        activeLayer === index ? 'translate-y-0 opacity-100' : 'opacity-80'
                      }`}
                      style={{ 
                        transitionDelay: `${detailIndex * 50}ms`,
                      }}
                    >
                      <p className="text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Adding a connecting visual element between stack layers */}
        <div className="hidden md:flex flex-col items-center mx-auto my-4 w-2">
          {[0, 1, 2].map((index) => (
            <div key={index} className="h-8 w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent my-0.5"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
