"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface SponsorsSectionProps {
  onSponsorModalOpen: () => void;
}

export function SponsorsSection({ onSponsorModalOpen }: SponsorsSectionProps) {
  const sponsors = [
    {
      tier: "Title Sponsor",
      name: "Unstop",
      description:
        "A leading platform for hosting and managing online competitions, hackathons, and recruitment drives.",
      url: "https://unstop.com",
    },
    {
      tier: "Gold Sponsor",
      name: "Arkham Experience",
      description:
        "An immersive media-tech company pioneering Gen AI, Agentic AI, and full-stack interactive experiences.",
      url: "https://arkhamexperience.com",
    },
    {
      tier: "Silver Sponsor",
      name: "Extension Shield",
      description:
        "Security-first browser extension management. Protecting developers from malicious scripts and supply chain attacks.",
      url: "https://extensionshield.com",
    },
  ];

  return (
    <section id="sponsors" className="pt-20 lg:pt-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Rule */}
        <div className="border-t border-border pt-12 sm:pt-16">
          {/* Header Split */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
                05 / SPONSORS & COMMUNITY
              </div>
              <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-3">
                Past sponsors.
              </h2>
              <p className="font-inter text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Organizations and platforms that backed our previous iterations and powered the community.
              </p>
            </div>

            {/* Sponsor CTA Button */}
            <button
              onClick={onSponsorModalOpen}
              className="figma-btn-secondary px-6 py-3.5 text-base font-semibold self-start md:self-auto shrink-0"
            >
              <span>Sponsor This Season</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-accent" />
            </button>
          </div>

          {/* 3 Sponsor Cards Grid (Figma Exact Spec) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="figma-card p-8 sm:p-9 flex flex-col justify-between min-h-[380px]"
              >
                <div>
                  <span className="font-mono text-xs font-medium text-cyan-accent tracking-wider uppercase mb-4 inline-block">
                    {s.tier}
                  </span>
                  <h3 className="font-syne font-bold text-3xl sm:text-4xl text-foreground mb-4">
                    {s.name}
                  </h3>
                  <p className="font-inter text-[15px] sm:text-base leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border mt-8">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-foreground hover:text-cyan-accent transition-colors group"
                  >
                    <span>Visit sponsor</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
