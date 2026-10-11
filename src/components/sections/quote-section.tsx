"use client";

import React from "react";

export function QuoteSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden card"
          style={{
            backgroundColor: "var(--navy)",
            borderColor: "var(--border-col)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-teal))" }}
          />
          <div
            className="font-syne font-bold select-none mb-2"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--accent)", lineHeight: 0.9 }}
            aria-hidden="true"
          >
            “
          </div>
          <p
            className="font-syne font-bold tracking-tight max-w-4xl"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
              color: "var(--fg)",
              lineHeight: 1.15,
            }}
          >
            No toy projects. No filler tasks. Just 45 days of work that lands in production — and a community that levels up together.”
          </p>
        </div>
      </div>
    </section>
  );
}
