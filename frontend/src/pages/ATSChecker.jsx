import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Brain,
  FileText,
  TrendingUp,
  Clock,
  Lightbulb,
  Target,
  Award,
  ChevronDown,
  Download
} from 'lucide-react';

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const analysisCategories = [
    {
      id: 'content',
      title: 'Content',
      color: 'from-blue-500 to-blue-600',
      icon: FileText,
      checks: [
        { name: 'ATS Parse Rate', status: 'pass', score: 95, suggestion: 'Your resume has excellent parsability. Most ATS systems will read it perfectly.' },
        { name: 'Word Repetition', status: 'warn', score: 72, suggestion: 'You repeat "developed" 8 times. Try using synonyms like "engineered", "created", "built".' },
        { name: 'Spelling & Grammar', status: 'pass', score: 100, suggestion: 'No spelling or grammar errors detected.' },
        { name: 'Quantified Impact', status: 'warn', score: 68, suggestion: 'Only 4 out of 6 achievements are quantified. Add metrics like "increased by 40%" or "saved $50k".' }
      ]
    },
    {
      id: 'format',
      title: 'Format',
      color: 'from-purple-500 to-purple-600',
      icon: BarChart3,
      checks: [
        { name: 'File Format', status: 'pass', score: 100, suggestion: 'PDF format is perfect. It preserves formatting across all ATS systems.' },
        { name: 'Resume Length', status: 'pass', score: 90, suggestion: 'Your resume is 1 page. Perfect for ATS parsing and quick reviews.' },
        { name: 'Bullet Points', status: 'warn', score: 75, suggestion: 'Some bullet points are over 100 characters. Keep them under 85 characters for clarity.' }
      ]
    },
    {
      id: 'skills',
      title: 'Skills Suggestion',
      color: 'from-green-500 to-green-600',
      icon: TrendingUp,
      checks: [
        { name: 'Hard Skills', status: 'pass', score: 88, suggestion: 'Great mix of technical skills: React, Node.js, MongoDB. Consider adding "Tailwind CSS", "AWS".' },
        { name: 'Soft Skills', status: 'warn', score: 70, suggestion: 'You have 2 soft skills listed. Add more like "Leadership", "Communication", "Problem-solving".' },
        { name: 'Industry Keywords', status: 'pass', score: 92, suggestion: 'Your resume includes 12 industry-relevant keywords. Excellent for job search algorithms.' }
      ]
    },
    {
      id: 'sections',
      title: 'Resume Sections',
      color: 'from-orange-500 to-orange-600',
      icon: Award,
      checks: [
        { name: 'Contact Info', status: 'pass', score: 100, suggestion: 'Contact information is clear and complete.' },
        { name: 'Essential Sections', status: 'pass', score: 95, suggestion: 'All essential sections present: Experience, Education, Skills, Projects.' },
        { name: 'Personality Showcase', status: 'warn', score: 60, suggestion: 'Add a brief summary or objective to showcase your career goals and personality.' }
      ]
    },
    {
      id: 'style',
      title: 'Style',
      color: 'from-pink-500 to-pink-600',
      icon: Lightbulb,
      checks: [
        { name: 'Design Quality', status: 'pass', score: 98, suggestion: 'Clean, modern design. Great visual hierarchy and spacing.' },
        { name: 'Active Voice', status: 'pass', score: 96, suggestion: 'Excellent use of active voice throughout. Keep it up!' },
        { name: 'Buzzwords & Clichés', status: 'warn', score: 78, suggestion: 'Found 3 clichés: "team player", "hard worker", "go-getter". Be more specific instead.' }
      ]
    }
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate analysis
      setLoading(true);
      setTimeout(() => {
        setScore(87);
        setAnalyzed(true);
        setLoading(false);
      }, 2000);
    }
  };

  const categoryAverage = analysisCategories.reduce((sum, cat) => {
    const avg = cat.checks.reduce((s, check) => s + check.score, 0) / cat.checks.length;
    return sum + avg;
  }, 0) / analysisCategories.length;

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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6">
            <Zap size={18} className="text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">AI-Powered Resume Checker</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Is Your Resume Ready?
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get an ATS score and 16-point analysis to optimize your resume for job success.
          </p>
        </motion.div>

        {!analyzed ? (
          // Upload Section
          <motion.div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-3xl p-12 text-center mb-12" variants={itemVariants}>
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Upload size={48} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-100 mb-3">Upload Your Resume</h2>
            <p className="text-slate-300 mb-8">Get instant feedback on your ATS compatibility and optimization tips</p>
            
            <div
              className="border-2 border-dashed border-slate-600 rounded-2xl p-12 hover:border-orange-400 hover:bg-orange-500/5 transition mb-6 cursor-pointer"
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
              <FileText size={40} className="text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold mb-2">Drop your resume here or click to browse</p>
              <p className="text-sm text-slate-400">PDF & DOCX only. Max 5MB</p>
            </div>

            {file && (
              <p className="text-green-400 font-semibold">✓ {file.name} selected</p>
            )}

            {loading && (
              <div className="flex justify-center items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Zap className="text-orange-400" size={20} />
                </motion.div>
                <span className="text-slate-300">Analyzing your resume...</span>
              </div>
            )}
          </motion.div>
        ) : (
          // Results Section
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Overall Score */}
            <motion.div
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-3xl p-12"
              whileHover={{ borderColor: '#f97316' }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Score Circle */}
                <div className="flex justify-center">
                  <motion.div
                    className="relative w-48 h-48"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 80 }}
                  >
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="90"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="90"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 565 }}
                        animate={{ strokeDashoffset: 565 - (score / 100) * 565 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        strokeDasharray={565}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF8C00" />
                          <stop offset="100%" stopColor="#E67E22" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                        {score}
                      </div>
                      <div className="text-sm text-slate-400 font-semibold">/ 100</div>
                    </div>
                  </motion.div>
                </div>

                {/* Score Info */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-slate-100 mb-4">Your ATS Score</h3>
                  <p className="text-slate-300 mb-6">
                    {score >= 80
                      ? '🎉 Excellent! Your resume is ATS-optimized and ready for job applications.'
                      : score >= 70
                      ? '✓ Good! Your resume is competitive. Consider the suggestions below to improve.'
                      : '⚠️ Fair. Follow the recommendations to boost your ATS compatibility.'}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-400" />
                      <span className="text-slate-300">ATS Parsability: 95%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle size={20} className="text-yellow-400" />
                      <span className="text-slate-300">Content Quality Issues: 3 found</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} className="text-blue-400" />
                      <span className="text-slate-300">Keyword Optimization: 92%</span>
                    </div>
                  </div>

                  <motion.button
                    className="mt-8 px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-orange-700 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 active:scale-95"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} />
                    Download Full Report
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Analysis Categories */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-100">Detailed Analysis</h2>

              {analysisCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ borderColor: '#f97316' }}
                >
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${category.color} p-6 flex items-center gap-4`}>
                    <category.icon size={32} className="text-white" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{category.title}</h3>
                      <p className="text-white/80 text-sm">
                        {category.checks.filter(c => c.status === 'pass').length} / {category.checks.length} checks passed
                      </p>
                    </div>
                    <div className="text-3xl font-black text-white">
                      {Math.round(category.checks.reduce((s, c) => s + c.score, 0) / category.checks.length)}%
                    </div>
                  </div>

                  {/* Category Checks */}
                  <div className="p-6 space-y-4">
                    {category.checks.map((check, idx) => (
                      <motion.div
                        key={idx}
                        className="p-4 bg-slate-700/20 border border-slate-700/50 rounded-lg hover:border-slate-600/50 transition"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <div className="mt-1">
                            {check.status === 'pass' ? (
                              <CheckCircle size={20} className="text-green-400" />
                            ) : (
                              <AlertCircle size={20} className="text-yellow-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-slate-100">{check.name}</h4>
                              <span className="text-sm font-bold text-slate-300">{check.score}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${
                                  check.status === 'pass'
                                    ? 'from-green-400 to-green-500'
                                    : 'from-yellow-400 to-yellow-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${check.score}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="ml-8 p-3 bg-slate-800/50 rounded-lg border-l-2 border-orange-400">
                          <p className="text-sm text-slate-300">
                            <Lightbulb size={16} className="inline mr-2 text-orange-400" />
                            {check.suggestion}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Suggestions */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-2xl p-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain size={24} className="text-blue-400" />
                <h3 className="text-2xl font-bold text-slate-100">AI-Powered Recommendations</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="p-4 bg-slate-700/20 rounded-lg" whileHover={{ y: -2 }}>
                  <h4 className="font-semibold text-slate-100 mb-2">✨ Rewrite with AI</h4>
                  <p className="text-sm text-slate-300">Use ChatGPT to enhance your experience descriptions with better action verbs and quantified results.</p>
                </motion.div>
                <motion.div className="p-4 bg-slate-700/20 rounded-lg" whileHover={{ y: -2 }}>
                  <h4 className="font-semibold text-slate-100 mb-2">🎯 Add Missing Keywords</h4>
                  <p className="text-sm text-slate-300">Include industry-specific keywords from your target job descriptions to improve ATS matching.</p>
                </motion.div>
                <motion.div className="p-4 bg-slate-700/20 rounded-lg" whileHover={{ y: -2 }}>
                  <h4 className="font-semibold text-slate-100 mb-2">📊 Restructure Content</h4>
                  <p className="text-sm text-slate-300">Reorganize bullet points to highlight achievements first, then responsibilities.</p>
                </motion.div>
                <motion.div className="p-4 bg-slate-700/20 rounded-lg" whileHover={{ y: -2 }}>
                  <h4 className="font-semibold text-slate-100 mb-2">🧠 Enhance Skills Section</h4>
                  <p className="text-sm text-slate-300">Expand your skills section with 5-10 more relevant technical and soft skills.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div className="text-center" variants={itemVariants}>
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition shadow-lg flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={24} />
                Use Resume Builder to Improve
              </motion.button>
              <p className="text-slate-400 mt-4">Continue with our AI-powered resume builder to implement these suggestions</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ATSChecker;
