import { expect, test } from "@playwright/test";

const contentRoutes = [
  "/", "/work", "/work/de-kweker", "/work/kwartier-west", "/services",
  "/services/web-design", "/services/identity", "/services/digital-care",
  "/process", "/contact", "/nl/webdesign-brugge",
];

test.describe("production routes", () => {
  for (const route of contentRoutes) {
    test(`${route} has a single primary heading and no horizontal overflow`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    });
  }

  test("unknown routes render the authored 404", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "404." })).toBeVisible();
  });
});

test.describe("responsive behavior", () => {
  for (const width of [320, 360, 390, 430]) {
    test(`homepage fits a ${width}px viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await expect(page.getByRole("heading", { name: /Digital worlds, built to move/i })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("mobile menu manages focus and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.locator(".menuToggle");
    await toggle.focus();
    await toggle.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
    await expect(page.locator("#mobile-menu a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("reduced motion never hides authored content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/kwartier-west");
    const hiddenReveals = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.filter((element) => getComputedStyle(element).opacity === "0").length,
    );
    expect(hiddenReveals).toBe(0);
  });
});
