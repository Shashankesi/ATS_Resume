import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, CheckCircle2, Download, Sparkles } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Resume',
      description: 'Start by uploading your resume or creating a new one. Support PDF and text formats.',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our AI analyzes your resume for ATS compatibility, content quality, and improvement opportunities.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      title: 'Get Suggestions',
      description: 'Receive personalized recommendations to enhance your resume with proven techniques.',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: 4,
      title: 'Apply & Download',
      description: 'Apply improvements with one click and download your enhanced resume immediately.',
      icon: Download,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How SmartCareer Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Four simple steps to transform your career journey
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex gap-8 items-center md:mb-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Left: Step Content */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{step.description}</p>
                    <motion.div
                      className="inline-flex items-center gap-2 text-orange-400 font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right: Step Number */}
                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
                  >
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </motion.div>

                  {/* Arrow to next step */}
                  {index < steps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="ml-4 w-12 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { value: '10K+', label: 'Users Transformed' },
            { value: '92%', label: 'Success Rate' },
            { value: '15 min', label: 'Average Time' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
