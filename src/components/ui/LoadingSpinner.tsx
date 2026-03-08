import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        className="w-10 h-10 border-3 border-border border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
