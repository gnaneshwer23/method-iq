
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Lightbulb, TrendingUp, ClipboardCheck, Brain, Calendar } from "lucide-react";

const categories = [
  { name: "Research Innovations", icon: BookOpen },
  { name: "AI & Technology", icon: Lightbulb },
  { name: "Industry Trends", icon: TrendingUp },
  { name: "Case Studies", icon: ClipboardCheck },
  { name: "Thought Leadership", icon: Brain },
  { name: "Events & Webinars", icon: Calendar }
];

export function BlogNavigation() {
  return (
    <section className="py-10 border-b">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 scrollbar-none mb-8">
          <div className="flex gap-3 px-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.name}
                  variant="outline"
                  className="rounded-full whitespace-nowrap hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 bg-secondary/50 border-secondary focus-visible:ring-primary"
          />
        </div>
      </div>
    </section>
  );
}
