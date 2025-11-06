/**
 * Reusable Framer Motion Animation Variants
 * Used consistently across the app for professional animations
 */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const slideInVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
};

export const slideUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const scaleInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
};

export const rotateInVariants = {
  hidden: { rotate: -90, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
};

export const flipInVariants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const bounceInVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export const hoverGlow = {
  rest: { boxShadow: '0 0 0px rgba(249, 115, 22, 0)' },
  hover: {
    boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
    transition: { duration: 0.3 },
  },
};

export const tapScale = {
  rest: { scale: 1 },
  tap: { scale: 0.95 },
};

export const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  },
};

export const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotateVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0%', '-200% 0%'],
    transition: { duration: 2, repeat: Infinity },
  },
};

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  },
};

export const toastVariants = {
  initial: { opacity: 0, x: 50, y: 0 },
  animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};

export const loadingVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
};

export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200 } },
};
