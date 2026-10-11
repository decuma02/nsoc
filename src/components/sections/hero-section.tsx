"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

// Deterministic sparse snow particle positions
const SNOW_PARTICLES = [
  { left: "8%",  top: "15%", size: 3, delay: "0s",   duration: "9s",  animation: "snow-drift" },
  { left: "18%", top: "5%",  size: 2, delay: "1.2s",  duration: "10s", animation: "snow-drift-2" },
  { left: "33%", top: "10%", size: 3, delay: "2.5s",  duration: "9.5s",animation: "snow-drift" },
  { left: "52%", top: "3%",  size: 2, delay: "0.8s",  duration: "11s", animation: "snow-drift-2" },
  { left: "67%", top: "8%",  size: 3, delay: "3.1s",  duration: "8.5s",animation: "snow-drift" },
  { left: "79%", top: "12%", size: 2, delay: "1.7s",  duration: "12s", animation: "snow-drift-2" },
  { left: "88%", top: "6%",  size: 3, delay: "4.0s",  duration: "9.5s",animation: "snow-drift" },
];

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const auroraRef   = useRef<HTMLDivElement>(null);
  const aurora2Ref  = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);

  // States for one-time count-up animation (700ms duration)
  const [statSprint, setStatSprint] = useState(45);
  const [statParticipants, setStatParticipants] = useState("10K+");
  const [statProjects, setStatProjects] = useState("300+");

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = async () => {
      const gsapModule = await import("gsap");
      const STModule   = await import("gsap/ScrollTrigger");
      gsap = gsapModule.gsap;
      ScrollTrigger = STModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // ── One-time Statistics Count-Up (at most 700ms as per Figma guidance) ──
      if (statsBarRef.current) {
        const statsTargets = { sprint: 0, participants: 0, projects: 0 };
        ScrollTrigger.create({
          trigger: statsBarRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(statsTargets, {
              sprint: 45,
              participants: 10,
              projects: 300,
              duration: 0.7,
              ease: "power2.out",
              onUpdate: () => {
                setStatSprint(Math.round(statsTargets.sprint));
                setStatParticipants(`${Math.round(statsTargets.participants)}K+`);
                setStatProjects(`${Math.round(statsTargets.projects)}+`);
              },
            });
          },
        });
      }

      // ── Desktop only: aurora depth shifts by 12–20px with pointer or scroll ──
      mm.add("(min-width: 1024px)", () => {
        const handlePointer = (e: MouseEvent) => {
          const cx = e.clientX / window.innerWidth - 0.5;
          const cy = e.clientY / window.innerHeight - 0.5;

          if (auroraRef.current) {
            gsap.to(auroraRef.current, {
              x: cx * 20,
              y: cy * 16,
              duration: 1.5,
              ease: "power2.out",
            });
          }
          if (aurora2Ref.current) {
            gsap.to(aurora2Ref.current, {
              x: cx * -14,
              y: cy * -10,
              duration: 1.8,
              ease: "power2.out",
            });
          }
        };

        window.addEventListener("pointermove", handlePointer, { passive: true });

        // Scroll parallax for aurora background layers
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (auroraRef.current) {
              gsap.set(auroraRef.current, { y: p * -30 });
            }
            if (aurora2Ref.current) {
              gsap.set(aurora2Ref.current, { y: p * -18 });
            }
          },
        });

        return () => {
          window.removeEventListener("pointermove", handlePointer);
        };
      });
    };

    init();

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger: ST }) => {
        ST.getAll().forEach((t) => t.kill());
      }).catch(() => {});
    };
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden"
    >
      {/* ── Aurora Layer (z-0) ─────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary aurora blob */}
        <div
          ref={auroraRef}
          className="aurora-ribbon absolute top-[-15%] left-[12%] w-[750px] lg:w-[950px] h-[550px] lg:h-[720px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(125,211,252,0.22) 0%, rgba(94,234,212,0.12) 42%, transparent 72%)",
            animation: "aurora-drift 18s ease-in-out infinite",
          }}
        />
        {/* Secondary aurora streak */}
        <div
          ref={aurora2Ref}
          className="aurora-ribbon absolute top-[12%] right-[-6%] w-[550px] h-[450px] rotate-[-18deg]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(94,234,212,0.18) 0%, rgba(125,211,252,0.08) 50%, transparent 75%)",
            animation: "aurora-drift-2 22s ease-in-out infinite",
          }}
        />
        {/* Deep navy atmosphere vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[65%]"
          style={{
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Sparse Snow Particles (hidden on mobile for performance) ── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none hidden sm:block">
        {SNOW_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-0"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "white",
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
              animation: `${p.animation} ${p.duration} ${p.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main Split Hero Grid ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* ── Left Column: Real Program Description & CTAs (Stationary Text) ── */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center pt-4 lg:pt-0 pb-6 lg:pb-8">

            {/* Sprint Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 border"
              style={{
                borderColor: "var(--border-col)",
                backgroundColor: "var(--navy)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--accent-teal)", boxShadow: "0 0 8px var(--accent-teal)" }}
              />
              <span className="font-mono text-xs text-foreground tracking-wide">
                45-Day Open Source Sprint
              </span>
            </div>

            {/* Headline — Figma: 96px ExtraBold Syne */}
            <h1
              className="font-syne font-extrabold leading-[0.97] tracking-tight mb-4"
              style={{ fontSize: "clamp(3rem, 6.7vw, 6rem)", color: "var(--fg)" }}
            >
              Nexus<br />
              Spring of<br />
              Code.
            </h1>

            {/* Edition Subtitle — Figma: 22px JetBrains Mono */}
            <div
              className="font-mono mb-6"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.375rem)",
                lineHeight: "1.5",
                color: "var(--accent)",
                letterSpacing: "-0.01em",
              }}
            >
              ’26 — Winter Edition
            </div>

            {/* Authentic Exact Description — Figma: 18px Inter, 29.7px line-height */}
            <p
              className="font-inter text-base sm:text-lg leading-[1.65] max-w-xl mb-8"
              style={{ color: "var(--muted-fg)" }}
            >
              A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code. No toy projects. No filler tasks. Just meaningful work and a community that grows together.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onOpenRegister}
                className="btn-primary"
                style={{ paddingLeft: 32, paddingRight: 32 }}
              >
                <span>Join now!</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <a href="#about" className="btn-secondary">
                <span>Learn more</span>
                <ArrowUpRight className="w-5 h-5" style={{ color: "var(--accent)" }} />
              </a>
            </div>

            {/* Scanning for deepfakes badge */}
            <div className="flex items-center gap-3 p-3 sm:px-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 backdrop-blur-sm text-xs font-mono">
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-foreground">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Scanning for deepfakes
                </span>
                <span className="text-muted-foreground/60">•</span>
                <span className="text-muted-foreground">
                  Automated verification & code authenticity filters active
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Atmospheric Winter Scene with Panda Mascot ── */}
          <div className="lg:col-span-5 flex items-end justify-center lg:justify-end self-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px]">
              {/* Atmospheric halo behind panda */}
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-90 translate-y-6 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 75%, rgba(125,211,252,0.35) 0%, rgba(94,234,212,0.18) 45%, transparent 72%)",
                  filter: "blur(48px)",
                  zIndex: 0,
                }}
              />

              {/* Gentle 6px float over 6s ease-in-out */}
              <div
                className="relative z-10"
                style={{
                  animation: "panda-float 6s ease-in-out infinite",
                }}
              >
                {/* Continuous gentle wave */}
                <div
                  style={{
                    animation: "panda-wave 4s ease-in-out infinite",
                    transformOrigin: "bottom center",
                  }}
                >
                  <Image
                    src="/winter-panda-1.png"
                    alt="NSoC '26 Winter Edition panda mascot waving"
                    width={560}
                    height={560}
                    className="w-full h-auto select-none drop-shadow-[0_12px_24px_rgba(7,17,31,0.45)]"
                    priority
                    draggable={false}
                  />
                </div>
              </div>

              {/* Mascot Caption Tag — Figma: 11px JetBrains Mono */}
              <div
                className="absolute bottom-2 left-2 right-2 flex justify-between px-3 py-1.5 rounded-lg bg-card/60 backdrop-blur-md border border-border text-[11px] font-mono"
                style={{ zIndex: 20 }}
              >
                <span className="font-semibold text-foreground">
                  NSoC ’26
                </span>
                <span className="text-cyan-accent uppercase tracking-wider">
                  WINTER EDITION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Program Statistics Bar (Figma: 56px Syne 700 / 12px JetBrains Mono) ── */}
        <div
          ref={statsBarRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 mt-10 border-t"
          style={{ borderColor: "var(--border-col)" }}
        >
          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                color: "var(--fg)",
              }}
            >
              {statSprint}
            </span>
            <span
              className="font-mono text-xs uppercase tracking-wider mt-2"
              style={{ color: "var(--muted-fg)" }}
            >
              Day Sprint
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                color: "var(--accent)",
              }}
            >
              {statParticipants}
            </span>
            <span
              className="font-mono text-xs uppercase tracking-wider mt-2"
              style={{ color: "var(--muted-fg)" }}
            >
              Expected Participants
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                color: "var(--accent-teal)",
              }}
            >
              {statProjects}
            </span>
            <span
              className="font-mono text-xs uppercase tracking-wider mt-2"
              style={{ color: "var(--muted-fg)" }}
            >
              Expected Projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
