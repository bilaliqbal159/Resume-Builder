import React from 'react';
import type { TemplateId } from '../../types/resume';
import { Button } from '../ui/Button';

interface Props {
  template: TemplateId;
  onTemplateChange: (t: TemplateId) => void;
  onDownloadPdf: () => void;
  onReset: () => void;
}

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.5 2v8M4 7.5l3.5 3.5 3.5-3.5M2 12h11"/>
  </svg>
);

const ResetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 6.5A5 5 0 1 0 3 3M1 1v3h3"/>
  </svg>
);

export const Header: React.FC<Props> = ({
  template,
  onTemplateChange,
  onDownloadPdf,
  onReset,
}) => {
  return (
    <header className="shrink-0 flex items-center justify-between px-6 py-3.5 bg-[#1a1d27]/95 backdrop-blur-sm border-b border-slate-800 z-10">
      {/* Branding */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
            <rect x="2" y="2" width="4" height="1.5" rx="0.5"/>
            <rect x="2" y="4.5" width="10" height="1" rx="0.5"/>
            <rect x="2" y="6.5" width="10" height="1" rx="0.5"/>
            <rect x="2" y="8.5" width="7" height="1" rx="0.5"/>
            <rect x="2" y="10.5" width="5" height="1" rx="0.5"/>
          </svg>
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight">ResumeBuilder</span>
          <span className="ml-1.5 text-xs text-indigo-400 font-medium">Pro</span>
        </div>
      </div>

      {/* Center: Template Switcher */}
      <div className="flex items-center gap-1 bg-[#0f1117]/60 border border-slate-700/50 rounded-lg p-1">
        <span className="text-xs text-slate-500 px-2 font-medium">Theme:</span>
        {(['classic', 'modern'] as TemplateId[]).map((t) => (
          <button
            key={t}
            id={`template-${t}`}
            onClick={() => onTemplateChange(t)}
            className={`
              px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 capitalize
              ${template === t
                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<ResetIcon />}
          onClick={onReset}
          title="Clear all data"
          id="btn-reset"
        >
          Reset
        </Button>
        <Button
          variant="primary"
          size="md"
          icon={<DownloadIcon />}
          onClick={onDownloadPdf}
          id="btn-download-pdf"
        >
          Download PDF
        </Button>
      </div>
    </header>
  );
};
