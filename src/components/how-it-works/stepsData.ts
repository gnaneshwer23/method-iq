
import { User, Database, Brain, Monitor, Users, Blocks } from "lucide-react";
import { StepProps } from "./types";

export const steps: StepProps[] = [
  {
    icon: User,
    title: "Profile Setup & Onboarding",
    description: "Register and create your personalized research profile",
    details: [
      "Input your research interests and lab environment",
      "Set data preferences and integration options",
      "Configure your personalized dashboard"
    ],
    techDetail: "Secure user authentication with JWT/OAuth2 and encrypted data transmission",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Database,
    title: "Data Aggregation & Integration",
    description: "Collect data from literature, lab sensors, and external databases",
    details: [
      "Continuous aggregation of scientific literature",
      "Real-time lab sensor data integration",
      "Patent and clinical trial data collection"
    ],
    techDetail: "Microservices architecture using Docker and Kubernetes for scalable processing",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Brain,
    title: "AI Analysis & Recommendations",
    description: "Advanced AI processes your data for tailored insights",
    details: [
      "Personalized protocol recommendations",
      "Automated literature reviews",
      "Hypothesis generation assistance"
    ],
    techDetail: "LLM-powered analysis with explainable AI features",
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    icon: Monitor,
    title: "Real-Time Experimentation",
    description: "Simulate experiments using digital twins and live IoT data",
    details: [
      "Virtual lab environment simulation",
      "Real-time protocol optimization",
      "Risk-free experiment testing"
    ],
    techDetail: "Edge computing for IoT data processing and digital twin synchronization",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: Users,
    title: "Collaboration & Networking",
    description: "Engage with peers and build your research network",
    details: [
      "Connect with global researchers",
      "Share insights and protocols",
      "Build your research portfolio"
    ],
    techDetail: "Secure networking platform with end-to-end encryption",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  {
    icon: Blocks,
    title: "Immersive Training (Optional)",
    description: "Enhance skills with AR/MR training modules",
    details: [
      "Interactive technique practice",
      "Risk-free virtual training",
      "Progress tracking and certification"
    ],
    techDetail: "High-performance AR/MR rendering with WebXR integration",
    color: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];
