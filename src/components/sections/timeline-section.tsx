"use client";

import React from "react";

export function TimelineSection() {
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
      description: "Winners and top contributors are recognised and results are published.",
    },
  ];

  return (
    <section id="timeline" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
            04 / TIMELINE
          </div>
          <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
            The Winter Sprint Roadmap.
          </h2>
        </div>

        {/* Timeline List (Figma Exact Structure) */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-border space-y-8 max-w-3xl">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Circle (Figma: 12x12 bg:#07111f stroke:#7dd3fc) */}
              <div
                aria-hidden="true"
                className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-background border-2 border-cyan-accent transition-transform duration-200 group-hover:scale-125"
              />

              {/* Milestone Card (Figma: 732x153 bg:#101f32 border:#26394e) */}
              <div className="figma-card p-6 sm:p-7">
                {/* Milestone Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="text-cyan-accent font-medium">
                    {m.date}
                  </span>
                  <span className="text-muted-foreground">
                    {m.step}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="font-syne font-bold text-2xl sm:text-[26px] text-foreground mb-2">
                  {m.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-[15px] text-muted-foreground leading-relaxed">
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
