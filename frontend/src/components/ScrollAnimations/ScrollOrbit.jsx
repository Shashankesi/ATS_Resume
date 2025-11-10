import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * 3D Scroll Orbit Animation Component
 * Creates orbiting 3D-style objects that move as user scrolls
 */
const ScrollOrbit = ({ children = null }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create rotation animations based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const z = useTransform(scrollYProgress, [0, 1], [-500, 500]);

  return (
    <div ref={ref} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900/50 to-purple-900/50 rounded-3xl">
      {/* Ambient lighting effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" />

      {/* Central pivot point */}
      <motion.div
        className="relative w-96 h-96"
        style={{
          rotateZ: rotate,
          rotateY: rotateY,
          perspective: 1000,
        }}
      >
        {/* Orbiting elements */}
        <motion.div
          className="absolute top-0 left-1/2 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl shadow-blue-500/50 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
          initial={{ y: -150 }}
          animate={{
            y: [-150, 150, -150],
            x: [-150, 150, -150],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 animate-pulse" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-2xl shadow-purple-500/50 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
          initial={{ x: 150 }}
          animate={{
            x: [150, -150, 150],
            y: [0, -150, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-purple-300 opacity-20 animate-pulse" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-1/2 w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-2xl shadow-pink-500/50 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
          initial={{ y: 150 }}
          animate={{
            y: [150, -150, 150],
            x: [150, -150, 150],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-pink-300 opacity-20 animate-pulse" />
        </motion.div>

        {/* Central cube */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
          style={{ z }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-2xl shadow-orange-500/50 flex items-center justify-center text-white font-bold text-2xl">
            AI
          </div>
        </motion.div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.2))' }}>
          <motion.line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="10%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="10,5"
            animate={{
              strokeDashoffset: [0, 15],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.line
            x1="50%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#gradient2)"
            strokeWidth="2"
            strokeDasharray="10,5"
            animate={{
              strokeDashoffset: [0, 15],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="90%"
            stroke="url(#gradient3)"
            strokeWidth="2"
            strokeDasharray="10,5"
            animate={{
              strokeDashoffset: [0, 15],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Content overlay */}
      {children && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">{children}</div>}
    </div>
  );
};

export default ScrollOrbit;
