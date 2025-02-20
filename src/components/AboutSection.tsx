
import { BookOpen, Target, User, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO/Founder",
    description: "Leading the mission to integrate technology with scientific research. PhD in Molecular Biology with 15+ years of research experience.",
    image: "/placeholder.svg"
  },
  {
    name: "Alex Rodriguez",
    role: "CTO/Co-Founder",
    description: "Driving innovation through AI, VR, blockchain, and IoT. Previously led tech teams at major research institutions.",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Maya Patel",
    role: "Head of Research & Development",
    description: "Ensuring every method is tested, validated, and optimized for real-world lab conditions. Specialist in protocol optimization.",
    image: "/placeholder.svg"
  }
];

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "MethodIQ was founded with a vision to revolutionize research methodology."
  },
  {
    year: "2021",
    title: "Platform Launch",
    description: "Launched our core platform with AI-powered protocol optimization."
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to serve research institutions worldwide."
  },
  {
    year: "2023",
    title: "Innovation Award",
    description: "Received recognition for breakthrough in research methodology automation."
  }
];

export function AboutSection() {
  return (
    <section className="py-16 space-y-24">
      {/* Mission Section */}
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At MethodIQ, our mission is to empower researchers by providing intelligent, technology-driven solutions 
            that bridge the gap between theory and practice. We aim to democratize access to advanced research 
            methods—ensuring every experiment is optimized for success.
          </p>
        </div>
      </div>

      {/* Story Section with Timeline */}
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Born from the challenges of inconsistent lab results and the need for personalized research guidance, 
            MethodIQ was founded by scientists and technologists dedicated to making state-of-the-art research 
            methods accessible and adaptable.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((milestone, index) => (
            <Card key={index} className="relative hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Meet the visionary team behind MethodIQ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-sm text-primary mb-4">{member.role}</div>
                <p className="text-muted-foreground">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
