# Pass 13 — Production QA checkpoint

Baseline: `DEEQ-STUDIO-PASS-12-NORMALIZED-CHECKPOINT` after local visual approval.

This pass does not redesign the approved site. It validates and cleans the production source after the standalone Pass 12 motion checkpoint.

## Code hygiene
- Removed dead CSS branches from older, no-longer-rendered iterations (48 unused class families / branches).
- Reduced `app/globals.css` from 86.7 KB to 71.3 KB (about 17.8%) without changing the approved compositions that were touched by the cleanup.
- Removed historical exact-selector cascade debt and obsolete positional reset layers instead of adding another late override patch.
- Removed empty CSS rule shells left by earlier passes.
- Reduced `!important` usage to accessibility/reduced-motion cases only: the screen-reader utility, the global reduced-motion safety rule and the hero reduced-motion state that must beat GSAP inline transforms.
- Added a source regression checker that fails on exact-selector property/shorthand overwrites in the same normalized media context, empty rules, or non-accessibility `!important` declarations.
- Current result: **0 repeated exact-selector property/shorthand conflicts, 0 empty rules, 0 non-accessibility `!important` declarations**.
- Rechecked the identity, source-proof and process layouts affected by the cleanup against the visually approved Pass 12 cascade at 1440×900, 900×1100 and 390×844: **0 computed cascade differences in the tracked layout properties**.
- Removed the unused `navigation` export and moved the public route list into one shared JSON source used by both sitemap generation and route QA.
- Added `.gitignore` coverage for build/cache/test artifacts.
- Removed generated `node_modules` / `tsconfig.tsbuildinfo` from the checkpoint source.
- Archived repair/history notes under `docs/history/` instead of leaving them mixed with current release notes.

## Metadata / indexing
- Homepage title is now absolute, preventing the root title template from appending `| DeeQ Studio` a second time.
- Cleaned redundant title inputs on Contact, Process and the Dutch Bruges landing page.
- Dutch Open Graph locale is `nl_BE`; the page content language is `nl-BE`.
- Sitemap and route verification use one public route manifest (11 routes).
- Canonicals, OG/Twitter metadata, robots and sitemap remain production-domain based.

## Accessibility / interaction
- Added a general `:focus-visible` fallback for links, covering the brand link, footer links and any future links not handled by the more art-directed card focus states.
- Existing skip link, reduced-motion behavior, image alternatives and navigation labels remain intact.

## Security / platform
- Retained `nosniff`, strict referrer policy, permissions policy and `SAMEORIGIN` framing protection.
- Added HSTS for the HTTPS production domain.

## Automated QA run in this checkpoint
- Public routes: **11/11 present**.
- TypeScript/TSX syntax transpile: **35/35 files pass**.
- Local imports: no missing `@/` imports found.
- Local `/media/` references: no missing files found.
- Public media: no unreferenced assets remain.
- Next `Image` source audit: all rendered instances contain `alt`.
- `target="_blank"` source audit: external target links include `noreferrer`/`noopener` protection.
- Placeholder/debug scan: no TODO, FIXME, Lorem, example.com or Unsplash placeholders in production source.
- CSS parser/braces and cascade/hygiene regression checks pass.

## Environment limitation / local release gate
A real Next.js typecheck, lint and production build cannot be certified in this sandbox because npm dependencies are not available in the offline cache. The attempted offline install fails on an uncached package (`zod-validation-error`).

Before deployment, run locally from this exact checkpoint:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run qa:source
```

Only after all five commands pass should this checkpoint move to the **Final Visual Audit**. It is deliberately not labelled a release candidate yet.
