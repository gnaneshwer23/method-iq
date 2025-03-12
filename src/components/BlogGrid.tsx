
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users } from "lucide-react";

const articles = [
  {
    title: "Advancing Research with AR/MR Technology",
    description: "How augmented and mixed reality are transforming laboratory training and experimentation",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&h=400",
    category: "Technology",
    date: "Mar 8, 2024",
    readTime: "7 min read"
  },
  {
    title: "The Rise of Collaborative Science",
    description: "Breaking down silos: How digital platforms are enabling global research collaboration",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&h=400",
    category: "Industry Trends",
    date: "Mar 5, 2024",
    readTime: "5 min read"
  },
  // Add more articles as needed
];

export function BlogGrid() {
  return (
    <div className="space-y-10">
      {articles.map((article, index) => (
        <Card 
          key={index} 
          className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-secondary/60 hover:border-primary/20"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="aspect-[4/3] md:h-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="text-primary font-medium">{article.category}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="group-hover:text-primary transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-center mt-16">
        <Button 
          variant="outline" 
          size="lg" 
          className="border-primary/20 hover:bg-primary/10 hover:text-primary"
        >
          Load More Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
