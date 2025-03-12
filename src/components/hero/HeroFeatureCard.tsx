
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroFeatureCardProps {
  icon: LucideIcon;
  title: string;
  route: string;
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
}

export function HeroFeatureCard({ icon: Icon, title, route, position }: HeroFeatureCardProps) {
  return (
    <div className="absolute" style={position}>
      <Link 
        to={route}
        className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-2xl p-4 shadow-md border border-blue-100 w-[180px] flex flex-col items-center hover:scale-105"
      >
        <Icon className="w-12 h-12 mb-3 text-primary" />
        <div className="font-medium text-center">{title}</div>
      </Link>
    </div>
  );
}
