import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 min-h-[320px] select-none">
      <div className="w-16 h-16 border-2 border-frame bg-canvas flex items-center justify-center font-mono text-2xl text-frame shadow-[2px_2px_0px_#111111]">
        <span className="inline-block animate-spin text-accent font-bold">/</span>
      </div>
      <div
        className="font-bold text-sm uppercase tracking-wider text-frame animate-pulse"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Analyzing Code
      </div>
      <p className="text-xs font-mono text-frame/60 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
