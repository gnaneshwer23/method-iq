import { Button } from '@/components/ui/button';
import { Shield, Loader2 } from 'lucide-react';
import { useBlockchainVerification } from '@/hooks/useBlockchainVerification';
import type { Protocol } from '@/types/database.types';
import { useAuth } from '@/contexts/AuthContext';

interface VerifyButtonProps {
  protocol: Protocol;
  disabled?: boolean;
}

export const VerifyButton = ({ protocol, disabled }: VerifyButtonProps) => {
  const { user } = useAuth();
  const verification = useBlockchainVerification();

  const canVerify = user && (user.id === protocol.created_by || user.role === 'admin');
  const isAlreadyVerified = protocol.verified || !!protocol.hash;

  if (!canVerify || isAlreadyVerified) {
    return null;
  }

  const handleVerify = async () => {
    await verification.mutateAsync({
      entityType: 'protocol',
      entityId: protocol.id,
      entityData: {
        title: protocol.title,
        summary: protocol.summary,
        detailed_steps: protocol.detailed_steps,
        tags: protocol.tags,
        created_at: protocol.created_at,
        created_by: protocol.created_by
      }
    });
  };

  return (
    <Button
      onClick={handleVerify}
      disabled={disabled || verification.isPending}
      variant="default"
      className="gap-2"
    >
      {verification.isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Verifying...
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          Verify on Blockchain
        </>
      )}
    </Button>
  );
};