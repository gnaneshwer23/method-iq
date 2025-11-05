import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlockchainVerificationBadgeProps {
  hash?: string | null;
  verified?: boolean;
  transactionId?: string | null;
  blockchainNetwork?: string;
  timestamp?: string;
  compact?: boolean;
}

export const BlockchainVerificationBadge = ({ 
  hash, 
  verified, 
  transactionId,
  blockchainNetwork = 'polygon-mumbai',
  timestamp,
  compact = false
}: BlockchainVerificationBadgeProps) => {
  
  if (!hash && !verified) {
    return null;
  }

  const getExplorerUrl = (txId: string) => {
    if (blockchainNetwork === 'polygon-mumbai') {
      return `https://mumbai.polygonscan.com/tx/${txId}`;
    }
    return `https://polygonscan.com/tx/${txId}`;
  };

  if (compact) {
    return (
      <Badge variant={verified ? "default" : "secondary"} className="gap-1">
        <Shield className="h-3 w-3" />
        {verified ? 'Blockchain Verified' : 'Hash Generated'}
      </Badge>
    );
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Blockchain Verification
        </CardTitle>
        <CardDescription>
          {verified 
            ? 'This protocol is permanently recorded on the blockchain' 
            : 'Hash generated and ready for blockchain verification'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Hash */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-1">SHA-256 Hash</div>
          <div className="font-mono text-xs bg-background p-2 rounded border break-all">
            {hash}
          </div>
        </div>

        {/* Transaction ID */}
        {transactionId && verified && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">Transaction ID</div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-xs bg-background p-2 rounded border break-all flex-1">
                {transactionId}
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a 
                  href={getExplorerUrl(transactionId)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Network & Timestamp */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span className="capitalize">{blockchainNetwork.replace('-', ' ')}</span>
          </div>
          {timestamp && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(timestamp).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {!verified && (
          <div className="text-xs text-muted-foreground italic pt-2 border-t">
            Configure ALCHEMY_API_KEY and BLOCKCHAIN_PRIVATE_KEY secrets for full blockchain verification.
          </div>
        )}
      </CardContent>
    </Card>
  );
};