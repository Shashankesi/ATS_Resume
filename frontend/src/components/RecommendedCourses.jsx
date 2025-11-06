import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleCourses = [
  { id: 1, title: 'System Design for MERN Developers', provider: 'YouTube', url: '#', level: 'Intermediate' },
  { id: 2, title: 'Advanced React Patterns', provider: 'Coursera', url: '#', level: 'Advanced' },
  { id: 3, title: 'LLM Apps with Node.js', provider: 'Udemy', url: '#', level: 'Intermediate' },
];

const RecommendedCourses = ({ skills = [] }) => {
  return (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-4 dark:text-white flex items-center"><BookOpen className="w-5 h-5 mr-2 text-primary-dark"/> Recommended Courses</h3>
      <ul className="space-y-3">
        {sampleCourses.map((c) => (
          <li key={c.id} className="flex items-center justify-between p-3 rounded-lg border dark:border-slate-700 dark:bg-slate-800">
            <div>
              <p className="font-medium dark:text-white">{c.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{c.provider} • {c.level}</p>
            </div>
            <a href={c.url} className="text-primary-dark text-sm flex items-center hover:underline">
              View <ExternalLink className="w-4 h-4 ml-1"/>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RecommendedCourses;
