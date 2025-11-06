import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Zap, PlusCircle, Trash2, Edit3, Loader2 } from 'lucide-react';
import { SortableItem } from './SortableItem';
import { motion } from 'framer-motion';
import { generateSummary, rewriteBullets } from '../utils/aiUtils';

// Mock component for different section types
const SectionContent = ({ type, content, sectionId, onChange }) => {
    const [aiLoading, setAiLoading] = useState(false);

    // AI action: Generate Summary
    const handleGenerateSummary = async () => {
        setAiLoading(true);
        try {
            // Placeholder payload; a real app would gather more context
            const role = prompt("Enter your target job role (e.g., Senior MERN Developer):");
            if (!role) return;

            const summary = await generateSummary({ name: content.name, email: content.email }, [], role);
            onChange({...content, summary: summary});
        } catch (error) {
            alert(`AI Summary failed: ${error.message}`);
        } finally {
            setAiLoading(false);
        }
    };

    // AI action: Rewrite Bullet Points
    const handleRewriteBullets = async (bulletText, jobIndex, bulletIndex) => {
        setAiLoading(true);
        try {
            const rewritten = await rewriteBullets(bulletText);
            
            // Assuming content.jobs[jobIndex].bullets is an array
            const newJobs = [...content.jobs];
            newJobs[jobIndex].bullets[bulletIndex] = rewritten;

            onChange({...content, jobs: newJobs});
        } catch (error) {
             alert(`AI Rewrite failed: ${error.message}`);
        } finally {
            setAiLoading(false);
        }
    };


    switch (type) {
        case 'profile':
            return (
                <div className="space-y-3">
                    <textarea 
                        value={content.summary} 
                        onChange={(e) => onChange({...content, summary: e.target.value})} 
                        placeholder="Professional Summary" 
                        className="w-full p-2 border rounded dark:bg-slate-700" 
                        rows="3" 
                    />
                    <div className='flex space-x-2'>
                        <button onClick={handleGenerateSummary} disabled={aiLoading} className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg text-sm hover:bg-primary-light disabled:opacity-50">
                            {aiLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className='w-4 h-4 mr-2'/>} AI Summary
                        </button>
                    </div>
                </div>
            );
        case 'experience':
            return (
                <div className="space-y-4">
                    {content.jobs?.map((job, jIndex) => (
                        <div key={jIndex} className="p-3 border rounded dark:border-slate-600">
                            <input 
                                type="text" 
                                value={job.title || ''} 
                                onChange={(e) => {
                                    const newJobs = [...content.jobs];
                                    newJobs[jIndex] = {...job, title: e.target.value};
                                    onChange({...content, jobs: newJobs});
                                }}
                                placeholder="Job Title" 
                                className="w-full p-1 mb-2 border rounded dark:bg-slate-700" 
                            />
                            <h5 className='font-semibold text-sm dark:text-gray-300 mb-1'>Bullet Points:</h5>
                            <div className='space-y-2'>
                                {job.bullets?.map((bullet, bIndex) => (
                                    <div key={bIndex} className='flex items-center space-x-2'>
                                        <textarea 
                                            value={bullet} 
                                            onChange={(e) => {
                                                const newJobs = [...content.jobs];
                                                newJobs[jIndex].bullets[bIndex] = e.target.value;
                                                onChange({...content, jobs: newJobs});
                                            }}
                                            rows="2"
                                            placeholder="Quantifiable result statement" 
                                            className="flex-1 p-1 border rounded text-xs dark:bg-slate-800"
                                        />
                                        <button 
                                            onClick={() => handleRewriteBullets(bullet, jIndex, bIndex)} 
                                            disabled={aiLoading}
                                            className='text-xs text-primary-dark hover:text-primary-light disabled:opacity-50'
                                        >
                                            <Zap className='w-4 h-4'/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className='text-sm text-primary-dark hover:underline'>+ Add Job/Bullet</button>
                </div>
            );
        case 'skills':
            return (
                <textarea 
                    value={content.list || ''} 
                    onChange={(e) => onChange({...content, list: e.target.value})} 
                    placeholder="Skills (Comma separated: React, Node, MongoDB, ...)" 
                    className="w-full p-2 border rounded dark:bg-slate-700" 
                    rows="3" 
                />
            );
        default: // Custom sections
            return (
                <textarea 
                    value={content.text || ''} 
                    onChange={(e) => onChange({...content, text: e.target.value})} 
                    placeholder="Enter custom content here." 
                    className="w-full p-2 border rounded dark:bg-slate-700" 
                    rows="4" 
                />
            );
    }
}


const ResumeForm = () => {
    const { data, updateResume, dispatch } = useResume();

    const handleProfileFieldChange = (field, value) => {
        // Specifically update the profile fields within the data object
        updateResume('UPDATE_FIELD', { profile: { ...data.profile, [field]: value } });
    };

    const handleSectionContentChange = (sectionId, newContent) => {
        // Dispatch the action to update content of a specific section by its ID
        dispatch({ type: 'UPDATE_SECTION', payload: { id: sectionId, content: newContent } });
    };

    const handleAddSection = () => {
        const newSection = {
            _id: Date.now().toString(), // Unique ID for DND
            type: 'custom',
            title: `Custom Section ${data.sections.length + 1}`,
            content: { text: '' },
            order: data.sections.length,
        };
        dispatch({ type: 'ADD_SECTION', payload: newSection });
    };

    const handleDeleteSection = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this section?");
        if (confirmed) {
            dispatch({ type: 'DELETE_SECTION', payload: id });
        }
    };

    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h3 className="text-2xl font-semibold border-b pb-2 dark:border-slate-700">1. Contact Information</h3>
            <div className="space-y-3">
                {/* Profile Fields */}
                <input type="text" value={data.profile.name} onChange={(e) => handleProfileFieldChange('name', e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded dark:bg-slate-700" />
                <input type="email" value={data.profile.email} onChange={(e) => handleProfileFieldChange('email', e.target.value)} placeholder="Email" className="w-full p-2 border rounded dark:bg-slate-700" />
                <input type="tel" value={data.profile.phone} onChange={(e) => handleProfileFieldChange('phone', e.target.value)} placeholder="Phone Number" className="w-full p-2 border rounded dark:bg-slate-700" />
                <input type="url" value={data.profile.linkedin} onChange={(e) => handleProfileFieldChange('linkedin', e.target.value)} placeholder="LinkedIn URL" className="w-full p-2 border rounded dark:bg-slate-700" />
            </div>
            
            <h3 className="text-2xl font-semibold border-b pb-2 dark:border-slate-700">2. Resume Content (Drag to Reorder)</h3>
            
            {/* Dynamic Sections (DND area) */}
            <div className="space-y-4">
                {/* Always render Profile section first, but allow editing of the summary */}
                 <motion.div className="p-4 border rounded-lg dark:border-slate-700 dark:bg-card-dark shadow-md">
                     <h4 className="font-bold mb-2">Summary/Objective</h4>
                     <SectionContent 
                        type={'profile'} 
                        content={data.profile} 
                        onChange={(newContent) => updateResume('UPDATE_FIELD', { profile: newContent })}
                    />
                 </motion.div>


                {data.sections.map((section) => (
                    // Use a fallback unique ID if _id isn't present for DND stability
                    <SortableItem key={section._id || section.type} id={section._id || section.type}>
                        <motion.div 
                            className="p-4 border rounded-lg dark:border-slate-700 dark:bg-card-dark shadow-md cursor-grab"
                            whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold capitalize">{section.title}</h4>
                                <div className='flex space-x-2'>
                                    {section.type !== 'profile' && (
                                        <button onClick={() => handleDeleteSection(section._id || section.type)} className='text-red-500 hover:text-red-700 p-1 rounded'>
                                            <Trash2 className='w-4 h-4'/>
                                        </button>
                                    )}
                                    <button className='text-gray-500 hover:text-gray-700 p-1 rounded'>
                                        <Edit3 className='w-4 h-4'/> {/* Edit Section Title */}
                                    </button>
                                </div>
                            </div>
                            <SectionContent 
                                type={section.type} 
                                content={section.content} 
                                sectionId={section._id || section.type}
                                onChange={(newContent) => handleSectionContentChange(section._id || section.type, newContent)}
                            />
                        </motion.div>
                    </SortableItem>
                ))}
            </div>

            <button 
                onClick={handleAddSection}
                className="w-full flex items-center justify-center p-3 border-dashed border-primary-dark/50 text-primary-dark rounded-lg hover:bg-primary-dark/10 transition"
            >
                <PlusCircle className='w-5 h-5 mr-2'/> Add Custom Section
            </button>
        </motion.div>
    );
};

export default ResumeForm;