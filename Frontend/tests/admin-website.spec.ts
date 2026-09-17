import { expect, test, type Page } from "@playwright/test";

const storageKey = "hiru-admin-website:v1";
const adminRoutes = [
  "/admin/landing-page",
  "/admin/blog-seo",
  "/admin/testimoni",
  "/admin/pengumuman",
];
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

test("Scenario 1: Landing Hero edit -> Draft hidden on '/' -> Publish -> new copy visible on '/'", async ({
  page,
}) => {
  await page.goto("/admin/landing-page");
  await expect(page.getByRole("heading", { name: "Pengelolaan Landing Page" })).toBeVisible();

  const headlineInput = page.getByLabel("Judul Utama (Headline)");
  await headlineInput.fill("Bahasa Jepang Praktis Bersama Sensei");

  await page.getByRole("button", { name: "Simpan Draf", exact: true }).click();
  await expect(page.getByText("Draf bagian landing page berhasil disimpan.")).toBeVisible();

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
    "Bahasa Jepang Praktis Bersama Sensei"
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Belajar Bahasa Jepang Terarah"
  );

  await page.goto("/admin/landing-page");
  await expect(page.getByLabel("Judul Utama (Headline)")).toHaveValue(
    "Bahasa Jepang Praktis Bersama Sensei"
  );

  await page.getByRole("button", { name: "Terbitkan Perubahan" }).click();
  await expect(page.getByText("Landing page berhasil diterbitkan ke publik!")).toBeVisible();

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Bahasa Jepang Praktis Bersama Sensei"
  );
});

test("Scenario 2: Promo campaign -> N4 promo active -> Landing pricing card shows promo badge/pricing -> base price unaffected", async ({
  page,
}) => {
  await page.goto("/admin/landing-page");
  await page.getByRole("tab", { name: "Kampanye & Promo" }).click();

  await page.getByRole("button", { name: "+ Buat Kampanye Baru" }).click();
  await expect(page.getByRole("heading", { name: "Detail Kampanye Promo" })).toBeVisible();

  await page.getByLabel("Nama Kampanye").fill("Promo Kilat JLPT N4");
  await page.getByLabel("Kode Promo (Kupon)").fill("KILATN4");
  await page.getByLabel("Teks Banner Pengumuman Promo").fill("Diskon Kilat N4 Spesial!");
  await page.getByLabel("Tipe Diskon").selectOption("percentage");
  await page.getByLabel(/Nilai Diskon/).fill("20");

  const n5Btn = page.getByRole("button", { name: /^N5/ });
  if ((await n5Btn.textContent())?.includes("✓")) {
    await n5Btn.click();
  }

  const n4Btn = page.getByRole("button", { name: /^N4/ });
  if (!(await n4Btn.textContent())?.includes("✓")) {
    await n4Btn.click();
  }

  await page.getByRole("button", { name: "Terbitkan Kampanye" }).click();

  await page.goto("/");
  const mandiriCard = page.getByRole("article").filter({ hasText: "LMS のみ (Only)" });
  await expect(mandiriCard).toBeVisible();
  await expect(mandiriCard.getByText("N4 Belajar Mandiri")).toBeVisible();
  await expect(mandiriCard.getByText("Diskon Kilat N4 Spesial!")).toBeVisible();
  await expect(mandiriCard.getByText("Mulai Rp 79.200")).toBeVisible();
  await expect(mandiriCard.locator("s")).toHaveText("Mulai Rp 99k");

  const freeCard = page.getByRole("article").filter({ hasText: "Coba Gratis" });
  await expect(freeCard.getByText("Rp 0")).toBeVisible();
});

