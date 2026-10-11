"use client";

import React from "react";
import { UserCheck, Compass, GitMerge, Award, ArrowRight } from "lucide-react";

export function StepsSection({ onOpenRegister }: { onOpenRegister: () => void }) {
  const steps = [
    {
      step: "01",
      title: "Register",
      description: "Create your profile. Pick a track that matches your skills and ambition.",
      icon: UserCheck,
      details: "Quick sign-up with GitHub authentication and track selection.",
    },
    {
      step: "02",
      title: "Explore",
      description: "Browse curated open issues across repos waiting for contributors.",
      icon: Compass,
      details: "Filter by language, domain difficulty, and issue priority.",
    },
    {
      step: "03",
      title: "Contribute",
      description: "Submit PRs. Get reviewed. Earn points for every merge that lands.",
      icon: GitMerge,
      details: "Direct architectural mentorship and prompt PR evaluations.",
    },
    {
      step: "04",
      title: "Win",
      description: "Top builders claim prizes, swag, and direct job referrals.",
      icon: Award,
      details: "Unlock physical merchandise, digital credentials, and leader recognition.",
    },
  ];

  return (
    <section id="how-to-start" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
              Execution Roadmap
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              How to Start. <span className="grad-text">From 0 to Merge.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            Four streamlined phases engineered to take you from onboarding straight into high-impact code reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative rounded-2xl glass-card p-6 sm:p-7 border border-sky-400/20 hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-syne text-3xl sm:text-4xl font-extrabold text-sky-400/40 group-hover:text-sky-400 transition-colors">
                      {s.step}
                    </span>
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-syne text-2xl font-bold text-foreground mb-2">
                    {s.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-400/15">
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                    {s.details}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-syne font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-transform hover:scale-105 active:scale-95"
          >
            <span>Begin Step 01: Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
