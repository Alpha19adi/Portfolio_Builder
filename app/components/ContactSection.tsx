"use client";

import { forwardRef } from "react";
import { useEditMode } from "./EditModeContext";
import { EditableText } from "./EditableText";

interface ContactSectionProps {
  personal: {
    email?:  string;
    linkedIn?: string;
    github?:  string;
    phone?: string;
    location?: string;
  };
  onUpdatePersonal: (field: string, value: string) => void;
}

export const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ personal, onUpdatePersonal }, ref) => {
    const { isEditMode } = useEditMode();

    return (
      <section
        id="contact"
        ref={ref}
        className="relative py-32 px-6 bg-linear-to-b from-gray-900/50 to-gray-950"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            data-contact-item
            className="text-green-400 text-sm font-semibold tracking-wider uppercase"
          >
            Get In Touch
          </span>
          <h2
            data-contact-item
            className="text-4xl sm:text-5xl font-bold mt-2 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Let&apos;s Connect
          </h2>
          <p
            data-contact-item
            className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto"
          >
            I&apos;m always excited to discuss new opportunities, creative ideas,
            or potential collaborations. Let&apos;s connect! 
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {(personal.email || isEditMode) && (
              <div
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover: shadow-lg hover:shadow-purple-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-purple-400"
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
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                  Email
                </h3>
                <div className="text-gray-500 text-sm mt-1 break-all">
                  <EditableText
                    value={personal.email || ""}
                    onSave={(value) => onUpdatePersonal("email", value)}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            )}

            {(personal.linkedIn || isEditMode) && (
              <div
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 . 77 23.21 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.43c-1.12 0-2.03-.92-2.03-2.05 0-1.13.91-2.05 2.03-2.05 1.13 0 2.05.92 2.05 2.05 0 1.13-.92 2.05-2.05 2.05zM20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                  LinkedIn
                </h3>
                <div className="text-gray-500 text-sm mt-1">
                  <EditableText
                    value={personal.linkedIn || ""}
                    onSave={(value) => onUpdatePersonal("linkedIn", value)}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            )}

            {(personal.github || isEditMode) && (
              <div
                data-contact-item
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-pink-600/20 to-pink-600/5 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                  GitHub
                </h3>
                <div className="text-gray-500 text-sm mt-1">
                  <EditableText
                    value={personal.github || ""}
                    onSave={(value) => onUpdatePersonal("github", value)}
                    placeholder="github.com/yourusername"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-10 text-gray-500">
            {(personal.phone || isEditMode) && (
              <div data-contact-item className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <EditableText
                  value={personal.phone || ""}
                  onSave={(value) => onUpdatePersonal("phone", value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            )}
            {(personal.location || isEditMode) && (
              <div data-contact-item className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                  value={personal.location || ""}
                  onSave={(value) => onUpdatePersonal("location", value)}
                  placeholder="City, Country"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";