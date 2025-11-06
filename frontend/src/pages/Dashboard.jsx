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
  ChevronRight
} from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load heavy components
const DashboardHero = React.lazy(() => import('../components/Dashboard/DashboardHero'));
const StatCard = React.lazy(() => import('../components/UI/StatCard'));
const AIToolsHub = React.lazy(() => import('../components/Dashboard/AIToolsHub'));
const ResumeSection = React.lazy(() => import('../components/Dashboard/ResumeSection'));
const JobRecommendations = React.lazy(() => import('../components/JobRecommendations'));
const RecommendedCourses = React.lazy(() => import('../components/RecommendedCourses'));
const SkillGapAnalyzer = React.lazy(() => import('../components/SkillGapAnalyzer'));
const DashboardChart = React.lazy(() => import('../components/DashboardChart'));
const AIActivityFeed = React.lazy(() => import('../components/AIActivityFeed'));
const ResumeUploadModal = React.lazy(() => import('../components/ResumeUploadModal'));
const FloatingActionButton = React.lazy(() => import('../components/UI/FloatingActionButton'));
const DashboardAnalytics = React.lazy(() => import('../components/DashboardAnalytics'));
const OnboardingModal = React.lazy(() => import('../components/Onboarding/OnboardingModal'));
const AchievementsSystem = React.lazy(() => import('../components/Achievements/AchievementsSystem'));
const AIModal = React.lazy(() => import('../components/UI/AIModal'));

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
    id: 'summary',
    label: 'Resume Summary',
    description: 'AI-powered resume summary & optimization',
    icon: Sparkles,
    gradient: 'from-purple-500 to-blue-500',
    color: 'purple'
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
    id: 'ats',
    label: 'ATS Score Analyzer',
    description: 'Analyze & improve your ATS score',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    color: 'yellow'
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
    id: 'skills',
    label: 'Skill Analyzer',
    description: 'Identify skill gaps & growth areas',
    icon: TrendingUp,
    gradient: 'from-pink-500 to-rose-500',
    color: 'pink'
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
      setResumes(response.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = resumes.map(r => ({
    name: r.name,
    score: r.latestATSScore?.score || Math.floor(Math.random() * (90 - 50 + 1) + 50),
  }));

  const userSkills = ['React', 'Node.js', 'MongoDB', 'UI/UX', 'Tailwind CSS'];

  const handleCreateNewResume = async () => {
    setLoading(true);
    try {
      const response = await api.post('/resume', {
        name: `Resume - ${new Date().toLocaleDateString()}`,
        data: {
          profile: { name: user.name, email: user.email, summary: 'A professional summary goes here.' },
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

  const handleToolClick = (toolId) => {
    // Central handler for when an AI tool card is clicked
    switch (toolId) {
      case 'ats':
        // Open ATS modal
        setActiveTool('ats');
        break;
      case 'jobs':
        setActiveTool('jobs');
        break;
      case 'skills':
        setActiveTool('skills');
        break;
      case 'summary':
        setActiveTool('summary');
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0e27] to-[#0f172a]">
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
            <Loader2 className="w-12 h-12 text-blue-500" />
          </motion.div>
          <p className="text-slate-300 mt-4 text-lg">Loading Dashboard...</p>
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
                  onClick={() => handleToolClick(tool.id)}
                  className="group relative h-full text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Background Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 group-hover:border-slate-600/50 transition-colors" />
                  
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-slate-900/80 rounded-[10px] flex items-center justify-center">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors flex-1">
                      {tool.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 mt-4 text-slate-400 group-hover:text-orange-400 transition-colors">
                      <span className="text-sm font-medium">Open Tool</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              New Resume
            </motion.button>
          </div>

          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<SkeletonLoader />}>
                <ErrorBoundary>
                  <ResumeSection
                    resumes={resumes}
                    onUpload={handleUploadResume}
                    onCreateNew={handleCreateNewResume}
                    onDelete={(id) => setResumes(resumes.filter(r => r._id !== id))}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>
          ) : (
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">No Resumes Yet</h3>
              <p className="text-slate-400 mb-6">Start by creating your first resume or uploading an existing one.</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={handleCreateNewResume}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Resume
                </motion.button>
                <motion.button
                  onClick={handleUploadResume}
                  className="px-6 py-3 border border-slate-600 rounded-xl font-semibold text-slate-100 hover:bg-slate-700/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Additional Sections (Lazy Loaded) */}
        {resumes.length > 0 && (
          <>
            {/* ATS Trend Chart */}
            <motion.section
              className="mb-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">ATS Score Trend</h2>
              <Suspense fallback={<SkeletonLoader />}>
                <DashboardChart data={chartData} />
              </Suspense>
            </motion.section>

            {/* Job Recommendations */}
            <Suspense fallback={<SkeletonLoader />}>
              <motion.section
                className="mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-100 mb-8">Recommended Jobs</h2>
                <JobRecommendations userSkills={userSkills} />
              </motion.section>
            </Suspense>

            {/* Learning & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Suspense fallback={<SkeletonLoader />}>
                <RecommendedCourses skills={userSkills} />
              </Suspense>
              <Suspense fallback={<SkeletonLoader />}>
                <SkillGapAnalyzer />
              </Suspense>
            </div>

            {/* Dashboard Analytics */}
            <Suspense fallback={<SkeletonLoader />}>
              <DashboardAnalytics resumes={resumes} />
            </Suspense>

            {/* Achievements System */}
            <Suspense fallback={<SkeletonLoader />}>
              <AchievementsSystem
                userResumes={resumes}
                atsScores={resumes.map(r => r.latestATSScore?.score || 0)}
              />
            </Suspense>

            {/* AI Activity Feed */}
            <Suspense fallback={<SkeletonLoader />}>
              <motion.section
                className="mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AIActivityFeed />
              </motion.section>
            </Suspense>
          </>
        )}
      </main>

      {/* FAB */}
      <Suspense fallback={null}>
        <FloatingActionButton
          onUpload={handleUploadResume}
          onQuickAI={() => handleToolClick('summary')}
          onChat={() => handleToolClick('chat')}
        />
      </Suspense>

      {/* Upload Modal */}
      <Suspense fallback={null}>
        <ErrorBoundary>
          <ResumeUploadModal
            open={showUpload}
            onClose={() => setShowUpload(false)}
            onUploaded={handleUploaded}
          />
        </ErrorBoundary>
      </Suspense>

      {/* AI Tool Modal (generic) */}
      <Suspense fallback={null}>
        {activeTool && (
          <ErrorBoundary>
            <AIModal
              open={!!activeTool}
              toolId={activeTool}
              onClose={() => setActiveTool(null)}
              resumeData={resumes[0]}
            />
          </ErrorBoundary>
        )}
      </Suspense>

      {/* Onboarding Modal */}
      <Suspense fallback={null}>
        <OnboardingModal
          open={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />
      </Suspense>
    </div>
  );
};

export default Dashboard;
