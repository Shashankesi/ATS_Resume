import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Gradient Text Component
 * Features: animated color gradients, text shadow effects, responsive sizing
 */
export const GradientText = ({ 
  children, 
  className = '',
  colors = ['#f97316', '#f87171', '#ec4899'], // Orange to pink
  animationDuration = 4,
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        backgroundImage: `linear-gradient(270deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.span>
  );
};

/**
 * Animated Word Component
 * Each letter animates individually
 */
export const AnimatedWords = ({ 
  text, 
  className = '',
  staggerDelay = 0.05,
}) => {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: i * 0.04 },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

/**
 * Shimmer Effect Component
 * Animated shimmer overlay for loading states
 */
export const ShimmerEffect = ({ 
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.1)',
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
      }}
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

/**
 * Pulse Effect Component
 * Animated pulse with customizable colors
 */
export const PulseEffect = ({ 
  className = '',
  color = 'from-orange-400 to-pink-500',
}) => {
  return (
    <motion.div
      className={`absolute inset-0 rounded-full ${className}`}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-r ${color}`} />
    </motion.div>
  );
};

/**
 * Floating Button Component
 * Button that floats with animation
 */
export const FloatingButton = ({ 
  children,
  onClick,
  className = '',
  floatDuration = 3,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

/**
 * Flip Card Component
 * 3D flip animation on hover
 */
export const FlipCard = ({ 
  front,
  back,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
      >
        {/* Front */}
        <motion.div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default {
  GradientText,
  AnimatedWords,
  ShimmerEffect,
  PulseEffect,
  FloatingButton,
  FlipCard,
};
