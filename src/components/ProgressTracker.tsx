import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Details" },
  { id: 2, name: "Interview" },
  { id: 3, name: "Feedback" },
  { id: 4, name: "Complete" },
];

const ProgressTracker = ({ currentStep }: ProgressTrackerProps) => {
  return (
    <div className="w-full py-6 bg-card/20 backdrop-blur-sm border-b border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${isCompleted ? 'step-completed border-accent' : ''}
                      ${isActive ? 'step-active border-primary shadow-ai-glow' : ''}
                      ${isUpcoming ? 'step-inactive border-border/50' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  
                  <span
                    className={`
                      ml-3 text-sm font-medium transition-colors duration-300
                      ${isCompleted ? 'text-accent' : ''}
                      ${isActive ? 'text-primary' : ''}
                      ${isUpcoming ? 'text-muted-foreground' : ''}
                    `}
                  >
                    {step.name}
                  </span>
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    className={`
                      w-16 h-0.5 mx-4 transition-colors duration-300
                      ${step.id < currentStep ? 'bg-accent' : 'bg-border/30'}
                    `}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;