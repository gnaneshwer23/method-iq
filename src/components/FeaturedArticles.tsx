
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredArticles = [
  {
    title: "The Future of AI in Research Protocol Optimization",
    description: "Exploring how artificial intelligence is revolutionizing research methodology",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&h=400",
    category: "AI & Technology",
    date: "Mar 15, 2024"
  },
  {
    title: "Blockchain's Role in Securing Research Data",
    description: "How distributed ledger technology ensures data integrity in scientific research",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=400",
    category: "Research Innovations",
    date: "Mar 12, 2024"
  },
  {
    title: "Digital Twins in Laboratory Settings",
    description: "Leveraging virtual replicas for safer and more efficient experimentation",
    image: "https://images.unsplash.com/photo-1505465264541-d76a0b402c22?auto=format&fit=crop&w=800&h=400",
    category: "Industry Trends",
    date: "Mar 10, 2024"
  }
];

export function FeaturedArticles() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[2/1] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="text-primary">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-primary transition-colors">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            View All Featured Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
