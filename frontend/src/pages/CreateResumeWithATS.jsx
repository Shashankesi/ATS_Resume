import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, Zap, CheckCircle2, ArrowRight, Plus, X } from 'lucide-react';
import api from '../utils/api';

const CreateResumeWithATS = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: `Resume - ${new Date().toLocaleDateString()}`,
    title: '',
    email: user?.email || '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
  });
  const [currentSkill, setCurrentSkill] = useState('');
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, contemporary design with focus on achievements',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional format, ATS-optimized for corporate roles',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Visually appealing with unique layout',
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Minimalist design with maximum focus on content',
      color: 'from-gray-500 to-slate-500'
    },
  ];

  const calculateATS = () => {
    let score = 0;
    if (formData.name && formData.name.trim()) score += 10;
    if (formData.title && formData.title.trim()) score += 10;
    if (formData.email && formData.email.trim()) score += 10;
    if (formData.phone && formData.phone.trim()) score += 5;
    if (formData.location && formData.location.trim()) score += 5;
    if (formData.summary && formData.summary.length > 50) score += 15;
    if (formData.skills.length > 0) score += 15;
    if (formData.skills.length >= 5) score += 10;
    if (formData.experience.length > 0) score += 15;
    if (formData.education.length > 0) score += 5;

    setAtsScore(Math.min(score, 100));

    // Generate suggestions
    const newSuggestions = [];
    if (!formData.summary || formData.summary.length < 50) {
      newSuggestions.push('Add a professional summary (50+ characters)');
    }
    if (formData.skills.length < 5) {
      newSuggestions.push(`Add more skills (${5 - formData.skills.length} more needed)`);
    }
    if (formData.experience.length === 0) {
      newSuggestions.push('Add your work experience');
    }
    if (!formData.phone) {
      newSuggestions.push('Add your phone number');
    }
    setSuggestions(newSuggestions);
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill.trim()]
      });
      setCurrentSkill('');
      calculateATS();
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
    calculateATS();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateResume = async () => {
    setLoading(true);
    try {
      const response = await api.post('/resume', {
        name: formData.name,
        template: selectedTemplate,
        data: formData,
      });
      navigate(`/resume/edit/${response.data._id}`);
    } catch (err) {
      console.error('Error creating resume:', err);
      alert('Failed to create resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAtsColor = () => {
    if (atsScore >= 80) return 'text-green-400 bg-green-500/20';
    if (atsScore >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-orange-400 bg-orange-500/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Your Perfect Resume
            </span>
          </h1>
          <p className="text-slate-300 text-lg">With real-time ATS scoring & AI suggestions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form & ATS Score */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* ATS Score Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-orange-400" />
                  ATS Compatibility
                </h3>
                <div className={`text-3xl font-black px-4 py-2 rounded-lg ${getAtsColor()}`}>
                  {atsScore}%
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${atsScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {suggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-slate-400 font-semibold">💡 Suggestions to improve:</p>
                  {suggestions.map((suggestion, idx) => (
                    <div key={idx} className="text-sm text-yellow-300 flex items-center gap-2">
                      <span>→</span> {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name & Title */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" whileHover={{ y: -2 }}>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Resume Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    placeholder="My Resume"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    placeholder="Senior Developer"
                  />
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" whileHover={{ y: -2 }}>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </motion.div>

              {/* Location */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                  placeholder="San Francisco, CA"
                />
              </motion.div>

              {/* Summary */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Professional Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition resize-none"
                  placeholder="Brief overview of your professional background..."
                  rows="4"
                />
              </motion.div>

              {/* Skills */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                    placeholder="Add a skill (press Enter)"
                  />
                  <motion.button
                    onClick={addSkill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded-full flex items-center gap-2 text-orange-300 text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {skill}
                      <button onClick={() => removeSkill(idx)} className="hover:text-orange-200">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Create Button */}
              <motion.button
                onClick={handleCreateResume}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Create Resume
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Templates */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-bold text-white">Choose Your Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-6 rounded-2xl cursor-pointer border-2 transition ${
                    selectedTemplate === template.id
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/50'
                      : 'border-slate-600/50 bg-slate-800/30 hover:border-slate-500'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Template Preview */}
                  <div className={`h-40 bg-gradient-to-br ${template.color} rounded-lg mb-4 opacity-20 flex items-center justify-center`}>
                    <FileText className="w-12 h-12" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-slate-300 mb-3">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <motion.div
                      className="flex items-center gap-2 text-orange-400 text-sm font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Selected
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Template Info */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">✨ Pro Tip:</span> All templates are optimized for ATS (Applicant Tracking Systems). Choose based on your industry - use "Professional" for corporate roles, "Modern" for tech companies.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateResumeWithATS;
