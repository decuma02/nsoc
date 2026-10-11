# Visual Design & Motion Context — Website Reference

> Purpose: Give an AI implementation/design agent a content-independent description of the visual system, assets, layout patterns, motion, and frontend conventions found in the supplied saved HTML page.
>
> **Scope rule:** Do not reuse or reproduce the original website's copy, event details, names, dates, or marketing content. Use this document only as a visual/technical reference. Replace all content with the new project's own content.
>
> **Evidence note:** This analysis is based on the supplied saved HTML source. A saved-page capture can contain browser-extension artifacts and can lose runtime behavior or original asset paths. Distinguish CSS-defined behavior from anything that would require a live browser to verify.

## 1. Overall visual direction

- Dark-first, modern developer/community landing-page aesthetic.
- High-contrast interface with deep dark surfaces, bright blue/cyan accents, and soft blue-tinted highlights.
- Contemporary, polished, slightly futuristic tech-event style rather than a conventional corporate template.
- Large, expressive display typography paired with highly legible sans-serif body text and monospaced technical text.
- Sections are organized as a long, vertically scrolling landing page with clear blocks, cards, logos, and action areas.
- Decorative atmosphere is created with softly moving gradient/blob elements, gradient text, and animated highlights rather than relying only on photography.
- Interface combines restrained surfaces and borders with occasional glow/gradient emphasis.
- Both dark and light logo assets are present; the root HTML declares a dark theme and dark color scheme, and logo variants are switched using dark-mode utility classes.

## 2. Color and surface language

### Observed palette cues
- Near-black / very dark backgrounds and dark neutral surfaces.
- Slate, gray, and zinc neutrals for supporting surfaces and borders.
- Bright sky blue, cyan, and blue for primary accents.
- Pale/soft blue used for emphasis and hover surfaces in at least one themed section.
- Gradient spectrum includes sky blue, pale blue, light cyan, and deeper blue.
- White and near-white text on dark surfaces, with muted blue-gray secondary text.

### Gradients and effects
- Animated gradient text uses a multi-stop horizontal gradient and a background wider than the text, moved over time.
- A gradient background-position animation creates a continuously shifting color treatment.
- A button treatment includes a translucent white diagonal shine passing over the control on hover.
- Blurred/softly moving blob-like decorative shapes are implemented with CSS transforms.
- Standard utility support includes opacity, blur, shadows, and color transitions.

### Borders, corners, depth
- Rounded logo containers and rounded image treatments are present.
- Cards and image containers use rounded corners; some image/logo items have subtle hover scaling.
- Borders are used as low-key separators and accent outlines.
- Shadow and blur utilities are available in the compiled styling. Use them sparingly to preserve the clean tech aesthetic.

## 3. Typography

The source defines local font faces for:
- **Syne** — display/headline font; geometric, distinctive, expressive.
- **Inter** — general UI and body typography.
- **JetBrains Mono** — monospaced/technical typography.

Fallback font faces are defined for each family. The stylesheet is generated/bundled and includes multiple unicode subsets and font-weight ranges.

Suggested role mapping for a recreation:
- Display headings: Syne, strong weight, compact line height.
- Body copy, labels, navigation, buttons: Inter.
- Code-like labels, counters, small technical metadata: JetBrains Mono.
- Use a clear type scale and strong size/weight contrast between hero heading, section headings, card headings, and supporting text.

## 4. Layout and component patterns

- Responsive, vertically scrolling single-page landing layout.
- Navigation/header includes a brand mark and theme-specific logo variants.
- Content is broken into distinct sections rather than one continuous text column.
- Repeated card/grid patterns for grouped items.
- Partner/sponsor-style logo wall using repeated image containers; logos are contained rather than cropped.
- Avatar/profile-style image treatment exists.
- Action controls include buttons with hover states and animated shine styling.
- Images commonly use `object-contain` when logos should retain their original proportions.
- Some image items use `object-cover`/full-container sizing where the asset is intended to fill a region.
- Utility classes indicate responsive layout, spacing, flex/grid arrangements, rounded corners, and dark-mode variants.
- Root document enables smooth anchor scrolling (`scroll-behavior: smooth` and a `scroll-smooth` class).
- There are dialog/toast-style animation utilities in the bundled CSS, but the saved source alone does not establish that every such utility is visibly used in the original page.

## 5. Animations and motion inventory

This section separates custom animations and utility-framework animations that are present in the source. A class/keyframe being present in a compiled stylesheet does not by itself prove that every instance appears in the visible page.

### 5.1 Continuous marquee
- Keyframe: `marquee`.
- Motion: horizontal translation from the initial position to `translateX(-50%)`.
- Duration/easing/loop: 30 seconds, linear, infinite.
- Class: `animate-marquee`.
- Visual purpose: seamless, continuously moving horizontal strip, typically suitable for partner logos, tags, or repeated items.
- Implementation note: a seamless loop generally requires duplicated/repeated content so the translated half can replace the first half without a jump.

