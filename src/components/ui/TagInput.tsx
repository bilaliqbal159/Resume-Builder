import React, { useState, useRef } from 'react';

interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  label?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onAdd,
  onRemove,
  placeholder = 'Type and press Enter…',
  label,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputValue.trim().replace(/,$/, '');
      if (val) {
        onAdd(val);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div
        className="tag-container"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="
              inline-flex items-center gap-1 px-2.5 py-1
              bg-indigo-500/15 border border-indigo-500/30
              text-indigo-300 text-xs font-medium rounded-md
              transition-all duration-100
              hover:bg-indigo-500/25 hover:border-indigo-500/50
            "
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
              className="ml-0.5 text-indigo-400 hover:text-white transition-colors"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="
            flex-1 min-w-[120px] bg-transparent
            text-sm text-slate-100 placeholder:text-slate-600
            outline-none border-none
          "
        />
      </div>
      <p className="text-xs text-slate-500">Press Enter or comma to add a skill</p>
    </div>
  );
};
