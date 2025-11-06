const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { uploadLimiter } = require('../middleware/security');
const { 
    validateCreateResume,
    validateUpdateResume,
    validateGetResume,
    validateGetPublicResume,
    validateCreatePublicSlug
} = require('../middleware/validation');
const { 
    createResume, 
    getResume, 
    updateResume, 
    listResumes,
    exportResumeToPdf,
    createPublicSlug,
    getPublicResume,
    uploadResume
} = require('../controllers/resumeController');
const upload = require('../utils/upload');

const router = express.Router();

// Public route to view shared resumes
router.get('/public/:slug', validateGetPublicResume, getPublicResume);

// All routes below require authentication
router.use(protect);

router.post('/', validateCreateResume, createResume);
router.get('/', listResumes);

// Resume file upload with rate limiting
router.post('/upload', uploadLimiter, upload.single('file'), uploadResume);

// CRUD operations on a single resume
router.route('/:id')
    .get(validateGetResume, getResume)
    .put(validateUpdateResume, updateResume);

// Special features
router.post('/:id/export', validateGetResume, exportResumeToPdf);
router.post('/:id/public-slug', validateCreatePublicSlug, createPublicSlug);

module.exports = router;