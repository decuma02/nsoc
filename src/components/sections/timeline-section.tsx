"use client";

import React from "react";
import { Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { WinterSnowflake } from "@/components/brand-icons";

export function TimelineSection() {
  const steps = [
    {
      step: "Step 01 / 06",
      date: "October 1, 2026",
      title: "Registration Opens",
      description: "Registrations are open on October 1st and anyone can register now to join the program.",
      status: "completed",
    },
    {
      step: "Step 02 / 06",
      date: "October 12, 2026",
      title: "Projects Announced",
      description: "All approved projects are published and available for contributors to explore.",
      status: "active",
    },
    {
      step: "Step 03 / 06",
      date: "October 15, 2026",
      title: "Contribution Period Begins",
      description: "Contributors start working on their selected projects.",
      status: "upcoming",
    },
    {
      step: "Step 04 / 06",
      date: "To Be Declared",
      title: "Registrations Close",
      description: "Final deadline for new participant registrations.",
      status: "upcoming",
    },
    {
      step: "Step 05 / 06",
      date: "December 30, 2026",
      title: "Program Ends",
      description: "Contribution period concludes and final submissions are due.",
      status: "upcoming",
    },
    {
      step: "Step 06 / 06",
      date: "January 15, 2027",
      title: "Results Announced",
      description: "Winners and top contributors are recognised and results are declared.",
      status: "upcoming",
    },
  ];

  return (
    <section id="timeline" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
            Program Milestones
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            Here&apos;s how we <span className="grad-text">planned.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Follow the journey from registration to results. Each milestone brings us closer to building something amazing together.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item) => {
            const isCompleted = item.status === "completed";
            const isActive = item.status === "active";

            return (
              <div
                key={item.step}
                className={`group relative rounded-3xl glass-card p-7 border transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.2)] bg-sky-500/5"
                    : isCompleted
                    ? "border-emerald-400/30"
                    : "border-sky-400/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-500 dark:text-sky-300 border border-sky-400/20">
                    {item.step}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    {isActive ? (
                      <span className="flex items-center gap-1 text-sky-400 font-semibold animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        In Progress
                      </span>
                    ) : isCompleted ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Complete
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>

                <div className="font-mono text-sm font-bold text-sky-500 dark:text-sky-400 mb-1">
                  {item.date}
                </div>

                <h3 className="font-syne text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  {item.description}
                </p>

                {isActive && (
                  <div className="mt-4 pt-3 border-t border-sky-400/20 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                    <WinterSnowflake className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
                    <span>Current Active Milestone</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
