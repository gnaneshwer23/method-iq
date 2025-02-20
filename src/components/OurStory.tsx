
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a vision to revolutionize scientific research through integrated technology."
  },
  {
    year: "2021",
    title: "MVP Launch",
    description: "Released our first platform version with AI-driven protocol recommendations."
  },
  {
    year: "2022",
    title: "Major Partnerships",
    description: "Established partnerships with leading research institutions worldwide."
  },
  {
    year: "2023",
    title: "Technology Innovation",
    description: "Integrated blockchain verification and AR/MR training modules."
  }
];

export function OurStory() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            From addressing the challenges of fragmented research tools to building an integrated ecosystem, discover how MethodIQ evolved to transform scientific research.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 bottom-0 left-[50%] w-px bg-primary/20" />
          
          {timeline.map((item, index) => (
            <div key={index} className="relative mb-12">
              <div className={`flex items-center gap-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className="w-1/2" />
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                <Card className="w-1/2">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
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
