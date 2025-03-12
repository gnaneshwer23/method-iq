
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Network, FlaskConical, Shield, Glasses, Cloud, Zap, Sparkles, Rocket, Cpu, Globe, Lock } from "lucide-react";
import { useState } from "react";

const technologies = [
  {
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    title: "Advanced AI & Machine Learning",
    description: "Our platform leverages advanced, explainable large language models that process vast scientific literature and experimental data to generate personalized protocol recommendations.",
    features: [
      "Explainable LLMs & Deep Learning",
      "AGI-Inspired Self-Improvement",
      "Automated Meta-Analysis"
    ]
  },
  {
    icon: Network,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    title: "Data Integration & Analytics",
    description: "MethodIQ aggregates data from multiple sources into dynamic, self-updating knowledge graphs that reveal hidden connections and emerging trends.",
    features: [
      "Dynamic Knowledge Graphs",
      "Automated Literature Review",
      "Real-time Analytics"
    ]
  },
  {
    icon: FlaskConical,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    title: "Real-Time Experimentation Tools",
    description: "Lab sensors feed real-time data into our platform via edge computing, ensuring immediate processing and actionable insights for dynamic experimental adjustments.",
    features: [
      "IoT Sensor Integration",
      "Edge Computing",
      "Digital Twin Simulation"
    ]
  },
  {
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    title: "Cybersecurity & Data Privacy",
    description: "Each research protocol is securely recorded on a blockchain, ensuring tamper-proof documentation and reliable intellectual property tracking.",
    features: [
      "Blockchain Verification",
      "Federated Learning",
      "End-to-end Encryption"
    ]
  },
  {
    icon: Glasses,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    title: "Immersive Collaboration & Training",
    description: "Experience immersive, hands-on training through augmented and mixed reality modules that simulate complex lab techniques in a collaborative virtual environment.",
    features: [
      "AR/MR Training Modules",
      "Virtual Lab Simulation",
      "Interactive Collaboration"
    ]
  },
  {
    icon: Cloud,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    title: "Deployment & Scalability",
    description: "Our platform is deployed using Docker and orchestrated with Kubernetes, ensuring dynamic scaling, efficient load balancing, and seamless continuous integration/deployment.",
    features: [
      "Docker & Kubernetes",
      "Cloud Infrastructure",
      "Global Availability"
    ]
  }
];

export function TechnologyDetails() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/5 to-background opacity-70" />
      <div className="absolute top-0 left-0 w-full h-64 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">OUR EXPERTISE</span>
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Detailed Technology Components
          </h2>
          <p className="text-lg text-muted-foreground">
            Each component of our technology stack is carefully designed to work together seamlessly, providing a comprehensive research solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-500 border border-primary/10 animate-fade-up hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background gradient based on card type */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${tech.bgColor} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 -translate-y-12 translate-x-12">
                <div className={`w-full h-full ${tech.bgColor} rounded-full filter blur-xl opacity-50 group-hover:opacity-70 transition-all duration-300`} />
              </div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl ${tech.bgColor} flex items-center justify-center mb-1 shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <tech.icon className={`w-7 h-7 ${tech.color}`} />
                  </div>
                  {hoveredCard === index && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-fade-up">
                      <Rocket className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${tech.color}`}>
                  {tech.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-6 text-sm">{tech.description}</p>
                <ul className="space-y-3">
                  {tech.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center gap-3 text-sm group/feature"
                      style={{ 
                        transitionDelay: `${featureIndex * 50 + 200}ms`,
                        opacity: hoveredCard === index ? 1 : 0.8,
                        transform: `translateY(${hoveredCard === index ? 0 : 2}px)`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full ${tech.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Sparkles className={`w-3.5 h-3.5 ${tech.color} group-hover/feature:animate-pulse`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Added bottom CTA section */}
        <div className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-2xl border border-primary/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0">
              <Cpu className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-3">Ready to Experience Our Technology?</h3>
              <p className="text-muted-foreground mb-6">
                Schedule a personalized demo to see how our cutting-edge technology stack can transform your research process.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/demo" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  <Zap className="w-5 h-5" />
                  <span>Request Demo</span>
                </a>
                <a href="/contact" className="flex items-center gap-2 px-6 py-3 bg-transparent border border-primary/20 hover:bg-primary/5 text-foreground rounded-lg transition-all duration-300">
                  <Globe className="w-5 h-5" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
