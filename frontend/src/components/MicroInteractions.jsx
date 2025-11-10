import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Ripple effect button
export const RippleButton = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const ripples = useRef([]);
  const [rippleList, setRippleList] = useState([]);

  const addRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const id = Date.now();
    setRippleList([...rippleList, { id, x, y, size }]);

    setTimeout(() => {
      setRippleList(prev => prev.filter(r => r.id !== id));
    }, 600);

    onClick?.(e);
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-400 dark:hover:bg-slate-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };

  return (
    <motion.button
      onClick={addRipple}
      className={`relative overflow-hidden rounded-lg font-semibold transition-all duration-200 ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Ripple effects */}
      {rippleList.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          animate={{
            width: ripple.size,
            height: ripple.size,
            opacity: 0,
          }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Floating particles
export const FloatingParticles = ({ count = 20, isDarkMode = false }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    duration: Math.random() * 5 + 8,
    delay: Math.random() * 2,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDarkMode ? 'bg-blue-400/20' : 'bg-blue-300/20'
          }`}
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            bottom: -10,
          }}
          animate={{
            y: -window.innerHeight - 20,
            opacity: [0, 1, 1, 0],
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

// Scroll reveal animation
export const ScrollReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};

// Hover lift effect
export const HoverLift = ({
  children,
  className,
  liftAmount = 10,
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -liftAmount }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

// Bounce animation
export const BounceAnimation = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// Glow effect on hover
export const GlowOnHover = ({
  children,
  className,
  glowColor = 'blue',
}) => {
  const glowClasses = {
    blue: 'shadow-lg shadow-blue-500/50 hover:shadow-blue-500/80',
    purple: 'shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80',
    green: 'shadow-lg shadow-green-500/50 hover:shadow-green-500/80',
    red: 'shadow-lg shadow-red-500/50 hover:shadow-red-500/80',
  };

  return (
    <motion.div
      className={`transition-shadow duration-300 ${glowClasses[glowColor]} ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger item
export const StaggerItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Pulse effect
export const PulseBox = ({ children, className, intensity = 'md' }) => {
  const intensityMap = {
    sm: { scale: [1, 1.01, 1], duration: 3 },
    md: { scale: [1, 1.05, 1], duration: 2 },
    lg: { scale: [1, 1.1, 1], duration: 2 },
  };

  return (
    <motion.div
      className={className}
      animate="pulse"
      variants={{
        pulse: intensityMap[intensity],
      }}
      transition={{
        duration: intensityMap[intensity].duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// Tooltip
export const Tooltip = ({ children, text, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div className="relative group">
      {children}
      <motion.div
        initial={{ opacity: 0, y: position === 'top' ? 5 : -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`absolute ${positionClasses[position]} px-3 py-2 bg-slate-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50`}
      >
        {text}
      </motion.div>
    </div>
  );
};
