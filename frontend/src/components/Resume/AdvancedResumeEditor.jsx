import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Edit2, Eye, Download, Save, X, Copy,
  ChevronUp, ChevronDown, Sparkles, FileText, Award, Briefcase,
  GraduationCap, Zap, TrendingUp, MoreVertical, Lock, Unlock
} from 'lucide-react';
import api from '../../utils/api';

const AdvancedResumeEditor = ({ resumeId, onSave }) => {
  const [resume, setResume] = useState({
    name: 'My Resume',
    contact: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: []
  });

  const [activeSection, setActiveSection] = useState('contact');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    summary: true,
    experience: true
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get AI suggestions for a section
  const getAISuggestions = async (section) => {
    try {
      setLoading(true);
      const response = await api.post('/ai/improvements/generate', {
        resumeId,
        section
      });
      setAiSuggestions(response.data.improvements || []);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new experience
  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: []
      }]
    });
  };

  // Update experience
  const updateExperience = (id, field, value) => {
    setResume({
      ...resume,
      experience: resume.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  // Delete experience
  const deleteExperience = (id) => {
    setResume({
      ...resume,
      experience: resume.experience.filter(exp => exp.id !== id)
    });
  };

  // Add education
  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        year: '',
        gpa: ''
      }]
    });
  };

  // Update education
  const updateEducation = (id, field, value) => {
    setResume({
      ...resume,
      education: resume.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  // Delete education
  const deleteEducation = (id) => {
    setResume({
      ...resume,
      education: resume.education.filter(edu => edu.id !== id)
    });
  };

  // Add skill
  const addSkill = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, { id: Date.now(), name: '', level: 'Intermediate' }]
    });
  };

  // Update skill
  const updateSkill = (id, field, value) => {
    setResume({
      ...resume,
      skills: resume.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  // Delete skill
  const deleteSkill = (id) => {
    setResume({
      ...resume,
      skills: resume.skills.filter(skill => skill.id !== id)
    });
  };

  // Save resume
  const handleSave = async () => {
    try {
      await api.put(`/resume/${resumeId}`, resume);
      alert('Resume saved successfully!');
      if (onSave) onSave(resume);
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    }
  };

  // Download resume
  const handleDownload = async () => {
    try {
      const response = await api.get(`/ai/resume/download/${resumeId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resume.name}.txt`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  // Templates
  const templates = {
    modern: 'bg-gradient-to-r from-blue-50 to-slate-50',
    creative: 'bg-gradient-to-r from-purple-50 to-pink-50',
    professional: 'bg-white',
    minimal: 'bg-slate-50'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between flex-wrap gap-4"
        >
          <h1 className="text-4xl font-bold text-white">Resume Editor</h1>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Editor' : 'Preview'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 hover:bg-green-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Resume
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 sticky top-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Sections</h3>
              <nav className="space-y-2">
                {[
                  { id: 'contact', label: 'Contact Info', icon: FileText },
                  { id: 'summary', label: 'Professional Summary', icon: Sparkles },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Zap },
                  { id: 'certifications', label: 'Certifications', icon: Award }
                ].map(section => {
                  const Icon = section.icon;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-orange-500/30 border border-orange-500/50 text-orange-300'
                          : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Templates */}
              <div className="mt-8 pt-8 border-t border-slate-700/50">
                <h4 className="text-sm font-bold text-white mb-3">Templates</h4>
                <div className="space-y-2">
                  {Object.keys(templates).map(template => (
                    <motion.button
                      key={template}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full px-3 py-2 rounded text-sm font-medium transition-all ${
                        selectedTemplate === template
                          ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                          : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {template.charAt(0).toUpperCase() + template.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Content - Editor/Preview */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!showPreview ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Contact Info Section */}
                  {activeSection === 'contact' && (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={resume.name}
                          onChange={(e) => setResume({ ...resume, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={resume.contact.email}
                          onChange={(e) => setResume({
                            ...resume,
                            contact: { ...resume.contact, email: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={resume.contact.phone}
                          onChange={(e) => setResume({
                            ...resume,
                            contact: { ...resume.contact, phone: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={resume.contact.location}
                          onChange={(e) => setResume({
                            ...resume,
                            contact: { ...resume.contact, location: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                        <input
                          type="url"
                          placeholder="LinkedIn URL"
                          value={resume.contact.linkedin}
                          onChange={(e) => setResume({
                            ...resume,
                            contact: { ...resume.contact, linkedin: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                        <input
                          type="url"
                          placeholder="Portfolio URL"
                          value={resume.contact.portfolio}
                          onChange={(e) => setResume({
                            ...resume,
                            contact: { ...resume.contact, portfolio: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Professional Summary Section */}
                  {activeSection === 'summary' && (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Professional Summary</h3>
                        <motion.button
                          onClick={() => getAISuggestions('summary')}
                          className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-300 hover:bg-purple-500/30 transition-all text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Sparkles className="w-4 h-4" />
                          AI Enhance
                        </motion.button>
                      </div>
                      <textarea
                        placeholder="Write a compelling professional summary..."
                        value={resume.summary}
                        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 min-h-32 resize-none"
                      />
                      <p className="text-xs text-slate-400 mt-2">{resume.summary.length}/500 characters</p>
                    </div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <div className="space-y-4">
                      {resume.experience.map((exp, idx) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-white">Experience {idx + 1}</h4>
                            <motion.button
                              onClick={() => deleteExperience(exp.id)}
                              className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                            />
                            <input
                              type="text"
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder="Start Date"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                              />
                              <input
                                type="text"
                                placeholder="End Date (or Present)"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                              />
                            </div>
                            <textarea
                              placeholder="Job description and achievements..."
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 min-h-24 resize-none"
                            />
                          </div>
                        </motion.div>
                      ))}
                      <motion.button
                        onClick={addExperience}
                        className="w-full px-4 py-3 bg-slate-700/50 border-2 border-dashed border-slate-600/50 rounded-lg text-slate-300 hover:border-orange-500/50 hover:text-orange-300 transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Experience
                      </motion.button>
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Skills</h3>
                        <motion.button
                          onClick={addSkill}
                          className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded text-orange-300 hover:bg-orange-500/30 transition-all text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </motion.button>
                      </div>
                      <div className="space-y-3">
                        {resume.skills.map(skill => (
                          <div key={skill.id} className="flex gap-3 items-center">
                            <input
                              type="text"
                              placeholder="Skill name"
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                              className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50"
                            />
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                              className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-orange-500/50"
                            >
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                              <option>Expert</option>
                            </select>
                            <motion.button
                              onClick={() => deleteSkill(skill.id)}
                              className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${templates[selectedTemplate]} rounded-xl p-8 shadow-2xl min-h-screen`}
                >
                  <div className="max-w-4xl mx-auto">
                    {/* Preview Header */}
                    <div className="mb-8 pb-8 border-b-2 border-gray-300">
                      <h1 className="text-4xl font-bold text-gray-900">{resume.name}</h1>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                        {resume.contact.email && <span>📧 {resume.contact.email}</span>}
                        {resume.contact.phone && <span>📱 {resume.contact.phone}</span>}
                        {resume.contact.location && <span>📍 {resume.contact.location}</span>}
                      </div>
                    </div>

                    {/* Summary */}
                    {resume.summary && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Professional Summary</h2>
                        <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {resume.experience.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
                        <div className="space-y-4">
                          {resume.experience.map(exp => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                  <p className="text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                              </div>
                              <p className="text-gray-700 mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resume.skills.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.map(skill => (
                            <span
                              key={skill.id}
                              className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resume.education.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
                        <div className="space-y-3">
                          {resume.education.map(edu => (
                            <div key={edu.id}>
                              <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                              <p className="text-gray-600">{edu.school} ({edu.year})</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedResumeEditor;
