
import { Brain, Lock, Users } from "lucide-react";

export function Mission() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
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
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
