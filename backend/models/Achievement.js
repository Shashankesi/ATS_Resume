const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementId: {
      type: String, // 'first-resume', 'perfect-score', etc.
      required: true,
    },
    title: String,
    description: String,
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['resume', 'ats', 'ai-usage', 'engagement', 'skill-building'],
      default: 'engagement',
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate unlocks
AchievementSchema.index({ user: 1, achievementId: 1 }, { unique: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
