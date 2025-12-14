"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortfolioPage() {
  const router = useRouter();

  const personal = useResumeStore((s) => s.personalInfo);
  const ai = useResumeStore((s) => s.aiResume);

  // Redirect if no AI resume data exists
  useEffect(() => {
    if (!ai) {
      router.push("/builder");
    }
  }, [ai, router]);

  if (!ai) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio... </p>
        </div>
      </div>
    );
  }

  const { summary, skills = [], projects = [], experience = [], education = [] } = ai;

  // Check if we have any meaningful content
  const hasContent = summary || skills.length > 0 || projects.length > 0 || experience.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold">
            {personal.name || "Your Name"}
          </h1>
          <p className="text-xl mt-4 opacity-90">
            Software Developer • Problem Solver • Tech Enthusiast
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="hover:underline">
                📧 {personal.email}
              </a>
            )}
            {personal.phone && <span>📱 {personal.phone}</span>}
            {personal. location && <span>📍 {personal.location}</span>}
            {personal.github && (
              <a
                href={personal.github. startsWith("http") ? personal.github : `https://${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-indigo-200"
              >
                💻 GitHub
              </a>
            )}
            {personal.linkedIn && (
              <a
                href={personal.linkedIn.startsWith("http") ? personal.linkedIn : `https://${personal.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-indigo-200"
              >
                🔗 LinkedIn
              </a>
            )}
          </div>

          {summary && (
            <p className="max-w-2xl mx-auto mt-8 text-lg opacity-90 leading-relaxed">
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      {skills.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>

            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white shadow rounded-full text-sm font-medium border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== EXPERIENCE SECTION ===== */}
      {experience.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>

            <div className="space-y-10">
              {experience. map((exp, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg shadow border bg-gray-50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.role || "Role"}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    {exp.duration && (
                      <p className="text-gray-500 text-sm md:text-base whitespace-nowrap">
                        {exp. duration}
                      </p>
                    )}
                  </div>

                  {exp.points && exp.points. length > 0 && (
                    <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
                      {exp.points.map((pt, idx) => (
                        <li key={idx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PROJECTS SECTION ===== */}
      {projects.length > 0 && (
        <section className="py-20 px-6 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-lg shadow border hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {p.name || `Project ${i + 1}`}
                  </h3>
                  
                  {p.tech && p.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {p.description && (
                    <p className="text-gray-700 mt-4 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== EDUCATION SECTION ===== */}
      {education.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
            
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 rounded-lg border text-center md:text-left"
                >
                  <p className="text-lg font-medium text-gray-800">{edu}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="text-gray-600 mt-3 text-lg">
            I'm always open to discussing new opportunities, projects, or collaborations.
          </p>

          <div className="mt-8 space-y-2 text-lg">
            {personal.email && (
              <p>
                <span className="text-gray-600">Email:</span>{" "}
                <a
                  href={`mailto:${personal.email}`}
                  className="font-semibold text-indigo-600 hover: underline"
                >
                  {personal.email}
                </a>
              </p>
            )}
            {personal.linkedIn && (
              <p>
                <span className="text-gray-600">LinkedIn:</span>{" "}
                <a
                  href={personal.linkedIn. startsWith("http") ? personal.linkedIn : `https://${personal.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  {personal.linkedIn}
                </a>
              </p>
            )}
            {personal.github && (
              <p>
                <span className="text-gray-600">GitHub:</span>{" "}
                <a
                  href={personal.github.startsWith("http") ? personal.github : `https://${personal.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-600 hover: underline"
                >
                  {personal.github}
                </a>
              </p>
            )}
          </div>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => router.push("/builder")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 hover:shadow-lg transition-all"
            >
              ✏️ Edit Information
            </button>
            
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg shadow hover:bg-indigo-50 transition-all"
            >
              🖨️ Print Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* No content fallback */}
      {!hasContent && (
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg mb-6">
              No portfolio content generated yet. Please go back to the builder and generate your resume. 
            </p>
            <button
              onClick={() => router.push("/builder")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              Go to Builder
            </button>
          </div>
        </section>
      )}
    </div>
  );
}