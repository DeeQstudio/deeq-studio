# DeeQ Studio — production website

Static, dependency-free production build for `deeqstudio.com`.

## Deploy

1. Keep the existing `.git/` folder in your local DeeQ Studio repository.
2. Replace the previous public website files with the contents of this package.
3. Open the repository folder in VS Code.
4. Run `git status` and inspect the changes.
5. Commit and push. Vercel can serve the site directly; no npm install or build command is required.

## URL architecture

The primary navigation uses real crawlable routes instead of hash navigation:

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

Section IDs may still exist inside documents for accessibility and scripting, but public navigation does not expose `#work`-style URLs.

## SEO foundations

Every indexable route has its own title, description, canonical URL and social metadata. `sitemap.xml` contains the routed pages. The English web-design service and Dutch/Flemish Bruges page use language alternates.

## Assets

Only real DeeQ Studio / client assets are used. No fictitious client work is included.

## V4.2 case direction

The De Kweker and Kwartier West presentations are deliberately project-specific. De Kweker is handled as a photographic artist platform centred on `kwkr.be`, media, live and booking. Kwartier West keeps its own graphic collective identity, using the supplied OG image and wordmark with a separate event/booking presentation. Shared engineering does not force a shared case layout.
