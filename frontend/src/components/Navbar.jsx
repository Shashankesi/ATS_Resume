import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, FileText, Settings, Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isActive = (href) => location.pathname === href;
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize dark mode from localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };
    
    // Apply initial theme
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const navItems = isAuthenticated
        ? [
              { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
              { name: 'Editor', href: '/resume/new', icon: FileText },
              { name: 'Admin', href: '/admin', icon: Settings, adminOnly: true }, // Admin link
          ]
        : [
              { name: 'Features', href: '/features' },
              { name: 'Pricing', href: '/pricing' },
          ];

    const mobileMenuVariants = {
        hidden: { x: '100%' },
        visible: { x: 0, transition: { type: 'tween' } },
    };

    return (
        <header 
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0f172a]/80 via-[#0a0e27]/70 to-transparent backdrop-blur-xl border-b border-slate-700/30"
          role="banner"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link 
                      to="/" 
                      className="flex items-center space-x-2 text-xl font-bold group"
                      aria-label="SmartCareer Home"
                    >
                        <motion.div 
                            className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-xl"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Sparkles className="h-5 w-5 text-white" />
                        </motion.div>
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">SmartCareer</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {navItems.map((item) => (
                            // Only show admin link to admin users
                            (!item.adminOnly || user?.role === 'admin') && (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`relative text-slate-400 hover:text-slate-100 transition-colors duration-200 font-medium group ${isActive(item.href) ? 'text-orange-400' : ''}`}
                                >
                                    {item.name}
                                    <motion.span 
                                        className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full ${isActive(item.href) ? 'w-full' : 'w-0'}`}
                                        layoutId="underline"
                                        animate={{ width: isActive(item.href) ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-slate-700/50 transition"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-400" />}
                        </motion.button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="flex items-center space-x-3 text-sm font-medium text-slate-300 hover:text-slate-100 transition px-3 py-2 rounded-lg hover:bg-slate-700/30">
                                    <motion.div 
                                        className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </motion.div>
                                    <span className='hidden sm:inline'>{user?.name?.split(' ')[0] || 'User'}</span>
                                </Link>
                                <motion.button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <LogOut className="h-4 w-4 inline-block mr-2"/>
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
                                    >
                                        Sign In
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                variants={mobileMenuVariants}
                className="md:hidden absolute top-16 right-0 w-64 h-[calc(100vh-64px)] bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl shadow-xl p-4 border-l border-slate-700/50"
            >
                <div className="space-y-4 pt-2">
                    {navItems.map((item) => (
                         (!item.adminOnly || user?.role === 'admin') && (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition ${
                                    isActive(item.href)
                                        ? 'text-orange-400 bg-orange-500/10'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'
                                }`}
                            >
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span>{item.name}</span>
                            </Link>
                         )
                    ))}
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition mt-4"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </motion.div>
        </header>
    );
};

export default Navbar;