"use client";

import { useState } from "react";
import { useEditMode } from "./EditModeContext";
import { Plus, X, Pencil, Check } from "lucide-react";

interface EditableListProps {
  items: string[];
  onSave: (items: string[]) => void;
  renderItem?:  (item: string, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  addLabel?: string;
}

export function EditableList({
  items,
  onSave,
  renderItem,
  className = "",
  itemClassName = "",
  addLabel = "Add item",
}: EditableListProps) {
  const { isEditMode } = useEditMode();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setDraft(items[index]);
  };

  const handleSaveEdit = (index: number) => {
    if (draft.trim()) {
      const newItems = [...items];
      newItems[index] = draft. trim();
      onSave(newItems);
    }
    setEditingIndex(null);
    setDraft("");
  };

  const handleDelete = (index: number) => {
    const newItems = items. filter((_, i) => i !== index);
    onSave(newItems);
  };

  const handleAdd = () => {
    if (newItem.trim()) {
      onSave([...items, newItem.trim()]);
      setNewItem("");
      setIsAdding(false);
    }
  };

  const defaultRenderItem = (item: string) => (
    <span className="text-gray-300 font-medium">{item}</span>
  );

  if (!isEditMode) {
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div key={index} className={itemClassName}>
            {renderItem ?  renderItem(item, index) : defaultRenderItem(item)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${itemClassName} group/item relative inline-flex items-center`}
        >
          {editingIndex === index ? (
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(index);
                  if (e.key === "Escape") setEditingIndex(null);
                }}
                className="bg-gray-800 border border-purple-500 rounded px-2 py-1 text-white text-sm focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => handleSaveEdit(index)}
                className="p-1 bg-green-600 rounded"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
              {renderItem ? renderItem(item, index) : defaultRenderItem(item)}
              <div className="absolute -top-1 -right-1 hidden group-hover/item:flex gap-1">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-1 bg-purple-600 rounded-full"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 bg-red-600 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {isAdding ?  (
        <div className="inline-flex items-center gap-2 mt-2">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setIsAdding(false);
            }}
            placeholder="New item..."
            className="bg-gray-800 border border-purple-500 rounded px-3 py-2 text-white text-sm focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-gray-800 border border-dashed border-gray-600 rounded-xl hover:border-purple-500 hover:bg-gray-800/80 transition-colors text-gray-400 hover:text-white"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}