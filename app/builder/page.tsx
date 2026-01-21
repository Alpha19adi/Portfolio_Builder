"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Upload, 
  User, 
  Briefcase, 
  Code, 
  FolderOpen, 
  Sparkles,
  X,
  Camera,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  ChevronDown,
  Zap,
  AlertCircle,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const DOMAIN_OPTIONS = [
  { value: "", label: "Select your domain", icon: "🎯" },
  { value:  "software_developer", label: "Software Developer / Engineer", icon: "💻" },
  { value: "data_science", label: "Data Science / Machine Learning", icon: "🤖" },
  { value:  "medical", label: "Medical / Healthcare Professional", icon: "🏥" },
  { value: "marketing", label: "Marketing / Digital Marketing", icon: "📈" },
  { value: "finance", label: "Finance / Accounting", icon: "💰" },
  { value: "design", label: "UI/UX Design / Graphic Design", icon: "🎨" },
  { value: "education", label: "Education / Teaching", icon: "📚" },
  { value: "legal", label: "Legal / Law", icon: "⚖️" },
  { value: "sales", label: "Sales / Business Development", icon: "🤝" },
  { value: "hr", label: "Human Resources", icon: "👥" },
  { value:  "engineering", label: "Engineering (Non-Software)", icon: "🔧" },
  { value: "content", label: "Content Writing / Journalism", icon: "✍️" },
  { value: "consulting", label: "Consulting / Management", icon: "📊" },
  { value:  "research", label: "Research / Academia", icon: "🔬" },
  { value: "other", label: "Other", icon:  "🌟" },
];

type ToastType = "error" | "success" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

