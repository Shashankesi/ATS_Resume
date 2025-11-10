import axios from 'axios';
import DOMPurify from 'dompurify';

// CSRF Token management
export const CSRFTokenManager = {
  init: () => {
    const token = document.querySelector('meta[name="csrf-token"]')?.content ||
                  localStorage.getItem('csrf-token');
    if (token) {
      axios.defaults.headers.common['X-CSRF-Token'] = token;
    }
  },

  getToken: () => localStorage.getItem('csrf-token'),

  setToken: (token) => {
    localStorage.setItem('csrf-token', token);
    axios.defaults.headers.common['X-CSRF-Token'] = token;
  },
};

// XSS Prevention - Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

// HTML sanitization for display
export const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'a', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
};

// CORS Configuration
export const corsConfig = {
  origin: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
};

// Secure HTTP headers
export const secureHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

// Rate limiting tracker
export const RateLimiter = {
  limits: new Map(),

  check: (key, maxAttempts = 5, windowMs = 60000) => {
    const now = Date.now();
    const userAttempts = this.limits.get(key) || [];
    
    // Clean old attempts
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.limits.set(key, recentAttempts);
    return true;
  },

  reset: (key) => {
    this.limits.delete(key);
  },

  clear: () => {
    this.limits.clear();
  },
};

// Password strength validator
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  return {
    score: strength,
    strength: strength <= 2 ? 'weak' : strength <= 3 ? 'fair' : strength <= 4 ? 'good' : 'strong',
    checks,
  };
};

// Secure password generation
export const generateSecurePassword = (length = 16) => {
  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  const allChars = Object.values(chars).join('');
  let password = '';

  // Ensure at least one character from each category
  password += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)];
  password += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)];
  password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
  password += chars.special[Math.floor(Math.random() * chars.special.length)];

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

// Secure token storage
export const secureStorage = {
  set: (key, value, encrypted = false) => {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      if (encrypted && typeof window !== 'undefined' && window.crypto) {
        // Simple encoding (in production, use a proper encryption library)
        const encoded = btoa(data);
        sessionStorage.setItem(key, encoded);
      } else {
        sessionStorage.setItem(key, data);
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  get: (key, encrypted = false) => {
    try {
      const data = sessionStorage.getItem(key);
      if (!data) return null;
      if (encrypted) {
        return JSON.parse(atob(data));
      }
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  remove: (key) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  },
};

// Content Security Policy
export const cspHeaders = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
  'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
  'font-src': ["'self'", 'fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", process.env.REACT_APP_API_URL || 'localhost:5000'],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
};

// Security headers middleware
export const applySecurityHeaders = () => {
  const headers = new Headers();
  headers.append('X-Content-Type-Options', 'nosniff');
  headers.append('X-Frame-Options', 'DENY');
  headers.append('X-XSS-Protection', '1; mode=block');
  headers.append('Referrer-Policy', 'strict-origin-when-cross-origin');
  return headers;
};

// Input validation helpers
export const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  phone: (phone) => {
    const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return regex.test(phone);
  },

  alphanumeric: (input) => /^[a-zA-Z0-9_-]*$/.test(input),

  noSpecialChars: (input) => !/[<>"'%;()&+]/.test(input),
};

// Token validation
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decode payload
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp) {
      return payload.exp * 1000 > Date.now();
    }
    
    return true;
  } catch {
    return false;
  }
};

// Initialize security
export const initializeSecurity = () => {
  // Initialize CSRF token
  CSRFTokenManager.init();

  // Set up secure headers (if using custom headers)
  Object.entries(secureHeaders).forEach(([key, value]) => {
    try {
      if (typeof document !== 'undefined') {
        const meta = document.createElement('meta');
        meta.httpEquiv = key;
        meta.content = value;
        document.head.appendChild(meta);
      }
    } catch (e) {
      console.error('Could not set security header:', e);
    }
  });

  // Clean sensitive data on tab close
  window.addEventListener('beforeunload', () => {
    secureStorage.clear();
  });
};

export default {
  CSRFTokenManager,
  sanitizeInput,
  sanitizeHTML,
  RateLimiter,
  validatePasswordStrength,
  generateSecurePassword,
  secureStorage,
  validators,
  isTokenValid,
  initializeSecurity,
};
