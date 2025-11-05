import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PrivacyBudgetData {
  totalBudget: number;
  usedBudget: number;
  remainingBudget: number;
  canSubmit: boolean;
  warningLevel: 'none' | 'warning' | 'critical' | 'exhausted';
}

export const usePrivacyBudget = (projectId: string) => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['privacy-budget', projectId, user?.id],
    queryFn: async (): Promise<PrivacyBudgetData> => {
      if (!user?.id) {
        return {
          totalBudget: 0,
          usedBudget: 0,
          remainingBudget: 0,
          canSubmit: false,
          warningLevel: 'exhausted'
        };
      }

      // Get project privacy budget
      const { data: project, error: projectError } = await supabase
        .from('federated_learning_projects')
        .select('privacy_budget')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      // Get participant's budget usage
      const { data: participant, error: participantError } = await supabase
        .from('federated_learning_participants')
        .select('privacy_budget_used, privacy_budget_remaining')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (participantError) throw participantError;

      const totalBudget = project?.privacy_budget || 1.0;
      const usedBudget = participant?.privacy_budget_used || 0;
      const remainingBudget = participant?.privacy_budget_remaining ?? totalBudget;
      const usagePercentage = (usedBudget / totalBudget) * 100;

      let warningLevel: 'none' | 'warning' | 'critical' | 'exhausted' = 'none';
      if (remainingBudget <= 0) {
        warningLevel = 'exhausted';
      } else if (usagePercentage >= 90) {
        warningLevel = 'critical';
      } else if (usagePercentage >= 70) {
        warningLevel = 'warning';
      }

      return {
        totalBudget,
        usedBudget,
        remainingBudget,
        canSubmit: remainingBudget > 0,
        warningLevel
      };
    },
    enabled: !!projectId && !!user?.id
  });

  return {
    ...data,
    isLoading
  };
};

export const validatePrivacyBudget = (
  remainingBudget: number,
  requestedEpsilon: number
): { valid: boolean; message?: string } => {
  if (remainingBudget <= 0) {
    return {
      valid: false,
      message: 'Privacy budget exhausted. Cannot submit more updates.'
    };
  }

  if (requestedEpsilon > remainingBudget) {
    return {
      valid: false,
      message: `Requested epsilon (${requestedEpsilon.toFixed(4)}) exceeds remaining budget (${remainingBudget.toFixed(4)})`
    };
  }

  if (requestedEpsilon <= 0) {
    return {
      valid: false,
      message: 'Epsilon must be greater than 0'
    };
  }

  return { valid: true };
};
