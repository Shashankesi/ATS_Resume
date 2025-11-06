import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  X,
  Copy,
  ThumbsUp,
  Download,
  RefreshCw,
  Zap,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Check,
  Loader,
} from 'lucide-react';
import api from '../../utils/api';

const EnhancedResumeImprover = ({ resumeId }) => {
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [appliedImprovements, setAppliedImprovements] = useState({});

  // Load improvements
  useEffect(() => {
    if (resumeId) {
      loadImprovements();
    }
  }, [resumeId]);

  const loadImprovements = async () => {
    try {
      setLoading(true);
      const response = await api.post('/ai/improvements/generate', {
        resumeId,
        section: 'experience',
      });
      setImprovements(response.data.improvements || []);
    } catch (error) {
      console.error('Error loading improvements:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyImprovement = async (improvement) => {
    try {
      await api.post('/ai/improvements/apply', {
        resumeId,
        originalText: improvement.original,
        improvedText: improvement.improved,
      });
      setAppliedImprovements({
        ...appliedImprovements,
        [improvement.id]: true,
      });
    } catch (error) {
      console.error('Error applying improvement:', error);
      alert('Failed to apply improvement');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResume = async () => {
    try {
      const response = await api.get(`/ai/resume/download/${resumeId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.txt');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const stats = [
    { label: 'Suggestions', value: improvements.length, icon: Sparkles },
    { label: 'Applied', value: Object.values(appliedImprovements).filter(Boolean).length, icon: Check },
    { label: 'Pending', value: improvements.length - Object.values(appliedImprovements).filter(Boolean).length, icon: AlertCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-orange-500 opacity-50" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Resume Improvements</h2>
        <div className="flex gap-3">
          <motion.button
            onClick={loadImprovements}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-300 hover:bg-orange-500/30 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>
          <motion.button
            onClick={downloadResume}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
        </div>
      </div>

      {/* Improvements List */}
      <div className="space-y-4">
        <AnimatePresence>
          {improvements.map((improvement, idx) => (
            <motion.div
              key={improvement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05 }}
              className={`border rounded-xl overflow-hidden transition-colors ${
                appliedImprovements[improvement.id]
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50'
              }`}
            >
              {/* Header */}
              <motion.button
                onClick={() => setExpandedId(expandedId === improvement.id ? null : improvement.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Status Indicator */}
                  <div className="flex-shrink-0">
                    {appliedImprovements[improvement.id] ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-orange-500/50 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold bg-orange-500/20 text-orange-300 px-3 py-1 rounded">
                        {improvement.category}
                      </span>
                      <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                        {improvement.impact} Impact
                      </span>
                      {appliedImprovements[improvement.id] && (
                        <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          Applied
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm line-clamp-2">
                      {improvement.original}
                    </p>
                  </div>
                </div>

                {/* Expand Icon */}
                <motion.div
                  animate={{ rotate: expandedId === improvement.id ? 180 : 0 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedId === improvement.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-700/50 px-6 py-4 bg-white/2"
                  >
                    {/* Original */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 uppercase font-bold mb-2">Original</p>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-2">
                        <p className="text-slate-200 text-sm">{improvement.original}</p>
                      </div>
                      <motion.button
                        onClick={() => handleCopy(improvement.original)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </motion.button>
                    </div>

                    {/* Improved */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 uppercase font-bold mb-2">Improved</p>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-2">
                        <p className="text-slate-200 text-sm">{improvement.improved}</p>
                      </div>
                      <motion.button
                        onClick={() => handleCopy(improvement.improved)}
                        className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </motion.button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => applyImprovement(improvement)}
                        disabled={appliedImprovements[improvement.id]}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {appliedImprovements[improvement.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            Applied
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Apply Now
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        onClick={() => setExpandedId(null)}
                        className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-slate-200 font-semibold rounded-lg hover:bg-slate-600/50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Dismiss
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {improvements.length === 0 && !loading && (
          <motion.div
            className="text-center py-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
            <p className="text-slate-400 mb-4">No improvements available</p>
            <motion.button
              onClick={loadImprovements}
              className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-300 hover:bg-orange-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Improvements
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResumeImprover;
