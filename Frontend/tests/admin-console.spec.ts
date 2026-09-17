import { expect, test } from "@playwright/test";

const menu = ["Dashboard", "Landing Page", "Program & Harga", "Kurikulum & Materi", "Bank Soal", "Testimoni", "Blog & SEO", "Pengumuman", "Placement & Hasil", "Pengguna & Akses", "Invoice", "Affiliate & Komisi", "Pencairan Komisi", "Sensei", "Kelas & Jadwal", "Analitik", "Pengaturan & Integrasi"];
const routes = ["/admin", "/admin/landing-page", "/admin/program-harga", "/admin/kurikulum-materi", "/admin/bank-soal", "/admin/placement-hasil", "/admin/pengguna-akses", "/admin/invoice", "/admin/affiliate-komisi", "/admin/pencairan-komisi", "/admin/testimoni", "/admin/blog-seo", "/admin/pengumuman", "/admin/sensei", "/admin/kelas-jadwal", "/admin/analitik", "/admin/pengaturan-integrasi"];
const groups = ["Ringkasan", "Website", "Content Studio", "Operasional", "Transaksi", "Kelas", "Insight", "Sistem"];

test("sidebar groups 17 destinations and links back to site", async ({ page }) => {
  await page.goto("/admin");
  const nav = page.getByRole("navigation", { name: "Navigasi admin" });
  await expect(nav.getByRole("link")).toHaveCount(17);
  await expect(nav.getByRole("link").allTextContents()).resolves.toEqual(menu);
  for (const group of groups) await expect(nav.getByText(group, { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Kembali ke Situs" })).toHaveAttribute("href", "/");
});

for (const route of routes) test(`${route} opens`, async ({ page }) => { expect((await page.goto(route))?.status()).toBe(200); await expect(page.getByRole("heading", { level: 1 })).toBeVisible(); });

test("dashboard shows real quick actions and persisted metrics", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("hiru-admin-business:v1", JSON.stringify({ version: 1, invoices: [{ id: "1", createdAt: "2026-01-01T00:00:00.000Z", userName: "A", userEmail: "a@example.com", userWhatsApp: "081234567890", programCode: "N5", plan: "lms", amount: 0, status: "Menunggu pembayaran", timeline: [] }], users: [], affiliates: [], commissions: [], payouts: [{ id: "3", affiliateId: "AFF-001", affiliateName: "E", amount: 0, commissionIds: [], createdAt: "2026-01-01T00:00:00.000Z", status: "Menunggu" }], settings: { adminWhatsAppNumber: "", invoiceWhatsAppTemplate: "", affiliateEnabled: false, commissionMode: "Percentage", commissionValue: 0, validationPeriodDays: 0 }, activities: [] }));
    localStorage.setItem("hiru-admin-assessment:v1", JSON.stringify({ version: 1, assessments: [{ id: "a1", type: "checkpoint", status: "Draft", title: "Tes", description: "", level: "", questions: [], sections: [], updatedAt: "2026-01-01T00:00:00.000Z" }] }));
  });
  await page.goto("/admin");
  await expect(page.getByRole("link", { name: /Tinjau Invoice/ })).toHaveAttribute("href", "/admin/invoice");
  await expect(page.getByText("Invoice menunggu").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Pencairan menunggu").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Item draf").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Total Pengguna")).toHaveCount(0);
});

test("mobile drawer locks body and traps all focusable selectors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin");
  const trigger = page.getByRole("button", { name: "Buka navigasi admin" });
  await trigger.click();
  await expect(page.getByRole("link", { name: "Dashboard" })).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.locator("#admin-sidebar").evaluate((sidebar) => { const target = document.createElement("div"); target.tabIndex = 0; target.setAttribute("aria-label", "Focusable custom"); sidebar.append(target); });
  const custom = page.getByLabel("Focusable custom");
  await custom.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Dashboard" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(custom).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("dedicated Sensei dialog focuses and persists data", async ({ page }) => { await page.goto("/admin/sensei"); const trigger = page.getByRole("button", { name: "Tambah Sensei" }); await trigger.click(); const dialog = page.getByRole("dialog"); await expect(dialog).toBeVisible(); await dialog.getByLabel("Nama").focus(); await dialog.getByLabel("Nama").fill("Sensei Kenji"); await dialog.getByLabel("Bio singkat").fill("Pengajar bahasa Jepang."); await dialog.getByLabel("Keahlian").fill("JLPT N5"); await dialog.getByRole("button", { name: "Simpan" }).click(); await page.reload(); await expect(page.getByText("Sensei Kenji", { exact: true })).toBeVisible(); });

test("dialog traps focus, Escape closes, and returns focus", async ({ page }) => { await page.goto("/admin/sensei"); const trigger = page.getByRole("button", { name: "Tambah Sensei" }); await trigger.click(); const dialog = page.getByRole("dialog"); await dialog.getByLabel("Nama").focus(); await page.keyboard.press("Shift+Tab"); await expect(page.getByRole("button", { name: "Tutup dialog" })).toBeFocused(); await page.keyboard.press("Tab"); await expect(page.getByLabel("Nama")).toBeFocused(); await page.keyboard.press("Escape"); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused(); });

test("tabs support roving keyboard navigation", async ({ page }) => { await page.goto("/admin/pengaturan-integrasi"); const first = page.getByRole("tab", { name: "Umum" }); await first.focus(); await page.keyboard.press("ArrowRight"); await expect(page.getByRole("tab", { name: "Branding" })).toBeFocused(); await expect(page.getByRole("tab", { name: "Branding" })).toHaveAttribute("aria-selected", "true"); await page.keyboard.press("End"); await expect(page.getByRole("tab", { name: "Profil Admin" })).toBeFocused(); });

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 820, height: 1180 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }]) test(`dashboard has no overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => { await page.setViewportSize(viewport); await page.goto("/admin"); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true); if (viewport.width <= 820) { const trigger = page.getByRole("button", { name: "Buka navigasi admin" }); await trigger.click(); await expect(page.locator("#admin-sidebar")).toHaveClass(/open/); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused(); } else await expect(page.getByRole("button", { name: "Buka navigasi admin" })).toBeHidden(); });
