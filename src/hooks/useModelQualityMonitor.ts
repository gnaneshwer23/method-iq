import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ModelQualityConfig {
  projectId: string;
  projectName: string;
  isOwner: boolean;
  minAccuracyThreshold?: number;
  convergenceWindowSize?: number;
  convergenceThreshold?: number;
}

interface AggregatedModel {
  id: string;
  project_id: string;
  round_number: number;
  global_accuracy: number | null;
  global_loss: number | null;
  participating_clients: number;
  created_at: string;
}

export const useModelQualityMonitor = ({
  projectId,
  projectName,
  isOwner,
  minAccuracyThreshold = 0.5,
  convergenceWindowSize = 3,
  convergenceThreshold = 0.001
}: ModelQualityConfig) => {
  const modelHistoryRef = useRef<AggregatedModel[]>([]);

  useEffect(() => {
    if (!isOwner || !projectId) return;

    // Fetch initial model history
    const fetchInitialModels = async () => {
      const { data, error } = await supabase
        .from('federated_aggregated_models')
        .select('*')
        .eq('project_id', projectId)
        .order('round_number', { ascending: false })
        .limit(convergenceWindowSize);

      if (!error && data) {
        modelHistoryRef.current = data.reverse();
      }
    };

    fetchInitialModels();

    // Set up real-time monitoring
    const channel = supabase
      .channel(`quality-monitor-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'federated_aggregated_models',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          const newModel = payload.new as AggregatedModel;
          console.log('Quality monitor - new model:', newModel);

          // Add to history
          modelHistoryRef.current = [...modelHistoryRef.current, newModel].slice(-convergenceWindowSize);

          // Run quality checks
          checkModelQuality(newModel, modelHistoryRef.current);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, isOwner, minAccuracyThreshold, convergenceWindowSize, convergenceThreshold]);

  const checkModelQuality = (currentModel: AggregatedModel, history: AggregatedModel[]) => {
    const accuracy = currentModel.global_accuracy;
    const roundNumber = currentModel.round_number;

    if (accuracy === null) return;

    // Check 1: Accuracy below threshold
    if (accuracy < minAccuracyThreshold) {
      toast.error('⚠️ Model Quality Alert', {
        description: `${projectName} - Round ${roundNumber}: Accuracy (${(accuracy * 100).toFixed(2)}%) is below threshold (${(minAccuracyThreshold * 100).toFixed(0)}%)`,
        duration: 10000,
        action: {
          label: 'View Details',
          onClick: () => {
            window.location.href = `/federated-learning/${projectId}`;
          }
        }
      });
    }

    // Check 2: Accuracy drop from previous round
    if (history.length >= 2) {
      const previousModel = history[history.length - 2];
      const previousAccuracy = previousModel.global_accuracy;

      if (previousAccuracy !== null) {
        const accuracyDrop = previousAccuracy - accuracy;
        
        if (accuracyDrop > 0.05) { // More than 5% drop
          toast.warning('📉 Accuracy Drop Detected', {
            description: `${projectName} - Round ${roundNumber}: Accuracy dropped by ${(accuracyDrop * 100).toFixed(2)}% from previous round`,
            duration: 8000,
            action: {
              label: 'Investigate',
              onClick: () => {
                window.location.href = `/federated-learning/${projectId}`;
              }
            }
          });
        }
      }
    }

    // Check 3: Convergence stalling
    if (history.length >= convergenceWindowSize) {
      const recentModels = history.slice(-convergenceWindowSize);
      const accuracies = recentModels
        .map(m => m.global_accuracy)
        .filter((acc): acc is number => acc !== null);

      if (accuracies.length === convergenceWindowSize) {
        // Calculate variance in recent accuracies
        const mean = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
        const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - mean, 2), 0) / accuracies.length;
        const stdDev = Math.sqrt(variance);

        // Check if improvement is minimal
        const firstAccuracy = accuracies[0];
        const lastAccuracy = accuracies[accuracies.length - 1];
        const improvement = lastAccuracy - firstAccuracy;

        if (stdDev < convergenceThreshold && improvement < convergenceThreshold) {
          toast.info('🔄 Convergence Stalling', {
            description: `${projectName} - Round ${roundNumber}: Model accuracy has plateaued over the last ${convergenceWindowSize} rounds. Consider adjusting learning parameters.`,
            duration: 10000,
            action: {
              label: 'View Trends',
              onClick: () => {
                window.location.href = `/federated-learning/${projectId}`;
              }
            }
          });
        }
      }
    }

    // Check 4: Loss increasing
    if (history.length >= 2) {
      const previousModel = history[history.length - 2];
      const currentLoss = currentModel.global_loss;
      const previousLoss = previousModel.global_loss;

      if (currentLoss !== null && previousLoss !== null) {
        const lossIncrease = currentLoss - previousLoss;
        
        if (lossIncrease > 0.1) { // Significant loss increase
          toast.warning('📈 Loss Increasing', {
            description: `${projectName} - Round ${roundNumber}: Training loss increased by ${lossIncrease.toFixed(4)}. Model may be overfitting.`,
            duration: 8000,
            action: {
              label: 'Check Data',
              onClick: () => {
                window.location.href = `/federated-learning/${projectId}`;
              }
            }
          });
        }
      }
    }

    // Check 5: Insufficient participants
    const minParticipants = 3;
    if (currentModel.participating_clients < minParticipants) {
      toast.warning('👥 Low Participation', {
        description: `${projectName} - Round ${roundNumber}: Only ${currentModel.participating_clients} participants contributed. More participants needed for robust training.`,
        duration: 8000,
      });
    }
  };

  return {
    isMonitoring: isOwner
  };
};
