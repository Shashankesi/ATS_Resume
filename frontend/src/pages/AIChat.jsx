import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageCircle, X, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIChat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your AI career assistant. I can help you with resume tips, interview preparation, career advice, and more. What would you like to know?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const commonQuestions = [
        "How do I improve my resume?",
        "Tips for interview preparation",
        "What skills are in demand?",
        "How to negotiate salary?",
        "Best practices for LinkedIn profile"
    ];

    const botResponses = {
        'improve resume': "Great question! Here are some ways to improve your resume:\n1. Use a clear, professional format\n2. Include measurable achievements\n3. Tailor it for each job application\n4. Use action verbs (Led, Designed, Implemented)\n5. Include relevant keywords from job descriptions\n6. Remove unnecessary information\n7. Keep it to 1-2 pages\n\nWould you like specific help with any section?",
        'interview': "Interview preparation tips:\n1. Research the company thoroughly\n2. Practice common questions\n3. Use the STAR method for behavioral questions\n4. Prepare your own questions\n5. Do a technical mock interview\n6. Get plenty of sleep before\n7. Dress professionally\n8. Arrive early\n\nWhat type of interview are you preparing for?",
        'skills': "In-demand skills vary by role but some trending ones include:\n• Cloud technologies (AWS, Azure, GCP)\n• AI/Machine Learning\n• Data Analysis\n• DevOps\n• Cybersecurity\n• Full-stack development\n• Product management\n• UX/UI Design\n\nWould you like specific recommendations based on your role?",
        'salary': "Salary negotiation tips:\n1. Research market rates beforehand\n2. Don't mention salary first\n3. Focus on your value\n4. Practice your pitch\n5. Be willing to walk away\n6. Consider non-salary benefits\n7. Get everything in writing\n\nWhat position are you negotiating for?",
        'linkedin': "LinkedIn profile optimization:\n1. Use a professional photo\n2. Write a compelling headline\n3. Create a detailed summary\n4. List all relevant skills\n5. Get endorsements\n6. Request recommendations\n7. Stay active with content\n8. Use relevant keywords\n\nNeed help with any specific section?"
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findBotResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(botResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        // Default response
        return "That's a great question! I'm here to help with career guidance, resume tips, interview preparation, skills development, and more. Could you be more specific about what you need help with?";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setLoading(true);

        // Simulate AI thinking
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: findBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setLoading(false);
        }, 800);
    };

    const handleQuestionClick = (question) => {
        setInputValue(question);
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-white/10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Career AI Assistant</h1>
                            <p className="text-sm text-gray-400">Always available to help with career questions</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto py-8">
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-md lg:max-w-2xl px-6 py-4 rounded-xl ${
                                        message.sender === 'user'
                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                                            : 'bg-white/10 border border-white/20 text-gray-100'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                                    <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 text-gray-400"
                        >
                            <div className="p-3 bg-white/10 rounded-lg">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Common Questions (shown when messages are few) */}
            {messages.length <= 2 && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="px-4 sm:px-6 lg:px-8 pb-8"
                >
                    <div className="max-w-4xl mx-auto">
                        <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            Suggested questions:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {commonQuestions.map((question, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    onClick={() => handleQuestionClick(question)}
                                    className="text-left p-4 bg-white/5 border border-white/10 rounded-lg hover:border-orange-500/50 hover:bg-white/10 transition-all text-sm text-gray-300 hover:text-white"
                                >
                                    {question}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Input Area */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl sticky bottom-0 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Ask me anything about careers, resumes, interviews..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading || !inputValue.trim()}
                            className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                        </motion.button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                        This AI assistant provides general career guidance. For specific professional advice, consult with a career coach.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AIChat;
