import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, DollarSign, TrendingUp, CheckCircle, Hash } from 'lucide-react';
import { RatingsList } from './RatingsList';
import { RatingForm } from './RatingForm';
import { useState } from 'react';
import type { Protocol } from '@/types/database.types';

interface ProtocolDetailProps {
  protocol: Protocol | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProtocolDetail = ({ protocol, open, onOpenChange }: ProtocolDetailProps) => {
  const [showRatingForm, setShowRatingForm] = useState(false);

  if (!protocol) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'fill-amber-500 text-amber-500'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const detailedSteps = protocol.detailed_steps as any;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{protocol.title}</DialogTitle>
              <DialogDescription className="mt-2">{protocol.summary}</DialogDescription>
            </div>
            {protocol.verified && (
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {protocol.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Duration
              </div>
              <p className="text-lg font-semibold">
                {protocol.estimated_duration_minutes || 'N/A'} min
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Cost
              </div>
              <p className="text-lg font-semibold">
                ${protocol.estimated_cost || 'N/A'}
              </p>
            </div>
            {protocol.success_rate !== null && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Success Rate
                </div>
                <p className="text-lg font-semibold">{protocol.success_rate}%</p>
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                Rating
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{protocol.average_rating?.toFixed(1) || '0.0'}</p>
                <span className="text-sm text-muted-foreground">
                  ({protocol.rating_count || 0})
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Steps */}
          {detailedSteps && (
            <>
              {detailedSteps.key_considerations && (
                <div>
                  <h3 className="font-semibold mb-2">Key Considerations</h3>
                  <p className="text-sm text-muted-foreground">{detailedSteps.key_considerations}</p>
                </div>
              )}

              {detailedSteps.equipment_needed && Array.isArray(detailedSteps.equipment_needed) && (
                <div>
                  <h3 className="font-semibold mb-2">Equipment Needed</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {detailedSteps.equipment_needed.map((item: string, i: number) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Blockchain Hash */}
          {protocol.hash && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Hash className="h-4 w-4" />
                Blockchain Verification
              </div>
              <code className="text-xs bg-muted p-2 rounded block break-all">
                {protocol.hash}
              </code>
            </div>
          )}

          <Separator />

          {/* Ratings Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Ratings & Reviews</h3>
              <Button
                size="sm"
                onClick={() => setShowRatingForm(!showRatingForm)}
              >
                {showRatingForm ? 'Cancel' : 'Add Rating'}
              </Button>
            </div>

            {showRatingForm && (
              <div className="mb-6">
                <RatingForm
                  protocolId={protocol.id}
                  onSuccess={() => setShowRatingForm(false)}
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              {renderStars(protocol.average_rating || 0)}
              <span className="text-lg font-semibold">{protocol.average_rating?.toFixed(1) || '0.0'}</span>
              <span className="text-muted-foreground">({protocol.rating_count || 0} ratings)</span>
            </div>

            <RatingsList protocolId={protocol.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
