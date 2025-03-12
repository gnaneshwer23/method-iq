
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Glasses, Lock, MessageCircle, Users, FlaskConical, ArrowRight, Check, Star, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Original benefits data
const benefits = [
  {
    icon: Brain,
    title: "Personalized AI Recommendations",
    description: "Get methods and protocols that have proven success in labs similar to yours.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    gradient: "from-purple-500/20 to-purple-500/5",
    highlight: true
  },
  {
    icon: Glasses,
    title: "Advanced Virtual Training",
    description: "Learn and master techniques in immersive VR/AR environments before applying them in real life.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    gradient: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Enjoy blockchain-secured, version-controlled protocols that ensure reproducibility and trust.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    gradient: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    icon: MessageCircle,
    title: "Real-Time Problem Solving",
    description: "Use our AI chatbots and expert network to troubleshoot and refine your experiments on the fly.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    gradient: "from-amber-500/20 to-amber-500/5",
    highlight: true
  },
  {
    icon: Users,
    title: "Community-Driven Insights",
    description: "Benefit from a collaborative platform where researchers share success stories, challenges, and best practices.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    gradient: "from-sky-500/20 to-sky-500/5"
  },
  {
    icon: FlaskConical,
    title: "Lab Protocol Optimization",
    description: "Automatically optimize your protocols based on real-world success data and machine learning insights.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    gradient: "from-pink-500/20 to-pink-500/5"
  }
];

// Original testimonials
const testimonials = [
  {
    quote: "MethodIQ revolutionized our approach. By learning from methods that worked for similar labs, we avoided costly trial-and-error and sped up our experiments significantly.",
    author: "Dr. Jane Doe",
    title: "Molecular Biologist",
    stars: 5
  },
  {
    quote: "The virtual training modules helped my team master complex techniques before trying them in the lab. It saved us reagents, time, and frustration.",
    author: "Prof. Michael Chen",
    title: "Biochemistry Department Chair",
    stars: 5
  },
  {
    quote: "As someone focused on reproducibility, the blockchain verification feature gives me confidence that our methods are accurately preserved and traceable.",
    author: "Dr. Sarah Johnson",
    title: "Research Integrity Officer",
    stars: 4
  }
];

// Statistics to highlight benefits
const stats = [
  { value: "87%", label: "Reduction in failed experiments", icon: Zap },
  { value: "3.5x", label: "Faster protocol optimization", icon: Sparkles },
  { value: "92%", label: "User satisfaction rate", icon: Star }
];

export function BenefitsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const childElements = benefitsRef.current?.querySelectorAll(".benefit-card");
    childElements?.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      childElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Hero section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm animate-fade-up">RESEARCH ADVANTAGES</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Transform Your Research Process
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Discover how MethodIQ can revolutionize your approach to experimental design and execution
          </p>
          <div className="p-6 border border-primary/10 rounded-xl bg-primary/5 backdrop-blur-sm mb-12 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-4 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" ref={benefitsRef}>
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className={cn(
                "benefit-card relative overflow-hidden p-6 opacity-0 border border-primary/10 transition-all duration-300 hover:shadow-lg",
                hoveredCard === index ? "scale-[1.02]" : "",
                benefit.highlight ? "ring-1 ring-primary/20" : ""
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-70`} />
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16">
                <div className={`w-full h-full ${benefit.bgColor} rounded-full filter blur-2xl opacity-30`} />
              </div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4 shadow-md transition-transform duration-300 ${hoveredCard === index ? "scale-110" : ""}`}>
                  <benefit.icon className={`h-7 w-7 ${benefit.color}`} />
                </div>
                
                <h3 className={`font-semibold text-lg mb-3 ${benefit.color}`}>{benefit.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{benefit.description}</p>
                
                {hoveredCard === index && (
                  <div className="flex items-center text-sm text-primary gap-2 animate-fade-up" style={{ animationDelay: "50ms" }}>
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              {benefit.highlight && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Researcher Testimonials</h2>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-2xl border border-primary/10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-60 transform -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-60 transform translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-1000 absolute w-full ${
                    activeTestimonial === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  style={{ transform: activeTestimonial === index ? "translateX(0)" : "translateX(100px)" }}
                >
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl italic text-center mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? "bg-primary w-5" : "bg-primary/30"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-10 rounded-3xl border border-primary/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Research?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing community of researchers who are accelerating their discoveries with MethodIQ's innovative platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                <Link to="/demo">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
