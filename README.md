# DeeQ Studio — live release

Production website for `deeqstudio.com`. Static, dependency-free HTML/CSS/JS, prepared for direct deployment on Vercel.

## Deploy

1. Keep the existing `.git/` folder in your local DeeQ Studio repository.
2. Replace the previous website files with the contents of this package.
3. Open the repository folder in VS Code.
4. Run `git status` and inspect the changes.
5. Commit and push. No `npm install` or build command is required.

`vercel.json` enables clean public URLs such as `/work`, `/services/web-design` and `/contact`.

## Public routes

- `/`
- `/work`
- `/work/de-kweker`
- `/work/kwartier-west`
- `/services`
- `/services/web-design`
- `/services/identity`
- `/services/digital-care`
- `/process`
- `/contact`
- `/nl/webdesign-brugge`

## Production notes

- Only real DeeQ Studio, De Kweker and Kwartier West assets are used.
- De Kweker and Kwartier West have project-specific case direction rather than a shared visual template.
- Service and brand-system showcases use finished project work instead of temporary mockups.
- The approved DeeQ Studio Open Graph artwork is used for general DeeQ routes; project cases retain project-specific social imagery.
- The DQ favicon system includes ICO, SVG, size-specific PNGs, Apple Touch and maskable PWA assets.
- Canonical URLs, titles, descriptions, social metadata, sitemap and robots are included.
- Motion remains progressively enhanced and preserves complete readable content when `prefers-reduced-motion` is enabled.
- Domain, code and assets are presented as client-owned; ongoing care remains optional.

## Before a live push

Do not commit local Vercel caches, screenshots, QA exports or operating-system files. The supplied production folder intentionally contains none of these.
