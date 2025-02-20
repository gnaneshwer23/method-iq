
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const categories = [
  "Research Innovations",
  "AI & Technology",
  "Industry Trends",
  "Case Studies",
  "Thought Leadership",
  "Events & Webinars"
];

export function BlogNavigation() {
  return (
    <section className="py-8 border-b">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10"
          />
        </div>
      </div>
    </section>
  );
}
