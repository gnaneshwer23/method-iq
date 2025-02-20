
import { User, Search, Brain, Monitor, Users, Settings, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: User,
    title: "Profile Setup",
    points: [
      "Register and complete your research profile with lab specialties and current protocols.",
      "Our AI system processes this information to create your personalized research environment.",
      "Backend: Secure user authentication with JWT/OAuth2 and encrypted data transmission."
    ]
  },
  {
    icon: Brain,
    title: "Data Collection & Analysis",
    points: [
      "AI agents analyze your needs, automatically scrape relevant literature, and aggregate data from lab sensors.",
      "Advanced ML models process multiple data streams simultaneously.",
      "Infrastructure: Microservices architecture using Docker and Kubernetes for scalable processing."
    ]
  },
  {
    icon: Monitor,
    title: "Personalized Recommendations",
    points: [
      "Receive tailored protocols with blockchain verification and real-time sensor data integration.",
      "Each protocol is secured with tamper-proof blockchain technology.",
      "Technology: Integration with blockchain (Web3.py) and real-time IoT data streams (MQTT)."
    ]
  },
  {
    icon: Users,
    title: "Collaboration & Networking",
    points: [
      "Connect with peers, build your research portfolio, and share insights through our community platform.",
      "Engage in real-time discussions and collaborative research projects.",
      "Platform: Cloud-hosted on AWS/Azure/Google Cloud for robust performance and scalability."
    ]
  },
  {
    icon: Settings,
    title: "Advanced Tools & Training",
    points: [
      "Access our suite of AI research tools for literature reviews, hypothesis generation, and proposal drafting.",
      "Optional: Immerse yourself in virtual lab training with AR/VR modules.",
      "Framework: CI/CD pipelines ensure rapid, secure updates to tools and features."
    ]
  },
  {
    icon: Shield,
    title: "Security & Continuous Improvement",
    points: [
      "Your feedback and usage data enhance our AI models and service offerings.",
      "All data is protected with enterprise-grade security measures.",
      "Security: TLS/SSL encryption, blockchain verification, and regular security audits."
    ]
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">How MethodIQ Works</h2>
          <p className="text-lg text-muted-foreground">
            Explore our advanced technology stack and process flow
          </p>
        </div>

        <div className="space-y-8 relative">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Step {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <ul className="space-y-3">
                    {step.points.map((point, pointIndex) => (
                      <li 
                        key={pointIndex} 
                        className={`text-muted-foreground ${
                          pointIndex === 2 ? 'text-sm italic' : ''
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Connecting line between steps */}
          <div className="absolute left-6 top-16 bottom-16 w-px bg-border hidden md:block" />
        </div>
      </div>
    </section>
  );
}
