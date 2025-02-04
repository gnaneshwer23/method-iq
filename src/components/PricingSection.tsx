
import { Building2, Check, CreditCard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tiers = [
  {
    name: "Free Tier",
    description: "Perfect for individual researchers getting started",
    price: "0",
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
    <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that best fits your research needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden p-8 ${
                tier.highlighted
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-6">
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
                      or ${tier.price.annual}/year (save 20%)
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={tier.highlighted ? "default" : "outline"}>
                {tier.name === "Free Tier" ? "Get Started" : "Subscribe Now"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Institutional Licensing Section */}
        <div className="max-w-3xl mx-auto text-center">
          <Card className="p-8">
            <div className="flex flex-col items-center gap-4">
              <Building2 className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Institutional Licensing</h3>
              <p className="text-muted-foreground mb-4">
                Custom-tailored plans for universities, research institutions, and corporate R&D departments. 
                Contact us for volume discounts and specialized integration options.
              </p>
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
