import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Upload, Trash2, Eye } from 'lucide-react';
import AnimatedButton from '../UI/AnimatedButton';

const ResumeSection = ({ resumes, onUpload, onDelete, onPreview, onCreateNew }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      onUpload?.(e.dataTransfer.files[0]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="my-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <h2 className="text-4xl font-black gradient-text mb-8">Your Resumes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Resume Card */}
        <motion.button
          variants={itemVariants}
          whileHover={{ y: -8 }}
          onClick={onCreateNew}
          className="group relative overflow-hidden glass-card p-8 border-2 border-dashed border-slate-600/50 hover:border-blue-500/50 flex flex-col items-center justify-center min-h-[300px]"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-500 to-purple-500 transition-opacity duration-300" />

          <div className="relative z-10 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mx-auto mb-4"
            >
              <Plus className="w-8 h-8" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-100">Create New Resume</h3>
            <p className="text-slate-400 text-sm mt-2">Start from scratch or use a template</p>
          </div>
        </motion.button>

        {/* Upload Resume Card */}
        <motion.div
          variants={itemVariants}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative overflow-hidden glass-card p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 cursor-pointer ${
            dragActive
              ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
              : 'border-slate-600/50 hover:border-emerald-500/50'
          }`}
        >
          <div className={`absolute inset-0 opacity-0 ${dragActive ? 'opacity-20' : 'group-hover:opacity-10'} bg-gradient-to-br from-emerald-500 to-emerald-600 transition-opacity duration-300`} />

          <div className="relative z-10 text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={dragActive ? { scale: 1.15 } : {}}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white mx-auto mb-4"
            >
              <Upload className="w-8 h-8" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-100">{dragActive ? 'Drop here' : 'Upload Resume'}</h3>
            <p className="text-slate-400 text-sm mt-2">Drag & drop PDF, DOCX, or DOC</p>
          </div>
        </motion.div>

        {/* Resume Cards */}
        <AnimatePresence>
          {resumes?.map((resume, idx) => (
            <motion.div
              key={resume._id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden glass-card p-6 hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 bg-gradient-to-br from-blue-500 to-purple-500 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-100 truncate flex-1">{resume.name}</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete?.(resume._id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* ATS Score */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400 uppercase">ATS Score</span>
                    <span className="text-sm font-bold text-blue-400">
                      {resume.latestATSScore?.score || '—'}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${resume.latestATSScore?.score || 0}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => onPreview?.(resume._id)}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!resumes?.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 glass-card rounded-2xl"
        >
          <p className="text-slate-400">No resumes yet. Create one to get started!</p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default React.memo(ResumeSection);
