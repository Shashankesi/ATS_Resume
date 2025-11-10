const express = require('express');
const { registerUser, authUser, getProfile, googleSignIn, googlePreview, demoLogin, getMe, refreshToken, githubSignIn, githubPreview, microsoftSignIn, microsoftPreview } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/security');
const { 
    validateRegister, 
    validateLogin, 
    validateGoogleSignIn 
} = require('../middleware/validation');

const router = express.Router();

// Local Auth with validation and rate limiting
router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, authUser);
router.post('/refresh', refreshToken);

// OAuth Sign-In routes
router.post('/google', authLimiter, validateGoogleSignIn, googleSignIn);
router.post('/google/preview', authLimiter, googlePreview);
router.post('/github', authLimiter, githubSignIn);
router.post('/github/preview', authLimiter, githubPreview);
router.post('/microsoft', authLimiter, microsoftSignIn);
router.post('/microsoft/preview', authLimiter, microsoftPreview);

// Demo/Test Login (no validation needed)
router.post('/demo', demoLogin);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/me', protect, getMe);

module.exports = router;