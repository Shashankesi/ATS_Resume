import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Star,
  Trophy,
  Flame,
  Target,
  Sparkles,
  Brain,
  CheckCircle,
} from 'lucide-react';

/**
 * Achievement Badge Component
 * Displays unlocked achievements with animations
 */
const AchievementBadge = ({ achievement, isUnlocked = false }) => {
  const achievementIcons = {
    'first-resume': Zap,
    'perfect-score': Star,
    'top-performer': Trophy,
    'streak-master': Flame,
    'ai-explorer': Sparkles,
    'skill-master': Brain,
    'goal-setter': Target,
    'achievement-unlocked': CheckCircle,
  };

  const achievementColors = {
    'first-resume': 'from-blue-500 to-blue-600',
    'perfect-score': 'from-yellow-500 to-orange-500',
    'top-performer': 'from-purple-500 to-pink-500',
    'streak-master': 'from-red-500 to-orange-500',
    'ai-explorer': 'from-cyan-500 to-blue-500',
    'skill-master': 'from-emerald-500 to-teal-500',
    'goal-setter': 'from-indigo-500 to-purple-500',
    'achievement-unlocked': 'from-green-500 to-emerald-500',
  };

  const Icon = achievementIcons[achievement.id] || Sparkles;
  const color = achievementColors[achievement.id] || 'from-blue-500 to-blue-600';

  if (!isUnlocked) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative group"
      >
        <div className="w-24 h-24 rounded-full bg-slate-700/40 flex items-center justify-center border-2 border-dashed border-slate-600 opacity-50">
          <Icon className="w-10 h-10 text-slate-500" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900 text-xs text-slate-300 text-center py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2">
          {achievement.title}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br rounded-full blur-lg opacity-50" style={{
        backgroundImage: `linear-gradient(135deg, var(--color-from), var(--color-to))`,
      }} />

      {/* Badge */}
      <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center border-2 border-white/30 shadow-lg`}>
        <Icon className="w-10 h-10 text-white" />

        {/* Checkmark */}
        <motion.div
          className="absolute -top-1 -right-1 bg-white text-green-500 rounded-full p-1"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap pointer-events-none z-10 border border-slate-700"
      >
        <p className="font-bold">{achievement.title}</p>
        <p className="text-slate-300 text-xs">{achievement.description}</p>
        {achievement.unlockedAt && (
          <p className="text-slate-400 text-xs mt-1">
            {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AchievementBadge;