const BuilderPage = () => {
  const personalInfo = useResumeStore((state) => state.personalInfo);
  const setPersonalInfo = useResumeStore((state) => state.setPersonalInfo);
  const professionalInfo = useResumeStore((state) => state.professional);
  const setProfessionalInfo = useResumeStore((state) => state.setProfessional);
  const ProjectsInfo = useResumeStore((state) => state.projects);
  const setProjectsInfo = useResumeStore((state) => state.setProjects);
  const experienceInfo = useResumeStore((state) => state.experience);
  const setExperienceInfo = useResumeStore((state) => state.setExperience);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(personalInfo.profileImage || null);
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

  const handleImageUpload = (e: React. ChangeEvent<HTMLInputElement>) => {
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
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setPersonalInfo({ profileImage: "" });
    if (fileInputRef.current) {
      fileInputRef.current. value = "";
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!personalInfo.name?. trim()) errors.push("Full Name is required");
    if (!personalInfo.email?.trim()) errors.push("Email Address is required");
    if (!personalInfo.phone?.trim()) errors.push("Phone Number is required");
    if (!professionalInfo.domain?.trim()) errors.push("Please select your professional domain");
    if (!professionalInfo.skills?.trim()) errors.push("Skills are required");
    if (!ProjectsInfo.project1?.trim()) errors.push("At least one project is required");

    if (errors.length > 0) {
      errors.forEach((error) => showToast("error", error));
      return false;
    }
    return true;
  };

  const generateResume = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const state = useResumeStore.getState();
      const dataToSend = {
        personalInfo: {
          name: state.personalInfo.name,
          email: state.personalInfo.email,
          phone: state.personalInfo.phone,
          location: state.personalInfo.location,
          github: state.personalInfo.github,
          linkedIn: state.personalInfo.linkedIn,
        },
        professional: state.professional,
        projects: state.projects,
        experience: state.experience,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (data.success) {
        useResumeStore.getState().setAIPortfolio(data.aiPortfolio);
        showToast("success", "Portfolio generated successfully!");
        router.push("/portfolio");
      } else {
        showToast("error", data. error || "Failed to generate portfolio.  Please try again.");
      }
    } catch (error) {
      console.error("Generation error:", error);
      showToast("error", "An error occurred.  Please try again.");
    }
    setLoading(false);
  };

  const isFormValid = () => {
    return (
      personalInfo.name?. trim() &&
      personalInfo. email?.trim() &&
      personalInfo.phone?.trim() &&
      professionalInfo.domain?.trim() &&
      professionalInfo. skills?.trim() &&
      ProjectsInfo.project1?.trim()
    );
  };

  const completedFields = [
    personalInfo.name?. trim(),
    personalInfo.email?.trim(),
    personalInfo.phone?.trim(),
    professionalInfo.domain?.trim(),
    professionalInfo.skills?.trim(),
    ProjectsInfo.project1?.trim(),
  ].filter(Boolean).length;

  const totalRequiredFields = 6;
  const progressPercentage = (completedFields / totalRequiredFields) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-linear-to-r from-purple-600/5 to-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border transform transition-all duration-300 animate-slide-in ${
              toast.type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : toast.type === "success"
                ?  "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
            }`}
          >
            {toast.type === "error" && <AlertCircle className="w-5 h-5 shrink-0" />}
            {toast.type === "success" && <CheckCircle className="w-5 h-5 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast. id)} className="shrink-0 hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                <span>{completedFields}/{totalRequiredFields} completed</span>
              </div>
              <div className="w-24 sm:w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-purple-500 to-cyan-500 transition-all duration-500"
                  style={{ width:  `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-400 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI-Powered Builder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Build Your </span>
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Fill in your details and let AI craft the perfect portfolio for you
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Profile Picture</h2>
                <p className="text-sm text-gray-500">Optional - Add a professional photo</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                {profileImage ? (
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-gray-700 group-hover:border-purple-500/50 transition-colors"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?. click()}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                  >
                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs text-gray-500">Upload Photo</span>
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
                <p className="text-sm text-gray-400 mb-2">Upload a professional photo</p>
                <p className="text-xs text-gray-500 mb-3">Square image recommended, max 5MB</p>
                {! profileImage && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-sm font-medium text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors"
                  >
                    Choose Image
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Professional Domain</h2>
                <p className="text-sm text-gray-500">Select your field of expertise</p>
              </div>
              <span className="ml-auto px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Required</span>
            </div>

            <div className="relative">
              <select
                value={professionalInfo. domain}
                onChange={(e) => setProfessionalInfo({ domain: e.target.value })}
                className="w-full appearance-none bg-gray-800/50 border border-gray-700 rounded-xl p-3.5 sm:p-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600 cursor-pointer"
              >
                {DOMAIN_OPTIONS.map((option) => (
                  <option key={option. value} value={option.value} className="bg-gray-900">
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
            <p className="mt-2 text-xs text-gray-500">This helps AI tailor your portfolio to your industry</p>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Basic Information</h2>
                <p className="text-sm text-gray-500">Your personal details</p>
              </div>
              <span className="ml-auto px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ name: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ email: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ phone:  e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="San Francisco, CA"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ location: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <div className="relative">
                  <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={personalInfo. github}
                    onChange={(e) => setPersonalInfo({ github: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={personalInfo.linkedIn}
                    onChange={(e) => setPersonalInfo({ linkedIn: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Professional Details</h2>
                <p className="text-sm text-gray-500">Your skills and experience</p>
              </div>
              <span className="ml-auto px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Required</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python, AWS, Docker"
                  value={professionalInfo.skills}
                  onChange={(e) => setProfessionalInfo({ skills: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                />
                <p className="mt-2 text-xs text-gray-500">Separate skills with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                <input
                  type="text"
                  placeholder="3"
                  value={professionalInfo.experienceYears}
                  onChange={(e) => setProfessionalInfo({ experienceYears: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                <textarea
                  placeholder="Brief overview of your professional background (optional - AI can generate this)"
                  value={professionalInfo.summary}
                  onChange={(e) => setProfessionalInfo({ summary: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600 resize-none h-28"
                />
                <p className="mt-2 text-xs text-gray-500">Leave blank for AI-generated summary</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Projects</h2>
                <p className="text-sm text-gray-500">Showcase your best work</p>
              </div>
              <span className="ml-auto px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Required</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project 1 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="CryptoHunter - A crypto comparison app built with React and Firebase"
                  value={ProjectsInfo.project1}
                  onChange={(e) => setProjectsInfo({ project1: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                />
                <p className="mt-2 text-xs text-gray-500">Include project name and brief description</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project 2</label>
                <input
                  type="text"
                  placeholder="E-commerce Platform - Full-stack application with Next.js (optional)"
                  value={ProjectsInfo.project2}
                  onChange={(e) => setProjectsInfo({ project2: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600"
                />
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-8 hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Work Experience</h2>
                <p className="text-sm text-gray-500">Optional - Your professional history</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience 1</label>
                <textarea
                  placeholder="Frontend Developer at TechCorp Inc.  (Jan 2024 - Present)&#10;• Developed responsive web applications&#10;• Improved performance by 40%"
                  value={experienceInfo.exp1}
                  onChange={(e) => setExperienceInfo({ exp1: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600 resize-none h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience 2</label>
                <textarea
                  placeholder="Software Engineering Intern at StartupXYZ (Jun 2023 - Dec 2023)&#10;• Built RESTful APIs&#10;• Implemented authentication systems"
                  value={experienceInfo.exp2}
                  onChange={(e) => setExperienceInfo({ exp2: e. target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-600 resize-none h-32"
                />
              </div>
            </div>
          </section>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-300">Required Fields</p>
                <p className="text-xs text-gray-500 mt-1">
                  Fields marked with <span className="text-red-400">*</span> are required:  Full Name, Email, Phone, Domain, Skills, and at least one Project. 
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading || !isFormValid()}
              onClick={generateResume}
              className={`w-full font-semibold px-6 py-4 sm:py-5 rounded-2xl shadow-2xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-3 ${
                isFormValid()
                  ? "bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 hover:opacity-90 text-white hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating Your Portfolio...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Generate Portfolio with AI</span>
                </>
              )}
            </button>
            {! isFormValid() && (
              <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                Complete all required fields to enable generation
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-xs sm:text-sm text-gray-500">
            Your information is secure and only used to generate your portfolio
          </p>
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        . animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BuilderPage;