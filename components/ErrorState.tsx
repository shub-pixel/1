import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 min-h-[320px] select-none">
      <div className="w-16 h-16 border-2 border-accent bg-accent/10 flex items-center justify-center font-mono text-2xl font-bold text-accent shadow-[2px_2px_0px_#d94826]">
        !
      </div>
      <div
        className="font-bold text-sm uppercase tracking-wider text-accent"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Analysis Failed
      </div>
      <p className="text-xs font-mono text-frame/70 max-w-md leading-relaxed break-words px-2">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 border-2 border-frame bg-frame text-white px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-panel hover:text-frame transition-none cursor-pointer shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
