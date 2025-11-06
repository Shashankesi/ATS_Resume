import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Plus,
  X,
  Zap,
  TrendingUp,
  Briefcase,
  Award,
  Lightbulb,
  CheckCircle2,
  Clock,
  BookOpen,
  Star,
  AlertCircle
} from 'lucide-react';

const SkillsSuggestion = () => {
  const [activeTab, setActiveTab] = useState('recommendations'); // recommendations, learning, trending
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Node.js', 'MongoDB']);
  const [appliedSuggestions, setAppliedSuggestions] = useState([]);

  const skillRecommendations = {
    technical: [
      {
        name: 'TypeScript',
        category: 'Programming Language',
        proficiency: 'Intermediate',
        industry: 'Frontend Development',
        matches: 92,
        courses: 2,
        learningTime: '20-30 hours',
        why: 'Essential for modern React development. Adds type safety to JavaScript.',
        salaryBoost: '+$8-15K/year',
        jobOpenings: 2840,
        icon: 'TS'
      },
      {
        name: 'AWS',
        category: 'Cloud',
        proficiency: 'Beginner',
        industry: 'Backend/DevOps',
        matches: 85,
        courses: 5,
        learningTime: '40-60 hours',
        why: 'Most in-demand cloud platform. Boosts job prospects significantly.',
        salaryBoost: '+$12-20K/year',
        jobOpenings: 3210,
        icon: 'AWS'
      },
      {
        name: 'Docker',
        category: 'DevOps',
        proficiency: 'Beginner',
        industry: 'Backend/DevOps',
        matches: 78,
        courses: 3,
        learningTime: '15-25 hours',
        why: 'Essential containerization tool. Required in 70% of tech jobs.',
        salaryBoost: '+$10-18K/year',
        jobOpenings: 2560,
        icon: 'Docker'
      },
      {
        name: 'GraphQL',
        category: 'Query Language',
        proficiency: 'Intermediate',
        industry: 'Full-Stack',
        matches: 81,
        courses: 2,
        learningTime: '25-35 hours',
        why: 'Modern alternative to REST. Growing rapidly in demand.',
        salaryBoost: '+$5-10K/year',
        jobOpenings: 1890,
        icon: 'GQL'
      },
      {
        name: 'Kubernetes',
        category: 'Orchestration',
        proficiency: 'Advanced',
        industry: 'DevOps/Backend',
        matches: 72,
        courses: 4,
        learningTime: '50-80 hours',
        why: 'Industry standard for microservices. Highest salary potential.',
        salaryBoost: '+$15-25K/year',
        jobOpenings: 2100,
        icon: 'K8s'
      },
      {
        name: 'Python',
        category: 'Programming Language',
        proficiency: 'Beginner',
        industry: 'Data Science/ML',
        matches: 88,
        courses: 6,
        learningTime: '30-40 hours',
        why: 'Versatile language used for ML, Data Science, and Backend.',
        salaryBoost: '+$8-12K/year',
        jobOpenings: 4320,
        icon: 'Python'
      }
    ],
    soft: [
      {
        name: 'Leadership',
        category: 'Management',
        proficiency: 'Intermediate',
        industry: 'All',
        matches: 76,
        courses: 3,
        learningTime: '20-40 hours',
        why: 'Critical for career growth. Leads to management positions.',
        salaryBoost: '+$10-18K/year',
        jobOpenings: 3400,
        icon: 'Lead'
      },
      {
        name: 'Communication',
        category: 'Soft Skills',
        proficiency: 'Intermediate',
        industry: 'All',
        matches: 82,
        courses: 2,
        learningTime: '15-25 hours',
        why: 'Top skill employers look for. Improves teamwork & leadership.',
        salaryBoost: '+$5-10K/year',
        jobOpenings: 2890,
        icon: 'Comm'
      },
      {
        name: 'Problem Solving',
        category: 'Soft Skills',
        proficiency: 'Advanced',
        industry: 'All',
        matches: 88,
        courses: 3,
        learningTime: '20-30 hours',
        why: 'Core technical skill. Needed in coding interviews & daily work.',
        salaryBoost: '+$7-14K/year',
        jobOpenings: 3100,
        icon: 'PS'
      },
      {
        name: 'Project Management',
        category: 'Management',
        proficiency: 'Beginner',
        industry: 'Engineering/Product',
        matches: 71,
        courses: 4,
        learningTime: '25-35 hours',
        why: 'Valuable for team leads & product roles. Opens new career paths.',
        salaryBoost: '+$12-20K/year',
        jobOpenings: 2100,
        icon: 'PM'
      }
    ]
  };

  const trendingSkills = [
    { name: 'AI/Machine Learning', trend: '+45%', growth: 'Rapid', demand: 'Critical' },
    { name: 'Prompt Engineering', trend: '+52%', growth: 'Explosive', demand: 'Critical' },
    { name: 'Cloud Architecture', trend: '+38%', growth: 'Very High', demand: 'High' },
    { name: 'Cybersecurity', trend: '+28%', growth: 'High', demand: 'Critical' },
    { name: 'Data Engineering', trend: '+25%', growth: 'High', demand: 'High' },
    { name: 'Low-Code/No-Code', trend: '+20%', growth: 'Moderate', demand: 'Medium' }
  ];

  const handleAddSkill = (skill) => {
    if (!appliedSuggestions.includes(skill.name)) {
      setAppliedSuggestions([...appliedSuggestions, skill.name]);
    }
  };

  const handleRemoveSuggestion = (skill) => {
    setAppliedSuggestions(appliedSuggestions.filter(s => s !== skill.name));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-teal-500/20 border border-teal-500/50 rounded-full mb-6">
            <Target size={18} className="text-teal-400" />
            <span className="text-sm font-semibold text-teal-300">Skills Intelligence Engine</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Upgrade Your Skills
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get personalized skill recommendations based on job market demand and your career goals.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div className="flex gap-4 mb-8 justify-center" variants={itemVariants}>
          {[
            { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
            { id: 'trending', label: 'Trending Skills', icon: TrendingUp },
            { id: 'learning', label: 'Learning Path', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Technical Skills */}
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <Briefcase size={32} className="text-teal-400" />
                Technical Skills
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillRecommendations.technical.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className="group relative overflow-hidden rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 group-hover:border-teal-500/50 transition-all" />

                    {/* Gradient overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-100">{skill.name}</h3>
                            <p className="text-xs text-slate-400">{skill.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-300">Job Match</span>
                          <span className="text-sm font-bold text-teal-400">{skill.matches}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-teal-400 to-emerald-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.matches}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div className="p-2 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400">Learning</p>
                          <p className="font-bold text-slate-100">{skill.learningTime}</p>
                        </div>
                        <div className="p-2 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400">Salary Boost</p>
                          <p className="font-bold text-teal-400">{skill.salaryBoost}</p>
                        </div>
                      </div>

                      {/* Why learn */}
                      <p className="text-sm text-slate-300 mb-4 flex-1">{skill.why}</p>

                      {/* Footer stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="text-xs text-slate-400">
                          <p className="font-semibold text-slate-300">{skill.jobOpenings.toLocaleString()}</p>
                          <p className="text-xs">Job openings</p>
                        </div>
                        <motion.button
                          onClick={() => handleAddSkill(skill)}
                          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                            appliedSuggestions.includes(skill.name)
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-teal-500/20 text-teal-400 border border-teal-500/50 hover:bg-teal-500/30'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {appliedSuggestions.includes(skill.name) ? (
                            <>
                              <CheckCircle2 size={16} />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              Add
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <Star size={32} className="text-emerald-400" />
                Soft Skills
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillRecommendations.soft.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className="group relative overflow-hidden rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 group-hover:border-emerald-500/50 transition-all" />

                    {/* Content */}
                    <div className="relative p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-100">{skill.name}</h3>
                            <p className="text-xs text-slate-400">{skill.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-300">Importance</span>
                          <span className="text-sm font-bold text-emerald-400">{skill.matches}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.matches}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        <div className="p-2 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400">Learning</p>
                          <p className="font-bold text-slate-100">{skill.learningTime}</p>
                        </div>
                        <div className="p-2 bg-slate-700/30 rounded-lg">
                          <p className="text-slate-400">Salary Impact</p>
                          <p className="font-bold text-emerald-400">{skill.salaryBoost}</p>
                        </div>
                      </div>

                      {/* Why learn */}
                      <p className="text-sm text-slate-300 mb-4 flex-1">{skill.why}</p>

                      {/* Footer stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="text-xs text-slate-400">
                          <p className="font-semibold text-slate-300">{skill.jobOpenings.toLocaleString()}</p>
                          <p className="text-xs">Job openings</p>
                        </div>
                        <motion.button
                          onClick={() => handleAddSkill(skill)}
                          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                            appliedSuggestions.includes(skill.name)
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {appliedSuggestions.includes(skill.name) ? (
                            <>
                              <CheckCircle2 size={16} />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              Add
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Trending Skills Tab */}
        {activeTab === 'trending' && (
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-700/50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-4">Market Trends 2024</h3>
                  <p className="text-slate-300 mb-6">These skills are experiencing the highest growth in demand according to recent job market data.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-300">
                      <Zap size={20} className="text-teal-400" />
                      <span><strong>45%+</strong> growth in AI/ML roles</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <TrendingUp size={20} className="text-emerald-400" />
                      <span><strong>3x</strong> higher salaries for cloud experts</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <AlertCircle size={20} className="text-cyan-400" />
                      <span><strong>Cybersecurity</strong> most critical skill gap</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  {trendingSkills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      className="p-4 bg-slate-700/20 rounded-lg border border-slate-700/50 hover:border-teal-500/50 transition"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-slate-100">{skill.name}</h4>
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold">{skill.trend}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-slate-400">
                        <span>Growth: <strong className="text-slate-200">{skill.growth}</strong></span>
                        <span>Demand: <strong className="text-slate-200">{skill.demand}</strong></span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Path Tab */}
        {activeTab === 'learning' && (
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-100 mb-6">Your Learning Path</h3>
              
              {appliedSuggestions.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={48} className="text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg mb-4">Add skills from the Recommendations tab to create your learning path</p>
                  <motion.button
                    onClick={() => setActiveTab('recommendations')}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Recommendations
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appliedSuggestions.map((skillName, idx) => {
                    const allSkills = [...skillRecommendations.technical, ...skillRecommendations.soft];
                    const skill = allSkills.find(s => s.name === skillName);
                    return skill ? (
                      <motion.div
                        key={skillName}
                        className="p-6 bg-slate-700/20 border border-slate-700/50 rounded-lg"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 size={20} className="text-green-400" />
                              <h4 className="text-xl font-bold text-slate-100">{skillName}</h4>
                              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-xs">Step {idx + 1}</span>
                            </div>
                            <p className="text-slate-400">{skill.why}</p>
                          </div>
                          <motion.button
                            onClick={() => handleRemoveSuggestion(skill)}
                            className="p-2 text-slate-400 hover:text-red-400 transition"
                            whileHover={{ scale: 1.1 }}
                          >
                            <X size={20} />
                          </motion.button>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-slate-400">Learning Time</p>
                            <p className="font-bold text-slate-100 flex items-center gap-2">
                              <Clock size={16} />
                              {skill.learningTime}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-400">Difficulty</p>
                            <p className="font-bold text-slate-100">{skill.proficiency}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Resources</p>
                            <p className="font-bold text-slate-100">{skill.courses} courses</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Salary Impact</p>
                            <p className="font-bold text-teal-400">{skill.salaryBoost}</p>
                          </div>
                        </div>

                        <motion.button
                          className="w-full py-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-400 border border-teal-500/50 rounded-lg font-semibold hover:bg-teal-500/30 transition"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Start Learning ({skill.learningTime})
                        </motion.button>
                      </motion.div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Summary */}
        {appliedSuggestions.length > 0 && (
          <motion.div
            className="mt-12 bg-gradient-to-r from-teal-900/40 to-emerald-900/40 border border-teal-500/50 rounded-2xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Your Development Plan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-800/40 rounded-lg">
                <p className="text-slate-400 mb-2">Total Skills to Add</p>
                <p className="text-4xl font-bold text-teal-400">{appliedSuggestions.length}</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-lg">
                <p className="text-slate-400 mb-2">Est. Learning Time</p>
                <p className="text-4xl font-bold text-emerald-400">6-8 Mo</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-lg">
                <p className="text-slate-400 mb-2">Expected Salary Increase</p>
                <p className="text-4xl font-bold text-cyan-400">+$40-80K</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsSuggestion;
