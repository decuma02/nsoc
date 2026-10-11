"use client";

import React, { useEffect, useRef } from "react";

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      if (!items) return;

      // Scrub the SVG progress line as the user scrolls through the timeline
      if (svgLineRef.current && sectionRef.current) {
        gsap.fromTo(
          svgLineRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.4,
            },
          }
        );
      }

      // Illuminate nodes and reveal details sequentially as each milestone enters viewport
      items.forEach((item) => {
        const node = item.querySelector(".timeline-node");
        const card = item.querySelector(".timeline-card");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        });

        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, x: 24 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            0
          );
        }

        if (node) {
          tl.fromTo(
            node,
            {
              scale: 0.7,
              boxShadow: "0 0 0px var(--accent)",
              backgroundColor: "var(--bg)",
            },
            {
              scale: 1.25,
              boxShadow: "0 0 16px var(--accent)",
              backgroundColor: "var(--accent)",
              duration: 0.45,
              ease: "back.out(2)",
            },
            0.1
          );
        }
      });
    };

    init();
  }, []);

  const milestones = [
    {
      step: "Step 01 / 06",
      date: "October 1, 2026",
      title: "Registration Opens",
      description: "Registrations are open on October 1st and anyone can register now to join the program.",
    },
    {
      step: "Step 02 / 06",
      date: "October 12, 2026",
      title: "Projects Announced",
      description: "All approved projects are published and available for contributors to explore.",
    },
    {
      step: "Step 03 / 06",
      date: "October 15, 2026",
      title: "Contribution Period Begins",
      description: "Contributors start working on their selected projects.",
    },
    {
      step: "Step 04 / 06",
      date: "December 30, 2026",
      title: "Registrations Close",
      description: "Final deadline for new participant registrations.",
    },
    {
      step: "Step 05 / 06",
      date: "January 15, 2027",
      title: "Program Ends",
      description: "Contribution period concludes and final submissions are due.",
    },
    {
      step: "Step 06 / 06",
      date: "January 2027",
      title: "Results Announced",
      description: "Winners and top contributors are recognised and results are declared.",
    },
  ];

  return (
    <section id="timeline" ref={sectionRef} className="py-20 lg:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            04 / TIMELINE
          </div>
          <h2
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            The Winter Sprint Roadmap.
          </h2>
          <p
            className="font-inter text-base sm:text-lg leading-relaxed mt-4 max-w-2xl"
            style={{ color: "var(--muted-fg)" }}
          >
            Follow the journey from registration to results. Each milestone brings us closer to building something amazing together.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-8 max-w-3xl">
          {/* Background Track Line */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] sm:left-[11px] top-6 bottom-6 w-[2px] bg-border"
          />

          {/* Animated SVG Progress Line drawn on scroll */}
          <svg
            aria-hidden="true"
            className="absolute left-[6px] sm:left-[10px] top-6 bottom-6 w-[4px] h-full pointer-events-none overflow-visible"
          >
            <line
              ref={svgLineRef}
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
            />
          </svg>

          {/* Milestones */}
          {milestones.map((m, idx) => (
            <div key={idx} className="timeline-item relative group">
              {/* Milestone Node Circle with glowing illumination */}
              <div
                aria-hidden="true"
                className="timeline-node absolute -left-[29px] sm:-left-[37px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-300"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--accent)",
                }}
              />

              {/* Milestone Card with diagonal sheen sweep on hover */}
              <div className="timeline-card card p-6 sm:p-7">
                {/* Milestone Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="font-semibold" style={{ color: "var(--accent)" }}>
                    {m.date}
                  </span>
                  <span style={{ color: "var(--muted-fg)" }}>
                    {m.step}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3
                  className="font-syne font-bold text-2xl sm:text-[26px] mb-2"
                  style={{ color: "var(--fg)" }}
                >
                  {m.title}
                </h3>

                {/* Description */}
                <p
                  className="font-inter text-[15px] leading-relaxed"
                  style={{ color: "var(--muted-fg)" }}
                >
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
