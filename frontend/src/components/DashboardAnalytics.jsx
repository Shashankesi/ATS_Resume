import React, { useEffect, useMemo, useState } from 'react';
import { Activity, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const Card = ({ icon: Icon, label, value, sub }) => (
  <div className="glass-card hover-glow p-4 md:p-5 animated-gradient-bg">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white/40 dark:bg-white/10">
        <Icon className="w-5 h-5 text-primary-dark" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
        {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  </div>
);

const DashboardAnalytics = ({ resumes }) => {
  const [aiHistory, setAiHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get('/ai/history?limit=50');
        if (mounted) setAiHistory(data);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const stats = useMemo(() => {
    const totalResumes = resumes?.length || 0;
    const recentScores = (resumes || [])
      .map(r => r.latestATSScore?.score)
      .filter(Boolean)
      .slice(0, 5);
    const avgScore = recentScores.length
      ? Math.round(recentScores.reduce((a,b)=>a+b,0) / recentScores.length)
      : '—';
    const now = Date.now();
    const ai7d = (aiHistory || []).filter(it => (now - new Date(it.createdAt).getTime()) <= 7*24*60*60*1000).length;
    return { totalResumes, avgScore, ai7d };
  }, [resumes, aiHistory]);

  return (
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card icon={FileText} label="Resumes" value={stats.totalResumes} sub="Total created" />
      <Card icon={Sparkles} label="Avg ATS (recent)" value={stats.avgScore} sub="Across last 5 resumes" />
      <Card icon={Activity} label="AI Actions (7d)" value={loading ? '…' : stats.ai7d} sub="Summary, ATS, Chat, Jobs" />
    </motion.section>
  );
};

export default DashboardAnalytics;
