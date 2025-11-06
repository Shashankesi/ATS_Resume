import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Clock, FileText, MessageSquare } from 'lucide-react';
import api from '../utils/api';

const featureIcon = (feature) => {
  switch (feature) {
    case 'generateSummary':
      return <FileText className="w-4 h-4 text-primary-dark" />;
    case 'analyzeATS':
      return <Bot className="w-4 h-4 text-accent" />;
    case 'generateCoverLetter':
      return <MessageSquare className="w-4 h-4 text-emerald-500" />;
    case 'chatAssistant':
      return <MessageSquare className="w-4 h-4 text-purple-500" />;
    default:
      return <Bot className="w-4 h-4 text-gray-500" />;
  }
};

const formatTime = (ts) => new Date(ts).toLocaleString();

const AIActivityFeed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get('/ai/history');
        if (mounted) setItems(data);
      } catch (e) {
        if (mounted) setError('Could not load AI activity.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <motion.section
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold dark:text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary-dark" /> Recent AI Activity
        </h3>
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
      {loading && (
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-3/4">
                <div className="w-4 h-4 bg-gray-300/70 dark:bg-slate-700 rounded" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-300/70 dark:bg-slate-700 rounded w-1/2 mb-2" />
                  <div className="h-2 bg-gray-200/70 dark:bg-slate-800 rounded w-1/3" />
                </div>
              </div>
              <div className="h-2 w-24 bg-gray-200/70 dark:bg-slate-800 rounded" />
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="text-red-500">{error}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No recent AI activity.</p>
      )}

      <ul className="divide-y divide-gray-200/20">
        {items.map((it) => (
          <li key={it._id || `${it.feature}-${it.createdAt}`}
              className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {featureIcon(it.feature)}
              <div>
                <p className="text-sm font-medium dark:text-white">
                  {it.feature}
                </p>
                <p className="text-xs text-gray-500">Mode: {it.mode}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatTime(it.createdAt)}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default AIActivityFeed;
