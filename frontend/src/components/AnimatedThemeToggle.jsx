import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AnimatedThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8 },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 180, scale: 0 },
  };

  return (
    <motion.button
      variants={containerVariants}
      initial="initial"
      animate="animate"
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
          : 'bg-slate-200 hover:bg-slate-300 text-blue-600'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-md opacity-30 ${
          isDark ? 'bg-yellow-500' : 'bg-blue-400'
        }`}
        animate={{
          scale: isDark ? [1, 1.2, 1] : [1, 1.2, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon container */}
      <div className="relative">
        {isDark ? (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Moon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Sun size={20} />
          </motion.div>
        )}
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded opacity-0 pointer-events-none whitespace-nowrap"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        Switch to {isDark ? 'light' : 'dark'} mode
      </motion.div>
    </motion.button>
  );
};

export default AnimatedThemeToggle;
