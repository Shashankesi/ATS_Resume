/**
 * Resume Editor Improvements Controller
 * Handles all resume improvement and editing features
 */

const Resume = require('../models/Resume');
const User = require('../models/User');

/**
 * Get resume with formatting suggestions
 */
exports.getResumeSuggestions = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user._id;

        const resume = await Resume.findById(resumeId);
        if (!resume || resume.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const suggestions = {
            formatIssues: [],
            contentIssues: [],
            opportunities: [],
        };

        // Check for format issues
        if (resume.summary && resume.summary.length < 50) {
            suggestions.formatIssues.push({
                type: 'summary',
                message: 'Professional summary is too brief (< 50 characters)',
                priority: 'medium',
            });
        }

        if (!resume.skills || resume.skills.length === 0) {
            suggestions.contentIssues.push({
                type: 'skills',
                message: 'No skills added. Add relevant technical and soft skills',
                priority: 'high',
            });
        }

        if (!resume.experience || resume.experience.length === 0) {
            suggestions.contentIssues.push({
                type: 'experience',
                message: 'Add at least one work experience entry',
                priority: 'high',
            });
        }

        suggestions.opportunities.push({
            type: 'metrics',
            message: 'Add quantifiable achievements (e.g., "increased sales by 25%")',
            impact: 'high',
        });

        res.json({ success: true, suggestions });
    } catch (error) {
        console.error('Error getting suggestions:', error);
        res.status(500).json({ error: 'Failed to get suggestions' });
    }
};

/**
 * Batch apply improvements to resume
 */
exports.applyBatchImprovements = async (req, res) => {
    try {
        const { resumeId, improvements } = req.body;
        const userId = req.user._id;

        if (!Array.isArray(improvements)) {
            return res.status(400).json({ error: 'Improvements must be an array' });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume || resume.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        let appliedCount = 0;

        // Apply each improvement
        for (const improvement of improvements) {
            const { section, field, value } = improvement;

            if (section === 'summary') {
                resume.summary = value;
                appliedCount++;
            } else if (section === 'skills') {
                resume.skills = value;
                appliedCount++;
            } else if (section === 'experience') {
                if (field && resume.experience) {
                    const expIndex = resume.experience.findIndex(e => e._id.toString() === field);
                    if (expIndex !== -1) {
                        resume.experience[expIndex] = { ...resume.experience[expIndex], ...value };
                        appliedCount++;
                    }
                }
            }
        }

        await resume.save();

        res.json({
            success: true,
            message: `Applied ${appliedCount} improvements`,
            resume,
        });
    } catch (error) {
        console.error('Error applying improvements:', error);
        res.status(500).json({ error: 'Failed to apply improvements' });
    }
};

/**
 * Export resume to PDF (simplified text version)
 */
exports.exportResumePDF = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user._id;

        const resume = await Resume.findById(resumeId);
        if (!resume || resume.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Generate resume text
        const resumeText = `
╔════════════════════════════════════════════════════════════╗
║                      ${resume.name?.toUpperCase() || 'RESUME'}                         ║
╚════════════════════════════════════════════════════════════╝

CONTACT INFORMATION
${resume.contact?.email ? `Email: ${resume.contact.email}` : ''}
${resume.contact?.phone ? `Phone: ${resume.contact.phone}` : ''}
${resume.contact?.location ? `Location: ${resume.contact.location}` : ''}

PROFESSIONAL SUMMARY
${resume.summary || 'N/A'}

EXPERIENCE
${resume.experience
    ?.map(
        (exp) => `
${exp.position || 'Position'} at ${exp.company || 'Company'}
${exp.startDate} - ${exp.endDate || 'Present'}
${exp.description || 'No description provided'}
`
    )
    .join('\n') || 'No experience added'}

SKILLS
${resume.skills?.join(' | ') || 'No skills added'}

EDUCATION
${resume.education
    ?.map((edu) => `${edu.degree} in ${edu.field} from ${edu.school} (${edu.year})`)
    .join('\n') || 'No education added'}

CERTIFICATIONS
${resume.certifications?.join('\n') || 'No certifications added'}
        `;

        res.setHeader('Content-Type', 'application/text');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.name}.txt"`);
        res.send(resumeText);
    } catch (error) {
        console.error('Error exporting resume:', error);
        res.status(500).json({ error: 'Failed to export resume' });
    }
};

/**
 * Clone and create resume version
 */
exports.cloneResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user._id;

        const originalResume = await Resume.findById(resumeId);
        if (!originalResume || originalResume.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Create clone
        const clonedResume = new Resume({
            ...originalResume.toObject(),
            _id: undefined,
            name: `${originalResume.name} (Copy)`,
            userId,
        });

        await clonedResume.save();

        res.json({
            success: true,
            message: 'Resume cloned successfully',
            resume: clonedResume,
        });
    } catch (error) {
        console.error('Error cloning resume:', error);
        res.status(500).json({ error: 'Failed to clone resume' });
    }
};

/**
 * Get resume improvements history
 */
exports.getImprovementsHistory = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user._id;

        const resume = await Resume.findById(resumeId);
        if (!resume || resume.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Return mock history for now
        const history = [
            {
                date: new Date(),
                action: 'Applied improvement',
                detail: 'Enhanced professional summary',
            },
            {
                date: new Date(Date.now() - 3600000),
                action: 'Added skill',
                detail: 'Added "Project Management"',
            },
            {
                date: new Date(Date.now() - 7200000),
                action: 'Improved section',
                detail: 'Enhanced experience descriptions',
            },
        ];

        res.json({ success: true, history });
    } catch (error) {
        console.error('Error getting history:', error);
        res.status(500).json({ error: 'Failed to get history' });
    }
};

/**
 * Compare resume versions
 */
exports.compareVersions = async (req, res) => {
    try {
        const { resumeId1, resumeId2 } = req.body;
        const userId = req.user._id;

        const resume1 = await Resume.findById(resumeId1);
        const resume2 = await Resume.findById(resumeId2);

        if (!resume1 || resume1.userId !== userId.toString() || !resume2 || resume2.userId !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const comparison = {
            summary: {
                before: resume1.summary,
                after: resume2.summary,
                changed: resume1.summary !== resume2.summary,
            },
            skillsCount: {
                before: resume1.skills?.length || 0,
                after: resume2.skills?.length || 0,
            },
            experienceCount: {
                before: resume1.experience?.length || 0,
                after: resume2.experience?.length || 0,
            },
        };

        res.json({ success: true, comparison });
    } catch (error) {
        console.error('Error comparing versions:', error);
        res.status(500).json({ error: 'Failed to compare versions' });
    }
};

module.exports = {
    getResumeSuggestions,
    applyBatchImprovements,
    exportResumePDF,
    cloneResume,
    getImprovementsHistory,
    compareVersions,
};
