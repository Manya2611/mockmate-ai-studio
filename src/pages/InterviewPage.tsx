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
  domain: string;
  position: string;
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
      const data = JSON.parse(storedData) as UserData;
      setUserData(data);
      
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        type: "ai",
        content: `Welcome, ${data.fullName}! I'm excited to conduct your mock interview for the ${data.position} position. I'll be asking you questions related to ${data.domain} based on your ${data.year} level experience. Let's start with: Tell me about yourself and why you're interested in this position.`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
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
    if (messages.length < 3) {
      toast({
        title: "Interview Too Short",
        description: "Please continue the interview for more comprehensive feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Prepare data for n8n webhook
    const interviewData = {
      userData,
      messages,
      completedAt: new Date().toISOString(),
      conversationLength: messages.length,
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
            <div className="text-center mb-6">
              <h1 className="text-3xl font-heading font-bold mb-2">
                Mock Interview for <span className="hero-text">{userData.position}</span>
              </h1>
              <p className="text-muted-foreground">
                Domain: {userData.domain} • Level: {userData.year}
              </p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-card/20 backdrop-blur-sm border border-border/30 rounded-3xl p-6 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] flex items-start gap-3
                          ${message.type === "user" ? "flex-row-reverse" : "flex-row"}
                        `}
                      >
                        <Avatar className="w-10 h-10 border-2 border-border/50">
                          {message.type === "ai" ? (
                            <>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="w-5 h-5" />
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarFallback className="bg-accent text-accent-foreground">
                                {userData.fullName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>

                        <div
                          className={`
                            p-4 rounded-2xl max-w-md
                            ${message.type === "ai" 
                              ? "chat-ai" 
                              : "chat-user"
                            }
                          `}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-xs opacity-70 mt-2 block">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-border/50">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="chat-ai p-4 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your answer here..."
                      className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    onClick={toggleListening}
                    variant="outline"
                    size="icon"
                    className={`
                      transition-all duration-300
                      ${isListening 
                        ? "bg-destructive text-destructive-foreground shadow-ai-glow" 
                        : "bg-card/50 hover:bg-primary hover:text-primary-foreground"
                      }
                    `}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    className="bg-primary hover:bg-primary/90 shadow-ai-glow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex justify-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubmitInterview}
                      disabled={isLoading}
                      size="lg"
                      className="bg-ai-gradient hover:shadow-ai-glow-strong px-8 py-6 rounded-full font-semibold transition-all duration-300"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      {isLoading ? "Analyzing..." : "Submit & Get Feedback"}
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