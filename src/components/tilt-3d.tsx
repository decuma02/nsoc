"use client";

import React, { useRef } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Tilt3D({ children, className = "", maxTilt = 7 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(750px) rotateX(${-(maxTilt * normY)}deg) rotateY(${maxTilt * normX}deg) translateY(-3px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) {
          ref.current.style.transform = "perspective(750px) rotateX(0) rotateY(0) translateY(0)";
        }
      }}
      className={`transition-transform duration-300 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
