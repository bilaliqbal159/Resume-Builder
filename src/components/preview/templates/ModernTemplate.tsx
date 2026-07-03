import React from 'react';
import type { ResumeData } from '../../../types/resume';
import { formatDateRange } from '../../../utils/dateFormat';

interface Props {
  data: ResumeData;
}

const ACCENT = '#4f46e5'; // Indigo-600
const ACCENT_LIGHT = '#eef2ff'; // Indigo-50

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      <div style={{ width: '3px', height: '14px', background: ACCENT, borderRadius: '2px', flexShrink: 0 }} />
      <h2
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '9pt',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: ACCENT,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
    {children}
  </div>
);

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo: pi, workExperience, education, skills, projects } = data;
  const hasContent = (arr: unknown[]) => arr.length > 0;
  const hasSummary = pi.summary?.trim();

  return (
    <div
      style={{
        width: '8.5in',
        minHeight: '11in',
        background: 'white',
        color: '#1e293b',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '10pt',
        lineHeight: 1.45,
        boxSizing: 'border-box',
      }}
    >
      {/* ─── Header Banner ────────────────────────────────────────────────────── */}
      <header
        style={{
          background: `linear-gradient(135deg, #312e81 0%, ${ACCENT} 60%, #7c3aed 100%)`,
          padding: '28px 40px 24px',
          color: 'white',
        }}
      >
        <h1
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '24pt',
            fontWeight: 700,
            margin: '0 0 4px 0',
            letterSpacing: '-0.02em',
            color: 'white',
          }}
        >
          {pi.name || 'Your Name'}
        </h1>

        {pi.title && (
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11pt',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.9)',
              marginTop: '2px',
              marginBottom: '6px',
            }}
          >
            {pi.title}
          </div>
        )}

        {/* Contact row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 14px',
            fontSize: '8.5pt',
            color: 'rgba(255,255,255,0.82)',
            marginTop: '6px',
          }}
        >
          {pi.email && <span>✉ {pi.email}</span>}
          {pi.phone && <span>📞 {pi.phone}</span>}
          {pi.location && <span>📍 {pi.location}</span>}
          {pi.linkedin && (
            <span>
              🔗 {pi.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {pi.portfolio && (
            <span>
              🌐 {pi.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
        </div>
      </header>

      {/* ─── Body ────────────────────────────────────────────────────────────── */}
      <div style={{ padding: '24px 40px' }}>
        {/* Summary */}
        {hasSummary && (
          <div
            style={{
              background: ACCENT_LIGHT,
              borderLeft: `3px solid ${ACCENT}`,
              padding: '10px 14px',
              borderRadius: '0 4px 4px 0',
              marginBottom: '20px',
            }}
          >
            <p style={{ margin: 0, fontSize: '9.5pt', color: '#374151', lineHeight: 1.6 }}>
              {pi.summary}
            </p>
          </div>
        )}

        {/* Education */}
        {hasContent(education) && (
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={edu.id} style={{ marginBottom: i < education.length - 1 ? '10px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                      {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    </span>
                    {edu.school && (
                      <div style={{ fontSize: '9.5pt', color: '#4f46e5', fontWeight: 500 }}>
                        {edu.school}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '8.5pt',
                      color: 'white',
                      background: ACCENT,
                      borderRadius: '12px',
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                      marginLeft: '12px',
                      flexShrink: 0,
                    }}
                  >
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                {(edu.gpa || edu.notes) && (
                  <p style={{ margin: '3px 0 0 0', fontSize: '9pt', color: '#64748b' }}>
                    {edu.gpa ? `GPA: ${edu.gpa}` : ''}{edu.gpa && edu.notes ? ' · ' : ''}{edu.notes}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {hasContent(skills) && (
          <Section title="Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '8.5pt',
                    padding: '3px 9px',
                    background: ACCENT_LIGHT,
                    color: ACCENT,
                    borderRadius: '4px',
                    fontWeight: 500,
                    border: `1px solid #c7d2fe`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Work Experience */}
        {hasContent(workExperience) && (
          <Section title="Experience">
            {workExperience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < workExperience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                      {exp.title || 'Job Title'}
                    </span>
                    {exp.company && (
                      <div style={{ fontSize: '9.5pt', color: '#4f46e5', fontWeight: 500 }}>
                        {exp.company}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '8.5pt',
                      color: 'white',
                      background: ACCENT,
                      borderRadius: '12px',
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                      marginLeft: '12px',
                      flexShrink: 0,
                    }}
                  >
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: '5px 0 0 0', paddingLeft: '16px' }}>
                    {exp.bullets.filter(Boolean).map((bullet, bi) => (
                      <li
                        key={bi}
                        style={{
                          fontSize: '9.5pt',
                          color: '#374151',
                          marginBottom: '2px',
                          lineHeight: 1.5,
                        }}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {hasContent(projects) && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ marginBottom: i < projects.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                    {proj.name || 'Project Name'}
                  </span>
                  {proj.url && (
                    <span style={{ fontSize: '8.5pt', color: ACCENT }}>
                      {proj.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '1px', fontStyle: 'italic' }}>
                    {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p style={{ margin: '3px 0 0 0', fontSize: '9.5pt', color: '#374151' }}>
                    {proj.description}
                  </p>
                )}
                {proj.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                    {proj.bullets.filter(Boolean).map((bullet, bi) => (
                      <li key={bi} style={{ fontSize: '9.5pt', color: '#374151', marginBottom: '2px', lineHeight: 1.5 }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};
