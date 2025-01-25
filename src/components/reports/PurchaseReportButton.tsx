import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useState } from "react";

interface PurchaseReportButtonProps {
  pitchId: string;
  tier: 'tier2' | 'tier3';
  className?: string;
}

export const PurchaseReportButton = ({ pitchId, tier, className }: PurchaseReportButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to purchase a report",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-report-checkout', {
        body: { pitchId, tier },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePurchase} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Purchase ${tier === 'tier2' ? 'Tier 2' : 'Tier 3'} Report`
      )}
    </Button>
  );
};