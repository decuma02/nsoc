"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Menu, X } from "lucide-react";
import { NexusLogo } from "./brand-icons";

interface NavbarProps {
  onOpenRegister: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "About", href: "#about" },
    { label: "Contribution", href: "#contribution" },
    { label: "Rewards", href: "#rewards" },
    { label: "Timeline", href: "#timeline" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Community", href: "#community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? "h-20 bg-[var(--bg)]/90 backdrop-blur-md border-[var(--border-col)] shadow-sm"
          : "h-22 bg-[var(--bg)]/80 backdrop-blur-sm border-[var(--border-col)]/60"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc] rounded-lg p-1"
        >
          <NexusLogo className="w-8 h-8 text-[#7dd3fc]" />
          <span className="font-syne font-bold text-2xl tracking-normal text-foreground">
            NSoC&apos;26
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Show Notifications"
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-cyan-accent hover:border-[#7dd3fc] transition-colors focus-visible:ring-2 focus-visible:ring-[#7dd3fc]"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Notification Dropdown (Figma Spec) */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-card border border-border rounded-xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-border mb-3">
                  <span className="font-syne font-bold text-sm text-foreground">Notifications</span>
                  <span className="font-mono text-[10px] text-muted-foreground">0 NEW</span>
                </div>
                <p className="font-inter text-xs text-muted-foreground text-center py-4">
                  No notifications yet
                </p>
              </div>
            )}
          </div>

          {/* Theme Control */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Theme control"
            className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-cyan-accent hover:border-[#7dd3fc] transition-colors focus-visible:ring-2 focus-visible:ring-[#7dd3fc]"
          >
            {mounted && theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Log in */}
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-block font-inter text-sm font-medium text-foreground hover:text-cyan-accent transition-colors px-3 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-cyan-accent"
          >
            Log in
          </button>

          {/* Sign up (Primary Button) */}
          <button
            onClick={onOpenRegister}
            className="btn-primary text-sm py-2.5 px-5 rounded-xl shadow-sm transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-accent"
          >
            Sign up
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-card/98 border-b border-border p-6 shadow-2xl animate-in slide-in-from-top-4 duration-200 backdrop-blur-xl">
          <nav className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-inter text-base font-medium text-foreground hover:text-cyan-accent py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-xl bg-[#7dd3fc] text-[#07111f] font-inter font-semibold text-center"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
