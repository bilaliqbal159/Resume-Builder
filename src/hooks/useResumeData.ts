import { useCallback } from 'react';
import type {
  ResumeData,
  WorkExperience,
  Education,
  Project,
  TemplateId,
} from '../types/resume';
import {
  DEFAULT_RESUME_DATA,
  DEFAULT_WORK_EXPERIENCE,
  DEFAULT_EDUCATION,
  DEFAULT_PROJECT,
} from '../types/resume';
import { useLocalStorage } from './useLocalStorage';
import { arrayMove } from '@dnd-kit/sortable';

export function useResumeData() {
  const [data, setData] = useLocalStorage<ResumeData>(
    'resume-builder-data',
    DEFAULT_RESUME_DATA
  );

  // ── Personal Info ─────────────────────────────────────────────────────────
  const updatePersonalInfo = useCallback(
    (field: string, value: string) => {
      setData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    },
    [setData]
  );

  // ── Work Experience ───────────────────────────────────────────────────────
  const addWorkExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, DEFAULT_WORK_EXPERIENCE()],
    }));
  }, [setData]);

  const updateWorkExperience = useCallback(
    (id: string, field: keyof WorkExperience, value: unknown) => {
      setData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      }));
    },
    [setData]
  );

  const removeWorkExperience = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.filter((exp) => exp.id !== id),
      }));
    },
    [setData]
  );

  const reorderWorkExperience = useCallback(
    (activeId: string, overId: string) => {
      setData((prev) => {
        const ids = prev.workExperience.map((e) => e.id);
        const oldIdx = ids.indexOf(activeId);
        const newIdx = ids.indexOf(overId);
        return {
          ...prev,
          workExperience: arrayMove(prev.workExperience, oldIdx, newIdx),
        };
      });
    },
    [setData]
  );

  const updateWorkBullet = useCallback(
    (expId: string, bulletIdx: number, value: string) => {
      setData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === expId
            ? {
                ...exp,
                bullets: exp.bullets.map((b, i) => (i === bulletIdx ? value : b)),
              }
            : exp
        ),
      }));
    },
    [setData]
  );

  const addWorkBullet = useCallback(
    (expId: string) => {
      setData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
        ),
      }));
    },
    [setData]
  );

  const removeWorkBullet = useCallback(
    (expId: string, bulletIdx: number) => {
      setData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((exp) =>
          exp.id === expId
            ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIdx) }
            : exp
        ),
      }));
    },
    [setData]
  );

  // ── Education ─────────────────────────────────────────────────────────────
  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, DEFAULT_EDUCATION()],
    }));
  }, [setData]);

  const updateEducation = useCallback(
    (id: string, field: keyof Education, value: unknown) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      }));
    },
    [setData]
  );

  const removeEducation = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.filter((edu) => edu.id !== id),
      }));
    },
    [setData]
  );

  const reorderEducation = useCallback(
    (activeId: string, overId: string) => {
      setData((prev) => {
        const ids = prev.education.map((e) => e.id);
        return {
          ...prev,
          education: arrayMove(prev.education, ids.indexOf(activeId), ids.indexOf(overId)),
        };
      });
    },
    [setData]
  );

  // ── Skills ────────────────────────────────────────────────────────────────
  const addSkill = useCallback(
    (skill: string) => {
      const trimmed = skill.trim();
      if (!trimmed) return;
      setData((prev) => ({
        ...prev,
        skills: prev.skills.includes(trimmed) ? prev.skills : [...prev.skills, trimmed],
      }));
    },
    [setData]
  );

  const removeSkill = useCallback(
    (skill: string) => {
      setData((prev) => ({
        ...prev,
        skills: prev.skills.filter((s) => s !== skill),
      }));
    },
    [setData]
  );

  // ── Projects ──────────────────────────────────────────────────────────────
  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, DEFAULT_PROJECT()],
    }));
  }, [setData]);

  const updateProject = useCallback(
    (id: string, field: keyof Project, value: unknown) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      }));
    },
    [setData]
  );

  const removeProject = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    },
    [setData]
  );

  const reorderProjects = useCallback(
    (activeId: string, overId: string) => {
      setData((prev) => {
        const ids = prev.projects.map((p) => p.id);
        return {
          ...prev,
          projects: arrayMove(prev.projects, ids.indexOf(activeId), ids.indexOf(overId)),
        };
      });
    },
    [setData]
  );

  const updateProjectBullet = useCallback(
    (projId: string, bulletIdx: number, value: string) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId
            ? { ...p, bullets: p.bullets.map((b, i) => (i === bulletIdx ? value : b)) }
            : p
        ),
      }));
    },
    [setData]
  );

  const addProjectBullet = useCallback(
    (projId: string) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId ? { ...p, bullets: [...p.bullets, ''] } : p
        ),
      }));
    },
    [setData]
  );

  const removeProjectBullet = useCallback(
    (projId: string, bulletIdx: number) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId
            ? { ...p, bullets: p.bullets.filter((_, i) => i !== bulletIdx) }
            : p
        ),
      }));
    },
    [setData]
  );

  // ── Template ──────────────────────────────────────────────────────────────
  const setTemplate = useCallback(
    (template: TemplateId) => {
      setData((prev) => ({ ...prev, template }));
    },
    [setData]
  );

  // ── Reset ─────────────────────────────────────────────────────────────────
  const resetData = useCallback(() => {
    setData(DEFAULT_RESUME_DATA);
  }, [setData]);

  return {
    data,
    updatePersonalInfo,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    reorderWorkExperience,
    updateWorkBullet,
    addWorkBullet,
    removeWorkBullet,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    reorderProjects,
    updateProjectBullet,
    addProjectBullet,
    removeProjectBullet,
    setTemplate,
    resetData,
  };
}
