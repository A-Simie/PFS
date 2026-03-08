import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-bg-panel border border-border rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
