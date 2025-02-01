import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const SubmissionGuidelines = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-emerald-500" />
        <h3 className="text-lg font-semibold">Submission Guidelines</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Pitch Deck Requirements</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>10-15 slides maximum</li>
            <li>PDF format under 10MB</li>
            <li>Must include problem, solution, market size, business model</li>
            <li>Team bios with relevant experience</li>
            <li>Clear financial projections and metrics</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Financial Document Guidelines</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Last 12 months of financials if available</li>
            <li>3-year projections</li>
            <li>Current cap table</li>
            <li>Key metrics dashboard</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};