# DeeQ Studio — Hero regression repair

This checkpoint is based on `DEEQ-STUDIO-CURRENT-PRODUCTION-CANDIDATE.zip`.

## Scope
Only two existing production files were changed:
- `components/logo-hero.tsx`
- `app/globals.css`

## Root cause
The hero's wordmark and DQ mark were centered with CSS `transform: translate(-50%, -50%)` on the same elements whose `transform` property GSAP later controlled for x/scale animation. GSAP therefore replaced the centering transform. The blue axis did not have this centering dependency and remained visible, matching the observed regression.

## Repair
Static anchor wrappers now own viewport centering. GSAP only transforms the inner motion layers. The visual concept remains the same: full DeeQ wordmark first, split transition, DQ mark resolved in the same centre.

## Fallback
Without motion / with reduced motion, the full wordmark remains visible and the caption is readable.

## Verification performed here
- 11 public routes present (`scripts/verify-routes.mjs`)
- changed TSX syntax parsed successfully with TypeScript
- CSS brace balance valid
- wordmark and DQ production assets exist
- diff against previous candidate confirms only the two scoped production files differ

A complete `next build` could not be claimed in this runtime because dependency installation did not complete cleanly. Run locally with the project's normal `npm install` / `npm run dev` flow for the final interactive check.
