import React, { useState } from 'react';

type TextFieldProps = {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPasswordToggle?: boolean;
  'aria-required'?: boolean;
  'aria-describedby'?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  showPasswordToggle = false,
  'aria-required': ariaRequired,
  'aria-describedby': ariaDescribedby,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = errorId
    ? ariaDescribedby
      ? `${ariaDescribedby} ${errorId}`
      : errorId
    : ariaDescribedby;

  return (
    <div className="w-full">
      <div 
        className={`
          relative flex items-center w-full rounded-[10px] px-4 py-2 bg-[rgba(33,33,33,0.08)]
          ${error ? 'border-b border-red-500' : isFocused ? 'border-b-2 border-blue-600' : ''}
        `}
      >
        <div className="flex flex-col flex-grow">
          <label 
            htmlFor={id} 
            className={`
              text-xs tracking-wider uppercase font-roboto
              ${error ? 'text-red-600' : isFocused ? 'text-blue-600' : 'text-[rgba(0,0,0,0.38)]'}
            `}
          >
            {label}
          </label>
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-transparent outline-none w-full py-1 text-sm sm:text-base text-gray-900 font-roboto"
            aria-invalid={error ? 'true' : 'false'}
            aria-required={ariaRequired}
            aria-describedby={describedBy}
          />
        </div>
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-[rgba(0,0,0,0.6)] focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 font-roboto">
          {error}
        </p>
      )}
    </div>
  );
}; 