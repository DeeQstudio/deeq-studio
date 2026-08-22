import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __deeqVitals?: { cls: number; lcp: number };
  }
}

const routes = ["/", "/work/de-kweker", "/work/kwartier-west"];

for (const route of routes) {
  test(`${route} stays within production performance budgets`, async ({ page }) => {
    await page.addInitScript(() => {
      window.__deeqVitals = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!shift.hadRecentInput) window.__deeqVitals!.cls += shift.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        window.__deeqVitals!.lcp = entries.at(-1)?.startTime ?? 0;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });

    await page.goto(route, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const bytesFor = (type: string) => resources
        .filter((resource) => resource.initiatorType === type)
        .reduce((total, resource) => total + (resource.encodedBodySize || resource.transferSize), 0);
      return {
        cls: window.__deeqVitals?.cls ?? 0,
        lcp: window.__deeqVitals?.lcp ?? 0,
        scriptBytes: bytesFor("script"),
        imageBytes: bytesFor("img"),
      };
    });

    expect(metrics.cls, `${route} CLS`).toBeLessThan(0.1);
    expect(metrics.lcp, `${route} local LCP`).toBeLessThan(2_500);
    expect(metrics.scriptBytes, `${route} encoded client JavaScript`).toBeLessThan(650_000);
    expect(metrics.imageBytes, `${route} initial encoded images`).toBeLessThan(1_200_000);
  });
}
