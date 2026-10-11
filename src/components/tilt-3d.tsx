"use client";

import React, { useRef, useCallback } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export function Tilt3D({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.02,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const applyTilt = useCallback(
    (normX: number, normY: number, doScale: boolean) => {
      const el = ref.current;
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = `perspective(900px) rotateX(${-(maxTilt * normY)}deg) rotateY(${
        maxTilt * normX
      }deg) scale(${doScale ? scale : 1}) translateZ(0)`;
    },
    [maxTilt, scale]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        applyTilt(normX, normY, true);
      });
    },
    [applyTilt]
  );

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // Smooth spring-back
    el.style.transition =
      "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
