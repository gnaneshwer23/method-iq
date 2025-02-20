
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChartLine, Search, Users, Glasses } from "lucide-react";

const useCases = [
  {
    icon: BookOpen,
    title: "Personalized Protocol Discovery",
    description: "Our AI tailors research protocols based on your unique lab data and historical insights, ensuring optimal experimental design.",
    details: [
      "Custom protocol recommendations",
      "Historical data analysis",
      "Success rate predictions"
    ]
  },
  {
    icon: ChartLine,
    title: "Real-Time Experimental Support",
    description: "Integrate live sensor data and digital twins to simulate and dynamically optimize your experiments.",
    details: [
      "Live data monitoring",
      "Digital twin simulation",
      "Real-time adjustments"
    ]
  },
  {
    icon: Search,
    title: "Automated Literature Review",
    description: "Leverage our AI tools to continuously scan, synthesize, and generate innovative research hypotheses and proposals.",
    details: [
      "Continuous literature scanning",
      "Automated meta-analysis",
      "Hypothesis generation"
    ]
  },
  {
    icon: Users,
    title: "Collaborative Research & Networking",
    description: "Build your professional portfolio, connect with peers, and collaborate on groundbreaking projects in our dedicated research community.",
    details: [
      "Professional networking",
      "Secure collaboration",
      "Research portfolios"
    ]
  },
  {
    icon: Glasses,
    title: "Immersive AR/MR Training",
    description: "Experience hands-on, immersive training modules to safely practice and perfect complex lab techniques.",
    details: [
      "Virtual lab training",
      "Real-time feedback",
      "Progress tracking"
    ]
  }
];

export function UseCasesGrid() {
  return (
    <section className="py-24 relative bg-secondary/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Interactive Use Cases</h2>
          <p className="text-lg text-muted-foreground">
            Discover how researchers are using MethodIQ to transform their work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{useCase.title}</CardTitle>
                <CardDescription>{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {useCase.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
