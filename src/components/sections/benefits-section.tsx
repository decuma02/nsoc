"use client";

import React, { useEffect, useRef } from "react";
import { Tilt3D } from "@/components/tilt-3d";

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const els = sectionRef.current?.querySelectorAll("[data-reveal]");
      if (!els) return;

      els.forEach((el) => {
        const delay = parseFloat((el as HTMLElement).dataset.revealDelay ?? "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: Math.min(delay, 0.24),
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    };

    init();
  }, []);

  const pillars = [
    {
      title: "Real projects.",
      description:
        "Project Kernels bring their actual codebases — not dummy repos or toy problems. Every issue you close ships to real users.",
    },
    {
      title: "Structured guidance.",
      description:
        "Admins mentor contributors through the review process. You don't just get a comment — you get context, feedback, and a reason.",
    },
    {
      title: "Earned recognition.",
      description:
        "Points for every merged PR. A public leaderboard. A profile that shows exactly what you built and where it landed.",
    },
    {
      title: "A real community.",
      description:
        "45 days of builders, maintainers, and contributors working in the same direction. The connections outlast the program.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 border-t border-[var(--border-col)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Editorial split: label + headline left / interactive arrow right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-8" data-reveal data-reveal-delay="0">
            <div
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              01 / ABOUT
            </div>
            <h2 className="font-syne font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
              Open source, the way it<br className="hidden sm:inline" /> was meant to be.
            </h2>
          </div>

          {/* Giant editorial arrow */}
          <div
            className="lg:col-span-4 hidden lg:flex items-end justify-end"
            data-reveal
            data-reveal-delay="0.06"
          >
            <span
              className="font-syne select-none leading-none cursor-default font-bold"
              style={{
                fontSize: "7rem",
                color: "var(--accent)",
                lineHeight: 1,
                transition: "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.25s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(6px, -6px)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent-teal)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
            >
              ↗
            </span>
          </div>
        </div>

        {/* ── 2×2 Benefits cards with 3D perspective tilt & spotlight & sheen ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <Tilt3D key={p.title} maxTilt={6}>
              <div
                className="card p-8 lg:p-10 flex flex-col justify-center gap-3 min-h-[220px] h-full group"
                data-reveal
                data-reveal-delay={0.06 * i}
              >
                <span className="card-sheen" />
                <span className="card-spotlight" />

                <div className="flex items-center justify-between">
                  <h3 className="font-syne font-bold text-2xl text-foreground">
                    {p.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground/50 font-semibold">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-inter leading-relaxed text-base text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </Tilt3D>
          ))}
        </div>

      </div>
    </section>
  );
}
