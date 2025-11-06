const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Auth validation schemas
 */
const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number'),
    handleValidationErrors
];

const validateLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const validateGoogleSignIn = [
    body('idToken')
        .notEmpty().withMessage('Google ID token is required')
        .isString().withMessage('ID token must be a string'),
    handleValidationErrors
];

/**
 * Resume validation schemas
 */
const validateCreateResume = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage('Resume name must be 1-200 characters'),
    body('data')
        .optional()
        .isObject().withMessage('Resume data must be an object'),
    handleValidationErrors
];

const validateUpdateResume = [
    param('id')
        .isMongoId().withMessage('Invalid resume ID'),
    body('data')
        .optional()
        .isObject().withMessage('Resume data must be an object'),
    body('template')
        .optional()
        .isIn(['classic', 'modern', 'minimal', 'ats']).withMessage('Invalid template name'),
    body('isATSMode')
        .optional()
        .isBoolean().withMessage('isATSMode must be boolean'),
    handleValidationErrors
];

const validateGetResume = [
    param('id')
        .isMongoId().withMessage('Invalid resume ID'),
    handleValidationErrors
];

const validateGetPublicResume = [
    param('slug')
        .trim()
        .notEmpty().withMessage('Slug is required')
        .isLength({ min: 1, max: 100 }).withMessage('Invalid slug format'),
    handleValidationErrors
];

const validateCreatePublicSlug = [
    param('id')
        .isMongoId().withMessage('Invalid resume ID'),
    handleValidationErrors
];

/**
 * AI Feature validation schemas
 */
const validateAiRequest = [
    body('feature')
        .notEmpty().withMessage('Feature is required')
        .isIn(['generateSummary', 'rewriteBullets', 'analyzeATS', 'chatAssistant', 'generateCoverLetter', 'skillGap', 'jobRecommendations'])
        .withMessage('Invalid feature'),
    body('payload')
        .notEmpty().withMessage('Payload is required')
        .isObject().withMessage('Payload must be an object'),
    handleValidationErrors
];

const validateJobRecommendations = [
    body('skills')
        .optional()
        .isArray().withMessage('Skills must be an array')
        .custom(arr => {
            if (arr.length > 50) throw new Error('Too many skills (max 50)');
            return arr.every(s => typeof s === 'string');
        }).withMessage('Each skill must be a string'),
    body('intent')
        .optional()
        .trim()
        .isLength({ min: 1, max: 500 }).withMessage('Intent must be 1-500 characters'),
    handleValidationErrors
];

const validateChatMessage = [
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 1, max: 1000 }).withMessage('Message must be 1-1000 characters'),
    handleValidationErrors
];

/**
 * Admin validation schemas
 */
const validateDeleteUser = [
    param('id')
        .isMongoId().withMessage('Invalid user ID'),
    handleValidationErrors
];

/**
 * Pagination validation
 */
const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be >= 1')
        .toInt(),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100')
        .toInt(),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    validateRegister,
    validateLogin,
    validateGoogleSignIn,
    validateCreateResume,
    validateUpdateResume,
    validateGetResume,
    validateGetPublicResume,
    validateCreatePublicSlug,
    validateAiRequest,
    validateJobRecommendations,
    validateChatMessage,
    validateDeleteUser,
    validatePagination
};
