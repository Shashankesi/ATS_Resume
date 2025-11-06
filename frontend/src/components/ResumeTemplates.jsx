import React from 'react';
import { useResume } from '../context/ResumeContext';

const templates = [
  { id: 'Modern', label: 'Modern', desc: 'Clean, bold headings and accent color' },
  { id: 'Classic', label: 'Classic', desc: 'Traditional single-column layout' },
  { id: 'Minimal', label: 'Minimal', desc: 'Ultra-simple, ATS-first design' },
];

const ResumeTemplates = () => {
  const { template, dispatch } = useResume();

  const selectTemplate = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id });
  };

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold border-b pb-2 dark:border-slate-700">Templates</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => selectTemplate(t.id)}
            className={`text-left p-3 rounded-lg border dark:border-slate-700 dark:bg-card-dark hover:shadow ${
              template === t.id ? 'ring-2 ring-primary-dark' : ''
            }`}
            title={t.desc}
          >
            <p className="font-semibold">{t.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
