import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Eye, Download, Zap } from 'lucide-react';

const ResumeTemplates = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean, contemporary design with bold typography',
      preview: (
        <div className="p-6 bg-white text-gray-900">
          <h1 className="text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-blue-600 mb-4">Full Stack Developer | San Francisco, CA</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Professional Summary</h3>
              <p className="text-sm text-gray-600">Experienced developer with 5+ years...</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Experience</h3>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-semibold">Senior Developer</p>
                <p className="text-sm text-gray-600">Tech Corp | 2021 - Present</p>
              </div>
            </div>
          </div>
        </div>
      ),
      colors: { primary: 'bg-blue-600', accent: 'text-blue-600' }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Artistic design with gradient and modern layout',
      preview: (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black mb-1">JOHN DOE</h1>
              <p className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                Creative Developer
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs font-bold text-purple-600 mb-1">SKILLS</p>
              <p className="text-sm">React, Node.js, Design</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs font-bold text-pink-600 mb-1">EXPERIENCE</p>
              <p className="text-sm">5+ Years</p>
            </div>
          </div>
        </div>
      ),
      colors: { primary: 'bg-gradient-to-r from-purple-600 to-pink-600', accent: 'text-pink-600' }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional, corporate-style resume design',
      preview: (
        <div className="p-8 bg-white text-gray-900">
          <div className="border-b-2 border-gray-900 pb-4 mb-6">
            <h1 className="text-2xl font-bold">JOHN DOE</h1>
            <div className="flex gap-6 text-xs mt-2">
              <span>📧 john@example.com</span>
              <span>📱 (555) 123-4567</span>
              <span>📍 San Francisco, CA</span>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-gray-900">PROFESSIONAL EXPERIENCE</h3>
              <p className="mt-2">Senior Developer | Tech Corp | Jan 2021 - Present</p>
              <p className="text-xs text-gray-600">Led development of key features...</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">EDUCATION</h3>
              <p className="mt-2">B.S. Computer Science | State University | 2019</p>
            </div>
          </div>
        </div>
      ),
      colors: { primary: 'bg-gray-900', accent: 'text-gray-900' }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean, minimalist design with focus on content',
      preview: (
        <div className="p-6 bg-slate-50 text-gray-900">
          <div className="mb-6">
            <h1 className="text-xl font-light tracking-wider mb-2">john doe</h1>
            <p className="text-xs text-gray-500 space-y-1">
              <div>john@example.com · (555) 123-4567</div>
              <div>San Francisco, CA</div>
            </p>
          </div>
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <p className="font-semibold">Experience</p>
              <p>Senior Developer · Tech Corp · 2021–Present</p>
              <p className="text-gray-600">Developed and maintained key features</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Skills</p>
              <p>React · Node.js · JavaScript · Python · AWS</p>
            </div>
          </div>
        </div>
      ),
      colors: { primary: 'bg-slate-600', accent: 'text-slate-600' }
    }
  ];

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-slate-400 text-lg">
            Select a professional template and customize it to match your style
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleSelectTemplate(template)}
              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group ${
                selectedTemplate?.id === template.id
                  ? 'border-orange-500 shadow-lg shadow-orange-500/50'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {/* Preview */}
              <div className="bg-slate-800 h-48 overflow-hidden relative">
                {template.preview}
              </div>

              {/* Info */}
              <div className="bg-slate-800/50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{template.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                  </div>
                  {selectedTemplate?.id === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Hover Actions */}
              <div className="bg-slate-700/50 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300 text-sm font-medium transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 rounded text-green-300 text-sm font-medium transition-colors">
                  <Copy className="w-4 h-4" />
                  Use
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Template Details */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Full Preview */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">Full Preview</h2>
                <div className="bg-white rounded-lg p-8 shadow-2xl">
                  {selectedTemplate.preview}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{selectedTemplate.name}</h3>
                  <p className="text-slate-400">{selectedTemplate.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'ATS-Optimized Format',
                      'Fully Customizable',
                      'Mobile Responsive',
                      'Easy to Export',
                      'Professional Design'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-slate-700/50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    Use This Template
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Template
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'ATS Compatible',
              description: 'All templates are optimized for Applicant Tracking Systems'
            },
            {
              title: 'Easy to Customize',
              description: 'Change colors, fonts, and layouts to match your brand'
            },
            {
              title: 'Multiple Export Formats',
              description: 'Download as PDF, Word, or plain text'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 text-center">
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
