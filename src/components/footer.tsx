"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  NexusLogo,
  DiscordIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  WhatsAppIcon,
  GitHubIcon,
} from "./brand-icons";

export function Footer() {
  const socialLinks = [
    {
      name: "Discord",
      href: "https://discord.gg/bZ47fac2jn",
      icon: DiscordIcon,
      ariaLabel: "Discord",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/nsoc.in",
      icon: InstagramIcon,
      ariaLabel: "Instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/nso-code",
      icon: LinkedInIcon,
      ariaLabel: "LinkedIn",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@nsoc-in",
      icon: YouTubeIcon,
      ariaLabel: "YouTube",
    },
    {
      name: "WhatsApp",
      href: "https://chat.whatsapp.com/Cs6bcCYUD5zLXmElzX9HOq",
      icon: WhatsAppIcon,
      ariaLabel: "WhatsApp",
    },
    {
      name: "GitHub",
      href: "https://github.com/deepanshu-prajapati01",
      icon: GitHubIcon,
      ariaLabel: "GitHub",
    },
  ];

  return (
    <footer className="relative border-t border-sky-400/15 bg-background dark:bg-[#050a14] px-4 sm:px-8 md:px-12 py-12 lg:py-16 overflow-hidden">
      {/* Decorative ambient subtle background blur */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 lg:gap-16 mb-12">
          {/* Brand info */}
          <div className="flex flex-col max-w-md shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <NexusLogo className="w-9 h-9" />
              <span className="font-syne text-2xl font-bold tracking-tight text-foreground">
                NSoC ’26
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              A 45-day open source program where project admins bring real codebases and contributors close issues that ship to production.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="w-10 h-10 rounded-xl border border-sky-400/20 text-muted-foreground hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-500/10 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="flex gap-12 sm:gap-20 lg:gap-28 flex-wrap">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-sky-500 dark:text-sky-400 font-semibold mb-4">
                Navigation
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="#overview"
                    className="font-syne text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#rewards"
                    className="font-syne text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="font-syne text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-sky-500 dark:text-sky-400 font-semibold mb-4">
                Organization
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="#sponsors"
                    className="font-syne text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sponsors
                  </a>
                </li>
                <li>
                  <a
                    href="#partners"
                    className="font-syne text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Team & Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright and authentic last updated timestamp */}
        <div className="pt-8 border-t border-sky-400/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-mono text-muted-foreground">
            <span>© 2026 NSoC. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Last Updated: 6 October 2026 at 10:17:51 am</span>
          </div>

          <p className="font-mono text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by the Nexus team
          </p>
        </div>
      </div>
    </footer>
  );
}
