
import { Brain, CircuitBoard, Lock, Users, TestTube, Sparkles } from "lucide-react";
import { HeroFeatureCard } from "./HeroFeatureCard";
import { HeroConnectingLines } from "./HeroConnectingLines";
import { HeroCenterLogo } from "./HeroCenterLogo";

export function HeroFeatureMap() {
  return (
    <div className="hidden lg:block relative h-[650px]">
      <div className="sticky top-24 w-full h-[650px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Center Logo */}
          <HeroCenterLogo />

          {/* Connecting Lines */}
          <HeroConnectingLines />

          {/* Feature Cards */}
          <HeroFeatureCard 
            icon={Sparkles} 
            title="AR/VR Training" 
            route="/features/ar-vr"
            position={{ left: "15%", top: "25%" }}
          />
          
          <HeroFeatureCard 
            icon={Brain} 
            title="AI-Powered Protocols" 
            route="/features/ai-protocols"
            position={{ left: "50%", top: "8%", transform: "translateX(-50%)" }}
          />
          
          <HeroFeatureCard 
            icon={CircuitBoard} 
            title="Real-Time IoT Data" 
            route="/features/iot-integration"
            position={{ right: "15%", top: "25%" }}
          />
          
          <HeroFeatureCard 
            icon={Lock} 
            title="Blockchain Verification" 
            route="/features/blockchain-verification"
            position={{ right: "15%", top: "75%" }}
          />
          
          <HeroFeatureCard 
            icon={TestTube} 
            title="Research Analytics" 
            route="/features/research-analytics"
            position={{ left: "50%", bottom: "8%", transform: "translateX(-50%)" }}
          />
          
          <HeroFeatureCard 
            icon={Users} 
            title="Professional Networking" 
            route="/features/networking"
            position={{ left: "15%", top: "75%" }}
          />
        </div>
      </div>
    </div>
  );
}
