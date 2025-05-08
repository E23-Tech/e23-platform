import React from 'react';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="opacity-0 absolute h-4 sm:h-5 w-4 sm:w-5 cursor-pointer"
          aria-checked={checked}
        />
        <div
          className={`
            flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 border rounded
            ${checked ? 'bg-[#1540EC] border-[#1540EC]' : 'bg-white border-gray-400'}
            ${disabled ? 'opacity-50' : ''}
          `}
          role="presentation"
          aria-hidden="true"
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className={`ml-2 text-xs sm:text-sm font-normal font-roboto ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
      >
        {label}
      </label>
    </div>
  );
}; 