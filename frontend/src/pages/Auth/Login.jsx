import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../utils/toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (err) {
      showToast.error(err || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await googleSignIn();
      showToast.success('Signed in with Google! 🎉');
      navigate('/dashboard');
    } catch (err) {
      showToast.error('Google Sign-In failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 glass-card border-primary-dark/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h2 className="text-3xl font-bold text-center dark:text-text-dark">Welcome Back</h2>
        <p className="text-center text-gray-500 dark:text-gray-400">Sign in to your SmartCareer account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-card-dark dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-card-dark dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark"
                placeholder="********"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition duration-150"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-card-dark text-gray-500 dark:text-gray-400">
              OR
            </span>
          </div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium dark:text-white dark:border-slate-700 dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-slate-700 transition duration-150"
        >
          <Chrome className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Connecting...' : 'Sign in with Google'}
        </button>

        <div className="text-center text-sm dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-dark hover:text-primary-light">
            Register Here
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;