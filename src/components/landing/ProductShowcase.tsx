import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

export function ProductShowcase() {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const devices = [
    { id: "desktop" as const, icon: Monitor, label: "Desktop" },
    { id: "tablet" as const, icon: Tablet, label: "Tablet" },
    { id: "mobile" as const, icon: Smartphone, label: "Mobile" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
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
          <Card className="p-8 bg-gradient-to-br from-secondary/50 to-transparent animate-fade-in">
            <div
              className={`mx-auto bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-500 ${
                activeDevice === "desktop"
                  ? "max-w-full aspect-[16/10]"
                  : activeDevice === "tablet"
                  ? "max-w-2xl aspect-[4/3]"
                  : "max-w-sm aspect-[9/16]"
              }`}
            >
              {/* Mock Browser/Device Chrome */}
              <div className="bg-secondary p-2 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-muted rounded px-3 py-1 text-xs text-muted-foreground">
                  app.methodiq.com
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 h-full">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 space-y-2"
                      >
                        <div className="h-3 bg-muted/50 rounded w-2/3" />
                        <div className="h-8 bg-muted/30 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Chart Preview */}
                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-4 space-y-2">
                    <div className="h-3 bg-muted/50 rounded w-1/4" />
                    <div className="flex items-end gap-2 h-20">
                      {[60, 80, 55, 90, 70, 85].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/30 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
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
