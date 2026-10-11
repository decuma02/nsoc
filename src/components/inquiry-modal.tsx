"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Sparkles, ArrowRight, Building2, Handshake } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "sponsor" | "partner";
}

export function InquiryModal({ isOpen, onClose, type }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [tier, setTier] = useState(type === "sponsor" ? "Title Sponsor" : "Tech Community");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const isSponsor = type === "sponsor";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-sky-400/20 dark:bg-[#071326]/95 bg-white/95 text-foreground">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sky-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-mono text-xs uppercase tracking-wider mb-2">
              {isSponsor ? <Building2 className="w-4 h-4" /> : <Handshake className="w-4 h-4" />}
              <span>{isSponsor ? "Sponsorship Inquiries" : "Community Partnership"}</span>
            </div>
            <h2 id="inquiry-title" className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {isSponsor ? "Sponsor NSoC ’26" : "Partner With NSoC ’26"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isSponsor
                ? "Empower 10,000+ developers with tooling, compute credits, and grants while spotlighting your brand."
                : "Bring open source cohorts, hackathons, and mentors to your campus or developer community."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Organization / Community Name
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder={isSponsor ? "e.g. Acme Cloud Systems" : "e.g. ACM Student Chapter"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Contact Work Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="partnerships@organization.org"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  {isSponsor ? "Target Sponsorship Tier" : "Partnership Category"}
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm text-foreground"
                >
                  {isSponsor ? (
                    <>
                      <option value="Title Sponsor">Title Sponsor (Full Ecosystem Lead)</option>
                      <option value="Gold Sponsor">Gold Sponsor (Track & Infra Partner)</option>
                      <option value="Silver Sponsor">Silver Sponsor (Tooling & Prize Backer)</option>
                      <option value="Custom Grant">Custom Grant or Cloud Credit Partner</option>
                    </>
                  ) : (
                    <>
                      <option value="Tech Community">Tech Community / Developer Hub</option>
                      <option value="Campus Body">College Club / Student Chapter</option>
                      <option value="Education Body">Education Body / University Dept</option>
                      <option value="Hackathon Partner">Hackathon or Event Organizers</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  Note / Collaboration Ideas (Optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell us about your team, developer tools, or audience..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-400/20 bg-background/50 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-sm placeholder:text-muted-foreground/60 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-shine py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-syne font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit {isSponsor ? "Sponsorship" : "Partnership"} Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 mb-4 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-syne text-2xl font-bold mb-2">Proposal Received!</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold text-sky-400">{orgName}</span>. Our partnership team will contact you at {contactEmail} within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-xl border border-sky-400/20 hover:bg-sky-500/10 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
