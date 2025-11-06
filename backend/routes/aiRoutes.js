const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/security');
const { 
    validateAiRequest,
    validateJobRecommendations,
    validateChatMessage
} = require('../middleware/validation');
const { 
    handleAiRequest,
    getJobRecommendations,
    getHistory,
    applyImprovement,
    generateImprovements,
    downloadResume
} = require('../controllers/aiController'); 

const router = express.Router();

// All AI routes require authentication
router.use(protect);
router.use(aiLimiter); // Rate limit AI requests

// Generic endpoint to handle all AI feature calls
router.post('/generic', validateAiRequest, handleAiRequest);

// Dedicated endpoint for Job Recommendations
router.post('/jobs', validateJobRecommendations, getJobRecommendations);

// Recent AI activity for the authenticated user
router.get('/history', getHistory);

// Convenience aliases
router.post('/summary', (req, res, next) => {
    req.body.feature = 'generateSummary';
    return validateAiRequest(req, res, () => handleAiRequest(req, res, next));
});

router.post('/analyze', (req, res, next) => {
    req.body.feature = 'analyzeATS';
    return validateAiRequest(req, res, () => handleAiRequest(req, res, next));
});

router.post('/cover-letter', (req, res, next) => {
    req.body.feature = 'generateCoverLetter';
    return validateAiRequest(req, res, () => handleAiRequest(req, res, next));
});

router.post('/chat', validateChatMessage, (req, res, next) => {
    req.body.feature = 'chatAssistant';
    req.body.payload = { message: req.body.message };
    return validateAiRequest(req, res, () => handleAiRequest(req, res, next));
});

router.post('/skill-gap', (req, res, next) => {
    req.body.feature = 'skillGap';
    return validateAiRequest(req, res, () => handleAiRequest(req, res, next));
});

// Resume Improvement Endpoints
router.post('/improvements/apply', applyImprovement);
router.post('/improvements/generate', generateImprovements);
router.get('/resume/download/:resumeId', downloadResume);

module.exports = router;