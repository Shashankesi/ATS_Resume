import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import NavbarEnhanced from './components/NavbarEnhanced';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import PremiumLoader from './components/PremiumLoader';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResumeEditor from './pages/ResumeEditor';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import BuilderPreview from './pages/BuilderPreview';
import AdminDashboard from './pages/AdminDashboard';
import ATSChecker from './pages/ATSChecker';
import ResumeImprover from './pages/ResumeImprover';
import SkillsSuggestion from './pages/SkillsSuggestion';
import ResumeFeedback from './pages/ResumeFeedback';
import Jobs from './pages/Jobs';
import AIChat from './pages/AIChat';
import CoverLetterGenerator from './pages/CoverLetterGenerator';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <PremiumLoader text="Loading SmartCareer AI..." />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <NavbarEnhanced />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/resume/edit/:id" element={<PrivateRoute element={ResumeEditor} />} />
            <Route path="/resume/new" element={<PrivateRoute element={ResumeEditor} />} />
            <Route path="/resume/public/:slug" element={<BuilderPreview isPublic={true} />} />
            <Route path="/admin" element={<PrivateRoute element={AdminDashboard} />} />
            <Route path="/ats-checker" element={<PrivateRoute element={ATSChecker} />} />
            <Route path="/resume-improver" element={<PrivateRoute element={ResumeImprover} />} />
            <Route path="/skills-suggestion" element={<PrivateRoute element={SkillsSuggestion} />} />
            <Route path="/resume-feedback" element={<PrivateRoute element={ResumeFeedback} />} />
            <Route path="/jobs" element={<PrivateRoute element={Jobs} />} />
            <Route path="/ai-chat" element={<PrivateRoute element={AIChat} />} />
            <Route path="/cover-letter" element={<PrivateRoute element={CoverLetterGenerator} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;