test("Scenario 3: Blog authoring -> Title, slug, summary, body blocks, SEO -> Draft hidden on '/blog' -> Publish -> visible on '/blog' -> open '/blog/article?slug=...' shows content", async ({
  page,
}) => {
  await page.goto("/admin/blog-seo");
  await page.getByRole("link", { name: "+ Buat Artikel Baru" }).click();
  await expect(page.getByRole("heading", { name: "Informasi Pokok Artikel" })).toBeVisible();

  await page.getByLabel("Judul Artikel").fill("Panduan Efektif Menembus JLPT N3");
  await page.getByLabel(/Slug URL/).fill("panduan-efektif-menembus-jlpt-n3");
  await page
    .getByLabel("Ringkasan / Excerpt")
    .fill("Langkah strategis memahami materi N3 dengan efisien dan terarah.");
  await page
    .getByPlaceholder("Ketik paragraf...")
    .fill("Kunci kelulusan JLPT N3 terletak pada penguasaan dokkai dan variasi pola tata bahasa.");

  await page.getByRole("button", { name: "2. Pengaturan SEO & Pratinjau" }).click();
  await page.getByLabel(/Meta Title/).fill("Panduan Efektif Menembus JLPT N3 - Hiru Academy");
  await page
    .getByLabel(/Meta Description/)
    .fill("Pelajari panduan komprehensif menghadapi ujian JLPT N3 bersama Sensei.");

  await page.getByRole("button", { name: "Simpan Draf" }).click();

  await page.goto("/blog");
  await expect(page.getByText("Panduan Efektif Menembus JLPT N3")).toHaveCount(0);

  await page.goto("/admin/blog-seo");
  const draftRow = page.getByRole("row").filter({ hasText: "Panduan Efektif Menembus JLPT N3" });
  await expect(draftRow).toBeVisible();
  await draftRow.getByRole("link", { name: "Ubah" }).click();

  await page.getByRole("button", { name: "Terbitkan" }).click();

  await page.goto("/blog");
  await expect(
    page.getByRole("heading", { name: "Panduan Efektif Menembus JLPT N3" })
  ).toBeVisible();

  await page.goto("/blog/article?slug=panduan-efektif-menembus-jlpt-n3");
  await expect(
    page.getByRole("heading", { level: 1, name: "Panduan Efektif Menembus JLPT N3" })
  ).toBeVisible();
  await expect(
    page.getByText("Kunci kelulusan JLPT N3 terletak pada penguasaan dokkai")
  ).toBeVisible();
});

test("Scenario 4: Testimonial -> Create -> Approve -> Featured -> Publish -> appears on Landing and '/testimoni'", async ({
  page,
}) => {
  await page.goto("/admin/testimoni");
  await page.getByRole("link", { name: "+ Tambah Testimoni" }).click();
  await expect(page.getByRole("heading", { name: "Detail Testimoni & Persetujuan" })).toBeVisible();

  await page.getByLabel("Nama Siswa / Pembelajar").fill("Kenjiro Tanaka");
  await page.getByLabel("Program / Membership").fill("Belajar Mandiri (N4)");
  await page
    .getByLabel("Kutipan Testimoni")
    .fill("Sistem flashcard dan evaluasi chapter membuat proses belajar terasa jauh lebih ringan!");

  await page.getByLabel(/Persetujuan \(Consent\) Tertulis Siswa/).check();
  await page.getByLabel(/Tampilkan sebagai Testimoni Unggulan di Beranda/).check();

  await page.getByRole("button", { name: "Terbitkan" }).click();

  await page.goto("/");
  const landingTesti = page.locator(".landing-testimonials");
  await expect(landingTesti.getByText("Kenjiro Tanaka")).toBeVisible();
  await expect(
    landingTesti.getByText("Sistem flashcard dan evaluasi chapter membuat proses belajar")
  ).toBeVisible();

  await page.goto("/testimoni");
  const testiPage = page.locator(".testimonials-page");
  await expect(testiPage.getByText("Kenjiro Tanaka")).toBeVisible();
  await expect(
    testiPage.getByText("Sistem flashcard dan evaluasi chapter membuat proses belajar")
  ).toBeVisible();
});

test("Scenario 5: Announcement -> Audience = LMS, Priority = Penting, active now -> Publish -> visible on '/notifications?membership=lms' -> absent on '/notifications?membership=free'", async ({
  page,
}) => {
  await page.goto("/admin/pengumuman");
  await page.getByRole("link", { name: "+ Buat Pengumuman Baru" }).click();
  await expect(page.getByRole("heading", { name: "Konfigurasi Pengumuman" })).toBeVisible();

  await page.getByLabel("Judul Pengumuman").fill("Pemeliharaan Khusus Server LMS");
  await page
    .getByLabel("Isi Pesan Pengumuman")
    .fill("Akses chapter dan latihan mandiri akan diperbarui dengan sistem skor otomatis.");
  await page.getByLabel("Sasaran Penerima (Audience)").selectOption("lms");
  await page.getByLabel("Tingkat Prioritas").selectOption("important");

  await page.getByRole("button", { name: "Terbitkan" }).click();

  await page.goto("/notifications?membership=lms");
  await expect(page.getByText("Pemeliharaan Khusus Server LMS")).toBeVisible();
  await expect(
    page.getByText("Akses chapter dan latihan mandiri akan diperbarui")
  ).toBeVisible();
  await expect(page.getByText("Penting").first()).toBeVisible();

  await page.goto("/notifications?membership=free");
  await expect(page.getByText("Pemeliharaan Khusus Server LMS")).toHaveCount(0);
});

for (const route of adminRoutes) {
  for (const width of responsiveWidths) {
    test(`Scenario 6: responsive check ${route} at ${width}px has no horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 850 });
      await page.goto(route);
      await expectNoHorizontalOverflow(page);
    });
  }
}
