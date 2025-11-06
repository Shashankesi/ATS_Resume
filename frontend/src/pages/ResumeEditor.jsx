import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { FileText, Save, Zap, Loader2, Maximize, Settings, X, ChevronLeft } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

// Lazy Load heavy/secondary components
const PdfExporter = React.lazy(() => import('../components/PdfExporter'));
const ATSAnalyzer = React.lazy(() => import('../components/ATSAnalyzer'));
const ChatAssistant = React.lazy(() => import('../components/ChatAssistant'));
const ResumeForm = React.lazy(() => import('../components/ResumeForm')); 
const ResumeTemplates = React.lazy(() => import('../components/ResumeTemplates'));
const ResumePreview = React.lazy(() => import('../components/ResumePreview')); 

const ResumeEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { 
        loadResume, 
        _id: resumeId, 
        name,
        data, 
        template, 
        isATSMode,
        manualSave, 
        saved, 
        loading, 
        updateResume, 
        dispatch 
    } = useResume();

    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'ats', 'chat'
    const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id && id !== 'new') { // 'new' is handled by Dashboard redirect
            loadResume(id);
        }
        return () => {
             // Clean up resume state on unmount/exit
             dispatch({ type: 'RESET_RESUME' });
        };
    }, [id]);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            // Note: Full array reordering logic (e.g., arrayMove from dnd-kit/sortable) is needed in the reducer 
            // dispatch({ type: 'REORDER_SECTIONS', payload: { activeId: active.id, overId: over.id } });
            console.warn(`Section reorder attempted but DND reorder logic is simplified/mocked in ResumeContext for brevity.`);
        }
    }, [dispatch]);

    const handleSave = async () => {
        if (!saved && resumeId) {
            setIsSaving(true);
            await manualSave();
            setIsSaving(false);
        }
    };
    
    // Check if data is still loading
    if (loading && !resumeId) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary-dark" />
                <p className="ml-3 dark:text-white">Loading Resume Data...</p>
            </div>
        );
    }
    // If we tried to load an ID that failed or we haven't loaded anything yet
    if (!resumeId && id !== 'new') return <div className="p-10 dark:text-white">Resume not found or loading failed.</div>; 

    // Get the actual IDs for DND context
    const sectionIds = data.sections.map(s => s._id || s.type);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Top Bar / Controls */}
            <motion.div 
                className="flex justify-between items-center p-3 border-b dark:border-slate-700 dark:bg-card-dark/80 backdrop-blur-sm"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
            >
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 dark:text-white transition">
                        <ChevronLeft className='w-5 h-5' />
                    </button>
                    <h2 className="text-xl font-bold dark:text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary-dark" />
                        {name}
                    </h2>
                    <span className={`text-sm font-medium ${saved ? 'text-green-500' : 'text-yellow-500'}`}>
                        {saved ? 'Saved' : 'Unsaved Changes...'}
                    </span>
                    
                </div>
                <div className="flex space-x-3">
                    <button onClick={handleSave} disabled={saved || isSaving || !resumeId} className="flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 font-semibold">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {isSaving ? 'Saving...' : 'Save Resume'}
                    </button>
                    <Suspense fallback={<button className="p-2 bg-gray-200 rounded-lg">PDF</button>}>
                        <PdfExporter />
                    </Suspense>
                    <button 
                        onClick={() => updateResume('TOGGLE_ATS', !isATSMode)} 
                        className={`p-2 rounded-lg transition shadow-md font-semibold border-2 ${isATSMode ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'bg-gray-200/10 dark:bg-slate-700/30 dark:text-white border-slate-600/50'}`}
                        title="Toggle ATS Friendly Mode"
                    >
                        <Zap className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-700/30 dark:bg-slate-700/50 dark:text-white rounded-lg transition shadow-md border border-slate-600/50 hover:border-orange-500/50">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>

            {/* Main Two-Pane Layout */}
            <div className={`flex flex-1 overflow-hidden transition-all duration-300 ${isPreviewMaximized ? 'flex-col' : 'flex-row'}`}>

                {/* Left Pane: Editor/Tools */}
                {!isPreviewMaximized && (
                    <motion.div 
                        className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 border-r dark:border-slate-700 overflow-y-auto scrollbar-thin"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Tab Navigation */}
                        <div className="flex border-b dark:border-slate-700 sticky top-0 bg-background-light dark:bg-background-dark z-10 p-1">
                            {['editor', 'ats', 'chat'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 p-3 text-sm font-medium transition-colors ${activeTab === tab 
                                        ? 'border-b-2 border-primary-dark text-primary-dark dark:text-white' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-primary-dark'}`}
                                >
                                    {tab === 'editor' && 'Resume Builder'}
                                    {tab === 'ats' && 'ATS Analyzer'}
                                    {tab === 'chat' && 'AI Assistant'}
                                </button>
                            ))}
                        </div>
                        
                        {/* Tab Content */}
                        <div className="p-4">
                             {/* Content switches based on activeTab */}
                                                         {activeTab === 'editor' && (
                                                                <>
                                                                    <Suspense fallback={<p className='p-4 dark:text-white'>Loading Templates...</p>}>
                                                                        <ResumeTemplates />
                                                                    </Suspense>
                                                                    <Suspense fallback={<p className='p-4 dark:text-white'>Loading Editor...</p>}>
                                                                        <ResumeForm />
                                                                    </Suspense>
                                                                </>
                                                         )}
                             {activeTab === 'ats' && (
                                <Suspense fallback={<p className='p-4 dark:text-white'>Loading ATS Analyzer...</p>}>
                                    <ATSAnalyzer resumeData={{ data, isATSMode }} />
                                </Suspense>
                             )}
                             {activeTab === 'chat' && (
                                <Suspense fallback={<p className='p-4 dark:text-white'>Loading Chat...</p>}>
                                    <ChatAssistant resumeData={data} />
                                </Suspense>
                             )}
                        </div>
                    </motion.div>
                )}

                {/* Right Pane: Live Preview */}
                <div className={`overflow-y-auto scrollbar-thin ${isPreviewMaximized ? 'w-full h-full' : 'w-full md:w-1/2 lg:w-3/5 xl:w-2/3'}`}>
                    <div className="sticky top-0 right-0 p-2 text-right dark:bg-background-dark/80 z-10">
                        <button 
                            onClick={() => setIsPreviewMaximized(!isPreviewMaximized)} 
                            className="p-2 bg-gray-200 dark:bg-slate-700 dark:text-white rounded-lg hover:bg-gray-300 transition shadow-md"
                            title={isPreviewMaximized ? 'Exit Full Screen' : 'Maximize Preview'}
                        >
                            {isPreviewMaximized ? <X className="w-5 h-5"/> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                            <div className="p-4 mx-auto max-w-3xl">
                                <Suspense fallback={<p className="text-center p-10 dark:text-white">Rendering Preview...</p>}>
                                    <ResumePreview resumeData={data} template={template} isATSMode={isATSMode} />
                                </Suspense>
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;