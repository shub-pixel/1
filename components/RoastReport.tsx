"use client";

import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { SectionHeader } from "@/components/SectionHeader";
import { IssueCard } from "@/components/IssueCard";
import { FixedCode } from "@/components/FixedCode";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (fixedCode: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  return (
    <div className="flex flex-col h-full bg-canvas">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-canvas border-b border-frame flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-frame/60 tracking-wider">
            AUDIT // REPORT
          </span>
        </div>
        <div className="font-mono text-xs font-bold text-frame">
          Roast Report
        </div>
        <div className="w-12" />
      </div>

      {/* Body Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}
        {state === "results" && result && (
          <div className="p-4 space-y-4">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono text-frame/60 uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="border border-frame p-3 bg-panel shadow-[2px_2px_0px_#111111]">
                <p className="text-xs font-mono italic text-frame border-l-2 border-accent pl-3 py-1 leading-relaxed whitespace-pre-wrap">
                  &ldquo;{result.roast}&rdquo;
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[10px] font-mono text-frame/60 uppercase">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>
              {result.issues.length === 0 ? (
                <div className="p-3 border border-frame bg-panel text-xs font-mono text-[#15803d] font-bold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {result.correctedCode && result.correctedCode.trim() !== "" && (
              <div>
                <FixedCode
                  sectionNumber={3}
                  language={language}
                  code={result.correctedCode}
                  onApply={onApplyFix}
                />
              </div>
            )}

            {/* Section 4 (or 3): Takeaway */}
            {result.takeaway && result.takeaway.trim() !== "" && (
              <div>
                <SectionHeader
                  number={result.correctedCode ? 4 : 3}
                  title="Takeaway"
                />
                <div className="border border-frame p-3 bg-panel shadow-[2px_2px_0px_#111111]">
                  <p className="text-xs font-mono text-frame leading-relaxed">
                    {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
