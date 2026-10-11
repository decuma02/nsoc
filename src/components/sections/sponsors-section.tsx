"use client";

import React from "react";
import { ExternalLink, Sparkles, Building2, Shield, Flame } from "lucide-react";

interface SponsorsSectionProps {
  onSponsorModalOpen: () => void;
}

export function SponsorsSection({ onSponsorModalOpen }: SponsorsSectionProps) {
  const sponsors = [
    {
      tier: "Title Sponsor",
      name: "Unstop",
      description:
        "A leading platform for hosting and managing online competitions, hackathons, and hiring challenges, fostering student talent across tech domains.",
      url: "https://unstop.com",
      badgeColor: "bg-sky-500/15 text-sky-400 border-sky-400/30",
      borderGlow: "border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]",
      icon: Flame,
      tag: "Title Tier",
    },
    {
      tier: "Gold Sponsor",
      name: "Arkham Experience",
      description:
        "An immersive media-tech company pioneering Gen AI, Agentic AI, Holographics, Spatial Computing, AR/XR, and distributed networks.",
      url: "https://arkhamexperience.com",
      badgeColor: "bg-amber-500/15 text-amber-400 border-amber-400/30",
      borderGlow: "border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.12)]",
      icon: Building2,
      tag: "Gold Tier",
    },
    {
      tier: "Silver Sponsor",
      name: "Extension Shield",
      description:
        "Security-first browser extension management. Protecting developers and organizations from malicious extensions and supply chain risks.",
      url: "https://extensionshield.com",
      badgeColor: "bg-teal-500/15 text-teal-400 border-teal-400/30",
      borderGlow: "border-teal-400/40 shadow-[0_0_20px_rgba(45,212,191,0.12)]",
      icon: Shield,
      tag: "Silver Tier",
    },
  ];

  return (
    <section id="sponsors" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
              Track Record & Backing
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Past <span className="grad-text">Sponsors.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
              A look back at the incredible organizations and platforms that powered our previous cohorts with funding, developer tools, and infrastructure.
            </p>
          </div>

          <button
            onClick={onSponsorModalOpen}
            className="btn-shine self-start md:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-syne font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Sponsor This Season</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsors.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className={`group rounded-3xl glass-card p-8 border ${s.borderGlow} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${s.badgeColor}`}>
                      {s.tier}
                    </span>
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-syne text-3xl font-extrabold text-foreground mb-4 group-hover:text-sky-400 transition-colors">
                    {s.name}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 font-sans">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-400/15">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 group/link transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
