import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0e27] to-[#0f172a]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 custom-scrollbar">
        {/* Hero Section */}
        <Suspense fallback={<SkeletonLoader />}>
          <DashboardHero user={user} />
        </Suspense>

        {/* Stats Cards */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <StatCard
                label="Resumes"
                value={resumes.length}
                icon={FileText}
                delay={0}
                color="blue"
              />
            </Suspense>
            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <StatCard
                label="Avg ATS Score"
                value={
                  resumes.length
                    ? Math.round(
                        resumes.reduce((sum, r) => sum + (r.latestATSScore?.score || 0), 0) / resumes.length
                      )
                    : 0
                }
                delay={0.1}
                color="purple"
              />
            </Suspense>
            <Suspense fallback={<div className="h-32 bg-slate-700/20 rounded-2xl animate-pulse" />}>
              <StatCard
                label="AI Actions"
                value={12}
                delay={0.2}
                color="emerald"
              />
            </Suspense>
          </div>
        </motion.section>

        {/* ATS Trend Chart */}
        {resumes.length > 0 && (
          <motion.section
            className="mb-16 glass-card-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-100 mb-6">ATS Score Trend</h2>
            <Suspense fallback={<SkeletonLoader />}>
              <DashboardChart data={chartData} />
            </Suspense>
          </motion.section>
        )}

        {/* AI Tools Hub */}
        <Suspense fallback={<SkeletonLoader />}>
          <AIToolsHub onToolClick={handleToolClick} />
        </Suspense>

        {/* Resumes Section */}
        <Suspense fallback={<SkeletonLoader />}>
          <ResumeSection
            resumes={resumes}
            onUpload={handleUploadResume}
            onCreateNew={handleCreateNewResume}
            onDelete={(id) => setResumes(resumes.filter(r => r._id !== id))}
          />
        </Suspense>

        {/* Job Recommendations */}
        <Suspense fallback={<SkeletonLoader />}>
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black gradient-text mb-8">Recommended Jobs</h2>
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
        <ResumeUploadModal
          open={showUpload}
          onClose={() => setShowUpload(false)}
          onUploaded={handleUploaded}
        />
      </Suspense>
      {/* AI Tool Modal (generic) */}
      <Suspense fallback={null}>
        {activeTool && (
          <AIModal
            open={!!activeTool}
            toolId={activeTool}
            onClose={() => setActiveTool(null)}
            resumeData={resumes[0]}
          />
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
