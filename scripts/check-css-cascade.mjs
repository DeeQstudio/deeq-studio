import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = path.join(root, "app/globals.css");
const css = fs.readFileSync(cssPath, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

const shorthandMap = new Map([
  ["padding", ["padding-top", "padding-right", "padding-bottom", "padding-left"]],
  ["margin", ["margin-top", "margin-right", "margin-bottom", "margin-left"]],
  ["inset", ["top", "right", "bottom", "left"]],
  ["border", [
    "border-top-width", "border-top-style", "border-top-color",
    "border-right-width", "border-right-style", "border-right-color",
    "border-bottom-width", "border-bottom-style", "border-bottom-color",
    "border-left-width", "border-left-style", "border-left-color",
  ]],
  ["border-width", ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"]],
  ["border-style", ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"]],
  ["border-color", ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"]],
  ["background", ["background-color", "background-image", "background-position", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment"]],
  ["font", ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"]],
  ["flex", ["flex-grow", "flex-shrink", "flex-basis"]],
  ["overflow", ["overflow-x", "overflow-y"]],
  ["gap", ["row-gap", "column-gap"]],
]);

const expand = (property) => {
  if (shorthandMap.has(property)) return shorthandMap.get(property);
  const side = property.match(/^border-(top|right|bottom|left)$/)?.[1];
  if (side) return [`border-${side}-width`, `border-${side}-style`, `border-${side}-color`];
  return [property];
};

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (char === quote && source[i - 1] !== "\\") quote = null;
      continue;
    }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

const seen = new Map();
const emptyRules = [];
const disallowedImportant = [];

function parseRules(source, context = "base") {
  let cursor = 0;
  while (cursor < source.length) {
    const open = source.indexOf("{", cursor);
    if (open === -1) break;
    const header = source.slice(cursor, open).trim();
    const close = findMatchingBrace(source, open);
    if (close === -1) throw new Error(`Unbalanced CSS near: ${header.slice(0, 80)}`);
    const body = source.slice(open + 1, close);

    if (header.startsWith("@media") || header.startsWith("@supports") || header.startsWith("@container") || header.startsWith("@layer")) {
      parseRules(body, `${context} > ${header.replace(/\s+/g, "")}`);
    } else if (header && !header.startsWith("@")) {
      const declarations = [];
      let token = "";
      let paren = 0;
      let quote = null;
      for (let i = 0; i <= body.length; i += 1) {
        const char = body[i] ?? ";";
        if (quote) {
          token += char;
          if (char === quote && body[i - 1] !== "\\") quote = null;
          continue;
        }
        if (char === '"' || char === "'") { quote = char; token += char; continue; }
        if (char === "(") paren += 1;
        if (char === ")") paren -= 1;
        if (char === ";" && paren === 0) {
          const colon = token.indexOf(":");
          if (colon > 0) {
            const property = token.slice(0, colon).trim().toLowerCase();
            const value = token.slice(colon + 1).trim();
            const important = /!important\s*$/i.test(value);
            declarations.push({ property, important });
            if (important && header !== ".srOnly" && !context.includes("prefers-reduced-motion")) {
              disallowedImportant.push(`${context} :: ${header} -> ${property}`);
            }
          }
          token = "";
        } else token += char;
      }

      if (declarations.length === 0) emptyRules.push(`${context} :: ${header}`);
      const key = `${context}|||${header.replace(/\s+/g, " ")}`;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key).push(declarations.map(({ property }) => property));
    }
    cursor = close + 1;
  }
}

parseRules(css);
const conflicts = [];
for (const [key, blocks] of seen) {
  if (blocks.length < 2) continue;
  const later = new Set();
  for (let index = blocks.length - 1; index >= 0; index -= 1) {
    const expanded = new Set(blocks[index].flatMap(expand));
    const overlap = [...expanded].filter((property) => later.has(property));
    if (overlap.length) conflicts.push({ key, index, overlap });
    for (const property of expanded) later.add(property);
  }
}

let failed = false;
if (conflicts.length) {
  failed = true;
  console.error(`CSS cascade check failed: ${conflicts.length} repeated selector conflict(s).`);
  for (const conflict of conflicts) console.error(` ✗ ${conflict.key.replace("|||", " :: ")} -> ${conflict.overlap.join(", ")}`);
}
if (emptyRules.length) {
  failed = true;
  console.error(`CSS hygiene check failed: ${emptyRules.length} empty rule(s).`);
  for (const rule of emptyRules) console.error(` ✗ ${rule}`);
}
if (disallowedImportant.length) {
  failed = true;
  console.error(`CSS hygiene check failed: ${disallowedImportant.length} non-accessibility !important declaration(s).`);
  for (const rule of disallowedImportant) console.error(` ✗ ${rule}`);
}
if (failed) process.exit(1);

console.log("CSS cascade/hygiene check passed: no repeated exact-selector property conflicts, empty rules, or non-accessibility !important declarations.");
