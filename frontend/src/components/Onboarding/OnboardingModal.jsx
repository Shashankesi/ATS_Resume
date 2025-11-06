import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle } from 'lucide-react';

/**
 * OnboardingModal Component
 * Product tour with 5 steps, shown only on first login
 */
const OnboardingModal = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to SmartCareer! 🎉',
      description: "Your AI-powered career assistant is ready to help you succeed. Let's take a quick tour to get you started.",
      icon: '🚀',
      action: 'Next',
    },
    {
      title: 'Upload Your Resume 📄',
      description: 'Start by uploading your resume. Our AI will analyze it, extract key information, and provide ATS-score optimization tips.',
      icon: '📤',
      action: 'Next',
    },
    {
      title: 'Explore AI Tools 🤖',
      description: 'Access powerful AI features: Generate professional summaries, create cover letters, get job recommendations, and chat with your career coach.',
      icon: '✨',
      action: 'Next',
    },
    {
      title: 'Analyze Your Profile 📊',
      description: 'Check your ATS score, identify skill gaps, see job matches, and track your progress with our advanced analytics dashboard.',
      icon: '📈',
      action: 'Next',
    },
    {
      title: "You're All Set! 🎯",
      description: 'Go to your dashboard to start building your career. Remember: the more you use SmartCareer, the better it gets!',
      icon: '⭐',
      action: 'Get Started',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark as completed in localStorage
      localStorage.setItem('onboarding-done', 'true');
      onClose();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-done', 'true');
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-slate-200" />
            </button>

            {/* Progress bar */}
            <div className="h-1 bg-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Main content */}
            <div className="p-12 text-center min-h-[500px] flex flex-col justify-center">
              <motion.div
                key={currentStep}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-8xl"
                >
                  {steps[currentStep].icon}
                </motion.div>

                {/* Title and description */}
                <div>
                  <h2 className="text-4xl font-bold text-slate-100 mb-4">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2 pt-4">
                  {steps.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentStep
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                          : idx < currentStep
                          ? 'bg-slate-500 w-2'
                          : 'bg-slate-700 w-2'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer with buttons */}
            <div className="bg-slate-900/50 px-12 py-6 flex items-center justify-between gap-4 border-t border-slate-700">
              <button
                onClick={handleSkip}
                className="px-6 py-2 text-slate-300 hover:text-slate-100 font-medium transition-colors"
              >
                Skip
              </button>

              <div className="flex items-center gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 font-medium transition-colors"
                  >
                    Back
                  </button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 font-semibold transition-all flex items-center gap-2"
                >
                  {steps[currentStep].action}
                  {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                  {currentStep === steps.length - 1 && <CheckCircle className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
