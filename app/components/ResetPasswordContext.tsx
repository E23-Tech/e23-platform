import React, { createContext, useContext, useState } from 'react';

// Define the shape of our reset password form state
type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
  isSubmitted: boolean;
  errors: {
    password?: string;
    confirmPassword?: string;
  };
};

// Define the context type
type ResetPasswordContextType = ResetPasswordFormState & {
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  validateForm: () => boolean;
  resetErrors: () => void;
};

// Create the context with a default value
const ResetPasswordContext = createContext<ResetPasswordContextType | undefined>(undefined);

// Provider component
export const ResetPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset all errors
  const resetErrors = () => {
    setErrors({});
  };

  // Create the context value
  const contextValue: ResetPasswordContextType = {
    password,
    confirmPassword,
    isSubmitted,
    errors,
    setPassword,
    setConfirmPassword,
    setIsSubmitted,
    validateForm,
    resetErrors,
  };

  return <ResetPasswordContext.Provider value={contextValue}>{children}</ResetPasswordContext.Provider>;
};

// Custom hook to use the reset password context
export const useResetPasswordContext = (): ResetPasswordContextType => {
  const context = useContext(ResetPasswordContext);
  if (context === undefined) {
    throw new Error('useResetPasswordContext must be used within a ResetPasswordProvider');
  }
  return context;
}; 