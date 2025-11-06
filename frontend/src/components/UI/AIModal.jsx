import React from 'react';
import { motion } from 'framer-motion';
import ATSAnalyzer from '../ATSAnalyzer';
import JobRecommendations from '../JobRecommendations';
import SkillGapAnalyzer from '../SkillGapAnalyzer';

const AIModal = ({ open, toolId, onClose, resumeData }) => {
  if (!open) return null;

  const titleMap = {
    summary: 'AI Summary',
    ats: 'ATS Analyzer',
    'cover-letter': 'Cover Letter Generator',
    jobs: 'Job Matching',
    chat: 'Career Coach',
    skills: 'Skill Gap Analyzer',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{titleMap[toolId] || 'AI Tool'}</h3>
          <button onClick={onClose} className="px-3 py-1 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800">Close</button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-auto">
          {toolId === 'ats' && (
            <ATSAnalyzer resumeData={resumeData} />
          )}

          {toolId === 'jobs' && (
            <JobRecommendations userSkills={(resumeData && resumeData.skills) || ['React', 'Node.js']} />
          )}

          {toolId === 'skills' && (
            <SkillGapAnalyzer />
          )}

          {toolId === 'summary' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Generate a concise professional summary for your resume.</p>
              <textarea className="w-full p-3 border rounded-lg min-h-[80px]" placeholder="Paste resume text or add specifics..." />
            </div>
          )}

          {toolId === 'cover-letter' && (
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Generate a tailored cover letter from your resume.</p>
              {/* Minimal placeholder - real implementation will call AI */}
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded">Cover Letter generator coming here (mocked)</div>
            </div>
          )}

          {toolId === 'chat' && (
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Chat with your AI career coach (mock).</p>
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded">Chat UI placeholder</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(AIModal);
