import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-canvas text-frame select-none flex flex-col font-mono">
      {/* Primary Status Row */}
      <div className="px-4 py-1.5 flex items-center justify-between text-xs border-b border-subtle">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-frame/70">STATUS:</span>
          {isRoasting ? (
            <span className="text-amber-600 font-bold animate-pulse">
              PROCESSING...
            </span>
          ) : (
            <span className="text-[#15803d] font-bold flex items-center space-x-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#15803d]" />
              <span>ONLINE ({AI.modelLabel.toUpperCase()})</span>
            </span>
          )}
          <span className="hidden md:inline text-frame/30">|</span>
          <span className="hidden md:inline text-frame/60">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="text-[11px] font-bold tracking-widest text-frame/80 uppercase">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Second Attribution Line */}
      <div className="py-1 text-center text-[10px] text-frame/50 bg-panel border-t border-subtle/50">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
