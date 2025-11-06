import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Input Component
 */
export const PremiumInput = ({
  label,
  placeholder,
  icon: Icon,
  error,
  success,
  type = 'text',
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    {label && <label className="block text-sm font-semibold text-gray-200">{label}</label>}
    <div className="relative group">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-orange-400 group-focus-within:text-orange-300 transition-colors" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full ${Icon ? 'pl-12' : 'px-4'} py-3 
          bg-white/5 dark:bg-slate-700/50 
          border-2 border-white/20 dark:border-slate-600/50
          rounded-lg text-white placeholder-gray-400 
          focus:ring-2 focus:ring-orange-400 focus:border-transparent 
          transition-all outline-none
          ${error ? 'border-red-500/50 focus:ring-red-400' : ''}
          ${success ? 'border-green-500/50 focus:ring-green-400' : ''}
          hover:border-white/30 dark:hover:border-slate-500/50
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
      {success && <span className="text-xs text-green-400 mt-1">{success}</span>}
    </div>
  </motion.div>
);

/**
 * Premium Textarea Component
 */
export const PremiumTextarea = ({
  label,
  placeholder,
  rows = 4,
  error,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    {label && <label className="block text-sm font-semibold text-gray-200">{label}</label>}
    <textarea
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-4 py-3
        bg-white/5 dark:bg-slate-700/50
        border-2 border-white/20 dark:border-slate-600/50
        rounded-lg text-white placeholder-gray-400
        focus:ring-2 focus:ring-orange-400 focus:border-transparent
        transition-all outline-none
        ${error ? 'border-red-500/50 focus:ring-red-400' : ''}
        hover:border-white/30 dark:hover:border-slate-500/50
        resize-none
      `}
      {...props}
    />
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </motion.div>
);

/**
 * Premium Select Component
 */
export const PremiumSelect = ({
  label,
  options = [],
  error,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    {label && <label className="block text-sm font-semibold text-gray-200">{label}</label>}
    <select
      className={`
        w-full px-4 py-3
        bg-white/5 dark:bg-slate-700/50
        border-2 border-white/20 dark:border-slate-600/50
        rounded-lg text-white
        focus:ring-2 focus:ring-orange-400 focus:border-transparent
        transition-all outline-none
        ${error ? 'border-red-500/50 focus:ring-red-400' : ''}
        hover:border-white/30 dark:hover:border-slate-500/50
        appearance-none cursor-pointer
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ff8c00' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        paddingRight: '2.5rem',
      }}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
  </motion.div>
);

/**
 * Premium Badge
 */
export const PremiumBadge = ({
  children,
  variant = 'primary',
  size = 'md',
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500/20 to-orange-500/10 border border-orange-500/50 text-orange-300',
    secondary: 'bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/50 text-pink-300',
    success: 'bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/50 text-green-300',
    warning: 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/50 text-yellow-300',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs font-semibold rounded',
    md: 'px-4 py-1.5 text-sm font-semibold rounded-lg',
    lg: 'px-5 py-2 text-base font-bold rounded-lg',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-block ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </motion.span>
  );
};

/**
 * Premium Card
 */
export const PremiumCard = ({
  children,
  className = '',
  hover = true,
  glowEffect = true,
}) => (
  <motion.div
    whileHover={hover ? { y: -4 } : undefined}
    className={`
      bg-gradient-to-br from-slate-800/60 to-slate-900/60
      border border-slate-700/50
      rounded-2xl p-6
      transition-all duration-300
      ${hover ? 'hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20' : ''}
      ${glowEffect ? 'hover:bg-slate-800/80' : ''}
      ${className}
    `}
  >
    {children}
  </motion.div>
);
