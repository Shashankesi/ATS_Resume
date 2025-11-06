import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, TrendingUp } from 'lucide-react';

const PremiumLoader = ({ text = 'Loading SmartCareer AI...' }) => {
  const floatingIcons = [
    { Icon: Zap, delay: 0, color: 'text-yellow-400' },
    { Icon: Brain, delay: 0.3, color: 'text-purple-400' },
    { Icon: TrendingUp, delay: 0.6, color: 'text-green-400' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 flex items-center justify-center z-50 backdrop-blur-md overflow-hidden">
      {/* Animated background - multiple layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-orange-500/0 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/30 to-pink-500/0 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-blue-500/0 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Particle-like elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Premium logo container */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderImage: 'linear-gradient(135deg, #ff9500, #ec4899) 1',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner glowing container */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-2xl opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Main logo */}
          <motion.div
            className="relative w-28 h-28 bg-gradient-to-br from-orange-400 via-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30"
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                '0 0 40px rgba(249, 115, 22, 0.5)',
                '0 0 80px rgba(249, 115, 22, 0.8)',
                '0 0 40px rgba(249, 115, 22, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-14 h-14 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating icons around the main logo */}
        <div className="absolute -inset-32 pointer-events-none">
          {floatingIcons.map((item, i) => {
            const Icon = item.Icon;
            const angle = (i / floatingIcons.length) * Math.PI * 2;
            const distance = 140;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.div
                key={i}
                className={`absolute w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center ${item.color}`}
                animate={{
                  x: [x * 0.8, x, x * 0.8],
                  y: [y * 0.8, y, y * 0.8],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-24px',
                  marginTop: '-24px',
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            );
          })}
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-orange-300 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SmartCareer AI
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg font-medium"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {text}
          </motion.p>
        </motion.div>

        {/* Animated loading dots */}
        <motion.div className="flex gap-3 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Progress bar with gradient */}
        <motion.div
          className="w-56 h-1.5 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full overflow-hidden mt-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-orange-400 to-pink-500 rounded-full shadow-lg"
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Subtle status message */}
        <motion.p
          className="text-xs text-gray-500 mt-6 font-medium tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Initializing AI Features...
        </motion.p>
      </div>
    </div>
  );
};

export default PremiumLoader;
