"use client";

import React from "react";
import { Terminal, GitBranch, Flag, ArrowUpRight } from "lucide-react";

interface RolesSectionProps {
  onSelectRole: (role: string) => void;
}

export function RolesSection({ onSelectRole }: RolesSectionProps) {
  const roles = [
    {
      id: "Contributor",
      tag: "CONTRIBUTOR",
      title: "You write code.",
      icon: Terminal,
      responsibilities: [
        "Pick a track that matches your stack",
        "Browse curated open issues from real projects",
        "Submit PRs, get reviewed, earn points per merge",
        "Climb the leaderboard, claim prizes",
      ],
      cta: "Join as Contributor",
    },
    {
      id: "Project Kernel",
      tag: "PROJECT KERNEL",
      title: "You bring the project.",
      icon: GitBranch,
      responsibilities: [
        "Submit your open source project for the program",
        "Receive dedicated issues and motivated contributors",
        "Maintain code quality with our review guidelines",
        "Grow your project's active maintainer base",
      ],
      cta: "Submit Your Project",
    },
    {
      id: "Campus Ambassador",
      tag: "CAMPUS AMBASSADOR",
      title: "You lead the campus.",
      icon: Flag,
      responsibilities: [
        "Represent NSoC as the official face on your campus",
        "Host meetups, workshops, and sprint watch parties",
        "Onboard student developers and first-time contributors",
        "Unlock exclusive leadership perks and recommendations",
      ],
      cta: "Apply as Ambassador",
    },
  ];

  return (
    <section id="roles" className="py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
            PARTICIPATION ROLES
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-5xl text-foreground tracking-tight">
            Choose your track in the sprint.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="figma-card p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Role Identity Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] font-medium tracking-wider text-cyan-accent">
                      {role.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-navy-accent/50 dark:bg-[#102b3d] border border-border flex items-center justify-center text-cyan-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne font-bold text-3xl text-foreground mb-6">
                    {role.title}
                  </h3>

                  {/* Responsibilities list with arrow bullet */}
                  <ul className="space-y-4 mb-8">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-syne text-cyan-accent text-sm font-semibold select-none pt-0.5">
                          ↗
                        </span>
                        <span className="font-inter text-[15px] leading-relaxed text-muted-foreground">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Role CTA button */}
                <button
                  onClick={() => onSelectRole(role.id)}
                  className="w-full figma-btn-secondary py-3.5 text-sm font-semibold mt-4"
                >
                  <span>{role.cta}</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-accent" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
