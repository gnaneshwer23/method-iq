import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, Lock, Laptop, FlaskConical, Users, Glasses, 
  CircleCheckBig, ArrowRight
} from "lucide-react";
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
    <section className="container px-4 mx-auto max-w-7xl">
      {/* Simplified Header */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <span className="inline-block text-primary font-semibold text-sm mb-4 tracking-wide uppercase">
          Platform Features
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Empowering Your Research
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          From AI-driven protocol recommendations to secure collaboration and immersive training—everything you need to accelerate discovery.
        </p>
      </div>

      {/* Simplified Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="group hover:shadow-xl transition-all duration-300 hover-scale border-border/50 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simple CTA */}
      <div className="text-center bg-secondary/50 p-12 rounded-2xl">
        <h3 className="text-2xl font-bold mb-6">Ready to Transform Your Research?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
            <Link to="/register">
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Schedule a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
