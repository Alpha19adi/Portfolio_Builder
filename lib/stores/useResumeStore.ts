import { create } from "zustand";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
  github?: string;
  location?: string;
};

type ProfessionalInfo = {
  skills: string;
  experienceYears: string;
  summary: string;
};

type ProjectsInfo = {
  project1: string;
  project2: string;
};

type ExperienceInfo = {
  exp1: string;
  exp2: string;
};

type AIResume = {
  summary?: string;
  skills?: string[];
  experience?: ExperienceItem[];
  education?: string[];
  projects?: ProjectItem[];
};

type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  points: string[];
};

type ProjectItem = {
  name: string;
  tech: string[];
  description: string;
};

type ResumeState = {
  personalInfo: PersonalInfo;
  professional: ProfessionalInfo;
  projects: ProjectsInfo;
  experience: ExperienceInfo;
  jobDescription: string;

  aiResume?: AIResume;
  ats?: {
    score: number;
    missingKeywords?: string[];
    suggestions?: string[];
  };

  // setters
  setPersonalInfo: (partial: Partial<PersonalInfo>) => void;
  setProfessional: (partial: Partial<ProfessionalInfo>) => void;
  setProjects: (partial: Partial<ProjectsInfo>) => void;
  setExperience: (partial: Partial<ExperienceInfo>) => void;
  setJobDescription: (job: string) => void;

  setAIResume: (aiResume: AIResume) => void;
  setATS: (ats: ResumeState["ats"]) => void;

  reset: () => void;
};

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    location: "",
  },

  professional: {
    skills: "",
    experienceYears: "",
    summary: "",
  },

  projects: {
    project1: "",
    project2: "",
  },

  experience: {
    exp1: "",
    exp2: "",
  },

  jobDescription: "",

  aiResume: undefined,
  ats: undefined,

  // setters
  setPersonalInfo: (partial) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...partial },
    })),

  setProfessional: (partial) =>
    set((state) => ({
      professional: { ...state.professional, ...partial },
    })),

  setProjects: (partial) =>
    set((state) => ({
      projects: { ...state.projects, ...partial },
    })),

  setExperience: (partial) =>
    set((state) => ({
      experience: { ...state.experience, ...partial },
    })),

  setJobDescription: (job) => set({ jobDescription: job }),

  setAIResume: (data) => set({ aiResume: data }),
  setATS: (data) => set({ ats: data }),

  reset: () =>
    set({
      personalInfo: {
        name: "",
        phone: "",
        linkedIn: "",
        email: "",
        github: "",
        location: "",
      },
      professional: { skills: "", experienceYears: "", summary: "" },
      projects: { project1: "", project2: "" },
      experience: { exp1: "", exp2: "" },
      jobDescription: "",
      aiResume: undefined,
      ats: undefined,
    }),
}));
