import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Loader2, 
  Award, 
  Sparkles,
  MessageSquare,
  Target,
  TrendingUp,
  Zap,
  Plus,
  ChevronRight,
  Trash2
} from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load heavy components
const DashboardHero = React.lazy(() => import('../components/Dashboard/DashboardHero'));
const StatCard = React.lazy(() => import('../components/UI/StatCard'));
const AIToolsHub = React.lazy(() => import('../components/Dashboard/AIToolsHub'));
const ResumeSection = React.lazy(() => import('../components/Dashboard/ResumeSection'));
const JobRecommendations = React.lazy(() => import('../components/JobRecommendations'));
const FloatingActionButton = React.lazy(() => import('../components/UI/FloatingActionButton'));

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-20 bg-slate-700/30 rounded-2xl" />
    ))}
  </div>
);

// AI Tools Data
const AI_TOOLS = [
  {
    id: 'ats-checker',
    label: 'ATS Checker',
    description: 'Analyze & improve your ATS score',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    color: 'yellow',
    route: '/ats-checker'
  },
  {
    id: 'resume-improver',
    label: 'Resume Improver',
    description: 'AI-powered resume enhancement',
    icon: Sparkles,
    gradient: 'from-purple-500 to-blue-500',
    color: 'purple',
    route: '/resume-improver'
  },
  {
    id: 'skills',
    label: 'Skills Suggestion',
    description: 'Personalized skill recommendations',
    icon: TrendingUp,
    gradient: 'from-teal-500 to-emerald-500',
    color: 'teal',
    route: '/skills-suggestion'
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    description: 'Generate tailored cover letters',
    icon: FileText,
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue'
  },
  {
    id: 'jobs',
    label: 'Job Finder',
    description: 'Find jobs matching your skills',
    icon: Target,
    gradient: 'from-green-500 to-teal-500',
    color: 'green'
  },
  {
    id: 'chat',
    label: 'Career Coach',
    description: 'Get personalized career advice',
    icon: MessageSquare,
    gradient: 'from-indigo-500 to-purple-500',
    color: 'indigo'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  // Safety check - redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Check if onboarding should be shown (only once on first login)
    const onboardingDone = localStorage.getItem('onboarding-done');
    if (!onboardingDone) {
      setShowOnboarding(true);
    }
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resume');
      setResumes(response.data || []);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const chartData = (resumes || []).map(r => ({
    name: r.name || 'Untitled',
    score: r.latestATSScore?.score || Math.floor(Math.random() * (90 - 50 + 1) + 50),
  }));

  const userSkills = ['React', 'Node.js', 'MongoDB', 'UI/UX', 'Tailwind CSS'];

  const handleCreateNewResume = async () => {
    setLoading(true);
    try {
      const response = await api.post('/resume', {
        name: `Resume - ${new Date().toLocaleDateString()}`,
        data: {
          profile: { 
            name: user?.name || 'Professional', 
            email: user?.email || '', 
            summary: 'A professional summary goes here.' 
          },
          sections: [
            { _id: 'profile', type: 'profile', title: 'Profile', order: 0, content: {} },
            { _id: 'exp1', type: 'experience', title: 'Experience', order: 1, content: { jobs: [] } },
            { _id: 'skill1', type: 'skills', title: 'Skills', order: 2, content: { list: '' } },
          ],
        },
      });
      navigate(`/resume/edit/${response.data._id}`);
    } catch (err) {
      console.error('Failed to create resume:', err);
      setLoading(false);
    }
  };

  const handleUploadResume = () => setShowUpload(true);

  const handleUploaded = (newResume) => {
    setResumes([newResume, ...resumes]);
    setShowUpload(false);
  };

  const handleToolClick = (tool) => {
    // Check if tool has a route property
    if (tool.route) {
      navigate(tool.route);
      return;
    }

    // Central handler for when an AI tool card is clicked
    switch (tool.id) {
      case 'jobs':
        setActiveTool('jobs');
        break;
      case 'skills':
        setActiveTool('skills');
        break;
      case 'cover-letter':
        setActiveTool('cover-letter');
        break;
      case 'chat':
        setActiveTool('chat');
        break;
      default:
        // Default quick AI behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && resumes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0e27] to-[#0f172a] flex justify-center items-center relative overflow-hidden">
        {/* Background Blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="text-center relative z-10">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="mb-6 flex justify-center"
          >
            <Loader2 className="w-16 h-16 text-blue-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Loading your dashboard</h2>
          <p className="text-slate-400">Setting up your AI career tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0e27] to-[#0f172a] relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 custom-scrollbar relative z-10">
        {/* Welcome Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hey, {user?.name?.split(' ')[0]}! 👋
                </span>
              </h1>
              <p className="text-slate-400 text-lg">Ready to advance your career?</p>
            </div>
            <motion.div
              className="text-orange-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award size={48} />
            </motion.div>
          </div>
        </motion.div>

        {/* AI Tools Grid */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-8">AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="group relative h-full text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/50 group-hover:border-orange-500/50 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                  
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center">
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-orange-300 transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors flex-1">
                      {tool.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 mt-4 text-slate-400 group-hover:text-orange-400 transition-colors">
                      <span className="text-sm font-medium">Open</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Stats Cards */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-2">Total Resumes</p>
                    <p className="text-4xl font-bold text-blue-400">{resumes.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText size={24} className="text-blue-400" />
                  </div>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-2">Avg ATS Score</p>
                    <p className="text-4xl font-bold text-purple-400">
                      {resumes.length
                        ? Math.round(
                            resumes.reduce((sum, r) => sum + (r.latestATSScore?.score || 0), 0) / resumes.length
                          )
                        : 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-purple-400" />
                  </div>
                </div>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-2">AI Actions Used</p>
                    <p className="text-4xl font-bold text-green-400">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles size={24} className="text-green-400" />
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </motion.section>

        {/* Resumes Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-100">Your Resumes</h2>
            <motion.button
              onClick={handleCreateNewResume}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 transition-all shadow-lg"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={22} />
              New Resume
            </motion.button>
          </div>

          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <motion.div
                  key={resume._id}
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
                  whileHover={{ y: -4 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-100 truncate flex-1">{resume.name || 'Untitled Resume'}</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setResumes(resumes.filter(r => r._id !== resume._id))}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 ml-2 flex-shrink-0"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>

                    {/* ATS Score */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-400 uppercase font-semibold">ATS Score</span>
                        <span className="text-sm font-bold text-blue-400">
                          {resume.latestATSScore?.score || 0}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${resume.latestATSScore?.score || 0}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-slate-500 mb-4 space-y-1">
                      <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        onClick={() => navigate(`/resume/view/${resume._id}`)}
                        className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View
                      </motion.button>
                      <motion.button
                        onClick={() => navigate(`/resume/edit/${resume._id}`)}
                        className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FileText size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">No Resumes Yet</h3>
              <p className="text-slate-400 mb-8 text-lg">Start by creating your first resume or uploading an existing one.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <motion.button
                  onClick={handleCreateNewResume}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 transition-all shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={20} />
                  Create Resume
                </motion.button>
                <motion.button
                  onClick={handleUploadResume}
                  className="px-8 py-3 border-2 border-blue-500 bg-blue-500/10 rounded-xl font-semibold text-white hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.section>
        {/* Additional Sections - Removed for optimization */}
      </main>

      {/* FAB */}
      <Suspense fallback={null}>
        <FloatingActionButton
          onUpload={handleUploadResume}
          onQuickAI={() => handleToolClick('summary')}
          onChat={() => handleToolClick('chat')}
        />
      </Suspense>

      {/* Modals removed for optimization */}
    </div>
  );
};

export default Dashboard;
