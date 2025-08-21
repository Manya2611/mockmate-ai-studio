import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Sparkles, Target, Users } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-heading font-bold">MockMate AI</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/signup")}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
                Crack your next{" "}
                <span className="hero-text">interview with AI</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Personalized mock interviews, instant feedback, and detailed reports — all free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-ai-gradient hover:shadow-ai-glow-strong text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 ai-glow">
                <Sparkles className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-heading font-semibold mb-2">AI-Powered Questions</h3>
                <p className="text-muted-foreground">Smart questions tailored to your domain and experience level</p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 ai-glow">
                <Target className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-heading font-semibold mb-2">Instant Feedback</h3>
                <p className="text-muted-foreground">Real-time analysis of your answers with improvement suggestions</p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 ai-glow">
                <Users className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-heading font-semibold mb-2">Detailed Reports</h3>
                <p className="text-muted-foreground">Comprehensive analysis sent directly to your email</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;