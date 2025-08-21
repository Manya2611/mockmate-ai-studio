import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, Mic, MicOff, FileText } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ProgressTracker from "@/components/ProgressTracker";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface UserData {
  fullName: string;
  email: string;
  year: string;
  domains: string[];
  position: string;
  company: string;
}

const InterviewPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      const raw = JSON.parse(storedData) as any;
      const normalized: UserData = {
        fullName: raw.fullName ?? "",
        email: raw.email ?? "",
        year: raw.year ?? "",
        domains: Array.isArray(raw.domains)
          ? raw.domains
          : (raw.domain ? [raw.domain] : []),
        position: raw.position ?? "",
        company: raw.company ?? "",
      };
      setUserData(normalized);
      
      // Data loaded successfully
    } else {
      // Redirect to signup if no data
      navigate("/signup");
    }
  }, [navigate]);

  const addMessage = (content: string, type: "ai" | "user") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage("");
    addMessage(userMessage, "user");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great answer! Can you tell me about a challenging project you've worked on?",
        "Interesting perspective! How do you handle debugging complex issues in your code?",
        "Good point! What's your experience with version control systems like Git?",
        "I see. Can you explain the difference between SQL and NoSQL databases?",
        "Excellent! How would you optimize a slow-running query?",
        "Thank you for sharing that. Let's wrap up - do you have any questions for me?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage(randomResponse, "ai");
      setIsLoading(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition
    toast({
      title: isListening ? "Stopped Listening" : "Started Listening",
      description: isListening ? "Voice input disabled" : "Speak your answer now",
    });
  };

  const handleSubmitInterview = async () => {
    setIsLoading(true);

    // Prepare data for n8n webhook
    const interviewData = {
      userData,
      completedAt: new Date().toISOString(),
    };

    try {
      // Here you would send to your n8n webhook
      console.log("Sending interview data:", interviewData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store completion data
      localStorage.setItem("interviewCompleted", "true");
      
      toast({
        title: "Interview Submitted!",
        description: "Your responses have been analyzed. Redirecting to results...",
      });

      setTimeout(() => {
        navigate("/thank-you");
      }, 1500);

    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10 flex flex-col h-screen">
        <ProgressTracker currentStep={2} />
        
        <div className="flex-1 container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto h-full flex flex-col"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">
                Mock Interview for <span className="hero-text">{userData.position}</span>
              </h1>
              <p className="text-muted-foreground mb-2">
                Company: {userData.company} • Level: {userData.year}
              </p>
              <p className="text-sm text-muted-foreground">
                Domains: {Array.isArray(userData.domains) && userData.domains.length > 0 ? userData.domains.join(", ") : "Not specified"}
              </p>
            </div>

            {/* Interview Area - Ready for ElevenLabs Integration */}
            <div className="flex-1 bg-card/20 backdrop-blur-sm border border-border/30 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[500px]">
              <div className="text-center space-y-6 max-w-md">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-3">
                    AI Interview Assistant Ready
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your personalized interview experience is being prepared based on your profile. 
                    The AI assistant will be integrated here soon.
                  </p>
                </div>

                <div className="pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubmitInterview}
                      disabled={isLoading}
                      size="lg"
                      className="bg-ai-gradient hover:shadow-ai-glow-strong px-8 py-6 rounded-full font-semibold transition-all duration-300"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      {isLoading ? "Processing..." : "Complete Interview & Get Feedback"}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;