import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface AggregateModelButtonProps {
  projectId: string;
  roundNumber: number;
  disabled?: boolean;
}

export const AggregateModelButton = ({ projectId, roundNumber, disabled }: AggregateModelButtonProps) => {
  const [isAggregating, setIsAggregating] = useState(false);
  const queryClient = useQueryClient();

  const handleAggregate = async () => {
    setIsAggregating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('aggregate-federated-model', {
        body: { 
          projectId, 
          roundNumber 
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(
        `Model aggregated successfully! ${data.participatingClients} participants included.`,
        {
          description: `Accuracy: ${data.metrics.globalAccuracy.toFixed(4)}, Loss: ${data.metrics.globalLoss.toFixed(4)}`
        }
      );

      // Refresh project data
      queryClient.invalidateQueries({ queryKey: ['federated-project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['aggregated-models', projectId] });

    } catch (error) {
      console.error('Aggregation error:', error);
      toast.error(
        'Failed to aggregate model',
        {
          description: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      );
    } finally {
      setIsAggregating(false);
    }
  };

  return (
    <Button 
      onClick={handleAggregate} 
      disabled={disabled || isAggregating}
      size="sm"
    >
      {isAggregating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Aggregating...
        </>
      ) : (
        <>
          <Brain className="h-4 w-4 mr-2" />
          Aggregate Round {roundNumber}
        </>
      )}
    </Button>
  );
};
