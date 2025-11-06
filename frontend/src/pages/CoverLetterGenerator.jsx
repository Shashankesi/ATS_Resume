import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CoverLetterGenerator = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        jobDescription: '',
        yourName: '',
        yourBackground: '',
        keySkills: '',
        enthusiasm: 'high'
    });
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateCoverLetter = async () => {
        setLoading(true);
        // Simulate AI generation
        setTimeout(() => {
            const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in ${formData.yourBackground} and proven expertise in ${formData.keySkills}, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have developed a passion for delivering excellence and driving impactful results. Your company's commitment to innovation and quality aligns perfectly with my professional values and aspirations. The opportunity to work on ${formData.jobDescription ? 'projects similar to those mentioned in your job description' : 'challenging projects'} excites me greatly.

My key strengths include:
• ${formData.keySkills.split(',')[0]?.trim() || 'Strong technical expertise'}
• Excellent problem-solving abilities
• Proven track record of ${formData.yourBackground ? 'success in ' + formData.yourBackground : 'delivering results'}
• Ability to work effectively in collaborative team environments

In my current/previous roles, I have successfully:
• Led initiatives that improved efficiency and outcomes
• Collaborated with cross-functional teams to achieve organizational goals
• Continuously upgraded my skills to stay current with industry trends

I am particularly drawn to ${formData.companyName} because of your innovative approach and industry leadership. I am excited about the prospect of contributing to your team's success and growing alongside your organization.

I would welcome the opportunity to discuss how my skills and experience can benefit your team. Thank you for considering my application. I look forward to speaking with you soon.

Sincerely,

${formData.yourName || 'Your Name'}
${user?.email || 'your.email@example.com'}
${formData.jobTitle}`;

            setGeneratedLetter(letter);
            setStep(3);
            setLoading(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadLetter = () => {
        const element = document.createElement('a');
        const file = new Blob([generatedLetter], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${formData.jobTitle}_Cover_Letter.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-8 h-8 text-indigo-400" />
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                AI Cover Letter Generator
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Create personalized cover letters in minutes
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Steps Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-center gap-4">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center">
                                    <motion.div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                            step >= s
                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                                : 'bg-white/10 text-gray-400 border border-white/10'
                                        }`}
                                        animate={{ scale: step === s ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {s === 3 && step >= 3 ? '✓' : s}
                                    </motion.div>
                                    {s < 3 && <div className={`w-12 h-1 mx-2 rounded-full ${step > s ? 'bg-indigo-500' : 'bg-white/10'}`}></div>}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center gap-20 mt-4 text-xs text-gray-400">
                            <span>Job Info</span>
                            <span>Your Details</span>
                            <span>Review</span>
                        </div>
                    </motion.div>

                    {/* Form */}
                    {step < 3 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl mb-8"
                        >
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Senior Frontend Developer"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Tech Company Inc"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Job Description/Key Points
                                        </label>
                                        <textarea
                                            name="jobDescription"
                                            value={formData.jobDescription}
                                            onChange={handleInputChange}
                                            placeholder="Paste job description or key responsibilities..."
                                            rows="4"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Your Enthusiasm Level
                                        </label>
                                        <select
                                            name="enthusiasm"
                                            value={formData.enthusiasm}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-400 transition-colors"
                                        >
                                            <option value="high">High - This is my dream job!</option>
                                            <option value="medium">Medium - Very interested</option>
                                            <option value="professional">Professional - Standard application</option>
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="yourName"
                                            value={formData.yourName}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Your Background/Experience *
                                        </label>
                                        <textarea
                                            name="yourBackground"
                                            value={formData.yourBackground}
                                            onChange={handleInputChange}
                                            placeholder="Briefly describe your background, experience, and relevant achievements..."
                                            rows="4"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Key Skills (comma-separated) *
                                        </label>
                                        <input
                                            type="text"
                                            name="keySkills"
                                            value={formData.keySkills}
                                            onChange={handleInputChange}
                                            placeholder="React, Node.js, Problem Solving, Team Leadership..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-4 mt-8">
                                {step > 1 && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                                    >
                                        Back
                                    </motion.button>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (step === 1 && formData.jobTitle && formData.companyName) {
                                            setStep(2);
                                        } else if (step === 2 && formData.yourName && formData.yourBackground && formData.keySkills) {
                                            generateCoverLetter();
                                        }
                                    }}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    {step === 1 ? 'Next' : loading ? 'Generating...' : 'Generate Letter'}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Generated Letter */}
                    {step === 3 && generatedLetter && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Letter Preview */}
                            <div className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="prose prose-invert max-w-none mb-6">
                                    <p className="text-gray-100 whitespace-pre-wrap leading-relaxed font-serif">
                                        {generatedLetter}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={copyToClipboard}
                                        className="flex-1 min-w-40 px-6 py-3 bg-white/10 border-2 border-white/30 hover:border-orange-500/50 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20"
                                    >
                                        <Copy className="w-4 h-4" />
                                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={downloadLetter}
                                        className="flex-1 min-w-40 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </motion.button>
                                </div>
                            </div>

                            {/* Edit/Regenerate */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setStep(1);
                                        setGeneratedLetter('');
                                    }}
                                    className="flex-1 px-6 py-3 bg-white/10 border-2 border-white/30 hover:border-orange-500/50 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Create Another
                                </motion.button>
                            </div>

                            {/* Tips */}
                            <div className="p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                                <h3 className="font-semibold text-indigo-300 mb-3">Tips for Best Results:</h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li>✓ Customize the letter further before sending</li>
                                    <li>✓ Keep it concise and focused</li>
                                    <li>✓ Proofread for any errors</li>
                                    <li>✓ Save as PDF before emailing</li>
                                    <li>✓ Send along with your optimized resume</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CoverLetterGenerator;
