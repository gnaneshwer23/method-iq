import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, DollarSign, TrendingUp, CheckCircle, Sparkles, Shield } from 'lucide-react';
import type { Protocol } from '@/types/database.types';

interface ProtocolCardProps {
  protocol: Protocol;
  onViewDetails: (protocol: Protocol) => void;
  isAIGenerated?: boolean;
}

export const ProtocolCard = ({ protocol, onViewDetails, isAIGenerated }: ProtocolCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-amber-500 text-amber-500'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isAIGenerated ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg line-clamp-2">{protocol.title}</CardTitle>
              {protocol.hash && (
                <div title="Blockchain Verified">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                </div>
              )}
            </div>
            <CardDescription className="line-clamp-2 mt-2">
              {protocol.summary}
            </CardDescription>
          </div>
          {isAIGenerated && (
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              AI
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {protocol.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {protocol.tags && protocol.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{protocol.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{protocol.estimated_duration_minutes || 'N/A'} min</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${protocol.estimated_cost || 'N/A'}</span>
          </div>
          {protocol.success_rate !== null && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>{protocol.success_rate}% success</span>
            </div>
          )}
          {protocol.verified && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStars(protocol.average_rating || 0)}
            <span className="text-sm text-muted-foreground ml-2">
              ({protocol.rating_count || 0})
            </span>
          </div>
        </div>

        {/* Actions */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(protocol)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
