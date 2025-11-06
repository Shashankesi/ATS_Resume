const Achievement = require('../models/Achievement');
const User = require('../models/User');
const Resume = require('../models/Resume');
const AIHistory = require('../models/AIHistory');

/**
 * Achievement definitions and unlock conditions
 */
const ACHIEVEMENTS = {
  'first-resume': {
    title: 'First Step',
    description: 'Upload your first resume',
    category: 'resume',
    checkCondition: async (userId) => {
      const resumeCount = await Resume.countDocuments({ user: userId });
      return resumeCount > 0;
    },
  },
  'perfect-score': {
    title: 'Perfect Score',
    description: 'Achieve 100 ATS score',
    category: 'ats',
    checkCondition: async (userId) => {
      const resume = await Resume.findOne({ user: userId, 'analysis.atsScore': { $gte: 100 } });
      return !!resume;
    },
  },
  'top-performer': {
    title: 'Top Performer',
    description: 'Maintain 85+ ATS average',
    category: 'ats',
    checkCondition: async (userId) => {
      const resumes = await Resume.find({ user: userId, 'analysis.atsScore': { $exists: true } });
      if (resumes.length === 0) return false;
      const avg = resumes.reduce((sum, r) => sum + (r.analysis?.atsScore || 0), 0) / resumes.length;
      return avg >= 85;
    },
  },
  'ai-explorer': {
    title: 'AI Explorer',
    description: 'Use 5 different AI features',
    category: 'ai-usage',
    checkCondition: async (userId) => {
      const history = await AIHistory.distinct('feature', { user: userId });
      return history.length >= 5;
    },
  },
  'skill-master': {
    title: 'Skill Master',
    description: 'Identify 20+ skills across resumes',
    category: 'skill-building',
    checkCondition: async (userId) => {
      const resumes = await Resume.find({ user: userId });
      const skillSet = new Set();
      resumes.forEach(r => {
        const skills = r.data?.sections?.find(s => s.type === 'skills')?.content?.list || '';
        skills.split(',').forEach(s => skillSet.add(s.trim()));
      });
      return skillSet.size >= 20;
    },
  },
  'goal-setter': {
    title: 'Goal Setter',
    description: 'Create 3 resumes',
    category: 'resume',
    checkCondition: async (userId) => {
      const count = await Resume.countDocuments({ user: userId });
      return count >= 3;
    },
  },
  'achievement-hunter': {
    title: 'Achievement Hunter',
    description: 'Unlock 5 achievements',
    category: 'engagement',
    checkCondition: async (userId) => {
      const count = await Achievement.countDocuments({ user: userId });
      return count >= 5;
    },
  },
};

/**
 * Check and unlock achievements for a user
 * @route POST /api/achievements/check
 */
const checkAndUnlockAchievements = async (req, res) => {
  try {
    const userId = req.user._id;
    const unlockedAchievements = [];

    for (const [achievementId, achievement] of Object.entries(ACHIEVEMENTS)) {
      // Check if already unlocked
      const existing = await Achievement.findOne({ user: userId, achievementId });
      if (existing) continue;

      // Check condition
      const shouldUnlock = await achievement.checkCondition(userId);
      if (shouldUnlock) {
        const newAchievement = await Achievement.create({
          user: userId,
          achievementId,
          title: achievement.title,
          description: achievement.description,
          category: achievement.category,
        });
        unlockedAchievements.push(newAchievement);
      }
    }

    res.json({
      message: `Checked achievements. Unlocked ${unlockedAchievements.length} new achievement(s).`,
      newAchievements: unlockedAchievements,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking achievements', error: error.message });
  }
};

/**
 * Get all achievements for a user
 * @route GET /api/achievements
 */
const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user._id;
    const achievements = await Achievement.find({ user: userId }).sort({ unlockedAt: -1 });
    
    // Enrich with achievement details
    const enriched = achievements.map(a => ({
      ...a.toObject(),
      ...ACHIEVEMENTS[a.achievementId],
    }));

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
};

/**
 * Get achievement stats
 * @route GET /api/achievements/stats
 */
const getAchievementStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const unlockedCount = await Achievement.countDocuments({ user: userId });
    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const percentage = Math.round((unlockedCount / totalAchievements) * 100);

    res.json({
      unlockedCount,
      totalAchievements,
      completionPercentage: percentage,
      allAchievements: ACHIEVEMENTS,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

module.exports = {
  checkAndUnlockAchievements,
  getUserAchievements,
  getAchievementStats,
};
