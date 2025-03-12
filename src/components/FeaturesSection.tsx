
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lock, Laptop, FlaskConical, Users, Glasses, BarChart, Database, ArrowRight, Sparkles } from "lucide-react";
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
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative">
        {/* Enhanced Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block text-primary font-medium text-sm mb-2 tracking-wide">FEATURES & SERVICES</span>
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

        {/* Enhanced Interactive Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] backdrop-blur-sm border-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.09] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary/90 transition-colors duration-300">{feature.title}</CardTitle>
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

        {/* Enhanced Central Diagram */}
        <div className="relative max-w-4xl mx-auto mb-24 p-12 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent rounded-lg" />
          <div className="relative">
            {/* Center Hub */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                  <FlaskConical className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-3">Integrated Research Ecosystem</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All features work seamlessly together to provide a comprehensive research solution that adapts to your specific needs and workflow
              </p>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 bg-primary/10 p-2 rounded-full animate-float [animation-delay:0.5s]">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute top-1/4 right-1/4 bg-primary/10 p-2 rounded-full animate-float [animation-delay:1s]">
                <Database className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute bottom-1/4 left-1/3 bg-primary/10 p-2 rounded-full animate-float [animation-delay:1.5s]">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute bottom-1/4 right-1/3 bg-primary/10 p-2 rounded-full animate-float [animation-delay:2s]">
                <Users className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Start Your Journey with MethodIQ</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25 transition-all duration-300">
              <Link to="/contact">Get Started Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transition-all duration-300">
              <Link to="/demo">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
