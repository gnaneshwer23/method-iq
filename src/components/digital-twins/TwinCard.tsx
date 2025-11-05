import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cpu, Activity, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TwinCardProps {
  twin: any;
}

export const TwinCard = ({ twin }: TwinCardProps) => {
  const navigate = useNavigate();

  const getTwinTypeColor = (type: string) => {
    switch (type) {
      case 'equipment': return 'text-blue-600';
      case 'system': return 'text-purple-600';
      case 'process': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTwinTypeIcon = (type: string) => {
    return <Cpu className={`h-5 w-5 ${getTwinTypeColor(type)}`} />;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getTwinTypeIcon(twin.twin_type)}
            <div>
              <CardTitle className="text-lg">{twin.name}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {twin.description || 'No description provided'}
              </CardDescription>
            </div>
          </div>
          <Badge variant={twin.is_active ? 'default' : 'secondary'}>
            {twin.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Type Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {twin.twin_type}
          </Badge>
          {twin.physical_id && (
            <Badge variant="outline" className="text-xs">
              ID: {twin.physical_id}
            </Badge>
          )}
        </div>

        {/* State Parameters */}
        {twin.state && Object.keys(twin.state).length > 0 && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(twin.state).slice(0, 4).map(([key, value]: [string, any]) => (
              <div key={key} className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                <Activity className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">
                  <span className="capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                  <span className="font-medium">{value}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Created {new Date(twin.created_at).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={() => navigate(`/digital-twins/${twin.id}`)}
        >
          View Details
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
