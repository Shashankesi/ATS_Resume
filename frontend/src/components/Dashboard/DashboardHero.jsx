import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

const DashboardHero = ({ user }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="relative min-h-[500px] bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-900/50 rounded-3xl p-12 mb-12 overflow-hidden border border-slate-700/30"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text & Welcome Message */}
        <motion.div variants={itemVariants}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Welcome Back
            </p>
            <h1 className="text-6xl font-black mt-2 bg-gradient-to-r from-slate-100 via-blue-200 to-slate-100 bg-clip-text text-transparent leading-tight">
              Hello, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-slate-300 text-xl mt-4 max-w-md">
              Your AI-powered career dashboard is ready. Let's build something amazing today.
            </p>

            <motion.div
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="btn-glow bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Start Building
              </button>
              <button className="glass-card px-6 py-2.5 text-white font-semibold hover:bg-slate-900/60 flex items-center gap-2">
                View Guide
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Profile Card with Glow */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            {/* Glow halo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30" />

            {/* Profile card */}
            <div className="relative glass-card p-8 border border-slate-600/40">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with glow */}
                <motion.img
                  src={user?.photo || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=3b82f6&color=fff&size=128`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-500/50 object-cover glow-pulse"
                  whileHover={{ scale: 1.1 }}
                />

                <h2 className="text-2xl font-bold text-slate-100 mt-6">{user?.name || 'Career Builder'}</h2>
                <p className="text-slate-400 mt-2">{user?.headline || 'AI Career Specialist'}</p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-6 mt-8 w-full border-t border-slate-700/30 pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">5</p>
                    <p className="text-xs text-slate-400">Resumes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">85</p>
                    <p className="text-xs text-slate-400">ATS Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">12</p>
                    <p className="text-xs text-slate-400">AI Uses</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(DashboardHero);
