"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops, not touchscreens)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onPointerMove = (e: PointerEvent) => {
      if (!visible) setVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          'a, button, input, textarea, select, [role="button"], .card, .figma-card, .role-card, [data-interactive="true"]'
        );
        setHovered(!!isInteractive);
      }
    };

    const onPointerDown = () => setClicked(true);
    const onPointerUp = () => setClicked(false);
    const onPointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    // Smooth lerp for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none"
    >
      {/* Outer fluid trailing ring with cyan aurora glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform"
        style={{
          width: hovered ? 56 : clicked ? 28 : 36,
          height: hovered ? 56 : clicked ? 28 : 36,
          border: hovered
            ? "1.5px solid rgba(125, 211, 252, 0.85)"
            : "1px solid rgba(125, 211, 252, 0.4)",
          backgroundColor: hovered
            ? "rgba(125, 211, 252, 0.08)"
            : clicked
            ? "rgba(125, 211, 252, 0.2)"
            : "transparent",
          boxShadow: hovered
            ? "0 0 24px rgba(125, 211, 252, 0.35), inset 0 0 12px rgba(125, 211, 252, 0.1)"
            : "0 0 12px rgba(125, 211, 252, 0.15)",
          backdropFilter: hovered ? "blur(1px)" : "none",
        }}
      />

      {/* Center luminous cyan dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 will-change-transform"
        style={{
          width: hovered ? 6 : clicked ? 3 : 5,
          height: hovered ? 6 : clicked ? 3 : 5,
          backgroundColor: "#7dd3fc",
          boxShadow: "0 0 8px #7dd3fc, 0 0 16px rgba(94, 234, 212, 0.8)",
        }}
      />
    </div>
  );
}
