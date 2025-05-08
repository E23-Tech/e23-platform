import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  fullWidth = false,
  variant = 'contained',
  color = 'primary',
  disabled = false,
}) => {
  const baseClasses = 'rounded-2xl py-1.5 sm:py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm tracking-[0.125em] transition-all duration-200 uppercase flex justify-center items-center h-9 font-roboto';
  
  const variantClasses = {
    contained: {
      primary: 'bg-[#133AB9] text-white hover:bg-blue-800',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    },
    outlined: {
      primary: 'border border-[#133AB9] text-[#133AB9] hover:bg-blue-50',
      secondary: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
    },
    text: {
      primary: 'text-[#133AB9] hover:bg-blue-50',
      secondary: 'text-gray-800 hover:bg-gray-50',
    },
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant][color]}
        ${widthClass}
        ${disabledClass}
      `}
    >
      {children}
    </button>
  );
}; 