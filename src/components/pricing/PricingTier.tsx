import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  onSelect: () => void;
  popular?: boolean;
}

const PricingTier = ({
  name,
  price,
  description,
  features,
  buttonText,
  onSelect,
  popular = false,
}: PricingTierProps) => {
  return (
    <Card className={`w-full ${popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature.included && <Check className="h-4 w-4 text-primary" />}
              <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          className="w-full"
          variant={popular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingTier;