"use client";

import React from "react";
import { Code2, GitFork, Megaphone, CheckCircle2, ArrowRight } from "lucide-react";

interface RolesSectionProps {
  onSelectRole: (role: string) => void;
}

export function RolesSection({ onSelectRole }: RolesSectionProps) {
  const roles = [
    {
      id: "Contributor",
      tag: "contributor",
      subhead: "You write code.",
      title: "Contributor",
      description: "Dive into real open source codebases, solve challenging engineering problems, and get your code reviewed by real maintainers.",
      icon: Code2,
      bulletPoints: [
        "Browse curated open issues from real projects",
        "Submit PRs, get reviewed, earn points per merge",
        "Climb the leaderboard, claim prizes",
      ],
      badge: "Open for Developers",
      buttonText: "Apply as Contributor",
      gradient: "from-sky-500/20 to-cyan-500/10",
      accentBorder: "border-sky-400/40",
    },
    {
      id: "Project Kernel",
      tag: "project kernel",
      subhead: "Maintain & scale.",
      title: "Project Kernel",
      description: "Bring your open source project to a passionate community of thousands of skilled contributors and accelerate your roadmap.",
      icon: GitFork,
      bulletPoints: [
        "Submit your open source project for the program",
        "Curate issues fit for contributors of all levels",
        "Review PRs and mentor contributors through your codebase",
        "Get meaningful contributions — and give someone their first real merge",
      ],
      badge: "For Maintainers",
      buttonText: "Submit Your Project",
      gradient: "from-cyan-500/20 to-teal-500/10",
      accentBorder: "border-cyan-400/40",
    },
    {
      id: "Campus Ambassador",
      tag: "campus ambassador",
      subhead: "Lead on campus.",
      title: "Campus Ambassador",
      description: "Spearhead developer culture at your university or institution, organize local cohorts, and inspire the next generation.",
      icon: Megaphone,
      bulletPoints: [
        "Represent NSoC as the official face on your campus",
        "Onboard & mentor student peers into open source",
        "Drive registrations, build cohorts, host meetups",
        "Earn exclusive swags, leadership certificates & perks",
      ],
      badge: "Student Leaders",
      buttonText: "Lead on Campus",
      gradient: "from-indigo-500/20 to-sky-500/10",
      accentBorder: "border-indigo-400/40",
    },
  ];

  return (
    <section id="roles" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
            Participation Pathways
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            Pick your role. <span className="grad-text">Shape the ecosystem.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Whether you want to build features, guide fellow developers through your project, or ignite an open source revolution on campus, NSoC has a dedicated track for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="group relative rounded-3xl glass-card p-8 border border-sky-400/20 hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 text-sky-400 font-semibold">
                      {r.badge}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-sky-400 uppercase tracking-widest mb-1">
                    {r.tag} • {r.subhead}
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                    {r.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">
                    {r.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-sky-400/15 mb-8">
                    {r.bulletPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onSelectRole(r.id)}
                    className="w-full btn-shine py-3 px-5 rounded-xl border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-foreground font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>{r.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
