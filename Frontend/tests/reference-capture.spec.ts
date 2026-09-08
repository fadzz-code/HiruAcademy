import { expect, test } from "@playwright/test";
import { pathToFileURL } from "node:url";
import path from "node:path";

const references = ["dashboard.html", "flashcard management.html", "flashcard.html", "hasiltryout.html", "journey.html", "landingpage.html", "latihan.html", "perpustakaan.html", "pilih perjalananmu.html", "program.html", "tryout.html"];

for (const width of [390, 768, 1440]) {
  test.describe(`reference viewport ${width}`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const name of references) {
      test(name, async ({ page }, testInfo) => {
        const source = path.resolve("../Docs/RefrensiHTML", name);
        await page.goto(pathToFileURL(source).href);
        await expect(name === "flashcard.html" ? page.locator("#flashcard") : page.getByRole("heading").first()).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: testInfo.outputPath("reference.png"), fullPage: true, animations: "disabled" });
      });
    }
  });
}
