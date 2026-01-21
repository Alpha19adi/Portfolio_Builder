"use client";

import { forwardRef, RefObject } from "react";
import { EditableText } from "./EditableText";
import { useEditMode } from "./EditModeContext";
import { getDomainIcon, getDomainLabel } from "@/lib/util/domain-utils";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
  github?:  string;
  location?: string;
  profileImage?: string;
}

interface ProfessionalInfo {
  skills: string;
  experienceYears: string;
  summary: string;
  domain: string;
}

interface HeroSectionProps {
  personal:  PersonalInfo;
  professional:  ProfessionalInfo;
  summary?:  string;
  onUpdatePersonal:  (field: string, value: string) => void;
  onUpdateSummary: (value: string) => void;
  heroContentRef:  RefObject<HTMLDivElement | null>;
  heroImageRef: RefObject<HTMLDivElement | null>;
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      personal,
      professional,
      summary,
      onUpdatePersonal,
      onUpdateSummary,
      heroContentRef,
      heroImageRef,
    },
    ref
  ) => {
    const { isEditMode } = useEditMode();

    return (
      <section
        id="about"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              ref={heroContentRef}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Available for opportunities
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-100">Hi, I&apos;m </span>
                <EditableText
                  value={personal.name || ""}
                  onSave={(value) => onUpdatePersonal("name", value)}
                  as="span"
                  className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  placeholder="Your Name"
                />
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 mt-4 font-light flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                <span className="text-2xl">
                  {getDomainIcon(professional.domain)}
                </span>
                <span>{getDomainLabel(professional.domain)}</span>
                {professional.experienceYears && (
                  <span className="px-3 py-1 bg-gray-800/50 rounded-full text-base">
                    {professional.experienceYears}+ Years
                  </span>
                )}
              </p>

              <div className="mt-6">
                <EditableText
                  value={summary || ""}
                  onSave={onUpdateSummary}
                  as="p"
                  className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
                  placeholder="Write a compelling summary about yourself..."
                  multiline
                />
              </div>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {personal.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      Email
                    </span>
                  </a>
                )}
                {personal.linkedIn && (
                  <a
                    href={
                      personal.linkedIn.startsWith("http")
                        ? personal.linkedIn
                        : `https://${personal.linkedIn}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.43c-1.12 0-2.03-.92-2.03-2.05 0-1.13.91-2.05 2.03-2.05 1.13 0 2.05.92 2.05 2.05 0 1.13-.92 2.05-2.05 2.05zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                  </a>
                )}
                {personal. github && (
                  <a
                    href={
                      personal.github.startsWith("http")
                        ? personal.github
                        : `https://${personal.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 . 319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      GitHub
                    </span>
                  </a>
                )}
              </div>

              {personal.location && (
                <div className="flex items-center gap-2 mt-6 justify-center lg:justify-start text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <EditableText
                    value={personal.location}
                    onSave={(value) => onUpdatePersonal("location", value)}
                    placeholder="Your location"
                  />
                </div>
              )}
            </div>

            <div ref={heroImageRef} className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-4 rounded-full border border-purple-500/20 animate-pulse"></div>
                <div className="absolute inset-0 -m-8 rounded-full border border-cyan-500/10"></div>
                <div className="absolute inset-0 -m-12 rounded-full border border-purple-500/5"></div>
                <div className="absolute inset-0 bg-linear-to-br from-purple-600/30 to-cyan-600/30 rounded-full blur-2xl"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-purple-500/20">
                  {personal.profileImage ?  (
                    <img
                      src={personal.profileImage}
                      alt={personal.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-7xl sm:text-8xl font-bold text-white/90">
                        {personal. name?. charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute -right-4 top-1/4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg floating-badge">
                  <span className="text-2xl">{getDomainIcon(professional. domain)}</span>
                </div>
                <div className="absolute -left-4 bottom-1/4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg floating-badge-delayed">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";