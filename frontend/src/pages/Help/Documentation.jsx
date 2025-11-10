import React from 'react';
import { ArrowLeft, BookOpen, FileText, Code, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Documentation = () => {
  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      content: `
        Welcome to SmartCareer! Here's how to get started:
        
        1. Create an account on the Sign Up page
        2. Fill in your basic profile information
        3. Start building your first resume
        4. Use our AI tools to enhance your career
      `
    },
    {
      title: 'Building Your Resume',
      icon: FileText,
      content: `
        Create a professional resume:
        
        1. Go to Dashboard → Resume
        2. Click "Create New Resume"
        3. Choose a template (Classic, Modern, Minimal, ATS)
        4. Fill in your information section by section
        5. Use the preview to see your changes in real-time
        6. Download or share your resume
      `
    },
    {
      title: 'Using AI Tools',
      icon: Code,
      content: `
        Leverage our AI-powered features:
        
        • ATS Checker: Optimize your resume for Applicant Tracking Systems
        • Resume Improver: Get suggestions to enhance your resume content
        • Skills Intelligence: Discover trending skills in your field
        • Job Recommendations: Find jobs matching your skills
        • Career Coach: Chat with AI for career guidance
        • Cover Letter Generator: Create compelling cover letters
      `
    },
    {
      title: 'Settings & Preferences',
      icon: Settings,
      content: `
        Customize your experience:
        
        1. Go to Profile Settings
        2. Update your personal information
        3. Change your password
        4. Manage notification preferences
        5. Choose your default template
        6. Toggle dark/light theme
      `
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Documentation
          </motion.h1>
          <p className="text-gray-400 text-lg">Learn how to use SmartCareer effectively</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-orange-400/30 transition-all"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-orange-400" />
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-6 border border-orange-400/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Need More Help?</h3>
          <p className="text-gray-300">
            Can't find what you're looking for? Check out our <Link to="/faq" className="text-orange-400 hover:text-orange-300">FAQ</Link> or <Link to="/support" className="text-orange-400 hover:text-orange-300">contact support</Link>.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Documentation;
