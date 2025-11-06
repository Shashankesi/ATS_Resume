import React, { forwardRef } from 'react';
import { Mail, Phone, Globe, Linkedin, MapPin } from 'lucide-react';

// --- Template Components (Simplified Classic Template) ---

const TemplateClassic = ({ data, isATSMode }) => {
    // ATS Mode enforces simple, linear structure with minimal styling
    const atsStyles = isATSMode ? 'font-sans text-sm text-black' : '';
    
    return (
        <div 
            className={`p-6 bg-white shadow-xl min-h-[11in] w-[8.5in] mx-auto text-gray-800 ${atsStyles}`} 
            style={isATSMode ? { padding: '0.5in', lineHeight: '1.4', color: '#000' } : {}}
            id="pdf-content-target-id" // Target for html2pdf
        >
            {/* Header */}
            <header className={`pb-2 ${isATSMode ? 'border-b border-black' : 'border-b-2 border-primary-dark'}`}>
                <h1 className="text-3xl font-bold uppercase text-center">{data.profile.name || 'Your Name'}</h1>
                <div className="flex justify-center flex-wrap gap-x-4 text-xs mt-1">
                    {data.profile.phone && <div className="flex items-center"><Phone className="w-3 h-3 mr-1" /> {data.profile.phone}</div>}
                    {data.profile.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1" /> {data.profile.email}</div>}
                    {data.profile.linkedin && <div className="flex items-center"><Linkedin className="w-3 h-3 mr-1" /> LinkedIn</div>}
                    {data.profile.portfolio && <div className="flex items-center"><Globe className="w-3 h-3 mr-1" /> Portfolio</div>}
                </div>
            </header>

            {/* Summary */}
            {data.profile.summary && (
                <section className="mt-4">
                    <p className="text-sm italic text-gray-700">{data.profile.summary}</p>
                </section>
            )}

            {/* Sections */}
            {data.sections.map((section, index) => (
                <section key={section._id || section.type || index} className="mt-6">
                    <h2 className={`text-lg font-bold uppercase mb-2 ${isATSMode ? 'text-black' : 'text-primary-dark border-b border-primary-dark'}`}>
                        {section.title}
                    </h2>
                    
                    {/* Render content based on section type (simplified structure, assuming basic JSON structure) */}
                    {section.type === 'experience' && section.content.jobs?.map((job, jIndex) => (
                        <div key={jIndex} className="mb-3 text-sm">
                            <h3 className="font-semibold">{job.title} at {job.company}</h3>
                            <p className="text-xs italic">{job.startDate} - {job.endDate} | {job.location}</p>
                            <ul className="list-disc pl-5 mt-1">
                                {job.bullets?.map((bullet, bIndex) => <li key={bIndex}>{bullet}</li>)}
                            </ul>
                        </div>
                    ))}
                    {section.type === 'skills' && (
                        <p className='text-sm'>{section.content.list}</p>
                    )}
                    {section.type === 'education' && (
                        <div className='text-sm'>{section.content.institutions?.map((inst, i) => <p key={i}>{inst.degree}, {inst.major} - {inst.school}</p>)}</div>
                    )}
                    {/* Fallback for Custom/Others */}
                    {section.type === 'custom' && <p className='text-sm'>{section.content.text || 'Custom content here.'}</p>}
                </section>
            ))}
        </div>
    );
};

// --- Main Preview Component ---

const ResumePreview = forwardRef(({ resumeData, template, isATSMode }, ref) => {
    // Use TemplateClassic as the default for demonstration
    const TemplateComponent = TemplateClassic; 

    return (
        <div ref={ref} className="p-4 bg-gray-200 dark:bg-slate-800 shadow-inner">
            <TemplateComponent data={resumeData} isATSMode={isATSMode} />
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;