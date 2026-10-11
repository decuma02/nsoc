"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Sparkles,
  UserPlus,
  Megaphone,
  GitPullRequest,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Tilt3D } from "@/components/tilt-3d";

interface Milestone {
  step: string;
  phaseId: 1 | 2 | 3;
  phaseName: string;
  date: string;
  title: string;
  description: string;
  actionItems: string[];
  status: "Completed" | "Live Now" | "Upcoming";
  color: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    step: "01",
    phaseId: 1,
    phaseName: "Phase 1: Genesis",
    date: "October 1, 2026",
    title: "Registration Opens",
    description:
      "Participant portal goes live worldwide. Developers, maintainers, and campus ambassadors register their profiles.",
    actionItems: [
      "Sign up via GitHub or Google OAuth",
      "Select your track: Contributor, Kernel, or Ambassador",
      "Join the official Discord & introduce yourself",
    ],
    status: "Live Now",
    color: "#34d399", // Emerald
    icon: UserPlus,
  },
  {
    step: "02",
    phaseId: 1,
    phaseName: "Phase 1: Genesis",
    date: "October 12, 2026",
    title: "Projects Announced",
    description:
      "All 300+ approved production codebases are revealed with issue catalogs, tech stacks, and mentor assignments.",
    actionItems: [
      "Browse projects across Web, AI, Systems, and Mobile",
      "Fork repositories & set up local environments",
      "Attend maintainer onboarding AMAs",
    ],
    status: "Upcoming",
    color: "#38bdf8", // Sky
    icon: Megaphone,
  },
  {
    step: "03",
    phaseId: 2,
    phaseName: "Phase 2: The 45-Day Sprint",
    date: "October 15, 2026",
    title: "Contribution Period Begins",
    description:
      "The official coding sprint kicks off. Contributors claim issues, submit pull requests, and start earning points.",
    actionItems: [
      "Claim issues tagged #nsoc-good-first-issue",
      "Submit clean PRs with descriptive commit histories",
      "Earn leaderboard points for every merged PR",
    ],
    status: "Upcoming",
    color: "#a78bfa", // Purple
    icon: GitPullRequest,
  },
  {
    step: "04",
    phaseId: 2,
    phaseName: "Phase 2: The 45-Day Sprint",
    date: "December 30, 2026",
    title: "Registrations Close",
    description:
      "Final cutoff for new participants to join the sprint. Existing contributors continue racing on the leaderboard.",
    actionItems: [
      "Final registration gate locks",
      "Ensure all project affiliations are locked in",
      "Sprint enters its intense final 15-day sprint",
    ],
    status: "Upcoming",
    color: "#fb7185", // Rose
    icon: Clock,
  },
  {
    step: "05",
    phaseId: 3,
    phaseName: "Phase 3: Grand Finale",
    date: "January 15, 2027",
    title: "Program Ends",
    description:
      "Contribution sprint officially concludes at 23:59 UTC. Code freeze begins; mentors review remaining open PRs.",
    actionItems: [
      "Final PR merge window closes",
      "Automated code originality & authenticity screening",
      "Leaderboard scores frozen for administrative review",
    ],
    status: "Upcoming",
    color: "#2dd4bf", // Teal
    icon: CheckCircle2,
  },
  {
    step: "06",
    phaseId: 3,
    phaseName: "Phase 3: Grand Finale",
    date: "January 2027",
    title: "Results & Awards Announced",
    description:
      "Winners, top rankers, and kernel mentors are celebrated in the global livestream. Cash prizes and swags ship out.",
    actionItems: [
      "Top 10 contributors claim official cash prize grants",
      "Digital verifiable completion certificates issued",
      "Exclusive NSoC winter swag kits dispatched",
    ],
    status: "Upcoming",
    color: "#fcd34d", // Gold
    icon: Trophy,
  },
];

