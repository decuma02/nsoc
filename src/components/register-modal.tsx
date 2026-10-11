"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight, MessageSquare, Terminal, LogOut, User, Check, Loader2 } from "lucide-react";
import { WinterSnowflake, GitHubIcon } from "./brand-icons";
import { useAuth } from "./auth-provider";
import { getSupabaseClient } from "@/lib/supabase";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

// Google icon inline SVG
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function RegisterModal({ isOpen, onClose, defaultRole = "Contributor" }: RegisterModalProps) {
  const { user, signInWithGitHub, signInWithGoogle, signOut, loading, configured } = useAuth();
  const [role, setRole] = useState(defaultRole);
  const [oauthLoading, setOauthLoading] = useState<"github" | "google" | null>(null);
  const [savingTrack, setSavingTrack] = useState(false);
  const [trackSaved, setTrackSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultRole) setRole(defaultRole);
  }, [defaultRole]);

  // Sync existing track from Supabase when logged in
  useEffect(() => {
    if (!user) return;
    const client = getSupabaseClient();
    if (!client) return;

    client
      .from("registrations")
      .select("track")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.track) {
          setRole(data.track);
          setTrackSaved(true);
        }
      });
  }, [user]);

  if (!isOpen) return null;

  const handleSaveTrack = async (selectedRole: string) => {
    setRole(selectedRole);
    setTrackSaved(false);
    if (!user) return;

    const client = getSupabaseClient();
    if (!client) return;

    setSavingTrack(true);
    try {
      // 1. Ensure profile has selected track
      await client
        .from("profiles")
        .update({ track: selectedRole })
        .eq("id", user.id);

      // 2. Upsert registration
      await client
        .from("registrations")
        .upsert(
          {
            user_id: user.id,
            track: selectedRole,
            status: "Pending",
          },
          { onConflict: "user_id" }
        );

      setTrackSaved(true);
    } catch (err) {
      console.warn("Failed saving registration to Supabase:", err);
    } finally {
      setSavingTrack(false);
    }
  };

  const handleGitHub = async () => {
    setError(null);
    setOauthLoading("github");
    try {
      await signInWithGitHub();
    } catch {
      setError("GitHub sign-in failed. Please try again.");
      setOauthLoading(null);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setOauthLoading("google");
    try {
      await signInWithGoogle();
    } catch {
      setError("Google sign-in failed. Please try again.");
      setOauthLoading(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setTrackSaved(false);
    onClose();
  };

  // Show user profile if already logged in
  if (!loading && user) {
    const avatarUrl = user.user_metadata?.avatar_url;
    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Contributor";
    const githubLogin = user.user_metadata?.user_name || user.user_metadata?.preferred_username;
    const provider = user.app_metadata?.provider;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-sky-400/20 dark:bg-[#071326]/95 bg-white/95 text-foreground backdrop-blur-xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sky-500/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logged in header */}
          <div className="text-center mb-6">
            <div className="flex items-center gap-2 justify-center text-sky-500 dark:text-sky-400 font-mono text-xs uppercase tracking-wider mb-4">
              <WinterSnowflake className="w-4 h-4" />
              <span>NSoC '26 • Winter Edition</span>
            </div>

            {/* Avatar */}
            <div className="relative inline-block mb-3">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl border-2 border-sky-400/40 object-cover shadow-lg shadow-sky-500/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl border-2 border-sky-400/40 bg-sky-500/20 flex items-center justify-center">
                  <User className="w-9 h-9 text-sky-400" />
                </div>
              )}
              <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
            </div>

            <h2 id="modal-title" className="font-syne text-2xl font-extrabold tracking-tight text-foreground">
              Welcome back, {displayName.split(" ")[0]}! 🎉
            </h2>
            {githubLogin && (
              <p className="font-mono text-sm text-sky-400 mt-1">@{githubLogin}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Signed in via{" "}
              <span className="capitalize font-semibold text-foreground/80">{provider}</span>
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Your Registered Track
              </label>
              {savingTrack ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-sky-400">
                  <Loader2 className="w-3 h-3 animate-spin" /> Saving…
                </span>
              ) : trackSaved ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <Check className="w-3 h-3" /> Saved to DB
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["Contributor", "Project Kernel", "Campus Ambassador"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSaveTrack(r)}
                  disabled={savingTrack}
                  className={`text-xs py-2 px-2 rounded-xl border font-medium transition-all text-center cursor-pointer ${
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

          {/* Quick Links */}
          <div className="space-y-2.5 mb-5">
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
                  <div className="text-xs font-semibold text-foreground">Join Official Discord</div>
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
                  <div className="text-xs font-semibold text-foreground">Explore NSoC Repositories</div>
                  <div className="text-[11px] text-muted-foreground">Find good-first-issue tagged issues</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </a>
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-400/20 hover:border-red-400/40 hover:bg-red-500/10 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // Sign-in view (not authenticated)
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-sky-400/20 dark:bg-[#071326]/95 bg-white/95 text-foreground backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sky-500/10 transition-colors"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-mono text-xs uppercase tracking-wider mb-3">
            <WinterSnowflake className="w-4 h-4" />
            <span>NSoC '26 • Winter Edition</span>
          </div>
          <h2 id="modal-title" className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-foreground">
            Join the 45-Day Sprint
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sign in with your GitHub or Google account to register as a <span className="font-semibold text-sky-400">{role}</span> and start closing real production issues.
          </p>
        </div>

        {/* Track selector */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Select Your Track
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Contributor", "Project Kernel", "Campus Ambassador"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`text-xs py-2 px-2 rounded-xl border font-medium transition-all text-center ${
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

        {/* OAuth Divider */}
        <div className="relative flex items-center mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="mx-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">Sign in with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* OAuth Buttons — shown only when Supabase is configured */}
        {configured ? (
          <div className="space-y-3">
            <button
              onClick={handleGitHub}
              disabled={oauthLoading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl border border-sky-400/20 hover:border-sky-400/50 bg-sky-500/5 hover:bg-sky-500/10 transition-all duration-200 text-sm font-semibold text-foreground disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {oauthLoading === "github" ? (
                <div className="w-5 h-5 border-2 border-sky-400/40 border-t-sky-400 rounded-full animate-spin" />
              ) : (
                <GitHubIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              )}
              <span>{oauthLoading === "github" ? "Redirecting…" : "Continue with GitHub"}</span>
            </button>

            <button
              onClick={handleGoogle}
              disabled={oauthLoading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl border border-sky-400/20 hover:border-red-400/40 bg-red-500/5 hover:bg-red-500/10 transition-all duration-200 text-sm font-semibold text-foreground disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {oauthLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin" />
              ) : (
                <GoogleIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              )}
              <span>{oauthLoading === "google" ? "Redirecting…" : "Continue with Google"}</span>
            </button>
          </div>
        ) : (
          /* Supabase not yet configured — show placeholder */
          <div className="rounded-xl border border-sky-400/15 bg-sky-500/5 px-5 py-4 text-center">
            <Sparkles className="w-5 h-5 text-sky-400 mx-auto mb-2" />
            <p className="font-syne text-sm font-semibold text-foreground mb-1">Auth launching soon</p>
            <p className="font-inter text-xs text-muted-foreground leading-relaxed">
              GitHub &amp; Google sign-in will go live when Supabase is connected.{" "}
              <a href="https://discord.gg/bZ47fac2jn" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Join Discord</a> to get notified.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-xs text-red-400 text-center font-mono">{error}</p>
        )}

        <p className="font-inter text-[11px] text-center text-muted-foreground mt-5 leading-relaxed">
          By signing in, you agree to NSoC '26 community guidelines.{" "}
          No dummy repos or filler tasks.
        </p>
      </div>
    </div>
  );
}
