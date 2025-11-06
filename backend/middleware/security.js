const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

/**
 * Helper function to get client IP (handles IPv4 and IPv6)
 */
const getClientIp = (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
           req.headers['x-real-ip'] ||
           req.connection.remoteAddress ||
           req.socket.remoteAddress ||
           req.ip ||
           '127.0.0.1';
};

/**
 * Global Rate Limiter
 * 100 requests per 15 minutes per IP
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    skip: (req) => process.env.NODE_ENV === 'test', // Skip in test environment
});

/**
 * Auth Rate Limiter
 * 5 attempts per 15 minutes per email (stricter for login/register)
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: true, // Don't count successful requests
    keyGenerator: (req) => req.body?.email || getClientIp(req)
});

/**
 * AI Request Rate Limiter
 * 20 AI requests per hour per user
 */
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: 'Too many AI requests, please try again later.',
    skipSuccessfulRequests: false,
    keyGenerator: (req) => req.user?._id?.toString() || getClientIp(req)
});

/**
 * Upload Rate Limiter
 * 10 uploads per day per user
 */
const uploadLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 10,
    message: 'Too many file uploads today, please try again tomorrow.',
    keyGenerator: (req) => req.user?._id?.toString() || getClientIp(req)
});

/**
 * Enhanced Helmet Configuration
 */
const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", process.env.NODE_ENV === 'development' ? '*' : 'https://smartcareer.com'],
            fontSrc: ["'self'", "https://fonts.googleapis.com"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"]
        }
    },
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    xContentTypeOptions: true,
    xFrameOptions: { action: 'deny' },
    xPoweredBy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

/**
 * CORS Configuration for Production
 */
const getCorsConfig = () => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];
    
    return {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset'],
        maxAge: 86400 // 24 hours
    };
};

module.exports = {
    globalLimiter,
    authLimiter,
    aiLimiter,
    uploadLimiter,
    helmetConfig,
    getCorsConfig
};
