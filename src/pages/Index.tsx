import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Rocket, LineChart, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PitchSubmissionForm } from "@/components/PitchSubmissionForm";
import { DashboardView } from "@/components/dashboard/DashboardView";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showPitchForm, setShowPitchForm] = useState(false);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {user ? (
        <div className="container mx-auto px-4 py-8">
          <DashboardView />
          <div className="mt-8">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => setShowPitchForm(!showPitchForm)}
            >
              {showPitchForm ? 'Hide Form' : 'Submit New Pitch'} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {showPitchForm && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Pitch</CardTitle>
                </CardHeader>
                <CardContent>
                  <PitchSubmissionForm />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Connect Startups with VCs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Submit pitch decks, generate AI-powered insights, and connect with the right investors.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/auth">
                Get Started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
    <CardHeader>
      <div className="mb-4 text-primary">{icon}</div>
      <CardTitle className="text-xl mb-2">{title}</CardTitle>
      <p className="text-muted-foreground">{description}</p>
    </CardHeader>
  </Card>
);

export default Index;
