"use client";

import React, { useEffect, useRef } from "react";

export function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const particleCount = isMobile ? 36 : 80;

    interface Particle {
      x: number;
      y: number;
      r: number;
      spd: number;
      drift: number;
      phase: number;
      rot: number;
      rotSpeed: number;
      opacity: number;
      type: "crystal" | "dust" | "snowball";
    }

    const createParticle = (initialY?: number): Particle => {
      const r = Math.random() < 0.65 ? Math.random() * 3 + 2 : Math.random() * 5 + 4.5;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        r,
        spd: 0.65 * (r / 4) + 0.35 + Math.random() * 0.4,
        drift: 0.4 * (Math.random() - 0.5),
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        opacity: Math.random() * 0.45 + 0.45,
        type: r > 4 ? "crystal" : "dust",
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle()
    );

    let animId = 0;

    // Helper: Draw intricate 6-pointed crystalline snowflake for dark theme
    const drawSnowflake = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rot: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);

      c.strokeStyle = `rgba(224, 242, 254, ${opacity})`;
      c.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      c.lineWidth = r > 6 ? 1.4 : 1.1;
      c.lineCap = "round";

      // Center crystalline core
      c.beginPath();
      c.arc(0, 0, Math.max(1, r * 0.2), 0, Math.PI * 2);
      c.fill();

      // 6 symmetrical dendritic arms
      for (let i = 0; i < 6; i++) {
        c.rotate(Math.PI / 3);

        // Main arm
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, r);
        c.stroke();

        // Branching dendrite needles
        if (r > 4.5) {
          const branchPos = r * 0.55;
          const branchLen = r * 0.35;
          c.beginPath();
          c.moveTo(0, branchPos);
          c.lineTo(-branchLen, branchPos + branchLen * 0.6);
          c.moveTo(0, branchPos);
          c.lineTo(branchLen, branchPos + branchLen * 0.6);
          c.stroke();

          // Outer tip sub-branch for larger flakes
          if (r > 7) {
            const tipPos = r * 0.8;
            const tipLen = r * 0.22;
            c.beginPath();
            c.moveTo(0, tipPos);
            c.lineTo(-tipLen, tipPos + tipLen * 0.5);
            c.moveTo(0, tipPos);
            c.lineTo(tipLen, tipPos + tipLen * 0.5);
            c.stroke();
          }
        }
      }

      c.restore();
    };

    // Helper: Draw fluffy 3D shaded snowball for light theme — icy blue palette
    const drawSnowball = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      opacity: number
    ) => {
      c.save();

      // Outer soft ambient glow — blue tinted
      c.beginPath();
      c.arc(x + r * 0.12, y + r * 0.18, r * 1.1, 0, Math.PI * 2);
      c.fillStyle = `rgba(56, 189, 248, ${opacity * 0.22})`;
      c.fill();

      // 3D radial gradient — bright icy white core → sky blue → cornflower edge
      const grad = c.createRadialGradient(
        x - r * 0.35,
        y - r * 0.38,
        r * 0.05,
        x,
        y,
        r
      );
      grad.addColorStop(0,    `rgba(240, 253, 255, ${opacity})`);
      grad.addColorStop(0.35, `rgba(186, 230, 253, ${opacity * 0.97})`);
      grad.addColorStop(0.65, `rgba(125, 211, 252, ${opacity * 0.92})`);
      grad.addColorStop(0.85, `rgba(56,  189, 248, ${opacity * 0.85})`);
      grad.addColorStop(1,    `rgba(14,  165, 233, ${opacity * 0.75})`);

      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = grad;
      c.fill();

      // Crisp blue outline
      c.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.5})`;
      c.lineWidth = 0.8;
      c.stroke();

      // Tiny specular highlight dot
      c.beginPath();
      c.arc(x - r * 0.3, y - r * 0.32, Math.max(0.6, r * 0.18), 0, Math.PI * 2);
      c.fillStyle = `rgba(255, 255, 255, ${opacity * 0.85})`;
      c.fill();

      c.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      for (const p of particles) {
        // Physical movement: gentle fall + sinusoidal breeze sway
        p.y += p.spd;
        p.phase += 0.012;
        p.x += Math.sin(p.phase) * 0.6 + p.drift;
        p.rot += p.rotSpeed;

        // Wrap around viewport edges
        if (p.y > height + 15) {
          p.y = -15;
          p.x = Math.random() * width;
        }
        if (p.x > width + 15) p.x = -15;
        if (p.x < -15) p.x = width + 15;

        if (isDark) {
          // Night / Dark theme: Crystalline snowflakes
          if (p.r >= 3.8) {
            drawSnowflake(ctx, p.x, p.y, p.r, p.rot, p.opacity);
          } else {
            // Smaller ambient ice crystals
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(186, 230, 253, ${p.opacity * 0.75})`;
            ctx.shadowColor = "#7dd3fc";
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else {
          // Light theme: Playful fluffy 3D snowballs
          drawSnowball(ctx, p.x, p.y, Math.max(2.5, p.r), p.opacity);
        }
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
