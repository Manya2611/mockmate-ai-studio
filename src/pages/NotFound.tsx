import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg mx-auto px-6">
          <h1 className="text-8xl font-heading font-bold mb-4 hero-text">404</h1>
          <h2 className="text-3xl font-heading font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for seems to have vanished into the digital void.
          </p>
          <Button 
            onClick={() => window.location.href = "/"}
            size="lg"
            className="bg-ai-gradient hover:shadow-ai-glow-strong text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
