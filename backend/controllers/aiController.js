const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
const Resume = require('../models/Resume');
const AIHistory = require('../models/AIHistory');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_MODE = process.env.AI_MODE || 'MOCK';

let genAI;
if (AI_MODE === 'GEMINI' && GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log('✅ Gemini API Initialized.');
} else {
    console.warn('⚠️ Running in MOCK AI Mode. Set AI_MODE=GEMINI and GEMINI_API_KEY to switch.');
}

// Mock responses for testing (simplified)
const mockJobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Google', location: 'Mountain View, CA', salary: '$200k-$250k', match: 95 },
    { id: 2, title: 'Full Stack Developer', company: 'Meta', location: 'Menlo Park, CA', salary: '$180k-$220k', match: 88 },
    { id: 3, title: 'Backend Engineer', company: 'Amazon', location: 'Seattle, WA', salary: '$170k-$210k', match: 82 },
    { id: 4, title: 'DevOps Engineer', company: 'Stripe', location: 'San Francisco, CA', salary: '$190k-$230k', match: 78 },
    { id: 5, title: 'Machine Learning Engineer', company: 'OpenAI', location: 'San Francisco, CA', salary: '$250k-$300k', match: 75 },
];

const mockResponses = {
    'generateSummary': (payload) => {
        const { role = 'Professional', skills = [] } = payload;
        return `Experienced professional with expertise in ${skills.slice(0, 3).join(', ') || 'software development'}. 
Seeking ${role} opportunities to leverage technical skills and drive business impact. 
Strong track record of delivering scalable solutions and mentoring teams.`;
    },
    'rewriteBullets': (payload) => {
        const { bulletText = '' } = payload;
        return `• Architected and deployed scalable microservices reducing infrastructure costs by 40%
• Led cross-functional team of 5+ engineers to deliver product on time and under budget
• Optimized database queries achieving 3x performance improvement for 10M+ daily users`;
    },
    'analyzeATS': (payload) => ({ 
        score: Math.floor(Math.random() * (95 - 60 + 1) + 60), 
        keywordMatch: Math.floor(Math.random() * 20) + 70, 
        skillMatch: Math.floor(Math.random() * 20) + 65, 
        formattingFlags: ['Missing quantifiable metrics', 'Job title mismatch'],
        suggestions: ['Add "Node.js" explicitly to skills.', 'Rewrite Experience bullet point 3 using the STAR method.'],
    }),
    'chatAssistant': (payload) => {
        const { message = '' } = payload;
        return `I'd recommend focusing on measurable achievements in your resume. 
${message.includes('resume') ? 'Consider adding metrics like "improved by 50%" or "managed $2M budget".' : ''}
What specific career goals are you working towards?`;
    },
    'generateCoverLetter': (payload) => {
        const { jobTitle = 'Position', company = 'Company', skills = [] } = payload;
        return `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at ${company}. 
With my expertise in ${skills.slice(0, 2).join(' and ') || 'software development'}, 
I am confident I can drive significant impact for your team.

In my previous role, I successfully delivered [key achievement], 
which resulted in [measurable outcome]. I am particularly drawn to ${company}'s 
[mission/product] and would love the opportunity to contribute to your success.

Thank you for considering my application.

Best regards,
[Your Name]`;
    },
    'skillGap': (payload) => {
        const { currentSkills = [], targetRole = 'Senior Developer' } = payload;
        return {
            currentSkills,
            targetRole,
            skillsToLearn: ['Kubernetes', 'AWS Advanced', 'System Design'],
            recommendedCourses: [
                { title: 'Kubernetes Mastery', platform: 'Udemy', duration: '20 hours' },
                { title: 'AWS Solutions Architect', platform: 'Coursera', duration: '4 weeks' }
            ],
            estimatedLearningTime: '8-12 weeks',
            careerProgression: 'Your skills align well. Focus on cloud technologies for rapid growth.'
        };
    },
};

/**
 * Calls Google Gemini API
 */
const callGemini = async (prompt) => {
    if (!genAI) throw new Error('Gemini client not initialized.');
    
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        throw new Error(`Gemini Request Failed: ${error.message}`);
    }
};

/**
 * Executes the request to the Gemini API (or other provider).
 */
const callOpenAI = async (prompt) => {
    // Fallback to Gemini
    return callGemini(prompt);
};

/**
 * Generic handler for all AI features (Summary, Rewriter, Cover Letter, etc.)
 * @route POST /api/ai/generic
 */
