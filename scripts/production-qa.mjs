import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoots = ["app", "components", "content", "lib"];
const sourceFiles = sourceRoots.flatMap((dir) => walk(path.join(root, dir))).filter((file) => /\.(?:ts|tsx|css|json)$/.test(file));
const codeFiles = sourceFiles.filter((file) => /\.(?:ts|tsx)$/.test(file));
const text = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const routes = JSON.parse(fs.readFileSync(path.join(root, "content/public-routes.json"), "utf8"));
const routeSet = new Set(routes.map(({ path: route }) => route));
const errors = [];
const warnings = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function existsModule(specifier) {
  if (!specifier.startsWith("@/")) return true;
  const base = path.join(root, specifier.slice(2));
  return [base, `${base}.ts`, `${base}.tsx`, `${base}.json`, path.join(base, "index.ts"), path.join(base, "index.tsx")].some(fs.existsSync);
}

for (const file of codeFiles) {
  const rel = path.relative(root, file);
  const src = fs.readFileSync(file, "utf8");

  for (const match of src.matchAll(/from\s+["'](@\/[^"']+)["']/g)) {
    if (!existsModule(match[1])) errors.push(`${rel}: missing local import ${match[1]}`);
  }

  for (const match of src.matchAll(/<Image\b[\s\S]*?\/>/g)) {
    if (!/\balt\s*=/.test(match[0])) errors.push(`${rel}: Next Image without alt`);
  }

  for (const match of src.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/g)) {
    if (!/\brel=["'][^"']*(?:noreferrer|noopener)[^"']*["']/.test(match[0])) errors.push(`${rel}: target=_blank link without noreferrer/noopener`);
  }

  for (const match of src.matchAll(/(?:href|src)=(["'])(\/[^"'#?]*)\1/g)) {
    const value = match[2];
    if (value.startsWith("/media/")) {
      const asset = path.join(root, "public", value.slice(1));
      if (!fs.existsSync(asset)) errors.push(`${rel}: missing public asset ${value}`);
    } else if (!value.includes(".") && value !== "/" && !routeSet.has(value)) {
      warnings.push(`${rel}: internal path not in public route manifest: ${value}`);
    }
  }
}

for (const match of text.matchAll(/["'`](\/media\/[^"'`)\s]+)["'`]/g)) {
  const asset = path.join(root, "public", match[1].slice(1));
  if (!fs.existsSync(asset)) errors.push(`Missing referenced public asset ${match[1]}`);
}

const forbidden = /\b(?:TODO|FIXME|Lorem ipsum|example\.com|unsplash\.com)\b/i;
for (const file of sourceFiles) {
  const src = fs.readFileSync(file, "utf8");
  if (forbidden.test(src)) errors.push(`${path.relative(root, file)}: placeholder/debug marker found`);
}

const mediaFiles = walk(path.join(root, "public/media"));
for (const file of mediaFiles) {
  const url = `/${path.relative(path.join(root, "public"), file).split(path.sep).join("/")}`;
  if (!text.includes(url)) warnings.push(`Unreferenced media asset: ${url}`);
}

const generatedJunk = ["node_modules", ".next", "tsconfig.tsbuildinfo"].filter((name) => fs.existsSync(path.join(root, name)));
if (generatedJunk.length) warnings.push(`Generated files present in source checkpoint: ${generatedJunk.join(", ")}`);

if (errors.length) {
  console.error(`Production QA failed with ${errors.length} error(s):`);
  for (const error of [...new Set(errors)]) console.error(` ✗ ${error}`);
  process.exit(1);
}

console.log(`Production source QA passed across ${sourceFiles.length} source files and ${routes.length} public routes.`);
for (const warning of [...new Set(warnings)]) console.warn(` ! ${warning}`);
