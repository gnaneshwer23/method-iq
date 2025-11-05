import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useAddRating } from '@/hooks/useProtocols';

interface RatingFormProps {
  protocolId: string;
  onSuccess?: () => void;
}

export const RatingForm = ({ protocolId, onSuccess }: RatingFormProps) => {
  const [stars, setStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [comment, setComment] = useState('');
  const addRating = useAddRating();

  const handleSubmit = async () => {
    if (stars === 0) return;

    await addRating.mutateAsync({
      protocolId,
      stars,
      comment: comment.trim() || undefined,
    });

    setStars(0);
    setComment('');
    onSuccess?.();
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div>
        <label className="text-sm font-medium mb-2 block">Your Rating</label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                i < (hoveredStars || stars)
                  ? 'fill-amber-500 text-amber-500'
                  : 'text-muted-foreground hover:text-amber-500'
              }`}
              onClick={() => setStars(i + 1)}
              onMouseEnter={() => setHoveredStars(i + 1)}
              onMouseLeave={() => setHoveredStars(0)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Comment (optional)</label>
        <Textarea
          placeholder="Share your experience with this protocol..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={stars === 0 || addRating.isPending}
        className="w-full"
      >
        {addRating.isPending ? 'Submitting...' : 'Submit Rating'}
      </Button>
    </div>
  );
};
