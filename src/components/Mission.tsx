
import { Brain, Lock, Users, Target, Award, BadgeCheck } from "lucide-react";

export function Mission() {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/40 to-background/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our Purpose</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At MethodIQ, our mission is to revolutionize the research process by providing an integrated, secure, and adaptive ecosystem. We empower researchers to discover, validate, and optimize protocols through advanced AI, real-time data integration, and collaborative tools—ultimately accelerating innovation and ensuring reproducible science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Advanced AI",
              description: "Leveraging cutting-edge artificial intelligence to optimize research protocols"
            },
            {
              icon: Lock,
              title: "Secure Platform",
              description: "Ensuring data privacy and security through blockchain technology"
            },
            {
              icon: Users,
              title: "Collaboration",
              description: "Fostering a community of researchers working together"
            },
            {
              icon: Target,
              title: "Precision",
              description: "Delivering accuracy and reliability in every research outcome"
            },
            {
              icon: Award,
              title: "Excellence",
              description: "Maintaining the highest standards in scientific methodology"
            },
            {
              icon: BadgeCheck,
              title: "Verification",
              description: "Providing trusted verification of research methods and results"
            }
          ].slice(0, 3).map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                <item.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
