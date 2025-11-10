import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create a new resume?',
      answer: 'Go to your Dashboard, click on "Resume", and then "Create New Resume". Choose your preferred template and start filling in your information.'
    },
    {
      question: 'Can I download my resume as a PDF?',
      answer: 'Yes! Once you\'ve created your resume, click the "Download" button at the top right to save it as a PDF file to your computer.'
    },
    {
      question: 'What does the ATS Checker do?',
      answer: 'The ATS Checker analyzes your resume to ensure it\'s compatible with Applicant Tracking Systems used by companies. It checks formatting, keywords, and structure.'
    },
    {
      question: 'How accurate is the Resume Improver?',
      answer: 'Our AI-powered Resume Improver analyzes your content and suggests improvements based on industry standards and best practices. Suggestions are tailored to your field.'
    },
    {
      question: 'Can I use the AI tools for multiple resumes?',
      answer: 'Yes! You can create multiple resumes and use all AI tools on each one. You can also compare different versions.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Your information is never shared with third parties without your consent.'
    },
    {
      question: 'Do I need to have a resume to use Career Coach?',
      answer: 'No! You can use Career Coach without a resume. It\'s an AI assistant that can help with general career advice, job search strategies, and skill development.'
    },
    {
      question: 'How often are job recommendations updated?',
      answer: 'Job recommendations are updated daily based on the latest job postings matching your profile and skills.'
    },
    {
      question: 'Can I share my resume with employers?',
      answer: 'Yes! You can generate a public link for your resume that you can share with employers, recruiters, or anyone you choose.'
    },
    {
      question: 'What should I do if I encounter a bug?',
      answer: 'Please report any bugs you encounter through the "Support" section or email us directly. We appreciate detailed bug reports with screenshots.'
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
            Frequently Asked Questions
          </motion.h1>
          <p className="text-gray-400 text-lg">Find answers to common questions about SmartCareer</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-orange-400/30 transition-all"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                <ChevronDown 
                  className="w-5 h-5 text-orange-400 transition-transform"
                  style={{
                    transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 bg-white/2.5"
                  >
                    <p className="px-6 py-4 text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-6 border border-orange-400/30 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MessageCircle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link 
            to="/support" 
            className="inline-block px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQ;
