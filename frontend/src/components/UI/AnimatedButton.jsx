import React from 'react';
import { motion } from 'framer-motion';

// Animated button with multiple styles
const AnimatedButton = ({
  children,
  variant = 'primary', // primary, secondary, glow, neon
  size = 'md', // sm, md, lg
  onClick,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const variants = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const styles = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg shadow-lg',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-lg',
    glow: 'btn-glow bg-blue-600 text-white',
    neon: 'btn-glow-neon bg-emerald-600 text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[size]
      } ${styles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};

export default React.memo(AnimatedButton);
