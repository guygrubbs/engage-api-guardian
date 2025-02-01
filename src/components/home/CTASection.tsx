import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;