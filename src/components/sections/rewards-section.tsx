"use client";

import React, { useState } from "react";
import { Trophy, Crown, Medal, Award, Gift, Check, Sparkles } from "lucide-react";

export function RewardsSection() {
  const [activeTab, setActiveTab] = useState<"Contributors" | "Project Admins">("Contributors");

  const contributorTiers = [
    {
      tier: "Rank 1",
      tag: "Top prize",
      icon: Crown,
      headerBg: "from-amber-400 to-yellow-500",
      borderGlow: "border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.15)]",
      perks: [
        "NSoC T-Shirt",
        "Unstop T-Shirt",
        "NSoC Cap",
        "Diary, Bookmark & Pen",
        "NSoC Hard Copy Certificate",
        ".xyz Domain",
        "Social Media Recognition",
      ],
    },
    {
      tier: "Top 3",
      tag: "Podium Finishers",
      icon: Trophy,
      headerBg: "from-sky-400 to-cyan-500",
      borderGlow: "border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.15)]",
      perks: [
        "NSoC T-Shirt",
        "Unstop T-Shirt",
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        ".xyz Domain",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
    {
      tier: "Top 5",
      tag: "Elite Builders",
      icon: Medal,
      headerBg: "from-indigo-400 to-sky-400",
      borderGlow: "border-indigo-400/30",
      perks: [
        "NSoC T-Shirt",
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        ".xyz Domain",
        "Social Media Recognition",
      ],
    },
    {
      tier: "Top 10",
      tag: "Honor Roll",
      icon: Award,
      headerBg: "from-teal-400 to-cyan-500",
      borderGlow: "border-teal-400/30",
      perks: [
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        ".xyz Domain",
        "NSoC Digital Certificate",
        "Social Media Recognition",
      ],
    },
  ];

  const adminTiers = [
    {
      tier: "Top Maintainers",
      tag: "High-Volume Reviews",
      icon: Crown,
      headerBg: "from-cyan-400 to-sky-500",
      borderGlow: "border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.15)]",
      perks: [
        "Exclusive NSoC Maintainer Swag Kit",
        "Official NSoC Hard Copy Plaque & Certificate",
        "TruScholar Verified Maintainer Credential",
        "Ecosystem Spotlight & Project Showcase",
        "Direct Sponsor Developer Infrastructure Credits",
        "Social Media Recognition & Tech Talk Invite",
      ],
    },
    {
      tier: "All Approved Project Kernels",
      tag: "Curators & Mentors",
      icon: Award,
      headerBg: "from-sky-400 to-indigo-500",
      borderGlow: "border-sky-400/30",
      perks: [
        "NSoC Project Kernel Swag Pack",
        "NSoC Hard Copy Certificate of Mentorship",
        "TruScholar Digital Certificate",
        "Access to Active Contributor Cohorts",
        "Verified Project Badge on NSoC Directory",
      ],
    },
  ];

  const universalPerks = [
    {
      title: "TruScholar Digital Certificate",
      role: "All participants",
      desc: "Tamper-proof verifiable blockchain credential recognized across tech hiring platforms.",
    },
    {
      title: "NSoC Digital Certificate",
      role: "All participants",
      desc: "Official milestone documentation highlighting merged PRs and code repositories.",
    },
    {
      title: "Badge Point Base",
      role: "All participants",
      desc: "Cumulative developer reputation badge tied to your public NSoC builder profile.",
    },
  ];

  return (
    <section id="rewards" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
            Prizes & Recognition
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            Rewards that <span className="grad-text">feel earned.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Climb the leaderboard and unlock swag, certificates and recognition. Pick a role to see what each rank takes home.
          </p>

          {/* Role Filter Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl glass-card border border-sky-400/25">
            <button
              onClick={() => setActiveTab("Contributors")}
              className={`px-6 py-2.5 rounded-xl font-syne text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === "Contributors"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contributors
            </button>
            <button
              onClick={() => setActiveTab("Project Admins")}
              className={`px-6 py-2.5 rounded-xl font-syne text-xs uppercase tracking-wider font-bold transition-all ${
                activeTab === "Project Admins"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Project Admins
            </button>
          </div>
        </div>

        {/* Tier Cards Grid */}
        {activeTab === "Contributors" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contributorTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.tier}
                  className={`group rounded-3xl glass-card p-6 border ${tier.borderGlow} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-sky-400/20 bg-sky-500/10 text-sky-400 font-semibold">
                        {tier.tag}
                      </span>
                    </div>

                    <h3 className="font-syne text-2xl font-extrabold text-foreground mb-4">
                      {tier.tier}
                    </h3>

                    <div className="space-y-2.5 pt-3 border-t border-sky-400/15 mb-6">
                      {tier.perks.map((perk) => (
                        <div key={perk} className="flex items-start gap-2 text-xs text-foreground/90">
                          <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-muted-foreground text-center">
                    Verified Swag & Shipped Items
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {adminTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.tier}
                  className={`group rounded-3xl glass-card p-8 border ${tier.borderGlow} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/20 bg-sky-500/10 text-sky-400 font-semibold">
                        {tier.tag}
                      </span>
                    </div>

                    <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                      {tier.tier}
                    </h3>

                    <div className="space-y-3 pt-4 border-t border-sky-400/15 mb-6">
                      {tier.perks.map((perk) => (
                        <div key={perk} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Universal Perks: "Every participant takes home these." */}
        <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-sky-400/20">
          <div className="flex items-center gap-2 mb-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Guaranteed Recognition</span>
          </div>
          <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-foreground mb-8">
            Every participant takes home <span className="grad-text">these.</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universalPerks.map((up) => (
              <div
                key={up.title}
                className="p-6 rounded-2xl border border-sky-400/20 bg-background/50 hover:border-sky-400/40 transition-colors"
              >
                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-400/20 mb-3">
                  {up.role}
                </div>
                <h4 className="font-syne font-bold text-lg text-foreground mb-2">
                  {up.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {up.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
