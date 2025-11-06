/**
 * Text-to-Speech Utility
 * Uses Web Speech API for audio capabilities
 */

const speechSynthesis = window.speechSynthesis;

export const TextToSpeech = {
  /**
   * Speak text using Web Speech API
   * @param {string} text - Text to speak
   * @param {Object} options - Speech options
   * @returns {Promise} - Resolves when speech completes
   */
  speak: (text, options = {}) => {
    return new Promise((resolve, reject) => {
      if (!speechSynthesis) {
        reject(new Error('Speech Synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set options
      utterance.rate = options.rate || 1; // 0.1 to 10
      utterance.pitch = options.pitch || 1; // 0 to 2
      utterance.volume = options.volume || 0.8; // 0 to 1
      utterance.lang = options.lang || 'en-US';

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (error) => {
        reject(error);
      };

      speechSynthesis.speak(utterance);
    });
  },

  /**
   * Stop current speech
   */
  stop: () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  },

  /**
   * Pause speech
   */
  pause: () => {
    if (speechSynthesis && speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  },

  /**
   * Resume paused speech
   */
  resume: () => {
    if (speechSynthesis && speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  },

  /**
   * Check if speech is currently playing
   */
  isSpeaking: () => {
    return speechSynthesis ? speechSynthesis.speaking || speechSynthesis.pending : false;
  },

  /**
   * Get available voices
   */
  getVoices: () => {
    return speechSynthesis ? speechSynthesis.getVoices() : [];
  },

  /**
   * Set voice by index
   */
  setVoice: (voiceIndex) => {
    const voices = TextToSpeech.getVoices();
    if (voices[voiceIndex]) {
      return voices[voiceIndex];
    }
    return null;
  },

  /**
   * Text normalization for better speech
   */
  normalize: (text) => {
    // Replace common abbreviations
    text = text.replace(/\&/g, 'and');
    text = text.replace(/(@)/g, 'at');
    text = text.replace(/%/g, 'percent');
    text = text.replace(/#/g, 'number');
    text = text.replace(/\$/g, 'dollars');

    // Replace multiple spaces with single space
    text = text.replace(/\s+/g, ' ');

    // Remove extra punctuation
    text = text.replace(/[^\w\s.!?]/g, '');

    return text.trim();
  },

  /**
   * Speak with normalization
   */
  speakNormalized: (text, options = {}) => {
    const normalized = TextToSpeech.normalize(text);
    return TextToSpeech.speak(normalized, options);
  },
};

/**
 * Speech Recognition Utility (Voice Input)
 * Uses Web Speech API for voice input
 */
export const SpeechRecognition = {
  initialize: () => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    return SpeechRecognitionAPI ? new SpeechRecognitionAPI() : null;
  },

  /**
   * Start listening for voice input
   */
  startListening: (onResult, onError, language = 'en-US') => {
    const recognition = SpeechRecognition.initialize();
    if (!recognition) {
      onError?.(new Error('Speech Recognition not supported'));
      return null;
    }

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' ';
        }
      }
      onResult?.(transcript.trim());
    };

    recognition.onerror = (error) => {
      onError?.(error);
    };

    recognition.start();
    return recognition;
  },

  /**
   * Stop listening
   */
  stopListening: (recognition) => {
    if (recognition) {
      recognition.stop();
    }
  },
};

export default TextToSpeech;
