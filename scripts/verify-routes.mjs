import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = JSON.parse(fs.readFileSync(path.join(root, "content/public-routes.json"), "utf8"));
const missing = [];

for (const { path: route } of routes) {
  const pageFile = route === "/"
    ? path.join(root, "app/page.tsx")
    : path.join(root, "app", route.slice(1), "page.tsx");
  if (!fs.existsSync(pageFile)) missing.push({ route, pageFile: path.relative(root, pageFile) });
}

if (missing.length) {
  console.error(`Route verification failed: ${missing.length} route(s) have no page.tsx.`);
  for (const item of missing) console.error(` ✗ ${item.route} -> ${item.pageFile}`);
  process.exit(1);
}

console.log(`Route verification passed: ${routes.length}/${routes.length} public routes.`);
for (const { path: route } of routes) console.log(` ✓ ${route}`);
