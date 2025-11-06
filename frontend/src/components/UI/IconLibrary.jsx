import React from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Icon Components with animations and styling
 * Provides consistent icon usage across the app
 */

export const AnimatedSparkles = ({ size = 24, className = '' }) => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity }}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M12 2v6m0 4v6M4.22 4.22l4.24 4.24m1.08 1.08l4.24 4.24M2 12h6m4 0h6m-15.78 7.78l4.24-4.24m1.08-1.08l4.24-4.24" />
  </motion.svg>
);

export const PulsingDot = ({ size = 8, className = '' }) => (
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

export const LoadingSpinner = ({ size = 24, className = '' }) => (
  <motion.svg
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path
      d="M12 2a10 10 0 0110 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </motion.svg>
);

export const GlowingBadge = ({ icon: Icon, text, color = 'from-orange-500 to-pink-500' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} bg-opacity-20 border border-current rounded-full`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-semibold">{text}</span>
  </motion.div>
);

export const EnhancedFeatureIcon = ({ Icon, gradient = 'from-orange-500 to-pink-500' }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="relative"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity`}></div>
    <div className="relative w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-white/20">
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);

export const StatBadge = ({ icon: Icon, label, value, color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-500/20 to-blue-500/10',
    orange: 'from-orange-500/20 to-orange-500/10',
    green: 'from-green-500/20 to-green-500/10',
    purple: 'from-purple-500/20 to-purple-500/10',
  };

  const iconColorMap = {
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-colors`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2">{label}</p>
          <p className={`text-4xl font-bold ${iconColorMap[color]}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-500/20 rounded-xl flex items-center justify-center`}>
          {Icon && <Icon size={24} className={iconColorMap[color]} />}
        </div>
      </div>
    </div>
  );
};
