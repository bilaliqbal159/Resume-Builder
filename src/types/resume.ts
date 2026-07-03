// ─── Resume Data Types ────────────────────────────────────────────────────────

export type TemplateId = 'classic' | 'modern';

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: string;
  notes: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
  bullets: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  template: TemplateId;
}

// ─── Default / Empty Values ───────────────────────────────────────────────────

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  summary: '',
};

export const DEFAULT_WORK_EXPERIENCE = (): WorkExperience => ({
  id: crypto.randomUUID(),
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  current: false,
  bullets: [''],
});

export const DEFAULT_EDUCATION = (): Education => ({
  id: crypto.randomUUID(),
  degree: '',
  school: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  gpa: '',
  notes: '',
});

export const DEFAULT_PROJECT = (): Project => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  url: '',
  technologies: '',
  bullets: [''],
});

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: DEFAULT_PERSONAL_INFO,
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  template: 'classic',
};
