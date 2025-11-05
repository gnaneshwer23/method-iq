import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDigitalTwins } from '@/hooks/useDigitalTwins';
import { Skeleton } from '@/components/ui/skeleton';

export const DigitalTwinsCard = () => {
  const navigate = useNavigate();
  const { data: twinsResponse, isLoading } = useDigitalTwins({ is_active: true });
  const twins = twinsResponse?.data?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Digital Twins</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/digital-twins')}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Active virtual system replicas</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : twins.length > 0 ? (
          <div className="space-y-3">
            {twins.map((twin: any) => (
              <div
                key={twin.id}
                className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/digital-twins/${twin.id}`)}
              >
                <div className="flex-1">
                  <div className="font-medium mb-1">{twin.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {twin.twin_type}
                    </Badge>
                    {twin.state?.temperature && (
                      <span className="text-xs text-muted-foreground">
                        {twin.state.temperature}°C
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant={twin.is_active ? 'default' : 'secondary'} className="text-xs">
                  {twin.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Cpu className="h-10 w-10 mx-auto mb-2 opacity-20" />
            <p className="text-sm mb-3">No active digital twins</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/digital-twins')}
            >
              Create Digital Twin
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
