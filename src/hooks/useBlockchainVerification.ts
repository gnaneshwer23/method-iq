import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verificationApi } from '@/lib/api/blockchain/verification';
import { useToast } from '@/hooks/use-toast';

export const useBlockchainVerification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ entityType, entityId, entityData }: { 
      entityType: 'protocol' | 'experiment'; 
      entityId: string; 
      entityData: any 
    }) => verificationApi.verifyOnBlockchain(entityType, entityId, entityData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['protocol', variables.entityId] });
      queryClient.invalidateQueries({ queryKey: ['protocols'] });
      toast({
        title: 'Blockchain Verification Complete',
        description: data.verified 
          ? 'Your protocol has been verified on the blockchain.' 
          : 'Hash generated. Configure blockchain API keys for full verification.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Failed to verify on blockchain',
        variant: 'destructive',
      });
    },
  });
};