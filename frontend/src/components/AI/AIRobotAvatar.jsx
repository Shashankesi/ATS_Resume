import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain } from 'lucide-react';

const AIRobotAvatar = ({ size = 'lg', isThinking = false, isTyping = false }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="relative">
      {/* Animated Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-clip-border opacity-50`}
      />

      {/* Main Avatar */}
      <motion.div
        animate={isThinking ? { scale: [1, 1.1, 1] } : isTyping ? { opacity: [1, 0.7, 1] } : { y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`${sizeClasses[size]} relative rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg overflow-hidden`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full" />

        {/* Inner Icon Container */}
        <motion.div
          animate={isThinking ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          className="relative z-10 flex items-center justify-center"
        >
          {isThinking ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Brain className={`${iconSizes[size]} text-white`} />
            </motion.div>
          ) : isTyping ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <Zap className={`${iconSizes[size]} text-white`} />
            </motion.div>
          ) : (
            <Sparkles className={`${iconSizes[size]} text-white`} />
          )}
        </motion.div>

        {/* Particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              x: Math.cos((i / 3) * Math.PI * 2) * 40,
              y: Math.sin((i / 3) * Math.PI * 2) * 40,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AIRobotAvatar;
