import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

// Toast context and hook
export const ToastContext = React.createContext();

/**
 * Toast Provider Component
 * Wraps app to provide toast notifications globally
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const value = { addToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * useToast Hook
 * Use this in components to trigger toasts
 */
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

/**
 * Toast Item Component
 * Individual toast notification
 */
const ToastItem = ({ id, message, type, onRemove }) => {
  const iconMap = {
    success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  };

  const { icon: Icon, color, bg, border } = iconMap[type] || iconMap.info;

  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${bg} border ${border} backdrop-blur-xl`}
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Icon className={`${color} flex-shrink-0 w-5 h-5`} />
      <span className="text-sm text-gray-100 flex-1">{message}</span>
      <motion.button
        onClick={() => onRemove(id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

/**
 * Toast Container Component
 * Manages positioning and stacking of toasts
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onRemove={onRemove}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * Toast Utils - Helper functions
 * Use these in your components instead of the hook directly for convenience
 */
export const toast = {
  success: (message, duration = 3000) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', { detail: { message, type: 'success', duration } });
      window.dispatchEvent(event);
    }
  },
  error: (message, duration = 4000) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', { detail: { message, type: 'error', duration } });
      window.dispatchEvent(event);
    }
  },
  warning: (message, duration = 3000) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', { detail: { message, type: 'warning', duration } });
      window.dispatchEvent(event);
    }
  },
  info: (message, duration = 3000) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast', { detail: { message, type: 'info', duration } });
      window.dispatchEvent(event);
    }
  },
};

export default ToastProvider;
