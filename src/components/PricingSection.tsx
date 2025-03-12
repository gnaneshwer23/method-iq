
import { Badge } from "@/components/ui/badge";
import { Building2, Check, CreditCard, Users, Zap, Shield, Star, Database, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tiers = [
  {
    name: "Free Tier",
    description: "Perfect for individual researchers getting started",
    price: "0",
    badge: "Popular",
    icon: <Database className="h-10 w-10 text-primary/70" />,
    features: [
      "Access to Basic Protocols",
      "Community Forums",
      "Basic AI Assistance",
    ],
  },
  {
    name: "Premium",
    description: "Enhanced features for serious research professionals",
    price: {
      monthly: "49",
      annual: "470",
    },
    badge: "Recommended",
    icon: <Zap className="h-10 w-10 text-primary" />,
    features: [
      "Enhanced AI Capabilities",
      "Virtual Lab Access",
      "Blockchain-Backed Documentation",
      "Expert Consultations",
      "Priority Support",
    ],
    highlighted: true,
  }
];

export function PricingSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary/5 to-primary/10 -z-10"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-4 relative">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-medium bg-primary/5">
            Simple Pricing
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent pricing to support your research needs at any scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden p-8 hover:shadow-lg transition-all duration-300 ${
                tier.highlighted
                  ? "border-primary shadow-lg shadow-primary/10 scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                  {tier.badge}
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                {tier.icon}
                <div>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>
              </div>

              <div className="mb-8 p-4 bg-secondary/50 rounded-lg">
                {typeof tier.price === "string" ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">${tier.price.monthly}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      or <span className="font-medium">${tier.price.annual}/year</span> <Badge variant="outline" className="ml-1 text-xs bg-primary/10 text-primary border-primary/20">Save 20%</Badge>
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full gap-2 ${tier.highlighted ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 hover:text-primary'}`}
              >
                {tier.name === "Free Tier" ? (
                  <>
                    <Gift className="h-4 w-4" />
                    Get Started
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Subscribe Now
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Institutional Licensing Section with updated design */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 border-dashed bg-gradient-to-r from-secondary/50 to-background border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Institutional Licensing</h3>
                <p className="text-muted-foreground mb-4">
                  Custom-tailored plans for universities, research institutions, and corporate R&D departments. 
                  Contact us for volume discounts and specialized integration options.
                </p>
                <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary hover:bg-primary/5">
                  <Users className="h-4 w-4" />
                  Contact Sales Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
