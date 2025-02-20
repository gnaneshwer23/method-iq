
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former research director with 15+ years experience in biotechnology and AI integration.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "AI expert with background in developing scalable research platforms.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    name: "Dr. Emily Taylor",
    role: "Head of R&D",
    bio: "Specialist in protocol optimization and digital twin technology.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80"
  }
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Our multidisciplinary team brings together expertise in research, AI, biotechnology, and cybersecurity to drive innovation in scientific discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardHeader className="p-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
