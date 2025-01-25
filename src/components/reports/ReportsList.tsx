import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportCard } from "./ReportCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";

interface ReportsListProps {
  pitchId?: string; // Optional - if provided, only shows reports for this pitch
}

export const ReportsList = ({ pitchId }: ReportsListProps) => {
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports', pitchId],
    queryFn: async () => {
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
    },
  });

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
        <AlertDescription>Failed to load reports</AlertDescription>
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
        />
      ))}
    </div>
  );
};