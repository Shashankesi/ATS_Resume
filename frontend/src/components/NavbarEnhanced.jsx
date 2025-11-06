import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, User, LogOut, LayoutDashboard, FileText, Settings, Sun, Moon, Sparkles, ChevronDown, Zap, TrendingUp, MessageCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarEnhanced = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (href) => location.pathname === href;

    const aiFeatures = [
        { name: 'ATS Checker', href: '/ats-checker', icon: Zap, color: 'text-yellow-400' },
        { name: 'Resume Improver', href: '/resume-improver', icon: Sparkles, color: 'text-purple-400' },
        { name: 'Skills Intelligence', href: '/skills-suggestion', icon: TrendingUp, color: 'text-teal-400' },
        { name: 'Job Recommendations', href: '/jobs', icon: Briefcase, color: 'text-green-400' },
        { name: 'AI Career Chat', href: '/ai-chat', icon: MessageCircle, color: 'text-blue-400' },
        { name: 'Cover Letter', href: '/cover-letter', icon: FileText, color: 'text-indigo-400' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const navItems = isAuthenticated
        ? [
            { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { name: 'Resume', href: '/resume/new', icon: FileText },
            { name: 'Features', href: '/#features' },
            { name: 'Admin', href: '/admin', icon: Settings, adminOnly: true },
        ]
        : [
            { name: 'Home', href: '/' },
            { name: 'Features', href: '/#features' },
        ];

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        exit: { opacity: 0, y: -20 }
    };

    const linkVariants = {
        rest: { x: 0 },
        hover: { x: 4, transition: { type: 'spring', stiffness: 400 } }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
            style={{
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.8))',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
        >
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo with enhanced styling */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 group"
                    >
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-60 group-hover:opacity-100"></div>
                            <Sparkles className="h-7 w-7 text-orange-400 relative z-10 group-hover:text-white transition-colors" />
                        </motion.div>
                        <motion.span 
                            className="text-2xl font-black bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-pink-300 transition-all"
                            whileHover={{ letterSpacing: '0.05em' }}
                        >
                            SmartCareer
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-1">
                        {navItems.map((item) => (
                            (!item.adminOnly || user?.role === 'admin') && (
                                <motion.div
                                    key={item.name}
                                    variants={linkVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    className="relative"
                                    onMouseEnter={() => item.name === 'Features' && isAuthenticated && setShowFeaturesDropdown(true)}
                                    onMouseLeave={() => item.name === 'Features' && setShowFeaturesDropdown(false)}
                                >
                                    <Link
                                        to={item.href}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                                            isActive(item.href)
                                                ? 'text-orange-300 bg-orange-500/20 border border-orange-500/50'
                                                : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                                        } group flex items-center space-x-2 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 transition-all`}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.name}</span>
                                        {item.name === 'Features' && isAuthenticated && (
                                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                                        )}
                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                                                style={{ width: '80%' }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            />
                                        )}
                                    </Link>

                                    {/* Features Dropdown */}
                                    {item.name === 'Features' && isAuthenticated && (
                                        <AnimatePresence>
                                            {showFeaturesDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -15 }}
                                                    className="absolute top-full left-0 mt-3 w-64 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden z-50"
                                                    style={{
                                                        boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
                                                    }}
                                                >
                                                    <div className="p-3">
                                                        {aiFeatures.map((feature, idx) => (
                                                            <motion.div
                                                                key={feature.href}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                            >
                                                                <Link
                                                                    to={feature.href}
                                                                    onClick={() => setShowFeaturesDropdown(false)}
                                                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 border border-transparent hover:border-orange-500/30 transition-all group"
                                                                >
                                                                    <motion.div whileHover={{ scale: 1.1 }}>
                                                                        <feature.icon className={`h-5 w-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                                                                    </motion.div>
                                                                    <div>
                                                                        <div className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                                                                            {feature.name}
                                                                        </div>
                                                                        <div className="text-xs text-gray-400">AI-powered tool</div>
                                                                    </div>
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </motion.div>
                            )
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/20 transition-all text-slate-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/30"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </motion.button>

                        {/* User Menu or Auth Links */}
                        {isAuthenticated ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hidden md:flex items-center space-x-3"
                            >
                                <motion.div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-orange-500/50 transition-all cursor-pointer" whileHover={{ scale: 1.05 }}>
                                    {user?.photo ? (
                                        <img src={user.photo} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                                    ) : (
                                        <User className="h-5 w-5 text-white" />
                                    )}
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-500/30 hover:border-red-500/50 transition-all font-semibold"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm">Logout</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all font-semibold border border-transparent hover:border-white/20"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 transition-all font-bold shadow-lg hover:shadow-orange-500/50"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-700/40 transition-colors"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6 text-slate-300" />
                            ) : (
                                <Menu className="h-6 w-6 text-slate-300" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden border-t border-slate-700/30 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl"
                    >
                        <nav className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                (!item.adminOnly || user?.role === 'admin') && (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-2 rounded-lg transition-all ${
                                            isActive(item.href)
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'text-slate-300 hover:bg-slate-700/40'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            ))}
                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                                >
                                    Logout
                                </button>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default NavbarEnhanced;
