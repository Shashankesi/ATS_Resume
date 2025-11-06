const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  checkAndUnlockAchievements,
  getUserAchievements,
  getAchievementStats,
} = require('../controllers/achievementController');

// All achievement routes require authentication
router.use(protect);

// Check and unlock achievements
router.post('/check', checkAndUnlockAchievements);

// Get user's achievements
router.get('/', getUserAchievements);

// Get achievement stats
router.get('/stats', getAchievementStats);

module.exports = router;
