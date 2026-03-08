import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  id?: string;
}

export function EmptyState({ title, description, actionLabel, onAction, id }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-primary">
          <rect x="16" y="20" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M24 20V16C24 12.6863 26.6863 10 30 10H34C37.3137 10 40 12.6863 40 16V20" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="34" r="4" stroke="currentColor" strokeWidth="2" />
          <line x1="32" y1="38" x2="32" y2="42" stroke="currentColor" strokeWidth="2" />
          <circle cx="44" cy="20" r="6" fill="#0fb874" />
          <path d="M42 20H46M44 18V22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary max-w-md mb-8 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          id={id}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full transition-colors"
        >
          <Plus size={18} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
