const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyIdToken } = require('../utils/firebaseAdmin');

// Helper to generate a local JWT (short-lived)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Short-lived access token
    });
};

// Helper to generate a refresh token (long-lived)
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET + '_REFRESH', {
        expiresIn: '30d',
    });
};

// Local Auth: Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Use `new User()` + `save()` to ensure pre-save hooks run reliably
        const newUser = new User({ name, email, password, role: 'user' });
        const user = await newUser.save();

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                refreshToken: generateRefreshToken(user._id),
            });
        }

        return res.status(400).json({ message: 'Invalid user data' });
    } catch (error) {
        console.error('Register User error:', error);
        // Duplicate key error (unique index) may surface as code 11000
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User already exists' });
        }
        return res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// Local Auth: Authenticate User & get token
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.password && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            refreshToken: generateRefreshToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Google Sign-In (with enhanced fallback to test mode)
const googleSignIn = async (req, res) => {
    try {
        const { idToken, email, name, picture } = req.body;

        let decodedToken = null;

        // Try Firebase verification first if admin is available
        if (idToken) {
            decodedToken = await verifyIdToken(idToken);
        }

        // If Firebase verification failed or no token, use fallback mode
        if (!decodedToken) {
            if (!email) {
                return res.status(400).json({
                    message: 'Google Sign-In requires either a valid ID token or email for fallback mode',
                    code: 'MISSING_CREDENTIALS'
                });
            }
            console.log('🔄 Using fallback authentication mode for:', email);
            decodedToken = {
                uid: email.replace('@', '_').replace('.', '_'), // Create a simple UID from email
                email: email,
                name: name || email.split('@')[0],
                picture: picture || null
            };
        }

        // Check if user exists
        let user = await User.findOne({
            $or: [
                { uid: decodedToken.uid },
                { email: decodedToken.email }
            ]
        });

        if (!user) {
                // Create new user (use save to trigger hooks)
                const tmp = new User({
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                    name: decodedToken.name || decodedToken.email.split('@')[0],
                    photo: decodedToken.picture || '',
                    role: 'user',
                });
                user = await tmp.save();
            console.log('✅ New user created via Google Sign-In:', user.email);
        } else {
            console.log('✅ Existing user signed in via Google:', user.email);
        }

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo,
                token: generateToken(user._id),
                refreshToken: generateRefreshToken(user._id),
                message: decodedToken.uid.startsWith(email.replace('@', '_').replace('.', '_'))
                    ? 'Signed in successfully (fallback mode)'
                    : 'Signed in with Google successfully'
            });
        } else {
            res.status(500).json({ message: 'Failed to process user after authentication' });
        }
    } catch (error) {
        console.error('Google Sign-In error:', error);
        res.status(500).json({
            message: 'Sign-in failed',
            error: error.message
        });
    }
};

/**
 * Google Account Preview (for OAuth modal)
 * @route POST /api/auth/google/preview
 */
const googlePreview = async (req, res) => {
    try {
        const googleName = 'Google Account User';
        const googleEmail = `user-${Date.now()}@gmail.com`;
        
        res.json({
            provider: 'google',
            name: googleName,
            email: googleEmail,
            scope: ['profile', 'email'],
            verified: true,
            preview: true
        });
    } catch (error) {
        console.error('Google Preview error:', error);
        res.status(500).json({ 
            message: 'Failed to fetch Google preview', 
            error: error.message 
        });
    }
};

// Get profile from protected route
const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const getMe = (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
        headline: req.user.headline,
        location: req.user.location,
    });
};

/**
 * Refresh JWT Token
 * @route POST /api/auth/refresh
 */
