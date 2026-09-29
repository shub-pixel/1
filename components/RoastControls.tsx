"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center space-x-2 border border-frame px-2 py-1 bg-canvas">
        <span className="text-[10px] font-bold text-frame/70 uppercase tracking-wider">
          Roast Level:
        </span>
        <div className="flex items-center space-x-2">
          {ROAST_LEVELS.map((lvl) => {
            const isSelected = roastLevel === lvl.id;
            return (
              <label
                key={lvl.id}
                title={lvl.description}
                className={`flex items-center space-x-1 cursor-pointer select-none text-[11px] px-1.5 py-0.5 transition-none ${
                  isSelected
                    ? "bg-frame text-white font-bold"
                    : "text-frame hover:bg-subtle"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={lvl.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(lvl.id as RoastLevel)}
                  className="sr-only"
                />
                <span
                  className={`inline-block w-2 h-2 rounded-full border border-frame ${
                    isSelected ? "bg-accent border-white" : "bg-panel"
                  }`}
                />
                <span>{lvl.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center space-x-1.5 border border-frame px-2 py-1 bg-canvas">
        <span className="text-[10px] font-bold text-frame/70 uppercase tracking-wider">
          Language:
        </span>
        <div className="relative inline-flex items-center">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-transparent text-xs font-mono font-bold text-frame pr-4 pl-0 py-0 cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} className="bg-panel text-frame">
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-0 text-[10px] text-frame/70">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`border px-2.5 py-1 text-xs font-mono font-bold transition-none ${
          errorDrawerOpen
            ? "border-frame bg-frame text-white"
            : "border-dashed border-frame bg-canvas text-frame hover:bg-subtle"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`border-2 border-frame px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-none flex items-center space-x-2 shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
          isRoasting
            ? "bg-frame/80 text-white animate-pulse cursor-not-allowed"
            : "bg-frame text-white hover:bg-accent cursor-pointer"
        }`}
      >
        <span>{isRoasting ? "ANALYZING..." : "ROAST MY CODE"}</span>
        {!isRoasting && (
          <span className="text-[10px] bg-white text-frame px-1 py-0.2 font-mono font-bold select-none">
            Ctrl ⏎
          </span>
        )}
      </button>
    </div>
  );
}
