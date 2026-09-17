import { expect, test, type Page } from "@playwright/test";

const BUSINESS_STORAGE_KEY = "hiru-admin-business:v1";

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    body: document.body.scrollWidth <= document.body.clientWidth,
    page: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  }));
  expect(result).toEqual({ body: true, page: true });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate((key) => localStorage.removeItem(key), BUSINESS_STORAGE_KEY);
});

test("Scenario A — INVOICE CREATION: checkout creates invoice, redirects to /invoice with id, appears in /admin/invoice", async ({ page }) => {
  await page.goto("/checkout?level=n4&plan=lms");
  await expect(page.getByRole("heading", { name: "Periksa pilihan sebelum membuat invoice" })).toBeVisible();

  const submitBtn = page.getByRole("button", { name: /Buat Invoice/ });
  await expect(submitBtn).toBeVisible();
  await submitBtn.click();

  await page.waitForURL(/\/invoice\?id=/);
  const url = new URL(page.url());
  const invoiceId = url.searchParams.get("id");
  expect(invoiceId).toBeTruthy();

  await page.goto("/admin/invoice");
  await expect(page.getByRole("heading", { name: "Invoice Pembayaran" })).toBeVisible();

  const row = page.locator("tr", { hasText: invoiceId! });
  await expect(row).toBeVisible();
  await expect(row).toContainText("Menunggu pembayaran");
  await expect(row).toContainText("N4");
  await expect(row).toContainText("Belajar Mandiri");
});

test("Scenario B — WHATSAPP: inspect 'Buka WhatsApp' href starts with https://wa.me/, status remains 'Menunggu pembayaran'", async ({ page }) => {
  await page.goto("/admin/invoice");
  const row = page.locator("tr", { hasText: "INV-2026-001" });
  await expect(row).toContainText("Menunggu pembayaran");
  await row.getByRole("button", { name: "Detail" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".admin-status-badge", { hasText: "Menunggu pembayaran" })).toBeVisible();

  const waLink = page.getByRole("link", { name: /Buka WhatsApp/ });
  await expect(waLink).toBeVisible();
  const href = await waLink.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\//);

  await expect(dialog.locator(".admin-status-badge", { hasText: "Menunggu pembayaran" })).toBeVisible();
  await expect(dialog.getByText("Membership Siswa Aktif")).toBeHidden();
});

test("Scenario C — PAYMENT WORKFLOW: Menunggu pembayaran -> Sudah bayar -> Diverifikasi -> Aktif -> Persists on reload", async ({ page }) => {
  await page.goto("/admin/invoice");
  const row = page.locator("tr", { hasText: "INV-2026-001" });
  await row.getByRole("button", { name: "Detail" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".admin-status-badge", { hasText: "Menunggu pembayaran" })).toBeVisible();

  await page.getByRole("button", { name: "Tandai Sudah Bayar" }).click();
  await expect(dialog.locator(".admin-status-badge", { hasText: "Sudah bayar" })).toBeVisible();

  await page.getByRole("button", { name: "Verifikasi Pembayaran" }).click();
  await expect(dialog.locator(".admin-status-badge", { hasText: "Diverifikasi" })).toBeVisible();

  await page.getByRole("button", { name: "Aktifkan Membership" }).click();
  await expect(dialog.getByText("Membership Siswa Aktif")).toBeVisible();
  await expect(dialog.locator(".admin-status-badge", { hasText: "Aktif" })).toBeVisible();

  await page.reload();
  const updatedRow = page.locator("tr", { hasText: "INV-2026-001" });
  await expect(updatedRow).toContainText("Aktif");

  await updatedRow.getByRole("button", { name: "Detail" }).click();
  await expect(page.getByRole("dialog").getByText("Membership Siswa Aktif")).toBeVisible();
});

