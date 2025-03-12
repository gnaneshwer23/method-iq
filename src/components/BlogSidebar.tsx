
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, TrendingUp, Users } from "lucide-react";

const popularPosts = [
  {
    title: "Top 10 Research Innovations of 2024",
    views: "2.5k views"
  },
  {
    title: "The Impact of AI on Scientific Discovery",
    views: "2.1k views"
  },
  {
    title: "Future of Laboratory Automation",
    views: "1.8k views"
  }
];

const authors = [
  {
    name: "Dr. Sarah Chen",
    role: "AI Research Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
  },
  {
    name: "Michael Rodriguez",
    role: "Technology Director",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&h=100"
  }
];

export function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Newsletter Signup */}
      <Card className="border-secondary/60 shadow-sm hover:shadow-md transition-all overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Stay Updated
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-muted-foreground mb-4">
            Get the latest insights delivered to your inbox
          </p>
          <div className="space-y-4">
            <Input placeholder="Enter your email" type="email" className="border-secondary focus-visible:ring-primary" />
            <Button className="w-full bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card className="border-secondary/60 shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {popularPosts.map((post, index) => (
              <div key={index} className="group cursor-pointer pb-4 border-b last:border-0 border-secondary/50">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {post.views}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card className="border-secondary/60 shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Featured Authors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {authors.map((author, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-pointer">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary group-hover:ring-primary transition-all"
                />
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">{author.name}</h3>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
