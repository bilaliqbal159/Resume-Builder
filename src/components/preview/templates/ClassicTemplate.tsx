import React from 'react';
import type { ResumeData } from '../../../types/resume';
import { formatDateRange } from '../../../utils/dateFormat';

interface Props {
  data: ResumeData;
}

// Accent Color similar to sample resume: Vibrant Royal Blue
const ACCENT_COLOR = '#1e40af'; 

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}> = ({ title, children, isLast }) => (
  <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '22px' }}>
    {/* Circle Indicator on the left */}
    <div
      style={{
        position: 'absolute',
        left: '-5px',
        top: '4px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: `2px solid ${ACCENT_COLOR}`,
        backgroundColor: 'white',
        zIndex: 10,
      }}
    />
    
    {/* Connecting Timeline Line */}
    {!isLast && (
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '14px',
          bottom: '-22px', // covers the margin-bottom gap to next section
          width: '2px',
          backgroundColor: ACCENT_COLOR,
          zIndex: 5,
        }}
      />
    )}

    {/* Section Header */}
    <h2
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '10.5pt',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: ACCENT_COLOR,
        margin: '0 0 10px 0',
        letterSpacing: '0.05em',
      }}
    >
      {title}
    </h2>
    <div style={{ fontSize: '9.5pt', color: '#334155', lineHeight: 1.5 }}>
      {children}
    </div>
  </div>
);

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo: pi, workExperience, education, skills, projects } = data;

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasSummary = pi.summary?.trim();
  const hasLinks = pi.linkedin?.trim() || pi.portfolio?.trim();


  // Build the list of active timeline sections to compute isLast dynamically
  const activeSections = [
    {
      id: 'summary',
      has: hasSummary,
      title: 'Professional Summary',
      render: () => (
        <p style={{ margin: 0, color: '#334155', fontSize: '9.5pt', lineHeight: 1.55 }}>
          {pi.summary}
        </p>
      ),
    },
    {
      id: 'links',
      has: hasLinks,
      title: 'Websites, Portfolios, Profiles',
      render: () => (
        <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc' }}>
          {pi.linkedin && (
            <li style={{ marginBottom: '2px' }}>
              <a href={pi.linkedin} target="_blank" rel="noreferrer" style={{ color: '#334155', textDecoration: 'none' }}>
                {pi.linkedin}
              </a>
            </li>
          )}
          {pi.portfolio && (
            <li>
              <a href={pi.portfolio} target="_blank" rel="noreferrer" style={{ color: '#334155', textDecoration: 'none' }}>
                {pi.portfolio}
              </a>
            </li>
          )}
        </ul>
      ),
    },
    {
      id: 'skills',
      has: hasContent(skills),
      title: 'Skills',
      render: () => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px 20px',
            fontSize: '9.5pt',
            color: '#334155',
          }}
        >
          {skills.map((skill, index) => (
            <div key={index}>• {skill}</div>
          ))}
        </div>
      ),
    },
    {
      id: 'experience',
      has: hasContent(workExperience),
      title: 'Professional Experience',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {workExperience.map((exp) => (
            <div key={exp.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                    {exp.title || 'Job Title'}
                  </span>
                  {exp.company && (
                    <span style={{ color: '#475569', fontSize: '9.5pt' }}>
                      {' '}— {exp.company}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '9pt', fontWeight: 500, color: '#334155', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc' }}>
                  {exp.bullets.filter(Boolean).map((bullet, bi) => (
                    <li key={bi} style={{ fontSize: '9.5pt', color: '#334155', marginBottom: '2px', lineHeight: 1.45 }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'education',
      has: hasContent(education),
      title: 'Education',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {education.map((edu) => (
            <div key={edu.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                    {edu.school || 'School'}
                  </span>
                  {edu.degree && (
                    <span style={{ fontSize: '9.5pt', color: '#475569' }}>
                      {' '}— {edu.degree}{edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ''}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '9pt', fontWeight: 500, color: '#334155', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {formatDateRange(edu.startDate, edu.endDate, false)}
                </span>
              </div>
              {(edu.gpa || edu.notes) && (
                <p style={{ margin: '2px 0 0 0', fontSize: '9pt', color: '#64748b' }}>
                  {edu.gpa ? `GPA: ${edu.gpa}` : ''}{edu.gpa && edu.notes ? ' · ' : ''}{edu.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'projects',
      has: hasContent(projects),
      title: 'Projects',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {projects.map((proj) => (
            <div key={proj.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>
                    {proj.name || 'Project Name'}
                  </span>
                  {proj.technologies && (
                    <span style={{ fontSize: '9pt', color: '#64748b' }}>
                      {' '}({proj.technologies})
                    </span>
                  )}
                </div>
                {proj.url && (
                  <span style={{ fontSize: '9pt', color: ACCENT_COLOR, marginLeft: '12px' }}>
                    {proj.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                )}
              </div>
              {proj.description && (
                <p style={{ margin: '2px 0 0 0', fontSize: '9.5pt', color: '#475569' }}>
                  {proj.description}
                </p>
              )}
              {proj.bullets.filter(Boolean).length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc' }}>
                  {proj.bullets.filter(Boolean).map((bullet, bi) => (
                    <li key={bi} style={{ fontSize: '9.5pt', color: '#334155', marginBottom: '2px', lineHeight: 1.45 }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ].filter((s) => s.has);

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
        padding: '0.65in 0.75in',
        boxSizing: 'border-box',
      }}
    >
      {/* ─── Header: Left Aligned and Single-line like sample ─────────────────── */}
      <header style={{ textAlign: 'left', marginBottom: '24px' }}>
        <div style={{ marginBottom: '8px' }}>
          <h1
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '26pt',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0',
              lineHeight: '1.15',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            {pi.name || 'Your Name'}
          </h1>
        </div>

        {/* Subtitle / Professional Title */}
        {pi.title && (
          <div
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11pt',
              fontWeight: 500,
              color: '#334155',
              marginTop: '4px',
              marginBottom: '10px',
            }}
          >
            {pi.title}
          </div>
        )}

        {/* Contact info list */}
        <div
          style={{
            fontSize: '9pt',
            color: '#475569',
            lineHeight: '1.4',
          }}
        >
          {(pi.email || pi.phone) && (
            <div>
              {pi.email}
              {pi.email && pi.phone && ' | '}
              {pi.phone}
            </div>
          )}
          {pi.location && <div>{pi.location}</div>}
        </div>
      </header>

      {/* Vertical Timeline container */}
      <div style={{ position: 'relative', marginTop: '16px' }}>
        {activeSections.map((section, index) => (
          <Section
            key={section.id}
            title={section.title}
            isLast={index === activeSections.length - 1}
          >
            {section.render()}
          </Section>
        ))}
      </div>
    </div>
  );
};
