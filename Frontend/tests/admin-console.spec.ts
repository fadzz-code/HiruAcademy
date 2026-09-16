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
  await page.addInitScript(() => localStorage.setItem("admin-demo-store", JSON.stringify({ items: { blog: [{ id: "1", title: "Draf", detail: "Artikel", status: "Draf" }] }, invoices: [{ id: "1", title: "A", detail: "B", status: "Menunggu" }, { id: "2", title: "C", detail: "D", status: "Terverifikasi" }], payouts: [{ id: "3", title: "E", detail: "F", status: "Menunggu" }], integrations: {} })));
  await page.goto("/admin");
  await expect(page.getByRole("link", { name: /Tinjau Invoice/ })).toHaveAttribute("href", "/admin/invoice");
  await expect(page.getByText("Invoice menunggu").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Pencairan menunggu").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Item draf").locator("..").getByText("1", { exact: true })).toBeVisible();
  await expect(page.getByText("Total Pengguna")).toHaveCount(0);
});

test("corrupt and incomplete storage normalizes nested defaults", async ({ page }) => {
   await page.goto("/admin");
   await page.evaluate(() => localStorage.setItem("admin-demo-store", "{"));
   await page.goto("/admin?corrupt=1");
  await expect(page.getByText("Invoice menunggu")).toBeVisible();
  const corrupt = await page.evaluate(() => JSON.parse(localStorage.getItem("admin-demo-store") ?? "{}"));
  expect(corrupt.invoices).toHaveLength(1);
  expect(corrupt.payouts).toHaveLength(1);
  expect(corrupt.integrations.Zoom).toBe("Belum terhubung");
  await page.evaluate(() => localStorage.setItem("admin-demo-store", JSON.stringify({ items: { valid: [{ id: "7", title: "Valid", detail: "Saved", status: "Draf" }], broken: null }, invoices: "bad", payouts: [{ id: 1 }], integrations: { Zoom: "Terhubung", Email: 2 } })));
   await page.goto("/admin/program-harga");
   await page.goto("/admin?refresh=1");
   await expect(page.getByText("Invoice menunggu")).toBeVisible();
   await expect.poll(() => page.evaluate(() => localStorage.getItem("admin-demo-store"))).toContain('"valid"');
   const incomplete = await page.evaluate(() => JSON.parse(localStorage.getItem("admin-demo-store") ?? "{}"));
  expect(incomplete.items.valid).toHaveLength(1);
  expect(incomplete.items.broken).toBeUndefined();
  expect(incomplete.invoices).toHaveLength(1);
  expect(incomplete.payouts).toEqual([]);
  expect(incomplete.integrations.Zoom).toBe("Terhubung");
  expect(incomplete.integrations.Email).toBe("Belum terhubung");
  expect(incomplete.integrations.Analitik).toBe("Belum terhubung");
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

const creations = [
  ["A", "/admin/program-harga", "Buat Program", "Nama program", "Program Sakura"],
  ["B", "/admin/kurikulum-materi", "Buat Materi", "Judul materi", "Lesson Hiragana"],
  ["C", "/admin/bank-soal", "Buat Soal", "Pertanyaan", "Soal Kosakata"],
  ["D", "/admin/pengguna-akses", "Tambah Pengguna", "Nama", "Member Baru"],
  ["E", "/admin/blog-seo", "Buat Artikel", "Judul artikel", "Artikel JLPT"],
] as const;
for (const [scenario, route, action, label, value] of creations) test(`skenario ${scenario}: dialog fokus dan form menyimpan data`, async ({ page }) => { await page.goto(route); const trigger = page.getByRole("button", { name: action }); await trigger.click(); await expect(page.getByLabel(label)).toBeFocused(); await page.getByLabel(label).fill(value); const required = page.getByRole("dialog").locator("[required]"); for (let index = 1; index < await required.count(); index++) await required.nth(index).fill("Data uji"); await page.getByRole("button", { name: "Simpan", exact: true }).click(); await page.reload(); await expect(page.getByRole("heading", { name: value })).toBeVisible(); });

test("dialog traps focus, Escape closes, and returns focus", async ({ page }) => { await page.goto("/admin/program-harga"); const trigger = page.getByRole("button", { name: "Buat Program" }); await trigger.click(); await page.keyboard.press("Shift+Tab"); await expect(page.getByRole("button", { name: "Tutup dialog" })).toBeFocused(); await page.keyboard.press("Tab"); await expect(page.getByLabel("Nama program")).toBeFocused(); await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toHaveCount(0); await expect(trigger).toBeFocused(); });

test("tabs support roving keyboard navigation", async ({ page }) => { await page.goto("/admin/program-harga"); const first = page.getByRole("tab", { name: "Program" }); await first.focus(); await page.keyboard.press("ArrowRight"); await expect(page.getByRole("tab", { name: "Level" })).toBeFocused(); await expect(page.getByRole("tab", { name: "Level" })).toHaveAttribute("aria-selected", "true"); await page.keyboard.press("End"); await expect(page.getByRole("tab", { name: "Manfaat" })).toBeFocused(); });

test("status badges expose semantic text and classes", async ({ page }) => { await page.goto("/admin/invoice"); const badge = page.locator(".admin-status-badge").filter({ hasText: "Menunggu" }).first(); await expect(badge).toHaveClass(/status-pending/); await page.getByRole("button", { name: "Lihat Detail" }).first().click(); await page.getByRole("button", { name: "Lihat Bukti" }).click(); await expect(page.getByRole("dialog").locator(".admin-status-badge", { hasText: "Diperiksa" })).toHaveClass(/status-verified/); });

test("skenario F: invoice melewati pemeriksaan lalu verifikasi", async ({ page }) => { await page.goto("/admin/invoice"); await page.getByRole("button", { name: "Lihat Detail" }).click(); await page.getByRole("button", { name: "Lihat Bukti" }).click(); await page.getByRole("button", { name: "Verifikasi & Aktifkan" }).click(); await expect(page.getByRole("status")).toContainText("terverifikasi"); });
test("skenario G: invoice dapat ditolak setelah diperiksa", async ({ page }) => { await page.goto("/admin/invoice"); await page.getByRole("button", { name: "Lihat Detail" }).click(); await page.getByRole("button", { name: "Lihat Bukti" }).click(); await page.getByRole("button", { name: "Tolak Invoice" }).click(); await expect(page.getByRole("status")).toContainText("ditolak"); });
test("skenario H: pencairan diproses lalu dibayar", async ({ page }) => { await page.goto("/admin/pencairan-komisi"); await page.getByRole("button", { name: "Lihat Detail" }).click(); await page.getByRole("button", { name: "Proses Pencairan" }).click(); await page.getByRole("button", { name: "Tandai Dibayar" }).click(); await expect(page.getByRole("status")).toContainText("dibayar"); });
test("skenario I: pengaturan integrasi tersimpan", async ({ page }) => { await page.goto("/admin/pengaturan-integrasi"); await page.getByRole("tab", { name: "Integrasi", exact: true }).click(); await page.getByLabel("Status Zoom").selectOption("Terhubung"); await page.getByRole("button", { name: "Simpan Integrasi" }).click(); await expect(page.getByRole("status")).toHaveText("Pengaturan integrasi berhasil disimpan."); await page.reload(); await page.getByRole("tab", { name: "Integrasi", exact: true }).click(); await expect(page.getByLabel("Status Zoom")).toHaveValue("Terhubung"); });

for (const viewport of [{ width: 360, height: 800 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 820, height: 1180 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }]) test(`dashboard has no overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => { await page.setViewportSize(viewport); await page.goto("/admin"); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true); if (viewport.width <= 820) { const trigger = page.getByRole("button", { name: "Buka navigasi admin" }); await trigger.click(); await expect(page.locator("#admin-sidebar")).toHaveClass(/open/); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused(); } else await expect(page.getByRole("button", { name: "Buka navigasi admin" })).toBeHidden(); });
