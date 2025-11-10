import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, User, LogOut, LayoutDashboard, FileText, Settings, Sun, Moon, Sparkles, ChevronDown, Zap, TrendingUp, MessageCircle, Briefcase, ArrowRight, Search, Bell, HelpCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavbarEnhanced = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
    const [showHelpDropdown, setShowHelpDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Define navItems BEFORE using it
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
            { name: 'Help', href: '/help' },
        ];

    // Now we can safely use navItems
    const filteredNavItems = navItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!item.adminOnly || user?.role === 'admin')
    );

    const isActive = (href) => location.pathname === href;

    const aiFeatures = [
        { name: 'ATS Checker', href: '/ats-checker', icon: Zap, color: 'text-yellow-400' },
        { name: 'Resume Improver', href: '/resume-improver', icon: Sparkles, color: 'text-purple-400' },
        { name: 'Skills Intelligence', href: '/skills-suggestion', icon: TrendingUp, color: 'text-teal-400' },
        { name: 'Job Recommendations', href: '/jobs', icon: Briefcase, color: 'text-green-400' },
        { name: 'AI Career Chat', href: '/ai-chat', icon: MessageCircle, color: 'text-blue-400' },
        { name: 'Cover Letter', href: '/cover-letter', icon: FileText, color: 'text-indigo-400' },
    ];

    const helpItems = [
        { name: 'Documentation', href: '/docs', icon: BookOpen, description: 'User guides & tutorials' },
        { name: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Frequently asked questions' },
        { name: 'Support', href: '/support', icon: MessageCircle, description: 'Get help from our team' },
    ];

    // Handle search input focus
    const handleSearchFocus = () => {
        setShowSearchResults(true);
    };

    const handleSearchBlur = () => {
        // Delay hiding to allow clicking on results
        setTimeout(() => setShowSearchResults(false), 200);
    };

    const handleFeaturesClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // If already on home page, just scroll to features
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home page and then scroll to features
            navigate('/#features');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

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
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(15, 23, 42, 0.85) 100%)',
                borderBottom: '1px solid rgba(249, 115, 22, 0.2)',
                boxShadow: '0 12px 48px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
                                    {item.name === 'Features' ? (
                                        <button
                                            onClick={handleFeaturesClick}
                                            className={`relative px-5 py-2.5 rounded-lg transition-all duration-300 font-semibold flex items-center space-x-2 overflow-hidden group ${
                                                location.pathname === '/' && location.hash === '#features'
                                                    ? 'text-orange-200 bg-gradient-to-r from-orange-500/30 to-orange-500/10 border border-orange-400/50 shadow-lg shadow-orange-500/20'
                                                    : 'text-slate-200 hover:text-white border border-transparent'
                                            }`}
                                        >
                                            {/* Hover gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-transparent group-hover:to-orange-500/0 transition-all duration-300 -z-10"></div>
                                            
                                            {item.icon && <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />}
                                            <span>{item.name}</span>
                                            {item.name === 'Features' && isAuthenticated && (
                                                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                                            )}
                                            {(location.pathname === '/' && location.hash === '#features') && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full blur-sm"
                                                    style={{ width: '90%' }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                />
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={`relative px-5 py-2.5 rounded-lg transition-all duration-300 font-semibold flex items-center space-x-2 overflow-hidden group ${
                                                isActive(item.href)
                                                    ? 'text-orange-200 bg-gradient-to-r from-orange-500/30 to-orange-500/10 border border-orange-400/50 shadow-lg shadow-orange-500/20'
                                                    : 'text-slate-200 hover:text-white border border-transparent'
                                            }`}
                                        >
                                            {/* Hover gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-transparent group-hover:to-orange-500/0 transition-all duration-300 -z-10"></div>
                                            
                                            {item.icon && <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />}
                                            <span>{item.name}</span>
                                            {item.name === 'Features' && isAuthenticated && (
                                                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                                            )}
                                            {isActive(item.href) && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full blur-sm"
                                                    style={{ width: '90%' }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                />
                                            )}
                                        </Link>
                                    )}

                                    {/* Features Dropdown */}
                                    {item.name === 'Features' && isAuthenticated && (
                                        <AnimatePresence>
                                            {showFeaturesDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                    className="absolute top-full left-0 mt-4 w-72 bg-gradient-to-br from-slate-800/98 via-slate-800/95 to-slate-900/98 backdrop-blur-2xl border border-orange-500/40 rounded-2xl shadow-2xl overflow-hidden z-50"
                                                    style={{
                                                        boxShadow: '0 24px 72px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                                    }}
                                                >
                                                    {/* Gradient header */}
                                                    <div className="px-4 pt-4 pb-2">
                                                        <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">AI Features</div>
                                                    </div>
                                                    
                                                    <div className="px-2 pb-2 space-y-1">
                                                        {aiFeatures.map((feature, idx) => (
                                                            <motion.div
                                                                key={feature.href}
                                                                initial={{ opacity: 0, x: -15 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.06 }}
                                                            >
                                                                <Link
                                                                    to={feature.href}
                                                                    onClick={() => setShowFeaturesDropdown(false)}
                                                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-500/5 border border-transparent hover:border-orange-500/40 transition-all group active:scale-95"
                                                                >
                                                                    <motion.div 
                                                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                                                        className="relative"
                                                                    >
                                                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/30 group-hover:to-orange-500/10 rounded-lg blur transition-all"></div>
                                                                        <feature.icon className={`h-5 w-5 ${feature.color} group-hover:scale-110 transition-transform relative`} />
                                                                    </motion.div>
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                                                                            {feature.name}
                                                                        </div>
                                                                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Intelligent tools</div>
                                                                    </div>
                                                                    <motion.div
                                                                        initial={{ opacity: 0, x: -5 }}
                                                                        whileHover={{ opacity: 1, x: 5 }}
                                                                    >
                                                                        <ArrowRight className="h-4 w-4 text-orange-400/0 group-hover:text-orange-400 transition-colors" />
                                                                    </motion.div>
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
                        {/* Search Bar - Only for authenticated users */}
                        {isAuthenticated && (
                            <motion.div className="hidden md:flex items-center relative">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search navigation..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                        className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                    />

                                    {/* Search Results Dropdown */}
                                    <AnimatePresence>
                                        {showSearchResults && searchQuery && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full mt-2 w-full bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
                                            >
                                                {filteredNavItems.length > 0 ? (
                                                    filteredNavItems.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            to={item.href}
                                                            onClick={() => {
                                                                setSearchQuery('');
                                                                setShowSearchResults(false);
                                                            }}
                                                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/40 transition-all border-b border-slate-700/30 last:border-b-0"
                                                        >
                                                            {item.icon && <item.icon className="h-4 w-4 text-orange-400" />}
                                                            <span className="text-slate-300">{item.name}</span>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-slate-400 text-sm">
                                                        No results found
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {/* Help Dropdown */}
                        <motion.div
                            className="relative"
                            onMouseEnter={() => setShowHelpDropdown(true)}
                            onMouseLeave={() => setShowHelpDropdown(false)}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/20 transition-all text-slate-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/30"
                                aria-label="Help"
                            >
                                <HelpCircle className="h-5 w-5" />
                            </motion.button>

                            {/* Help Dropdown */}
                            <AnimatePresence>
                                {showHelpDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="absolute right-0 top-full mt-4 w-64 bg-gradient-to-br from-slate-800/98 via-slate-800/95 to-slate-900/98 backdrop-blur-2xl border border-orange-500/40 rounded-2xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="px-4 pt-4 pb-2">
                                            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Help & Support</div>
                                        </div>
                                        
                                        <div className="px-2 pb-2 space-y-1">
                                            {helpItems.map((item, idx) => (
                                                <motion.div
                                                    key={item.href}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.06 }}
                                                >
                                                    <Link
                                                        to={item.href}
                                                        onClick={() => setShowHelpDropdown(false)}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-500/5 border border-transparent hover:border-orange-500/40 transition-all group"
                                                    >
                                                        <motion.div 
                                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                                            className="relative"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/30 group-hover:to-orange-500/10 rounded-lg blur transition-all"></div>
                                                            <item.icon className="h-5 w-5 text-orange-400 group-hover:scale-110 transition-transform relative" />
                                                        </motion.div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{item.description}</div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Notifications - Only for authenticated users */}
                        {isAuthenticated && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/20 transition-all text-slate-300 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 relative"
                                aria-label="Notifications"
                            >
                                <Bell className="h-5 w-5" />
                                {/* Notification badge */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></div>
                            </motion.button>
                        )}

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
                        <nav className="px-4 py-4 space-y-4">
                            {/* Mobile Search */}
                            {isAuthenticated && (
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search navigation..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            )}

                            {navItems.map((item) => (
                                (!item.adminOnly || user?.role === 'admin') && (
                                    item.name === 'Features' ? (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                handleFeaturesClick();
                                                setIsOpen(false);
                                            }}
                                            className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                                                location.pathname === '/' && location.hash === '#features'
                                                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                                                    : 'text-slate-300 hover:bg-slate-700/40'
                                            }`}
                                        >
                                            {item.icon && <item.icon className="h-5 w-5" />}
                                            <span>{item.name}</span>
                                        </button>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                                                isActive(item.href)
                                                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                                                    : 'text-slate-300 hover:bg-slate-700/40'
                                            }`}
                                        >
                                            {item.icon && <item.icon className="h-5 w-5" />}
                                            <span>{item.name}</span>
                                        </Link>
                                    )
                                )
                            ))}

                            {/* Mobile Help Items */}
                            <div className="border-t border-slate-700/30 pt-4 mt-4">
                                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">Help & Support</div>
                                {helpItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/40 transition-all"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all border-t border-slate-700/30 mt-4 pt-4 flex items-center gap-3"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
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
