"use client";

import React, { useState } from "react";
import { Check, Sparkles, Trophy, Award, Medal, FileText, ShieldCheck, Star } from "lucide-react";
import { Tilt3D } from "@/components/tilt-3d";

export function RewardsSection() {
  const [activeTab, setActiveTab] = useState<"Contributors" | "Project Admins">("Contributors");
  const [animKey, setAnimKey] = useState(0);

  const switchTab = (tab: "Contributors" | "Project Admins") => {
    setActiveTab(tab);
    setAnimKey((k) => k + 1);
  };

  const contributorTiers = [
    {
      rank: "Rank 1",
      numeral: "1",
      count: "07 rewards",
      isTopPrize: true,
      icon: Trophy,
      perks: [
        "NSoC T-Shirt",
        "Unstop T-Shirt · Unstop",
        "NSoC Cap",
        "Diary, Bookmark & Pen",
        "NSoC Hard Copy Certificate",
        ".xyz Domain",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 3",
      numeral: "3",
      count: "07 rewards",
      isTopPrize: false,
      icon: Medal,
      perks: [
        "NSoC T-Shirt",
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        ".xyz Domain",
        "NSoC Hard Copy Certificate",
        "Unstop T-Shirt · Unstop",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 5",
      numeral: "5",
      count: "04 rewards",
      isTopPrize: false,
      icon: Award,
      perks: [
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 10",
      numeral: "10",
      count: "03 rewards",
      isTopPrize: false,
      icon: Sparkles,
      perks: [
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
  ];

  const adminTiers = [
    {
      rank: "Rank 1",
      numeral: "1",
      count: "07 rewards",
      isTopPrize: true,
      icon: Trophy,
      perks: [
        "NSoC T-Shirt",
        "Unstop T-Shirt · Unstop",
        "NSoC Hard Copy Certificate",
        "NSoC Cap",
        "Diary, Bookmark & Pen",
        ".xyz Domain",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 3",
      numeral: "3",
      count: "07 rewards",
      isTopPrize: false,
      icon: Medal,
      perks: [
        "NSoC T-Shirt",
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        ".xyz Domain",
        "NSoC Hard Copy Certificate",
        "Unstop T-Shirt · Unstop",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 5",
      numeral: "5",
      count: "04 rewards",
      isTopPrize: false,
      icon: Award,
      perks: [
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
  ];

  const currentTiers = activeTab === "Contributors" ? contributorTiers : adminTiers;

  const universalRewards = [
    {
      title: "TruScholar Digital Certificate",
      category: "All participants",
      icon: ShieldCheck,
    },
    {
      title: "NSoC Digital Certificate",
      category: "All participants",
      icon: FileText,
    },
    {
      title: "Badge Point Base",
      category: "All participants",
      icon: Star,
    },
  ];

  return (
    <section
      id="rewards"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        borderTop: "1px solid var(--border-col)",
        borderBottom: "1px solid var(--border-col)",
      }}
    >
      {/* Ambient background blur blobs from nsoc.in */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-1/4 size-[420px] rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl animate-blob-drift" />
        <div className="absolute right-0 bottom-10 size-[380px] rounded-full bg-teal-500/10 dark:bg-teal-400/5 blur-3xl animate-blob-drift-delay" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs uppercase tracking-widest border-sky-400/30 bg-sky-400/10 text-sky-400">
            <Sparkles className="size-3.5 animate-spin [animation-duration:10s]" />
            03 / Prizes &amp; Recognition
          </div>
          <h2
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4"
            style={{ color: "var(--fg)" }}
          >
            Rewards that <span className="grad-text">feel earned.</span>
          </h2>
          <p
            className="font-inter text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Climb the leaderboard and unlock swag, certificates and recognition. Pick a role to see what each rank takes home.
          </p>

          {/* Tab Controls with animated sliding pill like nsoc.in */}
          <div className="relative mt-8 inline-flex rounded-full border p-1 dark:border-white/10 dark:bg-white/[0.04] border-[#b9d7ec] bg-white/70 backdrop-blur-sm">
            {/* Sliding pill background */}
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full transition-transform duration-200 ease-in-out bg-sky-500 dark:bg-sky-400 shadow-md shadow-sky-500/30"
              style={{
                transform: activeTab === "Contributors" ? "translateX(0)" : "translateX(calc(100% + 4px))",
              }}
            />
            <button
              onClick={() => switchTab("Contributors")}
              className={`relative z-10 rounded-full px-5 sm:px-7 py-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                activeTab === "Contributors"
                  ? "text-white dark:text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contributors
            </button>
            <button
              onClick={() => switchTab("Project Admins")}
              className={`relative z-10 rounded-full px-5 sm:px-7 py-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                activeTab === "Project Admins"
                  ? "text-white dark:text-black"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Project Admins
            </button>
          </div>
        </div>

        {/* Reward Tiers Grid — fades in on tab switch */}
        <div
          key={animKey}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20 animate-tab-fade-in ${
            currentTiers.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {currentTiers.map((tier) => {
            const TierIcon = tier.icon;
            const tierStyles: Record<string, string> = {
              "Rank 1": "border-amber-400/60 dark:border-amber-400/50 shadow-[0_4px_30px_rgba(251,191,36,0.14)]",
              "Top 3": "border-sky-400/50 dark:border-sky-400/40 shadow-[0_4px_25px_rgba(56,189,248,0.1)]",
              "Top 5": "border-teal-400/45 dark:border-teal-400/35 shadow-[0_4px_22px_rgba(45,212,191,0.08)]",
              "Top 10": "border-indigo-400/45 dark:border-indigo-400/35 shadow-[0_4px_20px_rgba(129,140,248,0.08)]",
            };
            const tierStyle = tierStyles[tier.rank] || (tier.isTopPrize ? tierStyles["Rank 1"] : "border-sky-400/40 shadow-[0_4px_20px_rgba(56,189,248,0.08)]");

            return (
              <Tilt3D key={tier.rank} maxTilt={12}>
                <div
                  className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 card h-full relative overflow-hidden group ${tierStyle} ${
                    tier.isTopPrize ? "card-rank1" : ""
                  }`}
                >
                  {/* Subtle watermark numeral in top right */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-4 font-syne font-extrabold text-7xl opacity-5 select-none pointer-events-none"
                  >
                    {tier.numeral}
                  </span>

                  <div>
                    {/* Reward Meta & Top Prize Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono text-xs font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        {tier.count}
                      </span>
                      {tier.isTopPrize ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 font-bold">
                          <Sparkles className="w-3 h-3" /> Top prize
                        </span>
                      ) : (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-card border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                          <TierIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Rank Name */}
                    <h3
                      className="font-syne font-bold text-2xl sm:text-3xl mb-6 flex items-center gap-2"
                      style={{ color: "var(--fg)" }}
                    >
                      {tier.isTopPrize && <Trophy className="w-6 h-6 text-amber-400 shrink-0" />}
                      {tier.rank}
                    </h3>

                    {/* Perk Checklist */}
                    <ul className="space-y-3.5 mb-6">
                      {tier.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check
                            className="w-4 h-4 shrink-0 mt-0.5 text-sky-400"
                          />
                          <span
                            className="font-inter text-sm leading-tight text-foreground/90"
                          >
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>

        {/* Universal Participant Rewards with sheen sweep and rotating icons */}
        <div className="pt-12 border-t" style={{ borderColor: "var(--border-col)" }}>
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 dark:bg-white/10 bg-[#b9d7ec]" />
            <h3
              className="font-syne text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center"
              style={{ color: "var(--fg)" }}
            >
              Every participant takes home <span className="text-sky-400">these.</span>
            </h3>
            <span className="h-px flex-1 dark:bg-white/10 bg-[#b9d7ec]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {universalRewards.map((reward) => {
              const Icon = reward.icon;
              return (
                <Tilt3D key={reward.title} maxTilt={10}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 dark:border-sky-400/25 dark:bg-white/[0.02] border-sky-400/30 bg-white/80 shadow-[0_4px_18px_rgba(56,189,248,0.06)] backdrop-blur-sm hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 h-full"
                  >
                    {/* Diagonal sheen sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100"
                    />

                    <div className="relative flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-sky-400/30 bg-sky-400/10 text-sky-400 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icon className="size-6" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-sky-400 font-semibold">
                          {reward.category}
                        </p>
                        <h4
                          className="mt-1 font-syne text-base sm:text-lg font-bold tracking-tight leading-tight"
                          style={{ color: "var(--fg)" }}
                        >
                          {reward.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Tilt3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
