const express = require('express');
const router = express.Router();
const advancedResumeController = require('../controllers/advancedResumeController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

/**
 * GET /api/ai/analytics/:resumeId
 * Get resume analytics (ATS score, readability, etc.)
 */
router.get('/analytics/:resumeId', advancedResumeController.getResumeAnalytics);

/**
 * POST /api/ai/improvements/generate
 * Generate AI suggestions for resume section
 */
router.post('/improvements/generate', advancedResumeController.generateImprovements);

/**
 * POST /api/ai/improvements/suggestions
 * Get suggestions for resume improvements
 */
router.post('/improvements/suggestions', advancedResumeController.generateImprovements);

/**
 * POST /api/ai/improvements/apply/:improvementId
 * Apply a single improvement
 */
router.post('/improvements/apply/:improvementId', advancedResumeController.applyImprovement);

/**
 * POST /api/ai/improvements/apply-batch
 * Apply multiple improvements at once
 */
router.post('/improvements/apply-batch', advancedResumeController.applyBatchImprovements);

/**
 * GET /api/ai/resume/download/:resumeId
 * Download resume as file
 */
router.get('/resume/download/:resumeId', advancedResumeController.exportResumePDF);

module.exports = router;
