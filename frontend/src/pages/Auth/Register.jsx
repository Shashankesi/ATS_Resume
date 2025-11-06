import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../utils/toast';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      showToast.success('Account created successfully! 🎉');
      navigate('/dashboard');
    } catch (err) {
      showToast.error(err || 'Registration failed. Please try again.');
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
        <h2 className="text-3xl font-bold text-center dark:text-text-dark">Create Account</h2>
        <p className="text-center text-gray-500 dark:text-gray-400">Join SmartCareer to build your future</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Full Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-card-dark dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Email Address</label>
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
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white dark:bg-card-dark dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark"
                placeholder="******** (min 6 chars)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition duration-150"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-dark hover:text-primary-light">
            Sign In
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;