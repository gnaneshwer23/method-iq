
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Rocket, Building, HandshakeIcon, Beaker } from "lucide-react";

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a vision to revolutionize scientific research through integrated technology.",
    icon: Building
  },
  {
    year: "2021",
    title: "MVP Launch",
    description: "Released our first platform version with AI-driven protocol recommendations.",
    icon: Rocket
  },
  {
    year: "2022",
    title: "Major Partnerships",
    description: "Established partnerships with leading research institutions worldwide.",
    icon: HandshakeIcon
  },
  {
    year: "2023",
    title: "Technology Innovation",
    description: "Integrated blockchain verification and AR/MR training modules.",
    icon: Beaker
  }
];

export function OurStory() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-primary font-medium mb-3 border border-primary/20 rounded-full px-4 py-1 text-sm">Our Journey</span>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            From addressing the challenges of fragmented research tools to building an integrated ecosystem, discover how MethodIQ evolved to transform scientific research.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5" />
          
          {timeline.map((item, index) => (
            <div key={index} className="relative mb-16 group">
              <div className={`flex items-center gap-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className="w-1/2" />
                
                {/* Year circle with icon */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-background shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-300 z-20">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="bg-primary/20 text-primary font-bold text-sm px-3 py-1 rounded-full mt-2">
                    {item.year}
                  </div>
                </div>
                
                <Card className="w-1/2 group-hover:shadow-lg transition-all duration-300 border-primary/10 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
