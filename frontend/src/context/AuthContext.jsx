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
      throw error.response?.data?.message || 'Login failed';
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
      throw error.response?.data?.message || 'Registration failed';
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Flow
  const googleSignIn = async () => {
    if (!isFirebaseConfigured()) {
        console.error('Firebase is not configured. Cannot perform Google Sign-In.');
        throw new Error('Google Sign-In service unavailable. Check VITE_FIREBASE_* keys.');
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
      throw error.code || 'Google Sign-In failed';
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
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};