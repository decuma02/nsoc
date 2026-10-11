"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Tilt3D } from "@/components/tilt-3d";

interface SponsorsSectionProps {
  onSponsorModalOpen: () => void;
}

export function SponsorsSection({ onSponsorModalOpen }: SponsorsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll(".sponsor-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    };

    init();
  }, []);

  const sponsors = [
    {
      tier: "Title Sponsor",
      name: "Unstop",
      image: "/sponsers/unstop.webp",
      description:
        "A leading platform for hosting and managing online competitions, hackathons, and hiring challenges, fostering student talent across tech domains.",
      url: "https://unstop.com/p/open-source-program-nexus-spring-of-code-1661333",
      tags: ["Title Partner", "Competitions", "Tech Talent"],
      isTitle: true,
    },
    {
      tier: "Gold Sponsor",
      name: "Arkham Experience",
      image: "/sponsers/arkham.jpeg",
      description:
        "An immersive media-tech company pioneering Gen AI, Agentic AI, Holographics, Spatial Computing, AR/XR, and distributed networks.",
      url: "https://arkhamarchives.net",
      tags: ["Gold Partner", "Gen AI", "Spatial"],
      isTitle: false,
    },
    {
      tier: "Silver Sponsor",
      name: "Extension Shield",
      image: "/sponsers/extensionShield.jpeg",
      description:
        "Security-first browser extension management. Protecting developers and organizations from malicious extensions and supply chain risks.",
      url: "https://extensionshield.com",
      tags: ["Silver Partner", "Security", "DevSecOps"],
      isTitle: false,
    },
  ];

  return (
    <section id="sponsors" ref={sectionRef} className="pt-20 lg:pt-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Rule */}
        <div className="border-t pt-12 sm:pt-16 border-[var(--border-col)]">
          {/* Header Split */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-3 text-[var(--accent)] font-semibold">
                05 / SPONSORS &amp; BACKING
              </div>
              <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 text-foreground">
                Past <span className="text-[var(--accent)]">Sponsors.</span>
              </h2>
              <p className="font-inter text-base sm:text-lg max-w-2xl leading-relaxed text-muted-foreground">
                A look back at the incredible organizations and platforms that powered our previous cohorts with funding, developer tools, and infrastructure.
              </p>
            </div>

            {/* Sponsor CTA Button */}
            <button
              onClick={onSponsorModalOpen}
              className="btn-primary btn-shine px-6 py-3.5 text-sm sm:text-base font-semibold self-start md:self-auto shrink-0 cursor-pointer shadow-md shadow-sky-500/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Sponsor This Season</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* 3 Sponsor Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {sponsors.map((s) => (
              <Tilt3D key={s.name} maxTilt={5}>
                <div
                  className={`sponsor-card card p-7 sm:p-8 flex flex-col justify-between min-h-[380px] h-full group ${
                    s.isTitle ? "border-sky-400/50 dark:bg-sky-500/[0.04] bg-sky-50/70 shadow-lg shadow-sky-500/10" : ""
                  }`}
                >
                  <span className="card-sheen" />
                  <span className="card-spotlight" />

                  <div>
                    {/* Tier badge & Logo header */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span
                        className={`font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${
                          s.isTitle
                            ? "border-sky-400/40 bg-sky-400/15 text-sky-400 font-bold"
                            : "border-[var(--border-col)] bg-card text-muted-foreground"
                        }`}
                      >
                        {s.tier}
                      </span>
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--border-col)] bg-card p-1.5 flex items-center justify-center shrink-0">
                        <Image
                          src={s.image}
                          alt={s.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>

                    <h3 className="font-syne font-bold text-2xl sm:text-3xl mb-3 text-foreground">
                      {s.name}
                    </h3>
                    <p className="font-inter text-sm sm:text-base leading-relaxed text-muted-foreground mb-6">
                      {s.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2.5 py-0.5 rounded-md border border-[var(--border-col)] bg-card/60 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[var(--border-col)] mt-auto">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-colors group text-foreground"
                    >
                      <span className="group-hover:text-[var(--accent)]">Visit sponsor</span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--accent)]"
                      />
                    </a>
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
