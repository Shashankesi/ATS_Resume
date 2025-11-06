import React from 'react';
import { motion } from 'framer-motion';

// Reusable glass card component with hover effects
const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  delay = 0,
  ...props
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.4 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`glass-card-lg ${glow ? 'glow-pulse' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(GlassCard);
