import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  Zap,
  TrendingUp,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Brain,
  Sparkles
} from 'lucide-react';

const ResumeImprover = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [improvements, setImprovements] = useState([
    {
      id: 1,
      original: 'Worked on multiple projects using React and Node.js',
      improved: 'Developed 5+ production-grade applications using React and Node.js, serving 100K+ daily active users',
      category: 'Content',
      impact: 'High',
      status: 'pending',
      likes: 0,
      userLiked: false
    },
    {
      id: 2,
      original: 'Responsible for database management and optimization',
      improved: 'Optimized MongoDB queries reducing database response time by 60% and implementing caching strategies that improved system performance',
      category: 'Content',
      impact: 'High',
      status: 'pending',
      likes: 0,
      userLiked: false
    },
    {
      id: 3,
      original: 'Collaborated with team members to deliver features',
      improved: 'Led cross-functional team of 6 engineers to deliver 15 features on schedule, conducting code reviews and mentoring 2 junior developers',
      category: 'Content',
      impact: 'High',
      status: 'pending',
      likes: 0,
      userLiked: false
    },
    {
      id: 4,
      original: 'Handled customer support and bug fixes',
      improved: 'Resolved 200+ customer issues with 98% satisfaction rate and decreased average bug resolution time from 5 days to 2 days',
      category: 'Content',
      impact: 'Medium',
      status: 'pending',
      likes: 0,
      userLiked: false
    }
  ]);

  const stats = [
    { label: 'Improvements Suggested', value: improvements.length, icon: Sparkles, color: 'from-blue-500 to-blue-600' },
    { label: 'Accepted', value: improvements.filter(i => i.status === 'accepted').length, icon: CheckCircle2, color: 'from-green-500 to-green-600' },
    { label: 'Average Score Boost', value: '+24%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { label: 'Time to Implement', value: '15 min', icon: Zap, color: 'from-purple-500 to-purple-600' }
  ];

  const handleAccept = (id) => {
    setImprovements(improvements.map(i => 
      i.id === id ? { ...i, status: 'accepted' } : i
    ));
  };

  const handleReject = (id) => {
    setImprovements(improvements.map(i => 
      i.id === id ? { ...i, status: 'rejected' } : i
    ));
  };

  const handleLike = (id) => {
    setImprovements(improvements.map(i => 
      i.id === id ? { 
        ...i, 
        likes: i.userLiked ? i.likes - 1 : i.likes + 1,
        userLiked: !i.userLiked
      } : i
    ));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-6">
            <Brain size={18} className="text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">AI Resume Improver</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Improve Your Resume with AI
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get AI-powered suggestions to enhance your resume content and boost your ATS score.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div className="grid md:grid-cols-4 gap-6 mb-12" variants={itemVariants}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur"
              whileHover={{ y: -4, borderColor: '#f97316' }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Improvements List */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Suggested Improvements</h2>

          {improvements.map((improvement, idx) => (
            <motion.div
              key={improvement.id}
              className={`rounded-2xl overflow-hidden border transition ${
                improvement.status === 'accepted'
                  ? 'border-green-500/50 bg-green-500/5'
                  : improvement.status === 'rejected'
                  ? 'border-slate-700/50 bg-slate-800/20'
                  : 'border-slate-700/50 bg-slate-800/40'
              }`}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              layout
            >
              {/* Header */}
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className="w-full p-6 flex items-start gap-4 hover:bg-slate-700/10 transition"
              >
                {/* Status Icon */}
                <div>
                  {improvement.status === 'accepted' ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : improvement.status === 'rejected' ? (
                    <Circle size={24} className="text-slate-500" />
                  ) : (
                    <AlertCircle size={24} className="text-yellow-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-100">Improvement #{improvement.id}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      improvement.category === 'Content'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {improvement.category}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      improvement.impact === 'High'
                        ? 'bg-orange-500/20 text-orange-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {improvement.impact} Impact
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{improvement.original}</p>
                </div>

                <motion.div
                  animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-slate-400" />
                </motion.div>
              </motion.button>

              {/* Expanded Content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === idx ? 'auto' : 0,
                  opacity: expandedIndex === idx ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-slate-700/50 pt-6 space-y-6">
                  {/* Comparison */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                        <Circle size={16} className="text-slate-500" />
                        Original
                      </h4>
                      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-700 group">
                        <p className="text-slate-300 text-sm leading-relaxed">{improvement.original}</p>
                        <motion.button
                          onClick={() => handleCopy(improvement.original)}
                          className="mt-3 flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 transition opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 2 }}
                        >
                          <Copy size={14} />
                          Copy
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        AI Improved
                      </h4>
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/50 group">
                        <p className="text-slate-200 text-sm leading-relaxed font-medium">{improvement.improved}</p>
                        <motion.button
                          onClick={() => handleCopy(improvement.improved)}
                          className="mt-3 flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 2 }}
                        >
                          <Copy size={14} />
                          Copy
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-orange-400" />
                      Why This Is Better
                    </h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>✓ Includes quantifiable metrics (numbers, percentages)</li>
                      <li>✓ Uses stronger action verbs</li>
                      <li>✓ Shows impact and scope of work</li>
                      <li>✓ Better ATS keyword optimization</li>
                    </ul>
                  </div>

                  {/* Actions */}
                  {improvement.status === 'pending' && (
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleAccept(improvement.id)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle2 size={18} />
                        Accept Improvement
                      </motion.button>
                      <motion.button
                        onClick={() => handleReject(improvement.id)}
                        className="px-4 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Skip
                      </motion.button>
                    </div>
                  )}

                  {improvement.status === 'accepted' && (
                    <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-green-400" />
                      <span className="text-sm text-green-300">✓ Improvement accepted</span>
                    </div>
                  )}

                  {/* Like Button */}
                  <motion.button
                    onClick={() => handleLike(improvement.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      improvement.userLiked
                        ? 'bg-pink-500/20 text-pink-400'
                        : 'bg-slate-700/30 text-slate-400 hover:bg-slate-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <ThumbsUp size={16} />
                    <span className="text-sm font-medium">{improvement.likes} found this helpful</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/50 rounded-2xl p-8"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Zap size={24} className="text-yellow-400" />
                Implementation Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 font-bold text-sm">
                    {improvements.filter(i => i.status === 'accepted').length}
                  </div>
                  <span className="text-slate-300">Improvements to add</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 font-bold text-sm">
                    15
                  </div>
                  <span className="text-slate-300">Minutes to implement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center text-orange-400 font-bold text-sm">
                    +24%
                  </div>
                  <span className="text-slate-300">Expected ATS score boost</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Next Steps</h3>
              <ol className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">1.</span>
                  <span>Review all suggested improvements above</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">2.</span>
                  <span>Accept the ones that match your experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">3.</span>
                  <span>Copy the improved text to your resume</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-400 font-bold">4.</span>
                  <span>Re-run the ATS Checker to see your new score</span>
                </li>
              </ol>
            </div>
          </div>

          <motion.button
            className="mt-8 w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={20} />
            Apply All Improvements & Update Resume
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeImprover;
