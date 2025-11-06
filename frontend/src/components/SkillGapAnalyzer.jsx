import React, { useState } from 'react';
import { Sparkles, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillGapAnalyzer = () => {
  const [skills, setSkills] = useState('React, Node.js, MongoDB, Tailwind');
  const [target, setTarget] = useState('Senior Full Stack Engineer');
  const [result, setResult] = useState(null);

  const analyze = () => {
    // Lightweight mock logic; in a real flow call backend AI (skillGapAnalyzer)
    const gaps = ['Docker', 'Kubernetes', 'System Design'];
    setResult({ gaps, suggestions: ['Take Docker basics', 'Build a microservice demo'] });
  };

  return (
    <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center"><Sparkles className="w-5 h-5 mr-2 text-accent"/> Skill Gap Analyzer</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-800" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Your skills (comma-separated)"/>
        <input className="px-3 py-2 rounded-lg border dark:border-slate-700 dark:bg-slate-800" value={target} onChange={e=>setTarget(e.target.value)} placeholder="Target role"/>
      </div>
      <div className="mt-4">
        <button onClick={analyze} className="px-4 py-2 rounded-lg bg-primary-dark text-white hover:bg-primary-light">Analyze</button>
      </div>
      {result && (
        <div className="mt-4 space-y-2">
          <p className="text-sm dark:text-slate-300 flex items-center"><AlertTriangle className="w-4 h-4 mr-1 text-yellow-500"/> Gaps: {result.gaps.join(', ')}</p>
          <p className="text-sm dark:text-slate-300 flex items-center"><Check className="w-4 h-4 mr-1 text-green-500"/> Suggestions: {result.suggestions.join(', ')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default SkillGapAnalyzer;
