"use client";
import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

const DOMAIN_OPTIONS = [
  { value: "", label: "Select your domain" },
  { value: "software_developer", label: "Software Developer / Engineer" },
  { value: "data_science", label: "Data Science / Machine Learning" },
  { value: "medical", label: "Medical / Healthcare Professional" },
  { value: "marketing", label: "Marketing / Digital Marketing" },
  { value: "finance", label: "Finance / Accounting" },
  { value:  "design", label: "UI/UX Design / Graphic Design" },
  { value: "education", label: "Education / Teaching" },
  { value: "legal", label: "Legal / Law" },
  { value: "sales", label: "Sales / Business Development" },
  { value: "hr", label: "Human Resources" },
  { value: "engineering", label: "Engineering (Non-Software)" },
  { value: "content", label: "Content Writing / Journalism" },
  { value: "consulting", label: "Consulting / Management" },
  { value: "research", label: "Research / Academia" },
  { value: "other", label: "Other" },
];

type ToastType = "error" | "success" | "warning";

interface ToastMessage {
  id:  number;
  type:  ToastType;
  message: string;
}

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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [domain, setDomain] = useState("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showToast = (type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("error", "Image size should be less than 5MB");
        return;
      }
      if (! file.type.startsWith("image/")) {
        showToast("error", "Please upload a valid image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setPersonalInfo({ profileImage: reader.result as string });
      };
      reader. readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setPersonalInfo({ profileImage: "" });
    if (fileInputRef. current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (! personalInfo.name?. trim()) {
      errors.push("Full Name is required");
    }
    if (!personalInfo.email?.trim()) {
      errors.push("Email Address is required");
    }
    if (! personalInfo.phone?. trim()) {
      errors.push("Phone Number is required");
    }

    if (!domain) {
      errors.push("Please select your professional domain");
    }
    if (! professionalInfo.skills?.trim()) {
      errors.push("Skills are required");
    }
    if (!ProjectsInfo. project1?. trim()) {
      errors.push("At least one project is required");
    }

    if (errors.length > 0) {
      errors.forEach((error) => showToast("error", error));
      return false;
    }

    return true;
  };

  const generateResume = async () => {
  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    const state = useResumeStore.getState();

    const dataToSend = {
      personalInfo:  {
        name:  state.personalInfo. name,
        email: state.personalInfo.email,
        phone: state.personalInfo.phone,
        location: state. personalInfo.location,
        github: state.personalInfo.github,
        linkedIn: state.personalInfo.linkedIn,
      },
      professional: state.professional,
      projects: state.projects,
      experience:  state.experience,
    };

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type":  "application/json" },
      body:  JSON.stringify(dataToSend),
    });

    const data = await res.json();

    if (data.success) {
      useResumeStore. getState().setAIPortfolio(data.aiPortfolio);
      showToast("success", "Portfolio generated successfully!");
      router.push("/portfolio");
    } else {
      showToast("error", data.error || "Failed to generate portfolio.  Please try again.");
    }
  } catch (error) {
    console.error("Generation error:", error);
    showToast("error", "An error occurred.  Please try again.");
  }

  setLoading(false);
};

  const isFormValid = () => {
    return (
      personalInfo. name?.trim() &&
      personalInfo. email?.trim() &&
      personalInfo. phone?.trim() &&
      domain &&
      professionalInfo. skills?.trim() &&
      ProjectsInfo.project1?.trim()
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in ${
              toast.type === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : toast.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-yellow-50 border border-yellow-200 text-yellow-800"
            }`}
          >
            {toast.type === "error" && (
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === "success" && (
              <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === "warning" && (
              <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-. 77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 hover:opacity-70">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Create Your Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Fill in your details below and let AI craft the perfect resume for you
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10">
            {/* Profile Picture Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-pink-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Picture</h2>
                <span className="text-xs sm:text-sm text-gray-500">(Optional)</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  {profileImage ?  (
                    <div className="relative">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-pink-200 shadow-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?. click()}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-200"
                    >
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-xs text-gray-500 mt-2">Add Photo</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600 mb-2">Upload a professional photo for your portfolio</p>
                  <p className="text-xs text-gray-500">Recommended:  Square image, max 5MB</p>
                  {! profileImage && (
                    <button
                      onClick={() => fileInputRef.current?. click()}
                      className="mt-3 px-4 py-2 text-sm font-medium text-pink-600 border border-pink-300 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      Choose Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Domain Selection Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-orange-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Professional Domain</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Field / Industry
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e. target.value)}
                  className={`w-full border rounded-lg p-3 sm: p-3. 5 text-sm sm:text-base focus:ring-2 focus:ring-orange-500 focus: border-transparent transition-all duration-200 outline-none hover:border-orange-400 ${
                    domain ?  "border-gray-300 text-gray-900" : "border-gray-300 text-gray-500"
                  }`}
                >
                  {DOMAIN_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1. 5 text-xs sm:text-sm text-gray-500">
                  This helps AI tailor your portfolio content to your specific industry
                </p>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-indigo-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Basic Information</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ name: e.target. value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ email: e. target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo. phone}
                    onChange={(e) => setPersonalInfo({ phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus: ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
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
                    onChange={(e) => setPersonalInfo({ location: e.target.value })}
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
                    onChange={(e) => setPersonalInfo({ github: e.target. value })}
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
                    onChange={(e) => setPersonalInfo({ linkedIn: e. target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none hover:border-indigo-400"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-purple-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-. 62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h. 01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Professional Details</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Python, AWS, Docker"
                    value={professionalInfo.skills}
                    onChange={(e) => setProfessionalInfo({ skills: e.target.value })}
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
                    onChange={(e) => setProfessionalInfo({ experienceYears: e. target.value })}
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
                    onChange={(e) => setProfessionalInfo({ summary: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none hover:border-purple-400 resize-none h-24 sm:h-28"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Optional - Leave blank for AI-generated summary
                  </p>
                </div>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-emerald-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Project Details</h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CryptoHunter - A crypto comparison app built with React and Firebase"
                    value={ProjectsInfo.project1}
                    onChange={(e) => setProjectsInfo({ project1: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none hover:border-emerald-400"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Include project name and brief description
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project 2
                  </label>
                  <input
                    type="text"
                    placeholder="E-commerce Platform - Full-stack application with Next.js (optional)"
                    value={ProjectsInfo.project2}
                    onChange={(e) => setProjectsInfo({ project2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 outline-none hover:border-emerald-400"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Optional
                  </p>
                </div>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Work Experience</h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience 1
                  </label>
                  <textarea
                    placeholder="Frontend Developer at TechCorp Inc.   (Jan 2024 - Present)&#10;• Developed responsive web applications using React and TypeScript&#10;• Collaborated with design team to implement pixel-perfect UIs&#10;• Improved application performance by 40%"
                    value={experienceInfo.exp1}
                    onChange={(e) => setExperienceInfo({ exp1: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-400 resize-none h-28 sm:h-32"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Optional - Include role, company, dates, and key achievements
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience 2
                  </label>
                  <textarea
                    placeholder="Software Engineering Intern at StartupXYZ (Jun 2023 - Dec 2023)&#10;• Built RESTful APIs using Node.js and Express&#10;• Implemented authentication and authorization systems"
                    value={experienceInfo.exp2}
                    onChange={(e) => setExperienceInfo({ exp2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 sm:p-3.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-400 resize-none h-28 sm:h-32"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Optional
                  </p>
                </div>
              </div>
            </div>

            {/* Required Fields Notice */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">Required Fields</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Fields marked with <span className="text-red-500">*</span> are required:  Full Name, Email, Phone, Domain, Skills, and at least one Project. 
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-6">
              <button
                disabled={loading || !isFormValid()}
                onClick={generateResume}
                className={`w-full font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2 ${
                  isFormValid()
                    ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating... 
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Resume with AI
                  </>
                )}
              </button>
              {! isFormValid() && (
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-3">
                  Please fill in all required fields to enable generation
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-xs sm:text-sm text-gray-600">
            Your information is secure and will only be used to generate your resume
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform:  translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default page;