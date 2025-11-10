import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Clock, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Help = () => {
  const { isDark } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What is SmartCareer?',
      answer: 'SmartCareer is an AI-powered platform that helps job seekers optimize their resumes, get career advice, and discover job opportunities tailored to their skills.',
    },
    {
      question: 'How do I create an account?',
      answer: 'Click the "Sign Up" button on the home page, enter your email and password, and follow the verification steps. You can also sign up using Google or GitHub.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! We use industry-standard encryption (JWT tokens, bcrypt password hashing) and secure HTTPS connections. Your data is stored securely on MongoDB Atlas.',
    },
    {
      question: 'How does the ATS Checker work?',
      answer: 'The ATS Checker analyzes your resume against job descriptions using AI to identify missing keywords, formatting issues, and optimization opportunities.',
    },
    {
      question: 'Can I edit my resume after uploading?',
      answer: 'Absolutely! Use the Resume Editor to make changes directly. Your changes are saved automatically to your account.',
    },
    {
      question: 'How much does SmartCareer cost?',
      answer: 'SmartCareer offers a free tier with essential features and a premium tier for advanced tools. Check our pricing page for details.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox.',
    },
    {
      question: 'What browsers are supported?',
      answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge (latest versions).',
    },
  ];

  const features = [
    {
      title: 'ATS Checker',
      description: 'Scan your resume against job descriptions to maximize ATS compatibility.',
    },
    {
      title: 'Resume Improver',
      description: 'Get AI-powered suggestions to enhance your resume content and formatting.',
    },
    {
      title: 'Cover Letter Generator',
      description: 'Create compelling cover letters tailored to specific job positions.',
    },
    {
      title: 'Skill Suggestions',
      description: 'Discover skills to add based on your target job roles.',
    },
    {
      title: 'Resume Feedback',
      description: 'Receive detailed feedback on your resume from HR professionals.',
    },
    {
      title: 'Job Recommendations',
      description: 'Find jobs that match your skills and career goals.',
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`py-12 px-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'} border-b ${
          isDark ? 'border-slate-700' : 'border-slate-200'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Help & Support
          </h1>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Find answers to common questions and get support from our team.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Features Overview
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Frequently Asked Questions
          </motion.h2>

          {/* Search Box */}
          <motion.div
            variants={itemVariants}
            className={`mb-8 px-4 py-3 rounded-lg border ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            } flex items-center gap-3`}
          >
            <Search size={20} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${
                isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
              }`}
            />
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`rounded-lg border overflow-hidden ${
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                    className={`w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {faq.question}
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFAQ === index ? 'auto' : 0,
                      opacity: expandedFAQ === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`overflow-hidden border-t ${
                      isDark ? 'border-slate-700' : 'border-slate-200'
                    }`}
                  >
                    <p
                      className={`px-6 py-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                No FAQs found. Try a different search term.
              </motion.p>
            )}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-12 border-t"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Get in Touch
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
            >
              <div className="flex items-start gap-4">
                <Mail className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Email
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    support@smartcareer.com
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
            >
              <div className="flex items-start gap-4">
                <Phone className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Phone
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
            >
              <div className="flex items-start gap-4">
                <Clock className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Hours
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Mon-Fri: 9AM - 6PM EST
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-red-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Location
                  </h3>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Help;
