import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 min-h-[320px] select-none">
      <div className="w-16 h-16 border-2 border-dashed border-frame/40 flex items-center justify-center font-mono text-2xl text-frame/50">
        {"{}"}
      </div>
      <div
        className="font-bold text-sm uppercase tracking-wider text-frame"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Awaiting Code Submission
      </div>
      <p className="text-xs font-mono text-frame/60 max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (&amp;#8984;+Enter on Mac).
      </p>
    </div>
  );
}
