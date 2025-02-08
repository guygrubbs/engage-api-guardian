
import { Link } from "react-router-dom";
import { ClipboardList, Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              VCConnect
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
            )}
            <Link
              to="/submission-checklist"
              className="text-sm font-medium hover:text-primary inline-flex items-center"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Submit Company Info
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary inline-flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Contact Sales
            </Link>
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" className="text-sm font-medium hover:text-primary">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden py-4 space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {isAuthenticated && (
            <Link to="/dashboard" className="block text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          )}
          <Link
            to="/submission-checklist"
            className="block text-sm font-medium hover:text-primary"
          >
            <div className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              Submit Company Info
            </div>
          </Link>
          <Link to="/pricing" className="block text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link to="/contact" className="block text-sm font-medium hover:text-primary">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Contact Sales
            </div>
          </Link>
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleSignOut} className="w-full">
              Sign Out
            </Button>
          ) : (
            <Link to="/auth" className="block text-sm font-medium hover:text-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
