import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with interceptors
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    const errorCode = error.response?.status;

    // Handle specific error codes
    if (errorCode === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth/login';
    } else if (errorCode === 403) {
      // Forbidden
      console.error('Forbidden: You do not have permission to access this resource');
    } else if (errorCode === 404) {
      // Not found
      console.error('Resource not found');
    } else if (errorCode === 429) {
      // Rate limited
      console.error('Too many requests. Please try again later.');
    } else if (errorCode >= 500) {
      // Server error
      console.error('Server error. Please try again later.');
    }

    return Promise.reject({
      status: errorCode,
      message: errorMessage,
      data: error.response?.data,
    });
  }
);

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  googleSignIn: (data) => apiClient.post('/auth/google', data),
  githubSignIn: (data) => apiClient.post('/auth/github', data),
  microsoftSignIn: (data) => apiClient.post('/auth/microsoft', data),
  refreshToken: () => apiClient.post('/auth/refresh', {}),
  logout: () => apiClient.post('/auth/logout', {}),
  verifyEmail: (token) => apiClient.post('/auth/verify-email', { token }),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    apiClient.post('/auth/reset-password', { token, password }),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// Resume API endpoints
export const resumeAPI = {
  create: (data) => apiClient.post('/resume', data),
  getAll: () => apiClient.get('/resume'),
  getById: (id) => apiClient.get(`/resume/${id}`),
  update: (id, data) => apiClient.put(`/resume/${id}`, data),
  delete: (id) => apiClient.delete(`/resume/${id}`),
  upload: (formData) =>
    apiClient.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  checkATS: (resumeId, jobDescription) =>
    apiClient.post(`/resume/${resumeId}/check-ats`, { jobDescription }),
  improveResume: (resumeId) => apiClient.post(`/resume/${resumeId}/improve`, {}),
  generateCoverLetter: (resumeId, jobDescription) =>
    apiClient.post(`/resume/${resumeId}/cover-letter`, { jobDescription }),
};

// AI Tools API endpoints
export const aiAPI = {
  analyzeSyntax: (text) => apiClient.post('/ai/analyze-syntax', { text }),
  improveText: (text) => apiClient.post('/ai/improve-text', { text }),
  generateSkillSuggestions: (jobTitle) =>
    apiClient.post('/ai/skill-suggestions', { jobTitle }),
  getCareerAdvice: (profile) => apiClient.post('/ai/career-advice', { profile }),
  matchJobs: (profile) => apiClient.post('/ai/match-jobs', { profile }),
  analyzeFeedback: (resume, jobDescription) =>
    apiClient.post('/ai/analyze-feedback', { resume, jobDescription }),
};

// Jobs API endpoints
export const jobsAPI = {
  getAll: (filters) => apiClient.get('/jobs', { params: filters }),
  getById: (id) => apiClient.get(`/jobs/${id}`),
  search: (query) => apiClient.get('/jobs/search', { params: { q: query } }),
  getRecommendations: () => apiClient.get('/jobs/recommendations'),
  applyForJob: (jobId) => apiClient.post(`/jobs/${jobId}/apply`, {}),
};

// User API endpoints
export const userAPI = {
  getMe: () => apiClient.get('/user/me'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  changePassword: (oldPassword, newPassword) =>
    apiClient.put('/user/change-password', { oldPassword, newPassword }),
  getSettings: () => apiClient.get('/user/settings'),
  updateSettings: (settings) => apiClient.put('/user/settings', settings),
  deleteAccount: (password) => apiClient.post('/user/delete-account', { password }),
};

// Health check
export const healthAPI = {
  check: () => apiClient.get('/health'),
};

// Error handler utility
export const handleAPIError = (error) => {
  if (error.status === 401) {
    return 'Your session has expired. Please log in again.';
  } else if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  } else if (error.status === 404) {
    return 'The requested resource was not found.';
  } else if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  } else if (error.status >= 500) {
    return 'Server error. Please try again later.';
  } else if (error.status >= 400) {
    return error.message || 'An error occurred. Please try again.';
  }
  return error.message || 'An unexpected error occurred.';
};

export default apiClient;
