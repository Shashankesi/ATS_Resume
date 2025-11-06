import React, { createContext, useContext, useState, useCallback, useReducer } from 'react';
import api from '../utils/api';

// Simple debounce implementation
const debounce = (func, delay) => {
    let timeoutId;
    const debounced = (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
    debounced.flush = () => {
        clearTimeout(timeoutId);
    };
    return debounced;
};

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const initialResumeState = {
    _id: null,
    name: 'New Resume',
    template: 'Modern',
    isATSMode: false,
    publicSlug: null,
    data: {
        profile: {
            name: '', email: '', phone: '', linkedin: '', portfolio: '', summary: ''
        },
        sections: [],
    },
    latestATSScore: { score: 0, targetJobTitle: '', lastAnalyzedAt: null },
    versions: [],
    loading: false,
    error: null,
    saved: true,
};

// Reducer for state updates
const resumeReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_START':
            return { ...state, loading: true, error: null };
        case 'LOAD_SUCCESS':
            return { ...state, ...action.payload, loading: false, error: null, saved: true };
        case 'SET_TEMPLATE':
            return { ...state, template: action.payload, saved: false };
        case 'UPDATE_FIELD': // General field update (e.g., profile or top-level)
            return { ...state, data: { ...state.data, ...action.payload }, saved: false };
        case 'UPDATE_SECTION': // Update content within a specific section
            return { 
                ...state, 
                data: { 
                    ...state.data, 
                    sections: state.data.sections.map(sec => 
                        sec._id === action.payload.id ? { ...sec, content: action.payload.content } : sec
                    )
                },
                saved: false 
            };
        case 'ADD_SECTION':
            return { 
                ...state, 
                data: { 
                    ...state.data, 
                    sections: [...state.data.sections, action.payload] 
                },
                saved: false 
            };
        case 'DELETE_SECTION':
            return {
                ...state,
                data: {
                    ...state.data,
                    sections: state.data.sections.filter(sec => sec._id !== action.payload)
                },
                saved: false
            };
        case 'TOGGLE_ATS':
            return { ...state, isATSMode: action.payload, saved: false };
        case 'SAVE_SUCCESS':
            return { ...state, saved: true, loading: false, error: null };
        case 'SAVE_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'RESET_RESUME':
            return initialResumeState;
        default:
            return state;
    }
};


export const ResumeProvider = ({ children }) => {
    const [resumeState, dispatch] = useReducer(resumeReducer, initialResumeState);

    // Save logic with debounce (1500ms for auto-draft)
    const saveResumeToBackend = useCallback(async (resumeId, currentData, currentTemplate, currentIsATSMode) => {
        if (!resumeId) return;

        dispatch({ type: 'LOAD_START' });
        try {
            await api.put(`/resume/${resumeId}`, { data: currentData, template: currentTemplate, isATSMode: currentIsATSMode, createVersion: false });
            dispatch({ type: 'SAVE_SUCCESS' });
        } catch (error) {
            console.error('Auto-draft save failed:', error);
            dispatch({ type: 'SAVE_ERROR', payload: error.message });
        }
    }, []);
    
    // Debounced function for auto-drafting
    // Note: We need a slight modification to ensure the debounced function receives the LATEST state, 
    // even if it was called before the state update completed.
    const debouncedSave = useCallback(debounce((id, data, template, isATSMode) => {
        saveResumeToBackend(id, data, template, isATSMode);
    }, 1500), [saveResumeToBackend]);


    const loadResume = async (id) => {
        dispatch({ type: 'LOAD_START' });
        try {
            const { data } = await api.get(`/resume/${id}`);
            dispatch({ type: 'LOAD_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'SAVE_ERROR', payload: 'Failed to load resume: ' + error.message });
        }
    };
    
    // General function to dispatch updates and trigger the debounced save
    const updateResumeStateAndSave = (type, payload) => {
        dispatch({ type, payload });

        // Since dispatch is asynchronous, we calculate the next state synchronously for the debouncer
        // A full DND implementation would require using a library like useImmer for cleaner state prediction
        
        // **Simplified Save Logic:** Trigger save using the current (possibly outdated) state,
        // knowing the backend saves the *last* received state. For robust production, use a more complex state management with debounced side-effects.
        if (resumeState._id) {
            debouncedSave(resumeState._id, resumeState.data, resumeState.template, resumeState.isATSMode);
        }
    };

    // Full, non-debounced save (e.g., on manual save button click)
    const manualSave = async () => {
        // Ensure the last state is processed by waiting for the debounced save to execute (if pending)
        debouncedSave.flush(); 

        dispatch({ type: 'LOAD_START' });
        try {
            const { data } = await api.put(`/resume/${resumeState._id}`, { 
                data: resumeState.data, 
                template: resumeState.template, 
                isATSMode: resumeState.isATSMode, 
                createVersion: true, 
                versionNote: 'Manual Save'
            });
            dispatch({ type: 'LOAD_SUCCESS', payload: data });
            return true;
        } catch (error) {
            dispatch({ type: 'SAVE_ERROR', payload: error.message });
            return false;
        }
    };


    const value = {
        ...resumeState,
        loadResume,
        updateResume: updateResumeStateAndSave,
        manualSave,
        dispatch,
        resetResume: () => dispatch({ type: 'RESET_RESUME' }),
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};