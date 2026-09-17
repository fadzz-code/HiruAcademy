import { expect, test, type Page } from "@playwright/test";

const storageKey = "hiru-admin-assessments:v1";
const now = "2026-09-17T00:00:00.000Z";

function question(id: string, prompt: string, sectionId?: string) {
  return { id, prompt, explanation: "", imageUrl: "", audioUrl: "", sectionId, options: [
    { id: `${id}-a`, text: "A", isCorrect: true },
    { id: `${id}-b`, text: "B", isCorrect: false },
    { id: `${id}-c`, text: "C", isCorrect: false },
    { id: `${id}-d`, text: "D", isCorrect: false },
  ] };
}

async function seed(page: Page, assessments: object[]) {
  await page.goto("/");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify({ version: 1, assessments: value })), { key: storageKey, value: assessments });
}

async function fillBasics(page: Page, values: { title: string; level: string; category?: string; order?: string; duration?: string; session?: string; part?: string }) {
  const panel = page.locator(".assessment-editor-panel");
  const field = (label: string) => panel.locator("label").filter({ hasText: label });
  await field("Judul").getByRole("textbox").fill(values.title);
  await field("Level").getByRole("combobox").selectOption(values.level);
  if (values.category) await field("Kategori").getByRole("combobox").selectOption(values.category);
  if (values.order) await field("Urutan").getByRole("spinbutton").fill(values.order);
  if (values.duration) await field("Durasi (menit)").getByRole("spinbutton").fill(values.duration);
  if (values.session) await field("Sesi").getByRole("combobox").selectOption(values.session);
  if (values.part) await field("Part").getByRole("combobox").selectOption(values.part);
}

async function addSection(page: Page, name: string, maxScore: string) {
  await page.getByRole("button", { name: "Dasar & Pengaturan" }).click();
  await page.getByRole("button", { name: "Tambah Section" }).click();
  await page.locator(".assessment-workspace aside").getByRole("button", { name: /^Section \d+$/ }).last().click();
  const panel = page.locator(".assessment-editor-panel");
  await panel.getByLabel("Nama section").fill(name);
  await panel.getByLabel("Skor maksimum").fill(maxScore);
}

async function addValidQuestion(page: Page, prompt: string, section?: string) {
  await page.getByRole("button", { name: "Tambah Pertanyaan" }).click();
  const panel = page.locator(".assessment-editor-panel");
  if (section) await panel.getByLabel("Section").selectOption({ label: section });
  await panel.getByLabel("Pertanyaan", { exact: true }).fill(prompt);
  await panel.getByRole("textbox", { name: "Opsi 1", exact: true }).fill(`${prompt} A`);
  await panel.getByRole("textbox", { name: "Opsi 2", exact: true }).fill(`${prompt} B`);
  await panel.getByLabel("Jawaban benar 1").check();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate((key) => localStorage.removeItem(key), storageKey);
});

test("hub uses real tabs, search, status, and level filters", async ({ page }) => {
  await seed(page, [
    { id: "p", type: "practice", status: "Published", title: "Latihan N4 Reading Latihan 03", level: "N4", category: "Reading", order: 3, questions: [question("p1", "Practice prompt")], sections: [], updatedAt: now },
    { id: "m", type: "mini", status: "Draft", title: "Mini N5", level: "N5", session: 1, part: 1, questions: [question("m1", "Mini prompt")], sections: [], updatedAt: now },
  ]);
  await page.goto("/admin/bank-soal");
  await page.getByRole("tab", { name: "Latihan", exact: true }).click();
  await expect(page.getByRole("row", { name: /Latihan N4 Reading Latihan 03/ })).toBeVisible();
  await expect(page.getByText("Mini N5")).toHaveCount(0);
  await page.locator(".assessment-filters label").filter({ hasText: "Level" }).getByRole("combobox").selectOption("N4");
  await page.locator(".assessment-filters label").filter({ hasText: "Status" }).getByRole("combobox").selectOption("Published");
  await page.getByLabel("Cari assessment").fill("reading");
  await expect(page.getByRole("row", { name: /Latihan N4 Reading Latihan 03/ })).toBeVisible();
  await page.locator(".assessment-filters label").filter({ hasText: "Status" }).getByRole("combobox").selectOption("Draft");
  await expect(page.getByText("Belum ada assessment yang sesuai filter.")).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByLabel("Cari assessment")).toHaveValue("");
});

