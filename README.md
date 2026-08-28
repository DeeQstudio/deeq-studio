# DeeQ Studio — Pass 13 Production QA Checkpoint

Current baseline: the visually approved standalone Pass 12 motion checkpoint, followed by a separate Pass 13 production QA and source-cleanup pass.

## Protected visual baseline
Do not redesign the DeeQ hero or project worlds during production QA. The approved hero choreography and vertical balance are the reference output.

## CSS/source hygiene rule
Do not fix production styling by stacking a later override onto an older rule. Update the canonical rule or remove the obsolete layer. `npm run qa:source` enforces the current CSS cascade/hygiene contract.

## Local release gate

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run qa:source
```

Then inspect the full site locally before promotion to a release candidate.

## Source QA
`npm run qa:source` verifies the public route manifest, CSS cascade/hygiene, local imports, referenced assets, common placeholder/debug markers, image alt coverage and external target-link protection.

See `PASS-13-PRODUCTION-QA.md` for the current QA record. Historical repair notes live in `docs/history/`.
