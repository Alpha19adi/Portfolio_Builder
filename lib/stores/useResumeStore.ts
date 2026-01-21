import { create } from "zustand";

type PersonalInfo = {
  name: string;
  email:  string;
  phone: string;
  linkedIn: string;
  github?: string;
  location?: string;
  profileImage?:  string;
};

type ProfessionalInfo = {
  skills: string;
  experienceYears: string;
  summary:  string;
  domain: string;
};

type ProjectsInfo = {
  project1: string;
  project2: string;
};

type ExperienceInfo = {
  exp1: string;
  exp2: string;
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

type AIPortfolio = {
  summary?: string;
  skills?: string[];
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
};

type PortfolioState = {
  personalInfo: PersonalInfo;
  professional: ProfessionalInfo;
  projects: ProjectsInfo;
  experience: ExperienceInfo;
  jobDescription: string;

  aiPortfolio?:  AIPortfolio;

  // Setters
  setPersonalInfo:  (partial: Partial<PersonalInfo>) => void;
  setProfessional: (partial:  Partial<ProfessionalInfo>) => void;
  setProjects: (partial: Partial<ProjectsInfo>) => void;
  setExperience: (partial:  Partial<ExperienceInfo>) => void;
  setJobDescription: (job: string) => void;
  setAIPortfolio:  (aiPortfolio: AIPortfolio) => void;

  // New update methods for in-place editing
  updatePersonalInfo: (partial: Partial<PersonalInfo>) => void;
  updateAiPortfolio: (data: Partial<AIPortfolio>) => void;

  reset: () => void;
};

export const useResumeStore = create<PortfolioState>((set) => ({
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    location: "",
    profileImage: "",
  },

  professional: {
    skills: "",
    experienceYears: "",
    summary: "",
    domain: "",
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

  aiPortfolio: undefined,

  setPersonalInfo: (partial) =>
    set((state) => ({
      personalInfo: { ... state.personalInfo, ...partial },
    })),

  setProfessional: (partial) =>
    set((state) => ({
      professional: { ...state.professional, ...partial },
    })),

  setProjects: (partial) =>
    set((state) => ({
      projects: { ... state.projects, ...partial },
    })),

  setExperience: (partial) =>
    set((state) => ({
      experience: { ...state.experience, ...partial },
    })),

  setJobDescription: (job) => set({ jobDescription: job }),

  setAIPortfolio: (data) => set({ aiPortfolio: data }),

  // New:  Update personal info (alias for setPersonalInfo, used by portfolio components)
  updatePersonalInfo:  (partial) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...partial },
    })),

  // New:  Partial update for AI Portfolio (for in-place editing)
  updateAiPortfolio: (data) =>
    set((state) => ({
      aiPortfolio: state.aiPortfolio
        ?  { ...state.aiPortfolio, ...data }
        : { ...data },
    })),

  reset: () =>
    set({
      personalInfo: {
        name: "",
        phone: "",
        linkedIn: "",
        email: "",
        github: "",
        location: "",
        profileImage: "",
      },
      professional: {
        skills: "",
        experienceYears: "",
        summary: "",
        domain:  "",
      },
      projects:  { project1: "", project2: "" },
      experience: { exp1: "", exp2: "" },
      jobDescription: "",
      aiPortfolio: undefined,
    }),
}));

export type {
  PersonalInfo,
  ProfessionalInfo,
  AIPortfolio,
  ExperienceItem,
  ProjectItem,
};