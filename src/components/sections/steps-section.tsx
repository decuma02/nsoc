"use client";

import React, { useEffect, useRef } from "react";

interface StepsSectionProps {
  onOpenRegister: () => void;
}

export function StepsSection({ onOpenRegister }: StepsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const stepEls = sectionRef.current?.querySelectorAll(".step-item");
      if (!stepEls) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate the progress line expanding
      if (lineProgressRef.current) {
        tl.to(
          lineProgressRef.current,
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Sequentially reveal each step with illumination
      stepEls.forEach((step, idx) => {
        const numEl = step.querySelector(".step-number");
        const bodyEl = step.querySelector(".step-body");

        tl.fromTo(
          step,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          idx * 0.2
        );

        if (numEl) {
          tl.fromTo(
            numEl,
            { textShadow: "0 0 0px var(--accent)" },
            {
              textShadow: "0 0 16px var(--accent)",
              duration: 0.4,
              repeat: 1,
              yoyo: true,
            },
            idx * 0.2 + 0.15
          );
        }
      });
    };

    init();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Register",
      description: "Create your profile. Pick a track that matches your skills and stack.",
    },
    {
      number: "02",
      title: "Explore",
      description: "Browse curated open issues across repos waiting for contribution.",
    },
    {
      number: "03",
      title: "Contribute",
      description: "Submit PRs. Get reviewed. Earn points for every merged pull request.",
    },
    {
      number: "04",
      title: "Win",
      description: "Top builders claim prizes, swag, and direct job referrals.",
    },
  ];

  return (
    <section id="contribution" ref={sectionRef} className="py-20 lg:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            02 / CONTRIBUTION JOURNEY
          </div>
          <h2
            className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            Here&apos;s how you start.
          </h2>
        </div>

        {/* Contribution Journey Container */}
        <div className="relative">
          {/* Connecting Progress Line (Desktop Horizontal) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-border overflow-hidden"
          >
            <div
              ref={lineProgressRef}
              className="h-full w-full origin-left scale-x-0"
              style={{
                background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-teal) 70%, var(--accent) 100%)",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
          </div>

          {/* 4 Steps Row / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="step-item pt-6 flex flex-col justify-between group relative"
              >
                {/* Milestone Node on Desktop */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -top-[5px] left-0 w-3 h-3 rounded-full border-2 transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)",
                  }}
                />

                <div className="step-body">
                  {/* Step Number in JetBrains Mono 48px */}
                  <div
                    className="step-number font-mono text-4xl sm:text-5xl mb-4 transition-transform duration-200 group-hover:-translate-y-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {step.number}
                  </div>

                  {/* Step Title in Syne 700 28px */}
                  <h3
                    className="font-syne font-bold text-2xl sm:text-[28px] mb-3 leading-snug"
                    style={{ color: "var(--fg)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description in Inter 400 16px */}
                  <p
                    className="font-inter text-[15px] sm:text-base leading-relaxed"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
