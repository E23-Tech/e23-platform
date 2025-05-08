import React, { createContext, useContext, useState } from 'react';

// Define the shape of our forgot password form state
type ForgotPasswordFormState = {
  email: string;
  isSubmitted: boolean;
  errors: {
    email?: string;
  };
};

// Define the context type
type ForgotPasswordContextType = ForgotPasswordFormState & {
  setEmail: (email: string) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  validateForm: () => boolean;
  resetErrors: () => void;
};

// Create the context with a default value
const ForgotPasswordContext = createContext<ForgotPasswordContextType | undefined>(undefined);

// Provider component
export const ForgotPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: { email?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset all errors
  const resetErrors = () => {
    setErrors({});
  };

  // Create the context value
  const contextValue: ForgotPasswordContextType = {
    email,
    isSubmitted,
    errors,
    setEmail,
    setIsSubmitted,
    validateForm,
    resetErrors,
  };

  return <ForgotPasswordContext.Provider value={contextValue}>{children}</ForgotPasswordContext.Provider>;
};

// Custom hook to use the forgot password context
export const useForgotPasswordContext = (): ForgotPasswordContextType => {
  const context = useContext(ForgotPasswordContext);
  if (context === undefined) {
    throw new Error('useForgotPasswordContext must be used within a ForgotPasswordProvider');
  }
  return context;
}; 