test("create and stored assessment hydrate without React or page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error" && /hydration|same key|unique key/i.test(message.text())) errors.push(message.text()); });
  await page.goto("/admin/bank-soal/baru?type=practice");
  await expect(page.getByRole("heading", { name: "Latihan" })).toBeVisible();
  await seed(page, [{ id: "broken-keys", type: "tryout", status: "Draft", title: "Broken keys", level: "N4", questions: [{ ...question("", "Stored prompt", ""), options: [{ id: "", text: "A", isCorrect: true }, { id: "", text: "B", isCorrect: false }] }], sections: [{ id: "", name: "Moji Goi", maxScore: 60 }, { id: "", name: "Dokkai", maxScore: 60 }], updatedAt: now }]);
  await page.goto("/admin/bank-soal/baru?id=broken-keys");
  await expect(page.getByRole("heading", { name: "Broken keys" })).toBeVisible();
  await page.getByRole("button", { name: "Preview" }).click();
  await expect(page.getByRole("dialog")).toContainText("Stored prompt");
  expect(errors).toEqual([]);
});

test("invalid publish is blocked and saved draft stays absent for student", async ({ page }) => {
  await page.goto("/admin/bank-soal/baru?type=practice");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page.locator(".assessment-validation")).toContainText("Judul wajib diisi.");
  await fillBasics(page, { title: "Draft Rahasia", level: "N4", category: "Reading", order: "9" });
  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await page.goto("/practice?membership=lms");
  await page.getByLabel("Pilih Level").selectOption("N4");
  await page.getByRole("button", { name: "Reading" }).click();
  await expect(page.getByText("Draft Rahasia")).toHaveCount(0);
});

test("Latihan N4 Reading Latihan 03 publishes through UI and reaches three-question runner", async ({ page }) => {
  await page.goto("/admin/bank-soal/baru?type=practice");
  await fillBasics(page, { title: "Latihan N4 Reading Latihan 03", level: "N4", category: "Reading", order: "3" });
  await addValidQuestion(page, "Admin prompt satu");
  await addValidQuestion(page, "Admin prompt dua");
  await addValidQuestion(page, "Admin prompt tiga");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=/);
  await page.goto("/admin/bank-soal");
  await page.reload();
  await expect(page.getByRole("row", { name: /Latihan N4 Reading Latihan 03/ })).toBeVisible();
  await page.goto("/practice?membership=lms");
  await page.getByLabel("Pilih Level").selectOption("N4");
  await page.getByRole("button", { name: "Reading" }).click();
  const card = page.getByRole("article").filter({ hasText: "Latihan N4 Reading Latihan 03" });
  await expect(card).toContainText("3 Soal");
  await card.getByRole("button", { name: "Mulai Latihan" }).click();
  await expect(page.getByRole("heading", { name: "Admin prompt satu" })).toBeVisible();
  await expect(page.getByText("Soal 1/3")).toBeVisible();
});

