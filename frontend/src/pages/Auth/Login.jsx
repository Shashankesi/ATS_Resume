import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../utils/toast';
import { motion } from 'framer-motion';
import OAuthModal from '../../components/OAuthModal';
import AnimatedBackground from '../../components/AnimatedBackground';

const Login = () => {
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem('rememberedEmail') ? true : false);
  const [oauthModalOpen, setOAuthModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const { login, googleSignIn, demoGoogleSignIn, githubSignIn, microsoftSignIn } = useAuth();
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
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
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
    setOAuthModalOpen(true);
    setSelectedProvider('google');
  };

  const handleOAuthConfirm = async (provider) => {
    setError('');
    setIsSubmitting(true);
    try {
      if (provider === 'google') {
        await googleSignIn();
      } else if (provider === 'github') {
        await githubSignIn();
      } else if (provider === 'microsoft') {
        await microsoftSignIn();
      }
      
      showToast.success(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}! 🎉`);
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      const errorMsg = err.message || `Sign-in failed. Please try again.`;
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div 
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Animated Background with Particles */}
        <AnimatedBackground />

        <motion.div 
          className="w-full max-w-md relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
        {/* Premium Glassmorphism Card */}
        <motion.div 
          className="bg-white/5 dark:bg-slate-800/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-600/30 relative overflow-hidden group"
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            y: -4
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-pink-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
          
          {/* Inner content wrapper */}
          <div className="relative z-10">
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
            <motion.div 
              whileHover={{ y: -2 }} 
              transition={{ type: 'spring', stiffness: 200 }}
              layout
            >
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                <div className="flex items-center gap-2">
                  Email Address
                  {email && <motion.span className="text-xs text-green-400 flex items-center gap-1" initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-3 h-3" /></motion.span>}
                </div>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-orange-300 transition">
                  <Mail className="h-5 w-5 text-orange-400 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-pink-500/10 rounded-lg transition-all duration-300 pointer-events-none"></div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-3 bg-white/5 dark:bg-slate-700/30 border border-white/20 dark:border-slate-600/50 group-focus-within:border-orange-400/50 group-focus-within:bg-white/10 dark:group-focus-within:bg-slate-600/40 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>
            
            {/* Password Field */}
            <motion.div 
              whileHover={{ y: -2 }} 
              transition={{ type: 'spring', stiffness: 200 }}
              layout
            >
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                <div className="flex items-center gap-2">
                  Password
                  {password && <motion.span className="text-xs text-green-400 flex items-center gap-1" initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-3 h-3" /></motion.span>}
                </div>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-orange-300 transition">
                  <Lock className="h-5 w-5 text-orange-400 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-pink-500/10 rounded-lg transition-all duration-300 pointer-events-none"></div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full pl-12 pr-12 py-3 bg-white/5 dark:bg-slate-700/30 border border-white/20 dark:border-slate-600/50 group-focus-within:border-orange-400/50 group-focus-within:bg-white/10 dark:group-focus-within:bg-slate-600/40 rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-400 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 disabled:shadow-orange-500/20 flex justify-center items-center gap-2 transition duration-300 relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={isSubmitting ? { x: ['-100%', '100%'] } : { x: '-100%' }}
                transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0 }}
                style={{ pointerEvents: 'none' }}
              />
              <motion.span
                initial={false}
                animate={{ opacity: isSubmitting ? 0 : 1 }}
              >
                <LogIn className="w-5 h-5" />
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: isSubmitting ? 1 : 0, scale: isSubmitting ? 1 : 0.8 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </>
                ) : null}
              </motion.span>
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

          {/* Google Sign-In Button - Premium */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            type="button"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 px-6 bg-gradient-to-br from-white/15 to-white/5 hover:from-white/25 hover:to-white/10 border-2 border-white/30 hover:border-orange-400/70 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 flex justify-center items-center gap-3 shadow-2xl hover:shadow-orange-500/40 disabled:shadow-none backdrop-blur-sm group relative overflow-hidden"
          >
            {/* Shimmer effect on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: 'none' }}
            />
            
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <motion.svg 
                className="w-6 h-6 transition-transform" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <path d="M12.545,10.866v3.418h5.051c-0.411,1.649-1.903,2.526-5.051,2.526c-3.049,0-5.555-2.5-5.555-5.549c0-3.049,2.506-5.548,5.555-5.548c1.383,0,2.657,0.508,3.644,1.382l2.463-2.462C15.404,3.205,13.894,2.427,12.102,2.427c-5.627,0-10.198,4.571-10.198,10.199c0,5.627,4.571,10.199,10.198,10.199c6.051,0,10.199-4.147,10.199-10.199c0-0.663-0.056-1.319-0.16-1.955H12.545z" fill="white"/>
              </motion.svg>
              <span className="text-lg">
                {isSubmitting ? 'Connecting...' : 'Google'}
              </span>
            </div>
          </motion.button>

          {/* Demo Sign-In Button - Quick Test */}
          <motion.button
            onClick={async () => {
              setError('');
              setIsSubmitting(true);
              try {
                await demoGoogleSignIn();
                showToast.success('Demo account created! 🎉');
                setTimeout(() => navigate('/dashboard'), 500);
              } catch (err) {
                const errorMsg = err.message || 'Demo login failed. Please try again.';
                setError(errorMsg);
                showToast.error(errorMsg);
              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={isSubmitting}
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/30 hover:border-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed text-green-200 hover:text-green-100 font-semibold rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-green-500/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>
              {isSubmitting ? 'Testing...' : 'Try Demo Account'}
            </span>
          </motion.button>

          {/* GitHub Sign-In Button */}
          <motion.button
            onClick={() => {
              setOAuthModalOpen(true);
              setSelectedProvider('github');
            }}
            disabled={isSubmitting}
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-gray-700/50 to-gray-800/50 hover:from-gray-600/50 hover:to-gray-700/50 border border-gray-500/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-100 hover:text-white font-semibold rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-white/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>
              {isSubmitting && selectedProvider === 'github' ? 'Connecting...' : 'GitHub'}
            </span>
          </motion.button>

          {/* Microsoft Sign-In Button */}
          <motion.button
            onClick={() => {
              setOAuthModalOpen(true);
              setSelectedProvider('microsoft');
            }}
            disabled={isSubmitting}
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 hover:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed text-blue-200 hover:text-blue-100 font-semibold rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
            </svg>
            <span>
              {isSubmitting && selectedProvider === 'microsoft' ? 'Connecting...' : 'Microsoft'}
            </span>
          </motion.button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-orange-400 hover:text-orange-300 transition">
              Sign Up
            </Link>
          </p>
          </div>
        </motion.div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>

      {/* OAuth Modal */}
      <OAuthModal
        isOpen={oauthModalOpen}
        onClose={() => setOAuthModalOpen(false)}
        provider={selectedProvider}
        onConfirm={() => handleOAuthConfirm(selectedProvider)}
      />
    </>
  );
};

export default Login;