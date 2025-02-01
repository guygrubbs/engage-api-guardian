import { Rocket, ChartBar, Building, Briefcase, Handshake } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroSection from "@/components/home/HeroSection";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <HeroSection />

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

        <CTASection />
      </div>
    </div>
  );
};

export default Index;