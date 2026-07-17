import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import dashboardImg from "@/assets/product-dashboard.jpg";

export function ProductShowcase() {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const devices = [
    { id: "desktop" as const, icon: Monitor, label: "Desktop" },
    { id: "tablet" as const, icon: Tablet, label: "Tablet" },
    { id: "mobile" as const, icon: Smartphone, label: "Mobile" },
  ];

  return (
    <section ref={ref} className="py-20">
      <div className={cn(
        "container mx-auto px-4 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Responsive Design
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Works Beautifully Everywhere</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access your research tools from any device, anywhere in the world
          </p>
        </div>

        {/* Device Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeDevice === device.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <device.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{device.label}</span>
            </button>
          ))}
        </div>

        {/* Showcase Area */}
        <div className="relative max-w-6xl mx-auto">
          <Card className="p-3 sm:p-6 md:p-8 bg-gradient-to-br from-secondary/50 to-transparent animate-fade-in">
            <div
              className={`mx-auto bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-500 w-full ${
                activeDevice === "desktop"
                  ? "max-w-full aspect-[16/10]"
                  : activeDevice === "tablet"
                  ? "max-w-2xl aspect-[4/3]"
                  : "max-w-[16rem] sm:max-w-xs aspect-[9/16]"
              }`}
            >
              {/* Mock Browser/Device Chrome */}
              <div className="bg-secondary p-2 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-muted rounded px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-muted-foreground truncate">
                  app.methodiq.com
                </div>
              </div>

              {/* Content Preview */}
              <div className="w-full h-[calc(100%-2.25rem)]">
                <img
                  src={dashboardImg}
                  alt="MethodIQ product dashboard"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 72rem, 100vw"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </Card>

          {/* Floating Elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { title: "Lightning Fast", desc: "Optimized performance on all devices" },
            { title: "Secure", desc: "Enterprise-grade security and encryption" },
            { title: "Accessible", desc: "24/7 access from anywhere" },
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-2">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
