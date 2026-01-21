"use client";

import { forwardRef } from "react";
import { EditableProjectItem, type ProjectItem } from "./EditableProjectItem";
import { useEditMode } from "./EditModeContext";
import { Plus } from "lucide-react";

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onUpdateProjects: (projects: ProjectItem[]) => void;
}

export const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(
  function ProjectsSection({ projects, onUpdateProjects }, ref) {
    const { isEditMode } = useEditMode();

    const handleUpdateItem = (index: number, data: ProjectItem) => {
      const newProjects = [...projects];
      newProjects[index] = data;
      onUpdateProjects(newProjects);
    };

    const handleDeleteItem = (index: number) => {
      const newProjects = projects. filter((_, i) => i !== index);
      onUpdateProjects(newProjects);
    };

    const handleAddItem = () => {
      const newItem:  ProjectItem = {
        name:  "",
        tech: [],
        description: "",
      };
      onUpdateProjects([...projects, newItem]);
    };

    if (projects.length === 0 && ! isEditMode) {
      return null;
    }

    return (
      <section id="work" ref={ref} className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              A selection of achievements that showcase my expertise and dedication
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects. map((project, i) => (
              <div key={i} data-project-item>
                <EditableProjectItem
                  project={project}
                  index={i}
                  onSave={(data) => handleUpdateItem(i, data)}
                  onDelete={() => handleDeleteItem(i)}
                />
              </div>
            ))}
          </div>
          {isEditMode && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleAddItem}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-dashed border-gray-600 rounded-xl hover:border-purple-500 hover:bg-gray-800/80 transition-colors text-gray-400 hover:text-white"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
);