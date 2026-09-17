import { expect, test, type Page } from "@playwright/test";

const storageKey = "hiru-admin-placement:v1";
const responsiveWidths = [360, 390, 768, 820, 1024, 1440];

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => ({
    body: document.body.scrollWidth <= document.body.clientWidth,
    page: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  }));
  expect(result).toEqual({ body: true, page: true });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate((key) => {
    localStorage.removeItem(key);
    sessionStorage.clear();
  }, storageKey);
});

test("Scenario A — BUILDER: Admin -> Placement Test -> add question, add options, reorder, Save Draft, reload -> persists", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Placement & Hasil");

  await page.getByRole("button", { name: "+ Tambah Pertanyaan" }).click();
  await expect(page.getByRole("heading", { name: /Editor Soal #\d+/ })).toBeVisible();

  await page.getByLabel("Pertanyaan (Prompt)").fill("Pertanyaan Baru N5 Tata Bahasa");
  await page.getByLabel("Opsi 1", { exact: true }).fill("Pilihan Pertama");
  await page.getByLabel("Opsi 2", { exact: true }).fill("Pilihan Kedua");

  await page.getByRole("button", { name: "+ Tambah Pilihan" }).click();
  await page.getByLabel("Opsi 3", { exact: true }).fill("Pilihan Ketiga");

  await page.getByRole("button", { name: "Pindahkan opsi 2 ke atas" }).click();
  await expect(page.getByLabel("Opsi 1", { exact: true })).toHaveValue("Pilihan Kedua");
  await expect(page.getByLabel("Opsi 2", { exact: true })).toHaveValue("Pilihan Pertama");

  await page.getByLabel("Jawaban benar 1", { exact: true }).check();

  await page.getByRole("button", { name: "Pindahkan soal 21 ke atas" }).click();

  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Draft placement test berhasil disimpan.");

  await page.reload();

  const newQuestionBtn = page.getByRole("button", { name: /Pertanyaan Baru N5 Tata Bahasa/ });
  await expect(newQuestionBtn).toBeVisible();
  await newQuestionBtn.click();

  await expect(page.getByLabel("Pertanyaan (Prompt)")).toHaveValue("Pertanyaan Baru N5 Tata Bahasa");
  await expect(page.getByLabel("Opsi 1", { exact: true })).toHaveValue("Pilihan Kedua");
  await expect(page.getByLabel("Opsi 2", { exact: true })).toHaveValue("Pilihan Pertama");
  await expect(page.getByLabel("Opsi 3", { exact: true })).toHaveValue("Pilihan Ketiga");
  await expect(page.getByLabel("Jawaban benar 1", { exact: true })).toBeChecked();
});

test("Scenario B — DRAFT: Modify Placement, Save Draft -> Public Placement still uses published/fallback config", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");
  await page.getByLabel("Intro Heading").fill("Intro Rahasia Draft Saja");

  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Draft placement test berhasil disimpan.");
  await expect(page.locator(".placement-pub-status")).toContainText("Draft");

  await page.goto("/placement");
  await expect(page.getByRole("heading", { name: "Intro Rahasia Draft Saja" })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ketahui Level Bahasa Jepangmu");
});

test("Scenario C — PUBLISH: Create valid questions + result ranges -> Publish -> Public Placement questions come from Admin config", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");

  await page.getByLabel("Pertanyaan (Prompt)").fill("Pertanyaan Terbitan Resmi Hiru");
  await page.getByLabel("Opsi 1", { exact: true }).fill("Opsi Resmi A");
  await page.getByLabel("Opsi 2", { exact: true }).fill("Opsi Resmi B");
  await page.getByLabel("Jawaban benar 1", { exact: true }).check();

  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Placement test berhasil diterbitkan!");
  await expect(page.locator(".placement-pub-status")).toContainText("Terbit");

  await page.goto("/placement/question?name=Budi&whatsapp=08123456789&target=N4");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pertanyaan Terbitan Resmi Hiru");
  await expect(page.getByText("Opsi Resmi A")).toBeVisible();
  await expect(page.getByText("Opsi Resmi B")).toBeVisible();
});

test("Scenario D — RESULT: Create a rule mapping score range to N4 -> Complete public test with score inside range -> Result recommends N4", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");

  await page.getByRole("tab", { name: "Aturan Hasil" }).click();
  const rule1 = page.locator(".placement-rule-card").nth(0);
  await rule1.getByLabel("Skor Min (0-100)").fill("0");
  await rule1.getByLabel("Skor Max (0-100)").fill("30");

  const rule2 = page.locator(".placement-rule-card").nth(1);
  await rule2.getByLabel("Skor Min (0-100)").fill("31");
  await rule2.getByLabel("Skor Max (0-100)").fill("59");
  await rule2.getByLabel("Program Rekomendasi").selectOption("N4");
  await rule2.getByLabel("Judul Hasil Rekomendasi").fill("Rekomendasi Level N4");

  await page.getByRole("button", { name: "Simpan Aturan" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Aturan hasil berhasil disimpan.");

  await page.getByRole("tab", { name: "Placement Test" }).click();
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Placement test berhasil diterbitkan!");

  await page.goto("/placement/question?name=Kenji&whatsapp=081999888777&target=N4");

  for (let i = 0; i < 20; i++) {
    await page.locator(".placement-answers-group label").first().click();
    await page.getByRole("button", { name: /Lanjut Soal|Selesaikan Test/ }).click();
  }

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hasil Evaluasi Level N4");
  await expect(page.getByRole("heading", { name: "N4 Kelas bersama Sensei" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "N4 Belajar Mandiri" })).toBeVisible();
});

test("Scenario E — OVERLAP: Rules 10-20 and 18-30 -> Publish -> BLOCKED with clear overlap validation error", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");

  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page.locator(".placement-pub-status")).toContainText("Draft");

  await page.getByRole("tab", { name: "Aturan Hasil" }).click();

  const rule1 = page.locator(".placement-rule-card").nth(0);
  await rule1.getByLabel("Skor Min (0-100)").fill("10");
  await rule1.getByLabel("Skor Max (0-100)").fill("20");

  const rule2 = page.locator(".placement-rule-card").nth(1);
  await rule2.getByLabel("Skor Min (0-100)").fill("18");
  await rule2.getByLabel("Skor Max (0-100)").fill("30");

  await expect(page.locator(".placement-alert-error")).toContainText(
    "tumpang tindih rentang skor antara [10-20] dan [18-30]"
  );

  await page.getByRole("tab", { name: "Placement Test" }).click();
  await page.getByRole("button", { name: "Terbitkan" }).click();

  await expect(page.locator(".placement-alert-error")).toContainText(
    "tumpang tindih rentang skor antara [10-20] dan [18-30]"
  );
  await expect(page.getByText("Placement test berhasil diterbitkan!")).toHaveCount(0);
  await expect(page.locator(".placement-pub-status")).toContainText("Draft");
});

