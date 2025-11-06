const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyIdToken } = require('../utils/firebaseAdmin');

/**
 * Middleware to protect routes by verifying either JWT (local auth) or Firebase ID token (Google auth).
 */
const protect = async (req, res, next) => {
    let token = '';

    // 1. Check for standard Bearer Token (JWT or Firebase ID Token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    // Attempt 1: Verify as Local JWT
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        if (req.user) {
            return next(); // Local Auth successful
        }
    } catch (error) {
        // JWT failed, proceed to check Firebase token
        // console.warn('Local JWT verification failed:', error.message);
    }

    // Attempt 2: Verify as Firebase ID Token
    try {
        const decodedFirebaseToken = await verifyIdToken(token);

        if (decodedFirebaseToken) {
            // Find or create user based on Firebase UID
            let user = await User.findOne({ uid: decodedFirebaseToken.uid });

            if (!user) {
                // Auto-create user from Google data
                user = await User.create({
                    uid: decodedFirebaseToken.uid,
                    email: decodedFirebaseToken.email,
                    name: decodedFirebaseToken.name || decodedFirebaseToken.email.split('@')[0],
                    photo: decodedFirebaseToken.picture || '',
                    role: 'user',
                });
            }

            // Return the local JWT token in case the client needs it for persistent session
            req.user = user;
            return next(); // Firebase Auth successful
        }
    } catch (error) {
        console.error('Final token verification failed:', error.message);
    }

    // If both failed
    res.status(401).json({ message: 'Not authorized, token failed' });
};

/**
 * Middleware to check for admin role.
 */
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };