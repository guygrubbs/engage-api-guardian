import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportsList } from "../reports/ReportsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";

export const DashboardView = () => {
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;
      return data?.role;
    },
  });

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === 'vc' ? 'All Company Reports' : 'Your Reports'}
          </CardTitle>
          <CardDescription>
            {userRole === 'vc' 
              ? 'View and analyze reports from all companies'
              : 'View your company reports and upgrade for more insights'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportsList />
        </CardContent>
      </Card>
    </div>
  );
};