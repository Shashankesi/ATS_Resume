import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AchievementBadge from './AchievementBadge';
import { Trophy, Zap } from 'lucide-react';

/**
 * Achievements System Component
 * Displays all achievements and tracks unlocked ones
 */
const AchievementsSystem = ({ userResumes = [], atsScores = [] }) => {
  const [achievements, setAchievements] = useState([
    {
      id: 'first-resume',
      title: 'First Step',
      description: 'Upload your first resume',
      condition: () => userResumes.length > 0,
      unlocked: false,
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Achieve 100 ATS score',
      condition: () => atsScores.some(score => score >= 100),
      unlocked: false,
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Maintain 85+ ATS average',
      condition: () => {
        if (atsScores.length === 0) return false;
        const avg = atsScores.reduce((a, b) => a + b, 0) / atsScores.length;
        return avg >= 85;
      },
      unlocked: false,
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Login 5 days in a row',
      condition: () => checkLoginStreak(5),
      unlocked: false,
    },
    {
      id: 'ai-explorer',
      title: 'AI Explorer',
      description: 'Use 5 different AI features',
      condition: () => countAIFeatureUses() >= 5,
      unlocked: false,
    },
    {
      id: 'skill-master',
      title: 'Skill Master',
      description: 'Identify 20+ skills',
      condition: () => countTotalSkills() >= 20,
      unlocked: false,
    },
    {
      id: 'goal-setter',
      title: 'Goal Setter',
      description: 'Create 3 resumes',
      condition: () => userResumes.length >= 3,
      unlocked: false,
    },
    {
      id: 'achievement-unlocked',
      title: 'Achievement Hunter',
      description: 'Unlock 5 achievements',
      condition: (unlockedCount) => unlockedCount >= 5,
      unlocked: false,
    },
  ]);

  // Helper functions
  const checkLoginStreak = (days) => {
    const loginHistory = JSON.parse(localStorage.getItem('login-history') || '[]');
    if (loginHistory.length < days) return false;

    const today = new Date().toDateString();
    const recentLogins = loginHistory.slice(-days);

    return recentLogins.every((date, idx) => {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - (days - 1 - idx));
      return new Date(date).toDateString() === expected.toDateString();
    });
  };

  const countAIFeatureUses = () => {
    const aiHistory = JSON.parse(localStorage.getItem('ai-history') || '[]');
    const uniqueFeatures = new Set(aiHistory.map(h => h.feature));
    return uniqueFeatures.size;
  };

  const countTotalSkills = () => {
    return userResumes.reduce((total, resume) => {
      const skills = resume.data?.sections?.find(s => s.type === 'skills')?.content?.list || '';
      return total + skills.split(',').filter(s => s.trim()).length;
    }, 0);
  };

  useEffect(() => {
    // Check all achievements
    const updatedAchievements = achievements.map((achievement) => {
      const unlockedCount = achievements.filter(a => a.unlocked).length;
      return {
        ...achievement,
        unlocked: achievement.condition(unlockedCount),
      };
    });

    setAchievements(updatedAchievements);

    // Record unlocked achievements
    updatedAchievements.forEach((achievement) => {
      if (achievement.unlocked && !achievements.find(a => a.id === achievement.id)?.unlocked) {
        recordAchievementUnlock(achievement);
      }
    });
  }, [userResumes, atsScores]);

  const recordAchievementUnlock = (achievement) => {
    const unlockedAchievements = JSON.parse(
      localStorage.getItem('unlocked-achievements') || '{}'
    );
    if (!unlockedAchievements[achievement.id]) {
      unlockedAchievements[achievement.id] = {
        ...achievement,
        unlockedAt: new Date().toISOString(),
      };
      localStorage.setItem('unlocked-achievements', JSON.stringify(unlockedAchievements));
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <motion.section
      className="my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-black gradient-text">Achievements</h2>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-100">{unlockedCount}/{achievements.length}</p>
            <p className="text-sm text-slate-400">Unlocked</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700/30 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <AchievementBadge
              achievement={achievement}
              isUnlocked={achievement.unlocked}
            />
          </motion.div>
        ))}
      </div>

      {/* Achievements info */}
      <motion.div
        className="mt-12 p-6 glass-card border border-blue-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-4">
          <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Keep Going! 🚀</h3>
            <p className="text-slate-300">
              You've unlocked {unlockedCount} achievement{unlockedCount !== 1 ? 's' : ''}! Continue using SmartCareer to unlock more achievements and advance your career.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AchievementsSystem;
