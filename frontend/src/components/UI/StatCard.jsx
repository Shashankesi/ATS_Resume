import React from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

// Modern stats card with icon, counter, and glow effects
const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  delay = 0,
}) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    emerald: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-orange-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const shadowColorMap = {
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    emerald: 'rgba(16, 185, 129, 0.3)',
    orange: 'rgba(249, 115, 22, 0.3)',
    indigo: 'rgba(99, 102, 241, 0.3)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden glass-card-lg p-6 transition-all duration-300"
      style={{
        '--shadow-color': shadowColorMap[color] || shadowColorMap.blue,
      }}
    >
      {/* Animated gradient background on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${
          colorMap[color] || colorMap.blue
        } transition-opacity duration-300`}
      />

      {/* Glow border effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${
          colorMap[color] || colorMap.blue
        } opacity-0 group-hover:opacity-30 pointer-events-none`}
        whileHover={{ opacity: 0.3 }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
          <motion.h3 className="text-4xl font-bold text-slate-100 mt-2">
            <CountUp end={typeof value === 'number' ? value : 0} duration={2} />
          </motion.h3>
          {trend && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xs mt-2 font-semibold ${
                trend > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </motion.p>
          )}
        </div>
        {Icon && (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-lg bg-gradient-to-br ${
              colorMap[color] || colorMap.blue
            } text-white`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(StatCard);
