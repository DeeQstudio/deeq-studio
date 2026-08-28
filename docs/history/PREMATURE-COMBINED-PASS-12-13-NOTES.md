# Pass 13 — responsive hardening, motion polish & production QA

> **Historical note:** this was the premature combined Pass 12/13 run performed before the required local Pass 11.1 checkpoint. It is retained for traceability, but it is **not** the current Pass-13 certification. A fresh Pass 13 must be run after the normalized Pass 12 is locally approved.

Protected baseline: Pass 11 mobile art direction and all Pass 8.1/9/10 source-of-truth identity/case work.

## Responsive hardening
- Added `viewportFit: cover` and safe-area handling for notches, Dynamic Island/home indicators and rotated phones.
- Added explicit responsive classes for:
  - narrow phones down to 320px,
  - normal phones,
  - 701–980px portrait tablets/open foldables,
  - 981–1180px large tablets/foldables,
  - short landscape phones up to 980px wide / 560px high.
- Added touch-target hardening for coarse pointers.
- Kept the existing visual direction; these are geometry/edge-case rules, not redesigns.
- Kwartier West vertical edge copy is kept inside the viewport below 1180px instead of relying on desktop bleed.

## Motion / interaction
- Reduced parallax amplitude on coarse-pointer devices.
- Disabled decorative project parallax in short landscape where vertical room is limited.
- Reduced DeeQ hero split distance in short landscape.
- ScrollTrigger ignores minor mobile browser-bar resizes and refreshes after orientation/page restore.
- Added keyboard focus states and restrained fine-pointer hover feedback.
- Cursor orbit now respects `prefers-reduced-motion` as well as coarse pointers.

## Production QA fixes
- Explicit DeeQ browser/app icons wired into root metadata.
- Added 16, 180 and 192px icon derivatives from the approved DQ source mark.
- Manifest now provides 192 and 512px icons.
- Added root theme colour through Next viewport metadata.
- Dutch Brugge route now exposes `lang="nl"` at page content level.
- Decorative Kwartier West edge text is `aria-hidden`.
- Next-project navigation has an accessible label.
- Corrected responsive `sizes` hints for project/source-proof imagery.
- Removed eager loading from the below-the-fold De Kweker project image.
- Removed four unused legacy/archive media assets (~3MB) that were no longer referenced by the site.
- Sitemap last-modified date updated to 2026-08-28.

## QA performed in sandbox
- 11/11 public routes present.
- 35 TS/TSX files syntax-transpiled with zero syntax diagnostics.
- Local import check: zero missing imports.
- Local `/media/` reference check: zero missing assets.
- CSS braces balanced.
- Static internal href check: zero missing route candidates.
- Basic source accessibility audit: all Next `Image` instances have `alt`; external target links have `rel`; navigational landmarks checked.
- No TODO/FIXME/Lorem/Unsplash/example.com placeholders found.
- Chromium responsive geometry harness used exact project CSS, representative production markup and real project assets.
  - Home tested at 320×568, 360×800, 375×812, 390×844, 430×932, 844×390, 720×748, 884×1104, 768×1024, 820×1180, 1024×768 and 1440×900.
  - Case pages, services, process, service detail, contact and Brugge route tested across phone, landscape, foldable/tablet and desktop classes.
  - No unexpected horizontal overflow in the tested matrices.
  - Simulated portrait and landscape safe-area insets also remained within viewport width.

## Known environment limitation
A full `next build` could not be executed in this sandbox because project dependencies are not installed here and `npm ci` cannot complete in the environment. Do not treat the static/syntax QA above as a substitute for one final local `npm install && npm run build` before production deployment.
