"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditModeProvider } from "../components/EditModeContext";
import { PortfolioNav } from "../components/PortfolioNav";
import { PortfolioBackground } from "../components/PortfolioBackground";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { type ExperienceItem } from "../components/EditableExperienceItem";
import { type ProjectItem } from "../components/EditableProjectItem";
import { ContactSection } from "../components/ContactSection";
import { PortfolioFooter } from "../components/PortfolioFooter";
import { SkillsSection } from "../components/SkillsSection";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


export default function PortfolioPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const personal = useResumeStore((s) => s.personalInfo);
  const professional = useResumeStore((s) => s.professional);
  const ai = useResumeStore((s) => s.aiPortfolio);

  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const updateAiPortfolio = useResumeStore((s) => s.updateAiPortfolio);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ! ai) {
      router.push("/builder");
    }
  }, [ai, router, mounted]);

  useEffect(() => {
  if (! mounted || !ai) return;

  const ctx = gsap.context(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease:  "power3.out",
      });
    }

    if (heroContentRef.current) {
      const children = Array.from(heroContentRef.current.children);
      gsap.from(children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    }

    if (heroImageRef.current) {
      gsap.from(heroImageRef. current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    if (skillsRef.current) {
      const skillItems = skillsRef.current.querySelectorAll("[data-skill-item]");
      if (skillItems.length > 0) {
        gsap.fromTo(
          skillItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }
    }

    if (experienceRef.current) {
      const experienceItems = experienceRef. current.querySelectorAll(
        "[data-experience-item]"
      );
      if (experienceItems.length > 0) {
        gsap.fromTo(
          experienceItems,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 80%",
              toggleActions:  "play none none reverse",
            },
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          }
        );
      }
    }

    if (projectsRef.current) {
      const projectItems = projectsRef.current.querySelectorAll(
        "[data-project-item]"
      );
      if (projectItems.length > 0) {
        gsap.fromTo(
          projectItems,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger:  projectsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }
    }

    if (contactRef.current) {
      const contactItems = contactRef.current.querySelectorAll(
        "[data-contact-item]"
      );
      if (contactItems.length > 0) {
        gsap.fromTo(
          contactItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    }
  });

  return () => ctx.revert();
}, [mounted, ai]);

  const handleUpdatePersonal = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleUpdateSummary = (value: string) => {
    updateAiPortfolio({ summary: value });
  };

  const handleUpdateSkills = (skills: string[]) => {
    updateAiPortfolio({ skills });
  };

const handleUpdateExperience = (experience: ExperienceItem[]) => {
  updateAiPortfolio({ experience });
};

const handleUpdateProjects = (projects: ProjectItem[]) => {
  updateAiPortfolio({ projects });
};
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin [animation-delay:150ms]"></div>
          </div>
          <p className="text-gray-400 text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!ai) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin [animation-delay:150ms]"></div>
          </div>
          <p className="text-gray-400 text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const { summary = "", skills = [], projects = [], experience = [] } = ai;
  
  const hasContent =
    summary ||
    skills.length > 0 ||
    projects.length > 0 ||
    experience.length > 0;

  return (
    <EditModeProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
        <PortfolioBackground />

        <PortfolioNav ref={navRef} name={personal.name} />

        <HeroSection
          ref={heroRef}
          personal={personal}
          professional={professional}
          summary={summary}
          onUpdatePersonal={handleUpdatePersonal}
          onUpdateSummary={handleUpdateSummary}
          heroContentRef={heroContentRef}
          heroImageRef={heroImageRef}
        />

        <SkillsSection
          ref={skillsRef}
          skills={skills}
          onUpdateSkills={handleUpdateSkills}
        />

        <ExperienceSection
          ref={experienceRef}
          experience={experience}
          onUpdateExperience={handleUpdateExperience}
        />
        <ProjectsSection
          ref={projectsRef}
          projects={projects}
          onUpdateProjects={handleUpdateProjects}
        />
        <ContactSection
          ref={contactRef}
          personal={personal}
          onUpdatePersonal={handleUpdatePersonal}
        />

        <PortfolioFooter name={personal.name} />

        {!hasContent && (
          <section className="py-32 px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-6">
                No portfolio content generated yet. Head back to the builder to
                create your amazing portfolio!
              </p>
              <button
                onClick={() => router.push("/builder")}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Go to Builder
              </button>
            </div>
          </section>
        )}

        {/* Global Styles for Animations */}
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(-5deg);
            }
          }

          . floating-badge {
            animation: float 3s ease-in-out infinite;
          }

          .floating-badge-delayed {
            animation: float 3s ease-in-out infinite;
            animation-delay: 1. 5s;
          }
        `}</style>
      </div>
    </EditModeProvider>
  );
}