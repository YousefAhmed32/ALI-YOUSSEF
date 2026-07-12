import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

export function RouteTransition({ children }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(4% 4% 4% 4%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
