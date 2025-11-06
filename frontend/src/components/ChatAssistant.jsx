import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatAssistant } from '../utils/aiUtils';

const ChatAssistant = ({ resumeData }) => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]); // [{ role: 'user' | 'ai', content: '...' }]
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [history]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || loading) return;

        const userMessage = message.trim();
        const newHistory = [...history, { role: 'user', content: userMessage }];
        setHistory(newHistory);
        setMessage('');
        setLoading(true);

        try {
            // Call AI utility
            const aiResponse = await chatAssistant(userMessage, newHistory, resumeData);
            
            // Handle both structured and raw responses
            const content = typeof aiResponse === 'object' ? aiResponse.rawResponse || aiResponse.result || JSON.stringify(aiResponse) : aiResponse;

            setHistory(prev => [
                ...prev, 
                { role: 'ai', content: content }
            ]);
        } catch (error) {
            setHistory(prev => [...prev, { role: 'ai', content: `Sorry, the AI encountered an error: ${error.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="flex flex-col h-[70vh] bg-background-light dark:bg-card-dark rounded-lg shadow-inner border dark:border-slate-700"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
        >
            <div className="p-4 border-b dark:border-slate-700 flex items-center">
                <Zap className='w-5 h-5 mr-2 text-primary-dark'/>
                <h3 className="font-bold dark:text-white">SmartCareer AI Chat</h3>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {history.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                        <MessageSquare className='w-8 h-8 mx-auto mb-2 text-primary-dark'/>
                        <p>Ask me anything about your resume, career path, or interview tips!</p>
                        <p className='text-xs mt-2'>I have access to your current resume data for context.</p>
                    </div>
                )}
                {history.map((msg, index) => (
                    <motion.div 
                        key={index} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className={`max-w-[70%] p-3 rounded-xl ${
                            msg.role === 'user' 
                                ? 'bg-primary-dark text-white rounded-br-none' 
                                : 'bg-gray-200 dark:bg-slate-700 dark:text-white rounded-tl-none'
                        }`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
                
                {loading && (
                     <div className="flex justify-start">
                         <div className="max-w-[70%] p-3 rounded-xl bg-gray-200 dark:bg-slate-700 dark:text-white rounded-tl-none flex items-center">
                             <Loader2 className="w-4 h-4 mr-2 animate-spin text-primary-dark"/> AI is typing...
                         </div>
                     </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t dark:border-slate-700 flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your career question..."
                    className="flex-1 p-3 border rounded-l-lg dark:bg-slate-800 dark:border-slate-700 focus:ring-primary-dark focus:border-primary-dark outline-none"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={!message.trim() || loading}
                    className="p-3 bg-primary-dark text-white rounded-r-lg hover:bg-primary-light disabled:bg-gray-400 transition"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </motion.div>
    );
};

export default ChatAssistant;