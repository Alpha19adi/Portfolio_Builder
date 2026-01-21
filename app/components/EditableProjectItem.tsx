"use client";

import { useState } from "react";
import { useEditMode } from "./EditModeContext";
import { EditableText } from "./EditableText";
import { Plus, X, Check } from "lucide-react";

// Define and export the interface
export interface ProjectItem {
  name: string;
  tech: string[];
  description: string;
}

interface EditableProjectItemProps {
  project: ProjectItem;
  index: number;
  onSave: (project: ProjectItem) => void;
  onDelete: () => void;
}

export function EditableProjectItem(props: EditableProjectItemProps) {
  const { project, index, onSave, onDelete } = props;
  const { isEditMode } = useEditMode();
  const [isAddingTech, setIsAddingTech] = useState(false);
  const [newTech, setNewTech] = useState("");

  // All update handlers create a complete ProjectItem
  const handleUpdateName = (value: string) => {
    const updated: ProjectItem = {
      name: value,
      tech: project.tech,
      description: project.description,
    };
    onSave(updated);
  };

  const handleUpdateDescription = (value: string) => {
    const updated: ProjectItem = {
      name: project.name,
      tech: project.tech,
      description: value,
    };
    onSave(updated);
  };

  const handleAddTech = () => {
    if (newTech. trim()) {
      const updated:  ProjectItem = {
        name:  project.name,
        tech: [...project.tech, newTech.trim()],
        description: project.description,
      };
      onSave(updated);
      setNewTech("");
      setIsAddingTech(false);
    }
  };

  const handleDeleteTech = (techIndex: number) => {
    const updated: ProjectItem = {
      name: project.name,
      tech: project.tech.filter((_, i) => i !== techIndex),
      description: project.description,
    };
    onSave(updated);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {isEditMode && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-14 z-10 p-2 bg-red-600/20 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete project"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-500 font-bold group-hover:border-purple-500/50 group-hover:text-purple-400 transition-all">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative p-8">
        <EditableText
          value={project. name}
          onSave={handleUpdateName}
          as="h3"
          className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
          placeholder="Project name"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech, techIdx) => (
            <span
              key={techIdx}
              className="px-3 py-1 bg-gray-800 text-purple-300 rounded-lg text-xs font-medium border border-gray-700 group-hover:border-purple-500/30 transition-colors relative group/tech"
            >
              {tech}
              {isEditMode && (
                <button
                  onClick={() => handleDeleteTech(techIdx)}
                  className="absolute -top-1 -right-1 p-0.5 bg-red-600 rounded-full opacity-0 group-hover/tech:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}

          {isEditMode &&
            (isAddingTech ? (
              <div className="flex items-center gap-1">
                <input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTech();
                    if (e.key === "Escape") {
                      setIsAddingTech(false);
                      setNewTech("");
                    }
                  }}
                  placeholder="Tech..."
                  className="w-24 bg-gray-800 border border-purple-500 rounded px-2 py-1 text-xs text-white focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleAddTech}
                  className="p-1 bg-green-600 hover:bg-green-700 rounded transition-colors"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setIsAddingTech(false);
                    setNewTech("");
                  }}
                  className="p-1 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingTech(true)}
                className="px-3 py-1 bg-gray-800 border border-dashed border-gray-600 rounded-lg text-xs text-gray-400 hover:border-purple-500 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3 inline mr-1" />
                Add tech
              </button>
            ))}
        </div>

        <div className="mt-6">
          <EditableText
            value={project.description}
            onSave={handleUpdateDescription}
            as="p"
            className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors"
            placeholder="Project description..."
            multiline
          />
        </div>

        <div className="mt-8 flex items-center gap-2 text-purple-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>View Details</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}