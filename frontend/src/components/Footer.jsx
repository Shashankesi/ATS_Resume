import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 border-t dark:border-slate-800 bg-white/70 dark:bg-card-dark/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} SmartCareer. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <a className="hover:text-primary-dark" href="#" aria-label="Website"><Globe className="w-5 h-5"/></a>
          <a className="hover:text-primary-dark" href="#" aria-label="GitHub"><Github className="w-5 h-5"/></a>
          <a className="hover:text-primary-dark" href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5"/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
