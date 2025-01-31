import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="border-b">
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
              className="text-sm font-medium hover:text-primary"
            >
              Submit Information
            </Link>
            <Link to="/auth" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
