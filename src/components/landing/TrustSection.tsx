import { Card } from "@/components/ui/card";
import { Star, Users, Award, Shield } from "lucide-react";

export function TrustSection() {
  const stats = [
    { icon: Users, value: "5,000+", label: "Active Researchers" },
    { icon: Award, value: "10,000+", label: "Validated Protocols" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: Shield, value: "100%", label: "Data Security" },
  ];

  const testimonials = [
    {
      quote: "MethodIQ transformed how we collaborate. The federated learning feature alone saved us months of work.",
      author: "Dr. Sarah Chen",
      role: "Lead Researcher, Stanford University",
      rating: 5,
    },
    {
      quote: "The protocol discovery is incredible. AI recommendations helped us find exactly what we needed in minutes.",
      author: "Prof. Michael Roberts",
      role: "Biology Department, MIT",
      rating: 5,
    },
    {
      quote: "Digital twins let us test protocols virtually before lab work. Game-changer for our resource optimization.",
      author: "Dr. Emily Watson",
      role: "Research Director, Oxford",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Trusted by Researchers Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of researchers who are accelerating their discoveries
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
