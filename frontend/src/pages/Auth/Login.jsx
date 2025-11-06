import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Chrome, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../utils/toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast.success('Welcome back! 👋');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      const errorMsg = err || 'Login failed. Please try again.';
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await googleSignIn();
      showToast.success('Signed in with Google! 🎉');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      const errorMsg = 'Google Sign-In failed. Please try again.';
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Card */}
        <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Mail className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent">Welcome Back</h2>
            <p className="text-gray-400 mt-2">Sign in to your SmartCareer account</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 200 }}>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>
            
            {/* Password Field */}
            <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 200 }}>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-orange-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-400 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg flex justify-center items-center gap-2 transition duration-200"
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 dark:bg-slate-800/50 text-gray-400">OR</span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 border border-white/20 dark:border-slate-600/50 hover:border-orange-400/50 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex justify-center items-center gap-2"
          >
            <Chrome className="w-5 h-5" />
            {isSubmitting ? 'Connecting...' : 'Sign in with Google'}
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-orange-400 hover:text-orange-300 transition">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;