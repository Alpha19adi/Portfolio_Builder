"use client";

import { forwardRef } from "react";
import { useEditMode } from "./EditModeContext";
import { Pencil, Eye } from "lucide-react";
import { PublishButton } from "./PublishButton";
import { useResumeStore } from "@/lib/stores/useResumeStore";

interface PortfolioNavProps {
  name?:  string;
}

export const PortfolioNav = forwardRef<HTMLElement, PortfolioNavProps>(
  ({ name }, ref) => {
    const { isEditMode, toggleEditMode } = useEditMode();
    
    // Get data from store for publishing
    const personal = useResumeStore((s) => s.personalInfo);
    const professional = useResumeStore((s) => s.professional);
    const ai = useResumeStore((s) => s.aiPortfolio);

    return (
      <nav
        ref={ref}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
              {name?. charAt(0) || "P"}
            </div>
            <span className="font-semibold text-gray-200">
              {name?.split(" ")[0] || "Portfolio"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              About
            </a>
            <a
              href="#expertise"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Expertise
            </a>
            <a
              href="#experience"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Experience
            </a>
            <a
              href="#work"
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Work
            </a>

            {/* Edit Mode Toggle Button */}
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                isEditMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-linear-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-white"
              }`}
            >
              {isEditMode ?  (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </>
              )}
            </button>

            {/* Publish Button */}
            {ai && (
              <PublishButton
                personalInfo={personal}
                professional={professional}
                aiPortfolio={ai}
              />
            )}
          </div>
        </div>

        {/* Edit Mode Indicator Bar */}
        {isEditMode && (
          <div className="bg-linear-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 px-6 py-2 text-center text-sm text-purple-300 border-t border-purple-500/20">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Edit Mode Active - Click on any text to edit
            </span>
          </div>
        )}
      </nav>
    );
  }
);

PortfolioNav.displayName = "PortfolioNav";