
import { BookOpen, Target, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    role: "CEO/Founder",
    description: "Leading the mission to integrate technology with scientific research."
  },
  {
    role: "CTO/Co-Founder",
    description: "Driving innovation through AI, VR, blockchain, and IoT."
  },
  {
    role: "Head of Research & Development",
    description: "Ensuring every method is tested, validated, and optimized for real-world lab conditions."
  }
];

export function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 space-y-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At MethodIQ, our mission is to empower researchers by providing intelligent, technology-driven solutions 
            that bridge the gap between theory and practice. We aim to democratize access to advanced research 
            methods—ensuring every experiment is optimized for success.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Born from the challenges of inconsistent lab results and the need for personalized research guidance, 
            MethodIQ was founded by scientists and technologists dedicated to making state-of-the-art research 
            methods accessible and adaptable. Our platform continuously learns from global research data and 
            community feedback, ensuring that each method recommendation is as unique as your research environment.
          </p>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the visionary team behind MethodIQ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