test("Try Out created and published through Admin reaches student runner", async ({ page }) => {
  await page.goto("/admin/bank-soal/baru?type=tryout");
  await fillBasics(page, { title: "Try Out N4 Try Out 02", level: "N4", duration: "100" });
  await addSection(page, "Moji Goi", "60");
  await addSection(page, "Dokkai", "60");
  await addValidQuestion(page, "Tryout admin prompt", "Moji Goi");
  await addValidQuestion(page, "Second section prompt", "Dokkai");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=/);
  await page.goto("/tryout?membership=lms");
  const card = page.getByRole("article").filter({ hasText: "Try Out N4 Try Out 02" });
  await expect(card).toContainText("2 soal");
  await card.getByRole("button", { name: "Mulai Try Out" }).click();
  await expect(page.getByText("100 Menit")).toBeVisible();
  await expect(page.getByText("2 Sesi")).toBeVisible();
  await expect(page.getByText("120 Poin")).toBeVisible();
  await expect(page.getByText("Moji Goi").locator("..")).toContainText("1 soal");
  await expect(page.getByText("Dokkai").locator("..")).toContainText("1 soal");
  await page.getByRole("button", { name: /Mulai Try Out/ }).click();
  await expect(page.getByRole("heading", { name: "Tryout admin prompt" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Soal 1 dari 2" })).toBeVisible();
});

test("Mini created and published through Admin reaches student runner", async ({ page }) => {
  await page.goto("/admin/bank-soal/baru?type=mini");
  await fillBasics(page, { title: "Mini N4 Sesi 2 Part 1", level: "N4", duration: "12", session: "2", part: "1" });
  await addValidQuestion(page, "Mini admin prompt");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=/);
  await page.goto("/mini-checkpoint?membership=sensei");
  const card = page.getByRole("article").filter({ hasText: "Mini N4 Sesi 2 Part 1" });
  await expect(async () => {
    await page.getByLabel("Pilih Level:").selectOption("N4");
    await expect(card).toContainText("1 soal singkat");
  }).toPass();
  await card.getByRole("button", { name: "Mulai Checkpoint" }).click();
  await page.getByRole("button", { name: "Mulai Mini Checkpoint" }).click();
  await expect(page.getByRole("heading", { name: "Mini admin prompt" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Soal 1 dari 1" })).toBeVisible();
});

test("Checkpoint builder saves and publishes persisted Admin fields", async ({ page }) => {
  await page.goto("/admin/bank-soal/baru?type=checkpoint");
  await fillBasics(page, { title: "Checkpoint N4 Chapter 2", level: "N4" });
  await page.locator(".assessment-editor-panel").getByLabel("Chapter").fill("2");
  await addValidQuestion(page, "Checkpoint admin prompt");
  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=/);
  await page.reload();
  await page.getByRole("button", { name: "Dasar & Pengaturan" }).click();
  await expect(page.locator(".assessment-editor-panel").getByLabel("Judul")).toHaveValue("Checkpoint N4 Chapter 2");
  await expect(page.locator(".assessment-editor-panel").getByLabel("Level")).toHaveValue("N4");
  await expect(page.locator(".assessment-editor-panel").getByLabel("Chapter")).toHaveValue("2");
  await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), storageKey)).toContain("Checkpoint admin prompt");
  await page.getByRole("button", { name: "Terbitkan" }).click();
  await page.goto("/admin/bank-soal");
  const row = page.getByRole("row", { name: /Checkpoint N4 Chapter 2/ });
  await expect(row).toContainText("Checkpoint");
  await expect(row).toContainText("Terbit");
});

test("question C moves first and persists after save", async ({ page }) => {
  await seed(page, [{ id: "reorder", type: "practice", status: "Draft", title: "Reorder", level: "N4", category: "Reading", order: 4, questions: [question("a", "Question A"), question("b", "Question B"), question("c", "Question C")], sections: [], updatedAt: now }]);
  await page.goto("/admin/bank-soal/baru?id=reorder");
  await page.getByRole("button", { name: "Naikkan pertanyaan 3" }).click();
  await page.getByRole("button", { name: "Naikkan pertanyaan 2" }).click();
  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=reorder/);
  await page.goto("/admin/bank-soal");
  await page.reload();
  await page.getByRole("row", { name: /Reorder/ }).getByRole("link", { name: "Edit" }).click();
  await expect(page.getByRole("heading", { name: "Reorder" })).toBeVisible();
  const prompts = await page.locator(".assessment-workspace aside li button").filter({ hasText: /Question [ABC]/ }).allTextContents();
  expect(prompts.slice(0, 3)).toEqual(["1. Question C", "2. Question A", "3. Question B"]);
});

