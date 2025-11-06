import api from './api';

const AI_MODE = import.meta.env.VITE_AI_MODE || 'MOCK'; 
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

// --- MOCK RESPONSES (Client Side Fallback) ---
const mockResponsesClient = {
    'generateSummary': (payload) => `[MOCK CLIENT] Expert MERN developer with ${payload.experienceYears || '5+'} years of experience building scalable, dynamic web applications. Goal: ${payload.role}.`,
    'rewriteBullets': (payload) => `[MOCK CLIENT] • Achieved X by doing Y. • Rewritten: ${payload.bulletText} using strong verbs.`,
    'analyzeATS': (payload) => ({ 
        score: Math.floor(Math.random() * (85 - 70 + 1) + 70), // Simulate a good score
        keywordMatch: 80,
        skillMatch: 75,
        formattingFlags: ['[MOCK] Use single column layout.', '[MOCK] Avoid complex fonts.'],
        suggestions: ['[MOCK] Add quantifiable results (numbers).', '[MOCK] Match JD keywords exactly.'],
        mode: 'MOCK_CLIENT'
    }),
    'chatAssistant': (payload) => `[MOCK CLIENT] I am a mock AI assistant. You asked about: ${payload.message}. Focus on measurable achievements!`,
    'skillGapAnalyzer': (payload) => ({ 
        gaps: ['[MOCK] Microservices (Docker/Kubernetes)'],
        prioritySteps: ['[MOCK] Complete Docker course.'],
        courseRecs: ['[MOCK] Kubernetes Essentials (Coursera)'],
    }),
};

// Export mockResponsesClient so components can use client-side fallback directly when needed
export { mockResponsesClient };

/**
 * Executes a generic AI feature call by proxying through the backend.
 * @param {string} feature The feature name (e.g., 'generateSummary')
 * @param {object} payload The data required by the feature
 * @returns {object} The AI response object.
 */
const callBackendAI = async (feature, payload) => {
    try {
        const response = await api.post('/ai/generic', { feature, payload });
        return response.data.result;
    } catch (error) {
        console.error(`Backend AI call for ${feature} failed:`, error);
        // Fallback to client-side mock if backend call fails or is in MOCK mode
        if (mockResponsesClient[feature]) {
            console.warn(`Falling back to client-side mock for ${feature}`);
            return mockResponsesClient[feature](payload);
        }
        throw new Error(error.response?.data?.message || `AI Request Failed for ${feature}`);
    }
};

// --- AI Feature Wrappers ---

export const generateSummary = (profileData, experienceData, role) => {
    const payload = { 
        profile: profileData, 
        experience: experienceData, 
        role 
    };
    return callBackendAI('generateSummary', payload);
};

export const rewriteBullets = (bulletText) => {
    const payload = { bulletText };
    return callBackendAI('rewriteBullets', payload);
};

export const analyzeATS = (resumeJson, jobDescription) => {
    const payload = { resumeJson, jobDescription };
    return callBackendAI('analyzeATS', payload);
};

export const generateCoverLetter = (resumeJson, jobTitle) => {
    const payload = { resumeJson, jobTitle };
    return callBackendAI('generateCoverLetter', payload);
};

export const getJobRecommendations = async (skills, intent) => {
    try {
        // Dedicated endpoint for job recs
        const response = await api.post('/ai/jobs', { skills, intent });
        return response.data.result;
    } catch (error) {
        console.error('Job Recommendations failed:', error);
        // Fallback to a simple mock structure if API fails
        return [{ id: 99, title: "[MOCK FAIL] Backend Service Not Available", company: "ErrorCorp", location: "Global", matchScore: 50, skills: ['Fixing', 'APIs'] }];
    }
};

export const skillGapAnalyzer = (currentSkills, desiredRoleSkills, desiredRole) => {
    const payload = { currentSkills, desiredRoleSkills, desiredRole };
    return callBackendAI('skillGapAnalyzer', payload);
};

export const interviewPrep = (role, experienceLevel) => {
    const payload = { role, experienceLevel };
    return callBackendAI('interviewPrep', payload);
};

export const chatAssistant = (message, history, resumeJson) => {
    const payload = { message, history, resumeJson };
    return callBackendAI('chatAssistant', payload);
};

export const getAIMode = () => AI_MODE;