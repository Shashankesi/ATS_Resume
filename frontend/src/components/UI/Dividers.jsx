import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wave divider with animated gradient
 */
const WaveDivider = ({ height = 100, color = 'from-orange-500 to-pink-500' }) => (
  <div className="w-full overflow-hidden">
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full"
      height={height}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
        fill="url(#gradient)"
        animate={{
          d: [
            'M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z',
            'M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z',
            'M0,40 Q300,-10 600,40 T1200,40 L1200,120 L0,120 Z',
            'M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

/**
 * Animated gradient border
 */
const GradientBorder = ({ position = 'top' }) => {
  const positionClass = {
    top: 'top-0 h-1',
    bottom: 'bottom-0 h-1',
    left: 'left-0 w-1',
    right: 'right-0 w-1',
  };

  return (
    <motion.div
      className={`absolute ${positionClass[position]} bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0`}
      animate={{
        opacity: [0.3, 1, 0.3],
        boxShadow: [
          '0 0 10px rgba(249, 115, 22, 0)',
          '0 0 30px rgba(249, 115, 22, 0.5)',
          '0 0 10px rgba(249, 115, 22, 0)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
};

/**
 * Premium section divider
 */
const SectionDivider = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/4 w-1 h-32 bg-gradient-to-b from-orange-500/0 via-orange-500/30 to-orange-500/0"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-1/4 w-1 h-32 bg-gradient-to-b from-pink-500/0 via-pink-500/30 to-pink-500/0"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
    </div>
    <motion.div
      className="text-center space-y-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex gap-2 justify-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
            style={{
              animation: `pulse ${1.5 + i * 0.1}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  </div>
);

export { WaveDivider, GradientBorder, SectionDivider };
