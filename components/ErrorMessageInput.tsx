"use client";

import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-canvas border-b-2 border-frame px-4 py-2.5 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between">
        <label
          htmlFor="error-input"
          className="text-[11px] font-mono font-bold uppercase tracking-wider text-frame flex items-center space-x-1"
        >
          <span>Attach Terminal Traceback / Compiler Error (Optional)</span>
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] font-mono font-bold text-frame/70 hover:text-accent uppercase hover:underline cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        id="error-input"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  File &quot;main.py&quot;, line 5, in calculate_average"
        className="w-full bg-panel border border-frame p-2 text-xs font-mono text-frame placeholder:text-frame/40 focus:outline-none focus:ring-1 focus:ring-frame resize-y"
        spellCheck={false}
      />
    </div>
  );
}
