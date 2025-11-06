import React from 'react';
import { Link } from 'react-router-dom';
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
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load Hero3D to prevent rendering errors
const Hero3D = React.lazy(() => import('../components/Hero3D'));

const Home = () => {
    const { isAuthenticated } = useAuth();
    
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
          title: 'AI-Powered Resume Builder', 
          description: 'Create ATS-optimized resumes with AI suggestions and real-time improvements.',
          color: 'from-purple-500 to-blue-500'
        },
        { 
          icon: Zap, 
          title: 'Instant ATS Analysis', 
          description: 'Get your ATS score in seconds and discover missing keywords.',
          color: 'from-yellow-500 to-orange-500'
        },
        { 
          icon: Target, 
          title: 'Smart Job Matching', 
          description: 'Discover perfectly matched jobs based on your skills and experience.',
          color: 'from-green-500 to-teal-500'
        },
        { 
          icon: Brain, 
          title: 'Career AI Chat', 
          description: 'Chat with our AI for instant career guidance and interview prep.',
          color: 'from-pink-500 to-rose-500'
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
                                    className="group px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Started Free
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/features"
                                    className="px-8 py-4 border-2 border-orange-500/50 text-white font-bold rounded-xl hover:bg-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Explore Features
                                    <ArrowRight className="h-5 w-5" />
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

                        {/* Right - 3D Visual */}
                        <motion.div 
                            className="h-80 md:h-96 w-full max-w-md mx-auto relative"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
                            <ErrorBoundary>
                                <React.Suspense fallback={
                                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center border border-orange-500/20">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }} className="text-center">
                                            <Rocket className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                                            <p className="text-gray-300">Loading 3D Scene...</p>
                                        </motion.div>
                                    </div>
                                }>
                                    <Hero3D />
                                </React.Suspense>
                            </ErrorBoundary>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/50 transition-all duration-300"
                                variants={itemVariants}
                                custom={index}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 20px 60px rgba(249, 115, 22, 0.3)"
                                }}
                            >
                                {/* Icon Container */}
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-full w-full text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

                                {/* Footer */}
                                <div className="flex items-center text-orange-400 font-semibold group-hover:gap-2 transition-all">
                                    Learn more <ArrowRight className="h-4 w-4 ml-2" />
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
                            </motion.div>
                        ))}
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