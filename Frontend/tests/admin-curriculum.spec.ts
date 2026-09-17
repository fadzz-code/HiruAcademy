import { expect, test, type Page } from "@playwright/test";

const storageKey = "hiru-admin-curriculum:v1";
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
  await page.evaluate((key) => localStorage.removeItem(key), storageKey);
});

test("Scenario A: Program & Harga hub lists, searches, filters, and resets programs", async ({ page }) => {
  await page.goto("/admin/program-harga");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Program & Harga");
  const table = page.getByRole("table", { name: "Daftar Program & Harga" });
  await expect(table).toBeVisible();

  await expect(table.getByText("DASAR").first()).toBeVisible();
  await expect(table.getByText("JLPT N5")).toBeVisible();
  await expect(table.getByText("JLPT N4")).toBeVisible();

  const searchInput = page.getByLabel("Cari program");
  await searchInput.fill("DASAR");
  await expect(table.getByText("DASAR").first()).toBeVisible();
  await expect(table.getByText("JLPT N5")).toHaveCount(0);

  const statusSelect = page.getByLabel("Status");
  await statusSelect.selectOption("Published");
  await expect(table.getByText("DASAR").first()).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(searchInput).toHaveValue("");
  await expect(statusSelect).toHaveValue("");
  await expect(table.getByText("JLPT N5")).toBeVisible();
});

