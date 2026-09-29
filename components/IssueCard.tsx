import React from "react";
import type { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<
  Severity,
  { badgeClass: string; borderStripe: string }
> = {
  "FATAL BUG": {
    badgeClass: "border-[#d94826] text-[#d94826] bg-[#d94826]/10",
    borderStripe: "border-l-[#d94826]",
  },
  "CODE SMELL": {
    badgeClass: "border-[#d97706] text-[#d97706] bg-[#d97706]/10",
    borderStripe: "border-l-[#d97706]",
  },
  "OPTIMIZATION": {
    badgeClass: "border-[#15803d] text-[#15803d] bg-[#15803d]/10",
    borderStripe: "border-l-[#15803d]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const style = SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES["CODE SMELL"];

  return (
    <div className="border border-frame bg-panel p-3 shadow-[2px_2px_0px_#111111] space-y-2">
      {/* Top Row: Index Chip, Line, Severity, Title */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 select-none">
        <div className="flex items-center space-x-2">
          <span className="bg-frame text-white px-1.5 py-0.5 text-[10px] font-mono font-bold">
            #{paddedIndex}
          </span>
          <span className="text-xs font-mono font-bold text-frame">
            LINE {issue.line}
          </span>
          <span
            className={`border px-1.5 py-0.5 text-[10px] font-mono font-bold ${style.badgeClass}`}
          >
            [{issue.severity}]
          </span>
        </div>
        <div className="text-right text-[11px] font-mono text-frame/70 flex-1 ml-2 break-words">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet with Left Accent Border */}
      {issue.codeSnippet && (
        <pre
          className={`p-2 bg-canvas border-l-4 ${style.borderStripe} border-y border-r border-frame/30 text-xs font-mono overflow-x-auto text-frame`}
        >
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1 text-xs font-mono pt-1">
        <div className="text-accent leading-relaxed">
          <span className="font-bold mr-1">✕ Diagnosis:</span>
          <span className="text-frame">{issue.diagnosis}</span>
        </div>
        <div className="text-[#15803d] leading-relaxed">
          <span className="font-bold mr-1">✓ Expected:</span>
          <span className="text-frame">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
