import React from 'react';
import { TagInput } from '../ui/TagInput';

interface Props {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

export const SkillsForm: React.FC<Props> = ({ skills, onAdd, onRemove }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <TagInput
        label="Skills"
        tags={skills}
        onAdd={onAdd}
        onRemove={onRemove}
        placeholder="JavaScript, React, TypeScript…"
      />
      <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-lg p-3">
        <p className="text-xs text-indigo-300/70 leading-relaxed">
          💡 <strong>Tip:</strong> Include a mix of technical skills (languages, frameworks, tools)
          and methodologies (Agile, TDD). Match keywords from the job description to improve ATS
          compatibility.
        </p>
      </div>
    </div>
  );
};