test("Scenario F — SCORE GAP: Rules 0-10 and 20-30 -> Warning for 11-19", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");
  await page.getByRole("tab", { name: "Aturan Hasil" }).click();

  const rule1 = page.locator(".placement-rule-card").nth(0);
  await rule1.getByLabel("Skor Min (0-100)").fill("0");
  await rule1.getByLabel("Skor Max (0-100)").fill("10");

  const rule2 = page.locator(".placement-rule-card").nth(1);
  await rule2.getByLabel("Skor Min (0-100)").fill("20");
  await rule2.getByLabel("Skor Max (0-100)").fill("30");

  await expect(page.locator(".placement-alert-warning")).toContainText("celah skor 11 s.d. 19");
});

test("Scenario G — PREVIEW: Admin runs preview -> reaches result -> No public attempt/history record created", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");

  const initialCount = await page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw).leads.length : 3;
  }, storageKey);

  await page.getByRole("button", { name: "Pratinjau Tes" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  while (await dialog.getByRole("button", { name: "Berikutnya" }).isVisible()) {
    await dialog.locator(".placement-runner-option-label").first().click();
    await dialog.getByRole("button", { name: "Berikutnya" }).click();
  }

  await dialog.locator(".placement-runner-option-label").first().click();
  await dialog.getByRole("button", { name: "Selesai & Lihat Skor" }).click();

  await expect(dialog.getByText("HASIL PRATINJAU EVALUASI")).toBeVisible();
  await expect(dialog.getByText(/Catatan: Ini adalah mode pratinjau/)).toBeVisible();

  await dialog.getByRole("button", { name: "Tutup Pratinjau" }).click();
  await expect(dialog).toBeHidden();

  const afterCount = await page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw).leads.length : 3;
  }, storageKey);

  expect(afterCount).toBe(initialCount);

  await page.getByRole("tab", { name: "Lead" }).click();
  await expect(page.getByRole("table", { name: "Daftar Kontak Lead Siswa" }).locator("tbody tr")).toHaveCount(
    initialCount
  );
});

