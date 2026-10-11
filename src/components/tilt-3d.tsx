"use client";

import React, { useRef, useCallback } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  enableCelebrationClick?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.02,
  enableCelebrationClick = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const applyTilt = useCallback(
    (normX: number, normY: number, doScale: boolean) => {
      const el = ref.current;
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = `perspective(1000px) rotateX(${-(
        maxTilt * normY
      )}deg) rotateY(${maxTilt * normX}deg) scale(${
        doScale ? scale : 1
      }) translateZ(0)`;
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

        // Set CSS variables for interactive card highlights
        const mxPercent = Math.round((normX + 0.5) * 100);
        const myPercent = Math.round((normY + 0.5) * 100);
        const angle = Math.round(
          (Math.atan2(normY, normX) * 180) / Math.PI + 360
        ) % 360;

        el.style.setProperty("--mx", `${mxPercent}%`);
        el.style.setProperty("--my", `${myPercent}%`);
        el.style.setProperty("--ang", `${angle}`);

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
    el.style.transition = "transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)";
  }, []);

  // Click celebration burst of snowflakes and sparks (from nsoc.in)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableCelebrationClick) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1. Expanding ripple ring
      const ripple = document.createElement("span");
      ripple.className = "pointer-events-none absolute rounded-full border border-sky-400/80";
      Object.assign(ripple.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: "20px",
        height: "20px",
        marginLeft: "-10px",
        marginTop: "-10px",
        transition: "transform 700ms cubic-bezier(0.1, 0.9, 0.2, 1), opacity 700ms ease-out",
        transform: "scale(1)",
        opacity: "0.9",
        zIndex: "30",
      });
      el.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(8)";
        ripple.style.opacity = "0";
      });

      setTimeout(() => ripple.remove(), 750);

      // 2. Snowflakes & stars particle explosion
      const glyphs = ["❄", "✦", "✧", "•", "❄", "★"];
      const particleCount = 10;

      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("span");
        p.textContent = glyphs[i % glyphs.length];
        p.className = "pointer-events-none absolute select-none font-mono";

        const size = Math.floor(Math.random() * 12 + 10);
        const theta = Math.random() * Math.PI * 2;
        const dist = Math.random() * 70 + 40;
        const dx = Math.cos(theta) * dist;
        const dy = Math.sin(theta) * dist - 15;
        const rot = (Math.random() - 0.5) * 360;

        Object.assign(p.style, {
          left: `${x}px`,
          top: `${y}px`,
          fontSize: `${size}px`,
          color: i % 2 === 0 ? "var(--accent, #7dd3fc)" : "var(--accent-teal, #5eead4)",
          transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
          transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease-out",
          opacity: "1",
          zIndex: "35",
        });

        el.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1) rotate(${rot}deg)`;
          p.style.opacity = "0";
        });

        setTimeout(() => p.remove(), 700);
      }
    },
    [enableCelebrationClick]
  );

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
