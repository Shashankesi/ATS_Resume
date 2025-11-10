import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const isDarkMode = document.documentElement.classList.contains('dark');

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`min-h-screen flex items-center justify-center ${
            isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
          } p-4`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className={`max-w-md w-full rounded-2xl ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } shadow-2xl p-8 border ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}
          >
            {/* Error Icon */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <AlertTriangle className="w-16 h-16 text-red-500 relative" />
              </div>
            </motion.div>

            {/* Error Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl font-bold text-center mb-2 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              Oops! Something Went Wrong
            </motion.h1>

            {/* Error Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`text-center mb-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              We encountered an unexpected error. Please try again or return to the home page.
            </motion.p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`mb-6 p-4 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}
              >
                <summary
                  className={`cursor-pointer font-semibold ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Error Details
                </summary>
                <pre
                  className={`mt-3 overflow-auto text-xs max-h-40 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.details>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-3"
            >
              <motion.button
                onClick={this.resetError}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <RefreshCw size={18} />
                Try Again
              </motion.button>

              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 font-semibold rounded-lg transition-all duration-200"
                >
                  <Home size={18} />
                  Go Home
                </motion.button>
              </Link>
            </motion.div>

            {/* Error Count Badge */}
            {this.state.errorCount > 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-xs text-center mt-4 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                Error count: {this.state.errorCount}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
