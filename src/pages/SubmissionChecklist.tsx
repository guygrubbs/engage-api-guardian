
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TabContentMap, type TabKey } from "@/components/checklist/TabContentMap";

const SubmissionChecklist = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("market");
  const isMobile = useIsMobile();

  const getTabLabel = (label: TabKey) => {
    if (!isMobile) {
      const labelMap: Record<TabKey, string> = {
        market: "Market Analysis",
        competition: "Competition",
        financial: "Financial Info",
        team: "Team Details",
        customers: "Customers",
        acquisition: "Acquisition"
      };
      return labelMap[label];
    }
    
    // Mobile-friendly shorter labels
    const mobileLabels: Record<TabKey, string> = {
      market: "Market",
      competition: "Comp",
      financial: "Finance",
      team: "Team",
      customers: "Custom",
      acquisition: "Acquire"
    };
    return mobileLabels[label];
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

        <Tabs defaultValue="market" className="space-y-4 sm:space-y-6" onValueChange={(value) => setActiveTab(value as TabKey)}>
          <div className="bg-muted/80 p-1 rounded-lg">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
              {(Object.keys(TabContentMap) as TabKey[]).map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="text-xs sm:text-sm data-[state=active]:bg-background/90 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 whitespace-nowrap px-2 py-1.5"
                >
                  {getTabLabel(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Card className="border-muted/30 bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Information Checklist</CardTitle>
              <CardDescription>
                Review the information needed for the {getTabLabel(activeTab)} section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(Object.keys(TabContentMap) as TabKey[]).map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  {TabContentMap[tab]}
                </TabsContent>
              ))}
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
