# DeeQ Studio — production static build

This folder is intentionally dependency-free. There is no build step and no package manager requirement.

## Deploy to the existing DeeQ Studio repository
1. Keep the repository's hidden `.git` folder.
2. Replace the current website files with the contents of this folder.
3. Open the repository in VS Code.
4. Preview locally with VS Code Live Server, or run `python3 -m http.server 8080` from the project root and open `http://localhost:8080`.
5. Commit and push. The root `index.html` is ready for a static Vercel deployment.

## Production assets included
- Exact DeeQ Studio wordmark extracted from the supplied logo reference.
- DeeQ D/Q favicon system: SVG, ICO, 16/32/48/180/192/512 PNGs and Apple touch icon.
- Open Graph / social preview image.
- Web app manifest.
- robots.txt and sitemap.xml.
- Branded 404 page.
- Real Kwartier West OG image and exact supplied white wordmark.
- Real De Kweker assets from the supplied KWKR project.

## No external runtime dependencies
The page uses HTML, CSS and a small amount of vanilla JavaScript. No external animation library, font CDN, analytics script or third-party runtime is required.

## Before changing content
The two client cases are deliberately limited to the two real live DeeQ projects: kwkr.be and kwartierwest.be. Do not add filler clients, fake statistics, fake testimonials or placeholder case imagery.
