import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Rocket, LineChart, Shield, Brain } from "lucide-react";

const Index = () => {
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
          <Button size="lg" className="gap-2">
            Submit Your Pitch <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            VC Dashboard
          </Button>
        </div>
      </section>

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
            <Button size="lg" className="w-full md:w-auto">
              Create Account
            </Button>
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