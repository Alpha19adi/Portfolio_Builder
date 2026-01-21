"use client";

import { useState } from "react";
import { useEditMode } from "./EditModeContext";
import { EditableText } from "./EditableText";
import { Pencil, Plus, X, Check } from "lucide-react";

// Define and export the interface
export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  points: string[];
}

interface EditableExperienceItemProps {
  experience: ExperienceItem;
  onSave: (experience: ExperienceItem) => void;
  onDelete: () => void;
}

export function EditableExperienceItem(props: EditableExperienceItemProps) {
  const { experience, onSave, onDelete } = props;
  const { isEditMode } = useEditMode();
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [newPoint, setNewPoint] = useState("");
  const [editingPointIndex, setEditingPointIndex] = useState<number | null>(null);
  const [pointDraft, setPointDraft] = useState("");

  // All update handlers create a complete ExperienceItem
  const handleUpdateRole = (value: string) => {
    const updated: ExperienceItem = {
      company: experience.company,
      role: value,
      duration: experience.duration,
      points: experience.points,
    };
    onSave(updated);
  };

  const handleUpdateCompany = (value: string) => {
    const updated: ExperienceItem = {
      company: value,
      role: experience.role,
      duration: experience.duration,
      points: experience.points,
    };
    onSave(updated);
  };

  const handleUpdateDuration = (value: string) => {
    const updated: ExperienceItem = {
      company: experience.company,
      role: experience.role,
      duration: value,
      points: experience.points,
    };
    onSave(updated);
  };

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      const updated: ExperienceItem = {
        company:  experience.company,
        role: experience.role,
        duration: experience.duration,
        points: [...experience.points, newPoint.trim()],
      };
      onSave(updated);
      setNewPoint("");
      setIsAddingPoint(false);
    }
  };

  const handleEditPoint = (index: number) => {
    setEditingPointIndex(index);
    setPointDraft(experience. points[index] || "");
  };

  const handleSavePoint = (index: number) => {
    if (pointDraft.trim()) {
      const newPoints = [...experience.points];
      newPoints[index] = pointDraft.trim();
      const updated: ExperienceItem = {
        company: experience.company,
        role: experience.role,
        duration: experience.duration,
        points: newPoints,
      };
      onSave(updated);
    }
    setEditingPointIndex(null);
    setPointDraft("");
  };

  const handleDeletePoint = (index: number) => {
    const updated: ExperienceItem = {
      company: experience.company,
      role: experience.role,
      duration: experience.duration,
      points: experience.points.filter((_, i) => i !== index),
    };
    onSave(updated);
  };

  return (
    <div className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover: shadow-xl hover:shadow-purple-500/5 relative">
      {/* Delete Experience Button */}
      {isEditMode && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 p-2 bg-red-600/20 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete experience"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header:  Role, Company, Duration */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <EditableText
            value={experience.role}
            onSave={handleUpdateRole}
            as="h3"
            className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors"
            placeholder="Role title"
          />
          <EditableText
            value={experience. company}
            onSave={handleUpdateCompany}
            as="p"
            className="text-purple-400 font-medium"
            placeholder="Company name"
          />
        </div>
        <EditableText
          value={experience.duration}
          onSave={handleUpdateDuration}
          className="inline-flex items-center gap-2 px-4 py-1. 5 bg-gray-800 rounded-full text-sm text-gray-400 whitespace-nowrap"
          placeholder="Duration (e.g., 2020 - Present)"
        />
      </div>

      {/* Experience Points/Achievements */}
      {(experience.points. length > 0 || isEditMode) && (
        <ul className="space-y-3 mt-6">
          {experience.points.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-gray-400 group/point"
            >
              {/* Bullet Point */}
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400 shrink-0"></span>

              {/* Editing Mode for Point */}
              {editingPointIndex === idx ?  (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    value={pointDraft}
                    onChange={(e) => setPointDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSavePoint(idx);
                      if (e.key === "Escape") setEditingPointIndex(null);
                    }}
                    className="flex-1 bg-gray-800 border border-purple-500 rounded px-3 py-2 text-white focus:outline-none focus: ring-2 focus:ring-purple-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSavePoint(idx)}
                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingPointIndex(null)}
                    className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Display Point Text */}
                  <span className="leading-relaxed flex-1">{pt}</span>

                  {/* Edit/Delete Buttons for Point */}
                  {isEditMode && (
                    <div className="flex gap-1 opacity-0 group-hover/point:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditPoint(idx)}
                        className="p-1.5 bg-purple-600/50 hover:bg-purple-600 rounded transition-colors"
                        title="Edit point"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeletePoint(idx)}
                        className="p-1.5 bg-red-600/50 hover:bg-red-600 rounded transition-colors"
                        title="Delete point"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add New Point Button */}
      {isEditMode && (
        <div className="mt-4">
          {isAddingPoint ? (
            <div className="flex items-center gap-2">
              <span className="mt-0 w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400 shrink-0"></span>
              <input
                value={newPoint}
                onChange={(e) => setNewPoint(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddPoint();
                  if (e.key === "Escape") {
                    setIsAddingPoint(false);
                    setNewPoint("");
                  }
                }}
                placeholder="New achievement or responsibility..."
                className="flex-1 bg-gray-800 border border-purple-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <button
                onClick={handleAddPoint}
                className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                title="Add point"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsAddingPoint(false);
                  setNewPoint("");
                }}
                className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingPoint(true)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm mt-2"
            >
              <Plus className="w-4 h-4" />
              Add achievement/responsibility
            </button>
          )}
        </div>
      )}
    </div>
  );
}