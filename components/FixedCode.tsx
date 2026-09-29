"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import type { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const extension =
    LANGUAGES.find((l) => l.id === language)?.extension ?? "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="space-y-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[11px] font-mono font-bold text-[#15803d]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-frame bg-panel shadow-[2px_2px_0px_#111111]">
        {/* Fake filename header strip */}
        <div className="px-3 py-1.5 bg-canvas border-b border-frame flex items-center justify-between text-xs font-mono select-none">
          <span className="font-bold text-frame">
            solution.{extension}
          </span>
          <span className="text-[#15803d] font-bold text-[10px] tracking-wider uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code Viewport */}
        <pre className="p-3 text-xs font-mono text-frame overflow-x-auto whitespace-pre leading-5 max-h-[300px]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-frame px-3 py-1.5 text-xs font-mono font-bold bg-panel text-frame hover:bg-frame hover:text-white transition-none cursor-pointer"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="border border-frame px-3 py-1.5 text-xs font-mono font-bold bg-panel text-frame hover:bg-frame hover:text-white transition-none cursor-pointer"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
