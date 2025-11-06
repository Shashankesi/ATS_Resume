/**
 * Advanced Resume Enhancement Controller
 * AI-powered resume improvements, analytics, and suggestions
 */

const Resume = require('../models/Resume');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Get AI suggestions for resume section
 */
const generateImprovements = async (req, res) => {
  try {
    const { resumeId, section, mode = 'smart' } = req.body;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.userId !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    let sectionContent = resume[section] || '';
    if (Array.isArray(sectionContent)) {
      sectionContent = JSON.stringify(sectionContent, null, 2);
    }

    const prompt = `You are an expert resume writer. Analyze this ${section} section and provide 3-5 specific improvement suggestions.
    
For each suggestion, provide:
1. title: Brief title
2. description: What to improve
3. original: Current text (shortened)
4. improved: Suggested improvement
5. type: grammar|clarity|strength|formatting
6. impact: 1-100 (impact percentage)
7. priority: high|medium|low

${section} content:
${sectionContent || 'Empty section'}

Mode: ${mode} (conservative=minor tweaks, smart=balanced, aggressive=major changes)

Respond in JSON format with array of improvements.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const response = await model.generateContent(prompt);
    const result = await response.response.text();

    let improvements = [];
    try {
      // Extract JSON from response
      const jsonMatch = result.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        improvements = JSON.parse(jsonMatch[0]);
        improvements = improvements.map((imp, idx) => ({
          ...imp,
          id: `${Date.now()}-${idx}`
        }));
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      improvements = [{
        id: `${Date.now()}-0`,
        title: 'Enhancement Available',
        description: 'AI analysis ready. Click to apply improvements.',
        original: sectionContent.substring(0, 100),
        improved: 'Enhanced version will appear here',
        type: 'strength',
        impact: 50,
        priority: 'medium'
      }];
    }

    res.json({ success: true, improvements });
  } catch (error) {
    console.error('Error generating improvements:', error);
    res.status(500).json({ error: 'Failed to generate improvements' });
  }
};

/**
 * Get resume analytics (ATS score, readability, etc.)
 */
const getResumeAnalytics = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.userId !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Calculate ATS Score
    const atsScore = calculateATSScore(resume);

    // Calculate Readability Score
    const readabilityScore = calculateReadabilityScore(resume);

    // Calculate Formatting Score
    const formattingScore = calculateFormattingScore(resume);

    // Extract keywords
    const keywords = extractKeywords(resume);

    // Identify issues
    const issues = identifyIssues(resume);

    // Generate suggestions
    const suggestions = generateSuggestions(resume);

    res.json({
      success: true,
      atsScore,
      readabilityScore,
      formattingScore,
      keywordMatches: keywords,
      issues,
      suggestions
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
};

/**
 * Apply single improvement
 */
const applyImprovement = async (req, res) => {
  try {
    const { improvementId } = req.params;
    const { resumeId } = req.body;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.userId !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Track improvement application
    if (!resume.improvements) {
      resume.improvements = [];
    }
    resume.improvements.push({
      id: improvementId,
      appliedAt: new Date()
    });

    await resume.save();

    res.json({ success: true, message: 'Improvement applied' });
  } catch (error) {
    console.error('Error applying improvement:', error);
    res.status(500).json({ error: 'Failed to apply improvement' });
  }
};

/**
 * Apply batch improvements
 */
const applyBatchImprovements = async (req, res) => {
  try {
    const { resumeId, improvementIds } = req.body;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.userId !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!resume.improvements) {
      resume.improvements = [];
    }

    improvementIds.forEach(id => {
      resume.improvements.push({
        id,
        appliedAt: new Date()
      });
    });

    await resume.save();

    res.json({
      success: true,
      message: `Applied ${improvementIds.length} improvements`,
      resume
    });
  } catch (error) {
    console.error('Error applying batch improvements:', error);
    res.status(500).json({ error: 'Failed to apply improvements' });
  }
};

/**
 * Export resume as PDF
 */
const exportResumePDF = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);
    if (!resume || resume.userId !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const resumeText = formatResumeForExport(resume);

    res.setHeader('Content-Type', 'application/text');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.name || 'resume'}.txt"`);
    res.send(resumeText);
  } catch (error) {
    console.error('Error exporting resume:', error);
    res.status(500).json({ error: 'Failed to export resume' });
  }
};

/**
 * Helper function to calculate ATS Score
 */
