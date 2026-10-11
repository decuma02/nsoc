"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Sparkles, ArrowRight, MessageSquare, Terminal } from "lucide-react";
import { WinterSnowflake, GitHubIcon } from "./brand-icons";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

export function RegisterModal({ isOpen, onClose, defaultRole = "Contributor" }: RegisterModalProps) {
  const [role, setRole] = useState(defaultRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUser, setGithubUser] = useState("");
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (defaultRole) setRole(defaultRole);
  }, [defaultRole]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#0ea5e9", "#bae6fd", "#ffffff", "#a5b4fc"],
      });
    } catch {
      // safe fallback if canvas isn't available
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-sky-400/20 dark:bg-[#071326]/95 bg-white/95 text-foreground">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sky-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-mono text-xs uppercase tracking-wider mb-2">
              <WinterSnowflake className="w-4 h-4" />
              <span>NSoC ’26 • Winter Edition</span>
            </div>
            <h2 id="modal-title" className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Join the 45-Day Sprint
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Create your profile, connect your GitHub, and start closing real production issues.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Select Your Track
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Contributor", "Project Kernel", "Campus Ambassador"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`text-xs py-2 px-2.5 rounded-xl border font-medium transition-all text-center ${
                        role === r
                          ? "border-sky-400 bg-sky-500/15 text-sky-400 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                          : "border-sky-400/15 text-muted-foreground hover:border-sky-400/30 hover:bg-sky-500/5"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="full-name" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="github" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  GitHub Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <GitHubIcon className="w-4 h-4" />
                  </span>
                  <input
                    id="github"
                    type="text"
                    required
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                    placeholder="octocat"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-shine py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-syne font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Registration as {role}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-muted-foreground pt-1">
                By registering, you agree to NSoC ’26 community guidelines. No dummy repos or filler tasks.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 mb-4 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-syne text-2xl font-bold mb-2">Welcome to NSoC ’26!</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              You are registered as a <span className="font-semibold text-sky-400">{role}</span>. Check your inbox ({email}) for cohort onboarding details.
            </p>

            <div className="space-y-3 mb-6 text-left">
              <a
                href="https://discord.gg/bZ47fac2jn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-sky-400/20 hover:border-sky-400/40 bg-sky-500/5 hover:bg-sky-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Join the Official Discord</div>
                    <div className="text-[11px] text-muted-foreground">Meet maintainers and fellow builders</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </a>

              <a
                href="https://github.com/deepanshu-prajapati01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-sky-400/20 hover:border-sky-400/40 bg-sky-500/5 hover:bg-sky-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Explore NSoC Repositories</div>
                    <div className="text-[11px] text-muted-foreground">Find issues tagged with good-first-issue</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl border border-sky-400/20 hover:bg-sky-500/10 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
