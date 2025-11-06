import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Sparkles, Target, MessageSquare, FileText, TrendingUp, 
  Award, CheckCircle2, Flame, Rocket, Brain, Shield 
} from 'lucide-react';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Zap,
      title: 'ATS Checker',
      description: 'Analyze and optimize your resume for ATS compatibility. Get actionable insights to improve your score.',
      benefits: ['Real-time scoring', 'Keyword matching', 'Formatting suggestions'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Sparkles,
      title: 'Resume Improver',
      description: 'AI-powered suggestions to enhance your resume content with proven techniques.',
      benefits: ['Smart recommendations', 'One-click apply', 'Performance metrics'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Skills Intelligence',
      description: 'Get personalized skill recommendations based on your target role and market trends.',
      benefits: ['Gap analysis', 'Learning paths', 'Market insights'],
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: FileText,
      title: 'Cover Letter Generator',
      description: 'Create tailored cover letters in minutes with AI assistance.',
      benefits: ['Template-based', 'Customizable', 'Download ready'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Job Finder',
      description: 'Discover job opportunities that match your skills and career goals.',
      benefits: ['Smart matching', 'Saved jobs', 'Apply tracking'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageSquare,
      title: 'Career Coach AI',
      description: 'Get instant answers to career questions from your AI assistant.',
      benefits: ['24/7 availability', 'Expert advice', 'Interview prep'],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful AI-Driven Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to take your career to the next level
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 group-hover:border-orange-500/50 transition-all duration-300" />

                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"
                />

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl mb-6 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-6">{feature.description}</p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all inline-flex items-center gap-2"
          >
            Explore All Features
            <Rocket className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
