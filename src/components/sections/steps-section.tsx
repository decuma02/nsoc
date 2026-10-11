"use client";

import React from "react";

export function StepsSection({ onOpenRegister }: { onOpenRegister: () => void }) {
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
    <section id="contribution" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-accent mb-3">
            02 / CONTRIBUTION
          </div>
          <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight">
            Here&apos;s how you start.
          </h2>
        </div>

        {/* 4 Steps Row / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-t border-border pt-6 flex flex-col justify-between group"
            >
              <div>
                {/* Step Number in JetBrains Mono 48px */}
                <div className="font-mono text-4xl sm:text-5xl text-cyan-accent mb-4 transition-transform duration-200 group-hover:-translate-y-1">
                  {step.number}
                </div>

                {/* Step Title in Syne 700 28px */}
                <h3 className="font-syne font-bold text-2xl sm:text-[28px] text-foreground mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description in Inter 400 16px */}
                <p className="font-inter text-[15px] sm:text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
