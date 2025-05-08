import React, { createContext, useContext, useState } from 'react';

// Define the shape of our login form state
type LoginFormState = {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: {
    email?: string;
    password?: string;
  };
};

// Define the context type
type LoginContextType = LoginFormState & {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  validateForm: () => boolean;
  resetErrors: () => void;
};

// Create the context with a default value
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Provider component
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset all errors
  const resetErrors = () => {
    setErrors({});
  };

  // Create the context value
  const contextValue: LoginContextType = {
    email,
    password,
    rememberMe,
    errors,
    setEmail,
    setPassword,
    setRememberMe,
    validateForm,
    resetErrors,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};

// Custom hook to use the login context
export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
}; 