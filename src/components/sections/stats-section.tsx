"use client";

import React from "react";
import { Calendar, Users, FolderGit2, Quote } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      value: "45",
      label: "Day Sprint",
      sublabel: "Non-stop production shipping",
      icon: Calendar,
      color: "from-sky-500 to-cyan-400",
    },
    {
      value: "10K+",
      label: "Expected Participants",
      sublabel: "Developers, students & hackers",
      icon: Users,
      color: "from-cyan-400 to-teal-300",
    },
    {
      value: "300+",
      label: "Expected Projects",
      sublabel: "Real repos curated by kernels",
      icon: FolderGit2,
      color: "from-sky-400 to-indigo-400",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote Banner */}
        <div className="mb-14 relative rounded-2xl glass-card p-6 sm:p-10 text-center border border-sky-400/20 max-w-4xl mx-auto">
          <div className="flex justify-center mb-3 text-sky-400">
            <Quote className="w-8 h-8 opacity-60" />
          </div>
          <blockquote className="font-syne text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug">
            “No toy projects. No filler tasks. Just 45 days of work that lands in production — and a community that levels up together.”
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-sky-500 dark:text-sky-300">
            <span>— The Nexus Spring of Code Manifesto</span>
          </div>
        </div>

        {/* 3 Major Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative rounded-2xl glass-card p-8 border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    Verified
                  </span>
                </div>

                <div className={`font-syne text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>

                <h3 className="font-syne text-xl font-bold text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
