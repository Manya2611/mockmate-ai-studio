import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Mail, Star } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ProgressTracker from "@/components/ProgressTracker";

interface UserData {
  fullName: string;
  email: string;
  year: string;
  domain: string;
  position: string;
}

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userFormData");
    const interviewCompleted = localStorage.getItem("interviewCompleted");
    
    if (!interviewCompleted) {
      // Redirect if interview wasn't completed
      navigate("/");
      return;
    }
    
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, [navigate]);

  const handleBackToHome = () => {
    // Clear stored data
    localStorage.removeItem("userFormData");
    localStorage.removeItem("interviewCompleted");
    navigate("/");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10">
        <ProgressTracker currentStep={4} />
        
        <div className="container mx-auto px-6 pt-16 pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-accent/20 border-2 border-accent rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-accent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Thank You, <span className="hero-text">{userData.fullName}</span>!
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your personalized feedback report for the <strong>{userData.position}</strong> position 
                will be sent to <strong>{userData.email}</strong> within the next few minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 mb-12 ai-glow"
            >
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center justify-center gap-3">
                <Star className="h-6 w-6 text-accent" />
                What's Coming Next
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Detailed Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive breakdown of your interview performance across all key areas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Improvement Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalized suggestions to enhance your interview skills for {userData.domain}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Practice Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Curated resources and questions for your next interview preparation
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>Check your inbox in a few minutes</span>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleBackToHome}
                  size="lg"
                  className="bg-ai-gradient hover:shadow-ai-glow-strong text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </motion.div>

              <p className="text-sm text-muted-foreground">
                Want to practice more? Come back anytime for another mock interview!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;