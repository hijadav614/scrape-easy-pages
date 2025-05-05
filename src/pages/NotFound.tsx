
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-xl px-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">404</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
