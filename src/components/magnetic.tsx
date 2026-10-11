"use client";

import React, { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
}

export function Magnetic({ children, className = "", pullFactor = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const deltaX = (e.clientX - rect.left - rect.width / 2) * pullFactor;
        const deltaY = (e.clientY - rect.top - rect.height / 2) * (pullFactor * 1.3);
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) {
          ref.current.style.transform = "translate(0, 0)";
        }
      }}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
