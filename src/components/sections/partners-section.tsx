"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface PartnersSectionProps {
  onPartnerModalOpen: () => void;
}

export function PartnersSection({ onPartnerModalOpen }: PartnersSectionProps) {
  const partners = [
    { name: "Indian Society for Technical Education", category: "Education Body" },
    { name: "Microsoft Learn Community GGITS", category: "Tech Community" },
    { name: "Enginow", category: "EdTech Platform" },
    { name: "Oz Lunara", category: "Cloud Security" },
    { name: "HackDays", category: "Hackathon Community" },
    { name: "Celtrix", category: "Open Source CLI" },
    { name: "AlgoZenith", category: "Competitive Coding" },
    { name: "Kanpur Ai Space", category: "AI & Innovation" },
    { name: "Aarambh Network", category: "Builder Network" },
    { name: "WETEAMRK7", category: "Developer Hub" },
    { name: "GeeksforGeeks Campus Body – KNU", category: "Campus Body" },
    { name: "SphereX", category: "Tech Community" },
    { name: "Amogha AI", category: "AI Solutions" },
    { name: "Sotercare", category: "HealthTech Partner" },
    { name: "The Event Wallah", category: "Event Management" },
  ];

  return (
    <section id="community" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
              06 / Ecosystem & Grassroots Network
            </div>
            <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-3">
              Community Partners.
            </h2>
            <p className="font-inter text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              The active colleges, student clubs, developer hubs, and communities driving enthusiastic participation and innovation across the nation.
            </p>
          </div>

          <button
            onClick={onPartnerModalOpen}
            className="figma-btn-secondary px-6 py-3.5 text-base font-semibold self-start md:self-auto shrink-0"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-accent" />
          </button>
        </div>

        {/* 15 Partner Tiles: 3 Columns x 5 Rows Grid (Figma Exact Spec) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="figma-card p-7 sm:p-8 flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <span className="font-mono text-[11px] font-medium text-cyan-accent tracking-wider uppercase mb-3 inline-block">
                  {p.category}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-foreground leading-snug">
                  {p.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
