import { spawn } from "node:child_process";

const port = 3210;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  ["/", "DeeQ Studio | Web Design, Development & Digital Care in Bruges"],
  ["/work", "Selected Work | DeeQ Studio"],
  ["/work/de-kweker", "kwkr.be · De Kweker Website Case | DeeQ Studio"],
  ["/work/kwartier-west", "Kwartier West Website Case | DeeQ Studio"],
  ["/services", "Web Design, Identity & Digital Care | DeeQ Studio"],
  ["/services/web-design", "Web Design & Development in Bruges, Belgium | DeeQ Studio"],
  ["/services/identity", "Brand Identity & Content Design | DeeQ Studio"],
  ["/services/digital-care", "Website Maintenance & Digital Care | DeeQ Studio"],
  ["/process", "How DeeQ Studio Works | DeeQ Studio"],
  ["/contact", "Contact DeeQ Studio | DeeQ Studio"],
  ["/nl/webdesign-brugge", "Webdesign Brugge | DeeQ Studio"],
];

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "production" },
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready");
};

try {
  await waitForServer();
  for (const [path, expectedTitle] of routes) {
    const response = await fetch(`${origin}${path}`);
    const html = await response.text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.replaceAll("&amp;", "&");
    const h1Count = html.match(/<h1\b/g)?.length ?? 0;
    if (response.status !== 200) throw new Error(`${path}: expected 200, received ${response.status}`);
    if (title !== expectedTitle) throw new Error(`${path}: unexpected title ${JSON.stringify(title)}`);
    if (h1Count !== 1) throw new Error(`${path}: expected one h1, received ${h1Count}`);
    if (!html.includes(`rel="canonical"`)) throw new Error(`${path}: canonical is missing`);
    console.log(`ok ${path}`);
  }
  const missing = await fetch(`${origin}/route-that-does-not-exist`);
  if (missing.status !== 404) throw new Error(`unknown route: expected 404, received ${missing.status}`);
  console.log("ok 404");
} finally {
  server.kill();
}
