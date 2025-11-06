import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Zap, Search, MessageSquare } from 'lucide-react';
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
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const features = [
        { icon: FileText, title: 'ATS-Friendly Builder', description: 'Create resumes optimized for Applicant Tracking Systems with compliance toggles.' },
        { icon: Zap, title: 'AI ATS Scoring', description: 'Analyze your resume against any job description and get actionable keyword suggestions.' },
        { icon: Search, title: 'Smart Job Matching', description: 'Receive personalized job recommendations refined by AI based on your skills and profile.' },
        { icon: MessageSquare, title: 'AI Chat Assistant', description: 'Get instant answers and career advice powered by a conversational AI model.' },
    ];

    return (
        <motion.div 
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br dark:from-background-dark dark:to-card-dark from-gray-50 to-white animated-gradient-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left - Text Content */}
                    <div className="text-center md:text-left">
                        <motion.h1 
                            className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight dark:text-white text-gray-900"
                            variants={itemVariants}
                        >
                            Future-Proof Your <span className="text-primary-dark dark:text-primary-dark">Career</span> with AI
                        </motion.h1>
                        <motion.p 
                            className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0"
                            variants={itemVariants}
                        >
                            Build a high-impact, ATS-optimized resume and get personalized, AI-driven job recommendations and skill gap analysis.
                        </motion.p>
                        <motion.div 
                            className="mt-8 flex justify-center md:justify-start space-x-4"
                            variants={itemVariants}
                        >
                            <Link
                                to={isAuthenticated ? "/dashboard" : "/register"}
                                className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/features"
                                className="px-6 py-3 border border-gray-300 dark:border-slate-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300"
                            >
                                View Features
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right - 3D Visual */}
                    <motion.div 
                        className="h-80 md:h-96 w-full max-w-md mx-auto"
                        variants={itemVariants}
                    >
                        <ErrorBoundary>
                            <React.Suspense fallback={
                                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center">
                                    <p className="text-slate-600 dark:text-slate-300">Loading 3D Visualization...</p>
                                </div>
                            }>
                                <Hero3D />
                            </React.Suspense>
                        </ErrorBoundary>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                    className="text-4xl font-bold text-center dark:text-white mb-12"
                    variants={itemVariants}
                >
                    Why SmartCareer?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-6 glass-card text-center"
                            variants={itemVariants}
                            custom={index}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.2)" }}
                        >
                            <feature.icon className="h-10 w-10 text-primary-dark mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default Home;