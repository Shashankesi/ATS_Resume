import React from 'react';
import { motion } from 'framer-motion';

/**
 * NextLevel Loading Bar
 * Shows animated progress bar during page transitions
 */
const NextLevelLoadingBar = ({ isLoading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: isLoading ? 1 : 0,
        scaleX: isLoading ? 1 : 0,
        originX: 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400"
        animate={{
          boxShadow: [
            '0 0 10px rgba(249, 115, 22, 0.5)',
            '0 0 30px rgba(249, 115, 22, 0.8)',
            '0 0 10px rgba(249, 115, 22, 0.5)',
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default NextLevelLoadingBar;
