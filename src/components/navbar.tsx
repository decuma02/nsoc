"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Menu, X, User } from "lucide-react";
import { Magnetic } from "./magnetic";
import { useAuth } from "./auth-provider";

interface NavbarProps {
  onOpenRegister: (role?: string, mode?: "login" | "signup") => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close notification dropdown on outside click
  useEffect(() => {
    if (!showNotifications) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotifications]);

  // Keyboard shortcut Ctrl+K / Cmd+K theme toggle from nsoc.in
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [theme, setTheme]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "https://nsoc.in/projects", external: true },
    { label: "Leaderboard", href: "https://nsoc.in/leaderboard", external: true },
    { label: "Team", href: "https://nsoc.in/team", external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "h-16 sm:h-20 bg-[var(--bg)]/92 backdrop-blur-md border-[var(--border-col)] shadow-sm"
          : "h-18 sm:h-20 bg-[var(--bg)]/85 backdrop-blur-sm border-[var(--border-col)]/60"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc] rounded-lg p-1"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
            <Image
              src="/logo_dark.png"
              alt="Nexus Spring of Code Logo"
              width={32}
              height={32}
              className="hidden dark:block object-contain"
              priority
            />
            <Image
              src="/logo_light.png"
              alt="Nexus Spring of Code Logo"
              width={32}
              height={32}
              className="block dark:hidden object-contain"
              priority
            />
          </div>
          <span className="font-syne font-bold text-2xl tracking-normal text-foreground">
            NSoC&apos;26
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="nav-link py-1 font-inter text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 relative">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Show Notifications"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#7dd3fc] transition-colors focus-visible:ring-2 focus-visible:ring-[#7dd3fc]"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-card border border-border rounded-xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-border mb-3">
                  <span className="font-syne font-bold text-sm text-foreground">Notifications</span>
                  <span className="font-mono text-[10px] text-muted-foreground">0 NEW</span>
                </div>
                <p className="font-inter text-xs text-muted-foreground text-center py-4">
                  No notifications yet. Registrations open!
                </p>
              </div>
            )}
          </div>

          {/* Theme Control with keyboard shortcut hint */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme (Ctrl+K)"
            aria-label="Toggle color theme (Ctrl+K)"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#7dd3fc] transition-all focus-visible:ring-2 focus-visible:ring-[#7dd3fc]"
          >
            {mounted && theme === "light" ? (
              <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45 text-amber-300" />
            )}
          </button>

          {/* Auth: user avatar or sign-up button */}
          {!authLoading && (
            user ? (
              /* Logged-in: show avatar button */
              <button
                onClick={() => onOpenRegister()}
                aria-label="Open profile"
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-sky-400/40 hover:border-sky-400 transition-colors shadow-sm shadow-sky-500/20 focus-visible:ring-2 focus-visible:ring-[#7dd3fc] shrink-0"
              >
                {user.user_metadata?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sky-500/20">
                    <User className="w-4 h-4 text-sky-400" />
                  </div>
                )}
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
              </button>
            ) : (
              /* Not logged-in: show Sign up */
              <>
                <button
                  onClick={() => onOpenRegister("Contributor", "login")}
                  className="hidden sm:inline-block font-inter text-xs sm:text-sm font-medium text-foreground hover:text-[#7dd3fc] transition-colors px-3 py-2 rounded-lg cursor-pointer"
                >
                  Log in
                </button>
                <Magnetic pullFactor={0.2}>
                  <button
                    onClick={() => onOpenRegister("Contributor", "signup")}
                    className="btn-shine btn-primary text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer font-semibold"
                  >
                    Sign up
                  </button>
                </Magnetic>
              </>
            )
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-card/98 border-b border-border p-6 shadow-2xl animate-in slide-in-from-top-4 duration-200 backdrop-blur-xl">
          <nav className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className="font-inter text-base font-medium text-foreground hover:text-[#7dd3fc] py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister("Contributor", "login");
              }}
              className="w-full py-2.5 rounded-xl border border-border font-inter text-sm font-medium text-foreground hover:text-[#7dd3fc] hover:border-[#7dd3fc] transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister("Contributor", "signup");
              }}
              className="btn-shine w-full py-3 rounded-xl bg-[#7dd3fc] text-[#07111f] font-inter font-semibold text-center cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
