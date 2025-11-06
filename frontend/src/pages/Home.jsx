import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  Brain, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Zap,
  Target,
  Trophy,
  Users,
  TrendingUp,
  FileText,
  Briefcase,
  Award,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState(null);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    const features = [
        { 
          icon: Brain, 
          title: 'AI Resume Optimizer', 
          description: 'Get instant ATS score and 16-point optimization checklist',
          color: 'from-purple-500 to-blue-500',
          details: '95% parse rate accuracy'
        },
        { 
          icon: Zap, 
          title: 'Resume Improver', 
          description: 'AI-powered suggestions to enhance your resume content',
          color: 'from-yellow-500 to-orange-500',
          details: '+24% average improvement'
        },
        { 
          icon: Target, 
          title: 'Skills Intelligence', 
          description: 'Get market-based skill recommendations with salary data',
          color: 'from-green-500 to-teal-500',
          details: '+$40-80K earning potential'
        },
        { 
          icon: Briefcase, 
          title: 'Smart Job Matching', 
          description: 'Discover perfectly matched jobs based on your profile',
          color: 'from-pink-500 to-rose-500',
          details: '10K+ jobs available'
        },
        { 
          icon: MessageCircle, 
          title: 'AI Career Chat', 
          description: 'Chat with our AI for instant career guidance',
          color: 'from-cyan-500 to-blue-500',
          details: '24/7 available'
        },
        { 
          icon: FileText, 
          title: 'Cover Letter Generator', 
          description: 'Create tailored cover letters in seconds',
          color: 'from-indigo-500 to-purple-500',
          details: 'Custom for each job'
        },
    ];

    const stats = [
        { number: '10K+', label: 'Users', icon: Users },
        { number: '50K+', label: 'Resumes Optimized', icon: TrendingUp },
        { number: '85%', label: 'Interview Success', icon: Trophy },
        { number: '4.9', label: 'Rating', icon: Star },
    ];

    return (
        <motion.div 
            className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Text Content */}
                        <motion.div className="text-center md:text-left z-10" variants={itemVariants}>
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50 rounded-full mb-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles className="h-4 w-4 text-orange-400" />
                                <span className="text-sm font-semibold text-orange-300">✨ AI-Powered Career Platform</span>
                            </motion.div>

                            {/* Main Heading */}
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                                <span className="text-white">Future-Proof Your</span>
                                <br />
                                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text text-transparent">Career with AI</span>
                            </h1>

                            {/* Description */}
                            <motion.p 
                                className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed"
                                variants={itemVariants}
                            >
                                Transform your job search with AI-powered resume optimization, smart job matching, and personalized career guidance. Join thousands of professionals achieving their dream careers.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div 
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                variants={itemVariants}
                            >
                                <Link
                                    to={isAuthenticated ? "/dashboard" : "/register"}
                                    className="group px-8 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    <motion.span
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        Get Started Free
                                    </motion.span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link
                                    to="/features"
                                    className="px-8 py-4 border-2 border-orange-500/70 text-white font-bold rounded-xl hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30"
                                >
                                    Explore Features
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div className="mt-8 flex items-center gap-4 justify-center md:justify-start" variants={itemVariants}>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-gray-300 text-sm">Trusted by 10,000+ professionals</span>
                            </motion.div>
                        </motion.div>

                        {/* Right - Hero Image */}
                        <motion.div 
                            className="h-80 md:h-full w-full max-w-md mx-auto relative min-h-96"
                            variants={itemVariants}
                        >
                            {/* Gradient overlay background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-purple-500/20 to-pink-500/30 rounded-3xl blur-3xl"></div>
                            
                            {/* Main card with glassmorphism */}
                            <div className="relative w-full h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 flex flex-col items-center justify-center p-8">
                                {/* Resume mockup visual */}
                                <motion.div 
                                    className="w-full space-y-3"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    {/* Resume preview */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-2">
                                        <div className="h-3 bg-orange-400/40 rounded w-3/4"></div>
                                        <div className="h-2 bg-white/20 rounded w-full"></div>
                                        <div className="h-2 bg-white/20 rounded w-5/6"></div>
                                        <div className="space-y-2 mt-3 pt-3 border-t border-white/10">
                                            <div className="h-2 bg-white/15 rounded w-4/5"></div>
                                            <div className="h-2 bg-white/15 rounded w-3/4"></div>
                                            <div className="h-2 bg-white/15 rounded w-5/6"></div>
                                        </div>
                                    </div>

                                    {/* Icons representing features */}
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        <motion.div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 flex items-center justify-center" whileHover={{ scale: 1.05 }}>
                                            <Zap className="w-5 h-5 text-yellow-400" />
                                        </motion.div>
                                        <motion.div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 flex items-center justify-center" whileHover={{ scale: 1.05 }}>
                                            <Sparkles className="w-5 h-5 text-purple-400" />
                                        </motion.div>
                                        <motion.div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-3 flex items-center justify-center" whileHover={{ scale: 1.05 }}>
                                            <Target className="w-5 h-5 text-teal-400" />
                                        </motion.div>
                                    </div>

                                    {/* Stats badges */}
                                    <motion.div className="flex gap-2 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                        <div className="flex-1 bg-gradient-to-r from-orange-500/20 to-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center">
                                            <div className="text-xs font-bold text-orange-300">92%</div>
                                            <div className="text-xs text-gray-400">ATS Match</div>
                                        </div>
                                        <div className="flex-1 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                                            <div className="text-xs font-bold text-green-300">+40K</div>
                                            <div className="text-xs text-gray-400">Salary Boost</div>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-50"></div>
                                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full opacity-30"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/50 transition-all duration-300"
                                variants={itemVariants}
                                custom={index}
                                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(249, 115, 22, 0.2)" }}
                            >
                                <stat.icon className="h-8 w-8 text-orange-400 mb-3" />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div className="text-center mb-16" variants={itemVariants}>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            Powerful Features Built for You
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to land your dream job, powered by cutting-edge AI
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const routeMap = {
                                0: '/ats-checker',
                                1: '/resume-improver',
                                2: '/skills-suggestion',
                                3: '/jobs',
                                4: '/ai-chat',
                                5: '/cover-letter'
                            };
                            const route = routeMap[index];
                            
                            return (
                                <motion.div
                                    key={index}
                                    className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                                    variants={itemVariants}
                                    custom={index}
                                    whileHover={{ 
                                        y: -10,
                                        boxShadow: "0 20px 60px rgba(249, 115, 22, 0.3)"
                                    }}
                                    onClick={() => {
                                        if (route) navigate(route);
                                    }}
                                    onHoverStart={() => setHoveredFeature(index)}
                                    onHoverEnd={() => setHoveredFeature(null)}
                                >
                                    {/* Icon Container */}
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-full w-full text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                                    
                                    {/* Details Badge */}
                                    <p className="text-sm text-orange-400 font-semibold mb-4">{feature.details}</p>

                                    {/* Footer */}
                                    <div className="flex items-center text-orange-400 font-semibold group-hover:gap-2 transition-all">
                                        <motion.span animate={{ x: hoveredFeature === index ? 5 : 0 }} transition={{ duration: 0.3 }}>
                                            Learn more
                                        </motion.span>
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </div>

                                    {/* Hover Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="relative p-12 md:p-16 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-pink-500/20 border border-orange-500/30 rounded-3xl backdrop-blur-xl overflow-hidden"
                        variants={itemVariants}
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity -z-10"></div>

                        <div className="relative text-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                                Ready to Transform Your Career?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of professionals who've successfully landed their dream jobs using SmartCareer
                            </p>
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/register"}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started Now <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;