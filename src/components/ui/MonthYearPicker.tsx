import React from 'react';

interface MonthYearPickerProps {
  label?: string;
  id?: string;
  value: string;           // "YYYY-MM" format (native month input value)
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  label,
  id,
  value,
  onChange,
  disabled = false,
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
      <input
        type="month"
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          bg-[#0f1117]/60 border border-slate-700/60
          text-slate-100
          transition-all duration-150
          focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
          hover:border-slate-600
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-700/60
          [color-scheme:dark]
        `}
      />
    </div>
  );
};
