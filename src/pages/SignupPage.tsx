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
  domains: string[];
  position: string;
  company: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    year: "",
    domains: [],
    position: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.year || formData.domains.length === 0 || !formData.position || !formData.company) {
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

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain]
    }));
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

                <div className="space-y-4">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-primary" />
                    Technical Domains/Subjects (Select Multiple)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Java", "Python", "JavaScript", "C++", "Go", "Rust",
                      "Data Structures & Algorithms", "System Design", "Operating Systems",
                      "Database Management", "Computer Networks", "Distributed Systems",
                      "AI/Machine Learning", "Deep Learning", "Computer Vision",
                      "Web Development", "Frontend Development", "Backend Development",
                      "Mobile Development", "Android", "iOS", "React Native",
                      "DevOps", "Cloud Computing", "AWS", "Docker", "Kubernetes",
                      "Cybersecurity", "Blockchain", "Game Development"
                    ].map((domain) => (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleDomain(domain)}
                        className={`
                          p-3 text-sm rounded-lg border transition-all duration-200 text-left
                          ${formData.domains.includes(domain)
                            ? "bg-primary text-primary-foreground border-primary shadow-ai-glow"
                            : "bg-input/50 border-border/50 hover:border-primary hover:bg-accent/50"
                          }
                        `}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                  {formData.domains.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {formData.domains.join(", ")}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-base font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Technical Position Applied
                  </Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300">
                      <SelectValue placeholder="Select the position you're applying for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="senior-software-engineer">Senior Software Engineer</SelectItem>
                      <SelectItem value="backend-engineer">Backend Engineer</SelectItem>
                      <SelectItem value="frontend-engineer">Frontend Engineer</SelectItem>
                      <SelectItem value="fullstack-engineer">Full-Stack Engineer</SelectItem>
                      <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="data-engineer">Data Engineer</SelectItem>
                      <SelectItem value="ml-engineer">Machine Learning Engineer</SelectItem>
                      <SelectItem value="ai-engineer">AI Engineer</SelectItem>
                      <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="cloud-engineer">Cloud Engineer</SelectItem>
                      <SelectItem value="security-engineer">Security Engineer</SelectItem>
                      <SelectItem value="site-reliability-engineer">Site Reliability Engineer</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="technical-product-manager">Technical Product Manager</SelectItem>
                      <SelectItem value="engineering-manager">Engineering Manager</SelectItem>
                      <SelectItem value="solutions-architect">Solutions Architect</SelectItem>
                      <SelectItem value="backend-intern">Backend Intern</SelectItem>
                      <SelectItem value="frontend-intern">Frontend Intern</SelectItem>
                      <SelectItem value="fullstack-intern">Full-Stack Intern</SelectItem>
                      <SelectItem value="data-science-intern">Data Science Intern</SelectItem>
                      <SelectItem value="ml-intern">ML Intern</SelectItem>
                      <SelectItem value="swe-intern">Software Engineering Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Target Company
                  </Label>
                  <Select value={formData.company} onValueChange={(value) => handleInputChange("company", value)}>
                    <SelectTrigger className="bg-input/50 border-border/50 focus:border-primary focus:shadow-ai-glow transition-all duration-300">
                      <SelectValue placeholder="Select your target company" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* FAANG */}
                      <SelectItem value="meta">Meta (Facebook)</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="netflix">Netflix</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      
                      {/* Big Tech */}
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="tesla">Tesla</SelectItem>
                      <SelectItem value="uber">Uber</SelectItem>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="twitter">Twitter (X)</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="adobe">Adobe</SelectItem>
                      <SelectItem value="nvidia">NVIDIA</SelectItem>
                      <SelectItem value="intel">Intel</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                      <SelectItem value="ibm">IBM</SelectItem>
                      
                      {/* Consulting & Services */}
                      <SelectItem value="accenture">Accenture</SelectItem>
                      <SelectItem value="deloitte">Deloitte</SelectItem>
                      <SelectItem value="turing">Turing</SelectItem>
                      <SelectItem value="tcs">TCS</SelectItem>
                      <SelectItem value="infosys">Infosys</SelectItem>
                      <SelectItem value="wipro">Wipro</SelectItem>
                      <SelectItem value="cognizant">Cognizant</SelectItem>
                      <SelectItem value="capgemini">Capgemini</SelectItem>
                      
                      {/* Unicorns & Startups */}
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="databricks">Databricks</SelectItem>
                      <SelectItem value="snowflake">Snowflake</SelectItem>
                      <SelectItem value="palantir">Palantir</SelectItem>
                      <SelectItem value="atlassian">Atlassian</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="notion">Notion</SelectItem>
                      <SelectItem value="figma">Figma</SelectItem>
                      
                      {/* Indian Companies */}
                      <SelectItem value="flipkart">Flipkart</SelectItem>
                      <SelectItem value="zomato">Zomato</SelectItem>
                      <SelectItem value="swiggy">Swiggy</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="byju">BYJU'S</SelectItem>
                      <SelectItem value="ola">Ola</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="freshworks">Freshworks</SelectItem>
                      
                      <SelectItem value="other">Other</SelectItem>
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