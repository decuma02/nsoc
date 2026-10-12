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
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/nsoc.in",
      icon: InstagramIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/nso-code",
      icon: LinkedInIcon,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@nsoc-in",
      icon: YouTubeIcon,
    },
    {
      name: "WhatsApp",
      href: "https://chat.whatsapp.com/Cs6bcCYUD5zLXmElzX9HOq",
      icon: WhatsAppIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/deepanshu-prajapati01",
      icon: GitHubIcon,
    },
  ];

  return (
    <footer className="relative bg-[#040c16] text-[#f1f7fc] pt-20 pb-12 border-t border-border overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <NexusLogo className="w-8 h-8 text-[#7dd3fc]" />
              <span className="font-syne font-bold text-3xl tracking-tight text-[#f1f7fc]">
                NSoC&apos;26
              </span>
            </Link>
            <p className="font-inter text-base text-[#a9bcd0] leading-relaxed max-w-sm mb-6">
              A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 flex flex-wrap gap-16 lg:gap-24 md:justify-end">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#7dd3fc] mb-4">
                Navigation
              </div>
              <ul className="space-y-3 font-inter text-sm text-[#a9bcd0]">
                <li>
                  <Link href="/" className="hover:text-[#f1f7fc] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="https://nsoc.in/leaderboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f1f7fc] transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="https://nsoc.in/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f1f7fc] transition-colors"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#7dd3fc] mb-4">
                Organization
              </div>
              <ul className="space-y-3 font-inter text-sm text-[#a9bcd0]">
                <li>
                  <a href="#sponsors" className="hover:text-[#f1f7fc] transition-colors">
                    Sponsors
                  </a>
                </li>
                <li>
                  <a
                    href="https://nsoc.in/team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f1f7fc] transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/bZ47fac2jn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f1f7fc] transition-colors"
                  >
                    Discord Server
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-14">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="px-4 py-2 rounded-xl bg-[#101f32] border border-[#26394e] text-[#a9bcd0] hover:text-[#7dd3fc] hover:border-[#7dd3fc] flex items-center gap-2 font-inter text-sm transition-all"
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Giant Watermark from Figma Frame: Syne 800 158px */}
        <div
          aria-hidden="true"
          className="w-full text-center select-none py-8 my-4"
        >
          <div className="font-syne font-extrabold text-[56px] sm:text-[96px] md:text-[128px] lg:text-[158px] tracking-tight leading-none text-white/[0.06] dark:text-white/[0.06]">
            NSoC ’26.
          </div>
        </div>

        {/* Section Rule */}
        <div className="border-t border-[#26394e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-xs text-[#a9bcd0]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 NSoC. All rights reserved.</span>
            <span>•</span>
            <span suppressHydrationWarning>
              Last Updated: {typeof window !== "undefined"
                ? new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "October 2026"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by the Nexus team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
