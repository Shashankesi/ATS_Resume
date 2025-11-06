import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Loader } from 'lucide-react';
import { TextToSpeech } from '../../utils/speechUtils';
import { showToast } from '../../utils/toast';

/**
 * Text-to-Speech Button Component
 * Adds TTS capability to any text content
 */
const TextToSpeechButton = ({
  text,
  className = '',
  size = 'md',
  variant = 'icon', // icon, button, compact
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSpeech = async () => {
    try {
      if (TextToSpeech.isSpeaking()) {
        TextToSpeech.stop();
        setIsSpeaking(false);
      } else {
        setIsLoading(true);
        await TextToSpeech.speakNormalized(text, {
          rate: 0.95,
          pitch: 1,
          volume: 0.9,
        });
        setIsSpeaking(false);
        setIsLoading(false);
      }
    } catch (error) {
      showToast.error('Speech not supported on this browser');
      setIsLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleSpeech}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-colors ${
          isSpeaking
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-slate-700/30 text-slate-400 hover:text-slate-200'
        } ${className}`}
        title="Listen to this text"
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : isSpeaking ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.button>
    );
  }

  if (variant === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggleSpeech}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 ${className}`}
      >
        {isLoading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </>
        )}
      </motion.button>
    );
  }

  // Compact variant
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggleSpeech}
      disabled={isLoading}
      className={`text-xs font-semibold px-2 py-1 rounded ${
        isSpeaking
          ? 'bg-blue-500/30 text-blue-300'
          : 'bg-slate-700/40 text-slate-400 hover:text-slate-200'
      } transition-colors disabled:opacity-50 ${className}`}
    >
      {isLoading ? '...' : isSpeaking ? 'Stop' : 'Listen'}
    </motion.button>
  );
};

export default TextToSpeechButton;
