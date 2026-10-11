"use client";

import React from "react";
import { Tilt3D } from "@/components/tilt-3d";

export function QuoteSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <Tilt3D maxTilt={4} scale={1.01}>
          <div
            className="rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden card group"
            style={{
              backgroundColor: "var(--navy)",
              borderColor: "var(--border-col)",
            }}
          >
            <span className="card-sheen" />
            <span className="card-spotlight" />

            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
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
              className="font-inter font-semibold tracking-tight max-w-4xl text-foreground"
              style={{
                fontSize: "clamp(1rem, 1.9vw, 1.6rem)",
                lineHeight: 1.6,
              }}
            >
              No toy projects. No filler tasks. Just 45 days of work that lands in production — and a community that levels up together.”
            </p>
          </div>
        </Tilt3D>
      </div>
    </section>
  );
}
