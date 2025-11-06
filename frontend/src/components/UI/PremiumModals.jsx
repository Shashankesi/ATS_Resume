import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Premium Modal Component with next-level animations
 */
const PremiumModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  icon: Icon,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={`${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden"
                layout
              >
                {/* Header */}
                <div className="relative px-6 py-6 border-b border-slate-700/50">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10"></div>

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <motion.div
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="p-2 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg"
                        >
                          <Icon className="w-5 h-5 text-orange-400" />
                        </motion.div>
                      )}
                      <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-lg font-bold text-white"
                      >
                        {title}
                      </motion.h2>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-6 py-6 text-gray-300"
                >
                  {children}
                </motion.div>

                {/* Footer */}
                {footer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="px-6 py-4 bg-white/5 border-t border-slate-700/50 flex gap-3 justify-end"
                  >
                    {footer}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * Premium Alert Component
 */
const PremiumAlert = ({
  type = 'info',
  title,
  message,
  actions,
  dismissible = true,
  onDismiss,
}) => {
  const types = {
    success: {
      bg: 'from-green-500/20 to-green-500/10',
      border: 'border-green-500/50',
      icon: '✓',
      color: 'text-green-300',
    },
    error: {
      bg: 'from-red-500/20 to-red-500/10',
      border: 'border-red-500/50',
      icon: '!',
      color: 'text-red-300',
    },
    warning: {
      bg: 'from-yellow-500/20 to-yellow-500/10',
      border: 'border-yellow-500/50',
      icon: '⚠',
      color: 'text-yellow-300',
    },
    info: {
      bg: 'from-blue-500/20 to-blue-500/10',
      border: 'border-blue-500/50',
      icon: 'ℹ',
      color: 'text-blue-300',
    },
  };

  const config = types[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-gradient-to-r ${config.bg} border ${config.border} rounded-lg p-4 flex items-start gap-4`}
    >
      <div className={`text-2xl font-bold ${config.color} flex-shrink-0`}>
        {config.icon}
      </div>
      <div className="flex-1">
        {title && <h3 className="font-semibold text-white mb-1">{title}</h3>}
        <p className="text-sm text-gray-300">{message}</p>
        {actions && <div className="flex gap-2 mt-3">{actions}</div>}
      </div>
      {dismissible && (
        <motion.button
          whileHover={{ rotate: 90 }}
          onClick={onDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </motion.button>
      )}
    </motion.div>
  );
};

export { PremiumModal, PremiumAlert };
