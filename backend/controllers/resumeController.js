const Resume = require('../models/Resume');
const User = require('../models/User');
const path = require('path');
const {
    extractResumeText,
    extractSkills,
    extractEmail,
    extractPhoneNumber,
    estimateYearsOfExperience,
    extractEducation,
    calculateATSScore
} = require('../utils/resumeParser');

const { getStorageBucket } = require('../utils/firebaseAdmin');

// Helper function to generate a unique slug
const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50) + '-' + Math.random().toString(36).substring(2, 6);
};

// @desc    Create a new resume
const createResume = async (req, res) => {
    try {
        const { name, data } = req.body;
        
        const resume = new Resume({
            user: req.user._id,
            name: name || 'Untitled Resume',
            data: data || { profile: { name: req.user.name, email: req.user.email, summary: '' }, sections: [] }
        });

        const createdResume = await resume.save();

        await User.findByIdAndUpdate(req.user._id, { $push: { resumeRefs: createdResume._id } });

        res.status(201).json(createdResume);
    } catch (error) {
        res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
};

// @desc    Update a resume (including auto-drafting and versioning)
const updateResume = async (req, res) => {
    try {
        const { data, template, isATSMode } = req.body;

        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        
        if (req.body.createVersion) {
             resume.versions.push({
                data: resume.data,
                note: req.body.versionNote || `Auto-save at ${new Date().toISOString()}`
             });
             if (resume.versions.length > 10) { resume.versions.shift(); }
        }

        resume.data = data || resume.data;
        resume.template = template || resume.template;
        resume.isATSMode = isATSMode !== undefined ? isATSMode : resume.isATSMode;

        const updatedResume = await resume.save();
        res.json(updatedResume);

    } catch (error) {
        res.status(500).json({ message: 'Error updating resume', error: error.message });
    }
};

// @desc    Get a single resume
const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) { return res.status(404).json({ message: 'Resume not found' }); }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
};

// @desc    List all resumes for the user
const listResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Error listing resumes', error: error.message });
    }
};

// @desc    Get a public resume by slug
const getPublicResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ publicSlug: req.params.slug }).select('-user -versions -updatedAt');
        if (!resume) { return res.status(404).json({ message: 'Public resume not found or disabled' }); }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching public resume', error: error.message });
    }
};

// @desc    Export a resume to PDF (server-side using Puppeteer - placeholder)
const exportResumeToPdf = async (req, res) => {
    // This is a placeholder as Puppeteer requires specific server environment setup.
    // In dev, the client-side export handles the PDF creation.
    console.warn("Attempting server-side PDF export (Puppeteer). Ensure environment is ready.");
    
    // Fallback response for dev environment
    res.status(500).json({ message: "Server-side PDF export currently uses client-side fallback in development." });
    
    // The full Puppeteer logic is in the previous response and omitted here to prevent execution issues in simple Node environments.
};

// @desc    Create a shareable public slug
const createPublicSlug = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) { return res.status(404).json({ message: 'Resume not found' }); }
        if (!resume.publicSlug) { resume.publicSlug = generateSlug(resume.name); }
        await resume.save();
        res.json({ publicSlug: resume.publicSlug });
    } catch (error) {
        res.status(500).json({ message: 'Error creating public slug', error: error.message });
    }
};

// @desc    Upload a resume file (PDF/DOCX) and create a Resume entry
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

    const { originalname, filename, path: filePath, size } = req.file;
        const ext = path.extname(originalname).toLowerCase();

        // Validate file type
        const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
        if (!allowedExtensions.includes(ext)) {
            return res.status(400).json({ 
                message: `Invalid file type. Supported types: ${allowedExtensions.join(', ')}` 
            });
        }

        // Attempt to upload to Firebase Storage (if configured). Falls back to local uploads.
        let uploadedUrl = `/uploads/${filename}`;
        try {
            const bucket = getStorageBucket();
            if (bucket) {
                const destination = `resumes/${req.user._id}/${filename}`;
                // Upload file to bucket
                await bucket.upload(filePath, { destination, metadata: { contentType: req.file.mimetype } });
                const fileRef = bucket.file(destination);
                // Try to create a long-lived signed URL (1 year) for read access
                try {
                    const [signedUrl] = await fileRef.getSignedUrl({ action: 'read', expires: Date.now() + 1000 * 60 * 60 * 24 * 365 });
                    uploadedUrl = signedUrl;
                } catch (e) {
                    // If signed URL fails, try making public (best-effort) and construct public URL
                    try {
                        await fileRef.makePublic();
                        uploadedUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
                    } catch (errMakePublic) {
                        console.warn('Could not make file public or generate signed URL:', errMakePublic.message);
                    }
                }
            }
        } catch (err) {
            console.warn('Firebase upload skipped/failure, using local file. Reason:', err && err.message);
        }

        // Extract text from resume
        let resumeText = '';
        try {
            resumeText = await extractResumeText(filePath);
        } catch (error) {
            return res.status(400).json({ 
                message: `Failed to parse resume: ${error.message}` 
            });
        }

        // Extract data from resume text
        const skills = extractSkills(resumeText);
        const email = extractEmail(resumeText);
        const phone = extractPhoneNumber(resumeText);
        const experience = estimateYearsOfExperience(resumeText);
        const education = extractEducation(resumeText);
        const atsScore = calculateATSScore(resumeText);

        // Create resume entry with extracted data
        const resume = new Resume({
            user: req.user._id,
            name: originalname.replace(ext, ''),
            originalFileName: originalname,
            fileSize: size,
            fileFormat: ext.slice(1).toUpperCase(),
            rawText: resumeText.slice(0, 50000), // Store first 50k chars
            extractedData: {
                email: email || req.user.email,
                phone: phone || '',
                yearsOfExperience: experience,
                skills: skills,
                education: education,
            },
            latestATSScore: {
                score: atsScore.overall_score,
                breakdown: atsScore.breakdown,
                suggestions: atsScore.suggestions,
                calculatedAt: new Date(),
            },
            data: {
                profile: {
                    name: req.user.name || '',
                    email: email || req.user.email || '',
                    phone: phone || '',
                    summary: ''
                },
                sections: []
            }
        });

        const createdResume = await resume.save();
        await User.findByIdAndUpdate(req.user._id, { $push: { resumeRefs: createdResume._id } });
        res.status(201).json({
            message: 'File uploaded and analyzed successfully',
            file: {
                originalname,
                filename,
                size,
                url: uploadedUrl,
                format: ext.slice(1).toUpperCase(),
            },
            resume: createdResume,
            analysis: {
                atsScore: atsScore.overall_score,
                skillsFound: Object.values(skills).flat().length,
                yearsOfExperience: experience,
                suggestions: atsScore.suggestions.slice(0, 3), // Top 3 suggestions
            }
        });
    } catch (error) {
        console.error('Upload failed:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};


module.exports = {
    createResume,
    getResume,
    updateResume,
    listResumes,
    exportResumeToPdf,
    createPublicSlug,
    getPublicResume,
    uploadResume
};