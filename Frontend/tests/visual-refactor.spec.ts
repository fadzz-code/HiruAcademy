import { expect, test } from "@playwright/test";

const routes = ["/", "/login", "/register", "/program", "/placement", "/blog", "/testimoni", "/sensei", "/dashboard?membership=free", "/dashboard?membership=lms", "/dashboard?membership=sensei", "/journey?membership=lms", "/journey/n5?membership=lms", "/learn/n5/chapter-1?membership=lms", "/flashcards?membership=lms", "/practice?membership=lms", "/library?membership=lms", "/tryout?membership=lms", "/schedule?membership=sensei", "/replay?membership=sensei", "/mini-checkpoint?membership=sensei", "/admin", "/admin/users", "/admin/program", "/admin/invoices", "/admin/content-library"];

for (const width of [390, 768, 1440]) {
  test.describe(`viewport ${width}`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of routes) {
      test(route, async ({ page }, testInfo) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole("heading").first()).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        expect(errors).toEqual([]);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `Horizontal overflow: ${route}`).toBeLessThanOrEqual(1);
        await page.screenshot({ path: testInfo.outputPath("app.png"), fullPage: true, animations: "disabled" });
      });
    }
  });
}

test("membership lock keeps upgrade action and keyboard dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/dashboard?membership=free");
  await page.locator('nav[aria-label="Navigasi siswa"]:visible').getByRole("button", { name: "Try Out", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "Akses Terkunci" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Upgrade", exact: true })).toHaveAttribute("href", "/#program");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("mobile navigation preserves route action", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/dashboard?membership=lms");
  await page.getByRole("button", { name: "Buka navigasi" }).click();
  await page.locator('nav[aria-label="Navigasi siswa"]:visible').getByRole("link", { name: "Kelas Saya", exact: true }).click();
  await expect(page).toHaveURL(/\/journey\?membership=lms/);
});
