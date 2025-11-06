import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, CheckCircle, Loader, Copy, RotateCcw, ThumbsUp,
  Brain, Zap, Award, TrendingUp, Download, Send
} from 'lucide-react';
import api from '../../utils/api';

const ResumeAIEnhancer = ({ resumeId, onApplyImprovement }) => {
  const [selectedSection, setSelectedSection] = useState('summary');
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedImprovements, setAppliedImprovements] = useState(new Set());
  const [aiMode, setAiMode] = useState('smart'); // smart, aggressive, conservative

  const sections = [
    { id: 'summary', label: 'Professional Summary', icon: Brain },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'education', label: 'Education', icon: Award },
    { id: 'projects', label: 'Projects', icon: TrendingUp }
  ];

  // Get AI improvements for section
  const getImprovements = async () => {
    try {
      setLoading(true);
      const response = await api.post('/ai/improvements/suggestions', {
        resumeId,
        section: selectedSection,
        mode: aiMode
      });
      setImprovements(response.data.improvements || []);
    } catch (error) {
      console.error('Error getting improvements:', error);
      alert('Failed to get AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  // Apply single improvement
  const applyImprovement = async (improvementId) => {
    try {
      await api.post(`/ai/improvements/apply/${improvementId}`, {
        resumeId
      });
      setAppliedImprovements(new Set([...appliedImprovements, improvementId]));
      if (onApplyImprovement) {
        onApplyImprovement();
      }
    } catch (error) {
      console.error('Error applying improvement:', error);
    }
  };

  // Apply all improvements
  const applyAll = async () => {
    try {
      setLoading(true);
      const improvementIds = improvements
        .filter(imp => !appliedImprovements.has(imp.id))
        .map(imp => imp.id);

      await api.post('/ai/improvements/apply-batch', {
        resumeId,
        improvementIds
      });

      setAppliedImprovements(new Set([...appliedImprovements, ...improvementIds]));
      alert('All improvements applied successfully!');
    } catch (error) {
      console.error('Error applying improvements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
            <Sparkles className="w-10 h-10 text-yellow-400" />
            AI Resume Enhancer
          </h1>
          <p className="text-slate-400">Get AI-powered suggestions to improve each section of your resume</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Sections */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Sections</h3>
              <nav className="space-y-2">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        selectedSection === section.id
                          ? 'bg-orange-500/30 border border-orange-500/50 text-orange-300'
                          : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* AI Mode */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">AI Mode</h3>
              <div className="space-y-2">
                {[
                  { id: 'conservative', label: 'Conservative', desc: 'Minor tweaks' },
                  { id: 'smart', label: 'Smart', desc: 'Balanced' },
                  { id: 'aggressive', label: 'Aggressive', desc: 'Major changes' }
                ].map(mode => (
                  <motion.button
                    key={mode.id}
                    onClick={() => setAiMode(mode.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      aiMode === mode.id
                        ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 text-slate-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-medium">{mode.label}</p>
                    <p className="text-xs opacity-75">{mode.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              onClick={getImprovements}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get Suggestions
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            {improvements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-300">{improvements.length}</p>
                  <p className="text-xs text-blue-200">Suggestions</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-300">{appliedImprovements.size}</p>
                  <p className="text-xs text-green-200">Applied</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-purple-300">
                    +{Math.round((appliedImprovements.size / improvements.length) * 100)}%
                  </p>
                  <p className="text-xs text-purple-200">Improvement</p>
                </div>
              </motion.div>
            )}

            {/* Improvements List */}
            <AnimatePresence>
              {improvements.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Apply All Button */}
                  {appliedImprovements.size < improvements.length && (
                    <motion.button
                      onClick={applyAll}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-200 font-semibold transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Apply All Improvements
                    </motion.button>
                  )}

                  {/* Improvements */}
                  {improvements.map((improvement, idx) => {
                    const isApplied = appliedImprovements.has(improvement.id);
                    return (
                      <motion.div
                        key={improvement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`rounded-xl p-6 border transition-all ${
                          isApplied
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                improvement.priority === 'high'
                                  ? 'bg-red-500/20 text-red-400'
                                  : improvement.priority === 'medium'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {improvement.priority === 'high' ? '🔴' : improvement.priority === 'medium' ? '🟡' : '🔵'}
                              </div>
                              <h4 className="text-lg font-bold text-white">{improvement.title}</h4>
                            </div>
                            <p className="text-slate-300 mb-4">{improvement.description}</p>

                            {/* Original vs Improved */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-slate-900/50 p-4 rounded-lg">
                                <p className="text-xs font-bold text-slate-400 mb-2">BEFORE</p>
                                <p className="text-sm text-slate-300">{improvement.original}</p>
                              </div>
                              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                <p className="text-xs font-bold text-green-400 mb-2">AFTER</p>
                                <p className="text-sm text-green-300">{improvement.improved}</p>
                              </div>
                            </div>

                            {/* Impact */}
                            <div className="flex gap-3 text-xs">
                              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                                Impact: {improvement.impact}%
                              </span>
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                Type: {improvement.type}
                              </span>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex-shrink-0 ml-4">
                            {isApplied ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Applied
                              </motion.div>
                            ) : (
                              <motion.button
                                onClick={() => applyImprovement(improvement.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-sm font-semibold transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                Apply
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Sparkles className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400 mb-4">
                    {loading ? 'Analyzing your resume...' : 'Select a section and click "Get Suggestions" to see AI improvements'}
                  </p>
                  {loading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Export Options */}
            {improvements.length > 0 && appliedImprovements.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Save Your Changes</h3>
                <div className="flex gap-3 flex-wrap">
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy Results
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 hover:bg-green-500/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    Download Updated Resume
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// For Briefcase icon that wasn't imported
const Briefcase = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
  </svg>
);

export default ResumeAIEnhancer;
