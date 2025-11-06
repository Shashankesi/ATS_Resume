import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, Zap, ChevronRight, Search, Filter, Bookmark, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [savedJobs, setSavedJobs] = useState([]);

    const categories = [
        { id: 'all', label: 'All Jobs' },
        { id: 'frontend', label: 'Frontend Developer' },
        { id: 'backend', label: 'Backend Developer' },
        { id: 'fullstack', label: 'Full Stack' },
        { id: 'data', label: 'Data Science' },
        { id: 'design', label: 'UI/UX Design' },
    ];

    // Mock jobs data
    const mockJobs = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc',
            location: 'San Francisco, CA',
            salary: '$120k - $160k',
            category: 'frontend',
            match: 92,
            description: 'Looking for an experienced React developer with 5+ years of experience.',
            posted: '2 days ago',
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
            logo: '🏢'
        },
        {
            id: 2,
            title: 'Full Stack Engineer',
            company: 'StartupXYZ',
            location: 'Remote',
            salary: '$100k - $140k',
            category: 'fullstack',
            match: 88,
            description: 'Join our growing startup! We\'re building the future of AI.',
            posted: '1 day ago',
            skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
            logo: '🚀'
        },
        {
            id: 3,
            title: 'Backend Developer',
            company: 'FinanceHub',
            location: 'New York, NY',
            salary: '$130k - $170k',
            category: 'backend',
            match: 85,
            description: 'Build scalable financial systems with Go and PostgreSQL.',
            posted: '3 days ago',
            skills: ['Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
            logo: '💰'
        },
        {
            id: 4,
            title: 'Data Scientist',
            company: 'AI Innovations',
            location: 'Boston, MA',
            salary: '$110k - $150k',
            category: 'data',
            match: 82,
            description: 'Apply ML models to solve real-world problems.',
            posted: '1 week ago',
            skills: ['Python', 'TensorFlow', 'SQL', 'Spark'],
            logo: '🤖'
        },
        {
            id: 5,
            title: 'UI/UX Designer',
            company: 'DesignStudio',
            location: 'Los Angeles, CA',
            salary: '$90k - $120k',
            category: 'design',
            match: 80,
            description: 'Create beautiful and intuitive user experiences.',
            posted: '3 days ago',
            skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
            logo: '🎨'
        },
        {
            id: 6,
            title: 'React Developer',
            company: 'WebAgency',
            location: 'Chicago, IL',
            salary: '$95k - $130k',
            category: 'frontend',
            match: 87,
            description: 'Build modern web applications with React and Next.js.',
            posted: '2 days ago',
            skills: ['React', 'Next.js', 'CSS-in-JS', 'Git'],
            logo: '⚛️'
        },
        {
            id: 7,
            title: 'DevOps Engineer',
            company: 'CloudSystems',
            location: 'Seattle, WA',
            salary: '$115k - $155k',
            category: 'backend',
            match: 84,
            description: 'Manage and optimize cloud infrastructure.',
            posted: '4 days ago',
            skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
            logo: '☁️'
        },
        {
            id: 8,
            title: 'Machine Learning Engineer',
            company: 'AI Lab',
            location: 'Remote',
            salary: '$125k - $165k',
            category: 'data',
            match: 83,
            description: 'Research and implement cutting-edge ML algorithms.',
            posted: '5 days ago',
            skills: ['PyTorch', 'Python', 'Deep Learning', 'NLP'],
            logo: '🧠'
        },
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setJobs(mockJobs);
            setLoading(false);
        }, 500);
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleSaveJob = (jobId) => {
        setSavedJobs(prev => 
            prev.includes(jobId) 
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Briefcase className="w-8 h-8 text-orange-400" />
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                Smart Job Recommendations
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover opportunities perfectly matched to your skills and experience
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by job title or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        selectedCategory === category.id
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Jobs List */}
                            <div className="lg:col-span-2 space-y-4">
                                {filteredJobs.length > 0 ? (
                                    filteredJobs.map((job, index) => (
                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="group relative p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-3xl">{job.logo}</span>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                                                                {job.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-400">{job.company}</p>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-300 text-sm mb-3">{job.description}</p>

                                                    {/* Details */}
                                                    <div className="flex flex-wrap gap-4 mb-3 text-sm">
                                                        <div className="flex items-center gap-1 text-gray-400">
                                                            <MapPin className="w-4 h-4 text-orange-400" />
                                                            {job.location}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-gray-400">
                                                            <DollarSign className="w-4 h-4 text-green-400" />
                                                            {job.salary}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-gray-400">
                                                            <Clock className="w-4 h-4 text-blue-400" />
                                                            {job.posted}
                                                        </div>
                                                    </div>

                                                    {/* Skills */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.skills.map((skill, i) => (
                                                            <span key={i} className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right Side */}
                                                <div className="flex flex-col items-end gap-3">
                                                    {/* Match Score */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">{job.match}%</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400">Match</span>
                                                    </div>

                                                    {/* Save Button */}
                                                    <button
                                                        onClick={() => toggleSaveJob(job.id)}
                                                        className={`p-2 rounded-lg transition-all ${
                                                            savedJobs.includes(job.id)
                                                                ? 'bg-orange-500 text-white'
                                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        <Bookmark className="w-5 h-5" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Apply Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.03, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                Apply Now <ExternalLink className="w-4 h-4" />
                                            </motion.button>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-400 text-lg">No jobs found matching your criteria</p>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Tips */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-20 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                        Tips for Success
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-orange-400 mb-2">Optimize Your Resume</h4>
                                            <p className="text-xs text-gray-400">Include keywords from job descriptions to improve match scores</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-orange-400 mb-2">Update Your Skills</h4>
                                            <p className="text-xs text-gray-400">Add current technologies and frameworks to get better recommendations</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-orange-400 mb-2">Apply Early</h4>
                                            <p className="text-xs text-gray-400">Jobs posted recently have higher response rates</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-orange-400 mb-2">Personalize Applications</h4>
                                            <p className="text-xs text-gray-400">Use our cover letter generator to customize each application</p>
                                        </div>
                                    </div>

                                    <button className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                                        View Saved ({savedJobs.length})
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Jobs;
