
import { Card } from "@/components/ui/card";
import { Brain, Glasses, Lock, MessageCircle, Users, FlaskConical } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Personalized AI Recommendations",
    description: "Get methods and protocols that have proven success in labs similar to yours."
  },
  {
    icon: Glasses,
    title: "Advanced Virtual Training",
    description: "Learn and master techniques in immersive VR/AR environments before applying them in real life."
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Enjoy blockchain-secured, version-controlled protocols that ensure reproducibility and trust."
  },
  {
    icon: MessageCircle,
    title: "Real-Time Problem Solving",
    description: "Use our AI chatbots and expert network to troubleshoot and refine your experiments on the fly."
  },
  {
    icon: Users,
    title: "Community-Driven Insights",
    description: "Benefit from a collaborative platform where researchers share success stories, challenges, and best practices."
  },
  {
    icon: FlaskConical,
    title: "Lab Protocol Optimization",
    description: "Automatically optimize your protocols based on real-world success data and machine learning insights."
  }
];

const testimonials = [
  {
    quote: "MethodIQ revolutionized our approach. By learning from methods that worked for similar labs, we avoided costly trial-and-error and sped up our experiments significantly.",
    author: "Dr. Jane Doe",
    title: "Molecular Biologist"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-12">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Benefits</h2>
          <p className="text-lg text-muted-foreground">
            Experience the power of intelligent research methods optimization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <benefit.icon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center">
                <blockquote className="mb-4">
                  <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                </blockquote>
                <footer>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </footer>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
