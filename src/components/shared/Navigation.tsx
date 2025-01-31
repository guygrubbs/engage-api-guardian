import { Link } from "react-router-dom";
import { ClipboardList, Phone } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              VCConnect
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/submission-checklist"
              className="text-sm font-medium hover:text-primary inline-flex items-center"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Submit Information
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary inline-flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Contact Sales
            </Link>
            <Link to="/auth" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;