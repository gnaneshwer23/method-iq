import { useProtocolRatings } from '@/hooks/useProtocols';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface RatingsListProps {
  protocolId: string;
}

export const RatingsList = ({ protocolId }: RatingsListProps) => {
  const { data, isLoading } = useProtocolRatings(protocolId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const ratings = data?.data || [];

  if (ratings.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No ratings yet. Be the first to rate this protocol!</p>
      </div>
    );
  }

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < stars
            ? 'fill-amber-500 text-amber-500'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {ratings.map((rating: any) => (
        <div key={rating.id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={rating.profiles?.avatar_url} />
            <AvatarFallback>
              {rating.profiles?.full_name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">{rating.profiles?.full_name || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(rating.created_at), { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(rating.stars)}
              </div>
            </div>
            {rating.comment && (
              <p className="text-sm text-muted-foreground">{rating.comment}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
