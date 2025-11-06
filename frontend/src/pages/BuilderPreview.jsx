import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Download, Share2, Eye } from 'lucide-react';

const BuilderPreview = ({ isPublic = false }) => {
  const { slug } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const endpoint = isPublic ? `/resume/public/${slug}` : `/resume/${slug}`;
        const response = await api.get(endpoint);
        setResume(response.data);
      } catch (err) {
        setError('Resume not found or access denied');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [slug, isPublic]);

  const handleDownload = () => {
    // Placeholder for PDF download
    alert('PDF download feature coming soon!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {!isPublic && (
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Resume Preview: {resume.name}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Resume Header */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {resume.data.profile.name || 'Your Name'}
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              {resume.data.profile.email && <p>{resume.data.profile.email}</p>}
              {resume.data.profile.phone && <p>{resume.data.profile.phone}</p>}
              {(resume.data.profile.linkedin || resume.data.profile.portfolio) && (
                <p>
                  {resume.data.profile.linkedin && <a href={resume.data.profile.linkedin} className="text-blue-600 hover:underline mr-4">LinkedIn</a>}
                  {resume.data.profile.portfolio && <a href={resume.data.profile.portfolio} className="text-blue-600 hover:underline">Portfolio</a>}
                </p>
              )}
            </div>
          </div>

          {/* Resume Summary */}
          {resume.data.profile.summary && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Professional Summary</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {resume.data.profile.summary}
              </p>
            </div>
          )}

          {/* Resume Sections */}
          {resume.data.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2">
                {section.title}
              </h3>
              <div className="text-gray-700 dark:text-gray-300">
                {/* Placeholder for section content rendering */}
                <pre className="whitespace-pre-wrap font-sans">
                  {JSON.stringify(section.content, null, 2)}
                </pre>
              </div>
            </div>
          ))}

          {isPublic && (
            <div className="mt-8 pt-6 border-t text-center text-gray-500 dark:text-gray-400">
              <p className="flex items-center justify-center">
                <Eye className="w-4 h-4 mr-2" />
                This resume was created with SmartCareer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPreview;