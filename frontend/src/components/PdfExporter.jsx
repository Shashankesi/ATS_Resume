import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import api from '../utils/api';

const PdfExporter = () => {
    const { isAuthenticated } = useAuth();
    const { _id: resumeId, data: resumeData } = useResume();
    
    const [isExporting, setIsExporting] = useState(false);
    const resumeName = resumeData.profile.name || 'SmartCareer_Resume';

    // Client-side export (using html2pdf.js)
    const handleClientExport = () => {
        setIsExporting(true);
        // Target the element rendered by ResumePreview
        const element = document.getElementById('pdf-content-target-id');
        
        const options = {
            margin: [10, 10, 10, 10], // Margin in mm
            filename: `${resumeName}_Visual.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: false, letterRendering: true, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        if (element) {
             html2pdf().from(element).set(options).save().finally(() => {
                setIsExporting(false);
            });
        } else {
            alert('Cannot find resume preview content for export.');
            setIsExporting(false);
        }
    };

    // Server-side export (more robust, relies on Puppeteer backend)
    const handleServerExport = async (format) => {
        if (!isAuthenticated || !resumeId) return alert('Please sign in and ensure a resume is loaded.');

        setIsExporting(true);
        try {
            // Get the rendered HTML content (important: ensure styles are inline or simple for Puppeteer)
            const element = document.getElementById('pdf-content-target-id');
            const htmlContent = element ? element.outerHTML : '';
            
            // Call backend endpoint
            const response = await api.post(`/resume/${resumeId}/export`, { 
                htmlContent, 
                format 
            }, {
                responseType: 'blob' // Essential for file download
            });

            // Trigger file download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${resumeName}_${format}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
        } catch (error) {
            console.error('Server PDF Export Error:', error);
            alert(`Server export failed. Error: ${error.response?.data?.message || error.message}. Falling back to client-side.`);
        } finally {
            setIsExporting(false);
        }
    };


    return (
        <div className="relative group">
            <button 
                onClick={handleClientExport} 
                disabled={isExporting} 
                className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-light disabled:opacity-50 transition shadow-md"
            >
                {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                Export PDF
            </button>
            
            {/* Dropdown Menu for export options */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card-dark rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto border dark:border-slate-700">
                <button 
                    onClick={handleClientExport} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    disabled={isExporting}
                >
                    Client-Side (Visual)
                </button>
                <button 
                    onClick={() => handleServerExport('ATS')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    disabled={isExporting}
                >
                    Server-Side (ATS Format)
                </button>
            </div>
        </div>
    );
};

export default PdfExporter;