const handleAiRequest = async (req, res) => {
    const { feature, payload } = req.body;
    
    if (!feature || !payload) {
        return res.status(400).json({ message: 'Missing required fields: feature and payload' });
    }

    try {
        if (AI_MODE === 'MOCK') {
            if (!mockResponses[feature]) {
                return res.status(404).json({ message: `Mock feature '${feature}' not implemented.` });
            }
            await new Promise(resolve => setTimeout(resolve, 500)); 
            const mockResult = mockResponses[feature](payload);
            // Respond to client first
            res.json({ 
                result: mockResult,
                mode: 'MOCK',
            });
            // Non-blocking history log
            try {
                if (req.user?._id) {
                    await AIHistory.create({
                        user: req.user._id,
                        feature,
                        mode: 'MOCK',
                        payloadSummary: JSON.stringify(payload).slice(0, 500),
                        resultSummary: (typeof mockResult === 'string' ? mockResult : JSON.stringify(mockResult)).slice(0, 500),
                    });
                }
            } catch (e) { /* swallow logging errors */ }
            return;
        } 
        
        // --- GEMINI MODE ---
        let prompt;
        // Construct prompt (simplified)
        switch (feature) {
            case 'generateSummary':
                prompt = `Generate a professional, 3-line career summary. Target role: ${payload.role}. Skills: ${payload.skills?.join(', ')}.`;
                break;
            case 'rewriteBullets':
                prompt = `Rewrite this into 3 quantified, action-result statements for a resume: "${payload.bulletText}".`;
                break;
            case 'analyzeATS':
                prompt = `Analyze this resume (${JSON.stringify(payload.resumeJson)}) against this JD ("${payload.jobDescription}"). Provide JSON: { score, suggestions }.`;
                break;
            case 'generateCoverLetter':
                prompt = `Generate a professional cover letter for: Job Title: ${payload.jobTitle}, Company: ${payload.company}, Your Skills: ${payload.skills?.join(', ')}, Experience: ${payload.experience}.`;
                break;
            case 'skillGap':
                prompt = `Analyze skill gaps. Current Skills: ${payload.currentSkills?.join(', ')}. Target Role: ${payload.targetRole}. Recommend learning path and courses.`;
                break;
            case 'chatAssistant':
                prompt = `The user is asking a career question: "${payload.message}". Answer professionally and helpfully.`;
                break;
            default:
                return res.status(400).json({ message: `Unknown AI feature: ${feature}` });
        }

        const aiResponseText = await callGemini(prompt);
        // Attempt to parse JSON for structured responses
        let result = aiResponseText;
        if (feature === 'analyzeATS') {
            try {
                result = JSON.parse(aiResponseText.match(/```json\s*([\s\S]*?)\s*```/)[1] || aiResponseText);
            } catch (jsonError) {
                console.error(`Failed to parse AI JSON response for ${feature}`);
            }
        }
        
        res.json({ result, mode: 'GEMINI' });
        try {
            if (req.user?._id) {
                await AIHistory.create({
                    user: req.user._id,
                    feature,
                    mode: 'GEMINI',
                    payloadSummary: JSON.stringify(payload).slice(0, 500),
                    resultSummary: (typeof result === 'string' ? result : JSON.stringify(result)).slice(0, 500),
                });
            }
        } catch (e) { /* ignore */ }

    } catch (error) {
        res.status(500).json({ message: 'AI processing failed', error: error.message });
    }
};

/**
 * Dedicated handler for Job Recommendations
 * @route POST /api/ai/jobs
 */
const getJobRecommendations = async (req, res) => {
    const { skills, intent } = req.body;

    if (AI_MODE === 'MOCK') {
        await new Promise(resolve => setTimeout(resolve, 800)); 
        const result = mockJobs;
        res.json({ result, mode: 'MOCK' });
        try {
            if (req.user?._id) {
                await AIHistory.create({
                    user: req.user._id,
                    feature: 'jobRecommendations',
                    mode: 'MOCK',
                    payloadSummary: JSON.stringify({ skills, intent }).slice(0, 500),
                    resultSummary: JSON.stringify(result).slice(0, 500),
                });
            }
        } catch (e) { /* ignore */ }
        return;
    }
    
    // In GEMINI mode, call AI to refine/rank mockJobs or real job data.
    if (AI_MODE === 'GEMINI' && genAI) {
        try {
            const prompt = `Given these skills: ${skills?.join(', ')}, recommend the best job titles and types. Return a JSON list.`;
            const aiResponse = await callGemini(prompt);
            const result = mockJobs.slice(0, 3);
            res.json({ result, mode: 'GEMINI', aiSuggestion: aiResponse });
            try {
                if (req.user?._id) {
                    await AIHistory.create({
                        user: req.user._id,
                        feature: 'jobRecommendations',
                        mode: 'GEMINI',
                        payloadSummary: JSON.stringify({ skills, intent }).slice(0, 500),
                        resultSummary: JSON.stringify(result).slice(0, 500),
                    });
                }
            } catch (e) { /* ignore */ }
            return;
        } catch (error) {
            console.error('Gemini job recommendation failed:', error);
            const result = mockJobs.slice(0, 2);
            res.json({ result, mode: 'GEMINI_FALLBACK' });
            try {
                if (req.user?._id) {
                    await AIHistory.create({
                        user: req.user._id,
                        feature: 'jobRecommendations',
                        mode: 'GEMINI_FALLBACK',
                        payloadSummary: JSON.stringify({ skills, intent }).slice(0, 500),
                        resultSummary: JSON.stringify(result).slice(0, 500),
                    });
                }
            } catch (e) { /* ignore */ }
            return;
        }
    }
    
    // Fallback to mock
    res.json({ result: mockJobs.slice(0, 2), mode: 'MOCK' });
};

// --- Admin Controller Functions (Used in adminRoutes) ---

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: req.params.id }); 
            // In a real app, also delete all their resumes
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalResumes = await Resume.countDocuments();
        const activeUsers = await User.countDocuments({ updatedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }); // Last 30 days
        const totalAiCalls = await AIHistory.countDocuments();
        const aiCalls24h = await AIHistory.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

        res.json({
            totalUsers,
            totalResumes,
            activeUsers,
            totalAiCalls,
            aiCalls24h,
            systemHealth: 'Good' // Placeholder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

// Get recent AI activity for the authenticated user
const getHistory = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);
        const entries = await AIHistory.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('feature mode createdAt');
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching AI history', error: error.message });
    }
};


module.exports = {
    handleAiRequest,
    getJobRecommendations,
    // Admin methods
    getUsers,
    deleteUser,
    getStats,
    getHistory
};