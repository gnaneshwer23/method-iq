
import { RefreshCcw } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg">Loading your workspace...</p>
      </div>
    </div>
  );
};