test("Scenario D — MEMBERSHIP ACTIVATION: N4 Belajar Mandiri activated, access shows DASAR, N5, N4 available; N3, N2, SSW, Interview locked", async ({ page }) => {
  await page.goto("/admin/invoice");
  await page.getByRole("button", { name: "+ Buat Invoice" }).click();

  await page.getByLabel("Nama Lengkap Siswa *").fill("Siswa N4 Mandiri");
  await page.getByLabel("Alamat Email Siswa *").fill("mandiri.n4@example.com");
  await page.getByLabel("Nomor WhatsApp *").fill("081234567888");
  await page.getByLabel("Program Belajar").selectOption("N4");
  await page.getByLabel("Paket Layanan").selectOption("lms");
  await page.getByRole("button", { name: "Simpan & Terbitkan" }).click();

  const invoiceRow = page.locator("tr", { hasText: "Siswa N4 Mandiri" });
  await expect(invoiceRow).toBeVisible();
  await invoiceRow.getByRole("button", { name: "Detail" }).click();

  await page.getByRole("button", { name: "Tandai Sudah Bayar" }).click();
  await page.getByRole("button", { name: "Verifikasi Pembayaran" }).click();
  await page.getByRole("button", { name: "Aktifkan Membership" }).click();
  await expect(page.getByRole("dialog").getByText("Membership Siswa Aktif")).toBeVisible();

  await page.goto("/admin/pengguna-akses");
  await expect(page.getByRole("heading", { name: "Pengguna & Akses Belajar" })).toBeVisible();

  const userRow = page.locator("tr", { hasText: "Siswa N4 Mandiri" });
  await expect(userRow).toBeVisible();
  await expect(userRow).toContainText("Belajar Mandiri");
  await expect(userRow).toContainText("N4");

  await userRow.getByRole("button", { name: "Detail" }).click();
  const userDialog = page.getByRole("dialog");
  await expect(userDialog).toBeVisible();
  await expect(userDialog.getByText("Belajar Mandiri")).toBeVisible();
  await expect(userDialog.getByText("N4", { exact: true })).toBeVisible();

  const dasarCard = userDialog.locator(".access-hierarchy-card", { hasText: "Level Dasar (Fondasi)" });
  await expect(dasarCard).toHaveClass(/is-unlocked/);
  await expect(dasarCard).toContainText("Akses Penuh");

  const n5Card = userDialog.locator(".access-hierarchy-card", { hasText: "Level N5 (Pemula)" });
  await expect(n5Card).toHaveClass(/is-unlocked/);
  await expect(n5Card).toContainText("Akses Penuh");

  const n4Card = userDialog.locator(".access-hierarchy-card", { hasText: "Level N4 (Dasar Lanjutan)" });
  await expect(n4Card).toHaveClass(/is-unlocked/);
  await expect(n4Card).toContainText("Akses Penuh");

  const n3Card = userDialog.locator(".access-hierarchy-card", { hasText: "Level N3 (Menengah)" });
  await expect(n3Card).toHaveClass(/is-locked/);
  await expect(n3Card).toContainText("Terkunci");

  const n2Card = userDialog.locator(".access-hierarchy-card", { hasText: "Level N2 (Mahir)" });
  await expect(n2Card).toHaveClass(/is-locked/);
  await expect(n2Card).toContainText("Terkunci");

  const sswCard = userDialog.locator(".access-hierarchy-card", { hasText: "Persiapan Kerja SSW" });
  await expect(sswCard).toHaveClass(/is-locked/);
  await expect(sswCard).toContainText("Terkunci");

  const interviewCard = userDialog.locator(".access-hierarchy-card", { hasText: "Simulasi Interview Kerja" });
  await expect(interviewCard).toHaveClass(/is-locked/);
  await expect(interviewCard).toContainText("Terkunci");
});

test("Scenario E — SENSEI ACTIVATION: N4 Belajar dengan Sensei activated -> user becomes Sensei", async ({ page }) => {
  await page.goto("/admin/invoice");
  await page.getByRole("button", { name: "+ Buat Invoice" }).click();

  await page.getByLabel("Nama Lengkap Siswa *").fill("Siswa N4 Sensei");
  await page.getByLabel("Alamat Email Siswa *").fill("sensei.n4@example.com");
  await page.getByLabel("Nomor WhatsApp *").fill("081234567877");
  await page.getByLabel("Program Belajar").selectOption("N4");
  await page.getByLabel("Paket Layanan").selectOption("sensei");
  await page.getByRole("button", { name: "Simpan & Terbitkan" }).click();

  const invoiceRow = page.locator("tr", { hasText: "Siswa N4 Sensei" });
  await invoiceRow.getByRole("button", { name: "Detail" }).click();

  await page.getByRole("button", { name: "Tandai Sudah Bayar" }).click();
  await page.getByRole("button", { name: "Verifikasi Pembayaran" }).click();
  await page.getByRole("button", { name: "Aktifkan Membership" }).click();

  await page.goto("/admin/pengguna-akses");
  const userRow = page.locator("tr", { hasText: "Siswa N4 Sensei" });
  await expect(userRow).toBeVisible();
  await expect(userRow).toContainText("Belajar dengan Sensei");
  await expect(userRow).toContainText("N4");

  await userRow.getByRole("button", { name: "Detail" }).click();
  const userDialog = page.getByRole("dialog");
  await expect(userDialog).toBeVisible();
  await expect(userDialog.getByText("Belajar dengan Sensei")).toBeVisible();

  const senseiCard = userDialog.locator(".access-hierarchy-card", { hasText: "Sensei Live Class & Mentoring" });
  await expect(senseiCard).toHaveClass(/is-unlocked/);
  await expect(senseiCard).toContainText("Akses Live & Diskusi");
});

