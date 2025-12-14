"use client";
import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const personalInfo = useResumeStore((state) => state.personalInfo);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const professionalInfo = useResumeStore((state) => state.professional);
  const setProfessionalInfo = useResumeStore((state) => state.setProfessional);
  const ProjectsInfo = useResumeStore((state) => state.projects);
  const setProjectsInfo = useResumeStore((state) => state.setProjects);
  const experienceInfo = useResumeStore((state) => state.experience);
  const setExperienceInfo = useResumeStore((state) => state.setExperience);
  const jobDescription = useResumeStore((state) => state.jobDescription);
  const setJobDescription = useResumeStore((state) => state.setJobDescription);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateResume = async () => {
    const state = useResumeStore.getState();
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      alert("Please fill basic details before generating resume.");
      return;
    }
    setLoading(true);
    const skillsArray = professionalInfo.skills.split(",").map(s => s.trim());
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    const data = await res.json();

    if (data.success) {
      useResumeStore.getState().setAIResume(data.aiResume);
      router.push("/portfolio");
    } else {
      alert("Failed to generate resume. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Create Your Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Fill in your details below and let AI craft the perfect resume for
            you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-indigo-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco, CA"
                    value={personalInfo.location}
                    onChange={(e) =>
                      setPersonalInfo({ location: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={personalInfo.github}
                    onChange={(e) =>
                      setPersonalInfo({ github: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={personalInfo.linkedIn}
                    onChange={(e) =>
                      setPersonalInfo({ linkedIn: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-purple-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Professional Details
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Python, AWS, Docker"
                    value={professionalInfo.skills}
                    onChange={(e) =>
                      setProfessionalInfo({ skills: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none hover:border-purple-400"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Separate skills with commas
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    placeholder="3"
                    value={professionalInfo.experienceYears}
                    onChange={(e) =>
                      setProfessionalInfo({ experienceYears: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none hover:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    placeholder="Brief overview of your professional background (optional - AI can generate this)"
                    value={professionalInfo.summary}
                    onChange={(e) =>
                      setProfessionalInfo({ summary: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none hover:border-purple-400 resize-none h-24 sm:h-28"
                  />
                  <p className="mt-1. 5 text-xs sm:text-sm text-gray-500">
                    Optional - Leave blank for AI-generated summary
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Project Details
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project 1
                  </label>
                  <input
                    type="text"
                    placeholder="CryptoHunter - A crypto comparison app built with React and Firebase"
                    value={ProjectsInfo.project1}
                    onChange={(e) =>
                      setProjectsInfo({ project1: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none hover:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project 2
                  </label>
                  <input
                    type="text"
                    placeholder="E-commerce Platform - Full-stack application with Next.js (optional)"
                    value={ProjectsInfo.project2}
                    onChange={(e) =>
                      setProjectsInfo({ project2: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none hover:border-emerald-400"
                  />
                  <p className="mt-1. 5 text-xs sm:text-sm text-gray-500">
                    Optional
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience 1
                  </label>
                  <textarea
                    placeholder="Frontend Developer at TechCorp Inc.  (Jan 2024 - Present)&#10;• Developed responsive web applications using React and TypeScript&#10;• Collaborated with design team to implement pixel-perfect UIs&#10;• Improved application performance by 40%"
                    value={experienceInfo.exp1}
                    onChange={(e) =>
                      setExperienceInfo({ exp1: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-400 resize-none h-28 sm:h-32"
                  />
                  <p className="mt-1. 5 text-xs sm:text-sm text-gray-500">
                    Optional - Include role, company, dates, and key
                    achievements
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience 2
                  </label>
                  <textarea
                    placeholder="Software Engineering Intern at StartupXYZ (Jun 2023 - Dec 2023)&#10;• Built RESTful APIs using Node.js and Express&#10;• Implemented authentication and authorization systems"
                    value={experienceInfo.exp2}
                    onChange={(e) =>
                      setExperienceInfo({ exp2: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-400 resize-none h-28 sm:h-32"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Optional
                  </p>
                </div>
              </div>
            </div>


            <div className="pt-6">
              <button
                disabled={loading}
                onClick={generateResume}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3. 5 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {loading ? "Generating..." : "Generate Resume with AI"}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-600">
            Your information is secure and will only be used to generate your
            resume
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
