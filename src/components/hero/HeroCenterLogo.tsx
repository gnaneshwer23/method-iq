
import { Brain } from "lucide-react";

export function HeroCenterLogo() {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="flex flex-col items-center justify-center">
        <Brain className="w-36 h-36 text-primary mb-4" />
        <div className="text-primary font-bold text-5xl">MethodIQ</div>
      </div>
    </div>
  );
}