const responsiveWidths = [360, 390, 768, 820, 1024, 1440] as const;

async function expectNoHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => ({
    body: document.body.scrollWidth <= document.body.clientWidth,
    page: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  }))).toEqual({ body: true, page: true });
}

test("bank-soal hub stays usable at supported responsive widths", async ({ page }) => {
  await seed(page, [{ id: "responsive", type: "practice", status: "Draft", title: "Responsive Practice", level: "N4", category: "Reading", order: 1, questions: [question("responsive-1", "Responsive prompt")], sections: [], updatedAt: now }]);

  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/bank-soal");
    await expect(page.getByRole("heading", { name: "Bank Soal" })).toBeVisible();
    const table = page.locator(".admin-data-table-wrap");
    await expect(table).toBeVisible();
    await expect(table.getByRole("row", { name: /Responsive Practice/ })).toBeVisible();
    expect(await table.evaluate((element) => element.scrollWidth <= element.clientWidth || getComputedStyle(element).overflowX === "auto")).toBe(true);
    await expectNoHorizontalOverflow(page);
  }
});

test("assessment editor stays usable at supported responsive widths", async ({ page }) => {
  for (const width of responsiveWidths) {
    const errors: string[] = [];
    const onPageError = (error: Error) => errors.push(error.message);
    page.on("pageerror", onPageError);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/admin/bank-soal/baru?type=practice");
    await expect(page.getByRole("heading", { name: "Latihan" })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const workspace = page.locator(".assessment-workspace");
    const outline = workspace.locator("aside");
    const editor = workspace.locator("section");
    if (width <= 820) {
      await expect(page.getByRole("button", { name: "Outline", exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Outline", exact: true }).click();
      await expect(outline).toBeVisible();
      await page.getByRole("button", { name: "Editor", exact: true }).click();
      await expect(editor).toBeVisible();
      await page.getByRole("button", { name: "Outline", exact: true }).click();
      await page.getByRole("button", { name: "Tambah Pertanyaan" }).click();
      const option = page.locator(".assessment-option").first();
      await expect(option).toBeVisible();
      const positions = await option.locator("input, button").evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().top));
      expect(Math.max(...positions)).toBeGreaterThan(Math.min(...positions));
    } else {
      await expect(page.locator(".assessment-mobile-tabs")).toBeHidden();
      await expect(outline).toBeVisible();
      await expect(editor).toBeVisible();
      expect(await workspace.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length)).toBe(2);
    }
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
    page.off("pageerror", onPageError);
  }
});

test("mobile creates, edits, adds option, selects correct, previews, saves without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin/bank-soal/baru?type=practice");
  await page.getByRole("button", { name: "Dasar & Pengaturan" }).click();
  await fillBasics(page, { title: "Mobile Practice", level: "N4", category: "Reading", order: "5" });
  await page.getByRole("button", { name: "Outline", exact: true }).click();
  await addValidQuestion(page, "Mobile prompt");
  await page.getByRole("button", { name: "Tambah Opsi" }).click();
  await page.getByRole("textbox", { name: "Opsi 5", exact: true }).fill("Mobile option five");
  await page.getByLabel("Jawaban benar 5").focus();
  await page.keyboard.press("Space");
  await expect(page.getByLabel("Jawaban benar 5")).toBeChecked();
  await page.getByRole("button", { name: "Preview" }).click();
  await expect(page.getByRole("dialog")).toContainText("Mobile prompt");
  await page.getByRole("button", { name: "Tutup dialog" }).click();
  await page.getByRole("button", { name: "Simpan Draft" }).click();
  await expect(page).toHaveURL(/\/admin\/bank-soal\/baru\?id=/);
  await page.goto("/admin/bank-soal");
  await page.reload();
  await page.getByRole("row", { name: /Mobile Practice/ }).getByRole("link", { name: "Edit" }).click();
  await page.getByRole("button", { name: /1\. Mobile prompt/ }).click();
  await expect(page.getByRole("textbox", { name: "Opsi 5", exact: true })).toHaveValue("Mobile option five");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
