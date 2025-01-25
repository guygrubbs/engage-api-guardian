import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoleManagement } from "@/components/admin/UserRoleManagement";
import { Loader } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  // Check if user is admin
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !data) return false;
      return true;
    },
  });

  useEffect(() => {
    // Redirect non-admin users
    if (!checkingAdmin && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, checkingAdmin, navigate]);

  if (checkingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>User Role Management</CardTitle>
          </CardHeader>
          <CardContent>
            <UserRoleManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;