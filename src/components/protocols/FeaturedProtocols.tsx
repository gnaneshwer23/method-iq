import { useProtocols } from '@/hooks/useProtocols';
import { ProtocolCard } from './ProtocolCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedProtocols = () => {
  const { data: protocols, isLoading } = useProtocols({
    verified: true,
    minRating: 4
  });

  // Get top 3 protocols
  const featuredProtocols = protocols?.data?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredProtocols.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Featured Protocols</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Top-Rated Research Methods
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore verified, community-tested protocols with high success rates
          </p>
        </div>

        {/* Featured Protocol Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
          {featuredProtocols.map((protocol) => (
            <Link key={protocol.id} to={`/protocols/${protocol.id}`}>
              <ProtocolCard
                protocol={protocol}
                onViewDetails={() => {}}
              />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link to="/protocols">
              Browse All Protocols
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
