import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit3, CheckCircle, Share2, TrendingUp } from 'lucide-react';

const ResumeCard = ({ resume }) => {
    // Mocking a score if none is set
    const latestScore = resume.latestATSScore?.score || Math.floor(Math.random() * (90 - 50 + 1) + 50);
    const scoreColor = latestScore >= 80 ? 'text-green-500' : latestScore >= 60 ? 'text-yellow-500' : 'text-red-500';

    return (
        <motion.div
            className="glass-card p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div>
                <h3 className="text-xl font-bold dark:text-white mb-2">{resume.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Template: {resume.template}</p>

                <div className="flex items-center justify-between text-sm dark:text-gray-300 mb-4">
                    <div className={`flex items-center font-semibold ${scoreColor}`}>
                        <TrendingUp className='w-4 h-4 mr-1' />
                        ATS Score: {latestScore}%
                    </div>
                    <div className='flex items-center text-xs text-primary-dark'>
                        {resume.isATSMode && <CheckCircle className='w-3 h-3 mr-1' />}
                        {resume.isATSMode ? 'ATS Enforced' : 'Visual Mode'}
                    </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Last Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
            </div>
            
            <div className="mt-4 flex space-x-3">
                <Link
                    to={`/resume/edit/${resume._id}`}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-primary-dark rounded-lg hover:bg-primary-light transition"
                >
                    <Edit3 className='w-4 h-4 mr-1' /> Edit
                </Link>
                {resume.publicSlug && (
                    <Link
                        to={`/resume/public/${resume.publicSlug}`}
                        className="p-2 border border-gray-300 dark:border-slate-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                        title="Share Public Link"
                    >
                        <Share2 className='w-4 h-4' />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default ResumeCard;