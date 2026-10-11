"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return (
    <section id="overview" className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden">
      {/* Aurora Ambient Background Layers */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1100px] h-[550px] bg-gradient-to-b from-sky-400/15 via-teal-400/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 animate-aurora"
      />
      <div
        aria-hidden="true"
        className="absolute top-40 right-[-10%] w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Copy & Right Art Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline and Call-To-Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Sprint Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-navy-accent/50 dark:bg-[#102b3d] backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5eead4] animate-pulse" />
              <span className="font-mono text-xs font-normal text-foreground">
                45-Day Open Source Sprint
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.96] text-foreground mb-3">
              Nexus Spring of Code.
            </h1>

            {/* Subtitle tag */}
            <div className="font-mono text-xl sm:text-2xl text-cyan-accent mb-6 font-normal tracking-tight">
              ’26 — Winter Edition
            </div>

            {/* Description Body */}
            <p className="font-inter text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mb-8">
              A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code. No toy projects. No filler tasks. Just meaningful work and a community that grows together.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto figma-btn-primary px-8 py-4 text-base font-semibold"
              >
                <span>Join now!</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <a
                href="#about"
                className="w-full sm:w-auto figma-btn-secondary px-8 py-4 text-base font-semibold"
              >
                <span>Learn more</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-accent" />
              </a>
            </div>
          </div>

          {/* Right Column: Winter Panda Portal (Figma Art Direction) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] aspect-square rounded-2xl border border-cyan-300 dark:border-[#7dd3fc]/40 bg-[#f5f5f5] dark:bg-[#07111f] shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
              {/* Internal Aurora Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-radial from-[#7dd3fc]/20 via-[#5eead4]/10 to-transparent blur-2xl pointer-events-none"
              />

              {/* Top Meta Tag */}
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
                  OFFICIAL ARTWORK
                </span>
                <span className="w-2 h-2 rounded-full bg-[#7dd3fc]" />
              </div>

              {/* Winter Panda Floating Motion Layer */}
              <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center my-auto z-10 animate-panda-float">
                <div className="relative w-full h-full">
                  <Image
                    src="/winter-panda-1.png"
                    alt="NSoC Winter Edition Mascot"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Edition Caption */}
              <div className="flex items-center justify-between pt-4 border-t border-border z-10">
                <span className="font-mono text-xs font-semibold text-foreground">
                  NSoC ’26
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  WINTER EDITION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Program Statistics Row (Figma Exact 3 Metrics) */}
        <div className="mt-16 sm:mt-24 border-y border-border py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 text-center md:text-left">
            {/* Metric 1 */}
            <div className="flex flex-col md:border-r border-border md:pr-6">
              <span className="font-syne font-bold text-5xl sm:text-6xl text-foreground">
                45
              </span>
              <span className="font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Day Sprint
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col md:border-r border-border md:px-6">
              <span className="font-syne font-bold text-5xl sm:text-6xl text-foreground">
                10K+
              </span>
              <span className="font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Expected Participants
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col md:pl-6">
              <span className="font-syne font-bold text-5xl sm:text-6xl text-foreground">
                300+
              </span>
              <span className="font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Expected Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
