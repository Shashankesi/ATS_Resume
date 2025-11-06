import React, { useState } from 'react';
import { Zap, Target, Search, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeATS, mockResponsesClient } from '../utils/aiUtils';
import TextToSpeechButton from './UI/TextToSpeechButton';

const ATSAnalyzer = ({ resumeData }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            return setError('Please paste a job description to analyze.');
        }

        setLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // Call AI utility function with resume JSON and JD text
            const result = await analyzeATS(resumeData.data, jobDescription.trim());
            
            // Check if the result is an object (expected structured output)
            if (typeof result === 'object' && result.score !== undefined) {
                 setAnalysisResult(result);
            } else {
                 // Fallback if AI returned raw text instead of structured JSON (in OPENAI mode)
                setAnalysisResult(mockResponsesClient.analyzeATS(resumeData.data)); // Use client mock structure if API fails structure
                setError("AI returned unstructured data. Displaying simple mock analysis.");
            }
           
        } catch (err) {
            console.error(err);
            setError(err.message || 'ATS analysis failed. Check your AI configuration.');
        } finally {
            setLoading(false);
        }
    };
    
    // Helper to determine color based on score
    const getColorClass = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };
    // Helper to determine text color
    const getTextColorClass = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };


    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h3 className="text-xl font-bold dark:text-white flex items-center"><Zap className='w-5 h-5 mr-2 text-primary-dark'/> ATS Analyzer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Paste a job description below to scan your current resume against it. Our AI provides a keyword match score and actionable suggestions.</p>

            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here (e.g., Senior Full-Stack MERN Developer requirements...)"
                rows="8"
                className="w-full p-3 border rounded-lg dark:bg-card-dark dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark"
            />

            <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-orange-700 disabled:opacity-50 transition shadow-md"
            >
                {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
                {loading ? 'Analyzing...' : 'Run ATS Scan'}
            </button>
            
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
                    {error}
                </div>
            )}

            {analysisResult && (
                <motion.div 
                    className="p-4 glass-card space-y-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h4 className="text-2xl font-bold dark:text-white flex items-center text-primary-dark"><Target className='w-6 h-6 mr-2'/> Analysis Results</h4>
                    
                    {/* Score Bar */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <p className={`text-4xl font-extrabold ${getTextColorClass(analysisResult.score)}`}>{analysisResult.score}%</p>
                            <TextToSpeechButton
                              text={`Your ATS score is ${analysisResult.score} percent. ${analysisResult.suggestions?.join('. ') || ''}`}
                              variant="button"
                            />
                        </div>
                        <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                            <motion.div 
                                className={`h-full rounded-full ${getColorClass(analysisResult.score)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${analysisResult.score}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Overall ATS Match Score</p>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className='dark:text-gray-300'>Keyword Match: <span className='font-bold text-primary-dark'>{analysisResult.keywordMatch}%</span></div>
                        <div className='dark:text-gray-300'>Skill Match: <span className='font-bold text-primary-dark'>{analysisResult.skillMatch}%</span></div>
                    </div>

                    {/* Suggestions */}
                    <div>
                        <h5 className="font-semibold text-lg dark:text-white flex items-center mb-2"><Lightbulb className='w-4 h-4 mr-2 text-accent'/> Actionable Suggestions</h5>
                        <ul className="space-y-2 list-none pl-0">
                            {analysisResult.suggestions?.map((s, i) => (
                                <motion.li key={i} className="flex items-start text-sm dark:text-gray-300" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: i * 0.1 } }}>
                                    <CheckCircle className='w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0'/> 
                                    <span>{s}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Formatting Flags */}
                    {analysisResult.formattingFlags?.length > 0 && (
                        <div>
                            <h5 className="font-semibold text-lg dark:text-white flex items-center mb-2"><Zap className='w-4 h-4 mr-2 text-red-500'/> Formatting Flags</h5>
                            <ul className="space-y-1 list-disc pl-5 text-sm dark:text-gray-300">
                                {analysisResult.formattingFlags.map((f, i) => <li key={i} className='text-red-400'>{f}</li>)}
                            </ul>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ATSAnalyzer;