"use client";

import { useEffect, useRef } from "react";
import { PublishedPortfolio } from "@/lib/services/portfolio-service";
import { EditModeProvider } from "@/app/components/EditModeContext";
import { PortfolioBackground } from "@/app/components/PortfolioBackground";
import { HeroSection } from "@/app/components/HeroSection";
import { SkillsSection } from "@/app/components/SkillsSection";
import { ExperienceSection } from "@/app/components/ExperienceSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { ContactSection } from "@/app/components/ContactSection";
import { PortfolioFooter } from "@/app/components/PortfolioFooter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  portfolio: PublishedPortfolio;
}

export function PublicPortfolioWrapper({ portfolio }: Props) {
  const { personalInfo, professional, aiPortfolio } = portfolio;
  const { summary = "", skills = [], experience = [], projects = [] } = aiPortfolio || {};

  // Refs for animations
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Same GSAP animations as portfolio/page. tsx
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.from(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
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
        gsap.from(heroImageRef.current, {
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
        const experienceItems = experienceRef.current.querySelectorAll("[data-experience-item]");
        if (experienceItems.length > 0) {
          gsap.fromTo(
            experienceItems,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: experienceRef. current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            }
          );
        }
      }

      if (projectsRef.current) {
        const projectItems = projectsRef.current.querySelectorAll("[data-project-item]");
        if (projectItems.length > 0) {
          gsap.fromTo(
            projectItems,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: projectsRef. current,
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
        const contactItems = contactRef.current.querySelectorAll("[data-contact-item]");
        if (contactItems.length > 0) {
          gsap.fromTo(
            contactItems,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger:  {
                trigger: contactRef. current,
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
  }, []);

  const noOp = () => {};
  const noOpField = (_field: string, _value: string) => {};

  return (
    <EditModeProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
        <PortfolioBackground />
        <nav
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
                {personalInfo.name?. charAt(0) || "P"}
              </div>
              <span className="font-semibold text-gray-200">
                {personalInfo.name?. split(" ")[0] || "Portfolio"}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">About</a>
              <a href="#expertise" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Expertise</a>
              <a href="#experience" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Experience</a>
              <a href="#work" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Work</a>
              <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Contact</a>
            </div>
          </div>
        </nav>

        <HeroSection
          ref={heroRef}
          personal={personalInfo}
          professional={professional}
          summary={summary}
          onUpdatePersonal={noOpField}
          onUpdateSummary={noOp}
          heroContentRef={heroContentRef}
          heroImageRef={heroImageRef}
        />
        <SkillsSection
          ref={skillsRef}
          skills={skills}
          onUpdateSkills={noOp}
        />
        <ExperienceSection
          ref={experienceRef}
          experience={experience}
          onUpdateExperience={noOp}
        />
        <ProjectsSection
          ref={projectsRef}
          projects={projects}
          onUpdateProjects={noOp}
        />
        <ContactSection
          ref={contactRef}
          personal={personalInfo}
          onUpdatePersonal={noOpField}
        />
        <PortfolioFooter name={personalInfo.name} />
      </div>
    </EditModeProvider>
  );
}