import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Inclined Plane's homepage."
        path={location.pathname}
        noIndex
      />
      <section className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Error 404</p>
          <h1 className="text-5xl sm:text-7xl font-bold text-foreground mb-4">
            Page Not <span className="text-gradient-orange">Found</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-orange"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
