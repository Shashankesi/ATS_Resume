import React from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Card Component with Morphing Effects
 * Features: 3D perspective, morphing shapes, hover animations, gradient overlays
 */
export const Card3D = ({ 
  children, 
  className = '', 
  hoverScale = 1.05,
  glowColor = 'orange' 
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - rect.left - centerX) / centerX;
    const y = (e.clientY - rect.top - centerY) / centerY;
    setMousePosition({ x, y });
  };

  const glowColorMap = {
    orange: 'from-orange-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <motion.div
      className={`relative perspective ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        perspective: '1200px',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX: isHovering ? mousePosition.y * 10 : 0,
          rotateY: isHovering ? mousePosition.x * -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
      >
        {/* Background with glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glowColorMap[glowColor]} opacity-0 blur-xl`}
          animate={{ opacity: isHovering ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main card */}
        <motion.div
          className="relative w-full h-full bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-600/30 overflow-hidden"
          whileHover={{ scale: hoverScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Morphing gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${glowColorMap[glowColor]} opacity-0 mix-blend-screen`}
            animate={{ opacity: isHovering ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={isHovering ? { x: ['-100%', '100%'] } : { x: '-100%' }}
            transition={{ duration: 1.5, repeat: isHovering ? Infinity : 0 }}
            style={{ pointerEvents: 'none' }}
          />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Morphing Shape Component
 * Animated geometric shapes that morph between different forms
 */
export const MorphingShape = ({ 
  className = '',
  colors = ['from-orange-400', 'to-pink-500']
}) => {
  const shapes = [
    'M0,50% Q50%,0% 100%,50% Q50%,100% 0,50%', // Circle-like
    'M0,0 L100%,0 L100%,100% L0,100% Z', // Square
    'M50%,0 L100%,38% L82%,100% L18%,100% L0,38% Z', // Pentagon
  ];

  return (
    <motion.svg
      className={`absolute ${className}`}
      viewBox="0 0 100 100"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={shapes[0]}
        fill="url(#morphGradient)"
        opacity="0.7"
        animate={{ 
          d: [shapes[0], shapes[1], shapes[2], shapes[0]],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.svg>
  );
};

/**
 * Floating Particle Effect Component
 * Renders floating animated particles around content
 */
export const FloatingParticles = ({ count = 20, className = '' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ['0%', '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Card3D;