test("Scenario H — MOBILE: 390px -> edit question, edit answer, edit recommendation, preview, save -> no overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin/placement-hasil");

  await page.getByRole("button", { name: "Editor Soal" }).click();
  await page.getByLabel("Pertanyaan (Prompt)").fill("Pertanyaan Mobile 390");
  await page.getByLabel("Opsi 1", { exact: true }).fill("Opsi Mobile 1");

  await page.getByRole("tab", { name: "Aturan Hasil" }).click();
  await page.locator(".placement-rule-card").first().getByLabel("Judul Hasil Rekomendasi").fill("Rekomendasi N5 Mobile");

  await page.getByRole("tab", { name: "Placement Test" }).click();
  await page.getByRole("button", { name: "Pratinjau Tes" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Tutup dialog" }).click();

  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page.locator(".placement-notice")).toContainText("Draft placement test berhasil disimpan.");

  await expectNoHorizontalOverflow(page);
});

test("Scenario 9 — Tabs, Lead status toggle, and score preview utility", async ({
  page,
}) => {
  await page.goto("/admin/placement-hasil");

  await expect(page.getByRole("tab", { name: "Placement Test" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Aturan Hasil" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Hasil Tes" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Lead" })).toBeVisible();

  await page.getByRole("tab", { name: "Hasil Tes" }).click();
  await expect(page.getByRole("table", { name: "Daftar Hasil Tes Placement Siswa" })).toBeVisible();

  await page.getByRole("tab", { name: "Lead" }).click();
  const table = page.getByRole("table", { name: "Daftar Kontak Lead Siswa" });
  await expect(table).toBeVisible();

  const firstRow = table.locator("tbody tr").first();
  await expect(firstRow.locator(".admin-status-badge")).toHaveText("Baru");

  await firstRow.getByRole("button", { name: "Tandai Sudah Dihubungi" }).click();
  await expect(firstRow.locator(".admin-status-badge")).toHaveText("Sudah Dihubungi");
  await expect(firstRow.getByRole("button", { name: "Tandai Baru" })).toBeVisible();

  await firstRow.getByRole("button", { name: "Tandai Baru" }).click();
  await expect(firstRow.locator(".admin-status-badge")).toHaveText("Baru");
  await expect(firstRow.getByRole("button", { name: "Tandai Sudah Dihubungi" })).toBeVisible();

  await page.getByRole("tab", { name: "Aturan Hasil" }).click();
  await expect(page.getByRole("heading", { name: "Pratinjau Hasil Berdasarkan Skor" })).toBeVisible();

  const scoreInput = page.getByLabel(/Simulasi Skor/);
  await scoreInput.fill("50");
  await expect(page.locator(".placement-rule-match-card")).toContainText("N4");

  await scoreInput.fill("80");
  await expect(page.locator(".placement-rule-match-card")).toContainText("N2");
});

for (const width of responsiveWidths) {
  test(`Scenario 10 — Responsive viewport at ${width}px has no horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/placement-hasil");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}
