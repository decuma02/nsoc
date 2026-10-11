"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

export function RewardsSection() {
  const [activeTab, setActiveTab] = useState<"Contributors" | "Project Admins">("Contributors");

  const contributorTiers = [
    {
      rank: "Rank 1",
      count: "07 rewards",
      isTopPrize: true,
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
      count: "07 rewards",
      isTopPrize: false,
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
      count: "04 rewards",
      isTopPrize: false,
      perks: [
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
    {
      rank: "Top 10",
      count: "03 rewards",
      isTopPrize: false,
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
      count: "07 rewards",
      isTopPrize: true,
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
      count: "07 rewards",
      isTopPrize: false,
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
      count: "04 rewards",
      isTopPrize: false,
      perks: [
        "Diary, Bookmark & Pen",
        "NSoC Cap",
        "NSoC Hard Copy Certificate",
        "Social Media Recognition",
      ],
    },
  ];

  const currentTiers = activeTab === "Contributors" ? contributorTiers : adminTiers;

  return (
    <section id="rewards" className="py-20 lg:py-28 bg-[#0b1727]/40 dark:bg-[#0b1727]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
            03 / Prizes & Recognition
          </div>
          <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-4">
            Rewards that feel earned.
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed">
            Climb the leaderboard and unlock swag, certificates and recognition. Pick a role to see what each rank takes home.
          </p>
        </div>

        {/* Tab Controls (Figma: 263x56 rounded-xl) */}
        <div className="inline-flex p-1 rounded-xl bg-card border border-border mb-12">
          <button
            onClick={() => setActiveTab("Contributors")}
            className={`px-5 py-2.5 rounded-lg font-inter text-sm font-semibold transition-all ${
              activeTab === "Contributors"
                ? "bg-navy-accent dark:bg-[#102b3d] text-cyan-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contributors
          </button>
          <button
            onClick={() => setActiveTab("Project Admins")}
            className={`px-5 py-2.5 rounded-lg font-inter text-sm font-semibold transition-all ${
              activeTab === "Project Admins"
                ? "bg-navy-accent dark:bg-[#102b3d] text-cyan-accent shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Project Admins
          </button>
        </div>

        {/* Reward Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {currentTiers.map((tier) => (
            <div
              key={tier.rank}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                tier.isTopPrize
                  ? "bg-gradient-to-b from-[#102b3d]/80 to-card border-2 border-[#7dd3fc] shadow-lg shadow-[#7dd3fc]/10"
                  : "figma-card"
              }`}
            >
              <div>
                {/* Reward Meta & Top Prize Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-cyan-accent">
                    {tier.count}
                  </span>
                  {tier.isTopPrize && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#7dd3fc]/20 text-cyan-accent border border-[#7dd3fc]/40">
                      <Sparkles className="w-3 h-3" /> Top prize
                    </span>
                  )}
                </div>

                {/* Rank Name */}
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-foreground mb-6">
                  {tier.rank}
                </h3>

                {/* Perk Checklist */}
                <ul className="space-y-3.5 mb-6">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span className="font-inter text-sm text-foreground/90 leading-tight">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Universal Participant Rewards (Figma Exact Spec) */}
        <div className="pt-8 border-t border-border">
          <h3 className="font-syne font-bold text-2xl sm:text-3xl text-foreground mb-8">
            Every participant takes home these.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="figma-card p-6 flex flex-col justify-center">
              <span className="font-mono text-xs text-cyan-accent mb-2">
                All participants
              </span>
              <h4 className="font-inter font-semibold text-lg text-foreground">
                TruScholar Digital Certificate
              </h4>
            </div>

            <div className="figma-card p-6 flex flex-col justify-center">
              <span className="font-mono text-xs text-cyan-accent mb-2">
                All participants
              </span>
              <h4 className="font-inter font-semibold text-lg text-foreground">
                NSoC Digital Certificate
              </h4>
            </div>

            <div className="figma-card p-6 flex flex-col justify-center">
              <span className="font-mono text-xs text-cyan-accent mb-2">
                All participants
              </span>
              <h4 className="font-inter font-semibold text-lg text-foreground">
                Badge Point Base
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
