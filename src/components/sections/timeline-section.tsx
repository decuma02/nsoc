"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Calendar } from "lucide-react";
import { Tilt3D } from "@/components/tilt-3d";

const milestones = [
  {
    step: "01",
    date: "October 1, 2026",
    title: "Registration Opens",
    description: "Registrations are open on October 1st and anyone can register now to join the program.",
    color: "#34d399",
  },
  {
    step: "02",
    date: "October 12, 2026",
    title: "Projects Announced",
    description: "All approved projects are published and available for contributors to explore.",
    color: "#38bdf8",
  },
  {
    step: "03",
    date: "October 15, 2026",
    title: "Contribution Period Begins",
    description: "Contributors start working on their selected projects.",
    color: "#a78bfa",
  },
  {
    step: "04",
    date: "December 30, 2026",
    title: "Registrations Close",
    description: "Final deadline for new participant registrations.",
    color: "#fb7185",
  },
  {
    step: "05",
    date: "January 15, 2027",
    title: "Program Ends",
    description: "Contribution period concludes and final submissions are due.",
    color: "#38bdf8",
  },
  {
    step: "06",
    date: "January 2027",
    title: "Results Announced",
    description: "Winners and top contributors are recognised and results are declared.",
    color: "#fcd34d",
  },
];

const totalHeight = 70 + 240 * milestones.length + 40;
const svgPathD =
  "M600,70" +
  milestones
    .map((_, t) => {
      const r = t % 2 === 0 ? 1 : -1;
      const n = 70 + 240 * t;
      return ` C${600 + 160 * r},${n + 80} ${600 + 160 * r},${n + 160} 600,${n + 240}`;
    })
    .join("");

