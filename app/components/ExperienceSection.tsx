"use client";

import { forwardRef } from "react";
import { EditableExperienceItem, type ExperienceItem } from "./EditableExperienceItem";
import { useEditMode } from "./EditModeContext";
import { Plus } from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  onUpdateExperience: (experience: ExperienceItem[]) => void;
}

export const ExperienceSection = forwardRef<HTMLDivElement, ExperienceSectionProps>(
  function ExperienceSection({ experience, onUpdateExperience }, ref) {
    const { isEditMode } = useEditMode();

    const handleUpdateItem = (index: number, data: ExperienceItem) => {
      const newExperience = [...experience];
      newExperience[index] = data;
      onUpdateExperience(newExperience);
    };

    const handleDeleteItem = (index: number) => {
      const newExperience = experience.filter((_, i) => i !== index);
      onUpdateExperience(newExperience);
    };

    const handleAddItem = () => {
      const newItem: ExperienceItem = {
        role: "",
        company: "",
        duration: "",
        points:  [],
      };
      onUpdateExperience([...experience, newItem]);
    };

    if (experience.length === 0 && ! isEditMode) {
      return null;
    }

    return (
      <section
        id="experience"
        ref={ref}
        className="relative py-32 px-6 bg-gray-900/30"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
              Career Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Building expertise and delivering results across my career
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-purple-500 via-cyan-500 to-purple-500 hidden md:block"></div>

            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  data-experience-item
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    i % 2 === 0 ?  "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -ml-2 md:-ml-2 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 border-4 border-gray-950 hidden md:block"></div>

                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <EditableExperienceItem
                      experience={exp}
                      onSave={(data) => handleUpdateItem(i, data)}
                      onDelete={() => handleDeleteItem(i)}
                    />
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>

            {/* Add Experience Button */}
            {isEditMode && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleAddItem}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-dashed border-gray-600 rounded-xl hover:border-purple-500 hover:bg-gray-800/80 transition-colors text-gray-400 hover:text-white"
                >
                  <Plus className="w-5 h-5" />
                  Add Experience
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);