test("Scenario F — AFFILIATE COMMISSION: verified referral invoice generates one commission, no duplicates on reload or repeated triggers", async ({ page }) => {
  await page.goto("/admin/invoice");
  await page.getByRole("button", { name: "+ Buat Invoice" }).click();

  await page.getByLabel("Nama Lengkap Siswa *").fill("Pembeli Referral Hilmi");
  await page.getByLabel("Alamat Email Siswa *").fill("hilmi.ref@example.com");
  await page.getByLabel("Nomor WhatsApp *").fill("081234567866");
  await page.getByLabel("Program Belajar").selectOption("N4");
  await page.getByLabel("Paket Layanan").selectOption("lms");
  await page.getByLabel("Kode Referral / Affiliate (Opsional)").fill("HIRU-HILMI25");
  await page.getByRole("button", { name: "Simpan & Terbitkan" }).click();

  const row = page.locator("tr", { hasText: "Pembeli Referral Hilmi" });
  const rawId = await row.locator(".invoice-code-cell").textContent();
  const invoiceId = rawId?.trim() ?? "";
  expect(invoiceId).toBeTruthy();

  await row.getByRole("button", { name: "Detail" }).click();
  await page.getByRole("button", { name: "Tandai Sudah Bayar" }).click();
  await page.getByRole("button", { name: "Verifikasi Pembayaran" }).click();
  await page.getByRole("button", { name: "Tutup dialog" }).click();

  await page.goto("/admin/affiliate-komisi");
  await page.getByRole("tab", { name: "Pembelian & Komisi" }).click();

  const commRows = page.locator("tr", { hasText: invoiceId });
  await expect(commRows).toHaveCount(1);
  await expect(commRows).toContainText("HIRU-HILMI25");

  await page.reload();
  await page.getByRole("tab", { name: "Pembelian & Komisi" }).click();
  await expect(page.locator("tr", { hasText: invoiceId })).toHaveCount(1);

  await page.goto("/admin/invoice");
  await page.locator("tr", { hasText: invoiceId }).getByRole("button", { name: "Detail" }).click();
  await page.getByRole("button", { name: "Aktifkan Membership" }).click();
  await page.goto("/admin/affiliate-komisi");
  await page.getByRole("tab", { name: "Pembelian & Komisi" }).click();
  await expect(page.locator("tr", { hasText: invoiceId })).toHaveCount(1);
});

test("Scenario G — PAYOUT IDEMPOTENCY: mark payout paid deducts balance once and cannot double-deduct", async ({ page }) => {
  await page.goto("/admin/affiliate-komisi");
  const rinaRowBefore = page.locator("tr", { hasText: "Rina Wulandari" });
  await expect(rinaRowBefore).toContainText("Rp 160.000");

  await page.goto("/admin/pencairan-komisi");
  const payoutRow = page.locator("tr", { hasText: "PAY-2026-001" });
  await expect(payoutRow).toContainText("Menunggu");

  await payoutRow.getByRole("button", { name: "Tandai Sudah Dicairkan" }).click();
  await expect(page.getByRole("heading", { name: "Konfirmasi Pencairan Dana Komisi" })).toBeVisible();
  await page.getByRole("button", { name: "Ya, Tandai Sudah Dicairkan" }).click();

  await expect(payoutRow.getByText("✓ Selesai")).toBeVisible();
  await expect(payoutRow).toContainText("Sudah Dicairkan");

  await page.goto("/admin/affiliate-komisi");
  const rinaRowAfter = page.locator("tr", { hasText: "Rina Wulandari" });
  await expect(rinaRowAfter).toContainText("Rp 0");
});

test("Scenario H — AFFILIATE SETTINGS: update commission mode, value, validation period, persists on reload", async ({ page }) => {
  await page.goto("/admin/affiliate-komisi");
  await page.getByRole("tab", { name: "Pengaturan" }).click();

  await page.getByLabel("Skema Perhitungan Komisi").selectOption("Nominal");
  await page.getByLabel(/Nilai Komisi/).fill("50000");
  await page.getByLabel("Masa Tunggu Validasi Komisi (Hari)").fill("14");

  await page.getByRole("button", { name: "Simpan Pengaturan" }).click();
  await expect(page.getByText("Pengaturan program afiliasi berhasil disimpan")).toBeVisible();

  await page.reload();
  await page.getByRole("tab", { name: "Pengaturan" }).click();

  await expect(page.getByLabel("Skema Perhitungan Komisi")).toHaveValue("Nominal");
  await expect(page.getByLabel(/Nilai Komisi/)).toHaveValue("50000");
  await expect(page.getByLabel("Masa Tunggu Validasi Komisi (Hari)")).toHaveValue("14");
});

test("Scenario I — QUERY MEMBERSHIP REGRESSION: explicit query parameter is honored on student pages", async ({ page }) => {
  await page.goto("/dashboard?membership=free");
  await expect(page.locator(".dash-topbar").getByText("Free Member")).toBeVisible();

  await page.goto("/dashboard?membership=lms");
  await expect(page.locator(".dash-topbar").getByText("Belajar Mandiri")).toBeVisible();

  await page.goto("/dashboard?membership=sensei");
  await expect(page.locator(".dash-topbar").getByText("Belajar dengan Sensei")).toBeVisible();
});

const responsiveWidths = [360, 390, 768, 820, 1024, 1440];
const adminBusinessRoutes = [
  "/admin/invoice",
  "/admin/pengguna-akses",
  "/admin/affiliate-komisi",
  "/admin/pencairan-komisi",
];

for (const width of responsiveWidths) {
  for (const route of adminBusinessRoutes) {
    test(`Scenario J — Responsive viewport ${route} at ${width}px has no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(route);
      await expectNoHorizontalOverflow(page);
    });
  }
}
