import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between px-4 py-2.5 bg-panel border-b-2 border-frame gap-3">
      <div className="flex items-center space-x-2.5 select-none">
        <span
          className="font-bold text-lg md:text-xl tracking-wider text-frame uppercase"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {APP.name}
        </span>
        <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 border border-frame bg-canvas text-frame">
          {APP.version}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
