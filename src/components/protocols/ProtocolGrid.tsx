import { ProtocolCard } from './ProtocolCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import type { Protocol } from '@/types/database.types';

interface ProtocolGridProps {
  protocols: Protocol[];
  isLoading?: boolean;
  onViewDetails: (protocol: Protocol) => void;
  aiGeneratedIds?: string[];
}

export const ProtocolGrid = ({ protocols, isLoading, onViewDetails, aiGeneratedIds = [] }: ProtocolGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!protocols || protocols.length === 0) {
    return (
      <div className="text-center py-12">
        <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No protocols found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or use AI to get personalized protocol suggestions
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {protocols.map((protocol) => (
        <ProtocolCard
          key={protocol.id}
          protocol={protocol}
          onViewDetails={onViewDetails}
          isAIGenerated={aiGeneratedIds.includes(protocol.id)}
        />
      ))}
    </div>
  );
};
