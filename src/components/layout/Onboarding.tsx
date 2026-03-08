import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  PlusCircle,
  Trophy
} from 'lucide-react';

const ONBOARDING_KEY = 'pfs_onboarding_completed';

interface OnboardingStep {
  title: string;
  description: string;
  icon: any;
  highlightId?: string;
}

const STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to Finance Pro',
    description: "Let's take a quick tour to show you how to track your wealth and master your budget. We've designed this dashboard to give you full control over your financial future.",
    icon: Compass,
  },
  {
    title: 'Your Financial Pulse',
    description: 'Get an instant view of your Income, Expenses, and overall Net Balance right here. These cards keep you updated on your daily standing.',
    icon: TrendingUp,
    highlightId: 'financial-summary-cards',
  },
  {
    title: 'Ready to Start?',
    description: 'Add your first transaction to see your spending insights come to life. Click this button whenever you spend or earn.',
    icon: PlusCircle,
    highlightId: 'add-transaction-btn',
  },
  {
    title: "You're All Set!",
    description: "You've successfully explored the dashboard. Now you're ready to take control of your financial future.",
    icon: Trophy,
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem(ONBOARDING_KEY);
    if (!isCompleted) {
      // Small delay to ensure layout is ready for highlighting
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={skipOnboarding}
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" 
      />

      {/* Confetti (Step 4 only) */}
      <AnimatePresence>
        {isLast && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: '-10%', 
                  left: `${Math.random() * 100}%`,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  top: '110%', 
                  rotate: 720,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className={`absolute w-3 h-3 rounded-sm ${
                  ['bg-primary', 'bg-accent-gold', 'bg-[#38BDF8]'][Math.floor(Math.random() * 3)]
                }`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <motion.div
        layout
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-lg bg-bg-panel border border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
            <div className="relative w-20 h-20 flex items-center justify-center bg-primary rounded-full shadow-lg shadow-primary/40">
              <step.icon size={40} className="text-white" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{step.title}</h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-sm">
            {step.description}
          </p>

          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span className="text-[10px] font-medium text-text-muted">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-1.5 w-full bg-bg-dark rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary" 
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={handleNext}
              className="group w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {isLast ? 'Get Started' : 'Continue'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            {!isLast && (
              <button 
                onClick={skipOnboarding}
                className="w-full h-12 text-sm text-text-muted hover:text-text-primary transition-colors font-medium"
              >
                Skip tour for now
              </button>
            )}
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={skipOnboarding}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Spotlight CSS helper - In a real app we'd use a portal or complex SVG mask */}
      <style>{`
        ${step.highlightId ? `
          #${step.highlightId} {
            position: relative;
            z-index: 101 !important;
            box-shadow: 0 0 0 8px rgba(15, 184, 116, 0.2), 0 0 0 16px rgba(15, 184, 116, 0.1) !important;
            transition: all 0.5s ease;
          }
        ` : ''}
      `}</style>
    </div>
  );
}
