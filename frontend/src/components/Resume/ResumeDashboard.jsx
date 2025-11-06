import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Sparkles, BarChart3, Zap, Download,
  ChevronRight, Star, TrendingUp, Award, Briefcase
} from 'lucide-react';

const ResumeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'Senior Developer Resume',
      template: 'Modern',
      atsScore: 85,
      readabilityScore: 78,
      lastModified: '2 hours ago',
      status: 'Ready to Apply'
    },
    {
      id: 2,
      name: 'Tech Lead Position',
      template: 'Professional',
      atsScore: 92,
      readabilityScore: 88,
      lastModified: '1 day ago',
      status: 'Optimized'
    }
  ]);

  const quickActions = [
    {
      icon: FileText,
      label: 'Create New',
      description: 'Start a new resume',
      color: 'blue'
    },
    {
      icon: Sparkles,
      label: 'AI Enhance',
      description: 'Get AI suggestions',
      color: 'purple'
    },
    {
      icon: BarChart3,
      label: 'Analyze',
      description: 'View analytics',
      color: 'green'
    },
    {
      icon: Download,
      label: 'Export',
      description: 'Download resume',
      color: 'orange'
    }
  ];

  const stats = [
    {
      label: 'Total Resumes',
      value: resumes.length,
      icon: FileText,
      color: 'from-blue-600 to-blue-400'
    },
    {
      label: 'Avg ATS Score',
      value: Math.round((resumes.reduce((sum, r) => sum + r.atsScore, 0) / resumes.length)),
      icon: TrendingUp,
      color: 'from-green-600 to-green-400'
    },
    {
      label: 'Total Improvements',
      value: '24',
      icon: Zap,
      color: 'from-purple-600 to-purple-400'
    },
    {
      label: 'Applications',
      value: '12',
      icon: Award,
      color: 'from-orange-600 to-orange-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-2">Resume Hub</h1>
          <p className="text-slate-400">Manage, create, and optimize your resumes</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const colorMap = {
              blue: 'from-blue-600 to-blue-400',
              purple: 'from-purple-600 to-purple-400',
              green: 'from-green-600 to-green-400',
              orange: 'from-orange-600 to-orange-400'
            };

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 rounded-lg p-6 text-left transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[action.color]} rounded-lg p-3 mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{action.label}</h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 opacity-50" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700/50">
          {['overview', 'all-resumes', 'recent-activity', 'insights'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Resumes</h2>
              <div className="space-y-4">
                {resumes.map((resume, idx) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-700/50 rounded-lg p-6 flex items-center justify-between hover:bg-slate-700 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{resume.name}</h3>
                      <div className="flex gap-6 text-sm text-slate-400">
                        <span>📋 {resume.template}</span>
                        <span>📊 ATS: {resume.atsScore}</span>
                        <span>📝 Readable: {resume.readabilityScore}</span>
                        <span className="text-slate-500">Modified {resume.lastModified}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        resume.atsScore >= 85
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {resume.status}
                      </span>
                      <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors group-hover:text-orange-400">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'all-resumes' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg p-6 hover:from-slate-500 hover:to-slate-600 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{resume.name}</h3>
                      <p className="text-sm text-slate-300">{resume.template} Template</p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-300">ATS Score</span>
                        <span className="text-sm font-bold text-green-400">{resume.atsScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${resume.atsScore}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-sm font-semibold transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded text-sm font-semibold transition-colors">
                        Enhance
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'recent-activity' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
              {[
                { action: 'Enhanced resume', resume: 'Senior Developer Resume', time: '2 hours ago' },
                { action: 'Downloaded as PDF', resume: 'Tech Lead Position', time: '4 hours ago' },
                { action: 'Applied AI suggestions', resume: 'Senior Developer Resume', time: '1 day ago' },
                { action: 'Created new resume', resume: 'Product Manager', time: '2 days ago' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-700/50 last:border-0">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-sm text-slate-400">{item.resume}</p>
                  </div>
                  <span className="text-sm text-slate-500">{item.time}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white mb-6">Smart Insights</h3>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-300 font-semibold mb-1">💡 Improvement Opportunity</p>
                  <p className="text-sm text-slate-300">Add more quantifiable metrics to your Senior Developer resume to boost ATS score by 8-10 points</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm text-green-300 font-semibold mb-1">✅ Well Optimized</p>
                  <p className="text-sm text-slate-300">Your Tech Lead resume has excellent formatting and matches 92% of targeted keywords</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-sm text-purple-300 font-semibold mb-1">🎯 Next Steps</p>
                  <p className="text-sm text-slate-300">Create a tailored version for the "Cloud Architect" role to match 5 new high-value skills</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDashboard;
