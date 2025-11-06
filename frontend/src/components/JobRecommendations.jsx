import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, TrendingUp, Zap, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getJobRecommendations } from '../utils/aiUtils';

const JobRecommendations = ({ userSkills }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [intent] = useState('Seeking Senior MERN Full Stack roles in remote or major tech hubs.');

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
            const results = await getJobRecommendations(userSkills, intent);
            setJobs(results);
        } catch (err) {
            console.error(err);
            setError('Could not fetch job recommendations. Check AI configuration.');
        } finally {
            setLoading(false);
        }
    };

    const getColorClass = (score) => {
        if (score >= 90) return 'text-green-500 bg-green-100 dark:bg-green-900/50';
        if (score >= 80) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50';
        return 'text-red-500 bg-red-100 dark:bg-red-900/50';
    };

    return (
        <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="p-4 glass-card">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold dark:text-white flex items-center text-lg"><Zap className='w-5 h-5 mr-2 text-accent'/> AI-Refined Listings</h4>
                    <button 
                        onClick={fetchRecommendations} 
                        disabled={loading} 
                        className="flex items-center text-sm px-3 py-1.5 border rounded-lg dark:border-slate-700 dark:text-gray-300 hover:bg-slate-700 transition"
                    >
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Star className='w-4 h-4 mr-1 text-yellow-500'/>}
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                {loading && (
                    <div className="text-center p-8">
                        <Loader2 className="w-6 h-6 mx-auto animate-spin text-primary-dark" />
                        <p className="mt-2 dark:text-gray-300">Finding the perfect match...</p>
                    </div>
                )}
                
                <div className="space-y-3">
                    {jobs.slice(0, 5).map((job, index) => (
                        <motion.div 
                            key={job.id} 
                            className="flex justify-between items-center p-3 border dark:border-slate-700 rounded-lg dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { delay: index * 0.1 } }}
                        >
                            {/* Job Details */}
                            <div className="flex-1">
                                <h5 className="font-semibold text-primary-dark dark:text-primary-dark">{job.title}</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 mt-1">
                                    <Briefcase className='w-4 h-4'/> <span>{job.company}</span>
                                    <MapPin className='w-4 h-4'/> <span>{job.location}</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Skills: {job.skills.join(', ')}</p>
                            </div>

                            {/* Match Score */}
                            <div className="flex flex-col items-center">
                                <span className={`text-sm font-bold p-1 rounded-full px-3 ${getColorClass(job.matchScore)}`}>
                                    {job.matchScore}%
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI Match</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {jobs.length > 5 && (
                    <p className="text-center text-sm mt-4 dark:text-gray-400 cursor-pointer hover:text-primary-dark">View all {jobs.length} recommendations...</p>
                )}
            </div>
        </motion.div>
    );
};

export default JobRecommendations;