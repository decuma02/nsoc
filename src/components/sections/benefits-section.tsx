"use client";

import React from "react";
import { GitBranch, Compass, Trophy, Users, Check } from "lucide-react";

export function BenefitsSection() {
  const pillars = [
    {
      title: "Real projects.",
      description:
        "Project Kernels bring their actual codebases — not dummy repos or toy problems. Every issue you close ships to real users.",
      icon: GitBranch,
      highlights: ["No dummy repos", "Production deployments", "Real end-user impact"],
    },
    {
      title: "Structured guidance.",
      description:
        "Admins mentor contributors through the review process. You don't just get a comment — you get context, feedback, and a reason.",
      icon: Compass,
      highlights: ["Actionable PR reviews", "Architectural guidance", "1-on-1 maintainer context"],
    },
    {
      title: "Earned recognition.",
      description:
        "Points for every merged PR. A public leaderboard. A profile that shows exactly what you built and where it landed.",
      icon: Trophy,
      highlights: ["Public leaderboard", "Points per merge", "Verified developer profile"],
    },
    {
      title: "A real community.",
      description:
        "45 days of builders, maintainers, and contributors working in the same direction. The connections outlast the program.",
      icon: Users,
      highlights: ["45-day continuous sprint", "Global peer network", "Long-term collaboration"],
    },
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
            Core Philosophy
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-4">
            Open source, the way it was <br className="hidden sm:inline" />
            <span className="grad-text">meant to be.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Eliminating superficial filler issues and toy repositories. We built NSoC around authentic engineering rigors, structured code reviews, and tangible outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-2xl glass-card p-8 border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-sky-400 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-sky-400/70 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-syne text-2xl font-bold text-foreground mb-3 group-hover:text-sky-400 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-400/15 flex flex-wrap gap-2">
                  {pillar.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-400/15"
                    >
                      <Check className="w-3 h-3 text-sky-400" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