export function TimelineSection() {
  const [activePhase, setActivePhase] = useState<number>(0); // 0 = all
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // On mobile & tablet we always show all milestones directly
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const filteredMilestones =
    isMobile || activePhase === 0
      ? milestones
      : milestones.filter((m) => m.phaseId === activePhase);

  return (
    <section
      id="timeline"
      className="py-20 lg:py-32 relative overflow-hidden border-t border-[var(--border-col)]"
    >
      {/* Background glow highlights */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-sky-500/5 dark:bg-sky-400/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>04 / PROGRAM TIMELINE</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
              The 45-day contribution roadmap.
            </h2>
          </div>

          <p className="font-inter text-muted-foreground text-sm sm:text-base max-w-md">
            From initial registration to the final code merge and awards
            ceremony. Every milestone is built to give contributors clarity and
            direction.
          </p>
        </div>

        {/* Live Sprint Status Banner — hidden completely on mobile & tablet, visible only on desktop */}
        <div className="hidden lg:flex mb-10 p-5 rounded-2xl border border-[var(--border-col)] bg-card/60 backdrop-blur-md items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div>
              <div className="font-mono text-xs text-[var(--accent-teal)] font-semibold uppercase tracking-wider">
                Current Program Status
              </div>
              <div className="font-syne font-bold text-base sm:text-lg text-foreground">
                Registrations are currently open for all tracks
              </div>
            </div>
          </div>

          {/* Phase Filter Switcher — desktop only, cleanly fits without horizontal scroll */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-[var(--border-col)] shrink-0">
            <button
              onClick={() => setActivePhase(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activePhase === 0
                  ? "bg-[var(--accent)] text-[#050a14] font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Milestones (6)
            </button>
            <button
              onClick={() => setActivePhase(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activePhase === 1
                  ? "bg-[var(--accent)] text-[#050a14] font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Phase 1: Genesis
            </button>
            <button
              onClick={() => setActivePhase(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activePhase === 2
                  ? "bg-[var(--accent)] text-[#050a14] font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Phase 2: Sprint
            </button>
            <button
              onClick={() => setActivePhase(3)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activePhase === 3
                  ? "bg-[var(--accent)] text-[#050a14] font-bold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Phase 3: Finale
            </button>
          </div>
        </div>

        {/* Milestone Grid with 3D Tilt and Card Spotlight */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredMilestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isSelected = activeStep === idx;

            return (
              <Tilt3D
                key={milestone.step}
                maxTilt={12}
                scale={1.02}
                enableCelebrationClick={true}
              >
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`card p-6 sm:p-7 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${
                    milestone.status === "Live Now"
                      ? "ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10"
                      : ""
                  }`}
                  style={
                    {
                      "--accent": milestone.color,
                      boxShadow: `var(--shadow-card), 0 0 0 1px ${milestone.color}22, 0 0 28px -6px ${milestone.color}40`,
                    } as React.CSSProperties
                  }
                >
                  {/* Sheen sweep */}
                  <span className="card-sheen" />
                  <span className="card-spotlight" />

                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: `${milestone.color}20`,
                            color: milestone.color,
                            border: `1px solid ${milestone.color}40`,
                          }}
                        >
                          STEP {milestone.step}
                        </span>

                        <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                          {milestone.phaseName}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-1.5">
                        {milestone.status === "Live Now" ? (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground/75">
                            {milestone.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Milestone Icon + Date + Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${milestone.color}15`,
                          borderColor: `${milestone.color}40`,
                          color: milestone.color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <div className="font-mono text-xs text-[var(--accent)] font-medium mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{milestone.date}</span>
                        </div>
                        <h3 className="font-syne font-bold text-xl sm:text-2xl text-foreground leading-tight">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6">
                      {milestone.description}
                    </p>

                    {/* Actionable Contributor Checklist */}
                    <div className="pt-4 border-t border-[var(--border-col)]/60">
                      <div className="font-mono text-[11px] text-foreground font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                        <span>Key Action Items</span>
                      </div>
                      <ul className="space-y-2">
                        {milestone.actionItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs font-inter text-muted-foreground leading-normal"
                          >
                            <span
                              className="font-mono text-[10px] font-bold select-none pt-0.5"
                              style={{ color: milestone.color }}
                            >
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card bottom footer */}
                  <div className="mt-6 pt-4 border-t border-[var(--border-col)]/40 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Click card to celebrate</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: milestone.color }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
