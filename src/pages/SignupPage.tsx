import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, Mail, GraduationCap, Laptop, Briefcase } from "lucide-react";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ProgressTracker from "@/components/ProgressTracker";

interface FormData {
  fullName: string;
  email: string;
  year: string;
  domain: string;
  position: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    year: "",
    domain: "",
    position: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.year || !formData.domain || !formData.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Store data in localStorage for the interview page
    localStorage.setItem("userFormData", JSON.stringify(formData));
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      navigate("/interview");
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10">
        <ProgressTracker currentStep={1} />
        
        <div className="container mx-auto px-6 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4 hover:bg-secondary/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Let's Get to Know <span className="hero-text">You</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Help us personalize your interview experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-8 ai-glow"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-base font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Academic Year
                  </Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300">
                      <SelectValue placeholder="Select your current year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-base font-medium flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-primary" />
                    Domain/Subject
                  </Label>
                  <Select value={formData.domain} onValueChange={(value) => handleInputChange("domain", value)}>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300">
                      <SelectValue placeholder="Select your domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                      <SelectItem value="os">Operating Systems</SelectItem>
                      <SelectItem value="dbms">Database Management</SelectItem>
                      <SelectItem value="aiml">AI/ML</SelectItem>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-base font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Position Applied
                  </Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300">
                      <SelectValue placeholder="Select the position you're applying for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="backend-intern">Backend Intern</SelectItem>
                      <SelectItem value="frontend-intern">Frontend Intern</SelectItem>
                      <SelectItem value="fullstack-intern">Full-Stack Intern</SelectItem>
                      <SelectItem value="data-analyst">Data Analyst</SelectItem>
                      <SelectItem value="ml-engineer">ML Engineer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-ai-gradient hover:shadow-ai-glow-strong text-lg py-6 rounded-full font-semibold transition-all duration-300"
                  >
                    {loading ? "Setting up your interview..." : "Start Interview"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;