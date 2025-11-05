import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DataUpload } from '@/components/experiments/DataUpload';
import { useExperiment, useUpdateExperiment, useDeleteExperiment } from '@/hooks/useExperiments';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Shield,
  FileText,
  Thermometer,
  Droplets,
  Wind,
  Edit,
  Trash2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: experimentResponse, isLoading } = useExperiment(id || '');
  const deleteExperiment = useDeleteExperiment();
  const experiment = experimentResponse?.data;

  const handleDelete = async () => {
    if (!id) return;
    await deleteExperiment.mutateAsync(id);
    navigate('/experiments');
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

  if (!experiment) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Experiment not found</AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/experiments')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Experiments
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const canEdit = user && user.id === experiment.researcher_id;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/experiments')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experiments
        </Button>

        {/* Experiment Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">
                  {experiment.protocols?.title || 'Experiment'}
                </h1>
                {experiment.verified && (
                  <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                {experiment.protocols?.summary || 'No protocol summary available'}
              </p>
            </div>
            
            {canEdit && (
              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Experiment?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this experiment and all associated data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

          {/* Protocol Tags */}
          {experiment.protocols?.tags && experiment.protocols.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {experiment.protocols.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {experiment.time_taken_minutes && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{experiment.time_taken_minutes} min</p>
                </div>
              </div>
            )}
            {experiment.success_percentage !== null && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{experiment.success_percentage}%</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {new Date(experiment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            {experiment.protocols?.estimated_cost && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Est. Cost</p>
                  <p className="font-medium">${Number(experiment.protocols.estimated_cost).toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experiment Notes */}
            {experiment.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Experiment Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{experiment.notes}</p>
                </CardContent>
              </Card>
            )}

            {/* Data Files */}
            <DataUpload experimentId={experiment.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Environment Conditions */}
            {experiment.environment_conditions && Object.keys(experiment.environment_conditions).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Environment Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {experiment.environment_conditions.temperature && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-medium">{experiment.environment_conditions.temperature}°C</span>
                    </div>
                  )}
                  {experiment.environment_conditions.humidity && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <span className="font-medium">{experiment.environment_conditions.humidity}%</span>
                    </div>
                  )}
                  {experiment.environment_conditions.pressure && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Pressure</span>
                      </div>
                      <span className="font-medium">{experiment.environment_conditions.pressure} kPa</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Protocol Link */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Protocol Used</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/protocols/${experiment.protocol_id}`)}
                >
                  View Protocol Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperimentDetail;
