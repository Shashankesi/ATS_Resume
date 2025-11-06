const express = require('express');
const { registerUser, authUser, getProfile, googleSignIn, getMe } = require('../controllers/authController');
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

// Google Sign-In with validation
router.post('/google', authLimiter, validateGoogleSignIn, googleSignIn);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/me', protect, getMe);

module.exports = router;