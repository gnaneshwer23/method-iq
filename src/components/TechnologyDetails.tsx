
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Network, FlaskConical, Shield, Glasses, Cloud } from "lucide-react";

const technologies = [
  {
    icon: Brain,
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
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Detailed Technology Components</h2>
          <p className="text-lg text-muted-foreground">
            Each component of our technology stack is carefully designed to work together seamlessly, providing a comprehensive research solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{tech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tech.description}</p>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
