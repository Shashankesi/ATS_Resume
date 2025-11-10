import React from 'react';
import { motion } from 'framer-motion';
import { 
  StatCardAnimated, 
  ProgressRing, 
  AnimatedProgressBar,
  TimelineItem,
  BarChart 
} from './AnimatedStats';
import {
  FileText,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Target,
  Flame
} from 'lucide-react';

/**
 * Enhanced Dashboard Stats Panel
 * Beautiful animated statistics display for the dashboard
 */
const DashboardStatsPanel = ({ 
  stats = {
    resumesCreated: 5,
    atsScore: 82,
    skillsMatched: 12,
    jobsViewed: 24,
    currentStreak: 7,
    profileCompletion: 85,
  },
  loading = false
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-700/30 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <StatCardAnimated
            icon={FileText}
            label="Resumes Created"
            value={stats.resumesCreated}
            suffix=""
            color="orange"
            trend={{ direction: 'up', value: 12 }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCardAnimated
            icon={Zap}
            label="Avg ATS Score"
            value={stats.atsScore}
            suffix="%"
            color="blue"
            trend={{ direction: 'up', value: 8 }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCardAnimated
            icon={Target}
            label="Skills Matched"
            value={stats.skillsMatched}
            suffix=""
            color="purple"
            trend={{ direction: 'up', value: 5 }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCardAnimated
            icon={Flame}
            label="Current Streak"
            value={stats.currentStreak}
            suffix=" days"
            color="green"
            trend={{ direction: 'up', value: 3 }}
          />
        </motion.div>
      </div>

      {/* Progress Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Profile Completion */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Profile Completion</h3>
            <Award className="w-5 h-5 text-orange-400" />
          </div>
          <ProgressRing 
            value={stats.profileCompletion}
            max={100}
            size={100}
          />
          <p className="text-center text-gray-400 text-sm mt-4">
            Complete your profile to unlock all features
          </p>
        </motion.div>

        {/* Resume Health */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Resume Health</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Keywords</span>
                <span className="text-sm font-semibold text-orange-400">92%</span>
              </div>
              <AnimatedProgressBar value={92} max={100} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Formatting</span>
                <span className="text-sm font-semibold text-blue-400">88%</span>
              </div>
              <AnimatedProgressBar value={88} max={100} color="from-blue-400 to-cyan-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Content Quality</span>
                <span className="text-sm font-semibold text-purple-400">76%</span>
              </div>
              <AnimatedProgressBar value={76} max={100} color="from-purple-400 to-pink-500" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-2">
            {[
              { icon: CheckCircle2, text: 'Add 3 more skills', color: 'text-green-400' },
              { icon: Clock, text: 'Update recent work exp', color: 'text-yellow-400' },
              { icon: Target, text: 'Optimize for Tech roles', color: 'text-blue-400' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity Timeline */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-2">
          <TimelineItem
            icon={FileText}
            title="Resume Updated"
            description="Updated 'Senior Developer' resume"
            timestamp="2 hours ago"
            color="orange"
          />
          <TimelineItem
            icon={Zap}
            title="ATS Score Improved"
            description="Your ATS score improved to 82%"
            timestamp="1 day ago"
            color="blue"
          />
          <TimelineItem
            icon={Target}
            title="Job Match Found"
            description="New match: Senior React Developer"
            timestamp="2 days ago"
            color="purple"
            isLast
          />
        </div>
      </motion.div>

      {/* Weekly Performance Chart */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-600/30"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Weekly Performance</h3>
        <BarChart
          data={[
            { label: 'Mon', value: 65 },
            { label: 'Tue', value: 75 },
            { label: 'Wed', value: 82 },
            { label: 'Thu', value: 78 },
            { label: 'Fri', value: 88 },
            { label: 'Sat', value: 72 },
            { label: 'Sun', value: 65 },
          ]}
          height={200}
        />
      </motion.div>
    </motion.div>
  );
};

export default DashboardStatsPanel;