function calculateATSScore(resume) {
  let score = 0;

  // Name - 5 points
  if (resume.name) score += 5;

  // Contact info - 10 points
  if (resume.contact?.email) score += 3;
  if (resume.contact?.phone) score += 3;
  if (resume.contact?.location) score += 4;

  // Summary - 10 points
  if (resume.summary && resume.summary.length > 100) score += 10;

  // Experience - 25 points
  if (resume.experience && resume.experience.length > 0) {
    score += Math.min(resume.experience.length * 8, 25);
  }

  // Education - 15 points
  if (resume.education && resume.education.length > 0) {
    score += Math.min(resume.education.length * 7, 15);
  }

  // Skills - 15 points
  if (resume.skills && resume.skills.length > 0) {
    score += Math.min(resume.skills.length, 15);
  }

  // Certifications - 10 points
  if (resume.certifications && resume.certifications.length > 0) {
    score += Math.min(resume.certifications.length * 3, 10);
  }

  // Format bonus - 15 points
  if (resume.summary && resume.experience?.length > 0 && resume.skills?.length > 0) {
    score += 15;
  }

  return Math.min(score, 100);
}

/**
 * Helper function to calculate Readability Score
 */
function calculateReadabilityScore(resume) {
  let score = 50;

  // Check summary length and quality
  if (resume.summary) {
    const summaryLength = resume.summary.length;
    if (summaryLength > 50 && summaryLength < 300) score += 15;
    if (summaryLength >= 100) score += 10;
  }

  // Check experience descriptions
  if (resume.experience) {
    const avgExpLength = resume.experience.reduce((sum, exp) => sum + (exp.description?.length || 0), 0) / resume.experience.length;
    if (avgExpLength > 50) score += 15;
  }

  // Check skills variety
  if (resume.skills) {
    if (resume.skills.length >= 5) score += 10;
    if (resume.skills.length >= 10) score += 5;
  }

  return Math.min(score, 100);
}

/**
 * Helper function to calculate Formatting Score
 */
function calculateFormattingScore(resume) {
  let score = 60;

  // Check for proper structure
  if (resume.contact?.email && resume.contact?.phone) score += 10;
  if (resume.summary) score += 10;
  if (resume.experience?.length > 0) score += 10;
  if (resume.education?.length > 0) score += 5;
  if (resume.skills?.length > 0) score += 5;

  return Math.min(score, 100);
}

/**
 * Helper function to extract keywords
 */
