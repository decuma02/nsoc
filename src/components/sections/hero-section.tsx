"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/magnetic";

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

const PANDA_QUOTES = [
  "Hi! Ready to build real open source? ❄️",
  "Over 300+ real projects waiting for you! 🚀",
  "No toy tasks. Only production code! 💻",
  "Earn points, climb the leaderboard, win prizes! 🏆",
  "Welcome to NSoC '26 Winter Edition! 🐼",
];

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const auroraRef   = useRef<HTMLDivElement>(null);
  const aurora2Ref  = useRef<HTMLDivElement>(null);
  const statsBarRef = useRef<HTMLDivElement>(null);
  const pandaRef    = useRef<HTMLDivElement>(null);

  // States for one-time count-up animation
  const [statSprint, setStatSprint] = useState(45);
  const [statParticipants, setStatParticipants] = useState("10K+");
  const [statProjects, setStatProjects] = useState("300+");

  // Interactive Panda Mascot state
  const [pandaPose, setPandaPose] = useState<1 | 2>(1);
  const [pandaQuoteIndex, setPandaQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [pandaBouncing, setPandaBouncing] = useState(false);

  const handlePandaClick = useCallback((e: React.MouseEvent) => {
    setPandaPose((prev) => (prev === 1 ? 2 : 1));
    setPandaQuoteIndex((prev) => (prev + 1) % PANDA_QUOTES.length);
    setShowSpeech(true);
    setPandaBouncing(true);
    setTimeout(() => setPandaBouncing(false), 600);

    // Snowflake click burst
    const el = pandaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glyphs = ["❄", "✦", "✧", "❄"];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("span");
      p.textContent = glyphs[i % glyphs.length];
      p.className = "pointer-events-none absolute select-none font-mono";

      const theta = Math.random() * Math.PI * 2;
      const dist = Math.random() * 60 + 30;
      const dx = Math.cos(theta) * dist;
      const dy = Math.sin(theta) * dist - 20;

      Object.assign(p.style, {
        left: `${x}px`,
        top: `${y}px`,
        fontSize: "14px",
        color: "#7dd3fc",
        transform: "translate(-50%, -50%) scale(0)",
        transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out",
        opacity: "1",
        zIndex: "30",
      });

      el.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.2)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 650);
    }
  }, []);

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

      // One-time Statistics Count-Up
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

      // Desktop only: aurora depth shifts with pointer
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
        {/* Deep atmosphere vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[65%]"
          style={{
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Sparse Snow Particles ── */}
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

          {/* ── Left Column: Real Program Description & CTAs ── */}
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
              <span className="font-mono text-xs text-foreground tracking-wide font-medium">
                45-Day Open Source Sprint
              </span>
            </div>

            {/* Headline — Syne Extrabold with tight tracking */}
            <h1
              className="font-syne font-extrabold leading-[0.98] tracking-tight mb-4 text-foreground"
              style={{ fontSize: "clamp(2.75rem, 6.8vw, 5.75rem)" }}
            >
              Nexus<br />
              Spring of<br />
              Code.
            </h1>

            {/* Edition Subtitle */}
            <div className="font-mono text-lg sm:text-xl md:text-2xl text-[var(--accent)] tracking-tight mb-6 font-medium">
              ’26 — Winter Edition
            </div>

            {/* Description */}
            <p className="font-inter text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl mb-8">
              A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code. No toy projects. No filler tasks. Just meaningful work and a community that grows together.
            </p>

            {/* CTAs with Magnetic hover and button shine sweep */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Magnetic pullFactor={0.25}>
                <button
                  onClick={onOpenRegister}
                  className="btn-primary btn-shine cursor-pointer shadow-lg shadow-sky-500/20"
                  style={{ paddingLeft: 32, paddingRight: 32 }}
                >
                  <span>Join now!</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </Magnetic>
              <Magnetic pullFactor={0.25}>
                <a href="#about" className="btn-secondary btn-shine cursor-pointer">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-5 h-5" style={{ color: "var(--accent)" }} />
                </a>
              </Magnetic>
            </div>

            {/* Scanning for deepfakes badge */}
            <div className="flex items-center gap-3 p-3 sm:px-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20 backdrop-blur-sm text-xs font-mono">
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

          {/* ── Right Column: Atmospheric Winter Scene with Interactive Panda Mascot ── */}
          <div className="lg:col-span-5 flex items-end justify-center lg:justify-end self-end">
            <div
              ref={pandaRef}
              onClick={handlePandaClick}
              onMouseEnter={() => setShowSpeech(true)}
              onMouseLeave={() => setShowSpeech(false)}
              className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] cursor-pointer group select-none"
              title="Click me to wave and chat! 🐼"
            >
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

              {/* Interactive Speech Bubble */}
              <div
                className={`absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 w-max max-w-[280px] sm:max-w-[320px] px-4 py-2 rounded-2xl bg-card/90 backdrop-blur-md border border-[var(--border-col)] shadow-xl shadow-black/20 text-xs sm:text-sm font-inter text-foreground z-30 transition-all duration-300 pointer-events-none text-center ${
                  showSpeech ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <span>{PANDA_QUOTES[pandaQuoteIndex]}</span>
                {/* Speech tail */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card/90 border-b border-r border-[var(--border-col)] rotate-45" />
              </div>

              {/* Gentle float over 6s ease-in-out + bounce on click */}
              <div
                className={`relative z-10 transition-transform duration-300 ${
                  pandaBouncing ? "scale-105 -translate-y-3" : ""
                }`}
                style={{
                  animation: pandaBouncing ? "none" : "panda-float 6s ease-in-out infinite",
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
                    src={pandaPose === 1 ? "/winter-panda-1.png" : "/winter-panda-2.png"}
                    alt="NSoC '26 Winter Edition panda mascot waving"
                    width={560}
                    height={560}
                    className="w-full h-auto select-none drop-shadow-[0_12px_28px_rgba(5,10,20,0.5)] transition-all duration-300 group-hover:scale-102"
                    priority
                    draggable={false}
                  />
                </div>
              </div>

              {/* Mascot Caption Tag */}
              <div
                className="absolute bottom-2 left-2 right-2 flex justify-between px-3.5 py-1.5 rounded-lg bg-card/75 backdrop-blur-md border border-border text-[11px] font-mono"
                style={{ zIndex: 20 }}
              >
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  NSoC ’26
                </span>
                <span className="text-[var(--accent)] uppercase tracking-wider font-medium">
                  WINTER MASCOT (CLICK ME)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Program Statistics Bar ── */}
        <div
          ref={statsBarRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 mt-10 border-t border-[var(--border-col)]"
        >
          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-extrabold leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              {statSprint}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
              Day Sprint
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-extrabold leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              {statParticipants}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
              Participants
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <span
              className="font-syne font-extrabold leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
            >
              {statProjects}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
              Real Projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
