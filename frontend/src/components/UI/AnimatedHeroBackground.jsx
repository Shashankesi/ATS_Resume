import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';

const AnimatedHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
};

const HeroFeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500" />
      
      <div className="relative z-10">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-orange-500/50 transition-all"
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export { AnimatedHeroBackground, HeroFeatureCard };
