
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";

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
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/50 to-secondary/20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our People</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground">
            Our multidisciplinary team brings together expertise in research, AI, biotechnology, and cybersecurity to drive innovation in scientific discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-primary/10 h-full">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg text-white">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg text-white">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg text-white">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <h3 className="text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
