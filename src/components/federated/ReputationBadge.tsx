import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Star, TrendingUp } from "lucide-react";

interface ReputationBadgeProps {
  reputation: number;
  quality?: number;
  consistency?: number;
  impact?: number;
  size?: "sm" | "md" | "lg";
}

export const ReputationBadge = ({ 
  reputation, 
  quality = 0, 
  consistency = 0, 
  impact = 0,
  size = "md" 
}: ReputationBadgeProps) => {
  const getTier = (score: number) => {
    if (score >= 90) return { label: "Elite", color: "bg-purple-500", icon: Star };
    if (score >= 75) return { label: "Expert", color: "bg-blue-500", icon: Award };
    if (score >= 60) return { label: "Advanced", color: "bg-green-500", icon: TrendingUp };
    if (score >= 40) return { label: "Intermediate", color: "bg-yellow-500", icon: TrendingUp };
    return { label: "Novice", color: "bg-gray-500", icon: TrendingUp };
  };

  const tier = getTier(reputation);
  const Icon = tier.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${tier.color} text-white ${sizeClasses[size]} gap-1.5`}>
            <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
            <span>{tier.label}</span>
            <span className="font-bold">{reputation.toFixed(0)}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="space-y-2">
          <div className="font-semibold">Reputation Breakdown</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Overall:</span>
              <span className="font-medium">{reputation.toFixed(1)}/100</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Quality:</span>
              <span className="font-medium">{quality.toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Consistency:</span>
              <span className="font-medium">{consistency.toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Impact:</span>
              <span className="font-medium">{impact.toFixed(1)}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
