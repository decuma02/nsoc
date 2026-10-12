# Repository Guidelines — Nexus Spring of Code '26 (Winter Edition)

## 1. Project Overview & Architecture

`nsoc-website` is the official open-source campaign website for **Nexus Spring of Code '26 (Winter Edition)**. It is built as an art-directed, editorial developer landing page with layered atmospheric winter visuals, GSAP motion choreography, and high-contrast typography.

### Technology Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Library:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, Vanilla CSS Design System, Radix UI Primitives, `next-themes`
- **Motion & Parallax:** GSAP 3 & ScrollTrigger, Motion, native CSS Keyframes
- **Icons:** Lucide React, Custom Brand Vector Marks (`src/components/brand-icons.tsx`)
- **Package Manager:** Bun (preferred) / npm

---

## 2. Workspace Directory Structure

```
nsoc-website/
├── public/                     # Static media & artwork
│   ├── winter-panda-1.png      # Transparent mascot with looping wave animation
│   ├── winter-panda-2.png      # Alternate mascot asset
│   ├── logo_dark.png           # Nexus brand mark (dark mode)
│   ├── logo_light.png          # Nexus brand mark (light mode)
│   ├── sponsers/               # Authentic sponsor and partner logo assets
│   └── favicon.ico             # Brand favicon
├── src/
│   ├── app/
│   │   ├── globals.css         # Design tokens, @theme inline, card sheen & keyframes
│   │   ├── layout.tsx          # Root layout with SnowParticles canvas & Google Fonts
│   │   └── page.tsx            # Landing page assembling sections in exact Figma order
│   ├── components/
│   │   ├── brand-icons.tsx     # Brand marks & social vector icons
│   │   ├── magnetic.tsx        # Magnetic cursor pull for buttons & CTAs
│   │   ├── tilt-3d.tsx         # 3D perspective card tilt on hover
│   │   ├── snow-particles.tsx  # Dynamic physics-based canvas snowfall simulation
│   │   ├── footer.tsx          # Comprehensive footer with exact links & copyright
│   │   ├── inquiry-modal.tsx   # Sponsor & Community partnership inquiry modal
│   │   ├── navbar.tsx          # Sticky navigation, Ctrl+K theme toggle, mobile drawer
│   │   ├── register-modal.tsx  # Track registration modal with role pre-selection
│   │   ├── theme-provider.tsx  # next-themes dark/light provider
│   │   └── sections/           # Individual editorial landing page sections
│   │       ├── hero-section.tsx      # Split hero, stationary text, aurora parallax, stats
│   │       ├── benefits-section.tsx  # 01 / About editorial split + 4 3D benefit cards
│   │       ├── roles-section.tsx     # Participation roles (Contributor, Kernel, Ambassador)
│   │       ├── quote-section.tsx     # Full-width program manifesto quote block
│   │       ├── steps-section.tsx     # 02 / Contribution journey with circular nodes
│   │       ├── rewards-section.tsx   # 03 / Prizes with animated pill, Rank 1 glow, 3D tilt
│   │       ├── timeline-section.tsx  # 04 / Serpentine mathematical SVG curve with traveling orb
│   │       ├── sponsors-section.tsx  # 05 / Past sponsors grid with official logos & external links
│   │       └── partners-section.tsx  # 06 / Infinite marquee carousel + 15 partner tiles
│   └── lib/
│       └── utils.ts            # clsx and tailwind-merge helper
├── nexus_spring_of_code_content.md    # Authentic extracted copy & fact reference
├── visual_design_motion_context.md    # Reference motion inventory and visual direction
└── package.json
```

---

## 3. Section Hierarchy (Exact Order)

Every page update must preserve the section ordering specified in the Figma Desktop design (`5:36025`):

