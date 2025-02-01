import HeroSection from "@/components/home/HeroSection";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Pitch Analysis"
            description="Get detailed analysis and feedback on your pitch deck from industry experts."
            icon={<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">📊</div>}
          />
          <FeatureCard
            title="Market Insights"
            description="Access comprehensive market data and competitor analysis."
            icon={<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">🔍</div>}
          />
          <FeatureCard
            title="Expert Network"
            description="Connect with experienced mentors and industry professionals."
            icon={<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">👥</div>}
          />
        </div>
      </div>
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Founders Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This platform helped us refine our pitch and connect with the right investors."
              author="Sarah Chen"
              role="CEO, TechStart"
              image="/placeholder.svg"
            />
            <TestimonialCard
              quote="The market insights were invaluable for our fundraising strategy."
              author="Michael Rodriguez"
              role="Founder, DataFlow"
              image="/placeholder.svg"
            />
            <TestimonialCard
              quote="We secured our seed round within weeks of using this platform."
              author="Lisa Thompson"
              role="CTO, GreenTech"
              image="/placeholder.svg"
            />
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
};

export default Index;