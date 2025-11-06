import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Award,
  FileText,
  Eye,
  Share2,
  Download
} from 'lucide-react';

const ResumeFeedbackDashboard = () => {
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');

  const issues = [
    {
      id: 1,
      severity: 'critical',
      category: 'Content',
      issue: 'Missing quantifiable metrics in achievements',
      description: 'Your bullet points lack numbers and percentages. This reduces ATS matching and impact.',
      lines: [
        'Responsible for developing mobile application',
        'Led team to deliver features on time'
      ],
      suggestion: 'Add specific metrics like "Increased user engagement by 40%", "Led team of 5 engineers", etc.',
      impact: 'High Impact - Greatly improves ATS score',
      examples: [
        'Before: "Improved database performance"',
        'After: "Optimized database queries reducing response time by 60%, improving user experience"'
      ],
      frequency: 3
    },
    {
      id: 2,
      severity: 'warning',
      category: 'Format',
      issue: 'Inconsistent date formatting',
      description: 'Mix of "Jan 2023" and "01/2023" formats. Standardize for professional appearance.',
      lines: [
        'Jan 2022 - Present',
        '03/2021 - 12/2021'
      ],
      suggestion: 'Use consistent format: "January 2022 - Present" or "Jan 2022 - Present"',
      impact: 'Medium Impact - Improves professionalism',
      examples: [
        'Current: Mixed formats',
        'Recommended: All "Month Year - Month Year" or "MM/YYYY - MM/YYYY"'
      ],
      frequency: 2
    },
    {
      id: 3,
      severity: 'info',
      category: 'Content',
      issue: 'Passive voice usage',
      description: 'Some bullet points use passive voice. Active voice is more impactful.',
      lines: [
        'Was responsible for managing projects',
        'Were assigned to improve performance'
      ],
      suggestion: 'Use active voice: "Managed 5+ concurrent projects", "Improved performance by 35%"',
      impact: 'Medium Impact - Better readability',
      examples: [
        'Before: "Was involved in developing the API"',
        'After: "Architected and developed RESTful API serving 1M+ requests/day"'
      ],
      frequency: 4
    },
    {
      id: 4,
      severity: 'critical',
      category: 'Skills',
      issue: 'Missing industry keywords',
      description: 'Your resume lacks important keywords for your target role. ATS systems heavily weight these.',
      lines: [
        'Skills: JavaScript, React'
      ],
      suggestion: 'Add more relevant keywords: AWS, Docker, GraphQL, Microservices, etc.',
      impact: 'Critical Impact - Major ATS improvement',
      examples: [
        'Target role requires: AWS, Docker, Kubernetes, Microservices',
        'Add these skills to improve match score'
      ],
      frequency: 1
    },
    {
      id: 5,
      severity: 'warning',
      category: 'Sections',
      issue: 'Weak summary/objective',
      description: 'Your professional summary could be stronger. It should highlight unique value.',
      lines: [
        'A hard-working engineer looking for opportunities'
      ],
      suggestion: 'Make it specific: "Full-Stack Developer with 5+ years building scalable React/Node applications. Increased user retention by 45%."',
      impact: 'Medium Impact - Better first impression',
      examples: [
        'Weak: "Looking for a challenging role"',
        'Strong: "Senior Full-Stack Engineer specializing in React & Node.js, with proven track record of delivering 20+ production applications"'
      ],
      frequency: 1
    }
  ];

  const severityColors = {
    critical: 'from-red-500 to-rose-500',
    warning: 'from-yellow-500 to-orange-500',
    info: 'from-blue-500 to-cyan-500'
  };

  const severityBgColors = {
    critical: 'bg-red-500/10 border-red-500/50',
    warning: 'bg-yellow-500/10 border-yellow-500/50',
    info: 'bg-blue-500/10 border-blue-500/50'
  };

  const severityTextColors = {
    critical: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  };

  // Sort issues
  const sortedIssues = [...issues].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityMap = { critical: 0, warning: 1, info: 2 };
      return priorityMap[a.severity] - priorityMap[b.severity];
    }
    return b.frequency - a.frequency;
  });

  // Filter issues
  const filteredIssues = sortedIssues.filter(issue => {
    if (filterBy === 'all') return true;
    return issue.severity === filterBy;
  });

  const stats = [
    {
      label: 'Total Issues',
      value: issues.length,
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-500',
      detail: '2 Critical, 2 Warning, 1 Info'
    },
    {
      label: 'Score Impact',
      value: '-18%',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
      detail: 'Could improve ATS score to 95+'
    },
    {
      label: 'Content Quality',
      value: '72%',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      detail: 'Improve metrics & action verbs'
    },
    {
      label: 'Keyword Match',
      value: '68%',
      icon: Award,
      color: 'from-green-500 to-teal-500',
      detail: 'Add 5-7 more industry keywords'
    }
  ];

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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full mb-6">
            <MessageSquare size={18} className="text-red-400" />
            <span className="text-sm font-semibold text-red-300">Detailed Feedback</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Resume Analysis Report
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Detailed feedback to fix issues and optimize your resume for success.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div className="grid md:grid-cols-4 gap-6 mb-12" variants={itemVariants}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl p-6"
                whileHover={{ y: -4, borderColor: '#f97316' }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-100 mb-2">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controls */}
        <motion.div className="flex gap-4 mb-8 flex-wrap" variants={itemVariants}>
          <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-transparent text-slate-300 outline-none"
            >
              <option value="all">All Issues</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search issues..."
              className="bg-transparent text-slate-300 outline-none w-40"
            />
          </div>
        </motion.div>

        {/* Issues List */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-slate-100 mb-6">Issues Found ({filteredIssues.length})</h2>

          {filteredIssues.map((issue, idx) => (
            <motion.div
              key={issue.id}
              className={`border rounded-2xl overflow-hidden transition ${
                expandedIssue === issue.id
                  ? `border-slate-600 ${severityBgColors[issue.severity].split(' ')[0]}`
                  : 'border-slate-700/50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ borderColor: '#f97316' }}
            >
              {/* Header */}
              <motion.button
                onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                className={`w-full p-6 flex items-start gap-4 hover:bg-slate-700/10 transition ${severityBgColors[issue.severity]}`}
              >
                {/* Severity Icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${severityColors[issue.severity]} flex items-center justify-center flex-shrink-0`}>
                  {issue.severity === 'critical' && <AlertTriangle size={20} className="text-white" />}
                  {issue.severity === 'warning' && <AlertTriangle size={20} className="text-white" />}
                  {issue.severity === 'info' && <MessageSquare size={20} className="text-white" />}
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-100 text-lg">{issue.issue}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      issue.severity === 'critical'
                        ? 'bg-red-500/20 text-red-300'
                        : issue.severity === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-slate-400">{issue.description}</p>
                </div>

                <motion.div
                  animate={{ rotate: expandedIssue === issue.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-slate-400" />
                </motion.div>
              </motion.button>

              {/* Expanded Content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIssue === issue.id ? 'auto' : 0,
                  opacity: expandedIssue === issue.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-slate-700/50 pt-6 space-y-6">
                  {/* Affected Lines */}
                  <div>
                    <h4 className="font-semibold text-slate-300 mb-3">Affected Lines</h4>
                    <div className="space-y-2">
                      {issue.lines.map((line, idx) => (
                        <div key={idx} className="p-3 bg-slate-700/20 rounded-lg border-l-2 border-red-500 text-slate-300 text-sm">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestion */}
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle size={18} />
                      Suggestion
                    </h4>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/50">
                      <p className="text-slate-200 text-sm">{issue.suggestion}</p>
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-semibold text-slate-300 mb-3">Example</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {issue.examples.map((example, idx) => (
                        <div key={idx} className="p-4 bg-slate-700/20 rounded-lg">
                          <p className="text-sm text-slate-300">{example}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Action */}
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                    <div className="p-4 bg-slate-700/20 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Impact</p>
                      <p className="font-semibold text-slate-100">{issue.impact}</p>
                    </div>
                    <motion.button
                      className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg text-orange-400 font-semibold hover:bg-orange-500/30 transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap size={18} className="inline mr-2" />
                      Fix This Issue
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary & Next Steps */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl p-8"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <BookOpen size={28} className="text-orange-400" />
            Implementation Guide
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-100 mb-4">Priority Order</h4>
              <ol className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <span><strong>Fix Critical Issues</strong> - Will have major impact on ATS score</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-400 font-bold">2.</span>
                  <span><strong>Address Warnings</strong> - Medium impact, improves professionalism</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span><strong>Apply Info</strong> - Nice-to-have improvements for polish</span>
                </li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-slate-100 mb-4">Estimated Results</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Current ATS Score</span>
                    <span className="font-bold text-slate-100">78%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-yellow-500"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">After Fixes</span>
                    <span className="font-bold text-green-400">96%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[96%] bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={18} />
              Download Report
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={18} />
              Share Feedback
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              Preview Changes
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeFeedbackDashboard;
