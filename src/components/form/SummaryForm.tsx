import React from 'react';
import { Textarea } from '../ui/Textarea';

interface Props {
  summary: string;
  onChange: (value: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, onChange }) => {
  const charCount = summary.length;
  const recommended = 300;

  return (
    <div className="space-y-2 animate-fade-in">
      <Textarea
        label="Professional Summary"
        id="summary-text"
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a concise 2–4 sentence summary highlighting your key experience, skills, and career goals. This is often the first thing recruiters read."
        rows={6}
        hint=""
      />
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-500">
          Aim for 2–4 sentences that speak directly to the role.
        </p>
        <span className={`text-xs ${charCount > recommended ? 'text-amber-400' : 'text-slate-500'}`}>
          {charCount} chars {charCount > recommended ? '(consider trimming)' : ''}
        </span>
      </div>
    </div>
  );
};
