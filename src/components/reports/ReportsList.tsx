import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportCard } from "./ReportCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReportsListProps {
  pitchId?: string;
}

export const ReportsList = ({ pitchId }: ReportsListProps) => {
  const { data: reports, isLoading, error, refetch } = useQuery({
    queryKey: ['reports', pitchId],
    queryFn: async () => {
      try {
        let query = supabase
          .from('reports')
          .select(`
            *,
            pitches (
              company_name
            )
          `)
          .order('created_at', { ascending: false });

        if (pitchId) {
          query = query.eq('pitch_id', pitchId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast({
          title: "Error",
          description: "Failed to load reports. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 2,
  });

  const handleDownload = async (report: any) => {
    try {
      const jsonString = JSON.stringify(report.content, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.pitches.company_name}-${report.tier}-report.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load reports
          <button
            onClick={() => refetch()}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!reports?.length) {
    return (
      <Alert>
        <AlertDescription>No reports found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          companyName={report.pitches.company_name}
          onDownload={() => handleDownload(report)}
        />
      ))}
    </div>
  );
};