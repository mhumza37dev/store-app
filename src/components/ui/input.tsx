import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-slate-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
export default Input;
