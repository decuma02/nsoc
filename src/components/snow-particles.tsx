"use client";

import React, { useEffect, useRef } from "react";

export function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const particleCount = isMobile ? 35 : 85;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2.4 * Math.random() + 0.9,
      spd: 0.85 * Math.random() + 0.35,
      drift: 0.6 * Math.random() - 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "255, 255, 255" : "70, 130, 180";

      for (const p of particles) {
        p.y += p.spd;
        p.phase += 0.01;
        p.x += 0.5 * Math.sin(p.phase) + p.drift;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${rgb}, ${0.28 + 0.12 * p.r})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
