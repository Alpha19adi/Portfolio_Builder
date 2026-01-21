"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useEditMode } from "./EditModeContext";

interface EditableTextProps {
  value: string;
  onSave: (value:  string) => void;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  inputClassName?: string;
  placeholder?:  string;
  multiline?: boolean;
}

export function EditableText({
  value,
  onSave,
  as: Component = "span",
  className = "",
  inputClassName = "",
  placeholder = "Click to edit...",
  multiline = false,
}:  EditableTextProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
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
  if (e. key === "Enter" && !multiline) {
    e.preventDefault();
    handleSave();
  }
  if (e. key === "Escape") {
    handleCancel();
  }

  if (multiline && (e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    handleSave();
  }
};

  if (! isEditMode) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (isEditing) {
  // Multiline textarea (for summary, descriptions)
  if (multiline) {
    return (
      <div className="w-full max-w-2xl">
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={6}
          className={`w-full min-h-[150px] bg-gray-800 border-2 border-purple-500 rounded-xl px-4 py-3 text-white text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y ${inputClassName}`}
          placeholder={placeholder}
        />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Check className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <span className="text-gray-500 text-xs">Ctrl+Enter to save</span>
        </div>
      </div>
    );
  }

  // Single line input
  return (
    <div className="inline-flex items-center gap-2">
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`bg-gray-800 border-2 border-purple-500 rounded-lg px-3 py-2 text-white focus:outline-none focus: ring-2 focus:ring-purple-500 min-w-[200px] ${inputClassName}`}
        placeholder={placeholder}
      />
      <button
        onClick={handleSave}
        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        title="Save"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        title="Cancel"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

  return (
    <div
      className="group/editable inline-flex items-center gap-2 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <Component
        className={`${className} group-hover/editable:bg-purple-500/20 rounded px-1 -mx-1 transition-colors`}
      >
        {value || <span className="text-gray-500 italic">{placeholder}</span>}
      </Component>
      <Pencil className="w-4 h-4 text-purple-400 opacity-0 group-hover/editable:opacity-100 transition-opacity shrink-0" />
    </div>
  );
}