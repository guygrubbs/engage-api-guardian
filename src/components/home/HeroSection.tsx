
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative text-center mb-20">
      {/* Background gradient shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[640px] h-[640px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -top-[30%] -right-[20%] w-[640px] h-[640px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="glass p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 leading-tight">
            Connect Startups with VCs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Submit pitch decks, generate AI-powered insights, and connect with the right investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300" 
              asChild
            >
              <Link to="/auth" className="inline-flex items-center">
                Get Started 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group glass border-purple-500/20 hover:border-purple-500/40 transition-all duration-300" 
              asChild
            >
              <Link to="/pricing" className="inline-flex items-center">
                View Pricing
                <ArrowUpRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
