"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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
      description:
        "A leading platform for hosting and managing online competitions, hackathons, and hiring challenges, fostering student talent across tech domains.",
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
    <section id="sponsors" ref={sectionRef} className="pt-20 lg:pt-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Rule */}
        <div className="border-t pt-12 sm:pt-16" style={{ borderColor: "var(--border-col)" }}>
          {/* Header Split */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--accent)" }}
              >
                05 / SPONSORS & COMMUNITY
              </div>
              <h2
                className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-3"
                style={{ color: "var(--fg)" }}
              >
                Past sponsors.
              </h2>
              <p
                className="font-inter text-base sm:text-lg max-w-2xl leading-relaxed"
                style={{ color: "var(--muted-fg)" }}
              >
                A look back at the incredible organizations and platforms that backed our previous cohorts with funding, developer tools, and infrastructure.
              </p>
            </div>

            {/* Sponsor CTA Button */}
            <button
              onClick={onSponsorModalOpen}
              className="btn-secondary px-6 py-3.5 text-base font-semibold self-start md:self-auto shrink-0"
            >
              <span>Sponsor This Season</span>
              <ArrowUpRight className="w-4 h-4" style={{ color: "var(--accent)" }} />
            </button>
          </div>

          {/* 3 Sponsor Cards Grid with diagonal sheen and understated reveal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="sponsor-card card p-8 sm:p-9 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  <span
                    className="font-mono text-xs font-semibold tracking-wider uppercase mb-4 inline-block"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.tier}
                  </span>
                  <h3
                    className="font-syne font-bold text-3xl sm:text-4xl mb-4"
                    style={{ color: "var(--fg)" }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="font-inter text-[15px] sm:text-base leading-relaxed"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 border-t mt-8" style={{ borderColor: "var(--border-col)" }}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-inter text-sm font-semibold transition-colors group"
                    style={{ color: "var(--fg)" }}
                  >
                    <span className="group-hover:text-cyan-accent">Visit sponsor</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--accent)" }}
                    />
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
