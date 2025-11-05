import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RatingsList } from '@/components/protocols/RatingsList';
import { RatingForm } from '@/components/protocols/RatingForm';
import { BlockchainVerificationBadge } from '@/components/protocols/BlockchainVerificationBadge';
import { VerifyButton } from '@/components/protocols/VerifyButton';
import { CreateExperimentDialog } from '@/components/experiments/CreateExperimentDialog';
import { useProtocol, useProtocolRatings } from '@/hooks/useProtocols';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Shield, 
  Star, 
  Info,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const ProtocolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRatingForm, setShowRatingForm] = useState(false);

  const { data: protocolResponse, isLoading } = useProtocol(id || '');
  const protocol = protocolResponse?.data;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!protocol) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Protocol not found</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/protocols')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Protocols
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/protocols')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Protocols
        </Button>

        {/* Protocol Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{protocol.title}</h1>
                {protocol.verified && (
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">{protocol.summary}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2">
                {renderStars(protocol.average_rating || 0)}
                <span className="text-sm text-muted-foreground">
                  ({protocol.rating_count || 0})
                </span>
              </div>
              <div className="flex gap-2">
                <VerifyButton protocol={protocol} />
                <CreateExperimentDialog 
                  protocolId={protocol.id} 
                  protocolTitle={protocol.title}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          {protocol.tags && protocol.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {protocol.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Key Metrics */}
          <div className="flex flex-wrap gap-4">
            {protocol.estimated_duration_minutes && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{protocol.estimated_duration_minutes} min</span>
              </div>
            )}
            {protocol.estimated_cost && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>${Number(protocol.estimated_cost).toFixed(2)}</span>
              </div>
            )}
            {protocol.success_rate && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>{protocol.success_rate}% success rate</span>
              </div>
            )}
          </div>
        </div>

        {/* Non-Authenticated User Alert */}
        {!user && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              <a href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </a>
              {' '}to rate this protocol, save it to your dashboard, and run experiments.
            </AlertDescription>
          </Alert>
        )}

        {/* Detailed Steps */}
        {protocol.detailed_steps && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Protocol Details</CardTitle>
              <CardDescription>Complete step-by-step instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                  {JSON.stringify(protocol.detailed_steps, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blockchain Verification */}
        {(protocol.hash || protocol.verified) && (
          <div className="mb-6">
            <BlockchainVerificationBadge
              hash={protocol.hash}
              verified={protocol.verified}
              transactionId={null}
              blockchainNetwork="polygon-mumbai"
            />
          </div>
        )}

        <Separator className="my-8" />

        {/* Ratings Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
            </div>
            {user && !showRatingForm && (
              <Button onClick={() => setShowRatingForm(true)}>
                Add Your Rating
              </Button>
            )}
          </div>

          {user && showRatingForm && (
            <div className="mb-6">
              <RatingForm
                protocolId={protocol.id}
                onSuccess={() => setShowRatingForm(false)}
              />
            </div>
          )}

          <RatingsList protocolId={protocol.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProtocolDetail;
