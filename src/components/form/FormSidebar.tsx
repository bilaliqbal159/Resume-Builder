import React, { useState } from 'react';
import type { ResumeData, WorkExperience, Education, Project } from '../../types/resume';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';

type Tab = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
];

interface Props {
  data: ResumeData;
  onUpdatePersonalInfo: (field: string, value: string) => void;
  onUpdateSummary: (value: string) => void;
  onAddWorkExperience: () => void;
  onUpdateWorkExperience: (id: string, field: keyof WorkExperience, value: unknown) => void;
  onRemoveWorkExperience: (id: string) => void;
  onReorderWorkExperience: (activeId: string, overId: string) => void;
  onUpdateWorkBullet: (expId: string, idx: number, value: string) => void;
  onAddWorkBullet: (expId: string) => void;
  onRemoveWorkBullet: (expId: string, idx: number) => void;
  onAddEducation: () => void;
  onUpdateEducation: (id: string, field: keyof Education, value: unknown) => void;
  onRemoveEducation: (id: string) => void;
  onReorderEducation: (activeId: string, overId: string) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onAddProject: () => void;
  onUpdateProject: (id: string, field: keyof Project, value: unknown) => void;
  onRemoveProject: (id: string) => void;
  onReorderProjects: (activeId: string, overId: string) => void;
  onUpdateProjectBullet: (projId: string, idx: number, value: string) => void;
  onAddProjectBullet: (projId: string) => void;
  onRemoveProjectBullet: (projId: string, idx: number) => void;
}

export const FormSidebar: React.FC<Props> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const { data } = props;

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={props.onUpdatePersonalInfo}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            summary={data.personalInfo.summary}
            onChange={(v) => props.onUpdatePersonalInfo('summary', v)}
          />
        );
      case 'experience':
        return (
          <WorkExperienceForm
            experiences={data.workExperience}
            onAdd={props.onAddWorkExperience}
            onUpdate={props.onUpdateWorkExperience}
            onRemove={props.onRemoveWorkExperience}
            onReorder={props.onReorderWorkExperience}
            onUpdateBullet={props.onUpdateWorkBullet}
            onAddBullet={props.onAddWorkBullet}
            onRemoveBullet={props.onRemoveWorkBullet}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={data.education}
            onAdd={props.onAddEducation}
            onUpdate={props.onUpdateEducation}
            onRemove={props.onRemoveEducation}
            onReorder={props.onReorderEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={data.skills}
            onAdd={props.onAddSkill}
            onRemove={props.onRemoveSkill}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={data.projects}
            onAdd={props.onAddProject}
            onUpdate={props.onUpdateProject}
            onRemove={props.onRemoveProject}
            onReorder={props.onReorderProjects}
            onUpdateBullet={props.onUpdateProjectBullet}
            onAddBullet={props.onAddProjectBullet}
            onRemoveBullet={props.onRemoveProjectBullet}
          />
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#1a1d27] border-r border-slate-800">
      {/* Tab Bar */}
      <div className="flex border-b border-slate-800 overflow-x-auto shrink-0">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center gap-0.5 py-3 px-1
                text-xs font-medium transition-all duration-150 whitespace-nowrap
                border-b-2 min-w-[56px]
                ${isActive
                  ? 'text-indigo-400 border-indigo-500 bg-indigo-500/5'
                  : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/3'
                }
              `}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content — min-h-0 required so overflow-y-auto actually scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
};
