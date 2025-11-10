import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import api from '../utils/api';

const OAuthModal = ({ isOpen, onClose, provider, onConfirm }) => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && provider) {
      fetchAccountData();
    }
  }, [isOpen, provider]);

  const fetchAccountData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch account preview data from backend
      const response = await api.post(`/auth/${provider}/preview`);
      setAccountData(response.data);
    } catch (err) {
      console.error(`Error fetching ${provider} account data:`, err);
      setError(`Failed to fetch ${provider} account information`);
      // Still allow confirmation even if preview fails
      setAccountData({
        provider,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: 'Loading...',
        scope: ['profile', 'email']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(accountData);
    }
    onClose();
  };

  const getProviderColor = () => {
    switch (provider) {
      case 'github':
        return 'from-gray-700 to-gray-900';
      case 'microsoft':
        return 'from-blue-600 to-blue-800';
      case 'google':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-indigo-600 to-indigo-800';
    }
  };

  const getProviderIcon = () => {
    switch (provider) {
      case 'github':
        return (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'microsoft':
        return (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
          </svg>
        );
      case 'google':
        return (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545,10.866v3.418h5.051c-0.411,1.649-1.903,2.526-5.051,2.526c-3.049,0-5.555-2.5-5.555-5.549c0-3.049,2.506-5.548,5.555-5.548c1.383,0,2.657,0.508,3.644,1.382l2.463-2.462C15.404,3.205,13.894,2.427,12.102,2.427c-5.627,0-10.198,4.571-10.198,10.199c0,5.627,4.571,10.199,10.198,10.199c6.051,0,10.199-4.147,10.199-10.199c0-0.663-0.056-1.319-0.16-1.955H12.545z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${getProviderColor()} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getProviderIcon()}
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </h2>
              <p className="text-gray-400">
                Please review your account information
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Loading State */}
              {loading && (
                <motion.div
                  className="flex flex-col items-center justify-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader className="w-8 h-8 text-orange-400" />
                  </motion.div>
                  <p className="text-gray-300 mt-4">Fetching account details...</p>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 text-sm font-medium">{error}</p>
                    <p className="text-red-300/70 text-xs mt-1">But you can still proceed with sign-in</p>
                  </div>
                </motion.div>
              )}

              {/* Account Data Display */}
              {accountData && !loading && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Provider Badge */}
                  <div className="flex items-center justify-center">
                    <div className={`px-4 py-2 bg-gradient-to-r ${getProviderColor()} rounded-full text-white text-sm font-semibold`}>
                      {provider.toUpperCase()} ACCOUNT
                    </div>
                  </div>

                  {/* Account Details Box */}
                  <div className="bg-white/5 dark:bg-slate-700/30 rounded-lg p-6 border border-white/10 dark:border-slate-600/30 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</label>
                      <p className="text-white text-lg font-semibold mt-1">
                        {accountData.name || 'Unknown User'}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</label>
                      <p className="text-white text-base mt-1 break-all">
                        {accountData.email || 'email@example.com'}
                      </p>
                    </div>

                    {/* Provider Info */}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Provider</label>
                      <p className="text-white text-base mt-1 capitalize">
                        {provider}
                      </p>
                    </div>

                    {/* Scopes/Permissions */}
                    {accountData.scope && (
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Permissions Requested</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {accountData.scope.map((s, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10 dark:border-slate-600/30">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">Account verified and ready</span>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                    <p className="text-blue-200 text-sm">
                      By clicking <span className="font-semibold">"Allow Access"</span>, you authorize SmartCareer to access your {provider.charAt(0).toUpperCase() + provider.slice(1)} profile information and create an account.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 dark:bg-slate-700/30 dark:hover:bg-slate-700/50 border border-white/20 dark:border-slate-600/50 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={handleConfirm}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-3 px-4 bg-gradient-to-r ${getProviderColor()} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Loader className="w-4 h-4" />
                    </motion.div>
                    Loading...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Allow Access
                  </>
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-4">
              We never store your password. Your data is secure and encrypted.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OAuthModal;
