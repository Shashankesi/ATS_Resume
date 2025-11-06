import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, FileText, Settings, Sun, Moon } from 'lucide-react';
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
        <header className="fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-md dark:bg-card-dark/70 bg-white/80 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-dark dark:text-primary-dark">
                        <FileText className="h-6 w-6" />
                        <span>SmartCareer</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {navItems.map((item) => (
                            // Only show admin link to admin users
                            (!item.adminOnly || user?.role === 'admin') && (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`relative text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-dark transition-colors duration-200 font-medium ${isActive(item.href) ? 'text-primary-dark' : ''}`}
                                >
                                    {item.name}
                                    {isActive(item.href) && (
                                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary-dark rounded-full" />
                                    )}
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="flex items-center space-x-2 text-sm font-medium dark:text-gray-200 hover:text-primary-dark">
                                    <User className="h-5 w-5" />
                                    <span className='hidden sm:inline'>{user?.name?.split(' ')[0] || 'User'}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-orange-700 transition duration-150 shadow-md"
                                >
                                    <LogOut className="h-4 w-4 inline-block mr-1"/>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-dark rounded-lg hover:bg-primary-light transition duration-150 shadow-md"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial="hidden"
                animate={isOpen ? "visible" : "hidden"}
                variants={mobileMenuVariants}
                className="md:hidden absolute top-16 right-0 w-64 h-[calc(100vh-64px)] bg-white dark:bg-card-dark shadow-xl p-4 transform transition-transform duration-300 ease-in-out"
            >
                <div className="space-y-4 pt-2">
                    {navItems.map((item) => (
                         (!item.adminOnly || user?.role === 'admin') && (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 p-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
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
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-dark hover:bg-primary-light transition duration-150"
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