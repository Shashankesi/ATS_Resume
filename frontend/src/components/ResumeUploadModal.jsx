import React, { useState } from 'react';
import { showToast } from '../utils/toast';
import api from '../utils/api';
import Loader from './Loader';
import { UploadCloud, X, FileText } from 'lucide-react';

const ResumeUploadModal = ({ open, onClose, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!open) return null;

  const onFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(droppedFile.type)) {
      setFile(droppedFile);
    } else {
      showToast.error('Please drop a valid file (PDF, DOC, DOCX, or TXT)');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast.warning('Please select a file (PDF/DOC/DOCX)');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      // Let the browser set the Content-Type (including boundary) for multipart/form-data
      const res = await api.post('/resume/upload', formData);
      showToast.success('Resume uploaded successfully! 🎉');
      onUploaded && onUploaded(res.data.resume);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed. Please try again.';
      showToast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Upload Resume</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' 
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400'
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <FileText className="w-12 h-12 text-blue-500" />
                <p className="font-semibold text-slate-700 dark:text-slate-200">{file.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  Choose a different file
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-600 dark:text-slate-300 font-medium">Drag and drop your resume here</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">or click to browse</p>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.txt" 
                  onChange={onFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label 
                  htmlFor="file-input"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Select File
                </label>
              </>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border dark:border-slate-700 dark:text-slate-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-primary-dark text-white hover:bg-primary-light disabled:opacity-60" disabled={loading}>
              {loading ? <Loader label="Uploading..." /> : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeUploadModal;
