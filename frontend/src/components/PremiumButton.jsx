import React from 'react';
import { motion } from 'framer-motion';

const PremiumButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold transition-all rounded-lg flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 shadow-lg hover:shadow-orange-500/50',
    secondary: 'bg-white/10 border-2 border-orange-500/70 text-white hover:bg-orange-500/20 hover:border-orange-400 shadow-lg hover:shadow-orange-500/30',
    danger: 'bg-red-500/20 border-2 border-red-500/70 text-red-300 hover:bg-red-500/30 hover:border-red-400',
    success: 'bg-green-500/20 border-2 border-green-500/70 text-green-300 hover:bg-green-500/30 hover:border-green-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default PremiumButton;
