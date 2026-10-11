"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";

interface MascotBuddyProps {
  onOpenRegister: () => void;
}

const BUDDY_MESSAGES = [
  "Hey! Ready for the 45-day winter sprint? ❄️",
  "Over 300+ real projects waiting for your PRs! 💻",
  "Don't forget to join our Discord community! 🚀",
  "Top 10 contributors win cash prizes & exclusive swags! 🏆",
];

export function MascotBuddy({ onOpenRegister }: MascotBuddyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full border border-sky-400/40 bg-card/90 backdrop-blur-md shadow-lg shadow-sky-500/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group"
        title="Open Mascot Companion"
      >
        <span className="text-xl select-none animate-bounce">🐼</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble / Mini Card */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 max-w-[280px] p-4 rounded-2xl border border-[var(--border-col)] bg-card/95 backdrop-blur-md shadow-2xl shadow-black/30 transition-all animate-in fade-in zoom-in-95">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--accent)] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>NSoC Winter Mascot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="font-inter text-xs sm:text-sm text-foreground mb-3 leading-relaxed">
            {BUDDY_MESSAGES[msgIdx]}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-col)]">
            <button
              onClick={() => {
                onOpenRegister();
                setIsOpen(false);
              }}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[var(--accent)] text-[#050a14] font-inter text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer hover:bg-[var(--accent-teal)] transition-colors"
            >
              <span>Join Sprint</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setMsgIdx((prev) => (prev + 1) % BUDDY_MESSAGES.length)}
              className="py-1.5 px-2.5 rounded-lg border border-[var(--border-col)] hover:bg-muted font-mono text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Next Tip"
            >
              Next ↻
            </button>
          </div>
        </div>
      )}

      {/* Floating Panda Avatar Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setMsgIdx((prev) => (prev + 1) % BUDDY_MESSAGES.length);
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-sky-400/40 bg-card/85 backdrop-blur-md shadow-xl shadow-sky-500/20 hover:scale-108 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          title="Click to chat with the Winter Panda!"
        >
          {/* Subtle breathing glow */}
          <span className="absolute inset-0 rounded-2xl bg-sky-400/15 animate-ping opacity-75 pointer-events-none" />

          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              src="/winter-panda-1.png"
              alt="NSoC Winter Panda"
              width={56}
              height={56}
              className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:rotate-6"
              draggable={false}
            />
          </div>

          {/* Green online badge */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background" />
        </button>

        <button
          onClick={() => setMinimized(true)}
          className="w-6 h-6 rounded-full bg-muted/80 text-muted-foreground hover:text-foreground flex items-center justify-center text-[10px] cursor-pointer"
          title="Minimize"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
