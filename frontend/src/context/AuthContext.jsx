import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '../utils/firebaseClient';
import { signInWithPopup, signOut } from 'firebase/auth';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to set tokens and user state
  const setAuthData = (userData, token) => {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  // Local Auth (Email/Password) Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Call backend for authentication and local JWT
      const response = await api.post('/auth/login', { email, password });

      const { token, ...userData } = response.data;
      setAuthData(userData, token);
    } catch (error) {
      console.error('Local Login Error:', error);

      // Provide more specific error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password. Please check your credentials.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Invalid login data.');
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Local Auth (Email/Password) Register
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      // Call backend for registration and local JWT
      const response = await api.post('/auth/register', { name, email, password });
      const { token, ...userData } = response.data;
      setAuthData(userData, token);
    } catch (error) {
      console.error('Registration Error:', error);

      // Provide more specific error messages
      if (error.response?.status === 400) {
        if (error.response.data?.message?.includes('already exists')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        } else if (error.response.data?.errors) {
          // Handle validation errors
          const validationErrors = error.response.data.errors;
          const firstError = validationErrors[0];
          throw new Error(firstError.message);
        } else {
          throw new Error(error.response.data?.message || 'Invalid registration data.');
        }
      } else if (error.response?.status === 429) {
        throw new Error('Too many registration attempts. Please try again later.');
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Flow
  const googleSignIn = async () => {
    if (!isFirebaseConfigured()) {
        console.error('Firebase is not configured. Cannot perform Google Sign-In.');
        throw new Error('Google Sign-In service is currently unavailable. Please try email registration instead.');
    }

    setLoading(true);
    try {
      // 1. Sign in with Firebase Popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // 2. Send ID token to backend for verification and local user creation/retrieval
      const response = await api.post('/auth/google', { idToken });

      const { token, ...userData } = response.data;
      setAuthData(userData, token);

    } catch (error) {
      console.error('Google Sign-In Error:', error);

      // Provide more specific error messages
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Google Sign-In popup was blocked. Please allow popups and try again.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Google Sign-In was cancelled. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid Google account. Please try with a different account.');
      } else if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later or use email registration.');
      } else {
        throw new Error('Google Sign-In failed. Please try email registration instead.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo Google Sign-In (for testing when Firebase is unavailable)
  const demoGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Use demo credentials for testing
      const demoData = {
        email: 'demo@smartcareer.com',
        name: 'Demo User',
        picture: null
      };

      // Send demo data to backend for fallback authentication
      const response = await api.post('/auth/google', demoData);

      const { token, ...userData } = response.data;
      setAuthData(userData, token);

      console.log('Demo Google Sign-In successful');
    } catch (error) {
      console.error('Demo Google Sign-In Error:', error);

      // Fallback to demo login endpoint if Google endpoint fails
      try {
        console.log('Falling back to demo login endpoint...');
        const response = await api.post('/auth/demo');
        const { token, ...userData } = response.data;
        setAuthData(userData, token);
        console.log('Demo login fallback successful');
      } catch (fallbackError) {
        console.error('Demo login fallback failed:', fallbackError);
        throw new Error('Demo authentication failed. Please check server connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  // GitHub Sign-In (OAuth alternative)
  const githubSignIn = async () => {
    setLoading(true);
    try {
      // Send GitHub auth request to backend
      const response = await api.post('/auth/github');
      
      const { token, ...userData } = response.data;
      setAuthData(userData, token);
      
      console.log('GitHub Sign-In successful');
    } catch (error) {
      console.error('GitHub Sign-In Error:', error);
      throw new Error('GitHub Sign-In failed. Please try email registration instead.');
    } finally {
      setLoading(false);
    }
  };

  // Microsoft Sign-In (OAuth alternative)
  const microsoftSignIn = async () => {
    setLoading(true);
    try {
      // Send Microsoft auth request to backend
      const response = await api.post('/auth/microsoft');
      
      const { token, ...userData } = response.data;
      setAuthData(userData, token);
      
      console.log('Microsoft Sign-In successful');
    } catch (error) {
      console.error('Microsoft Sign-In Error:', error);
      throw new Error('Microsoft Sign-In failed. Please try email registration instead.');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (isFirebaseConfigured()) {
          await signOut(auth); // Sign out of Firebase
      }
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Check persistent session on load
  const checkSession = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        // Verify token and fetch user data via lightweight endpoint
        const { data } = await api.get('/auth/me'); 
        setUser(data);
      } catch (error) {
        // Token expired or invalid, force logout
        console.error('Session check failed, logging out:', error.message);
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const value = {
    user,
    loading,
    login,
    register,
    googleSignIn,
    demoGoogleSignIn,
    githubSignIn,
    microsoftSignIn,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};