
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get the latest insights delivered to your inbox
          </p>
          <div className="space-y-4">
            <Input placeholder="Enter your email" type="email" />
            <Button className="w-full">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts.map((post, index) => (
              <div key={index} className="group cursor-pointer">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground">{post.views}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authors.map((author, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{author.name}</h3>
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
