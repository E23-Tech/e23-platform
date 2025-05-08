import React from 'react';
import { useNavigate } from 'react-router';
import { TextField } from './TextField';
import { Button } from './Button';
import { useResetPasswordContext } from './ResetPasswordContext';

export const ResetPasswordForm: React.FC = () => {
  const {
    password,
    confirmPassword,
    isSubmitted,
    errors,
    setPassword,
    setConfirmPassword,
    setIsSubmitted,
    validateForm,
  } = useResetPasswordContext();
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would call an API to reset the password
      console.log('Form submitted:', { password, confirmPassword });
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
        <h2 className="text-xl font-semibold text-gray-800 font-roboto">Password Reset Successfully</h2>
        <p className="text-sm text-gray-600 font-roboto">
          Your password has been reset successfully. You can now login with your new password.
        </p>
        <div className="pt-4">
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleBackToLogin}
            fullWidth
          >
            Go to Login
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
        Enter your new password below.
      </p>
      
      <TextField
        id="password"
        label="New Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        showPasswordToggle
        aria-required={true}
      />
      
      <TextField
        id="confirm-password"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirmPassword}
        showPasswordToggle
        aria-required={true}
      />
      
      <div className="pt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Reset Password
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
      
      {(errors.password || errors.confirmPassword) && (
        <div id="form-error" className="sr-only" aria-live="assertive">
          {errors.password && `Password error: ${errors.password}`}
          {errors.password && errors.confirmPassword && '. '}
          {errors.confirmPassword && `Confirm password error: ${errors.confirmPassword}`}
        </div>
      )}
    </form>
  );
}; 