import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  hint,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-slate-400 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          bg-[#0f1117]/60 border border-slate-700/60
          text-slate-100 placeholder:text-slate-600
          transition-all duration-150 resize-y min-h-[80px]
          focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
          hover:border-slate-600
          ${className}
        `}
        {...props}
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
};
