import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AchievementBadge from './AchievementBadge';
import { Trophy, Zap } from 'lucide-react';
import { getUserAchievements, checkAndUnlockAchievements } from '../../utils/achievementUtils';

/**
 * Achievements System Component
 * Displays all achievements and tracks unlocked ones
 */
const AchievementsSystem = ({ userResumes = [], atsScores = [] }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [stats, setStats] = useState({ unlockedCount: 0, totalAchievements: 8 });
  const [loading, setLoading] = useState(true);

  // All possible achievements
  const allAchievements = [
    {
      id: 'first-resume',
      title: 'First Step',
      description: 'Upload your first resume',
      category: 'resume',
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Achieve 100 ATS score',
      category: 'ats',
    },
    {
      id: 'top-performer',
      title: 'Top Performer',
      description: 'Maintain 85+ ATS average',
      category: 'ats',
    },
    {
      id: 'ai-explorer',
      title: 'AI Explorer',
      description: 'Use 5 different AI features',
      category: 'ai-usage',
    },
    {
      id: 'skill-master',
      title: 'Skill Master',
      description: 'Identify 20+ skills',
      category: 'skill-building',
    },
    {
      id: 'goal-setter',
      title: 'Goal Setter',
      description: 'Create 3 resumes',
      category: 'resume',
    },
    {
      id: 'achievement-hunter',
      title: 'Achievement Hunter',
      description: 'Unlock 5 achievements',
      category: 'engagement',
    },
  ];

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        // First check for new achievements
        await checkAndUnlockAchievements();
        // Then fetch all unlocked achievements
        const achievements = await getUserAchievements();
        setUnlockedAchievements(achievements);
        setStats({
          unlockedCount: achievements.length,
          totalAchievements: allAchievements.length,
        });
      } catch (error) {
        console.error('Failed to load achievements:', error);
        setStats({
          unlockedCount: 0,
          totalAchievements: allAchievements.length,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userResumes, atsScores]);

  const progressPercentage = Math.round((stats.unlockedCount / stats.totalAchievements) * 100);

  const isAchievementUnlocked = (achievementId) => {
    return unlockedAchievements.some(a => a.achievementId === achievementId);
  };

  if (loading) {
    return (
      <motion.section className="my-16 flex items-center justify-center h-40">
        <div className="animate-spin">
          <Trophy className="w-8 h-8 text-yellow-400" />
        </div>
      </motion.section>
    );
  }

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
            <p className="text-2xl font-bold text-slate-100">{stats.unlockedCount}/{stats.totalAchievements}</p>
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
        {allAchievements.map((achievement, idx) => (
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
              isUnlocked={isAchievementUnlocked(achievement.id)}
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
              You've unlocked {stats.unlockedCount} achievement{stats.unlockedCount !== 1 ? 's' : ''}! Continue using SmartCareer to unlock more achievements and advance your career.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AchievementsSystem;
