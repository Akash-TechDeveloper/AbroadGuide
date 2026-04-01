import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, hover = false, onClick }: GlassCardProps) => (
  <motion.div
    whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    onClick={onClick}
    className={cn(
      'glass rounded-xl p-6 transition-shadow duration-300',
      hover && 'cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30',
      onClick && 'cursor-pointer',
      className
    )}
  >
    {children}
  </motion.div>
);
