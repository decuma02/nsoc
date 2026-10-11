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
          {/* Horizontal connector line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[22px] left-[6%] right-[6%] h-px dark:bg-white/10 bg-[#b9d7ec] overflow-hidden"
          >
            <div
              ref={lineProgressRef}
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
            />
          </div>

          {/* 4 Steps Row / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="step-item p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group relative"
              >
                {/* Circular Milestone Node from nsoc.in */}
                <div
                  className="w-11 h-11 rounded-full dark:border-white/10 dark:bg-[#050a14] border-[#b9d7ec] bg-[#dcecf8] flex items-center justify-center mb-5 relative z-10 border shadow-sm group-hover:scale-110 group-hover:border-sky-400 transition-all duration-300"
                >
                  <span
                    className="font-mono text-xs sm:text-sm font-bold text-sky-400"
                  >
                    {step.number}
                  </span>
                </div>

                <div className="step-body">
                  {/* Step Title in Syne 700 24px */}
                  <h3
                    className="font-syne font-bold text-xl sm:text-2xl mb-2.5 leading-snug group-hover:text-sky-400 transition-colors"
                    style={{ color: "var(--fg)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description in Inter 400 15px */}
                  <p
                    className="font-inter text-sm sm:text-base leading-relaxed"
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
