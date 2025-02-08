
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const SubmissionChecklist = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("market");
  const isMobile = useIsMobile();

  const ChecklistItem = ({ title, items }: { title: string; items: string[] }) => (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 mt-1 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Mobile-friendly tab labels
  const getTabLabel = (label: string) => {
    if (!isMobile) return label;
    switch (label) {
      case "competition": return "Comp";
      case "financial": return "Fin";
      case "acquisition": return "Acq";
      default: return label;
    }
  };

  return (
    <div className="min-h-screen w-full py-4 px-3 sm:py-8 sm:px-4 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Company Information Checklist</h1>
        
        <Alert className="mb-4 sm:mb-6">
          <AlertDescription>
            This checklist outlines all the information that helps us provide better advice for your company. 
            You can proceed with submitting any amount of information you have available - more information helps us give better advice, but partial submissions are welcome.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="market" className="space-y-4 sm:space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:flex sm:flex-wrap w-full gap-1 p-1">
            <TabsTrigger value="market" className="text-xs sm:text-sm">{getTabLabel("market")}</TabsTrigger>
            <TabsTrigger value="competition" className="text-xs sm:text-sm">{getTabLabel("competition")}</TabsTrigger>
            <TabsTrigger value="financial" className="text-xs sm:text-sm">{getTabLabel("financial")}</TabsTrigger>
            <TabsTrigger value="team" className="text-xs sm:text-sm">{getTabLabel("team")}</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs sm:text-sm">{getTabLabel("customers")}</TabsTrigger>
            <TabsTrigger value="acquisition" className="text-xs sm:text-sm">{getTabLabel("acquisition")}</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Information Checklist</CardTitle>
              <CardDescription>
                Review the information needed for the {activeTab} section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TabsContent value="market" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Market Overview"
                  items={[
                    "Industry and sector of operation",
                    "Total Addressable Market (TAM) size",
                    "Key market trends and opportunities"
                  ]}
                />
                <ChecklistItem
                  title="Target Customer Profile"
                  items={[
                    "Description of ideal customer segments",
                    "Customer pain points and challenges",
                    "Customer purchasing behavior"
                  ]}
                />
              </TabsContent>

              <TabsContent value="competition" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Competitive Analysis"
                  items={[
                    "Key competitors and their positioning",
                    "Competitive strengths and weaknesses",
                    "Your unique competitive advantages"
                  ]}
                />
                <ChecklistItem
                  title="Market Position"
                  items={[
                    "Industry benchmarks and standards",
                    "Feature comparison with competitors",
                    "Market differentiation strategy"
                  ]}
                />
              </TabsContent>

              <TabsContent value="financial" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Revenue Metrics"
                  items={[
                    "Annual and Monthly Recurring Revenue",
                    "Revenue streams breakdown",
                    "Year-over-year growth percentages"
                  ]}
                />
                <ChecklistItem
                  title="Financial Health"
                  items={[
                    "Profit margins and cost structure",
                    "Funding history and capital structure",
                    "Key financial milestones"
                  ]}
                />
              </TabsContent>

              <TabsContent value="team" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Leadership Team"
                  items={[
                    "Leadership profiles and experience",
                    "Key team member backgrounds",
                    "Notable achievements and expertise"
                  ]}
                />
                <ChecklistItem
                  title="Team Structure"
                  items={[
                    "Current team composition",
                    "Hiring plans and growth strategy",
                    "Identified skill gaps and solutions"
                  ]}
                />
              </TabsContent>

              <TabsContent value="customers" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Customer Insights"
                  items={[
                    "Customer feedback and testimonials",
                    "Case studies and success stories",
                    "Customer satisfaction metrics"
                  ]}
                />
                <ChecklistItem
                  title="Customer Success"
                  items={[
                    "Retention rates and trends",
                    "Customer satisfaction scores",
                    "Notable client relationships"
                  ]}
                />
              </TabsContent>

              <TabsContent value="acquisition" className="space-y-4 mt-0">
                <ChecklistItem
                  title="Acquisition Strategy"
                  items={[
                    "Target audience definition",
                    "Marketing and sales channels",
                    "Customer acquisition costs"
                  ]}
                />
                <ChecklistItem
                  title="Sales Process"
                  items={[
                    "Sales funnel metrics",
                    "Conversion rates and KPIs",
                    "Sales enablement tools"
                  ]}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="mt-6 sm:mt-8 flex justify-end">
          <Button 
            onClick={() => navigate('/submission-form')} 
            className="w-full sm:w-auto flex items-center justify-center"
          >
            Proceed to Submission Form
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionChecklist;
