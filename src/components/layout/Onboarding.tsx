import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Compass, 
  ArrowRight, 
  ArrowLeft,
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
  placement?: 'bottom' | 'top' | 'left' | 'right' | 'center';
}

const STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to Personal Finance Snapshot',
    description: "Let's take a quick tour to show you how to track your wealth and master your budget. We've designed this dashboard to give you full control over your financial future.",
    icon: Compass,
    placement: 'center',
  },
  {
    title: 'Your Financial Pulse',
    description: 'Get an instant view of your Income, Expenses, and Net Balance here. These cards keep you updated on your daily standing.',
    icon: TrendingUp,
    highlightId: 'financial-summary-cards',
    placement: 'bottom',
  },
  {
    title: 'Ready to Start?',
    description: 'Add your first transaction to see your spending insights come to life. Click this button whenever you spend or earn.',
    icon: PlusCircle,
    highlightId: 'add-transaction-btn',
    placement: 'left',
  },
  {
    title: "You're All Set!",
    description: "You've successfully explored the dashboard. Now you're ready to take control of your financial future.",
    icon: Trophy,
    placement: 'center',
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCompleted = localStorage.getItem(ONBOARDING_KEY);
    if (!isCompleted) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useLayoutEffect(() => {
    if (!isVisible) return;

    const step = STEPS[currentStep];
    if (!step.highlightId || step.placement === 'center') {
      setPopoverPos({ top: 0, left: 0, opacity: 1 }); // Center mode
      return;
    }

    const updatePosition = () => {
      const target = document.getElementById(step.highlightId!);
      if (!target) {
        setPopoverPos({ top: 0, left: 0, opacity: 1 }); // Fallback to center
        return;
      }

      const rect = target.getBoundingClientRect();
      const padding = 16;
      const isMobile = window.innerWidth < 768;
      let top = 0;
      let left = 0;

      if (isMobile) {
        // Dock to bottom on mobile
        setPopoverPos({ top: window.innerHeight - 20, left: window.innerWidth / 2, opacity: 1 });
        return;
      }

      // Desktop positioning with arrow support
      if (step.placement === 'bottom') {
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2;
      } else if (step.placement === 'top') {
        top = rect.top - padding;
        left = rect.left + rect.width / 2;
      } else if (step.placement === 'left') {
        top = rect.top + rect.height / 2;
        left = rect.left - padding;
      } else if (step.placement === 'right') {
        top = rect.top + rect.height / 2;
        left = rect.right + padding;
      }

      setPopoverPos({ top, left, opacity: 1 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isVisible, currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
  const isFirst = currentStep === 0;
  const isPopover = step.highlightId && step.placement !== 'center';
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto" 
      />

      {/* Confetti (Step 4 only) */}
      <AnimatePresence>
        {isLast && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ top: '-10%', left: `${Math.random() * 100}%`, rotate: 0, opacity: 1 }}
                animate={{ top: '110%', rotate: 720, opacity: 0 }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className={`absolute w-3 h-3 rounded-sm ${['bg-primary', 'bg-accent-gold', 'bg-blue-400'][Math.floor(Math.random() * 3)]}`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Onboarding Card container */}
      <div 
        className={`absolute transition-all duration-500 ease-out flex items-center justify-center w-full h-full pointer-events-none ${
          isPopover ? '' : 'inset-0'
        }`}
        style={isPopover ? {
          top: popoverPos.top,
          left: popoverPos.left,
          transform: isMobile 
            ? 'translate(-50%, -100%)' 
            : `translate(-50%, ${step.placement === 'top' ? '-100%' : step.placement === 'bottom' ? '0' : '-50%'})`,
          width: isMobile ? 'calc(100% - 32px)' : 'auto',
          height: 'auto',
          opacity: popoverPos.opacity,
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 20px)' : '0',
        } : {}}
      >
        <motion.div
          ref={cardRef}
          layout
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className={`relative pointer-events-auto bg-bg-panel border border-primary/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ${
            isPopover ? 'w-full md:w-[350px]' : 'w-full max-w-lg'
          }`}
        >
          {/* Arrow for Popover (Desktop only) */}
          {isPopover && !isMobile && (
            <div 
              className={`absolute w-4 h-4 bg-bg-panel border-t border-l border-primary/30 rotate-45 z-[-1] transition-all duration-500 ${
                step.placement === 'bottom' ? '-top-2 left-1/2 -translate-x-1/2 border-t border-l' :
                step.placement === 'top' ? '-bottom-2 left-1/2 -translate-x-1/2 border-b border-r' :
                step.placement === 'left' ? 'top-1/2 -right-2 -translate-y-1/2 border-t border-r' :
                'top-1/2 -left-2 -translate-y-1/2 border-b border-l'
              }`}
            />
          )}

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className={`${isPopover ? 'p-6' : 'p-8 md:p-12'} flex flex-col items-center text-center`}>
            {/* Icon */}
            <div className={`${isPopover ? 'mb-4' : 'mb-8'} relative`}>
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
              <div className={`relative ${isPopover ? 'w-12 h-12' : 'w-20 h-20'} flex items-center justify-center bg-primary rounded-full shadow-lg shadow-primary/40`}>
                <step.icon size={isPopover ? 24 : 40} className="text-white" />
              </div>
            </div>

            <h1 className={`${isPopover ? 'text-lg' : 'text-2xl md:text-3xl'} font-bold mb-3 tracking-tight`}>{step.title}</h1>
            <p className={`${isPopover ? 'text-sm' : 'text-lg'} text-text-secondary leading-relaxed mb-6`}>
              {step.description}
            </p>

            {/* Progress Bar */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
                <span className="text-[10px] font-medium text-text-muted">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 w-full bg-bg-dark rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              {!isFirst && (
                <button 
                  onClick={handleBack}
                  className="flex-1 h-11 bg-bg-dark hover:bg-bg-dark/80 text-text-primary text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-border"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              <button 
                onClick={handleNext}
                className="flex-[2] h-11 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                {isLast ? 'Finish Tour' : 'Next'}
                {!isLast && <ArrowRight size={16} />}
              </button>
            </div>
            
            {!isPopover && !isLast && (
              <button onClick={skipOnboarding} className="mt-4 text-xs text-text-muted hover:text-text-primary transition-colors">
                Skip tour for now
              </button>
            )}
          </div>

          {/* Close button */}
          <button onClick={skipOnboarding} className="absolute top-3 right-3 p-1.5 text-text-muted hover:text-text-primary transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      </div>

      {/* Spotlight Effect helper */}
      <style>{`
        ${step.highlightId ? `
          #${step.highlightId} {
            position: relative;
            z-index: 101 !important;
            box-shadow: 0 0 0 4px rgba(15, 184, 116, 0.3), 0 0 0 12px rgba(15, 184, 116, 0.1) !important;
            transition: all 0.5s ease;
            pointer-events: none;
          }
        ` : ''}
      `}</style>
    </div>
  );
}
