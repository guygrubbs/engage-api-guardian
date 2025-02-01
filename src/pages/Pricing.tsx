import { useState } from "react";
import PricingTier from "@/components/pricing/PricingTier";

const Pricing = () => {
  const [billingCycle] = useState<"monthly" | "yearly">("monthly");

  const tiers = [
    {
      name: "Basic",
      price: "$99",
      description: "Essential pitch deck analysis for startups",
      features: [
        { text: "Basic pitch deck review", included: true },
        { text: "Market analysis", included: true },
        { text: "Competitor insights", included: true },
        { text: "Investment readiness score", included: true },
        { text: "Advanced financial analysis", included: false },
        { text: "Investor matching", included: false },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      price: "$299",
      description: "Comprehensive analysis and investor matching",
      features: [
        { text: "Everything in Basic", included: true },
        { text: "Advanced financial analysis", included: true },
        { text: "Investor matching", included: true },
        { text: "Priority support", included: true },
        { text: "Custom reporting", included: true },
        { text: "Pitch deck templates", included: true },
      ],
      buttonText: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom solutions for larger organizations",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Custom integrations", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom API access", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom training", included: true },
      ],
      buttonText: "Contact Sales",
    },
  ];

  const handleSelectTier = (tierName: string) => {
    console.log(`Selected tier: ${tierName}`);
    // Add your pricing selection logic here
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your startup's needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <PricingTier
            key={tier.name}
            {...tier}
            onSelect={() => handleSelectTier(tier.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
