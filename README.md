# DeeQ Studio

Production website for [deeqstudio.com](https://deeqstudio.com), built with Next.js 16 App Router, React and strict TypeScript.

## Architecture

- Server Components are the default.
- Client JavaScript is limited to navigation and progressive motion boundaries.
- All public routes are statically prerendered.
- Project facts live in typed content modules; case art direction remains project-specific.
- The legacy static release remains in the repository during migration as a rollback reference.

## Local development

Requires Node.js 24.

```bash
npm ci
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:routes
npm run test:e2e
```

`verify:routes` starts the production server on port 3210 and checks every public content route, metadata title, canonical URL, heading count and the 404 response.

The Playwright suite runs the production build in desktop and mobile Chromium. It covers all public routes, 320–430 px layouts, horizontal overflow, mobile-menu keyboard behavior, reduced motion and serious/critical WCAG violations on representative pages.

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

## Production safety

The live static baseline is preserved on `main`. Next.js migration work lives on `migration/next-production` until preview QA and explicit production approval are complete.

Do not remove legacy assets or static pages until their references and rollback value have been reviewed after launch. Do not deploy from a dirty worktree.
