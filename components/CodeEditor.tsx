"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label ?? language;

  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart ?? 0;
    const textBefore = code.slice(0, pos);
    const lines = textBefore.split("\n");
    setCursor({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Schedule cursor update
      setTimeout(updateCursorPosition, 0);
    }
  };

  const totalLines = Math.max(code.split("\n").length, 10);
  const lineNumbers = Array.from({ length: totalLines }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-panel border-r-0 lg:border-r-2 border-frame">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 bg-canvas border-b border-frame flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-frame/60 tracking-wider">
            INPUT // SRC
          </span>
        </div>
        <div className="font-mono text-xs font-bold text-frame">
          Your Code
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-accent hover:underline font-bold cursor-pointer"
          >
            [SAMPLE BUG]
          </button>
          <span className="text-frame/30">/</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-frame/60 hover:text-frame hover:underline cursor-pointer"
          >
            [CLEAR]
          </button>
        </div>
      </div>

      {/* Editor Main: Gutter + Textarea */}
      <div className="relative flex flex-1 min-h-[360px] lg:min-h-[460px] overflow-hidden bg-panel">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 select-none bg-canvas/80 border-r border-subtle py-3 text-right pr-2.5 font-mono text-xs leading-6 overflow-hidden flex flex-col"
          aria-hidden="true"
        >
          {lineNumbers.map((num) => {
            const isHighlighted = errorLine === num;
            return (
              <div
                key={num}
                className={`transition-colors ${
                  isHighlighted
                    ? "text-accent bg-accent/15 font-bold border-l-2 border-accent"
                    : "text-frame/40"
                }`}
              >
                {String(num).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onSelect={updateCursorPosition}
            onClick={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            placeholder="// Paste your code here..."
            spellCheck={false}
            wrap="off"
            className="w-full h-full p-3 font-mono text-xs leading-6 text-frame bg-transparent border-0 outline-none resize-none whitespace-pre overflow-auto placeholder:text-frame/30 focus:ring-0"
          />
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-4 bg-canvas border-t border-frame hidden md:flex items-center justify-between text-[11px] font-mono text-frame/70 select-none">
        <div className="flex items-center space-x-2">
          <span>
            Ln {cursor.line}, Col {cursor.col} · {languageLabel}
          </span>
          {errorLine && (
            <span className="text-accent font-bold">
              · Flagged: Line {errorLine}
            </span>
          )}
        </div>
        <div>
          <span>UTF-8 · Tab Size: 4</span>
        </div>
      </div>
    </div>
  );
}
