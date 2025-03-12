
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/BlogHero";
import { BlogNavigation } from "@/components/BlogNavigation";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { BlogGrid } from "@/components/BlogGrid";
import { BlogSidebar } from "@/components/BlogSidebar";
import { BlogCTA } from "@/components/BlogCTA";
import { useEffect } from "react";

const Blog = () => {
  // Add scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95">
      <Header />
      <main className="flex-1">
        <BlogHero />
        <BlogNavigation />
        <FeaturedArticles />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <BlogGrid />
              </div>
              <div className="lg:col-span-4">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>
        <BlogCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
