"use client";

import React, { useEffect, useRef } from "react";
import { Terminal, GitBranch, Flag, ArrowUpRight } from "lucide-react";

interface RolesSectionProps {
  onSelectRole: (role: string) => void;
}

export function RolesSection({ onSelectRole }: RolesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll(".role-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    };

    init();
  }, []);

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
        "Curate issues fit for contributors of all levels",
        "Review PRs and mentor contributors through your codebase",
        "Get meaningful contributions — and give someone their first real merge",
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
        "Onboard & mentor student peers into open source",
        "Drive registrations, build cohorts, host meetups",
        "Earn exclusive swags, leadership certificates & perks",
      ],
      cta: "Apply as Ambassador",
    },
  ];

  return (
    <section id="roles" ref={sectionRef} className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            PARTICIPATION ROLES
          </div>
          <h2
            className="font-syne font-bold text-3xl sm:text-5xl tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Choose your track in the sprint.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="role-card card p-8 sm:p-9 flex flex-col justify-between"
              >
                <div>
                  {/* Role Identity Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-[11px] font-semibold tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      {role.tag}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: "var(--navy)",
                        borderColor: "var(--border-col)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-syne font-bold text-3xl mb-6"
                    style={{ color: "var(--fg)" }}
                  >
                    {role.title}
                  </h3>

                  {/* Responsibilities list with arrow bullet */}
                  <ul className="space-y-4 mb-8">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="font-syne text-sm font-semibold select-none pt-0.5 shrink-0"
                          style={{ color: "var(--accent)" }}
                        >
                          ↗
                        </span>
                        <span
                          className="font-inter text-[15px] leading-relaxed"
                          style={{ color: "var(--muted-fg)" }}
                        >
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Role CTA button */}
                <button
                  onClick={() => onSelectRole(role.id)}
                  className="w-full btn-secondary py-3.5 text-sm font-semibold mt-4"
                >
                  <span>{role.cta}</span>
                  <ArrowUpRight className="w-4 h-4" style={{ color: "var(--accent)" }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
