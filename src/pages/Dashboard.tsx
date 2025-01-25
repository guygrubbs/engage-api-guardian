import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardView } from "@/components/dashboard/DashboardView";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Manage your pitches and review insights from your dashboard.
          </p>
        </div>
        <DashboardView />
      </div>
    </div>
  );
};

export default Dashboard;