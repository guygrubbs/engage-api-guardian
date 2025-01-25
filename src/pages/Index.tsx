import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Building, Briefcase, Handshake, ChartBar, Rocket, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-tight">
              Connect Startups with VCs
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Submit pitch decks, generate AI-powered insights, and connect with the right investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 transition-all duration-300" asChild>
                <Link to="/auth" className="inline-flex items-center">
                  Get Started 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group transition-all duration-300" asChild>
                <Link to="/pricing" className="inline-flex items-center">
                  View Pricing
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid with Hover Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

        {/* Testimonials Section with Carousel for Mobile */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Trusted by Leading Startups</h2>
          {isMobile ? (
            <div className="will-change-transform">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  <CarouselItem>
                    <TestimonialCard
                      quote="VCConnect helped us secure our Series A funding in record time. The AI insights were invaluable."
                      author="Sarah Chen"
                      role="CEO, TechFlow"
                      image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <TestimonialCard
                      quote="The platform streamlined our pitch deck review process and connected us with perfect investors."
                      author="Michael Rodriguez"
                      role="Founder, DataSphere"
                      image="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <TestimonialCard
                      quote="Game-changing platform for startups. The market insights helped us refine our strategy."
                      author="Emily Watson"
                      role="CTO, GreenTech Solutions"
                      image="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="VCConnect helped us secure our Series A funding in record time. The AI insights were invaluable."
                author="Sarah Chen"
                role="CEO, TechFlow"
                image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              />
              <TestimonialCard
                quote="The platform streamlined our pitch deck review process and connected us with perfect investors."
                author="Michael Rodriguez"
                role="Founder, DataSphere"
                image="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              />
              <TestimonialCard
                quote="Game-changing platform for startups. The market insights helped us refine our strategy."
                author="Emily Watson"
                role="CTO, GreenTech Solutions"
                image="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
              />
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="will-change-transform">
          <div className="text-center bg-primary/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Startup?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of successful startups who have found their perfect investors through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 transition-all duration-300" asChild>
                <Link to="/auth" className="inline-flex items-center">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group transition-all duration-300" asChild>
                <Link to="/contact" className="inline-flex items-center">
                  Contact Sales
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10 hover:-translate-y-1">
    <CardHeader>
      <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{title}</CardTitle>
      <p className="text-muted-foreground">{description}</p>
    </CardHeader>
  </Card>
);

const TestimonialCard = ({ quote, author, role, image }: { quote: string; author: string; role: string; image: string }) => (
  <Card className="hover:shadow-lg transition-all duration-300 h-full">
    <CardContent className="pt-6 flex flex-col h-full">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
        <img src={image} alt={author} className="w-full h-full object-cover" />
      </div>
      <p className="italic text-muted-foreground mb-4 flex-grow">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default Index;
