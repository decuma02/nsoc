"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Handshake } from "lucide-react";

interface PartnersSectionProps {
  onPartnerModalOpen: () => void;
}

const partners = [
  { id: 18, name: "Indian Society for Technical Education", image: "/sponsers/indian_society_for_technical_education.jpeg", link: "https://www.linkedin.com/company/indian-society-for-technical-education", category: "Education Body" },
  { id: 16, name: "Microsoft Learn Community GGITS", image: "/sponsers/microsoft_learn_ggits.png", link: "https://www.linkedin.com/company/ms-ggits", category: "Tech Community" },
  { id: 14, name: "Enginow", image: "/sponsers/Enginow.jpg", link: "https://www.enginow.in", category: "EdTech Platform" },
  { id: 13, name: "Oz Lunara", image: "/sponsers/Oz_Lunara.jpg", link: "https://app.ozlunara.com", category: "Cloud Security" },
  { id: 12, name: "HackDays", image: "/sponsers/HackDays.jpg", link: "#", category: "Hackathon Community" },
  { id: 11, name: "Celtrix", image: "/sponsers/Celtrix.jpg", link: "https://www.celtrix.tech", category: "Open Source CLI" },
  { id: 10, name: "AlgoZenith", image: "/sponsers/algozenith.png", link: "https://maang.in", category: "Competitive Coding" },
  { id: 9, name: "Kanpur Ai Space", image: "/sponsers/KanpurAI.jpg", link: "https://metaedschool.com", category: "AI & Innovation" },
  { id: 8, name: "Aarambh Network", image: "/sponsers/Aarambh_Network.jpg", link: "#", category: "Builder Network" },
  { id: 7, name: "WETEAMRK7", image: "/sponsers/WETEAMRK7.jpg", link: "https://www.linkedin.com/company/weteamrk7/", category: "Developer Hub" },
  { id: 6, name: "GeeksforGeeks Campus Body – KNU", image: "/sponsers/GeeksforGeeks_Campus_Body.jpg", link: "https://terminal-troops.super.site/", category: "Campus Body" },
  { id: 5, name: "SphereX", image: "/sponsers/SphereX.jpg", link: "https://spherexcommunity.vercel.app/", category: "Tech Community" },
  { id: 3, name: "Amogha AI", image: "/sponsers/Amogha.jpg", link: "https://jamun.app/", category: "AI Solutions" },
  { id: 15, name: "Sotercare", image: "/sponsers/Sotercare.png", link: "https://www.linkedin.com/company/sotercare", category: "HealthTech" },
  { id: 17, name: "The Event Wallah", image: "/sponsers/the_event_wallah.png", link: "#", category: "Event Management" },
];

export function PartnersSection({ onPartnerModalOpen }: PartnersSectionProps) {
  return (
    <section id="community" className="py-20 lg:py-28 overflow-hidden border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        {/* Header Split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-3 text-sky-400 font-semibold"
            >
              06 / Ecosystem &amp; Grassroots Network
            </div>
            <h2
              className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-3"
              style={{ color: "var(--fg)" }}
            >
              Community <span className="text-sky-400">Partners.</span>
            </h2>
            <p
              className="font-inter text-base sm:text-lg max-w-2xl leading-relaxed text-muted-foreground"
            >
              The active colleges, student clubs, developer hubs, and communities driving enthusiastic participation and innovation across the nation.
            </p>
          </div>

          <button
            onClick={onPartnerModalOpen}
            className="btn-secondary btn-shine px-6 py-3.5 text-base font-semibold self-start md:self-auto shrink-0 cursor-pointer"
          >
            <Handshake className="w-4 h-4 mr-2 text-sky-400" />
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4 ml-1 text-sky-400" />
          </button>
        </div>
      </div>

      {/* Infinite Continuous Marquee from nsoc.in with Gradient Edge Masks */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_96px,black_calc(100%-96px),transparent_100%)] py-4">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <a
              key={`${p.id}-${i}`}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-3 flex w-64 lg:w-72 flex-col items-center justify-center gap-3 rounded-2xl border dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 border-[#b9d7ec] bg-card hover:border-sky-400/50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-16 w-16 lg:h-20 lg:w-20 overflow-hidden rounded-xl bg-card border border-border p-1 flex items-center justify-center shrink-0">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={72}
                  height={72}
                  className="h-full w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-syne text-xs sm:text-sm font-bold text-foreground group-hover:text-sky-400 transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground mt-1">
                  {p.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 3×5 Grassroots Grid below for immediate accessibility */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 sm:p-6 flex items-center justify-between group hover:border-sky-400 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-border bg-card p-1 shrink-0 flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={44}
                    height={44}
                    className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-sm sm:text-base text-foreground group-hover:text-sky-400 transition-colors leading-snug">
                    {partner.name}
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {partner.category}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-sky-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
