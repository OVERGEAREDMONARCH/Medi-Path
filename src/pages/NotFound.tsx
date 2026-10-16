import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Sorry, we couldn't find that page.</p>
        <Button asChild><Link to="/">Return to Home</Link></Button>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/features" className="text-primary hover:underline">Features</Link>
          <Link to="/contact" className="text-primary hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
