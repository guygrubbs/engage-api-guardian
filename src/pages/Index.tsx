import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Building, Briefcase, Handshake, ChartBar, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">VCConnect</Link>
            <div className="space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/about">About</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/services">Services</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
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
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/pricing">
                View Pricing <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Rocket className="h-8 w-8" />}
            title="AI-Powered Analysis"
            description="Get instant insights on your pitch deck with our advanced AI analysis"
          />
          <FeatureCard
            icon={<ChartBar className="h-8 w-8" />}
            title="Detailed Reports"
            description="Receive comprehensive reports with actionable feedback"
          />
          <FeatureCard
            icon={<Building className="h-8 w-8" />}
            title="Company Growth"
            description="Track your progress and identify areas for improvement"
          />
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title="Professional Network"
            description="Connect with experienced VCs and industry experts"
          />
          <FeatureCard
            icon={<Handshake className="h-8 w-8" />}
            title="Direct VC Access"
            description="Get your pitch deck in front of the right investors"
          />
          <FeatureCard
            icon={<ChartBar className="h-8 w-8" />}
            title="Market Insights"
            description="Understand your market position and competitive landscape"
          />
        </div>

        {/* Social Proof Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Trusted by Leading Startups</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">
                  "VCConnect helped us secure our Series A funding in record time. The AI insights were invaluable."
                </p>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">CEO, TechFlow</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">
                  "The platform streamlined our pitch deck review process and connected us with perfect investors."
                </p>
                <p className="font-semibold">Michael Rodriguez</p>
                <p className="text-sm text-muted-foreground">Founder, DataSphere</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">
                  "Game-changing platform for startups. The market insights helped us refine our strategy."
                </p>
                <p className="font-semibold">Emily Watson</p>
                <p className="text-sm text-muted-foreground">CTO, GreenTech Solutions</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Startup?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of successful startups who have found their perfect investors through our platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/auth">
                Start Now <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link to="/contact">
                Contact Sales <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
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