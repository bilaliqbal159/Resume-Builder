import { forwardRef } from 'react';
import type { ResumeData } from '../../types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface Props {
  data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    // Chain link A: flex-col container, participates in parent flex via flex-1,
    // min-h-0 lets it shrink below content size (required for the inner
    // overflow-auto to ever activate).
    <div className="flex flex-col flex-1 min-h-0 bg-[#0f1117]">

      {/* Panel label — fixed height, never scrolls */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Live Preview
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-500">Updates in real time</span>
        </div>
      </div>

      {/* Chain link B: THE scroll container.
          - flex-1      → grows to fill remaining height from parent flex-col
          - min-h-0     → THE CRITICAL FIX. Overrides min-height:auto (flex default).
                          Without this, min-height resolves to the content height
                          (the 11-inch resume page), so the container ALWAYS expands
                          to fit content and overflow-auto never triggers.
          - overflow-auto → clips content and adds scrollbar when content > container
          The paper inside (8.5in × min-height:11in) grows freely within this
          container — that's correct and expected. */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="p-6 flex justify-center">
          <div
            className="resume-print-target"
            style={{
              boxShadow: '0 4px 40px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)',
              borderRadius: '2px',
              width: '8.5in',
              flexShrink: 0,
            }}
          >
            <div ref={ref}>
              {data.template === 'classic' ? (
                <ClassicTemplate data={data} />
              ) : (
                <ModernTemplate data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
