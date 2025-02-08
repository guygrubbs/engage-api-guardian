import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, Save } from "lucide-react";

interface SubmissionFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export const SubmissionForm = ({ onSubmit, isSubmitting }: SubmissionFormProps) => {
  const [formData, setFormData] = useState({
    industry: "",
    market_size: "",
    market_trends: "",
    target_customer: "",
    customer_pain_points: "",
    competitors: "",
    competitive_advantages: "",
    benchmarking_data: "",
    economic_factors: "",
    tech_factors: "",
    regulatory_environment: "",
    opportunity_drivers: "",
    customer_feedback: "",
    case_studies: "",
    annual_revenue: "",
    monthly_revenue: "",
    revenue_streams: "",
    yoy_growth: "",
    leadership_profiles: "",
    team_structure: "",
    hiring_plans: "",
    identified_gaps: "",
    target_audience: "",
    acquisition_channels: "",
    acquisition_costs: "",
    sales_funnel: "",
    retention_metrics: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="flex flex-wrap w-full gap-2 p-1">
          <TabsTrigger value="market" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Market</TabsTrigger>
          <TabsTrigger value="competition" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Competition</TabsTrigger>
          <TabsTrigger value="financial" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Financial</TabsTrigger>
          <TabsTrigger value="team" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Team</TabsTrigger>
          <TabsTrigger value="customers" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Customers</TabsTrigger>
          <TabsTrigger value="acquisition" className="flex-1 min-w-[80px] text-xs sm:text-sm glass hover:bg-primary/20">Acquisition</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4 animate-fade-in">
          <div className="space-y-4">
            <div className="glass p-3 sm:p-4">
              <Label htmlFor="industry" className="text-foreground/90">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g., FinTech, HealthTech"
                className="mt-2 bg-white/5 border-white/10 focus:border-primary/40"
              />
            </div>
            <div className="glass p-3 sm:p-4">
              <Label htmlFor="market_size" className="text-foreground/90">Market Size</Label>
              <Input
                id="market_size"
                name="market_size"
                type="number"
                value={formData.market_size}
                onChange={handleChange}
                placeholder="Total Addressable Market size"
                className="mt-2 bg-white/5 border-white/10 focus:border-primary/40"
              />
            </div>
            <div className="glass p-3 sm:p-4">
              <Label htmlFor="market_trends" className="text-foreground/90">Market Trends</Label>
              <Textarea
                id="market_trends"
                name="market_trends"
                value={formData.market_trends}
                onChange={handleChange}
                placeholder="Describe key market trends"
                className="mt-2 bg-white/5 border-white/10 focus:border-primary/40"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competition" className="space-y-4">
          <div>
            <Label htmlFor="competitors">Competitors</Label>
            <Textarea
              id="competitors"
              name="competitors"
              value={formData.competitors}
              onChange={handleChange}
              placeholder="List key competitors"
            />
          </div>
          <div>
            <Label htmlFor="competitive_advantages">Competitive Advantages</Label>
            <Textarea
              id="competitive_advantages"
              name="competitive_advantages"
              value={formData.competitive_advantages}
              onChange={handleChange}
              placeholder="Describe your competitive advantages"
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div>
            <Label htmlFor="annual_revenue">Annual Revenue</Label>
            <Input
              id="annual_revenue"
              name="annual_revenue"
              type="number"
              value={formData.annual_revenue}
              onChange={handleChange}
              placeholder="Annual revenue in USD"
            />
          </div>
          <div>
            <Label htmlFor="monthly_revenue">Monthly Revenue</Label>
            <Input
              id="monthly_revenue"
              name="monthly_revenue"
              type="number"
              value={formData.monthly_revenue}
              onChange={handleChange}
              placeholder="Monthly revenue in USD"
            />
          </div>
          <div>
            <Label htmlFor="yoy_growth">Year-over-Year Growth (%)</Label>
            <Input
              id="yoy_growth"
              name="yoy_growth"
              type="number"
              value={formData.yoy_growth}
              onChange={handleChange}
              placeholder="Growth percentage"
            />
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div>
            <Label htmlFor="leadership_profiles">Leadership Profiles</Label>
            <Textarea
              id="leadership_profiles"
              name="leadership_profiles"
              value={formData.leadership_profiles}
              onChange={handleChange}
              placeholder="Describe your leadership team"
            />
          </div>
          <div>
            <Label htmlFor="team_structure">Team Structure</Label>
            <Textarea
              id="team_structure"
              name="team_structure"
              value={formData.team_structure}
              onChange={handleChange}
              placeholder="Describe your team structure"
            />
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div>
            <Label htmlFor="target_customer">Target Customer</Label>
            <Textarea
              id="target_customer"
              name="target_customer"
              value={formData.target_customer}
              onChange={handleChange}
              placeholder="Describe your target customer"
            />
          </div>
          <div>
            <Label htmlFor="customer_feedback">Customer Feedback</Label>
            <Textarea
              id="customer_feedback"
              name="customer_feedback"
              value={formData.customer_feedback}
              onChange={handleChange}
              placeholder="Share customer feedback"
            />
          </div>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-4">
          <div>
            <Label htmlFor="acquisition_channels">Acquisition Channels</Label>
            <Textarea
              id="acquisition_channels"
              name="acquisition_channels"
              value={formData.acquisition_channels}
              onChange={handleChange}
              placeholder="Describe your acquisition channels"
            />
          </div>
          <div>
            <Label htmlFor="acquisition_costs">Customer Acquisition Cost</Label>
            <Input
              id="acquisition_costs"
              name="acquisition_costs"
              type="number"
              value={formData.acquisition_costs}
              onChange={handleChange}
              placeholder="Average cost per customer"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4 mt-6 sm:mt-8">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full sm:w-auto glass bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500/90 hover:to-blue-500/90"
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Submit Information
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
