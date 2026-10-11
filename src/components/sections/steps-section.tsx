"use client";

import React, { useEffect, useRef } from "react";
import { Tilt3D } from "@/components/tilt-3d";

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
    <section id="journey" ref={sectionRef} className="py-20 lg:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            02 / CONTRIBUTION JOURNEY
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
            Here&apos;s how you start.
          </h2>
        </div>

        {/* Contribution Journey Container */}
        <div className="relative">
          {/* Horizontal connector line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-px dark:bg-white/10 bg-[#b9d7ec] overflow-hidden"
          >
            <div
              ref={lineProgressRef}
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
            />
          </div>

          {/* 4 Steps Row / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step) => (
              <Tilt3D key={step.number} maxTilt={7}>
                <div
                  className="step-item card p-6 sm:p-7 rounded-3xl transition-all duration-300 group relative h-full flex flex-col justify-between"
                >
                  <span className="card-sheen" />
                  <span className="card-spotlight" />

                  <div>
                    {/* Circular Milestone Node */}
                    <div
                      className="w-12 h-12 rounded-2xl dark:border-white/10 dark:bg-[#050a14] border-[#b9d7ec] bg-[#dcecf8] flex items-center justify-center mb-6 relative z-10 border shadow-sm group-hover:scale-110 group-hover:border-[var(--accent)] transition-all duration-300"
                    >
                      <span className="font-mono text-sm font-bold text-[var(--accent)] step-number">
                        {step.number}
                      </span>
                    </div>

                    <div className="step-body">
                      {/* Step Title */}
                      <h3 className="font-syne font-bold text-xl sm:text-2xl mb-2.5 leading-snug group-hover:text-[var(--accent)] transition-colors text-foreground">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="font-inter text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-col)]/40 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Step {step.number} of 04</span>
                    <span className="text-[var(--accent)]">→</span>
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
