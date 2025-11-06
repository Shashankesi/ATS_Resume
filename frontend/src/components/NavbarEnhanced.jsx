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
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Glassmorphic background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-slate-700/30" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo with gradient */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 group"
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <Sparkles className="h-6 w-6 text-blue-500 group-hover:text-cyan-400 transition-colors" />
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-cyan-400/30" />
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-pink-300 transition-all">
                            SmartCareer
                        </span>
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
                                        className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
                                            isActive(item.href)
                                                ? 'text-blue-400 bg-blue-500/10'
                                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                                        } group flex items-center space-x-1`}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.name}</span>
                                        {item.name === 'Features' && isAuthenticated && (
                                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                        )}
                                        {isActive(item.href) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            />
                                        )}
                                    </Link>

                                    {/* Features Dropdown */}
                                    {item.name === 'Features' && isAuthenticated && (
                                        <AnimatePresence>
                                            {showFeaturesDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl border border-slate-700/30 rounded-lg shadow-xl overflow-hidden z-50"
                                                >
                                                    <div className="p-2">
                                                        {aiFeatures.map((feature) => (
                                                            <Link
                                                                key={feature.href}
                                                                to={feature.href}
                                                                onClick={() => setShowFeaturesDropdown(false)}
                                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors group"
                                                            >
                                                                <feature.icon className={`h-4 w-4 ${feature.color}`} />
                                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                                                    {feature.name}
                                                                </span>
                                                            </Link>
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
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/50 transition-colors text-slate-300 hover:text-yellow-400"
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
                                className="hidden md:flex items-center space-x-2"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                                    {user?.photo ? (
                                        <img src={user.photo} alt={user.name} className="h-8 w-8 rounded-full" />
                                    ) : (
                                        <User className="h-4 w-4 text-white" />
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="text-sm">Logout</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-3 py-2 rounded-lg text-slate-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
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
