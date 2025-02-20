
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Database, Brain, Users, Glasses } from "lucide-react";

const flowSteps = [
  {
    icon: UserCircle,
    title: "Onboarding & Profile Setup",
    description: "Researchers register, set up their personalized profiles, and input their research needs."
  },
  {
    icon: Database,
    title: "Data Aggregation & AI Analysis",
    description: "Our platform aggregates diverse data sources, using advanced AI to generate tailored protocols and insights."
  },
  {
    icon: Brain,
    title: "Real-Time Experimentation",
    description: "Live IoT data and digital twins simulate experiments in real time, enabling dynamic adjustments."
  },
  {
    icon: Users,
    title: "Collaboration & Networking",
    description: "Researchers connect, share insights, and collaborate on projects using our integrated networking tools."
  },
  {
    icon: Glasses,
    title: "Optional Immersive Training",
    description: "For hands-on learning, immersive training modules offer interactive simulations of complex techniques."
  }
];

export function UseCasesFlow() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">The MethodIQ Journey</h2>
          <p className="text-lg text-muted-foreground">
            Follow the research journey from start to success with our integrated platform
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-0 bottom-0 left-[39px] w-px bg-primary/20 md:left-1/2 md:-translate-x-px" />

          {flowSteps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number */}
              <div className="absolute left-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content Card */}
              <Card className={`ml-28 flex-1 md:ml-0 ${
                index % 2 === 0 ? 'md:mr-1/2' : 'md:ml-1/2'
              }`}>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