const nodeCoords = milestones.map((_, t) => {
  const r = t % 2 === 0 ? 1 : -1;
  return {
    x: 600 + 0.75 * r * 160,
    y: 70 + 240 * t + 120,
    side: r > 0 ? ("right" as const) : ("left" as const),
  };
});

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelOrbRef = useRef<SVGCircleElement>(null);
  const mobileBarRef = useRef<HTMLSpanElement>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(-1);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const path = pathRef.current;
      const container = containerRef.current;
      const travelOrb = travelOrbRef.current;

      if (!path || !container) return;

      const totalLen = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: totalLen,
        strokeDashoffset: prefersReduced ? 0 : totalLen,
      });

      if (prefersReduced) {
        setActiveMilestone(milestones.length - 1);
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop Serpentine timeline animation
      mm.add("(min-width: 1024px)", () => {
        const nodeDistances = nodeCoords.map((coord) => {
          let low = 0;
          let high = totalLen;
          for (let i = 0; i < 28; i++) {
            const mid = (low + high) / 2;
            path.getPointAtLength(mid).y < coord.y ? (low = mid) : (high = mid);
          }
          return (low + high) / 2;
        });

        const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-tl-card]"));
        const nodes = Array.from(container.querySelectorAll<SVGGElement>("[data-tl-node]"));

        // Init cards
        cards.forEach((card, idx) => {
          const isLeft = nodeCoords[idx].side === "left";
          gsap.set(card, {
            opacity: 0,
            x: isLeft ? -40 : 40,
            scale: 0.92,
          });
        });

        // Scroll progress scrub
        ScrollTrigger.create({
          trigger: container,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const drawLen = totalLen * progress;
            path.style.strokeDashoffset = String(totalLen - drawLen);

            if (travelOrb) {
              const pt = path.getPointAtLength(drawLen);
              travelOrb.setAttribute("cx", String(pt.x));
              travelOrb.setAttribute("cy", String(pt.y));
              travelOrb.style.opacity = progress > 0.01 && progress < 0.99 ? "1" : "0";
            }

            // Check milestone activations
            let current = -1;
            nodeDistances.forEach((d, idx) => {
              if (drawLen >= d - 20) {
                current = idx;
              }
            });

            if (current !== activeMilestone) {
              setActiveMilestone(current);
              cards.forEach((c, idx) => {
                if (idx <= current) {
                  gsap.to(c, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" });
                }
              });
            }
          },
        });
      });

      // Mobile vertical progress bar scrub
      mm.add("(max-width: 1023px)", () => {
        if (mobileBarRef.current) {
          gsap.fromTo(
            mobileBarRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.4,
              },
            }
          );
        }

        const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-tl-card]"));
        cards.forEach((c) => {
          gsap.fromTo(
            c,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: c,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });
    };

    init();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs uppercase tracking-widest border-sky-400/30 bg-sky-400/10 text-sky-400">
            <Sparkles className="size-3.5 animate-spin [animation-duration:10s]" />
            04 / Program Timeline
          </div>
          <h2
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4"
            style={{ color: "var(--fg)" }}
          >
            Here&apos;s how we <span className="text-sky-400">planned.</span>
          </h2>
          <p className="font-inter text-base sm:text-lg leading-relaxed text-muted-foreground">
            Follow the journey from registration to results. Each milestone brings us closer to building something amazing together.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Desktop Serpentine SVG Curve */}
          <svg
            viewBox={`0 0 1200 ${totalHeight}`}
            className="hidden lg:block h-auto w-full"
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="tl-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={totalHeight}>
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#fcd34d" />
              </linearGradient>
            </defs>

            {/* Background dashed guideline */}
            <path
              d={svgPathD}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="3 12"
              className="stroke-[#b9d7ec] dark:stroke-white/15"
            />

            {/* Animated foreground stroke */}
            <path
              ref={pathRef}
              d={svgPathD}
              fill="none"
              stroke="url(#tl-grad)"
              strokeWidth={4}
              strokeLinecap="round"
            />

            {/* Pulsing milestone nodes */}
            {nodeCoords.map((coord, idx) => {
              const m = milestones[idx];
              const isPast = idx <= activeMilestone;
              return (
                <g key={`node-${idx}`} data-tl-node="true">
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={14}
                    className="animate-ping origin-center [transform-box:fill-box]"
                    style={{ fill: m.color, opacity: isPast ? 0.35 : 0.1 }}
                  />
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={12}
                    strokeWidth={3}
                    className="fill-background"
                    style={{ stroke: m.color }}
                  />
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={5}
                    style={{ fill: m.color }}
                  />
                </g>
              );
            })}

            {/* Traveling orb follower */}
            <circle
              ref={travelOrbRef}
              r={7}
              className="fill-white"
              style={{ opacity: 0, filter: "drop-shadow(0 0 8px #38bdf8)" }}
            />
          </svg>

          {/* Cards Container: absolute positioned on desktop along curve nodes; linear on mobile */}
          <div className="relative flex flex-col gap-6 lg:absolute lg:inset-0 lg:block">
            {/* Mobile Vertical Guideline */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-5 top-4 w-px dark:bg-white/10 bg-[#b9d7ec] lg:hidden"
            >
              <span
                ref={mobileBarRef}
                className="block h-full w-full origin-top bg-gradient-to-b from-emerald-400 via-sky-400 to-amber-400"
              />
            </span>

            {milestones.map((m, idx) => {
              const coord = nodeCoords[idx];
              const isLeft = coord.side === "left";
              const desktopPos = isLeft
                ? { top: `${(coord.y / totalHeight) * 100}%`, right: `${100 - (coord.x - 48) / 12}%` }
                : { top: `${(coord.y / totalHeight) * 100}%`, left: `${(coord.x + 48) / 12}%` };

              return (
                <div
                  key={m.title}
                  data-tl-card="true"
                  style={desktopPos}
                  className="relative pl-12 lg:pl-0 lg:absolute lg:w-[35%] lg:-translate-y-1/2"
                >
                  {/* Mobile node indicator */}
                  <span
                    aria-hidden="true"
                    style={{ background: m.color }}
                    className="absolute left-[14px] top-6 size-3 rounded-full ring-4 ring-background lg:hidden"
                  />

                  <Tilt3D maxTilt={6}>
                    <div className="card p-6 sm:p-7 relative overflow-hidden group">
                      <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                        <span className="font-bold flex items-center gap-1.5" style={{ color: m.color }}>
                          <Calendar className="w-3.5 h-3.5" />
                          {m.date}
                        </span>
                        <span className="opacity-50 font-semibold">{m.step}</span>
                      </div>
                      <h3 className="font-syne font-bold text-xl sm:text-2xl mb-2 text-foreground">
                        {m.title}
                      </h3>
                      <p className="font-inter text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {m.description}
                      </p>
                    </div>
                  </Tilt3D>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
