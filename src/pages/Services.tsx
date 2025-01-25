import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PieChart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions to help startups succeed in their fundraising journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <FileText className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Pitch Deck Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get detailed feedback on your pitch deck from AI-powered analysis and industry experts.
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Comprehensive structure review</li>
                <li>• Market analysis validation</li>
                <li>• Financial projections assessment</li>
                <li>• Storytelling optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <PieChart className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Market Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access detailed market insights and competitor analysis to strengthen your pitch.
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Industry trends analysis</li>
                <li>• Competitor benchmarking</li>
                <li>• Market size assessment</li>
                <li>• Growth opportunity identification</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-4" />
              <CardTitle>VC Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with the right investors based on your industry, stage, and funding needs.
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Investor preference matching</li>
                <li>• Direct introductions</li>
                <li>• Investment history analysis</li>
                <li>• Portfolio fit assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Pitch Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Improve your pitch with AI-powered suggestions and expert guidance.
              </p>
              <ul className="space-y-2 mb-6">
                <li>• Presentation structure optimization</li>
                <li>• Key metrics highlighting</li>
                <li>• Value proposition refinement</li>
                <li>• Investor-specific customization</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link to="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;