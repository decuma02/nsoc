"use client";

import React from "react";

export function BenefitsSection() {
  const pillars = [
    {
      title: "Real projects.",
      description:
        "Project Kernels bring their actual codebases — not dummy repos or toy problems. Every issue you close ships to real users.",
    },
    {
      title: "Structured guidance.",
      description:
        "Experienced maintainers review your PRs, provide actionable feedback, and help you navigate complex open source workflows.",
    },
    {
      title: "Earned recognition.",
      description:
        "Climb the official leaderboard, earn verified certificates, claim physical swag, and get direct referrals to top tech companies.",
    },
    {
      title: "A real community.",
      description:
        "Connect with thousands of builders, designers, and maintainers across Discord, events, and campus hack spaces.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split: Left sticky title + Right 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 mb-20">
          {/* Left Column (Figma: 380px) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-4">
                01 / ABOUT
              </div>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] text-foreground tracking-tight">
                Open source, the way it was meant to be.
              </h2>
            </div>

            {/* Giant Graphic Arrow from Figma Frame */}
            <div
              aria-hidden="true"
              className="hidden lg:block font-syne font-medium text-8xl xl:text-9xl text-cyan-accent select-none mt-12 transition-transform duration-300 hover:translate-x-2 hover:-translate-y-2"
            >
              ↗
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Benefit Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="figma-card p-8 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <h3 className="font-syne font-bold text-2xl text-foreground mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-[15px] leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Quote Card (Figma Exact Spec) */}
        <div className="rounded-2xl border border-border bg-[#102b3d] dark:bg-[#102b3d] bg-sky-100 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="font-syne font-bold text-6xl sm:text-7xl lg:text-8xl text-cyan-accent leading-none mb-4 select-none"
          >
            “
          </div>
          <p className="font-syne font-bold text-2xl sm:text-3xl lg:text-5xl text-foreground leading-[1.18] max-w-4xl tracking-tight">
            No toy projects. No filler tasks. Just 45 days of building real software with real people.
          </p>
        </div>
      </div>
    </section>
  );
}
