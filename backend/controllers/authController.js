const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyIdToken } = require('../utils/firebaseAdmin');

// Helper to generate a local JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Local Auth: Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role: 'user' });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
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
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Google Sign-In
const googleSignIn = async (req, res) => {
    const { idToken } = req.body;
    const decodedToken = await verifyIdToken(idToken);

    if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid Google ID token' });
    }

    let user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
        user = await User.create({
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || decodedToken.email.split('@')[0],
            photo: decodedToken.picture || '',
            role: 'user',
        });
    }

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            token: generateToken(user._id), // Return a local JWT
        });
    } else {
        res.status(500).json({ message: 'Failed to process user after token verification' });
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


module.exports = {
    registerUser,
    authUser,
    googleSignIn,
    getProfile,
    getMe
};