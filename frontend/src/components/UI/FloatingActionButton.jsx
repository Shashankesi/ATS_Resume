import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Zap, MessageCircle, X } from 'lucide-react';

const FloatingActionButton = ({ onUpload, onQuickAI, onChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Upload, label: 'Upload', color: 'from-blue-500 to-blue-600', onClick: onUpload },
    { icon: Zap, label: 'Quick AI', color: 'from-purple-500 to-purple-600', onClick: onQuickAI },
    { icon: MessageCircle, label: 'Chat', color: 'from-pink-500 to-pink-600', onClick: onChat },
  ];

  return (
    <>
      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] flex items-center justify-center text-white transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            {/* Action buttons */}
            {actions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: Math.cos((idx / actions.length) * Math.PI * 2) * -120,
                    y: Math.sin((idx / actions.length) * Math.PI * 2) * -120,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`fixed bottom-8 right-8 z-30 w-14 h-14 rounded-full bg-gradient-to-br ${action.color} shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              );
            })}

            {/* Labels */}
            {actions.map((action, idx) => {
              const x = Math.cos((idx / actions.length) * Math.PI * 2) * -120;
              const y = Math.sin((idx / actions.length) * Math.PI * 2) * -120;

              return (
                <motion.div
                  key={`label-${action.label}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'fixed',
                    bottom: `calc(32px + ${Math.abs(y)}px)`,
                    right: `calc(32px + ${Math.abs(x)}px)`,
                    zIndex: 30,
                  }}
                  className="text-xs font-semibold text-slate-100 bg-slate-900/90 px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                >
                  {action.label}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(FloatingActionButton);
