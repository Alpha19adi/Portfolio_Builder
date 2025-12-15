"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const personal = useResumeStore((s) => s.personalInfo);
  const professional = useResumeStore((s) => s.professional);
  const ai = useResumeStore((s) => s.aiPortfolio);

  // Refs for GSAP animations
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

  // GSAP Animations
  useEffect(() => {
    if (! mounted || !ai) return;

    const ctx = gsap.context(() => {
      // Nav animation
      if (navRef.current) {
        gsap.from(navRef.current, {
          y: -100,
          opacity:  0,
          duration: 1,
          ease:  "power3.out",
        });
      }

      // Hero content animation
      if (heroContentRef.current) {
        const children = Array.from(heroContentRef.current.children);
        gsap.from(children, {
          y:  60,
          opacity:  0,
          duration: 1,
          stagger: 0.15,
          ease:  "power3.out",
          delay: 0.3,
        });
      }

      // Hero image animation
      if (heroImageRef.current) {
        gsap.from(heroImageRef. current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Skills section animation - FIXED: removed space in selector
      if (skillsRef.current) {
        const skillItems = skillsRef.current. querySelectorAll("[data-skill-item]");
        if (skillItems.length > 0) {
          gsap. from(skillItems, {
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            y:  40,
            opacity:  0,
            duration: 0.6,
            stagger: 0.05,
            ease:  "power2.out",
          });
        }
      }

      // Experience section animation - FIXED: removed space in selector
      if (experienceRef. current) {
        const experienceItems = experienceRef.current.querySelectorAll("[data-experience-item]");
        if (experienceItems.length > 0) {
          gsap.from(experienceItems, {
            scrollTrigger: {
              trigger: experienceRef. current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            x: -60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease:  "power2.out",
          });
        }
      }

      // Projects section animation - FIXED:  removed space in selector
      if (projectsRef.current) {
        const projectItems = projectsRef. current.querySelectorAll("[data-project-item]");
        if (projectItems.length > 0) {
          gsap.from(projectItems, {
            scrollTrigger:  {
              trigger:  projectsRef.current,
              start:  "top 80%",
              toggleActions: "play none none reverse",
            },
            y: 60,
            opacity:  0,
            duration: 0.8,
            stagger: 0.15,
            ease:  "power2.out",
          });
        }
      }

      // Contact section animation - FIXED: removed space in selector
      if (contactRef.current) {
        const contactItems = contactRef. current.querySelectorAll("[data-contact-item]");
        if (contactItems.length > 0) {
          gsap.from(contactItems, {
            scrollTrigger:  {
              trigger:  contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:  0,
            duration: 0.6,
            stagger: 0.1,
            ease:  "power2.out",
          });
        }
      }
    });

    return () => ctx.revert();
  }, [mounted, ai]);

  if (!ai) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin animation-delay-150"></div>
          </div>
          <p className="text-gray-400 text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const { summary, skills = [], projects = [], experience = [] } = ai;
  const hasContent = summary || skills.length > 0 || projects.length > 0 || experience.length > 0;

  // Profession-neutral domain labels
  const labels = {
    software_developer: "Software Developer",
    data_science: "Data Scientist",
    medical:  "Healthcare Professional",
    marketing: "Marketing Specialist",
    finance: "Finance Professional",
    design: "Creative Designer",
    education: "Educator",
    legal: "Legal Professional",
    sales: "Sales Professional",
    hr: "HR Professional",
    engineering: "Engineer",
    content:  "Content Creator",
    consulting: "Consultant",
    research: "Researcher",
    architecture: "Architect",
    real_estate: "Real Estate Professional",
    hospitality: "Hospitality Professional",
    logistics: "Logistics Specialist",
    manufacturing: "Manufacturing Professional",
    agriculture: "Agricultural Specialist",
    arts: "Artist",
    music: "Musician",
    photography: "Photographer",
    journalism: "Journalist",
    social_work: "Social Worker",
    government: "Public Servant",
    nonprofit: "Nonprofit Professional",
    sports: "Sports Professional",
    fitness: "Fitness Professional",
    culinary: "Culinary Professional",
    fashion: "Fashion Professional",
    beauty: "Beauty Professional",
    automotive: "Automotive Professional",
    aviation: "Aviation Professional",
    maritime: "Maritime Professional",
    telecommunications: "Telecommunications Professional",
    energy: "Energy Sector Professional",
    environmental: "Environmental Specialist",
    other: "Professional",
  } as const;
  type Domain = keyof typeof labels;

  const getDomainLabel = (domain: string) => {
    const key:  Domain = (domain in labels ?  domain : "other") as Domain;
    return labels[key];
  };

  // Profession-neutral icons based on domain
  const icons:  Record<Domain, string> = {
    software_developer: "💻",
    data_science: "📊",
    medical: "⚕️",
    marketing: "📈",
    finance: "💰",
    design: "🎨",
    education: "📚",
    legal: "⚖️",
    sales: "🤝",
    hr: "👥",
    engineering:  "⚙️",
    content: "✍️",
    consulting: "💡",
    research:  "🔬",
    architecture: "🏛️",
    real_estate: "🏠",
    hospitality: "🏨",
    logistics: "📦",
    manufacturing:  "🏭",
    agriculture: "🌾",
    arts:  "🎭",
    music:  "🎵",
    photography: "📷",
    journalism:  "📰",
    social_work:  "❤️",
    government: "🏛️",
    nonprofit: "🌍",
    sports:  "⚽",
    fitness: "💪",
    culinary: "👨‍🍳",
    fashion: "👗",
    beauty: "💄",
    automotive: "🚗",
    aviation:  "✈️",
    maritime: "🚢",
    telecommunications: "📡",
    energy:  "⚡",
    environmental: "🌱",
    other:  "🌟",
  };
  
  const getDomainIcon = (domain: string) => {
    const key: Domain = (domain in icons ? domain :  "other") as Domain;
    return icons[key];
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-cyan-600/5 rounded-full blur-3xl"></div>
        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
              {personal.name?. charAt(0) || "P"}
            </div>
            <span className="font-semibold text-gray-200">{personal.name?. split(" ")[0] || "Portfolio"}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">About</a>
            <a href="#expertise" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Expertise</a>
            <a href="#experience" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Experience</a>
            <a href="#work" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Work</a>
            <a href="#contact" className="text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full hover:opacity-90 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="about" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div ref={heroContentRef} className="order-2 lg: order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for opportunities
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-100">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {personal.name || "Your Name"}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 mt-4 font-light flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                <span className="text-2xl">{getDomainIcon(professional.domain)}</span>
                <span>{getDomainLabel(professional.domain)}</span>
                {professional.experienceYears && (
                  <span className="px-3 py-1 bg-gray-800/50 rounded-full text-base">
                    {professional.experienceYears}+ Years
                  </span>
                )}
              </p>

              {summary && (
                <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {summary}
                </p>
              )}

              {/* Contact Links - Profession Neutral */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {personal.email && (
                  <a
                    href={`mailto:${personal. email}`}
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">Email</span>
                  </a>
                )}
                {personal.linkedIn && (
                  <a
                    href={personal.linkedIn. startsWith("http") ? personal.linkedIn : `https://${personal.linkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover: border-purple-500/50 hover: bg-gray-800 transition-all duration-300 hover: scale-105"
                  >
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20. 447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h. 046c.477-. 9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-. 926-2.063-2.065 0-1.138. 92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 . 774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
                  </a>
                )}
                {personal.github && (
                  <a
                    href={personal.github. startsWith("http") ? personal.github :  `https://${personal.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-. 729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-. 775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-. 124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">Portfolio</span>
                  </a>
                )}
              </div>

              {/* Location */}
              {personal.location && (
                <div className="flex items-center gap-2 mt-6 justify-center lg:justify-start text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17. 657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{personal.location}</span>
                </div>
              )}
            </div>

            {/* Right Content - Profile Image */}
            <div ref={heroImageRef} className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 -m-4 rounded-full border border-purple-500/20 animate-pulse"></div>
                <div className="absolute inset-0 -m-8 rounded-full border border-cyan-500/10"></div>
                <div className="absolute inset-0 -m-12 rounded-full border border-purple-500/5"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-full blur-2xl"></div>
                
                {/* Image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-purple-500/20">
                  {personal.profileImage ?  (
                    <img
                      src={personal.profileImage}
                      alt={personal.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-7xl sm:text-8xl font-bold text-white/90">
                        {personal.name?. charAt(0) || "? "}
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating badges - Profession neutral */}
                <div className="absolute -right-4 top-1/4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg floating-badge">
                  <span className="text-2xl">{getDomainIcon(professional.domain)}</span>
                </div>
                <div className="absolute -left-4 bottom-1/4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg floating-badge-delayed">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
              <div className="w-1. 5 h-3 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE/SKILLS SECTION ===== */}
      {skills.length > 0 && (
        <section id="expertise" ref={skillsRef} className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Expertise</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Skills & Competencies
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                A comprehensive set of capabilities I bring to every endeavor
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {skills. map((skill, i) => (
                <div
                  key={i}
                  data-skill-item
                  className="group relative px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-gray-300 font-medium group-hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== EXPERIENCE SECTION ===== */}
      {experience.length > 0 && (
        <section id="experience" ref={experienceRef} className="relative py-32 px-6 bg-gray-900/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Career Journey</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Professional Experience
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Building expertise and delivering results across my career
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 hidden md:block"></div>

              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    data-experience-item
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -ml-2 md:-ml-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-4 border-gray-950 hidden md:block"></div>

                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ?  "md:pr-16" : "md: pl-16"}`}>
                      <div className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover: shadow-xl hover:shadow-purple-500/5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                              {exp.role || "Role"}
                            </h3>
                            <p className="text-purple-400 font-medium">
                              {exp.company || "Organization"}
                            </p>
                          </div>
                          {exp.duration && (
                            <span className="inline-flex items-center gap-2 px-4 py-1. 5 bg-gray-800 rounded-full text-sm text-gray-400 whitespace-nowrap">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {exp. duration}
                            </span>
                          )}
                        </div>

                        {exp.points && exp.points.length > 0 && (
                          <ul className="space-y-3 mt-6">
                            {exp.points.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 shrink-0"></span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== WORK/PROJECTS SECTION ===== */}
      {projects.length > 0 && (
        <section id="work" ref={projectsRef} className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Portfolio</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                A selection of achievements that showcase my expertise and dedication
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                <div
                  key={i}
                  data-project-item
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project number badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-500 font-bold group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover: to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {p.name || `Project ${i + 1}`}
                    </h3>

                    {p.tech && p.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p. tech.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 bg-gray-800 text-purple-300 rounded-lg text-xs font-medium border border-gray-700 group-hover:border-purple-500/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {p.description && (
                      <p className="text-gray-400 mt-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {p.description}
                      </p>
                    )}

                    {/* View project link */}
                    <div className="mt-8 flex items-center gap-2 text-purple-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>View Details</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" ref={contactRef} className="relative py-32 px-6 bg-gradient-to-b from-gray-900/50 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <span data-contact-item className="text-green-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 data-contact-item className="text-4xl sm:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>
          <p data-contact-item className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            I&apos;m always excited to discuss new opportunities, creative ideas, or potential collaborations. Let&apos;s connect! 
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">Email</h3>
                <p className="text-gray-500 text-sm mt-1 break-all">{personal.email}</p>
              </a>
            )}

            {personal. linkedIn && (
              <a
                href={personal.linkedIn. startsWith("http") ? personal.linkedIn : `https://${personal.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h. 046c.477-. 9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-. 926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C. 792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 . 774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">LinkedIn</h3>
                <p className="text-gray-500 text-sm mt-1">Let&apos;s connect</p>
              </a>
            )}

            {personal. github && (
              <a
                href={personal.github. startsWith("http") ? personal.github :  `https://${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-pink-600/20 to-pink-600/5 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 group-hover: text-white transition-colors">Website</h3>
                <p className="text-gray-500 text-sm mt-1">View my work</p>
              </a>
            )}
          </div>

          {/* Phone and Location */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-gray-500">
            {personal.phone && (
              <div data-contact-item className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-. 502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-. 502l4.493 1.498a1 1 0 01.684. 949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div data-contact-item className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17. 657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{personal.location}</span>
              </div>
            )}
          </div>

          {/* Edit Button */}
          <div data-contact-item className="mt-12">
            <button
              onClick={() => router.push("/builder")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl font-semibold text-white hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {personal.name || "Portfolio"}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with <span className="text-red-500">❤</span> using AI Portfolio Builder
          </p>
        </div>
      </footer>

      {/* No content fallback */}
      {! hasContent && (
        <section className="py-32 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9. 172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-6">
              No portfolio content generated yet. Head back to the builder to create your amazing portfolio!
            </p>
            <button
              onClick={() => router.push("/builder")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Builder
            </button>
          </div>
        </section>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform:  translateY(-15px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .floating-badge {
          animation: float 3s ease-in-out infinite;
        }
        
        . floating-badge-delayed {
          animation:  float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        . animation-delay-500 {
          animation-delay: 500ms;
        }
        
        . animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        /* Floating particles */
        .particle {
          position:  absolute;
          width: 4px;
          height: 4px;
          background: rgba(139, 92, 246, 0.5);
          border-radius: 50%;
          animation: particle-float 15s infinite;
        }
        
        . particle-1 { left: 10%; top: 20%; animation-delay: 0s; }
        .particle-2 { left: 20%; top: 80%; animation-delay:  2s; }
        .particle-3 { left:  70%; top: 30%; animation-delay:  4s; }
        .particle-4 { left:  80%; top: 70%; animation-delay:  6s; }
        .particle-5 { left:  50%; top:  50%; animation-delay: 8s; }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { 
            transform: translateY(-100px) translateX(50px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}