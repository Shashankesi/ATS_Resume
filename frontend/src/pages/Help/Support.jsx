import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Phone, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { showToast } from '../../utils/toast';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast.success('Support request sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email',
      description: 'support@smartcareer.com',
      delay: 0
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available Mon-Fri, 9am-5pm EST',
      delay: 0.1
    },
    {
      icon: Phone,
      title: 'Phone',
      description: '+1 (800) SMARTCAREER',
      delay: 0.2
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Support Center
          </motion.h1>
          <p className="text-gray-400 text-lg">We're here to help. Get in touch with us anytime.</p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center hover:border-orange-400/30 transition-all"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: channel.delay }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{channel.title}</h3>
                <p className="text-gray-400 text-sm">{channel.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          
          {submitted && (
            <motion.div
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-200">Thank you! Your message has been sent successfully.</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition"
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none transition resize-none"
                placeholder="Describe your issue or question..."
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex justify-center items-center gap-2 transition"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* FAQ Link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 mb-2">
            Can't find what you're looking for?
          </p>
          <Link 
            to="/faq" 
            className="text-orange-400 hover:text-orange-300 font-semibold transition"
          >
            Check our FAQ →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Support;
