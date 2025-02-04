
import { User, Search, Brain, Monitor, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: User,
    title: "Create Your Research Profile",
    points: [
      "Sign Up & Set Up: Create a free account and complete your research profile by inputting your lab's specialties, challenges, and current protocols.",
      "Personalization: Our AI system uses this information to understand your research context and generate a unique profile."
    ]
  },
  {
    icon: Search,
    title: "Discover & Explore",
    points: [
      "Search & Filter: Use our intuitive search powered by Natural Language Processing (NLP) to find methods across various scientific disciplines.",
      "Community Insights: See ratings, success stories, and detailed notes from other researchers who have used the methods in similar settings."
    ]
  },
  {
    icon: Brain,
    title: "Personalized Recommendations & Virtual Training",
    points: [
      "AI-Driven Suggestions: Get a curated list of protocols that have been highly successful for similar labs. Our system continuously learns from global research data to improve its recommendations.",
      "Virtual Labs: Dive into immersive VR simulations to practice and perfect complex experiments. Use AR overlays when you're in the lab for real-time, step-by-step guidance."
    ]
  },
  {
    icon: Monitor,
    title: "Implement, Monitor, and Optimize",
    points: [
      "Real-Time IoT Integration: Connect your lab equipment to MethodIQ for live monitoring. Get alerts and suggestions when conditions deviate from optimal parameters.",
      "Blockchain Documentation: Every method you apply is documented securely, ensuring your research is reproducible and verified."
    ]
  },
  {
    icon: Users,
    title: "Connect & Evolve",
    points: [
      "Expert Consultations: When challenges arise, use our AI chatbots or schedule live sessions with experts who have faced similar hurdles.",
      "Continuous Improvement: Share your outcomes and feedback with the community, helping MethodIQ refine its recommendations and create even better solutions over time."
    ]
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Follow these simple steps to revolutionize your research methods
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
                      <li key={pointIndex} className="text-muted-foreground">
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