### 5.2 Floating / drifting background blobs
- Keyframe: `blob-drift`.
- Motion: returns to the original transform at the beginning/end, moves approximately 40px horizontally and -30px vertically at midpoint, and scales to about 1.08.
- Standard variant: 22 seconds, ease-in-out, infinite.
- Delayed variant: same duration with a negative delay of 8 seconds.
- Slow variant: 26 seconds, ease-in-out, infinite, with a negative delay of 14 seconds.
- Classes: `animate-blob-drift`, `animate-blob-drift-delay`, `animate-blob-drift-slow`.
- Visual purpose: slow ambient motion in decorative background shapes; gives depth without distracting from text.
- Implementation note: use oversized blurred radial/gradient shapes, low opacity, absolute positioning, and keep them behind interactive content.

### 5.3 Animated gradient text
- Keyframe: `gradmove`.
- Motion: animates background position toward `300%`.
- Duration/easing/loop: 8 seconds, linear, infinite.
- Class/style hook: `.grad-text`.
- Gradient uses multiple blue/cyan/pale-blue stops; text color is transparent and background is clipped to the glyphs.
- Visual purpose: emphasized display text with slowly shifting gradient color.
- Implementation note: apply to short headings or select phrases, not all text.

### 5.4 Button shine sweep
- Component style hook: `.btn-shine`.
- Pseudo-element: a translucent white linear-gradient band, about 40% of the control width, full height, skewed diagonally and initially positioned left of the visible button.
- Keyframe: `btn-shine-sweep`, moving the band from `left: -60%` to `left: 140%`.
- Trigger: hover (`.btn-shine:hover:after`).
- Visual purpose: a brief reflective sweep on hover.
- Implementation note: parent clips overflow; keep text/icon above the pseudo-element and ensure keyboard focus also has a clear visible state.

### 5.5 Spin
- Keyframe: `spin`, rotating to 360 degrees.
- Utility: `animate-spin`.
- Utility default: 1 second, linear, infinite.
- Count in saved HTML class scan: 16 occurrences.
- Visual purpose: loading indicators or rotating icon affordances.
- Note: class count is source occurrence count, not necessarily the number of distinct visible spinners.

### 5.6 Ping / expanding fade
- Keyframe: `ping`.
- Motion: at 75% and completion, opacity reaches 0 while scale reaches 2.
- Utility: `animate-ping`.
- Utility default: 1 second, cubic-bezier timing, infinite.
- Count in saved HTML class scan: 10 occurrences.
- Visual purpose: attention/ripple status indicator, often paired with a small dot.
- Use only for status/notification emphasis, not decorative overload.

### 5.7 Pulse
- Keyframe: `pulse`.
- Motion: opacity drops to 0.5 at the midpoint.
- Utility: `animate-pulse`.
- Utility default: 2 seconds, cubic-bezier timing, infinite.
- Count in saved HTML class scan: 3 occurrences.
- Visual purpose: gentle attention or loading/skeleton affordance.

### 5.8 Enter/exit and small directional transitions
The bundled CSS includes generic enter/exit keyframes driven by CSS variables:
- `enter`: can animate opacity, 3D translation, scale, rotation, and blur from configurable initial values.
- `exit`: can animate toward configurable opacity, translation, scale, rotation, and blur.
- Related utility classes found include `animate-in`, `animate-out`, `fade-in`, `fade-in-0`, `fade-out`, `fade-out-0`, `zoom-in-95`, `zoom-out-95`, and `slide-in-from-*`.
- Directional variants found include slide-in from top, right, left, and bottom.
- These are suitable for menus, popovers, dialogs, toasts, and other transient UI. The source contains shared utility CSS, so do not assume every variant is used on a major page section.

### 5.9 Hover transforms and transitions
- Partner/logo images include `transition-transform`, `duration-500`, `ease-out`, and `group-hover:scale-105`.
- Hover behavior: image scales to roughly 105% when the containing group is hovered.
- A section-specific hover class changes a card/surface to a pale blue color.
- Transition styling is used for smooth state changes instead of abrupt visual changes.
- General CSS defaults include a short transition duration (150ms) and ease-in-out timing, while some image hover transitions explicitly use 500ms.

### 5.10 Smooth scrolling
- Root HTML uses `scroll-smooth` and inline `scroll-behavior: smooth`.
- Purpose: anchor/navigation jumps scroll smoothly rather than snapping abruptly.
- This is scroll behavior, not a keyframe animation.

### 5.11 Toast-related motion
The bundled CSS includes `sonner-fade-in`, `sonner-fade-out`, and `sonner-spin` keyframes. These appear to be notification/toast-library styling. Treat them as available supporting UI behavior, not proof that a toast is part of the primary visual design.

## 6. Image and asset types

### Brand assets
- Light and dark versions of the same brand logo.
- Logo variants are selected with dark-mode utility classes.
- Logo images use small square dimensions and `object-contain`, with rounded container styling.

### Partner / organization logo assets
- Multiple organization/company/community logos.
- File formats observed in image source references include **WebP, JPEG/JPG, and PNG**.
- Logos are placed in uniform containers and use `object-contain` to avoid cropping.
- Hover scaling is applied to many repeated logo images.
- Repeated items suggest a logo grid/wall or carousel-like strip; the HTML/CSS explicitly confirms a marquee animation class exists, but whether a specific logo wall uses it should be checked against the exact element classes.

