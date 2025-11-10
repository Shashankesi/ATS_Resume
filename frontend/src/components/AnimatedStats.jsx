import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Counter Component
 * Counts up from 0 to final value with smooth animation
 */
export const AnimatedCounter = ({ 
  value = 0, 
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let timer = setInterval(() => {
      start += end / (duration * 100);
      if (start > end) start = end;
      setCount(start);
    }, duration * 10);

    return () => clearInterval(timer);
  }, [value, duration]);

  const formattedCount = decimals 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

/**
 * Animated Progress Bar Component
 * Smooth progress bar with gradient and animation
 */
export const AnimatedProgressBar = ({ 
  value = 0,
  max = 100,
  color = 'from-orange-400 to-pink-500',
  showLabel = true,
  animated = true,
  height = 'h-2'
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      <div className={`${height} bg-slate-700/30 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 1.5 : 0,
            ease: 'easeOut'
          }}
          style={{
            boxShadow: `0 0 20px rgba(249, 115, 22, 0.5)`,
          }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-400 mt-1">{Math.round(percentage)}%</p>
      )}
    </div>
  );
};

/**
 * Stat Card Component with Animation
 * Beautiful stat display with icons and animations
 */
export const StatCardAnimated = ({ 
  icon: Icon,
  label,
  value,
  suffix = '',
  trend,
  color = 'orange',
  onClick
}) => {
  const colorMap = {
    orange: 'from-orange-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30 cursor-pointer overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colorMap[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[color]} text-white`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          {trend && (
            <motion.div
              className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                trend.direction === 'up' 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </motion.div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-gray-400 text-sm font-medium mb-2">{label}</h3>
        <p className="text-3xl font-bold text-white">
          <AnimatedCounter value={parseFloat(value)} />
          <span className="text-lg">{suffix}</span>
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Timeline Item Component
 * Animated timeline entry for activity/history display
 */
export const TimelineItem = ({ 
  icon: Icon,
  title,
  description,
  timestamp,
  color = 'orange',
  isLast = false
}) => {
  const colorMap = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
  };

  return (
    <motion.div 
      className="flex gap-4 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className={`${colorMap[color]} p-2 rounded-full text-white`}
          whileHover={{ scale: 1.2 }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
        {!isLast && <div className="w-1 h-12 bg-slate-700/50 mt-2" />}
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 pb-4"
        whileHover={{ x: 8 }}
      >
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
      </motion.div>
    </motion.div>
  );
};

/**
 * Progress Ring Component
 * Circular progress indicator with animation
 */
export const ProgressRing = ({ 
  value = 75,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'from-orange-400 to-pink-500',
  showValue = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ width: size, height: size, position: 'relative' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(100, 116, 139, 0.3)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))',
            }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-2xl font-bold text-white">
                <AnimatedCounter value={percentage} decimals={0} />
              </p>
              <p className="text-xs text-gray-400 mt-1">Complete</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Bar Chart Component
 * Simple animated bar chart
 */
export const BarChart = ({ 
  data,
  color = 'from-orange-400 to-pink-500',
  height = 200
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="flex-1 flex flex-col items-center gap-2"
        >
          <motion.div
            className={`w-full rounded-t-lg bg-gradient-to-t ${color}`}
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * height}px` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          />
          <p className="text-xs text-gray-400 text-center">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default {
  AnimatedCounter,
  AnimatedProgressBar,
  StatCardAnimated,
  TimelineItem,
  ProgressRing,
  BarChart,
};
