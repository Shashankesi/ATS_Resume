import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, AlertCircle, CheckCircle, Zap, BarChart3,
  FileText, Target, Eye, Copy, Download
} from 'lucide-react';
import api from '../../utils/api';

const ResumeAnalyticsDashboard = ({ resumeId }) => {
  const [analytics, setAnalytics] = useState({
    atsScore: 0,
    readabilityScore: 0,
    keywordMatches: [],
    issues: [],
    suggestions: [],
    formattingScore: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [resumeId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/ai/analytics/${resumeId}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const ScoreCard = ({ title, score, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold opacity-90">{title}</h3>
        <Icon className="w-5 h-5 opacity-70" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">{Math.round(score)}</span>
        <span className="text-lg opacity-75">/100</span>
      </div>
      <div className="mt-4 w-full bg-white/20 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${score >= 75 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Resume Analytics</h1>
          <p className="text-slate-400">Get detailed insights about your resume's effectiveness</p>
        </motion.div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScoreCard
            title="ATS Score"
            score={analytics.atsScore || 0}
            icon={Target}
            color="from-blue-600 to-blue-400"
          />
          <ScoreCard
            title="Readability"
            score={analytics.readabilityScore || 0}
            icon={Eye}
            color="from-purple-600 to-purple-400"
          />
          <ScoreCard
            title="Formatting"
            score={analytics.formattingScore || 0}
            icon={FileText}
            color="from-green-600 to-green-400"
          />
          <ScoreCard
            title="Overall Score"
            score={(analytics.atsScore + analytics.readabilityScore + analytics.formattingScore) / 3 || 0}
            icon={TrendingUp}
            color="from-orange-600 to-pink-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['overview', 'keywords', 'issues', 'suggestions'].map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">ATS Compatibility</p>
                    <p className="text-2xl font-bold text-white">
                      {analytics.atsScore >= 75 ? '✅ Excellent' : analytics.atsScore >= 50 ? '⚠️ Good' : '❌ Needs Work'}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Readability</p>
                    <p className="text-2xl font-bold text-white">
                      {analytics.readabilityScore >= 75 ? '✅ Clear' : analytics.readabilityScore >= 50 ? '⚠️ Fair' : '❌ Needs Improvement'}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Format Quality</p>
                    <p className="text-2xl font-bold text-white">
                      {analytics.formattingScore >= 75 ? '✅ Professional' : analytics.formattingScore >= 50 ? '⚠️ Acceptable' : '❌ Needs Refinement'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Keyword Matches
              </h3>
              {analytics.keywordMatches && analytics.keywordMatches.length > 0 ? (
                <div className="space-y-3">
                  {analytics.keywordMatches.map((keyword, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-white">{keyword.term}</p>
                        <p className="text-sm text-slate-400">Frequency: {keyword.count}x</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">{keyword.relevance}%</p>
                        <p className="text-xs text-slate-400">Relevance</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No keyword analysis available yet</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Issues Found
              </h3>
              {analytics.issues && analytics.issues.length > 0 ? (
                <div className="space-y-3">
                  {analytics.issues.map((issue, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        issue.severity === 'high'
                          ? 'bg-red-500/10 border-l-red-500'
                          : issue.severity === 'medium'
                          ? 'bg-yellow-500/10 border-l-yellow-500'
                          : 'bg-blue-500/10 border-l-blue-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-white">{issue.title}</p>
                          <p className="text-sm text-slate-300 mt-1">{issue.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ml-4 ${
                          issue.severity === 'high'
                            ? 'bg-red-500/20 text-red-300'
                            : issue.severity === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50 text-green-400" />
                  <p>No issues found! Your resume looks great</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Improvement Suggestions
              </h3>
              {analytics.suggestions && analytics.suggestions.length > 0 ? (
                <div className="space-y-3">
                  {analytics.suggestions.map((suggestion, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20"
                    >
                      <p className="font-semibold text-white mb-2">{suggestion.title}</p>
                      <p className="text-sm text-slate-300 mb-3">{suggestion.description}</p>
                      <div className="flex gap-2 text-xs">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded">
                          Impact: {suggestion.impact}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded">
                          Difficulty: {suggestion.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No suggestions at this time</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap">
          <motion.button
            onClick={fetchAnalytics}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="w-4 h-4" />
            Refresh Analysis
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyticsDashboard;
