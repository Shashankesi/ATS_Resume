import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, MessageSquare, Briefcase, Sparkles, Brain } from 'lucide-react';

const AIToolsHub = ({ onToolClick }) => {
  const tools = [
    {
      id: 'summary',
      name: 'AI Summary',
      description: 'Generate a professional career summary',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      accentColor: 'blue',
    },
    {
      id: 'ats',
      name: 'ATS Analyzer',
      description: 'Analyze your resume for ATS compatibility',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      accentColor: 'purple',
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter',
      description: 'Create tailored cover letters with AI',
      icon: MessageSquare,
      color: 'from-pink-500 to-pink-600',
      accentColor: 'pink',
    },
    {
      id: 'jobs',
      name: 'Job Matching',
      description: 'Find jobs matching your skills',
      icon: Briefcase,
      color: 'from-emerald-500 to-emerald-600',
      accentColor: 'emerald',
    },
    {
      id: 'chat',
      name: 'Career Coach',
      description: 'Chat with your AI career advisor',
      icon: Sparkles,
      color: 'from-orange-500 to-orange-600',
      accentColor: 'orange',
    },
    {
      id: 'skills',
      name: 'Skill Gap',
      description: 'Identify and plan skill improvements',
      icon: Brain,
      color: 'from-indigo-500 to-indigo-600',
      accentColor: 'indigo',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="my-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="mb-12">
        <h2 className="text-4xl font-black gradient-text mb-3">AI Tools Hub</h2>
        <p className="text-slate-400 text-lg">Supercharge your career with AI-powered tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <motion.button
              key={tool.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => onToolClick?.(tool.id)}
              className="group relative overflow-hidden glass-card p-6 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] text-left"
            >
              {/* Animated gradient background on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${tool.color} transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-slate-50 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-400 text-sm mt-2 group-hover:text-slate-300 transition-colors">
                  {tool.description}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ x: 0, opacity: 0.5 }}
                  whileHover={{ x: 4, opacity: 1 }}
                  className="flex items-center gap-2 mt-4 text-slate-400 group-hover:text-slate-200"
                >
                  <span className="text-sm font-semibold">Explore</span>
                  <span>→</span>
                </motion.div>
              </div>

              {/* Border glow on hover */}
              <motion.div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-30 pointer-events-none`}
                whileHover={{ opacity: 0.3 }}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default React.memo(AIToolsHub);
