import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlowCard Component
 * Reusable card with glassmorphism, glow effects, and hover animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.glowColor - Glow color (blue|purple|pink|emerald|orange|indigo)
 * @param {boolean} props.interactive - Enable hover animations (default: true)
 * @param {Function} props.onClick - Click handler
 * @param {Object} props.variants - Framer Motion variants
 */
const GlowCard = ({
  children,
  className = '',
  glowColor = 'blue',
  interactive = true,
  onClick,
  variants,
  ...props
}) => {
  const glowColorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    emerald: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-orange-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const shadowColorMap = {
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    emerald: 'rgba(16, 185, 129, 0.3)',
    orange: 'rgba(249, 115, 22, 0.3)',
    indigo: 'rgba(99, 102, 241, 0.3)',
  };

  const glowClass = glowColorMap[glowColor] || glowColorMap.blue;
  const shadowColor = shadowColorMap[glowColor] || shadowColorMap.blue;

  return (
    <motion.div
      variants={variants}
      whileHover={interactive ? { y: -8 } : undefined}
      onClick={onClick}
      className={`group relative overflow-hidden glass-card p-6 transition-all duration-300 ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={
        interactive
          ? {
              '--shadow-color': shadowColor,
            }
          : {}
      }
      {...props}
    >
      {/* Animated gradient background on hover */}
      {interactive && (
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${glowClass} transition-opacity duration-300`}
        />
      )}

      {/* Glow border effect */}
      {interactive && (
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${glowClass} opacity-0 group-hover:opacity-30 pointer-events-none`}
          whileHover={{ opacity: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