### Avatar / profile image
- At least one profile/avatar image sourced from a GitHub avatar URL.
- Uses a square aspect ratio and `object-contain` within an avatar image slot.
- Treat profile imagery as a separate asset category from decorative imagery and logos.

### Video
- One `<video>` element is present in the saved HTML.
- The source capture does not, by itself, establish whether the video is a hero background, embedded media, or another UI element; inspect its enclosing markup and runtime rendering before reproducing its placement.
- A saved-page capture may omit or alter the original video source/behavior.

### SVG and canvas
- The document contains many inline SVG elements (70 occurrences detected), likely covering icons, logos, and vector UI/decorative shapes.
- Two canvas elements are present. The source scan alone does not establish their intended drawing or runtime behavior.
- Do not assume canvas means a specific particle effect or animation without inspecting the associated scripts.

### Favicon
- A favicon is embedded in the HTML as a data URI. It is a browser-tab asset, not necessarily a visible page element.

### Image delivery and saved-page caveat
- The source includes Next.js image optimization URL patterns (`/_next/image?...`) and references local public assets.
- Because the supplied HTML is a saved-page capture, many original `src` attributes are replaced with embedded `data:` URIs and `data-savepage-*` attributes. Those attributes are capture-tool artifacts, not part of the intended design system.
- Use real local or hosted assets in an implementation. Do not copy enormous base64 payloads from the saved HTML into application source.
- The HTML also contains images associated with a browser extension. Those are capture/environment noise and should not be treated as website design assets.

## 7. Frontend / styling implementation signals

- **Framework:** source structure and image URL patterns indicate a Next.js application.
- **Styling:** Tailwind CSS utility classes and generated utility CSS are present.
- **Fonts:** locally bundled font faces for Syne, Inter, and JetBrains Mono.
- **Theme:** dark-mode class strategy and theme-specific assets.
- **Motion:** primarily CSS keyframes, CSS transitions, transform/opacity changes, and utility classes.
- **No clear animation-library signature found** in the searched source for Framer Motion, GSAP, Lottie, Anime.js, AOS, or Lenis. This is limited to the scanned saved HTML and does not prove that no such library was ever used.
- `scroll-smooth` / CSS smooth scrolling is used; no clear Lenis signature was found.
- No clear `IntersectionObserver` or `requestAnimationFrame` signature was found in the scanned text. Do not infer scroll-triggered reveal behavior unless verified elsewhere.

## 8. Responsive and interaction guidance

- Preserve a responsive layout using the existing utility-first approach.
- Keep navigation, cards, logo walls, and action controls usable at narrow viewport widths.
- Maintain high contrast between foreground text and dark surfaces.
- Keep decorative blobs behind content and prevent them from intercepting pointer events.
- Use `object-contain` for logos and `object-cover` only for imagery designed to fill a frame.
- Provide reduced-motion behavior for continuous animations and hover effects (for example, respect `prefers-reduced-motion`).
- Ensure hover-only effects have equivalent focus-visible feedback for keyboard users.
- Avoid using every animation at once. The design's motion language is a combination of slow ambient movement, restrained interactive transitions, and occasional attention cues.

## 9. Recommended motion hierarchy for a recreation

1. **Ambient/background:** slow drifting blurred blobs, subtle gradient motion.
2. **Brand emphasis:** animated gradient on selected headline text.
3. **Continuous section motion:** horizontal marquee, if the design needs a repeated logo/tag strip.
4. **Interactive hover:** image scale-up, surface color transition, button shine.
5. **Transient UI:** fade/slide/zoom for menus, dialogs, and notifications.
6. **Status/loading:** spin, ping, pulse only where functionally meaningful.
7. **Navigation:** smooth anchor scrolling.

## 10. Do not copy / do not infer

- Do not reproduce any original marketing copy, program details, dates, statistics, names, or calls to action.
- Do not treat sponsor names or profile names as required assets; they are examples of asset categories only.
- Do not treat browser-extension shield/banner/close icons as site components.
- Do not assume every compiled Tailwind animation utility is visibly used in the page.
- Do not assume the canvas or video has a particular effect without runtime inspection.
- Do not invent a particle system, 3D scene, parallax scroll effect, or scroll-triggered reveal if it is not evidenced.
- Do not copy base64-encoded images from the saved HTML. Recreate or source appropriate assets for the new project.

## 11. AI implementation brief

When using this file as context, the AI should:
- Build a fresh page using the visual language described above, not a copy of the original page's content.
- Use dark-first styling, blue/cyan accents, subtle gradients, rounded cards, and strong typographic hierarchy.
- Use Syne-like display typography, Inter-like UI typography, and monospaced typography for technical details (or suitable available alternatives).
- Implement the motion inventory selectively using CSS keyframes and transitions.
- Prioritize accessible contrast, responsive layout, reduced-motion support, and keyboard focus states.
- Use generic/new project content and newly chosen assets.
- Keep decorative animation low-distraction and avoid unnecessary animation-library dependencies.
- Verify video/canvas behavior and exact animation placement in a browser before claiming them as part of the original design.
