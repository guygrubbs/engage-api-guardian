import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Rocket, LineChart, Shield, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PitchSubmissionForm } from "@/components/PitchSubmissionForm";

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
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Connect Startups with VCs
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Submit pitch decks, generate AI-powered insights, and connect with the right investors.
        </p>
        <div className="flex gap-4 justify-center">
          {user ? (
            <>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => setShowPitchForm(!showPitchForm)}
              >
                {showPitchForm ? 'Hide Form' : 'Submit Your Pitch'} <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button size="lg" className="gap-2" asChild>
              <Link to="/auth">
                Get Started <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Pitch Submission Form */}
      {showPitchForm && user && (
        <section className="container mx-auto px-4 py-10">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Pitch</CardTitle>
            </CardHeader>
            <CardContent>
              <PitchSubmissionForm />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Rocket className="h-8 w-8" />}
            title="Pitch Submission"
            description="Submit and manage your startup pitch decks securely"
          />
          <FeatureCard
            icon={<LineChart className="h-8 w-8" />}
            title="Analytics"
            description="Track startup growth and investment metrics over time"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="AI Insights"
            description="Generate AI-powered investment reports and analysis"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure Platform"
            description="Enterprise-grade security for your sensitive data"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-muted-foreground">
                Join the platform that's revolutionizing startup fundraising
              </p>
            </div>
            {!user && (
              <Button size="lg" className="w-full md:w-auto" asChild>
                <Link to="/auth">Create Account</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
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