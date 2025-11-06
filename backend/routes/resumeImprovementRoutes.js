const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    getResumeSuggestions,
    applyBatchImprovements,
    exportResumePDF,
    cloneResume,
    getImprovementsHistory,
    compareVersions,
} = require('../controllers/resumeImprovementController');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get suggestions for resume
router.get('/suggestions/:resumeId', getResumeSuggestions);

// Apply batch improvements
router.post('/apply-batch', applyBatchImprovements);

// Export resume to PDF
router.get('/export/:resumeId', exportResumePDF);

// Clone resume
router.post('/clone/:resumeId', cloneResume);

// Get improvements history
router.get('/history/:resumeId', getImprovementsHistory);

// Compare resume versions
router.post('/compare', compareVersions);

module.exports = router;
