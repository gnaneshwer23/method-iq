
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lock, Laptop, FlaskConical, Users, Glasses, BarChart, Database, Rocket } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Driven Protocol Recommendations",
    whatItDoes: "Uses advanced NLP and machine learning to analyze your research needs and suggest the best protocols.",
    whyUseful: "Saves time and increases experimental success by leveraging data from similar labs worldwide.",
    detail: "Research Profile → AI Processing (NLP, ML) → Tailored Protocol List"
  },
  {
    icon: Lock,
    title: "Blockchain Verification",
    whatItDoes: "Secures every protocol with an immutable, tamper-proof digital record.",
    whyUseful: "Enhances reproducibility and trust in your research methods.",
    detail: "Protocol document → blockchain ledger with verification"
  },
  {
    icon: Laptop,
    title: "Real-Time IoT Data Integration",
    whatItDoes: "Connects your lab sensors to provide live environmental data integrated into your protocols.",
    whyUseful: "Enables dynamic adjustments for optimized experimental outcomes.",
    detail: "Lab sensors → Data Stream → Real-time Dashboard Overlay"
  },
  {
    icon: FlaskConical,
    title: "Advanced Research Tools",
    whatItDoes: "Summarizes current research and identifies gaps using AI while collaborating with you to generate, debate, and refine research ideas.",
    whyUseful: "Accelerates research planning and improves proposal quality through AI assistance.",
    detail: "Literature Analysis → Hypothesis Generation → Research Proposal"
  },
  {
    icon: Users,
    title: "Professional Networking & Portfolio",
    whatItDoes: "Lets you build a detailed research portfolio, network with peers, and share insights.",
    whyUseful: "Promotes collaboration and professional growth—similar to LinkedIn for researchers.",
    detail: "Profile creation → Network building → Knowledge sharing"
  },
  {
    icon: Glasses,
    title: "Optional AR/VR Training Modules",
    whatItDoes: "Provides immersive, hands-on training for complex techniques in a virtual lab environment.",
    whyUseful: "Offers risk-free practice and builds confidence before real-world experiments.",
    detail: "Virtual training → Practice sessions → Skill certification"
  },
  {
    icon: BarChart,
    title: "Data Analytics and Insight Sharing",
    whatItDoes: "Offers real-time dashboards, trend reports, and a curated newsletter of research insights.",
    whyUseful: "Helps you stay on top of emerging trends and benchmark your research against global data.",
    detail: "Data collection → Analysis → Insights distribution"
  },
  {
    icon: Database,
    title: "Automated Data Backup & Version Control",
    whatItDoes: "Automatically backs up research data and maintains version history of all protocols and experiments.",
    whyUseful: "Ensures data safety and enables easy tracking of protocol evolution over time.",
    detail: "Continuous backup → Version tracking → Easy restoration"
  },
  {
    icon: Rocket,
    title: "Accelerated Research Pipeline",
    whatItDoes: "Streamlines workflow by automating routine tasks and integrating with existing lab systems.",
    whyUseful: "Reduces time spent on administrative tasks and increases focus on actual research.",
    detail: "Task automation → System integration → Workflow optimization"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Platform Features</h2>
          <p className="text-lg text-muted-foreground">
            Discover how our comprehensive suite of tools can transform your research workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.detail}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">What It Does:</h4>
                    <p className="text-sm text-muted-foreground">{feature.whatItDoes}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Why It's Useful:</h4>
                    <p className="text-sm text-muted-foreground">{feature.whyUseful}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
