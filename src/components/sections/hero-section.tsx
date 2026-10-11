"use client";

import React from "react";
import { Sparkles, ArrowRight, GitPullRequest, ShieldCheck, CheckCircle2, Terminal, Code2, Users2 } from "lucide-react";
import { WinterSnowflake } from "@/components/brand-icons";

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Aurora & Winter Ambient Blobs */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-sky-500/20 via-cyan-400/15 to-indigo-500/10 rounded-full blur-[110px] pointer-events-none animate-blob-drift -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-36 -left-32 w-[350px] sm:w-[500px] h-[350px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none animate-blob-drift-delay -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-52 -right-32 w-[350px] sm:w-[550px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none animate-blob-drift-slow -z-10"
      />

      {/* Decorative Grid Lines Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80d_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-To-Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Sprint Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 dark:bg-sky-400/10 backdrop-blur-md text-sky-600 dark:text-sky-300 font-mono text-xs mb-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="font-semibold">NSoC ’26</span>
              <span className="text-muted-foreground/60">•</span>
              <span>45-Day Open Source Sprint</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-cyan-500 dark:text-cyan-300">
                <WinterSnowflake className="w-3 h-3 text-cyan-400" /> Winter Edition
              </span>
            </div>

            {/* Display Typography */}
            <h1
              className="font-syne text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-syne), 'Syne', ui-sans-serif, system-ui, sans-serif",
                color: "var(--fg)",
              }}
            >
              Nexus <br />
              <span className="grad-text">Spring of</span> <br />
              Code.
            </h1>

            {/* Exact Extract Copy */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-inter"
              style={{
                fontFamily: "var(--font-inter), 'Inter', ui-sans-serif, system-ui, sans-serif",
                color: "var(--muted-fg)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
                lineHeight: "1.75",
              }}
            >
              A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code. No toy projects. No filler tasks. Just meaningful work and a community that grows together.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onOpenRegister}
                className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-syne font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join now!</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#benefits"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-sky-400/25 dark:bg-[#071326]/60 bg-sky-50/70 hover:border-sky-400/60 hover:bg-sky-500/10 text-foreground font-syne font-bold text-sm tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Learn more</span>
              </a>
            </div>

            {/* Authentic Extract Element: "Scanning for deepfakes" */}
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

          {/* Right Column: High-Fidelity Winter Codebase Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel p-5 sm:p-6 shadow-2xl border border-sky-400/20">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-sky-400/15">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">nsoc-winter-runner.sh</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-sky-500 dark:text-sky-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Repo</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-background/60 border border-sky-400/10 space-y-1.5">
                  <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                    <span className="flex items-center gap-1 text-sky-400 font-semibold">
                      <GitPullRequest className="w-3.5 h-3.5" /> PR #142 Merged
                    </span>
                    <span className="text-emerald-400 font-medium">+350 Points</span>
                  </div>
                  <p className="text-foreground font-sans font-medium text-xs">
                    feat(distributed-cache): implement winter telemetry & edge sync
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                    <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400">Arkham Experience</span>
                    <span>Reviewed by @lead-kernel</span>
                  </div>
                </div>

                {/* Real-time Code Diff Preview */}
                <div className="p-3 rounded-xl bg-black/40 text-sky-200/90 text-[11px] border border-sky-500/15 space-y-1">
                  <div className="text-muted-foreground/60">// verified pipeline checks</div>
                  <div className="text-emerald-400">+ ✓ 42 unit test suites passed</div>
                  <div className="text-emerald-400">+ ✓ 0 dummy code / 100% production ready</div>
                  <div className="text-sky-300">+ ✓ Merged commit tagged: release-v2.6-winter</div>
                </div>

                {/* Live Stats Snippet */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 rounded-xl border border-sky-400/15 bg-background/40">
                    <div className="text-[10px] text-muted-foreground uppercase">Sprint</div>
                    <div className="font-syne font-bold text-base text-sky-400">45 Days</div>
                  </div>
                  <div className="p-2.5 rounded-xl border border-sky-400/15 bg-background/40">
                    <div className="text-[10px] text-muted-foreground uppercase">Builders</div>
                    <div className="font-syne font-bold text-base text-cyan-400">10K+</div>
                  </div>
                  <div className="p-2.5 rounded-xl border border-sky-400/15 bg-background/40">
                    <div className="text-[10px] text-muted-foreground uppercase">Repos</div>
                    <div className="font-syne font-bold text-base text-sky-300">300+</div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Corner Glow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 w-28 h-28 bg-sky-500/20 rounded-full blur-2xl pointer-events-none -z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
