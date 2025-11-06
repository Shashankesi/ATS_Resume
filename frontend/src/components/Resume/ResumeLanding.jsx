import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Sparkles, BarChart3, Layout, Download, 
  Zap, CheckCircle, ArrowRight, Star, Rocket
} from 'lucide-react';

const ResumeLanding = ({ onNavigate }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'editor',
      title: 'Advanced Resume Editor',
      description: 'Professional drag-and-drop editor with real-time preview and multiple templates',
      icon: FileText,
      color: 'from-blue-600 to-blue-400',
      benefits: [
        'Multiple resume templates',
        'Real-time live preview',
        'Drag-and-drop sections',
        'Auto-save functionality',
        'Rich text editing'
      ]
    },
    {
      id: 'ai-enhance',
      title: 'AI Resume Enhancer',
      description: 'Get AI-powered suggestions to improve every section of your resume',
      icon: Sparkles,
      color: 'from-purple-600 to-pink-500',
      benefits: [
        '3 enhancement modes',
        'Section-specific suggestions',
        'Before/after comparisons',
        'Impact scoring',
        'Batch apply improvements'
      ]
    },
    {
      id: 'analytics',
      title: 'Resume Analytics',
      description: 'Comprehensive analytics including ATS score, readability, and keyword matching',
      icon: BarChart3,
      color: 'from-green-600 to-emerald-400',
      benefits: [
        'ATS compatibility score',
        'Readability analysis',
        'Keyword extraction',
        'Issue detection',
        'Improvement suggestions'
      ]
    },
    {
      id: 'templates',
      title: 'Resume Templates',
      description: 'Choose from 4 professionally designed resume templates',
      icon: Layout,
      color: 'from-orange-600 to-yellow-400',
      benefits: [
        'Modern template',
        'Creative template',
        'Professional template',
        'Minimal template',
        'Instant switching'
      ]
    },
    {
      id: 'export',
      title: 'Export & Share',
      description: 'Download and share your resume in multiple formats',
      icon: Download,
      color: 'from-red-600 to-pink-400',
      benefits: [
        'PDF export',
        'Word format',
        'Plain text',
        'Print-ready version',
        'Direct sharing'
      ]
    },
    {
      id: 'versions',
      title: 'Version Control',
      description: 'Track changes and compare different versions of your resume',
      icon: Zap,
      color: 'from-indigo-600 to-blue-400',
      benefits: [
        'Save multiple versions',
        'Version history',
        'Compare versions',
        'Restore previous versions',
        'Track all changes'
      ]
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Select Template',
      description: 'Choose from 4 professionally designed templates that match your style'
    },
    {
      number: '2',
      title: 'Add Your Content',
      description: 'Easily add and edit your experience, education, skills, and more'
    },
    {
      number: '3',
      title: 'Get AI Suggestions',
      description: 'Receive AI-powered improvements tailored to each resume section'
    },
    {
      number: '4',
      title: 'Analyze & Optimize',
      description: 'Review analytics and optimize for ATS and recruiter preferences'
    },
    {
      number: '5',
      title: 'Download & Share',
      description: 'Export your perfect resume and apply with confidence'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden py-20 px-6 sm:px-12 text-center"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10">
          Craft Your Perfect
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Resume
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto relative z-10">
          Professional resume editor with AI-powered suggestions, ATS optimization, and multiple templates
        </p>

        <motion.button
          onClick={() => onNavigate?.('editor')}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg text-lg hover:shadow-2xl transition-all relative z-10"
        >
          Start Building Your Resume
          <ArrowRight className="inline-block ml-2 w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-slate-400 text-lg">Everything you need to create an outstanding resume</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedFeature(feature.id)}
                whileHover={{ y: -10 }}
                className="bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl p-6 cursor-pointer transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{feature.description}</p>
                <div className="text-xs text-slate-500">Click to learn more →</div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Detail */}
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {features.find(f => f.id === selectedFeature) && (
                  <>
                    {(() => {
                      const feature = features.find(f => f.id === selectedFeature);
                      const Icon = feature.icon;
                      return (
                        <>
                          <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg p-4 mb-4`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                          <p className="text-slate-300 text-lg mb-6">{feature.description}</p>
                        </>
                      );
                    })()}
                  </>
                )}
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Key Benefits
                </h4>
                <ul className="space-y-3">
                  {features.find(f => f.id === selectedFeature)?.benefits.map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400 text-lg">Create a professional resume in just 5 steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-1 bg-gradient-to-r from-orange-500 to-transparent" />
              )}

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => onNavigate?.('editor')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg text-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
          >
            <Rocket className="w-5 h-5" />
            Start Building Now
          </motion.button>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Resumes Created', value: '10,000+' },
            { label: 'Templates', value: '4' },
            { label: 'AI Suggestions', value: '1000+' },
            { label: 'Success Rate', value: '95%' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-400 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeLanding;
