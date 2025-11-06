import React from 'react';
import { Github, Linkedin, Globe, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Globe, label: 'Website', href: '#', color: 'hover:text-blue-400' },
    { icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-300' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-500' },
    { icon: Mail, label: 'Email', href: '#', color: 'hover:text-orange-400' },
  ];

  const footerLinks = [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  return (
    <footer className="relative mt-20 border-t border-gradient-to-r from-orange-500/20 via-pink-500/0 to-orange-500/20 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-950/50 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-slate-700/50">
          {/* Brand info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">SmartCareer</span>
            </div>
            <p className="text-sm text-gray-400">AI-powered career advancement platform transforming resumes into opportunities.</p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 4, color: '#ff8c00' }}
                  className="flex text-sm text-gray-400 hover:text-orange-400 transition-colors items-center gap-2"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-white">Stay Updated</h3>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus-within:border-orange-500/50 transition-colors group">
              <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-orange-400 transition-colors" />
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-sm text-gray-400">
            © {currentYear} SmartCareer AI. All rights reserved. • Built with ✨ Intelligence
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 ${social.color} transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
