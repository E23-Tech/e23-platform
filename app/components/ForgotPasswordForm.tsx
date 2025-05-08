import React from 'react';
import { useNavigate } from 'react-router';
import { TextField } from './TextField';
import { Button } from './Button';
import { useForgotPasswordContext } from './ForgotPasswordContext';

export const ForgotPasswordForm: React.FC = () => {
  const {
    email,
    isSubmitted,
    errors,
    setEmail,
    setIsSubmitted,
    validateForm,
  } = useForgotPasswordContext();
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would call an API to send a password reset email
      console.log('Form submitted:', { email });
      setIsSubmitted(true);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 font-roboto">Email Sent</h2>
        <p className="text-sm text-gray-600 font-roboto">
          We've sent a password reset link to <span className="font-medium">{email}</span>.
          Please check your inbox and follow the instructions.
        </p>
        <div className="pt-4">
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleBackToLogin}
            fullWidth
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      aria-describedby="form-error"
      noValidate
    >
      <p className="text-sm text-gray-600 font-roboto mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <TextField
        id="email"
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        aria-required={true}
      />
      
      <div className="pt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Send Reset Link
        </Button>
      </div>
      
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={handleBackToLogin}
          className="text-xs text-gray-700 hover:text-blue-600 font-roboto"
        >
          Back to Login
        </button>
      </div>
      
      {errors.email && (
        <div id="form-error" className="sr-only" aria-live="assertive">
          {`Email error: ${errors.email}`}
        </div>
      )}
    </form>
  );
}; 