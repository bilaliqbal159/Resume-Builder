import React from 'react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const LogoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="14" fill="url(#logo-g)"/>
    <rect x="11" y="11" width="12" height="4" rx="1.5" fill="white" opacity="0.95"/>
    <rect x="11" y="18" width="26" height="3" rx="1.5" fill="white" opacity="0.85"/>
    <rect x="11" y="24" width="26" height="3" rx="1.5" fill="white" opacity="0.75"/>
    <rect x="11" y="30" width="19" height="3" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="11" y="36" width="13" height="3" rx="1.5" fill="white" opacity="0.4"/>
    <defs>
      <linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5"/>
  </svg>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(99,102,241,0.22) 0%, transparent 55%), #0f1117',
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <LogoIcon />
        </div>

        {/* Wordmark */}
        <div className="mb-3 animate-fade-in">
          <span className="text-sm font-semibold tracking-[0.25em] text-indigo-400 uppercase">
            ResumeBuilder Pro
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl font-bold mb-6 leading-[1.1] animate-fade-in"
          style={{
            background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 40%, #c7d2fe 80%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Your resume,<br />
          beautifully crafted.
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed animate-fade-in">
          Fill in your details, preview in real time, and export a print-perfect PDF — no account needed.
        </p>

        {/* CTA */}
        <button
          id="welcome-get-started"
          onClick={onGetStarted}
          className="
            group inline-flex items-center gap-3
            px-8 py-4 rounded-xl font-semibold text-base text-white
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:ring-offset-2 focus:ring-offset-[#0f1117]
            hover:-translate-y-0.5
          "
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 0 0 1px rgba(99,102,241,0.4), 0 8px 32px rgba(99,102,241,0.35)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 0 1px rgba(99,102,241,0.6), 0 12px 40px rgba(99,102,241,0.5)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 0 1px rgba(99,102,241,0.4), 0 8px 32px rgba(99,102,241,0.35)';
          }}
        >
          Create my resume
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight />
          </span>
        </button>

        {/* Trust line */}
        <p className="mt-6 text-xs text-slate-600 animate-fade-in">
          No account · No upload · Everything stays in your browser
        </p>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 animate-fade-in">
          {[
            '✦ Live preview',
            '✦ PDF export',
            '✦ Two templates',
            '✦ Auto-saved locally',
            '✦ Drag to reorder',
          ].map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 rounded-full text-xs text-slate-500 border border-slate-800 bg-white/[0.02]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
