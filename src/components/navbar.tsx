"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { NexusLogo, WinterSnowflake } from "./brand-icons";

interface NavbarProps {
  onOpenRegister: () => void;
}

export function Navbar({ onOpenRegister }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "Benefits", href: "#benefits" },
    { label: "Roles", href: "#roles" },
    { label: "How to Start", href: "#how-to-start" },
    { label: "Rewards", href: "#rewards" },
    { label: "Timeline", href: "#timeline" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Partners", href: "#partners" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 dark:bg-[#050a14]/85 backdrop-blur-xl border-b border-sky-400/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl p-1 -m-1"
          >
            <NexusLogo className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-syne text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  NSoC ’26
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-sky-400/30 bg-sky-500/10 text-sky-500 dark:text-sky-300">
                  <WinterSnowflake className="w-3 h-3 animate-spin [animation-duration:12s]" />
                  Winter Edition
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                45-Day Open Source Sprint
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sky-500/10 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme mode"
              className="p-2 rounded-xl border border-sky-400/20 bg-background/50 hover:bg-sky-500/10 text-muted-foreground hover:text-foreground transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {mounted && theme === "light" ? (
                <Moon className="w-4 h-4 text-sky-600" />
              ) : (
                <Sun className="w-4 h-4 text-sky-400" />
              )}
            </button>

            {/* Desktop Join Now CTA */}
            <button
              onClick={onOpenRegister}
              className="hidden sm:inline-flex btn-shine items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-syne font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join now!</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="lg:hidden p-2 rounded-xl border border-sky-400/20 bg-background/50 hover:bg-sky-500/10 text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] p-4 bg-background/95 dark:bg-[#050a14]/95 backdrop-blur-2xl border-b border-sky-400/20 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-sky-500/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-sky-400/15">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full btn-shine flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-syne font-bold text-sm tracking-wider shadow-lg shadow-sky-500/25"
            >
              <span>Join now!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
