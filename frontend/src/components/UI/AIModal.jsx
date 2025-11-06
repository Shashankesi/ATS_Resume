import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import ATSAnalyzer from '../ATSAnalyzer';
import JobRecommendations from '../JobRecommendations';
import SkillGapAnalyzer from '../SkillGapAnalyzer';
import { generateSummary, generateCoverLetter, chatAssistant } from '../../utils/aiUtils';

const AIModal = ({ open, toolId, onClose, resumeData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for Summary tool
  const [summaryPrompt, setSummaryPrompt] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);

  // State for Cover Letter tool
  const [coverLetterInput, setCoverLetterInput] = useState({ jobTitle: '', company: '' });
  const [coverLetterResult, setCoverLetterResult] = useState(null);

  // State for Chat tool
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  if (!open) return null;

  const titleMap = {
    summary: 'AI Summary Generator',
    ats: 'ATS Analyzer',
    'cover-letter': 'Cover Letter Generator',
    jobs: 'Job Matching',
    chat: 'Career Coach',
    skills: 'Skill Gap Analyzer',
  };

  // Handle Generate Summary
  const handleGenerateSummary = async () => {
    if (!summaryPrompt.trim()) {
      setError('Please provide details about your target role or experience.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await generateSummary(
        { name: 'User', targetRole: summaryPrompt },
        [],
        summaryPrompt
      );
      setSummaryResult(result);
    } catch (err) {
      setError(err.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  // Handle Generate Cover Letter
  const handleGenerateCoverLetter = async () => {
    if (!coverLetterInput.jobTitle || !coverLetterInput.company) {
      setError('Please enter job title and company name.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateCoverLetter(
        resumeData?.data || {},
        coverLetterInput.jobTitle
      );
      setCoverLetterResult(result);
    } catch (err) {
      setError(err.message || 'Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  // Handle Chat Send
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');
    setLoading(true);
    setError(null);

    try {
      const result = await chatAssistant(
        chatInput,
        chatMessages,
        resumeData?.data || {}
      );
      setChatMessages(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (err) {
      setError(err.message || 'Chat failed');
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{titleMap[toolId] || 'AI Tool'}</h3>
          <button onClick={onClose} className="px-3 py-1 text-sm rounded hover:bg-slate-100 dark:hover:bg-slate-800">Close</button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-auto space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
              {error}
            </div>
          )}

          {toolId === 'ats' && (
            <ATSAnalyzer resumeData={resumeData} />
          )}

          {toolId === 'jobs' && (
            <JobRecommendations userSkills={(resumeData && resumeData.skills) || ['React', 'Node.js']} />
          )}

          {toolId === 'skills' && (
            <SkillGapAnalyzer />
          )}

          {toolId === 'summary' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Generate a professional summary based on your target role and experience.</p>
              <textarea
                value={summaryPrompt}
                onChange={(e) => setSummaryPrompt(e.target.value)}
                placeholder="E.g., 'Senior Full-Stack Developer with 5 years of MERN experience. Seeking leadership role in tech startup.'"
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 min-h-[80px]"
              />
              <button
                onClick={handleGenerateSummary}
                disabled={loading}
                className="w-full py-2 px-4 bg-accent text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Generate Summary
              </button>
              {summaryResult && (
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm dark:text-slate-200">{summaryResult}</p>
                </div>
              )}
            </div>
          )}

          {toolId === 'cover-letter' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Generate a tailored cover letter from your resume.</p>
              <input
                type="text"
                value={coverLetterInput.jobTitle}
                onChange={(e) => setCoverLetterInput({ ...coverLetterInput, jobTitle: e.target.value })}
                placeholder="Job Title"
                className="w-full p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
              />
              <input
                type="text"
                value={coverLetterInput.company}
                onChange={(e) => setCoverLetterInput({ ...coverLetterInput, company: e.target.value })}
                placeholder="Company Name"
                className="w-full p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
              />
              <button
                onClick={handleGenerateCoverLetter}
                disabled={loading}
                className="w-full py-2 px-4 bg-accent text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Generate Cover Letter
              </button>
              {coverLetterResult && (
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg whitespace-pre-wrap text-sm dark:text-slate-200 max-h-[300px] overflow-auto">
                  {coverLetterResult}
                </div>
              )}
            </div>
          )}

          {toolId === 'chat' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">Chat with your AI career coach for personalized advice.</p>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 h-[300px] overflow-y-auto space-y-3 mb-3">
                {chatMessages.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Start by asking a career-related question...</p>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-100'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  disabled={loading}
                />
                <button
                  onClick={handleChatSend}
                  disabled={loading}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(AIModal);
