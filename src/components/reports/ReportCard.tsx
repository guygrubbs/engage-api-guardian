import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock, Download, AlertTriangle } from "lucide-react";
import { PurchaseReportButton } from "./PurchaseReportButton";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReportCardProps {
  report: {
    id: string;
    tier: 'teaser' | 'tier2' | 'tier3';
    content: any;
    is_paid: boolean | null;
    pitch_id: string;
    created_at: string;
  };
  companyName: string;
  onDownload?: () => void;
}

export const ReportCard = ({ report, companyName, onDownload }: ReportCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTierLabel = (tier: 'teaser' | 'tier2' | 'tier3') => {
    switch (tier) {
      case 'teaser':
        return 'Teaser Report';
      case 'tier2':
        return 'Tier 2 Report';
      case 'tier3':
        return 'Tier 3 Report';
    }
  };

  const isError = report.content?.status === 'error';

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{getTierLabel(report.tier)}</CardTitle>
          </div>
          {!report.is_paid && report.tier !== 'teaser' && (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <CardDescription>
          {companyName} - Generated on {formatDate(report.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              There was an error generating this report. Please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          report.is_paid || report.tier === 'teaser' ? (
            <div>
              <pre className="whitespace-pre-wrap text-sm mb-4 bg-muted p-4 rounded-lg">
                {JSON.stringify(report.content, null, 2)}
              </pre>
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="mt-4"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Purchase this report to view detailed insights
              </p>
              <PurchaseReportButton
                pitchId={report.pitch_id}
                tier={report.tier}
                className="w-full sm:w-auto"
              />
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};