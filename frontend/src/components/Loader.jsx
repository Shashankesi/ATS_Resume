import React from 'react';

const Loader = ({ label = 'Loading...', className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-dark"></div>
    <span className="ml-2 text-sm text-slate-600 dark:text-slate-200">{label}</span>
  </div>
);

export default Loader;
