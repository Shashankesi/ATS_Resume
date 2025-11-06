const fs = require('fs').promises;
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<string>} Extracted text
 */
const extractTextFromPDF = async (filePath) => {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(fileBuffer);
        return pdfData.text;
    } catch (error) {
        throw new Error(`PDF extraction failed: ${error.message}`);
    }
};

/**
 * Extract text from DOCX file
 * @param {string} filePath - Path to DOCX file
 * @returns {Promise<string>} Extracted text
 */
const extractTextFromDOCX = async (filePath) => {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        return result.value;
    } catch (error) {
        throw new Error(`DOCX extraction failed: ${error.message}`);
    }
};

/**
 * Main function to extract text from any supported format
 * @param {string} filePath - Path to uploaded file
 * @returns {Promise<string>} Extracted text
 */
const extractResumeText = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    
    if (ext === '.pdf') {
        return await extractTextFromPDF(filePath);
    } else if (ext === '.docx' || ext === '.doc') {
        return await extractTextFromDOCX(filePath);
    } else if (ext === '.txt') {
        return await fs.readFile(filePath, 'utf-8');
    } else {
        throw new Error(`Unsupported file format: ${ext}`);
    }
};

/**
 * Advanced keyword extraction and skill matching
 */
const SKILL_KEYWORDS = {
    'programming_languages': [
        'javascript', 'python', 'java', 'c\\+\\+', 'c#', 'php', 'ruby', 'go', 'rust',
        'typescript', 'kotlin', 'swift', 'objective-c', 'scala', 'perl', 'r', 'matlab',
        'sql', 'html', 'css', 'bash', 'shell', 'lua', 'groovy', 'dart', 'elixir'
    ],
    'frameworks': [
        'react', 'angular', 'vue', 'express', 'django', 'flask', 'spring', 'laravel',
        'rails', 'next.js', 'nuxt', 'gatsby', 'svelte', 'ember', 'backbone', 'meteor',
        'nest.js', 'fastapi', 'gin', 'fiber'
    ],
    'databases': [
        'mongodb', 'mysql', 'postgresql', 'redis', 'elasticsearch', 'dynamodb',
        'cassandra', 'firestore', 'oracle', 'sqlite', 'mariadb', 'neo4j', 'hbase'
    ],
    'devops_tools': [
        'docker', 'kubernetes', 'jenkins', 'gitlab', 'github', 'aws', 'azure',
        'gcp', 'terraform', 'ansible', 'vagrant', 'circleci', 'travis', 'gitlab-ci',
        'github-actions'
    ],
    'soft_skills': [
        'leadership', 'communication', 'teamwork', 'problem-solving', 'project management',
        'critical thinking', 'adaptability', 'creativity', 'collaboration', 'mentoring'
    ]
};

/**
 * Extract skills from resume text
 * @param {string} text - Resume text
 * @returns {Object} Skills grouped by category
 */
const extractSkills = (text) => {
    const lowerText = text.toLowerCase();
    const foundSkills = {};

    for (const [category, keywords] of Object.entries(SKILL_KEYWORDS)) {
        foundSkills[category] = [];
        for (const keyword of keywords) {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            if (regex.test(lowerText)) {
                foundSkills[category].push(keyword);
            }
        }
    }

    return foundSkills;
};

/**
 * Extract email from resume text
 * @param {string} text - Resume text
 * @returns {string|null} Email if found
 */
const extractEmail = (text) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
};

/**
 * Extract phone number from resume text
 * @param {string} text - Resume text
 * @returns {string|null} Phone number if found
 */
