
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, Lock, Laptop, FlaskConical, Users, Glasses, 
  BarChart, Database, ArrowRight, Sparkles, 
  CircleCheckBig, Zap, Rocket, Microscope, Cloud
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
    <section className="py-24 relative">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl relative">
        {/* Enhanced Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center justify-center mb-4 gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            <span className="text-primary font-medium text-sm tracking-wide">CUTTING-EDGE FEATURES</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] backdrop-blur-sm border-primary/10 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.09] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/10 shadow-md">
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
                      <CircleCheckBig className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Central Diagram */}
        <div className="relative max-w-4xl mx-auto mb-32 p-12 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent rounded-2xl border border-primary/10" />
          <div className="relative">
            {/* Center Hub */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center">
                  <Microscope className="w-12 h-12 text-primary animate-pulse" />
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold mb-5">Integrated Research Ecosystem</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All features work seamlessly together to provide a comprehensive research solution that adapts to your specific needs and workflow
              </p>
            </div>
            
            {/* Connected orbital elements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Brain, label: "AI Engine", delay: "0ms" },
                { icon: Database, label: "Data Platform", delay: "200ms" },
                { icon: Cloud, label: "Secure Cloud", delay: "400ms" },
                { icon: Users, label: "Collaboration", delay: "600ms" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center animate-fade-up text-center"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-md shadow-primary/5">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Connection lines - subtle design element */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute left-1/4 top-1/2 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -rotate-45" />
              <div className="absolute right-1/4 top-1/2 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transform rotate-45" />
              <div className="absolute left-1/2 top-3/4 w-[1px] h-[100px] bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 p-12 rounded-2xl backdrop-blur-sm animate-fade-up">
          <h3 className="text-2xl font-semibold mb-8">Start Your Journey with MethodIQ</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2">
              <Link to="/contact">
                Get Started Now
                <Zap className="w-4 h-4" />
              </Link>
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
