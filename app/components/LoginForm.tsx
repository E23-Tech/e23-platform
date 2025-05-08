import React from 'react';
import { useNavigate, Link } from 'react-router';
import { TextField } from './TextField';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { useLoginContext } from './LoginContext';

export const LoginForm: React.FC = () => {
  const {
    email,
    password,
    rememberMe,
    errors,
    setEmail,
    setPassword,
    setRememberMe,
    validateForm,
  } = useLoginContext();
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would call an authentication API
      console.log('Form submitted:', { email, password, rememberMe });
      // Navigate to dashboard on successful login
      navigate('/');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      aria-describedby="form-error"
      noValidate
    >
      <TextField
        id="email"
        label="Username or email address"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        aria-required={true}
      />
      
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        showPasswordToggle
        aria-required={true}
      />
      
      <div className="flex justify-between items-center">
        <Checkbox
          id="remember-me"
          label="Remember me"
          checked={rememberMe}
          onChange={setRememberMe}
        />
        
        <Link
          to="/forgot-password"
          className="text-xs text-gray-700 hover:text-blue-600 font-roboto"
        >
          Forgot your password?
        </Link>
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          LOGIN
        </Button>
      </div>
      
      {(errors.email || errors.password) && (
        <div id="form-error" className="sr-only" aria-live="assertive">
          {errors.email && `Email error: ${errors.email}`}
          {errors.email && errors.password && '. '}
          {errors.password && `Password error: ${errors.password}`}
        </div>
      )}
    </form>
  );
}; 