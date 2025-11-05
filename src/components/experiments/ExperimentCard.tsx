import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Calendar, FileText, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExperimentCardProps {
  experiment: any;
}

export const ExperimentCard = ({ experiment }: ExperimentCardProps) => {
  const navigate = useNavigate();

  const getSuccessColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">
              {experiment.protocols?.title || 'Untitled Experiment'}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {experiment.notes || 'No description provided'}
            </CardDescription>
          </div>
          {experiment.verified && (
            <Badge variant="default" className="ml-2">Verified</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Protocol Tags */}
        {experiment.protocols?.tags && experiment.protocols.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {experiment.protocols.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {experiment.protocols.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{experiment.protocols.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {experiment.time_taken_minutes && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{experiment.time_taken_minutes} min</span>
            </div>
          )}
          
          {experiment.success_percentage !== null && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className={getSuccessColor(experiment.success_percentage)}>
                {experiment.success_percentage}% success
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {new Date(experiment.created_at).toLocaleDateString()}
            </span>
          </div>

          {experiment.data_file_url && (
            <div className="flex items-center gap-2 col-span-2 text-primary">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Data file attached</span>
            </div>
          )}
        </div>

        {/* Environment Conditions */}
        {experiment.environment_conditions && Object.keys(experiment.environment_conditions).length > 0 && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <span className="font-medium">Conditions:</span>{' '}
            {Object.entries(experiment.environment_conditions).map(([key, value], i, arr) => (
              <span key={key}>
                {key}: {value as string}
                {i < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        {/* View Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/experiments/${experiment.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