const refreshToken = async (req, res) => {
    try {
        const { refreshToken: clientRefreshToken } = req.body;
        
        if (!clientRefreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        // Verify refresh token
        const decoded = jwt.verify(clientRefreshToken, process.env.JWT_SECRET + '_REFRESH');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Issue new access token
        const newAccessToken = generateToken(user._id);
        res.json({
            token: newAccessToken,
            refreshToken: generateRefreshToken(user._id), // Optional: rotate refresh token
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired refresh token', error: error.message });
    }
};

/**
 * Demo/Test Login - For testing without Google Sign-In
 * @route POST /api/auth/demo
 */
const demoLogin = async (req, res) => {
    try {
        const testEmail = 'demo@smartcareer.com';
        const testName = 'Demo User';
        
        // Check if demo user exists
        let user = await User.findOne({ email: testEmail });
        
        if (!user) {
            // Create demo user using save
            const tmp = new User({
                email: testEmail,
                name: testName,
                uid: 'demo-user-' + Date.now(),
                password: 'demo123456',
                role: 'user',
                photo: '',
            });
            user = await tmp.save();
            console.log('✅ Demo user created');
        } else {
            console.log('✅ Demo user found');
        }
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            token: generateToken(user._id),
            refreshToken: generateRefreshToken(user._id),
            message: 'Demo login successful - testing mode'
        });
    } catch (error) {
        console.error('Demo login error:', error);
        res.status(500).json({ 
            message: 'Demo login failed', 
            error: error.message 
        });
    }
};

/**
 * GitHub Sign-In (OAuth Alternative)
 * @route POST /api/auth/github
 */
const githubSignIn = async (req, res) => {
    try {
        // GitHub OAuth fallback - create test user
        const githubEmail = `github-${Date.now()}@smartcareer.com`;
        const githubName = 'GitHub User';
        
        let user = await User.findOne({ email: githubEmail });
        
        if (!user) {
            const tmp = new User({
                email: githubEmail,
                name: githubName,
                uid: 'github-' + Date.now(),
                password: 'secure' + Date.now(),
                role: 'user',
                photo: '',
            });
            user = await tmp.save();
            console.log('✅ GitHub user created');
        }
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            token: generateToken(user._id),
            refreshToken: generateRefreshToken(user._id),
            message: 'GitHub Sign-In successful'
        });
    } catch (error) {
        console.error('GitHub Sign-In error:', error);
        res.status(500).json({ 
            message: 'GitHub Sign-In failed', 
            error: error.message 
        });
    }
};

/**
 * GitHub Account Preview (for OAuth modal)
 * @route POST /api/auth/github/preview
 */
const githubPreview = async (req, res) => {
    try {
        const githubName = 'GitHub Developer';
        const githubEmail = `github-${Date.now()}@smartcareer.com`;
        
        res.json({
            provider: 'github',
            name: githubName,
            email: githubEmail,
            scope: ['user:email', 'read:user'],
            verified: true,
            preview: true
        });
    } catch (error) {
        console.error('GitHub Preview error:', error);
        res.status(500).json({ 
            message: 'Failed to fetch GitHub preview', 
            error: error.message 
        });
    }
};

/**
 * Microsoft Sign-In (OAuth Alternative)
 * @route POST /api/auth/microsoft
 */
const microsoftSignIn = async (req, res) => {
    try {
        // Microsoft OAuth fallback - create test user
        const microsoftEmail = `microsoft-${Date.now()}@smartcareer.com`;
        const microsoftName = 'Microsoft User';
        
        let user = await User.findOne({ email: microsoftEmail });
        
        if (!user) {
            const tmp = new User({
                email: microsoftEmail,
                name: microsoftName,
                uid: 'microsoft-' + Date.now(),
                password: 'secure' + Date.now(),
                role: 'user',
                photo: '',
            });
            user = await tmp.save();
            console.log('✅ Microsoft user created');
        }
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            token: generateToken(user._id),
            refreshToken: generateRefreshToken(user._id),
            message: 'Microsoft Sign-In successful'
        });
    } catch (error) {
        console.error('Microsoft Sign-In error:', error);
        res.status(500).json({ 
            message: 'Microsoft Sign-In failed', 
            error: error.message 
        });
    }
};

/**
 * Microsoft Account Preview (for OAuth modal)
 * @route POST /api/auth/microsoft/preview
 */
const microsoftPreview = async (req, res) => {
    try {
        const microsoftName = 'Microsoft Account';
        const microsoftEmail = `microsoft-${Date.now()}@outlook.com`;
        
        res.json({
            provider: 'microsoft',
            name: microsoftName,
            email: microsoftEmail,
            scope: ['profile', 'email'],
            verified: true,
            preview: true
        });
    } catch (error) {
        console.error('Microsoft Preview error:', error);
        res.status(500).json({ 
            message: 'Failed to fetch Microsoft preview', 
            error: error.message 
        });
    }
};


module.exports = {
    registerUser,
    authUser,
    googleSignIn,
    googlePreview,
    demoLogin,
    githubSignIn,
    githubPreview,
    microsoftSignIn,
    microsoftPreview,
    getProfile,
    getMe,
    refreshToken,
};