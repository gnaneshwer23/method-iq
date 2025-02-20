
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lock, Laptop, FlaskConical, Users, Glasses, BarChart, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Driven Protocol Recommendations",
    description: "Get personalized research protocols based on your lab data and historical research, powered by advanced LLMs and deep learning.",
    details: [
      "Personalized protocol suggestions",
      "Real-time optimization",
      "Success rate predictions"
    ]
  },
  {
    icon: Lock,
    title: "Blockchain-Verified Reproducibility",
    description: "Ensure trust and reproducibility with immutable, tamper-proof protocol records secured on the blockchain.",
    details: [
      "Immutable protocol records",
      "Version control tracking",
      "Secure sharing options"
    ]
  },
  {
    icon: Laptop,
    title: "Real-Time IoT Integration",
    description: "Monitor live lab conditions and simulate experiments with digital twin technology for real-time optimization.",
    details: [
      "Live sensor monitoring",
      "Digital twin simulation",
      "Automated alerts"
    ]
  },
  {
    icon: FlaskConical,
    title: "Advanced Research Analytics",
    description: "Harness dynamic knowledge graphs and automated meta-analyses to uncover trends and actionable insights.",
    details: [
      "Automated literature review",
      "Trend analysis",
      "Hypothesis generation"
    ]
  },
  {
    icon: Users,
    title: "Professional Networking",
    description: "Build your research portfolio, connect with peers, and collaborate on projects within a secure community.",
    details: [
      "Research portfolios",
      "Peer networking",
      "Collaboration tools"
    ]
  },
  {
    icon: Glasses,
    title: "Immersive AR/MR Training",
    description: "Experience hands-on, immersive training modules to safely practice complex lab techniques in a virtual environment.",
    details: [
      "Virtual lab practice",
      "Real-time feedback",
      "Progress tracking"
    ]
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Our Features & Services: Empowering Your Research
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore how MethodIQ's integrated ecosystem transforms scientific research with cutting-edge technology and collaborative tools.
          </p>
          <p className="text-base text-muted-foreground">
            From personalized AI-driven protocol recommendations and real-time lab insights to secure collaboration and immersive training, our features and services ensure that you have everything you need to accelerate scientific discovery.
          </p>
        </div>

        {/* Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] to-transparent" />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Central Diagram */}
        <div className="relative max-w-4xl mx-auto mb-24 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg" />
          <div className="relative">
            {/* Center Hub */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                  <FlaskConical className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Integrated Research Ecosystem</h3>
              <p className="text-muted-foreground">
                All features work seamlessly together to provide a comprehensive research solution
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Start Your Journey with MethodIQ</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Get Started Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/demo">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
