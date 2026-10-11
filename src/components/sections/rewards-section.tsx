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
    <section
      id="rewards"
      className="py-20 lg:py-28"
      style={{
        backgroundColor: "var(--navy)",
        borderTop: "1px solid var(--border-col)",
        borderBottom: "1px solid var(--border-col)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            03 / Prizes & Recognition
          </div>
          <h2
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4"
            style={{ color: "var(--fg)" }}
          >
            Rewards that feel earned.
          </h2>
          <p
            className="font-inter text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--muted-fg)" }}
          >
            Climb the leaderboard and unlock swag, certificates and recognition. Pick a role to see what each rank takes home.
          </p>
        </div>

        {/* Tab Controls with Smooth Transition Indicator */}
        <div
          className="inline-flex p-1 rounded-xl mb-12 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-col)",
          }}
        >
          <button
            onClick={() => setActiveTab("Contributors")}
            className={`px-5 py-2.5 rounded-lg font-inter text-sm font-semibold transition-all duration-200 ${
              activeTab === "Contributors"
                ? "shadow-sm"
                : "hover:text-foreground"
            }`}
            style={{
              backgroundColor: activeTab === "Contributors" ? "var(--navy)" : "transparent",
              color: activeTab === "Contributors" ? "var(--accent)" : "var(--muted-fg)",
              border: activeTab === "Contributors" ? "1px solid var(--border-col)" : "1px solid transparent",
            }}
          >
            Contributors
          </button>
          <button
            onClick={() => setActiveTab("Project Admins")}
            className={`px-5 py-2.5 rounded-lg font-inter text-sm font-semibold transition-all duration-200 ${
              activeTab === "Project Admins"
                ? "shadow-sm"
                : "hover:text-foreground"
            }`}
            style={{
              backgroundColor: activeTab === "Project Admins" ? "var(--navy)" : "transparent",
              color: activeTab === "Project Admins" ? "var(--accent)" : "var(--muted-fg)",
              border: activeTab === "Project Admins" ? "1px solid var(--border-col)" : "1px solid transparent",
            }}
          >
            Project Admins
          </button>
        </div>

        {/* Reward Tiers Grid with smooth tab-panel fade transition */}
        <div
          key={activeTab}
          className="tab-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {currentTiers.map((tier) => (
            <div
              key={tier.rank}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 card ${
                tier.isTopPrize ? "card-rank1" : ""
              }`}
              style={{
                borderColor: tier.isTopPrize ? "var(--accent)" : "var(--border-col)",
              }}
            >
              <div>
                {/* Reward Meta & Top Prize Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {tier.count}
                  </span>
                  {tier.isTopPrize && (
                    <span
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: "rgba(125, 211, 252, 0.12)",
                        color: "var(--accent)",
                        borderColor: "rgba(125, 211, 252, 0.35)",
                      }}
                    >
                      <Sparkles className="w-3 h-3" /> Top prize
                    </span>
                  )}
                </div>

                {/* Rank Name */}
                <h3
                  className="font-syne font-bold text-2xl sm:text-3xl mb-6"
                  style={{ color: "var(--fg)" }}
                >
                  {tier.rank}
                </h3>

                {/* Perk Checklist */}
                <ul className="space-y-3.5 mb-6">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: "var(--accent)" }}
                      />
                      <span
                        className="font-inter text-sm leading-tight"
                        style={{ color: "var(--fg)", opacity: 0.9 }}
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Universal Participant Rewards */}
        <div className="pt-10 border-t" style={{ borderColor: "var(--border-col)" }}>
          <h3
            className="font-syne font-bold text-2xl sm:text-3xl mb-8"
            style={{ color: "var(--fg)" }}
          >
            Every participant takes home these.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col justify-center">
              <span
                className="font-mono text-xs mb-2"
                style={{ color: "var(--accent)" }}
              >
                All participants
              </span>
              <h4
                className="font-inter font-semibold text-lg"
                style={{ color: "var(--fg)" }}
              >
                TruScholar Digital Certificate
              </h4>
            </div>

            <div className="card p-6 flex flex-col justify-center">
              <span
                className="font-mono text-xs mb-2"
                style={{ color: "var(--accent)" }}
              >
                All participants
              </span>
              <h4
                className="font-inter font-semibold text-lg"
                style={{ color: "var(--fg)" }}
              >
                NSoC Digital Certificate
              </h4>
            </div>

            <div className="card p-6 flex flex-col justify-center">
              <span
                className="font-mono text-xs mb-2"
                style={{ color: "var(--accent)" }}
              >
                All participants
              </span>
              <h4
                className="font-inter font-semibold text-lg"
                style={{ color: "var(--fg)" }}
              >
                Badge Point Base
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