1. **Hero & Program Statistics** (`hero-section.tsx`): 45-day badge, 96px headline (`Nexus / Spring of / Code.`), 22px edition tag (`’26 — Winter Edition`), 18px description, dual CTAs, deepfake verification badge, and 56px stats counter bar (`45`, `10K+`, `300+`).
2. **01 / About the Program** (`benefits-section.tsx`): Editorial split, interactive giant `↗` arrow, and 4 benefit cards (`Real projects.`, `Structured guidance.`, `Earned recognition.`, `A real community.`).
3. **Participation Roles** (`roles-section.tsx`): 3 tracks (`Contributor`, `Project Kernel`, `Campus Ambassador`) with responsibilities and role-preselecting CTA buttons.
4. **Program Quote Block** (`quote-section.tsx`): Full-width midnight navy card with large quotation mark and authentic manifesto copy.
5. **02 / Contribution Journey** (`steps-section.tsx`): 4 steps (`01 Register`, `02 Explore`, `03 Contribute`, `04 Win`) connected by an animated progress line.
6. **03 / Prizes & Recognition** (`rewards-section.tsx`): Tab switcher between Contributors and Project Admins, complete rewards tiers (Rank 1, Top 3, Top 5, Top 10), and 3 universal participant certificates/badges.
7. **04 / Program Timeline** (`timeline-section.tsx`): 6 dated milestones with dynamic SVG segment draw and illuminated nodes.
8. **05 / Past Sponsors** (`sponsors-section.tsx`): Title (Unstop), Gold (Arkham Experience), and Silver (Extension Shield) sponsors.
9. **06 / Community Partners** (`partners-section.tsx`): 3×5 grid displaying all 15 grassroots college and developer community partners.
10. **Footer** (`footer.tsx`): Quick links, Discord server link, all 6 official social channels, and copyright notice.

---

## 4. Design Tokens & Styling Conventions

### Color System
- **Dark Mode (Default):**
  - `--bg: #040c16` (midnight navy)
  - `--fg: #f1f7fc` (crisp ice white)
  - `--card-bg: #101f32` (tactile card surface)
  - `--navy: #102b3d` (deep navy accent surface)
  - `--border-col: #26394e` (subtle border hairline)
  - `--accent: #7dd3fc` (icy blue)
  - `--accent-teal: #5eead4` (aurora teal)
- **Light Mode:**
  - `--bg: #f1f7fc`
  - `--fg: #07111f`
  - `--card-bg: #ffffff`
  - `--border-col: #cddfea`
  - `--accent: #086388`
  - `--accent-teal: #08786c`

### Typography Hierarchy
- **Display Headings:** `font-syne` (`Syne`, 700 / 800 weight, compact leading).
- **Body & Controls:** `font-inter` (`Inter`, 400 / 600 weight, 1.65 line height).
- **Technical Metadata, Badges & Numbers:** `font-mono` (`JetBrains Mono`, 400 / 500 weight).

### Cards & Controls
- `.card` / `.figma-card`: Solid background, 12–16px border-radius, thin border, diagonal icy-white sheen sweep on hover, 2px translateY lift, and subtle border glow.
- `.card-rank1`: Reserved restrained breathing glow for Rank 1 prizes.
- `.nav-link`: Animated underline expanding on hover.

---

## 5. Motion Guidelines & Restraints

All animations must adhere strictly to the Figma motion guidance:

1. **Hero Parallax:** Desktop only. Aurora depth shifts by 12–20px with mouse pointer or scroll. **Keep text stationary** to prevent font distortion, text shifting, and cumulative layout shift (CLS). Disable parallax on touch devices.
2. **Panda Mascot:** Gentle 6px vertical float over 6s (`ease-in-out`) paired with continuous looping wave animation at `bottom center`. Retain original transparent artwork and framing.
3. **Statistics Count-Up:** Single one-time count-up capped at **700ms**, preserving authentic numbers (`45`, `10K+`, `300+`). Never repeat counting on subsequent scrolls.
4. **Scroll Reveals:** Restrained 12px vertical translation with 400ms opacity fade and 60ms stagger (capped at 240ms). Elements must remain fully visible if JavaScript is disabled.
5. **Timeline Progress:** SVG line draws progressively across segments on scroll; nodes illuminate as the line reaches each milestone.
6. **Tabs Transition:** 150–200ms opacity crossfade between tabs without layout jumping.
7. **Reduced Motion (`prefers-reduced-motion`):** All content must be immediately visible without delay. Disable parallax, floating, count-up, sheens, and looping particles.

---

## 6. Content Integrity

- **Strict Authenticity:** Always use the authentic figures, sponsor descriptions, dates, and partner names documented in [`nexus_spring_of_code_content.md`](nexus_spring_of_code_content.md).
- **No Hallucinated Data:** Do not invent placeholder statistics, fake partner organizations, dummy testimonials, or fictional schedule dates.

---

## 7. Development & Verification Commands

```bash
# Run local development server
bun dev
# or
npm run dev

# Run TypeScript type check
bun run --bun tsc --noEmit

# Run production build verification
bun run build
```

Always verify with `bun run --bun tsc --noEmit` and `bun run build` before committing any changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
