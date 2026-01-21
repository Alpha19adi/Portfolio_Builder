"use client";

import { forwardRef } from "react";
import { EditableList } from "./EditableList";
import { useEditMode } from "./EditModeContext";

interface SkillsSectionProps {
  skills: string[];
  onUpdateSkills:  (skills: string[]) => void;
}

export const SkillsSection = forwardRef<HTMLDivElement, SkillsSectionProps>(
  ({ skills = [], onUpdateSkills }, ref) => {
    const { isEditMode } = useEditMode();

    // Ensure skills is always an array
    const safeSkills = Array.isArray(skills) ? skills : [];

    if (safeSkills.length === 0 && !isEditMode) {
      return null;
    }

    return (
      <section id="expertise" ref={ref} className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">
              Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Skills & Competencies
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              A comprehensive set of capabilities I bring to every endeavor
            </p>
          </div>

          <EditableList
            items={safeSkills}
            onSave={onUpdateSkills}
            className="flex flex-wrap justify-center gap-4"
            itemClassName="group relative"
            addLabel="Add skill"
            renderItem={(skill) => (
              <div
                data-skill-item
                className="relative px-6 py-3 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <span className="relative z-10 text-gray-300 font-medium group-hover:text-white transition-colors">
                  {skill}
                </span>
              </div>
            )}
          />
        </div>
      </section>
    );
  }
);

SkillsSection.displayName = "SkillsSection";