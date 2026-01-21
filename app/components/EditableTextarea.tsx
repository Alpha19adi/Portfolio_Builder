"use client";

import { useState, useRef, useEffect } from "react";
import { useEditMode } from "./EditModeContext";
import { Pencil, Check, X } from "lucide-react";

interface EditableTextareaProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  inputClassName?: string;
  placeholder?:  string;
  rows?: number;
}

export function EditableTextarea({
  value,
  onSave,
  className = "",
  inputClassName = "",
  placeholder = "Click to edit...",
  rows = 4,
}: EditableTextareaProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    // Allow Shift+Enter for new lines, Ctrl/Cmd+Enter to save
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  if (! isEditMode) {
    return (
      <p className={className}>
        {value || <span className="text-gray-500 italic">{placeholder}</span>}
      </p>
    );
  }

  if (isEditing) {
    return (
      <div className="w-full">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={rows}
          className={`w-full bg-gray-800 border border-purple-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-[100px] ${inputClassName}`}
          placeholder={placeholder}
        />
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
          >
            <Check className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <span className="text-gray-500 text-xs ml-2">
            Press Ctrl+Enter to save, Esc to cancel
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <p
        className={`${className} group-hover:bg-purple-500/20 rounded px-2 -mx-2 py-1 -my-1 transition-colors`}
      >
        {value || <span className="text-gray-500 italic">{placeholder}</span>}
      </p>
      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400 text-sm">Click to edit</span>
      </div>
    </div>
  );
}