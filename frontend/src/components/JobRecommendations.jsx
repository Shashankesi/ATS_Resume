import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, TrendingUp, Zap, Star, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getJobRecommendations } from '../utils/aiUtils';

const JobRecommendations = ({ userSkills }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [intent] = useState('Seeking Senior MERN Full Stack roles in remote or major tech hubs.');

    // Mock job data with real links
    const mockJobs = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            company: 'Tech Innovations Inc',
            location: 'Remote',
            skills: ['React', 'Node.js', 'MongoDB'],
            matchScore: 95,
            link: 'https://www.linkedin.com/jobs/search/?keywords=Senior%20Full%20Stack%20Developer'
        },
        {
            id: 2,
            title: 'MERN Stack Developer',
            company: 'StartUp Labs',
            location: 'San Francisco, CA',
            skills: ['React', 'Express', 'MongoDB'],
            matchScore: 88,
            link: 'https://www.indeed.com/jobs?q=MERN+Stack+Developer'
        },
        {
            id: 3,
            title: 'React Developer',
            company: 'Digital Agency Pro',
            location: 'New York, NY',
            skills: ['React', 'JavaScript', 'CSS'],
            matchScore: 82,
            link: 'https://www.glassdoor.com/Job/react-developer-jobs.htm'
        },
        {
            id: 4,
            title: 'Backend Engineer - Node.js',
            company: 'Cloud Systems',
            location: 'Austin, TX',
            skills: ['Node.js', 'MongoDB', 'AWS'],
            matchScore: 85,
            link: 'https://www.monster.com/jobs/search/?q=Node.js+Developer'
        },
        {
            id: 5,
            title: 'Web Application Developer',
            company: 'Enterprise Solutions',
            location: 'Boston, MA',
            skills: ['JavaScript', 'React', 'TypeScript'],
            matchScore: 79,
            link: 'https://stackoverflow.com/jobs?q=Web+Application+Developer'
        },
    ];

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
            // Try to fetch from AI, but fallback to mock data
            try {
                const results = await getJobRecommendations(userSkills, intent);
                setJobs(results && results.length > 0 ? results : mockJobs);
            } catch (err) {
                console.log('Using mock job data');
                setJobs(mockJobs);
            }
        } catch (err) {
            console.error(err);
            setError('Could not fetch job recommendations.');
            setJobs(mockJobs);
        } finally {
            setLoading(false);
        }
    };

    const getColorClass = (score) => {
        if (score >= 90) return 'text-green-500 bg-green-100 dark:bg-green-900/50';
        if (score >= 80) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50';
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/50';
    };

    const handleJobClick = (jobLink) => {
        window.open(jobLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-xl text-white flex items-center">
                        <Zap className='w-6 h-6 mr-3 text-orange-400'/>
                        Live Job Opportunities
                    </h4>
                    <motion.button 
                        onClick={fetchRecommendations} 
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-sm px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Star className='w-4 h-4 mr-1'/>}
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </motion.button>
                </div>
                
                {error && (
                    <motion.div 
                        className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </motion.div>
                )}
                
                {loading && (
                    <div className="text-center p-12">
                        <Loader2 className="w-8 h-8 mx-auto animate-spin text-orange-400" />
                        <p className="mt-3 text-slate-300">Finding the perfect match...</p>
                    </div>
                )}
                
                {!loading && (
                    <div className="space-y-3">
                        {jobs.slice(0, 5).map((job, index) => (
                            <motion.div 
                                key={job.id} 
                                className="p-4 bg-gradient-to-r from-slate-700/30 to-slate-800/30 border border-slate-600/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1, transition: { delay: index * 0.1 } }}
                                whileHover={{ y: -2 }}
                                onClick={() => handleJobClick(job.link)}
                            >
                                <div className="flex justify-between items-start">
                                    {/* Job Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-base text-white group-hover:text-orange-300 transition">
                                                {job.title}
                                            </h5>
                                            <ExternalLink className='w-4 h-4 text-slate-400 group-hover:text-orange-400 transition opacity-0 group-hover:opacity-100'/>
                                        </div>
                                        <p className="text-sm text-slate-300 flex items-center gap-2 mt-2">
                                            <Briefcase className='w-4 h-4 text-orange-400'/> 
                                            <span className="font-medium">{job.company}</span>
                                            <span className="mx-2 text-slate-600">•</span>
                                            <MapPin className='w-4 h-4 text-orange-400'/> 
                                            <span>{job.location}</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-2 flex flex-wrap gap-1">
                                            {job.skills.map((skill, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-slate-600/50 rounded text-slate-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    {/* Match Score */}
                                    <div className="flex flex-col items-center ml-4">
                                        <motion.div 
                                            className={`text-lg font-bold px-4 py-2 rounded-full ${getColorClass(job.matchScore)}`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {job.matchScore}%
                                        </motion.div>
                                        <p className="text-xs text-slate-400 mt-1 text-center">Match Score</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                
                {!loading && jobs.length > 5 && (
                    <motion.p 
                        className="text-center text-sm mt-6 text-slate-400 cursor-pointer hover:text-orange-400 transition font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        ✨ View all {jobs.length} job recommendations on our job board
                    </motion.p>
                )}

                {!loading && jobs.length === 0 && (
                    <div className="text-center p-8">
                        <Briefcase className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                        <p className="text-slate-400">No jobs found matching your criteria</p>
                    </div>
                )}
            </div>

            {/* Info Banner */}
            <motion.div
                className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-sm text-blue-200">
                    💡 <span className="font-semibold">Pro Tip:</span> Click any job to view it directly on major job boards like LinkedIn, Indeed, and Glassdoor. We'll be adding job applications directly to SmartCareer soon!
                </p>
            </motion.div>
        </motion.div>
    );
};

export default JobRecommendations;