"use client";

import React, { useState } from "react";
import { Handshake, Sparkles, Building, GraduationCap, ShieldCheck, Terminal, Cpu } from "lucide-react";

interface PartnersSectionProps {
  onPartnerModalOpen: () => void;
}

export function PartnersSection({ onPartnerModalOpen }: PartnersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const partners = [
    { name: "Indian Society for Technical Education", category: "Education Body", type: "Colleges & Campuses" },
    { name: "Microsoft Learn Community GGITS", category: "Tech Community", type: "Tech Communities" },
    { name: "Enginow", category: "EdTech Platform", type: "Platforms" },
    { name: "Oz Lunara", category: "Cloud Security", type: "AI & Cloud" },
    { name: "HackDays", category: "Hackathon Community", type: "Tech Communities" },
    { name: "Celtrix", category: "Open Source CLI", type: "Platforms" },
    { name: "AlgoZenith", category: "Competitive Coding", type: "Platforms" },
    { name: "Kanpur Ai Space", category: "AI & Innovation", type: "AI & Cloud" },
    { name: "Aarambh Network", category: "Builder Network", type: "Tech Communities" },
    { name: "WETEAMRK7", category: "Developer Hub", type: "Tech Communities" },
    { name: "GeeksforGeeks Campus Body – KNU", category: "Campus Body", type: "Colleges & Campuses" },
    { name: "SphereX", category: "Tech Community", type: "Tech Communities" },
    { name: "Amogha AI", category: "AI Solutions", type: "AI & Cloud" },
    { name: "Sotercare", category: "HealthTech Partner", type: "Platforms" },
    { name: "The Event Wallah", category: "Event Management", type: "Platforms" },
  ];

  const categories = ["All", "Tech Communities", "Colleges & Campuses", "AI & Cloud", "Platforms"];

  const filteredPartners =
    selectedCategory === "All"
      ? partners
      : partners.filter((p) => p.type === selectedCategory);

  return (
    <section id="partners" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-400/25 bg-sky-500/10 text-sky-500 dark:text-sky-300 font-mono text-xs uppercase tracking-widest mb-4">
              Ecosystem & Grassroots Network
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Community <span className="grad-text">Partners.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-4 leading-relaxed">
              The active colleges, student clubs, developer hubs, and communities driving enthusiastic participation and innovation across the nation.
            </p>
          </div>

          <button
            onClick={onPartnerModalOpen}
            className="btn-shine self-start md:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-sky-400/40 bg-sky-500/10 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-foreground font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/10"
          >
            <Handshake className="w-4 h-4" />
            <span>Partner With Us</span>
          </button>
        </div>
      </div>

      {/* Infinite Lightweight Horizontal Marquee */}
      <div className="relative w-full overflow-hidden py-4 border-y border-sky-400/15 bg-sky-500/[0.02] mb-12">
        {/* Gradient edge masks for smooth fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="animate-marquee flex gap-4 items-center">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-sky-400/15 shrink-0 hover:border-sky-400/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center text-sky-400 font-syne font-bold text-xs">
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-syne font-semibold text-xs text-foreground whitespace-nowrap">
                  {partner.name}
                </div>
                <div className="font-mono text-[10px] text-sky-500 dark:text-sky-400">
                  {partner.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filterable Partner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20 border border-sky-400"
                  : "glass-card text-muted-foreground hover:text-foreground border border-sky-400/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPartners.map((partner) => (
            <div
              key={partner.name}
              className="group p-5 rounded-2xl glass-card border border-sky-400/15 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 font-syne font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h4 className="font-syne font-bold text-sm text-foreground truncate group-hover:text-sky-400 transition-colors">
                  {partner.name}
                </h4>
                <div className="font-mono text-xs text-sky-500 dark:text-sky-400 mt-0.5">
                  {partner.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
