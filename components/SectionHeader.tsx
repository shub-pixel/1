import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b border-frame select-none">
      <div className="font-mono text-xs font-bold uppercase tracking-wider text-frame">
        <span className="bg-canvas px-1.5 py-0.5 border border-frame mr-1.5">
          {paddedNumber} // {title}
        </span>
      </div>
      {children && (
        <div className="flex items-center text-xs font-mono">{children}</div>
      )}
    </div>
  );
}
