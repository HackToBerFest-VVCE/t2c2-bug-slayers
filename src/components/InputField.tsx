import React, { useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  helperText,
  isPassword = false,
  type = 'text',
  className = '',
  disabled,
  id,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-xs font-semibold tracking-wide text-[#bac9cc] flex items-center justify-between"
      >
        <span>{label}</span>
        {helperText && !error && (
          <span className="text-[11px] text-[#849396] font-normal">{helperText}</span>
        )}
      </label>

      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3.5 text-[#849396] text-[20px] pointer-events-none select-none">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          className={`w-full h-12 rounded-xl bg-[#13171f] text-white placeholder-[#849396]/60 text-sm font-medium transition-all duration-200 outline-none border ${
            icon ? 'pl-11' : 'pl-3.5'
          } ${isPassword ? 'pr-11' : 'pr-3.5'} ${
            error
              ? 'border-[#ff5964] focus:border-[#ff5964] shadow-[0_0_12px_rgba(255,89,100,0.25)]'
              : 'border-[#272a30] hover:border-[#3b494c] focus:border-[#7CFF65] focus:shadow-[0_0_15px_rgba(124,255,101,0.22)]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 text-[#849396] hover:text-white p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>

      {error && (
        <p className="text-[11px] font-medium text-[#ff5964] flex items-center gap-1 mt-0.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
