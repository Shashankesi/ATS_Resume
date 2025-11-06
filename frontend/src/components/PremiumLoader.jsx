import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PremiumLoader = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated logo with glow */}
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-2xl opacity-60"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="text-center">
          <motion.h2
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SmartCareer AI
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        </div>

        {/* Animated loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumLoader;