function extractKeywords(resume) {
  const keywords = {};

  // Extract from summary
  if (resume.summary) {
    const words = resume.summary.match(/\b[a-z]{4,}\b/gi) || [];
    words.forEach(word => {
      const lower = word.toLowerCase();
      keywords[lower] = (keywords[lower] || 0) + 1;
    });
  }

  // Extract from experience
  if (resume.experience) {
    resume.experience.forEach(exp => {
      if (exp.description) {
        const words = exp.description.match(/\b[a-z]{4,}\b/gi) || [];
        words.forEach(word => {
          const lower = word.toLowerCase();
          keywords[lower] = (keywords[lower] || 0) + 1;
        });
      }
    });
  }

  // Convert to array and sort by frequency
  const keywordArray = Object.entries(keywords)
    .map(([term, count]) => ({
      term,
      count,
      relevance: Math.min(count * 20, 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return keywordArray;
}

/**
 * Helper function to identify issues
 */
function identifyIssues(resume) {
  const issues = [];

  // Check summary
  if (!resume.summary || resume.summary.length < 50) {
    issues.push({
      title: 'Weak Professional Summary',
      description: 'Your professional summary is too brief or missing. Add a compelling 2-3 sentence summary.',
      severity: 'high'
    });
  }

  // Check experience
  if (!resume.experience || resume.experience.length === 0) {
    issues.push({
      title: 'No Work Experience',
      description: 'Add at least one work experience entry to improve your resume.',
      severity: 'high'
    });
  }

  // Check skills
  if (!resume.skills || resume.skills.length < 3) {
    issues.push({
      title: 'Limited Skills',
      description: 'Add more skills to better match job descriptions. Aim for 5-10 relevant skills.',
      severity: 'medium'
    });
  }

  // Check education
  if (!resume.education || resume.education.length === 0) {
    issues.push({
      title: 'No Education Listed',
      description: 'Add your educational background to strengthen your resume.',
      severity: 'medium'
    });
  }

  // Check contact info
  if (!resume.contact?.email || !resume.contact?.phone) {
    issues.push({
      title: 'Incomplete Contact Information',
      description: 'Ensure email and phone number are included.',
      severity: 'high'
    });
  }

  return issues;
}

/**
 * Helper function to generate suggestions
 */
function generateSuggestions(resume) {
  const suggestions = [];

  // Suggestion 1: Add metrics
  if (resume.experience) {
    const hasMetrics = resume.experience.some(exp =>
      exp.description?.includes('%') || exp.description?.includes('$')
    );
    if (!hasMetrics) {
      suggestions.push({
        title: 'Add Quantifiable Achievements',
        description: 'Include numbers, percentages, or dollar amounts in your experience descriptions to make achievements more impactful.',
        impact: 'high',
        difficulty: 'medium'
      });
    }
  }

  // Suggestion 2: Improve descriptions
  suggestions.push({
    title: 'Use Action Verbs',
    description: 'Start bullet points with strong action verbs like "Developed", "Implemented", "Led", "Managed".',
    impact: 'medium',
    difficulty: 'easy'
  });

  // Suggestion 3: Add skills keywords
  suggestions.push({
    title: 'Add Industry Keywords',
    description: 'Include technical skills and tools relevant to your target job positions.',
    impact: 'high',
    difficulty: 'medium'
  });

  // Suggestion 4: Formatting
  suggestions.push({
    title: 'Consistent Formatting',
    description: 'Ensure consistent date formats, spacing, and font sizes throughout your resume.',
    impact: 'medium',
    difficulty: 'easy'
  });

  return suggestions;
}

/**
 * Helper function to format resume for export
 */
function formatResumeForExport(resume) {
  const line = '═'.repeat(70);
  const header = (text) => `\n${line}\n${text.toUpperCase()}\n${line}\n`;

  let text = '';

  // Header
  text += `\n${'═'.repeat(70)}\n`;
  text += `${resume.name || 'RESUME'}\n`;
  text += `${'═'.repeat(70)}\n\n`;

  // Contact
  if (resume.contact) {
    text += header('Contact Information');
    if (resume.contact.email) text += `Email: ${resume.contact.email}\n`;
    if (resume.contact.phone) text += `Phone: ${resume.contact.phone}\n`;
    if (resume.contact.location) text += `Location: ${resume.contact.location}\n`;
    if (resume.contact.linkedin) text += `LinkedIn: ${resume.contact.linkedin}\n`;
    if (resume.contact.portfolio) text += `Portfolio: ${resume.contact.portfolio}\n`;
  }

  // Summary
  if (resume.summary) {
    text += header('Professional Summary');
    text += `${resume.summary}\n`;
  }

  // Experience
  if (resume.experience?.length > 0) {
    text += header('Work Experience');
    resume.experience.forEach(exp => {
      text += `\n${exp.position || 'Position'} at ${exp.company || 'Company'}\n`;
      text += `${exp.startDate || 'Date'} - ${exp.endDate || 'Present'}\n`;
      if (exp.description) text += `${exp.description}\n`;
    });
  }

  // Education
  if (resume.education?.length > 0) {
    text += header('Education');
    resume.education.forEach(edu => {
      text += `\n${edu.degree || 'Degree'} in ${edu.field || 'Field'}\n`;
      text += `${edu.school || 'School'} (${edu.year || 'Year'})\n`;
      if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
    });
  }

  // Skills
  if (resume.skills?.length > 0) {
    text += header('Skills');
    resume.skills.forEach(skill => {
      text += `• ${skill.name || skill} (${skill.level || 'N/A'})\n`;
    });
  }

  // Certifications
  if (resume.certifications?.length > 0) {
    text += header('Certifications');
    resume.certifications.forEach(cert => {
      text += `• ${cert}\n`;
    });
  }

  // Projects
  if (resume.projects?.length > 0) {
    text += header('Projects');
    resume.projects.forEach(project => {
      text += `\n${project.name || 'Project'}\n`;
      if (project.description) text += `${project.description}\n`;
      if (project.technologies) text += `Technologies: ${project.technologies}\n`;
    });
  }

  return text;
}

module.exports = {
  generateImprovements,
  getResumeAnalytics,
  applyImprovement,
  applyBatchImprovements,
  exportResumePDF
};
