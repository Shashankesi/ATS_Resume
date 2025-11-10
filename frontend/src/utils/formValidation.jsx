import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const useFormValidation = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(values, { setErrors, setTouched });
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setErrors,
    setTouched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

// Validation rules
export const validationRules = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    return '';
  },
  confirmPassword: (value, formValues) => {
    if (!value) return 'Please confirm password';
    if (value !== formValues.password) return 'Passwords do not match';
    return '';
  },
  name: (value) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    if (value.length > 50) return 'Name must be less than 50 characters';
    return '';
  },
  phone: (value) => {
    if (!value) return '';
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
    return '';
  },
  url: (value) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Please enter a valid URL';
    }
  },
};

// Input field component with validation
export const ValidatedInput = ({
  label,
  name,
  type = 'text',
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  validationRule,
  showPassword = false,
  onTogglePassword,
  disabled = false,
  isDarkMode = false,
}) => {
  const isValid = touched && !error;
  const hasError = touched && error;

  const inputClass = `w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
    isDarkMode
      ? 'bg-slate-700 text-slate-100 placeholder-slate-400'
      : 'bg-slate-50 text-slate-900 placeholder-slate-500'
  } ${
    hasError
      ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
      : isValid
      ? 'border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-200'
      : isDarkMode
      ? 'border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
      : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
  } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {label && (
        <label
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClass}
        />

        {/* Password toggle button */}
        {type === 'password' && onTogglePassword && (
          <motion.button
            type="button"
            onClick={onTogglePassword}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            } hover:text-slate-900 dark:hover:text-slate-200`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </motion.button>
        )}

        {/* Validation icons */}
        {touched && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isValid && <Check className="text-green-500" size={20} />}
            {hasError && <AlertCircle className="text-red-500" size={20} />}
          </motion.div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 flex items-center gap-1"
        >
          <AlertCircle size={14} />
          {error}
        </motion.p>
      )}

      {/* Success message */}
      {isValid && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-500 flex items-center gap-1"
        >
          <Check size={14} />
          Looks good!
        </motion.p>
      )}
    </motion.div>
  );
};

// Select field component
export const ValidatedSelect = ({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  options,
  placeholder,
  disabled = false,
  isDarkMode = false,
}) => {
  const isValid = touched && !error;
  const hasError = touched && error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {label && (
        <label
          className={`block text-sm font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
          isDarkMode
            ? 'bg-slate-700 text-slate-100'
            : 'bg-slate-50 text-slate-900'
        } ${
          hasError
            ? 'border-red-500'
            : isValid
            ? 'border-green-500'
            : isDarkMode
            ? 'border-slate-600'
            : 'border-slate-300'
        }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// Textarea component
export const ValidatedTextarea = ({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  disabled = false,
  isDarkMode = false,
  maxLength,
}) => {
  const isValid = touched && !error;
  const hasError = touched && error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {label && (
        <div className="flex justify-between">
          <label
            className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {label}
          </label>
          {maxLength && (
            <span
              className={`text-xs ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 resize-none ${
          isDarkMode
            ? 'bg-slate-700 text-slate-100 placeholder-slate-400'
            : 'bg-slate-50 text-slate-900 placeholder-slate-500'
        } ${
          hasError
            ? 'border-red-500'
            : isValid
            ? 'border-green-500'
            : isDarkMode
            ? 'border-slate-600'
            : 'border-slate-300'
        }`}
      />

      {hasError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