test("Scenario B: Program editor validates required fields, previews program card, and saves draft/published program", async ({ page }) => {
  await page.goto("/admin/program-harga");
  await page.getByRole("link", { name: "+ Tambah Program" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Program Baru");

  const outline = page.getByRole("navigation", { name: "Outline Program" });
  await expect(outline.getByRole("button", { name: /1\. Informasi/ })).toBeVisible();
  await expect(outline.getByRole("button", { name: /2\. Harga & Akses/ })).toBeVisible();
  await expect(outline.getByRole("button", { name: /3\. Status & Urutan/ })).toBeVisible();

  await page.getByLabel("Slug URL").fill("");
  await page.getByLabel("Nama Program").fill("");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  const alert = page.locator(".assessment-validation");
  await expect(alert).toContainText("Nama program wajib diisi.");
  await expect(alert).toContainText("Slug program wajib diisi.");

  await page.getByLabel("Kode Program").selectOption("N2");
  await page.getByLabel("Nama Program").fill("JLPT N2 Mahir");
  await page.getByLabel("Slug URL").fill("n2-mahir");
  await page.getByLabel("Ringkasan Singkat").fill("Program tingkat lanjut persiapan JLPT N2.");
  await page.getByLabel("Deskripsi Lengkap").fill("Materi lengkap tata bahasa, kanji tingkat mahir, dokkai dan choukai.");

  await outline.getByRole("button", { name: /2\. Harga & Akses/ }).click();
  await page.getByLabel("Harga Belajar Mandiri (Rp)").fill("149000");
  await page.getByLabel("Harga Belajar dengan Sensei (Rp)").fill("499000");
  await page.getByLabel("Durasi Akses Belajar (Bulan)").fill("12");

  await outline.getByRole("button", { name: /3\. Status & Urutan/ }).click();
  await page.getByLabel("Urutan Tampilan").fill("5");

  await page.getByRole("button", { name: "Preview" }).click();
  const previewDialog = page.getByRole("dialog");
  await expect(previewDialog).toContainText("Preview Kartu Program");
  await expect(previewDialog).toContainText("JLPT N2 Mahir");
  await previewDialog.getByRole("button", { name: "Tutup Preview" }).click();
  await expect(previewDialog).toHaveCount(0);

  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.getByRole("status")).toContainText("Perubahan program berhasil disimpan.");

  await page.goto("/admin/program-harga");
  const table = page.getByRole("table", { name: "Daftar Program & Harga" });
  await expect(table.getByText("JLPT N2 Mahir")).toBeVisible();
});

test("Scenario C: Program deletion opens confirmation dialog and removes program on confirm", async ({ page }) => {
  await page.goto("/admin/program-harga");
  const table = page.getByRole("table", { name: "Daftar Program & Harga" });
  await expect(table.getByText("INTERVIEW", { exact: true })).toBeVisible();

  const interviewRow = table.getByRole("row").filter({ hasText: "INTERVIEW" });
  await interviewRow.getByRole("button", { name: "Hapus" }).click();

  const confirmDialog = page.getByRole("dialog");
  await expect(confirmDialog).toContainText("Hapus Program?");
  await confirmDialog.getByRole("button", { name: "Batal" }).click();
  await expect(confirmDialog).toHaveCount(0);
  await expect(table.getByText("INTERVIEW", { exact: true })).toBeVisible();

  await interviewRow.getByRole("button", { name: "Hapus" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Hapus" }).click();
  await expect(table.getByText("INTERVIEW", { exact: true })).toHaveCount(0);
});

test("Scenario D: Kurikulum chapter editor handles program selection, empty notices, weight rules, and section configuration", async ({ page }) => {
  await page.goto("/admin/kurikulum-materi");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Kurikulum & Materi");

  const programSelect = page.getByRole("combobox", { name: "Pilih Program:" });
  await programSelect.selectOption("INTERVIEW");
  await expect(page.getByText("Struktur program belum dikonfigurasi")).toBeVisible();

  await programSelect.selectOption("N5");
  await page.getByRole("button", { name: "+ Tambah Chapter" }).click();
  await expect(page.getByRole("region", { name: "Bobot Progres Siswa" })).toBeVisible();
  await expect(page.getByText("JLPT N5–N2: Video 20%, Modul PDF 5%, Flashcard 20%, Audio 20%, Reading 20%, Checkpoint 15%")).toBeVisible();

  await page.getByLabel("Judul Chapter").fill("Chapter 99: Percakapan Penutup");
  await page.getByLabel("Slug URL").fill("chapter-99-percakapan-penutup");
  await page.getByLabel("Deskripsi Singkat").fill("Membahas kesimpulan percakapan dasar sehari-hari.");

  const outline = page.getByRole("navigation", { name: "Outline Chapter" });
  await outline.getByRole("button", { name: /2\. Video/ }).click();
  await page.getByLabel("URL Video (YouTube / Embed)").fill("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  await page.getByLabel("Estimasi Durasi Video (Menit)").fill("25");

  await outline.getByRole("button", { name: /3\. Modul/ }).click();
  await page.getByLabel("Judul Dokumen PDF").fill("Modul Percakapan Lengkap");
  await page.getByLabel("URL / Path Dokumen PDF").fill("/files/n5/modul-99.pdf");

  await outline.getByRole("button", { name: /5\. Audio/ }).click();
  await page.getByLabel("Judul Audio Soal").fill("Audio Percakapan Penutup");
  await page.getByLabel("URL / Path File Audio").fill("/audio/n5/audio-99.mp3");

  await outline.getByRole("button", { name: /6\. Reading/ }).click();
  await page.getByLabel("Judul Bacaan").fill("Teks Percakapan Penutup");
  await page.getByLabel("Teks Bacaan (Passage)").fill("これはテストの文章です。");

  await page.getByRole("button", { name: "Preview" }).click();
  const preview = page.getByRole("dialog");
  await expect(preview.getByRole("heading", { name: "Preview Ringkasan Chapter" })).toBeVisible();
  await expect(preview).toContainText("Chapter 99: Percakapan Penutup");
  await preview.getByRole("button", { name: "Tutup Preview" }).click();

  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.getByRole("status")).toContainText("Chapter berhasil disimpan.");

  await page.getByRole("button", { name: "← Kembali ke Daftar Chapter" }).click();
  const table = page.getByRole("table", { name: "Daftar Chapter N5" });
  await expect(table.getByText("Chapter 99: Percakapan Penutup")).toBeVisible();
});

test("Scenario E: Chapter reordering persists order updates and chapter deletion removes chapter", async ({ page }) => {
  await page.goto("/admin/kurikulum-materi");
  const programSelect = page.getByRole("combobox", { name: "Pilih Program:" });
  await programSelect.selectOption("N5");

  const table = page.getByRole("table", { name: "Daftar Chapter N5" });
  const rows = table.getByRole("row");
  await expect(rows.nth(1)).toContainText("Perkenalan Diri & Partikel Dasar");
  await expect(rows.nth(2)).toContainText("Menunjukkan Benda & Lokasi");

  const firstDownBtn = rows.nth(1).getByRole("button", { name: "Turunkan urutan" });
  await firstDownBtn.click();
  await expect(rows.nth(1)).toContainText("Menunjukkan Benda & Lokasi");
  await expect(rows.nth(2)).toContainText("Perkenalan Diri & Partikel Dasar");

  const deleteBtn = rows.nth(1).getByRole("button", { name: "Hapus" });
  await deleteBtn.click();
  const confirm = page.getByRole("dialog");
  await expect(confirm).toContainText("Hapus Chapter?");
  await confirm.getByRole("button", { name: "Batal" }).click();

  await deleteBtn.click();
  await page.getByRole("dialog").getByRole("button", { name: "Hapus" }).click();
  await expect(table.getByText("Menunjukkan Benda & Lokasi")).toHaveCount(0);
});

test("Scenario F: Flashcard deck authoring manages cards and provides interactive flip preview", async ({ page }) => {
  await page.goto("/admin/kurikulum-materi");
  await page.getByRole("tab", { name: "Flashcard" }).click();

  const deckTable = page.getByRole("table", { name: "Daftar Flashcard Deck" });
  await expect(deckTable).toBeVisible();
  await expect(deckTable.getByText("Kosakata Rutinitas Harian N4")).toBeVisible();

  await page.getByRole("button", { name: "+ Tambah Deck" }).click();
  await expect(page.getByRole("heading", { name: "Pengaturan Dek" })).toBeVisible();

  await page.getByLabel("Judul Dek").fill("Deck Kosakata N5 Tambahan");

  const cardItems = page.locator(".card-editor-item");
  const firstCard = cardItems.first();
  await firstCard.getByLabel("Depan (Front / Kanji / Kosakata)").fill("猫");
  await firstCard.getByLabel("Belakang (Back)").fill("Kucing");
  await firstCard.getByLabel("Cara Baca (Reading / Furigana)").fill("ねこ");

  await page.getByRole("button", { name: "+ Tambah Kartu" }).click();
  const secondCard = cardItems.nth(1);
  await secondCard.getByLabel("Depan (Front / Kanji / Kosakata)").fill("犬");
  await secondCard.getByLabel("Belakang (Back)").fill("Anjing");

  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.getByRole("status")).toContainText("Dek flashcard berhasil disimpan.");
  await page.getByRole("button", { name: "← Kembali ke Daftar Flashcard" }).click();

  await expect(deckTable.getByText("Deck Kosakata N5 Tambahan")).toBeVisible();

  const newRow = deckTable.getByRole("row").filter({ hasText: "Deck Kosakata N5 Tambahan" });
  await newRow.getByRole("button", { name: "Preview Flip" }).click();

  const flipDialog = page.getByRole("dialog");
  await expect(flipDialog).toContainText("DEPAN");
  await expect(flipDialog).toContainText("猫");

  await flipDialog.getByRole("button", { name: "Putar Kartu (Flip)" }).click();
  await expect(flipDialog).toContainText("BELAKANG");
  await expect(flipDialog).toContainText("Kucing");

  await flipDialog.getByRole("button", { name: "Tutup", exact: true }).click();
  await expect(flipDialog).toHaveCount(0);
});

test("Scenario G: Perpustakaan materi and replay rekaman manage library items and youtube class recordings", async ({ page }) => {
  await page.goto("/admin/kurikulum-materi");

  await page.getByRole("tab", { name: "Perpustakaan Materi" }).click();
  const libTable = page.getByRole("table", { name: "Daftar Perpustakaan Materi" });
  await expect(libTable).toBeVisible();

  await page.getByRole("button", { name: "+ Tambah Materi" }).click();
  const libModal = page.getByRole("dialog");
  await expect(libModal.getByRole("heading", { name: "Tambah Materi Baru" })).toBeVisible();

  await libModal.getByLabel("Judul Materi").fill("Daftar Kanji Lengkap N5");
  await libModal.getByLabel("Jenis Materi").selectOption("Kanji");
  await libModal.getByLabel("URL File / Sumber").fill("/files/n5/kanji-n5.pdf");
  await libModal.getByLabel("Deskripsi").fill("Panduan 100 kanji N5 lengkap dengan goyaku.");
  await libModal.getByRole("button", { name: "Simpan Materi" }).click();
  await expect(libTable.getByText("Daftar Kanji Lengkap N5")).toBeVisible();

  await page.getByRole("tab", { name: "Replay Rekaman" }).click();
  const replayTable = page.getByRole("table", { name: "Daftar Replay Rekaman" });
  await expect(replayTable).toBeVisible();

  await page.getByRole("button", { name: "+ Tambah Replay" }).click();
  const replayModal = page.getByRole("dialog");
  await expect(replayModal.getByRole("heading", { name: "Tambah Replay Baru" })).toBeVisible();

  await replayModal.getByLabel("Judul Sesi Replay").fill("Live Q&A Persiapan JLPT N5");
  await replayModal.getByLabel("Nama Sensei").fill("Tanaka Sensei");
  await replayModal.getByLabel("Tanggal Pelaksanaan").fill("2026-09-20");
  await replayModal.getByLabel("Durasi (Menit)").fill("90");
  await replayModal.getByLabel("URL YouTube").fill("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  await expect(replayModal.getByText("Preview Video:")).toBeVisible();

  await replayModal.getByRole("button", { name: "Simpan Replay" }).click();
  await expect(replayTable.getByText("Live Q&A Persiapan JLPT N5")).toBeVisible();
});

test("program & harga hub stays usable at supported responsive widths", async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/program-harga");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Program & Harga");
    await expect(page.getByRole("table", { name: "Daftar Program & Harga" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("program & harga editor stays usable at supported responsive widths", async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/program-harga?action=new");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Program Baru");
    await expectNoHorizontalOverflow(page);

    const outline = page.locator(".program-editor-outline");
    const content = page.locator(".program-editor-content");

    if (width <= 820) {
      await expect(page.getByRole("button", { name: "Outline", exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Outline", exact: true }).click();
      await expect(outline).toBeVisible();

      await page.getByRole("button", { name: "Editor", exact: true }).click();
      await expect(content).toBeVisible();
    } else {
      await expect(page.locator(".assessment-mobile-tabs")).toBeHidden();
      await expect(outline).toBeVisible();
      await expect(content).toBeVisible();
    }
    await expectNoHorizontalOverflow(page);
  }
});

test("kurikulum & materi hub stays usable at supported responsive widths", async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/kurikulum-materi");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Kurikulum & Materi");
    await expect(page.getByRole("tab", { name: "Kurikulum" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Flashcard" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("kurikulum & materi chapter editor stays usable at supported responsive widths", async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/kurikulum-materi");
    await page.getByRole("button", { name: "Edit" }).first().click();
    await expect(page.getByRole("region", { name: "Bobot Progres Siswa" })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const outline = page.locator(".chapter-outline-menu");
    const content = page.locator(".chapter-editor-panel");

    if (width <= 820) {
      await expect(page.getByRole("button", { name: "Outline", exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Outline", exact: true }).click();
      await expect(outline).toBeVisible();

      await page.getByRole("button", { name: "Editor", exact: true }).click();
      await expect(content).toBeVisible();
    } else {
      await expect(page.locator(".assessment-mobile-tabs")).toBeHidden();
      await expect(outline).toBeVisible();
      await expect(content).toBeVisible();
    }
    await expectNoHorizontalOverflow(page);
  }
});