const extractPhoneNumber = (text) => {
    const phoneRegex = /(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/;
    const match = text.match(phoneRegex);
    return match ? match[0].trim() : null;
};

/**
 * Count years of experience from resume text
 * @param {string} text - Resume text
 * @returns {number} Estimated years of experience
 */
const estimateYearsOfExperience = (text) => {
    const experienceMatches = text.match(/(\d{1,2})\+?\s*years?/gi) || [];
    let totalYears = 0;

    for (const match of experienceMatches) {
        const years = parseInt(match.match(/\d+/)[0]);
        totalYears = Math.max(totalYears, years);
    }

    return totalYears || 0;
};

/**
 * Count education qualifications
 * @param {string} text - Resume text
 * @returns {Object} Count of each degree type
 */
const extractEducation = (text) => {
    const lowerText = text.toLowerCase();
    return {
        bachelors: (lowerText.match(/bachelor|b\.?s|b\.?a/gi) || []).length > 0,
        masters: (lowerText.match(/master|m\.?s|m\.?a|m\.?b\.?a/gi) || []).length > 0,
        phd: (lowerText.match(/phd|doctorate|ph\.?d/gi) || []).length > 0,
        certifications: (lowerText.match(/certified|certification|certificate/gi) || []).length,
    };
};

/**
 * Calculate ATS Score (Advanced)
 * Based on skills match, keyword density, formatting
 * @param {string} text - Resume text
 * @param {string} jobDescription - Job description (optional)
 * @returns {Object} Detailed ATS score breakdown
 */
const calculateATSScore = (text, jobDescription = '') => {
    let score = 0;
    const breakdown = {
        skills_match: 0,
        keyword_density: 0,
        formatting: 0,
        experience: 0,
        education: 0,
    };

    // 1. Skills match (30 points max)
    const skills = extractSkills(text);
    const totalSkillsFound = Object.values(skills).reduce((sum, arr) => sum + arr.length, 0);
    breakdown.skills_match = Math.min(30, totalSkillsFound * 3);

    // 2. Keyword density (20 points max)
    const keywords = ['experience', 'achievement', 'managed', 'developed', 'led', 'improved', 'designed'];
    let keywordCount = 0;
    keywords.forEach(kw => {
        keywordCount += (text.toLowerCase().match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length;
    });
    breakdown.keyword_density = Math.min(20, Math.floor(keywordCount / 5) * 5);

    // 3. Formatting (15 points max)
    const hasLineBreaks = text.split('\n').length > 5;
    const hasProperStructure = text.toLowerCase().match(/experience|education|skills|summary/g) || [];
    breakdown.formatting = hasLineBreaks && hasProperStructure.length >= 2 ? 15 : 10;

    // 4. Experience (20 points max)
    const yearsOfExp = estimateYearsOfExperience(text);
    breakdown.experience = Math.min(20, yearsOfExp * 2);

    // 5. Education (15 points max)
    const education = extractEducation(text);
    breakdown.education = (education.bachelors ? 10 : 0) + (education.masters ? 5 : 0);

    // Total
    score = Object.values(breakdown).reduce((a, b) => a + b, 0);

    // Job description matching (if provided)
    let jobMatchPercentage = 0;
    if (jobDescription) {
        const jdSkills = extractSkills(jobDescription);
        const jdSkillsList = Object.values(jdSkills).flat();
        const matchCount = jdSkillsList.filter(skill => 
            text.toLowerCase().includes(skill.toLowerCase())
        ).length;
        jobMatchPercentage = jdSkillsList.length > 0 ? 
            Math.round((matchCount / jdSkillsList.length) * 100) : 0;
    }

    return {
        overall_score: Math.min(100, score),
        breakdown,
        job_match_percentage: jobMatchPercentage,
        suggestions: generateATSSuggestions(breakdown, totalSkillsFound),
    };
};

/**
 * Generate ATS improvement suggestions
 * @param {Object} breakdown - Score breakdown
 * @param {number} skillsCount - Number of skills found
 * @returns {Array} Array of suggestions
 */
const generateATSSuggestions = (breakdown, skillsCount) => {
    const suggestions = [];

    if (breakdown.skills_match < 20) {
        suggestions.push('Add more industry-specific skills and keywords to your resume');
    }
    if (breakdown.keyword_density < 15) {
        suggestions.push('Use action verbs like "managed", "developed", "led", "improved" more frequently');
    }
    if (breakdown.formatting < 15) {
        suggestions.push('Improve formatting with clear section headers (Experience, Education, Skills)');
    }
    if (breakdown.experience < 15) {
        suggestions.push('Highlight more quantifiable achievements and years of experience');
    }
    if (breakdown.education < 10) {
        suggestions.push('Include your education details and certifications');
    }

    return suggestions;
};

module.exports = {
    extractResumeText,
    extractSkills,
    extractEmail,
    extractPhoneNumber,
    estimateYearsOfExperience,
    extractEducation,
    calculateATSScore,
    generateATSSuggestions
};
