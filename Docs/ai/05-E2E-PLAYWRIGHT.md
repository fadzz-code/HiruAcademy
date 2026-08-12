# E2E PLAYWRIGHT — HIRU ACADEMY

**File:** `docs/ai/05-E2E-PLAYWRIGHT.md`  
**Batch:** 5 / End-to-End Testing Contract  
**Tanggal baseline:** 12 Agustus 2026  
**Produk:** HIRU Academy — Website penjualan kelas Bahasa Jepang + LMS + Blog/CMS SEO + Admin Console  
**Target stack:** Next.js App Router + React + TypeScript + Tailwind CSS + Laravel + Laravel Sanctum + PostgreSQL + S3-compatible object storage  
**E2E framework:** Playwright Test  
**Status:** **PRE-IMPLEMENTATION E2E CONTRACT + FRONTEND-FIRST TEST BLUEPRINT**  
**Bergantung pada:** `01-PRD-HIRU-ACADEMY.md`, `02-UI-UX-DESIGN-BRIEF.md`, `03-SECURITY-AUDIT.md`, `04-DEBUG-PLAYBOOK.md`

---

# 0. Ringkasan Eksekutif

Dokumen ini mendefinisikan kontrak End-to-End testing HIRU Academy menggunakan Playwright.

Tujuannya bukan sekadar membuat beberapa file `.spec.ts`, tetapi memastikan seluruh journey yang bernilai bisnis tinggi tetap bekerja ketika:

- frontend Next.js berkembang;
- mock data diganti API Laravel;
- membership/entitlement mulai nyata;
- invoice diverifikasi Admin;
- assessment memiliki timer/autosave;
- media memakai storage;
- Blog/CMS mulai public;
- shared components direfactor;
- deployment masuk staging dan production.

Playwright digunakan sebagai browser-level acceptance layer.

Playwright **tidak menggantikan**:

- Laravel feature tests;
- unit tests;
- database constraint;
- authorization server-side;
- manual UX review;
- manual accessibility review;
- security testing.

Playwright memastikan bahwa sistem yang sudah dirakit dapat digunakan dari perspektif user nyata.

**Prinsip utama:**

> Test behavior yang penting bagi user dan bisnis, bukan implementation detail internal.

---

# 1. Source of Truth E2E

Expected behavior ditentukan dengan urutan:

1. **revisi client terbaru**;
2. **Figma Page 08–11** untuk flow, state, entitlement, copy, dan fungsi;
3. `01-PRD-HIRU-ACADEMY.md`;
4. `02-UI-UX-DESIGN-BRIEF.md`;
5. `03-SECURITY-AUDIT.md`;
6. `04-DEBUG-PLAYBOOK.md`;
7. `RefrensiHTML.zip` untuk interaction/experience;
8. `DESIGN.md`;
9. Figma Page 1 untuk referensi visual/component family;
10. PDF lama hanya sebagai cross-check requirement.

Jika E2E test lama bertentangan dengan source of truth terbaru:

> **test harus diperbaiki, bukan produk dipaksa mengikuti test yang sudah obsolete.**

---

# 2. Scope Produk yang Harus Dicakup

HIRU Academy memiliki domain utama:

## Public acquisition

- Landing Page;
- Program;
- Placement Test;
- Testimonial;
- Blog;
- Registration;
- Login;
- Invoice;
- WhatsApp payment handoff;
- Referral/Diskon.

## Membership

- Free;
- LMS / Belajar Mandiri;
- LMS + Sensei.

## Student LMS

- Dashboard;
- level selection;
- journey;
- chapter;
- learning content;
- flashcard;
- audio;
- reading;
- PDF/module;
- latihan;
- checkpoint;
- Try Out;
- history/result/review;
- progress;
- achievement;
- certificate;
- community;
- referral/diskon.

## LMS + Sensei extension

- Jadwal;
- Detail kelas;
- Zoom link/reference;
- Replay;
- Tanya Sensei;
- Mini Checkpoint.

## Admin Console

- user;
- membership/access;
- invoice/payment verification;
- learning content;
- assessment/question/config;
- Placement leads/results;
- media;
- blog/CMS;
- cohort/schedule/replay;
- referral/discount;
- settings yang memang masuk scope final.

---

# 3. Dua Mode E2E

Playwright suite HIRU dibagi menjadi dua mode.

# 3.1 Mode A — Frontend Mock E2E

Digunakan saat frontend dibangun sebelum backend final.

Diuji:

- route;
- navigation;
- component interaction;
- responsive;
- membership UI state;
- loading;
- empty;
- error;
- success;
- assessment runner;
- timer client behavior;
- flashcard;
- visual regression;
- public flow;
- Admin UI flow berbasis fixture;
- mocked API failure.

Tidak boleh disebut validasi production untuk:

- Laravel auth;
- real policy/authorization;
- PostgreSQL consistency;
- real payment activation;
- DB concurrency;
- signed storage;
- CORS/Sanctum;
- server rate limit.

# 3.2 Mode B — Integrated E2E

Menggunakan:

- Next.js application;
- Laravel API;
- test/staging PostgreSQL;
- test S3-compatible storage atau deterministic storage strategy;
- Laravel Sanctum auth;
- seeded/factory data.

Integrated E2E adalah acceptance layer untuk release.

---

# 4. E2E Testing Philosophy

Test harus:

- deterministic;
- isolated;
- repeatable;
- observable;
- business-readable;
- tidak bergantung urutan test lain;
- tidak bergantung data production;
- tidak bergantung waktu nyata bila dapat dikontrol;
- tidak menggunakan selector fragile;
- tidak menggunakan `waitForTimeout` sebagai sinkronisasi utama;
- tidak memasukkan secrets ke repository;
- menghasilkan evidence saat gagal.

---

# 5. Apa yang Tidak Perlu Dijadikan E2E

Jangan membuat seluruh logic menjadi browser test.

Lebih tepat sebagai unit/feature test:

- score formula detail;
- discount formula combinatorial;
- validator;
- policy matrix setiap edge case;
- model relationship;
- serializer detail;
- utility formatting;
- internal helper;
- every button style.

Gunakan E2E untuk:

> “Apakah user dengan kondisi X dapat menyelesaikan tujuan Y dan sistem menghasilkan hasil Z?”

---

# 6. Target Repository Structure

Struktur awal yang direkomendasikan:

```text
/
├─ app/
├─ components/
├─ lib/
├─ tests/
│  └─ e2e/
│     ├─ auth/
│     ├─ public/
│     ├─ placement/
│     ├─ free/
│     ├─ lms/
│     ├─ sensei/
│     ├─ admin/
│     ├─ cross-role/
│     ├─ visual/
│     ├─ accessibility/
│     └─ regression/
├─ playwright/
│  ├─ auth/
│  ├─ fixtures/
│  ├─ factories/
│  ├─ pages/
│  ├─ helpers/
│  └─ data/
├─ playwright.config.ts
└─ package.json
```

Exact folder dapat disesuaikan repository nyata, tetapi pemisahan tanggung jawab dipertahankan.

---

# 7. Naming Convention

Gunakan nama test berdasarkan behavior.

Baik:

```text
placement-result-recommends-program.spec.ts
free-user-sees-premium-content-locked.spec.ts
invoice-verification-activates-membership.spec.ts
tryout-auto-submit-on-expiry.spec.ts
admin-publishes-blog-article.spec.ts
```

Hindari:

```text
test1.spec.ts
dashboard2.spec.ts
button-test.spec.ts
fix-bug.spec.ts
```

---

# 8. Tagging Strategy

Gunakan tags/annotations secara konsisten.

Kategori yang disarankan:

```text
@smoke
@critical
@public
@auth
@free
@lms
@sensei
@admin
@assessment
@payment
@placement
@cms
@visual
@a11y
@regression
@slow
@integrated
@mock
```

Contoh:

```ts
test('Free user sees premium content locked', {
  tag: ['@smoke', '@free', '@critical'],
}, async ({ page }) => {
  // ...
});
```

Jika Playwright version repository memiliki API/tag convention berbeda, ikuti version aktual.

---

# 9. Browser Strategy

Baseline:

## Pull Request / cepat

- Chromium.

## Scheduled / release candidate

- Chromium;
- Firefox;
- WebKit.

Alasan:

- feedback PR tetap cepat;
- compatibility lintas engine tetap diuji secara periodik/release.

Tidak perlu menjalankan seluruh visual snapshot pada tiga browser sejak hari pertama jika biaya/flakiness belum sebanding.

---

# 10. Viewport Strategy

Minimum matrix:

```text
Desktop standard : 1440 × 900
Laptop           : 1366 × 768
Tablet           : 768 × 1024
Mobile           : 390 × 844
Small mobile     : 360 × 800
```

Tidak seluruh suite perlu dikalikan lima.

Gunakan:

- desktop untuk full functional suite;
- mobile untuk critical smoke + responsive regression;
- viewport khusus untuk visual suite.

---

# 11. Device Emulation

Gunakan Playwright device/emulation untuk browser characteristics bila relevan.

Cakupan:

- viewport;
- touch;
- user agent;
- locale;
- timezone;
- color scheme.

Jangan menganggap device emulation identik dengan pengujian hardware nyata.

Final release tetap membutuhkan minimal smoke manual pada device nyata untuk:

- mobile Safari;
- Android Chrome;
- audio;
- file download;
- WhatsApp handoff.

---

# 12. Timezone Baseline

HIRU beroperasi dalam konteks Indonesia.

Default E2E browser:

```ts
use: {
  locale: 'id-ID',
  timezoneId: 'Asia/Jakarta',
}
```

Tambahkan timezone regression untuk:

- UTC;
- timezone lain bila schedule/date logic sensitif.

Assessment expiry harus bergantung absolute timestamp, bukan timezone display.

---

# 13. Base URL

Jangan hardcode host di semua test.

```ts
use: {
  baseURL: process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000',
}
```

Test:

```ts
await page.goto('/login');
```

Integrated API base dapat memiliki env terpisah.

---

# 14. Web Server Strategy

Local/CI dapat menggunakan `webServer` Playwright untuk menyalakan Next.js.

Contoh blueprint:

```ts
webServer: {
  command: process.env.CI
    ? 'npm run start'
    : 'npm run dev',
  url: 'http://127.0.0.1:3000',
  reuseExistingServer: !process.env.CI,
}
```

Namun untuk release-confidence:

> build production + start production Next.js lebih bernilai daripada hanya `next dev`.

Exact scripts mengikuti repository.

---

# 15. Playwright Configuration Blueprint

Contoh kontrak awal:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000',
    locale: 'id-ID',
    timezoneId: 'Asia/Jakarta',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },
  ],
});
```

Ini **blueprint**, bukan file final sebelum scripts/env repository tersedia.

---

# 16. CI Worker Strategy

Playwright merekomendasikan pendekatan stabil pada CI.

HIRU baseline:

```ts
workers: process.env.CI ? 1 : undefined
```

Mulai stabil dahulu.

Setelah suite deterministic:

- ukur durasi;
- naikkan worker bila infrastructure cukup;
- atau gunakan sharding.

Jangan mempercepat suite dengan parallelism sebelum shared test state aman.

---

# 17. Retries

Retry bukan fix flakiness.

Baseline:

```ts
retries: process.env.CI ? 2 : 0
```

Jika test:

```text
fail → retry pass
```

statusnya tetap perlu dianggap **flaky candidate** dan diinvestigasi.

Jangan menyembunyikan test buruk dengan `retries: 5`.

---

# 18. Trace Strategy

Minimum:

```ts
trace: 'retain-on-failure'
```

Alternatif:

```ts
trace: 'on-first-retry'
```

sesuai kebutuhan storage/CI.

Trace adalah evidence utama untuk:

- action sequence;
- DOM snapshot;
- network;
- timing;
- screenshot;
- locator failure.

---

# 19. Screenshot dan Video

Baseline:

```ts
screenshot: 'only-on-failure'
video: 'retain-on-failure'
```

Video bukan pengganti trace.

Gunakan video terutama ketika:

- motion;
- dialog;
- race;
- auto-submit;
- popup/new page;

sulit dipahami dari screenshot statis.

---

# 20. Authentication Strategy

HIRU akan memakai Laravel Sanctum cookie-based first-party SPA auth.

Playwright harus mempunyai auth state terpisah:

```text
playwright/.auth/
├─ free.json
├─ lms.json
├─ sensei.json
└─ admin.json
```

Folder ini **harus di-ignore Git** karena storage state dapat berisi session/cookie sensitif.

---

# 21. Auth Setup Projects

Gunakan project dependency untuk auth setup.

Contoh konsep:

```ts
{
  name: 'setup-free',
  testMatch: /free\.setup\.ts/,
},
{
  name: 'free-chromium',
  use: {
    ...devices['Desktop Chrome'],
    storageState: 'playwright/.auth/free.json',
  },
  dependencies: ['setup-free'],
},
```

Untuk suite kecil, setup dapat digabung.

Untuk suite besar dan role berbeda, separation lebih jelas.

---

# 22. Jangan Login via UI di Setiap Test

Login via UI di setiap test:

- lambat;
- memperbesar flakiness;
- membuat failure auth menjatuhkan semua test feature.

Gunakan:

- setup project;
- API login bila contract memungkinkan;
- `storageState`.

Tetap pertahankan test khusus untuk **login UI flow**.

---

# 23. Auth State dan Server-side Mutation

Jika tests mengubah state account secara paralel:

- jangan gunakan satu account bersama;
- gunakan account per worker atau fixture per test.

Contoh konflik:

```text
Test A mengubah membership user
Test B menguji dashboard user yang sama
```

Ini tidak boleh terjadi.

---

# 24. Role Fixtures

Target fixture semantic:

```ts
test('...', async ({
  freePage,
  lmsPage,
  senseiPage,
  adminPage,
}) => {
  // ...
});
```

Tidak wajib expose semua pada satu test.

Fixture harus:

- menyediakan state yang dibutuhkan;
- cleanup;
- tidak menyembunyikan business action penting yang sedang diuji.

---

# 25. Multi-role Browser Context

Beberapa HIRU flow perlu dua role dalam satu test.

Contoh paling penting:

```text
Student membuat invoice
Admin memverifikasi
Student refresh
Membership aktif
```

Gunakan dua `BrowserContext` terisolasi:

```text
studentContext
adminContext
```

Jangan login/logout pada page yang sama untuk flow ini.

---

# 26. Test Data Philosophy

Test data harus:

- deterministic;
- readable;
- minimal;
- unique saat membuat server-side state;
- dapat di-reset;
- tidak memakai production data.

Gunakan ID/code yang mudah ditemukan:

```text
E2E-FREE-001
E2E-LMS-001
E2E-SENSEI-001
E2E-ADMIN-001
E2E-INVOICE-<RUN_ID>
```

---

# 27. Factory Layer

Buat helper/factory untuk precondition.

Contoh:

```ts
const student = await apiFactory.createStudent({
  membership: 'lms',
});

const assessment = await apiFactory.createAssessment({
  type: 'try_out',
  durationMinutes: 30,
});
```

Factory bukan tempat assertion.

---

# 28. Seed vs Factory

## Seed

Cocok untuk:

- program canonical;
- level;
- fixed content;
- membership config;
- static category;
- baseline Admin.

## Factory

Cocok untuk:

- user per test;
- invoice;
- attempt;
- referral usage;
- temporary article;
- temporary class schedule;
- report/community post.

---

# 29. Setup via API

Playwright `APIRequestContext` dapat dipakai untuk:

- membuat precondition;
- login;
- membaca server state;
- cleanup;
- verifikasi post-condition.

Contoh:

```ts
const response = await request.post('/test-support/users', {
  data: {
    membership: 'lms',
  },
});

expect(response.ok()).toBeTruthy();
```

Endpoint test-support hanya boleh ada di environment non-production dan dilindungi secara jelas.

Jika tim tidak membuat test-support endpoint, gunakan factory/seed strategy lain.

---

# 30. API Setup Bukan Shortcut Security

Jangan membuat endpoint seperti:

```text
POST /api/make-me-admin
```

yang dapat hidup di production.

Jika test seeding endpoint digunakan:

- hanya enabled di test/staging yang aman;
- env-gated;
- authenticated/secret-protected sesuai strategy;
- tidak deployed/active pada production.

---

# 31. Cleanup Strategy

Prioritas:

1. ephemeral test database;
2. transaction/reset environment;
3. unique test data + targeted cleanup.

Hindari:

```text
DELETE FROM users
```

sebagai cleanup generik.

Untuk CI isolated DB, reseed penuh dapat diterima jika deterministic dan cepat.

---

# 32. Locator Strategy

Urutan locator:

1. `getByRole`;
2. `getByLabel`;
3. `getByPlaceholder` bila semantik;
4. `getByText` bila user-facing text benar-benar contract;
5. `getByTestId` bila semantic locator tidak stabil/tepat.

Contoh:

```ts
await page.getByRole('button', { name: 'Mulai Placement Test' }).click();
```

Hindari:

```ts
page.locator('.card > div:nth-child(2) button')
```

---

# 33. `data-testid`

Gunakan `data-testid` hanya untuk target yang memang sulit dilokasikan secara semantic.

Baik:

```text
assessment-question-17
invoice-status
journey-progress
```

Jangan menaruh test ID pada setiap `<div>`.

---

# 34. Auto-waiting

Playwright locator/action sudah mempunyai auto-waiting.

Hindari:

```ts
await page.waitForTimeout(2000);
```

Lebih baik:

```ts
await expect(page.getByText('Membership Aktif')).toBeVisible();
```

atau tunggu response/state yang meaningful.

---

# 35. Assertion Philosophy

Assertion harus dekat dengan tujuan user.

Contoh:

```ts
await expect(
  page.getByRole('heading', { name: 'Hasil Placement Test' })
).toBeVisible();

await expect(
  page.getByText('Rekomendasi Program')
).toBeVisible();
```

Jangan assert implementation detail seperti internal class Tailwind kecuali test visual/component memang memerlukannya.

---

# 36. Page Object Model

Gunakan Page Object jika satu area:

- digunakan berkali-kali;
- mempunyai banyak interaction;
- memiliki selector kompleks.

Candidate:

```text
LoginPage
DashboardPage
PlacementPage
AssessmentRunnerPage
InvoicePage
AdminInvoicePage
AdminBlogPage
```

Jangan membuat POM raksasa “HIRUAppPage”.

---

# 37. POM Tidak Menyembunyikan Assertion Utama

Kurang baik:

```ts
await assessment.completeEverythingAndVerifyAll();
```

Lebih baik:

```ts
await assessment.answerQuestion(1, 'A');
await assessment.submit();

await expect(page.getByText('Hasil Try Out')).toBeVisible();
```

Test tetap harus readable sebagai business scenario.

---

# 38. Component Helper vs Page Object

Gunakan component abstraction untuk shared interaction:

```text
SidebarComponent
ModalComponent
PaginationComponent
AssessmentNavigatorComponent
FlashcardComponent
```

Ini cocok untuk UI yang muncul lintas page.

---

# 39. Mock Network Strategy

Mode frontend-first boleh menggunakan:

```ts
await page.route('**/api/**', async route => {
  // deterministic response
});
```

Mock digunakan untuk:

- success;
- 401;
- 403;
- 404;
- 422;
- 429;
- 500;
- slow response;
- empty data.

---

# 40. Jangan Over-Mock

Jika semua integrated E2E tetap memock API:

> suite tidak membuktikan integrasi Next.js ↔ Laravel.

Minimum integrated suite harus benar-benar menyentuh:

- auth;
- API;
- DB;
- entitlement;
- assessment;
- invoice;
- CMS.

---

# 41. HAR Mocking

HAR dapat berguna untuk third-party-like traffic yang stabil.

Tidak disarankan menjadi source utama untuk HIRU internal API karena:

- contract berubah;
- HAR cepat stale;
- behavior dynamic sulit.

Gunakan route fixtures typed lebih jelas untuk internal mock API.

---

# 42. Network Failure Suite

Critical flow harus diuji terhadap failure.

Minimal:

```text
500
422
403
offline
slow response
request aborted
retry
double click
```

Prioritas:

- login;
- registration;
- Placement submit;
- assessment autosave;
- assessment submit;
- invoice;
- Admin verification;
- Blog publish.

---

# 43. Offline Testing

Contoh konsep:

```ts
await context.setOffline(true);
```

Test:

- learner sedang assessment;
- answer belum tersimpan;
- UI menampilkan failed-to-save/retry state;
- reconnect;
- answer tersimpan;
- tidak duplicate.

Exact UX mengikuti desain final.

---

# 44. Public Smoke Suite

Tag:

```text
@smoke @public
```

Minimal:

```text
Landing
→ Program
→ Placement CTA
→ Blog
→ Register
→ Login
```

Assert:

- page load;
- critical heading;
- CTA valid;
- no dead-end;
- no uncaught error.

---

# 45. Landing → Program

Scenario:

```text
GIVEN visitor opens landing
WHEN visitor selects program
THEN program detail opens
AND CTA registration/payment flow is reachable
```

Regression:

- desktop;
- mobile;
- referral query preserved bila memang dibutuhkan.

---

# 46. Registration

Baseline final yang harus diuji:

- account registration;
- email/WhatsApp sesuai field final;
- duplicate handling;
- password minimum sesuai requirement backend;
- referral code bila tersedia;
- validation errors;
- successful continuation.

Jangan bergantung pada exact validation copy jika copy belum final, kecuali source of truth sudah mengunci.

---

# 47. Login UI

Test terpisah dari storageState setup.

Minimal:

```text
valid email login
valid WhatsApp login
invalid credential
empty fields
redirect protected route
logout
```

Jika UI final menggabungkan email/WhatsApp dalam satu field, test sesuai behavior tersebut.

---

# 48. Protected Route

Untuk anonymous:

```text
/dashboard
/admin
/learning/...
/assessment/...
```

harus menghasilkan redirect/denial yang sesuai.

Test jangan hanya memeriksa route berubah; pastikan tidak ada protected data bocor sebelum redirect.

---

# 49. Placement Test — Critical E2E

Baseline:

- 20 soal;
- sekitar 5 menit;
- hasil langsung;
- analisis:
  - Bunpou;
  - Moji Goi;
  - Dokkai;
  - Choukai;
- rekomendasi level;
- rekomendasi program.

Main journey:

```text
Landing
→ Placement info
→ lead data
→ 20 questions
→ submit
→ result
→ recommended program
→ register
→ invoice
→ WhatsApp
```

Tag:

```text
@critical @placement @public
```

---

# 50. Placement Preconditions

Fixture harus mempunyai:

- deterministic 20 questions;
- known answer key;
- predictable scoring mapping;
- known recommendation outcome.

Contoh:

```text
Fixture A → recommendation N5
Fixture B → recommendation N4
```

Tidak perlu menguji semua combinatorial score di E2E.

Score formula detail diuji di backend/unit.

---

# 51. Placement Test Cases

Minimum:

```text
[ ] start successfully
[ ] exactly 20 questions available
[ ] answer all
[ ] navigate questions
[ ] submit
[ ] result categories render
[ ] recommended level renders
[ ] recommended program CTA works
[ ] lead/result persisted in integrated mode
[ ] refresh result does not create duplicate lead/result
[ ] network error on submit
```

---

# 52. Free Membership E2E

Golden flow:

```text
Login
→ Dashboard
→ open free chapter
→ consume content
→ see premium content locked
→ click upgrade CTA
```

Assert:

- Free content active;
- paid content locked;
- deep link paid content denied;
- locked preview tetap informatif;
- upgrade path valid.

---

# 53. Free Deep-link Security Regression

Test UI saja tidak cukup.

Integrated E2E:

```text
Free user
→ manually goto paid content URL
→ server/API denies
→ UI renders locked/forbidden state
```

Lalu direct API:

```text
Free session
→ request paid resource endpoint
→ 403/appropriate denial
```

Jika API mengembalikan full content tetapi UI menyembunyikan, test harus gagal.

---

# 54. LMS Golden Journey

```text
Login
→ Dashboard
→ pilih level
→ Journey
→ Chapter
→ Learning content
→ complete
→ Checkpoint
→ result
→ progress updated
```

Tag:

```text
@critical @lms
```

---

# 55. Level Entitlement

Test minimum:

- purchased/active level accessible;
- another locked level inaccessible;
- direct URL denial;
- expired membership behavior bila scope sudah diimplementasi;
- upgrade behavior.

Jangan menggunakan visual lock saja sebagai assertion final.

---

# 56. Chapter Progress

Test:

```text
open content ≠ automatically completed
complete required activity
progress changes
refresh
progress persists
```

Jika completion rule per content type berbeda, buat test per representative type.

---

# 57. Flashcard E2E

Wajib mempertahankan feel dari HTML reference.

Test:

```text
[ ] front visible
[ ] flip reveals back
[ ] flip back
[ ] next card
[ ] previous card
[ ] keyboard/touch behavior bila supported
[ ] progress/session completion
[ ] long Japanese text
[ ] furigana/ruby does not clip
```

Visual test dapat menangkap:

- perspective;
- front/back state;
- overflow.

---

# 58. Furigana / Japanese Text

Final concept mempunyai dua presentation:

- Jepang Profesional;
- Jepang Pemula.

E2E harus menguji behavior final dari UI Page 08–11.

Jika interaction berupa select + action untuk menampilkan versi pemula di atas teks profesional:

```text
select target text
→ trigger conversion/reveal
→ beginner text appears above
→ original professional text remains
```

Jangan membuat test untuk “3 mode huruf” karena bukan keputusan final.

---

# 59. Audio Learning E2E

Test:

- player visible;
- valid source;
- play/pause;
- loading;
- missing media;
- expired/failure state;
- mobile layout.

Autoplay policy browser dapat berbeda; jangan menganggap autoplay sebagai requirement kecuali desain mengunci.

---

# 60. Reading E2E

Test:

- article/passage visible;
- Japanese text hierarchy;
- question/interaction bila reading berbentuk soal;
- furigana;
- long content;
- mobile;
- completion.

---

# 61. PDF / Module E2E

Module PDF diperlakukan sebagai media/resource tersendiri.

Test:

- CTA membuka/download sesuai UX final;
- authorization;
- file exists;
- type/content-disposition behavior;
- no public leakage untuk private module.

Jangan snapshot isi PDF penuh sebagai browser test jika backend/file-level check sudah memadai.

---

# 62. Latihan Harian

Representative E2E:

```text
start
→ answer
→ submit
→ result/feedback
→ completion state
```

Tidak perlu menguji semua question variation via UI.

---

# 63. Checkpoint Chapter

Test:

- locked sebelum requirement;
- unlock setelah chapter complete;
- start;
- answer;
- submit;
- result;
- progress/journey state update;
- refresh persistence.

---

# 64. Try Out — Critical E2E

Critical suite:

```text
[ ] start attempt
[ ] timer visible
[ ] navigate question
[ ] answer autosaves
[ ] mark state if feature exists
[ ] refresh attempt
[ ] answers persist
[ ] manual submit
[ ] result
[ ] score/history
[ ] review correct/incorrect according to rule
```

---

# 65. Assessment Fixture Contract

Setiap deterministic assessment fixture memiliki:

```ts
{
  id,
  type,
  durationSeconds,
  questionCount,
  questions,
  answerKeyServerSide,
  passingScore,
  expectedScoreForScenario,
}
```

**answerKeyServerSide tidak boleh diserialisasi ke browser sebelum boleh direview.**

Test dapat mengetahui expected answer dari factory/test layer, bukan dari public payload.

---

# 66. Timer E2E

Playwright Clock dapat digunakan untuk time-dependent client behavior.

Scenario utama:

```text
start attempt at T0
expires_at = T0 + duration
advance time
UI countdown changes
advance beyond expiry
auto-submit
result appears once
```

Tetapi integrated test juga harus membuktikan backend expiry.

Client clock manipulation bukan pengganti server authorization terhadap expired attempt.

---

# 67. Timer Refresh

Test:

```text
start 30-minute attempt
advance/use elapsed time
refresh
timer does not reset to 30:00
```

Expected countdown berasal dari authoritative expiry.

---

# 68. Timer Background / Sleep-like Regression

Simulasikan:

- time advance;
- page not interacted;
- return;
- expired state.

Tujuan:

> countdown tidak bergantung jumlah `setInterval` tick yang berhasil berjalan.

---

# 69. Autosave E2E

Scenario:

```text
answer Q1 = A
wait for save acknowledgement
refresh
Q1 still A
```

Lalu:

```text
change Q1 = B
save
refresh
Q1 = B
```

---

# 70. Autosave Race Regression

Buat deterministic delayed network:

```text
request A delayed
request B returns first
request A returns later
```

Expected:

> persisted answer tetap B jika B adalah pilihan terbaru.

Test ini sangat penting setelah backend autosave masuk.

---

# 71. Submit Idempotency E2E

Scenario:

```text
double click Submit
```

Expected:

- one final attempt;
- one score;
- one result;
- no duplicate reward/progress.

Integrated mode dapat memverifikasi API/DB post-condition.

---

# 72. Manual Submit vs Auto-submit Race

Scenario:

```text
timer nearly expires
user presses Submit
expiry triggers simultaneously
```

Expected:

- one final state;
- one score;
- one side effect.

Tag:

```text
@critical @assessment @regression
```

---

# 73. Result / History / Review

Test:

- score;
- pass/fail;
- history row;
- detail;
- review;
- answer visibility timing;
- refresh;
- ownership.

User B tidak boleh membuka result user A via ID manipulation.

---

# 74. LMS + Sensei Golden Journey

```text
Login
→ Dashboard
→ Jadwal
→ Detail kelas
→ Zoom reference
→ Replay
→ Tanya Sensei
```

Mini Checkpoint punya flow terpisah.

---

# 75. Sensei Feature Entitlement

Baseline:

| Feature | Free | LMS | LMS + Sensei |
|---|---|---|---|
| Jadwal | locked | locked | active |
| Replay | locked | locked | active |
| Tanya Sensei | locked/limited sesuai final | locked/limited sesuai final | active |
| Mini Checkpoint | locked | locked | active |

Gunakan source of truth final bila detail preview/limited berubah.

---

# 76. Schedule E2E

Test:

- upcoming class visible;
- date/time format;
- detail;
- empty state;
- timezone;
- deep-link ownership/entitlement.

---

# 77. Zoom Handoff

Zoom boleh berada di luar LMS.

Test hanya:

- link/reference tersedia pada user eligible;
- URL valid format;
- non-Sensei tidak mendapat link;
- expired/old class behavior sesuai final rule.

Jangan mencoba mengotomasi Zoom meeting sebagai bagian dari core HIRU E2E.

---

# 78. Replay E2E

Test:

- eligible user;
- list;
- detail/player/reference;
- private media authorization;
- locked user;
- missing replay;
- mobile.

---

# 79. Tanya Sensei E2E

Jika implementasi final berupa question submission:

```text
open form
→ submit question
→ success state
→ question appears in expected history/list
```

Test authorization dan ownership.

Exact workflow mengikuti screen final Page 08–11.

---

# 80. Mini Checkpoint E2E

Baseline active untuk LMS + Sensei.

Test:

```text
N5 representative
N4/N3/N2 route/list smoke
start
timer
answer
submit
score
Lulus/Tidak Lulus
history/recap
```

Tidak perlu full E2E semua soal pada seluruh level.

---

# 81. Community E2E

Role matrix:

- Free: read-only/limited sesuai final;
- LMS: active;
- LMS + Sensei: active.

Representative tests:

```text
read post
create post
comment
report
edit own
cannot edit other user
delete/moderation behavior
attachment
```

---

# 82. Community Security Regression

Integrated:

```text
User A creates post
User B tries edit/delete via UI → denied
User B direct API request → denied
```

Jangan hanya mengandalkan button hidden.

---

# 83. Certificate E2E

Test:

```text
eligible user → certificate available
non-eligible → unavailable
download/view
refresh
ownership
```

Direct ID manipulation harus denied.

---

# 84. Referral & Diskon

Scope final menggunakan Referral & Diskon.

E2E:

```text
referral code enters registration
→ attribution preserved
→ eligible discount appears
→ invoice total reflects correct discount
→ admin verification
→ reward/referral state updated sesuai final rule
```

**Jangan menghidupkan kembali cash affiliate commission dari dokumen lama tanpa revisi client baru.**

---

# 85. Invoice — Critical E2E

Flow:

```text
program selected
→ account
→ invoice created
→ status awaiting payment
→ WhatsApp CTA
```

Assert:

- invoice code;
- program;
- total;
- discount;
- status;
- user ownership.

---

# 86. WhatsApp Handoff

Test:

- CTA visible;
- target URL scheme valid;
- message encoded;
- invoice identifier included;
- program info included bila final;
- mobile/browser behavior.

Jangan assert opening native WhatsApp application di CI.

Assert URL/handoff target yang benar.

---

# 87. Admin Verify Payment — Cross-role Critical

Main scenario:

```text
Student:
create invoice

Admin:
open invoice
verify payment

Student:
refresh / reopen dashboard

Expected:
membership active
entitlement open
invoice status updated
```

Gunakan multi-context.

Tag:

```text
@critical @payment @admin @cross-role @integrated
```

---

# 88. Double Verification Regression

Scenario:

```text
Admin verify invoice
Admin action retried / clicked twice
```

Expected:

- membership not duplicated;
- entitlement not duplicated;
- reward/discount/referral side effect not duplicated.

---

# 89. Wrong-user Invoice Security

Test:

```text
User A invoice exists
User B changes URL/id
```

Expected:

- denied;
- no invoice detail leak;
- no WhatsApp/payment metadata leak.

---

# 90. Admin User Management

Representative E2E:

```text
search user
open detail
view membership
change allowed field/status
save
student side reflects change
```

High-impact mutation harus menggunakan fixture account.

Jangan melakukan E2E write menggunakan real production user.

---

# 91. Admin Learning Content

Test:

```text
create/edit content
assign program/level/chapter
publish/activate
student sees it
```

Jika content status draft/published ada, test visibility boundary.

---

# 92. Admin Assessment

Representative:

```text
create/edit assessment config
add question
set answer server-side
set passing score
publish
student sees allowed runner
```

Critical security assertion:

> correct answer tidak muncul dalam pre-submit API/browser payload.

---

# 93. Admin Placement Leads

Test:

- result/lead visible;
- search/filter;
- open detail;
- referral/source preserved;
- no duplicate from result refresh.

Export jika masuk scope final dapat diuji terpisah.

---

# 94. Blog Public E2E

Golden:

```text
Blog list
→ search/filter category
→ article detail
→ related article
→ CTA Placement/Program
```

Test:

- heading;
- slug;
- featured image;
- metadata smoke;
- draft inaccessible.

---

# 95. Admin Blog Publish — Cross-role

```text
Admin creates article
→ preview
→ publish

Visitor:
opens slug
→ article visible
```

Lalu:

```text
Admin unpublishes/drafts
Visitor:
article no longer public
```

---

# 96. Blog SEO Assertions

E2E smoke:

```ts
await expect(page).toHaveTitle(/.../);

const description = page.locator('meta[name="description"]');
await expect(description).toHaveAttribute('content', /.+/);
```

Juga periksa sesuai strategy final:

- canonical;
- Open Graph;
- robots;
- structured data bila ada;
- slug.

Detailed SEO logic dapat memiliki integration/unit test terpisah.

---

# 97. Draft Leakage Regression

Integrated test:

```text
Admin creates DRAFT
Anonymous:
GET public slug
→ not public
```

API/public data source juga tidak boleh mengembalikan body draft.

---

# 98. Visual Regression Strategy

Gunakan `toHaveScreenshot()` untuk component/screen yang stabil.

Candidate:

- landing hero;
- dashboard;
- membership locked state;
- journey;
- flashcard front/back;
- assessment runner;
- result;
- invoice;
- Admin table;
- blog article;
- mobile sidebar/navigation.

---

# 99. Visual Snapshot Environment

Screenshot rendering dapat berbeda antar:

- OS;
- browser version;
- font;
- GPU;
- headless mode.

Baseline snapshot harus dibuat dan dijalankan pada environment konsisten.

Disarankan:

- Linux CI/container sebagai source visual baseline;
- browser version dikunci melalui dependency/image strategy.

Jangan regenerate snapshot massal tanpa review.

---

# 100. Visual Approval Rule

Jika snapshot berubah:

1. lihat diff;
2. bandingkan Figma Page 08–11;
3. bandingkan HTML reference untuk interaction feel;
4. tentukan intentional vs regression;
5. baru update baseline.

`--update-snapshots` bukan solusi otomatis.

---

# 101. Masking Dynamic Content

Untuk visual screenshot, mask/normalize:

- timestamp;
- randomized avatar;
- dynamic invoice ID;
- animation cursor;
- rotating content.

Jangan mask area yang justru sedang diuji.

---

# 102. Animation Stabilization

Visual test dapat:

- disable animation untuk static screenshot;
- mengambil screenshot pada deterministic state.

Tetapi functional/motion regression untuk:

- Flashcard flip;
- tactile feedback;
- modal transition;

tetap harus diuji secara terpisah.

---

# 103. Responsive E2E

Critical mobile flows:

```text
Landing
Placement
Register/Login
Dashboard
Journey
Assessment
Invoice
Blog article
```

LMS content khusus Japanese text harus smoke pada 360 px.

---

# 104. Mobile Assessment

Regression wajib:

- timer tidak overlap;
- navigator dapat dipakai;
- answer option tidak terpotong;
- submit CTA accessible;
- modal submit muat viewport;
- long Japanese text wrap;
- image/audio responsive.

---

# 105. Accessibility Automation

Playwright dapat diintegrasikan dengan `@axe-core/playwright`.

Target awal:

- public landing;
- register;
- login;
- dashboard;
- assessment;
- invoice;
- blog article;
- Admin form.

Automated scan hanya menangkap sebagian masalah aksesibilitas.

Tetap lakukan manual test:

- keyboard;
- focus;
- screen reader semantics;
- reduced motion;
- modal;
- flashcard;
- Japanese/furigana.

---

# 106. Keyboard Critical Flow

Minimum manual/E2E representative:

```text
Tab navigation
Enter/Space activation
modal focus
Escape close
assessment options
flashcard reveal
form submit
```

Jika custom interaction tidak keyboard-accessible, itu regression.

---

# 107. Reduced Motion

Project:

```ts
use: {
  reducedMotion: 'reduce',
}
```

atau per test.

Assert:

- state tetap understandable;
- Flashcard tetap dapat reveal;
- content tidak hilang;
- no motion-dependent-only meaning.

---

# 108. Console Error Guard

Pertimbangkan automatic fixture:

```text
collect pageerror
collect unexpected console.error
fail test on unexpected critical browser error
```

Allowlist harus sangat kecil dan terdokumentasi.

Jangan allowlist warning hanya karena “sudah lama ada”.

---

# 109. Failed Request Guard

Untuk critical suite, rekam:

```text
requestfailed
unexpected 5xx
unexpected 4xx
```

Tidak semua 404 adalah bug, misalnya intentional test.

Guard harus context-aware.

---

# 110. Request Correlation

Jika Batch 4 correlation ID sudah diimplementasi:

- capture response request ID;
- attach ke test output;
- gunakan saat integrated failure.

Ini mempermudah:

```text
Playwright failure
→ Laravel log
→ DB action
```

---

# 111. Test Attachments

Pada failure, attach bila relevan:

- screenshot;
- trace;
- video;
- console logs;
- network summary;
- correlation ID;
- API response body yang sudah disanitasi.

Jangan attach secrets/PII berlebihan.

---

# 112. PII Safety

Test account memakai fake data.

Contoh:

```text
Nama: E2E LMS User
Email: e2e+lms-<run>@example.test
WhatsApp: reserved/fake test number
```

Jangan memakai nomor WhatsApp client/user nyata untuk CI.

---

# 113. Secrets

CI secrets:

- test credentials;
- API test token;
- storage test secret;

harus berasal dari secret manager/CI secret.

Tidak boleh di:

- `.spec.ts`;
- fixture JSON committed;
- screenshot;
- trace;
- console.

---

# 114. Third-party Boundaries

HIRU saat ini memiliki handoff seperti WhatsApp/Zoom.

Core E2E berhenti pada boundary:

```text
HIRU generates correct outbound URL/reference
```

Jangan mencoba mengendalikan third-party account/session sebagai bagian suite utama.

---

# 115. Email/Notification

Jika di masa depan ada email/notification provider:

- gunakan test inbox/provider sandbox;
- jangan kirim ke user nyata;
- assert event/message side effect secara deterministic.

Tidak termasuk baseline wajib sekarang kecuali implementasi final membutuhkannya.

---

# 116. File Upload E2E

Untuk Admin/community media:

Test:

- valid file;
- invalid type;
- size limit;
- upload success;
- preview;
- persistence;
- authorization.

Gunakan fixture file kecil yang committed dan aman.

---

# 117. Download E2E

Untuk module/certificate:

```ts
const downloadPromise = page.waitForEvent('download');
await page.getByRole('link', { name: /download/i }).click();
const download = await downloadPromise;
```

Assert:

- suggested filename;
- event terjadi;
- access allowed.

Tidak perlu membandingkan seluruh binary kecuali kebutuhan khusus.

---

# 118. New Tab / Popup

Jika Zoom/WhatsApp membuka target baru:

```text
capture popup/new page
assert URL
```

Jangan bergantung pada browser OS integration.

---

# 119. Error State Suite

Representative mocked/integrated error tests:

```text
Dashboard API 500
No replay
Invoice not found
Assessment expired
Article draft/404
Unauthorized content
Validation 422
Rate limit 429
```

UI harus membedakan:

- empty;
- error;
- forbidden;
- not found.

---

# 120. 401 vs 403

Test UI behavior:

## 401

- session invalid/anonymous;
- login redirect/action.

## 403

- authenticated tetapi tidak berhak;
- upgrade/forbidden/locked UI sesuai context.

Jangan menampilkan login untuk setiap 403 bila user memang sudah login.

---

# 121. 422 Validation

Registration/Admin form:

- field error muncul dekat field;
- value user yang valid tidak hilang tanpa alasan;
- submit dapat dicoba lagi;
- raw backend exception tidak tampil.

---

# 122. 429 Rate Limit

Untuk endpoint sensitif yang memakai rate limit:

Test integrated secara targeted bila feasible.

Expected:

- status recognized;
- UI memberi pesan/retry expectation;
- tidak crash.

Jangan mempercepat test dengan menurunkan production security config secara permanent.

---

# 123. Flakiness Definition

Test dianggap flaky jika:

- hasil berubah tanpa perubahan product/data;
- hanya pass karena retry;
- bergantung timing arbitrary;
- bergantung urutan;
- bergantung worker count;
- bergantung network external yang tidak perlu.

Flaky test adalah bug test/infrastructure sampai terbukti sebaliknya.

---

# 124. Flakiness Triage

Urutan:

1. trace;
2. locator;
3. auto-wait;
4. stale fixture;
5. server readiness;
6. shared state;
7. parallel race;
8. random data;
9. time;
10. actual app race.

Jangan tambah `waitForTimeout`.

---

# 125. Test Isolation Rule

Setiap test harus dapat dijalankan sendiri:

```bash
npx playwright test path/to/test.spec.ts
```

Jika hanya pass setelah test lain, suite salah.

---

# 126. Serial Tests

Gunakan serial hanya jika secara bisnis scenario memang berurutan dalam satu group yang tidak layak dipisah.

Default:

> tests independen.

Jangan memakai serial untuk menyembunyikan shared data problem.

---

# 127. Parallel Tests

Setelah data isolation benar:

- file dapat parallel;
- worker dapat parallel;
- shard dapat parallel.

Assessment/payment tests dengan shared fixture harus menggunakan unique data.

---

# 128. Sharding

Ketika suite besar:

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

Gunakan setelah:

- test independent;
- report merge strategy tersedia;
- setup data aman.

---

# 129. Smoke vs Full Regression

## Smoke

Tujuan: cepat mengetahui deployment fundamentally usable.

Target durasi dijaga pendek.

## Full regression

Mencakup:

- role;
- assessment;
- errors;
- visual;
- cross-browser;
- responsive;
- Admin;
- CMS.

Jangan menjalankan seluruh full regression setiap perubahan kecil jika CI menjadi tidak praktis.

---

# 130. PR Pipeline

Recommended:

```text
lint
typecheck
unit
Laravel feature
Next production build
Playwright Chromium smoke
Playwright affected critical suite
```

Visual diff dapat masuk PR bila stable.

---

# 131. Main Branch Pipeline

```text
all PR checks
+
Chromium full E2E
+
integrated critical flows
+
artifact upload
```

---

# 132. Nightly / Scheduled

Candidate:

```text
Chromium
Firefox
WebKit
mobile
visual
a11y
slow/race tests
```

---

# 133. Release Candidate Gate

Sebelum release:

```text
[ ] public smoke
[ ] auth
[ ] Free
[ ] LMS
[ ] LMS + Sensei
[ ] Admin
[ ] Placement
[ ] invoice activation
[ ] Try Out
[ ] Mini Checkpoint
[ ] CMS publish
[ ] cross-browser critical
[ ] mobile critical
[ ] visual reviewed
[ ] no unresolved P0/P1
```

---

# 134. Production Smoke

Production smoke harus read-safe sejauh mungkin.

Test:

- public pages;
- login test account bila tersedia;
- dashboard;
- one non-destructive content;
- admin read-only sanity bila dedicated account.

Jangan:

- create fake paid invoice pada production;
- verify fake payment;
- edit real user;
- publish fake article;
- reset data.

---

# 135. Test Account Production

Jika production smoke authenticated dibutuhkan:

- dedicated account;
- clearly labeled;
- minimal privilege;
- no personal data;
- no real payment;
- known entitlement;
- monitored.

Admin production smoke account harus sangat dibatasi jika memungkinkan.

---

# 136. Golden E2E Set — Public

```text
PUB-001 Landing loads critical CTA
PUB-002 Program detail reachable
PUB-003 Placement entry reachable
PUB-004 Blog list/article public
AUTH-001 Register
AUTH-002 Login with email
AUTH-003 Login with WhatsApp
AUTH-004 Invalid login handled
```

---

# 137. Golden E2E Set — Placement

```text
PLC-001 Complete 20-question Placement
PLC-002 Result category analysis
PLC-003 Recommended level
PLC-004 Recommended program
PLC-005 Placement → Registration
PLC-006 Submission failure
PLC-007 Refresh does not duplicate lead/result
```

---

# 138. Golden E2E Set — Free

```text
FREE-001 Dashboard
FREE-002 Free chapter
FREE-003 Paid card locked
FREE-004 Paid deep link denied
FREE-005 Upgrade CTA
```

---

# 139. Golden E2E Set — LMS

```text
LMS-001 Dashboard
LMS-002 Purchased level
LMS-003 Journey
LMS-004 Chapter content
LMS-005 Flashcard
LMS-006 Audio/reading
LMS-007 Checkpoint unlock
LMS-008 Try Out complete
LMS-009 Try Out refresh persistence
LMS-010 History/review
```

---

# 140. Golden E2E Set — LMS + Sensei

```text
SNS-001 Dashboard
SNS-002 Jadwal
SNS-003 Class detail
SNS-004 Replay
SNS-005 Tanya Sensei
SNS-006 Mini Checkpoint
SNS-007 Non-Sensei deep-link denial
```

---

# 141. Golden E2E Set — Admin

```text
ADM-001 Login
ADM-002 User lookup
ADM-003 Invoice verification
ADM-004 Learning content publish
ADM-005 Assessment edit/publish
ADM-006 Placement lead
ADM-007 Blog create/publish
ADM-008 Access change
```

---

# 142. Golden Cross-role Set

```text
XRL-001 Invoice verify → student membership active
XRL-002 Admin publishes content → student sees content
XRL-003 Admin publishes blog → visitor sees article
XRL-004 Admin changes access → student entitlement updates
XRL-005 User post → Admin moderation → user sees result
```

---

# 143. Golden Assessment Race Set

```text
RACE-001 autosave out-of-order
RACE-002 double submit
RACE-003 manual submit vs auto-submit
RACE-004 refresh during attempt
RACE-005 offline → reconnect
RACE-006 expiry with client clock change
```

---

# 144. Role Regression Matrix

Setiap shared entitlement change minimal menguji:

| Scenario | Visitor | Free | LMS | LMS + Sensei | Admin |
|---|---:|---:|---:|---:|---:|
| Public page | ✓ | ✓ | ✓ | ✓ | ✓ |
| Private dashboard | ✗ | ✓ | ✓ | ✓ | Admin area |
| Paid LMS content | ✗ | ✗ | ✓* | ✓* | manage |
| Sensei features | ✗ | ✗ | ✗ | ✓ | manage |
| Admin Console | ✗ | ✗ | ✗ | ✗ | ✓ |

`✓*` tetap bergantung entitlement level/program aktif.

---

# 145. Test Coverage Bukan Persentase Saja

Jangan mengejar “100% E2E”.

Lebih penting:

- semua revenue/activation path;
- semua membership boundary;
- semua destructive Admin action;
- assessment integrity;
- acquisition;
- content publication;
- critical mobile;
- high-risk race.

---

# 146. Traceability ke Requirement

Test critical sebaiknya mencantumkan requirement/domain ID bila PRD memiliki ID final.

Contoh:

```ts
test('PAY-VERIFY-001 admin verification activates membership', ...)
```

Jika PRD belum memakai ID formal, jangan mengarang mapping palsu; dapat ditambahkan saat repository/docs final distandardisasi.

---

# 147. Test Review Checklist

Sebelum merge test:

```text
[ ] business scenario jelas
[ ] source of truth benar
[ ] selector semantic
[ ] no arbitrary timeout
[ ] isolated
[ ] deterministic data
[ ] cleanup
[ ] no secret
[ ] no production dependency
[ ] useful assertions
[ ] trace readable
[ ] correct tags
```

---

# 148. Application Review Checklist

Saat E2E gagal:

```text
[ ] reproduce locally
[ ] trace
[ ] console
[ ] request/response
[ ] server log
[ ] role
[ ] entitlement
[ ] DB state
[ ] compare source of truth
[ ] determine product bug vs test bug
```

Ikuti `04-DEBUG-PLAYBOOK.md`.

---

# 149. Test Bug vs Product Bug

## Test bug

Contoh:

- selector berdasarkan class berubah padahal behavior benar;
- fixture stale;
- wrong expected copy;
- race dibuat oleh shared account;
- snapshot generated pada environment beda.

## Product bug

Contoh:

- button tidak navigasi;
- answer hilang;
- Free mendapat paid API data;
- invoice verify tidak mengaktifkan entitlement;
- article draft public.

Jangan “memperbaiki” product untuk membuat bad test pass.

---

# 150. Snapshot Bug vs Intentional Redesign

Jika Figma final berubah:

1. update implementation;
2. review visually;
3. update snapshot dengan sengaja;
4. commit snapshot bersama change.

Jangan update snapshot tanpa melihat diff.

---

# 151. E2E Contract untuk Refactor

Refactor dianggap aman jika golden suite tetap pass.

Area yang wajib dilindungi:

- routing;
- shared dashboard cards;
- sidebar;
- membership guard;
- assessment runner;
- modal;
- Japanese text/ruby;
- form;
- API client.

---

# 152. HTML → React Migration Guard

Karena HIRU memakai HTML reference sebagai experience reference, E2E harus mencegah hilangnya:

- Flashcard 3D flip;
- hover elevation;
- press/tactile feedback;
- selected state;
- active nav;
- progress clarity;
- animation yang meaningful;
- responsive composition.

Tetap tunduk pada Page 08–11 untuk fungsi/copy final.

---

# 153. Mock Contract Validation

Mode mock harus menjaga response shape mendekati planned API.

Saat Laravel integrated tersedia:

1. capture actual contract;
2. bandingkan mock;
3. ubah fixture;
4. jalankan full frontend E2E;
5. jalankan integrated E2E.

Hindari dua dunia schema berbeda.

---

# 154. Frontend Mock Example

```ts
test('Free user sees locked premium chapter', async ({ page }) => {
  await page.route('**/api/me', route =>
    route.fulfill({
      json: {
        id: 'user-free-1',
        membership: 'free',
      },
    }),
  );

  await page.route('**/api/journey**', route =>
    route.fulfill({
      json: {
        chapters: [
          { id: 'c1', access: 'active' },
          { id: 'c2', access: 'locked' },
        ],
      },
    }),
  );

  await page.goto('/dashboard');

  await expect(
    page.getByTestId('chapter-c1'),
  ).toBeVisible();

  await expect(
    page.getByTestId('chapter-c2'),
  ).toContainText(/terkunci/i);
});
```

Exact API path/schema mengikuti implementation final.

---

# 155. Integrated Example — Cross-role

Blueprint:

```ts
test('admin verification activates student membership', async ({ browser }) => {
  const studentContext = await browser.newContext({
    storageState: 'playwright/.auth/student-awaiting-payment.json',
  });

  const adminContext = await browser.newContext({
    storageState: 'playwright/.auth/admin.json',
  });

  const studentPage = await studentContext.newPage();
  const adminPage = await adminContext.newPage();

  await studentPage.goto('/invoice/test-invoice');
  await expect(
    studentPage.getByText(/menunggu pembayaran/i),
  ).toBeVisible();

  await adminPage.goto('/admin/invoices/test-invoice');
  await adminPage
    .getByRole('button', { name: /verifikasi pembayaran/i })
    .click();

  await expect(
    adminPage.getByText(/diverifikasi|aktif/i),
  ).toBeVisible();

  await studentPage.reload();

  await expect(
    studentPage.getByText(/membership aktif/i),
  ).toBeVisible();

  await studentContext.close();
  await adminContext.close();
});
```

Exact route/copy menyesuaikan final UI.

---

# 156. Clock Example — Timer

Blueprint:

```ts
test('assessment auto-submits after expiry', async ({ page }) => {
  await page.clock.install({
    time: new Date('2026-08-12T10:00:00+07:00'),
  });

  await page.goto('/assessment/attempt/test-attempt');

  await expect(page.getByTestId('assessment-timer'))
    .toContainText('05:00');

  await page.clock.fastForward('05:01');

  await expect(
    page.getByRole('heading', { name: /hasil/i }),
  ).toBeVisible();
});
```

Gunakan API Clock sesuai version Playwright yang benar-benar terpasang.

---

# 157. Visual Example

```ts
test('dashboard visual baseline', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page).toHaveScreenshot('dashboard-lms.png', {
    fullPage: true,
  });
});
```

Pastikan data, font, viewport, dan animation deterministic.

---

# 158. Accessibility Example

Blueprint:

```ts
import AxeBuilder from '@axe-core/playwright';

test('login has no automated critical accessibility violations', async ({ page }) => {
  await page.goto('/login');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```

Tim dapat menetapkan severity threshold/known issue policy ketika suite mulai berjalan.

---

# 159. Test Failure Artifact Retention

CI artifact minimum:

```text
playwright-report/
test-results/
traces/
screenshots/
failure videos
```

Retention mengikuti kapasitas CI.

P0/P1 incident evidence sebaiknya dipertahankan lebih lama daripada routine successful build artifacts.

---

# 160. Reporter Strategy

Baseline:

- list/line reporter untuk terminal;
- HTML reporter sebagai artifact.

Jika CI provider mendukung:

- JUnit;
- GitHub reporter;
- custom integration;

dapat ditambahkan.

Jangan memilih reporter yang membuat output terlalu bising sehingga failure penting tenggelam.

---

# 161. Codegen

`playwright codegen` boleh digunakan untuk eksplorasi locator dan draft.

Tetapi generated code harus dirapikan:

- semantic locator;
- helper;
- assertions;
- deterministic state;
- no hardcoded random wait.

Codegen bukan final test architecture.

---

# 162. Debugging Commands

```bash
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright test path/to/spec.ts
npx playwright test --grep "@critical"
npx playwright test --project=chromium
npx playwright show-report
npx playwright show-trace path/to/trace.zip
```

Exact project names menyesuaikan config.

---

# 163. Update Snapshot

Gunakan hanya setelah intentional visual change:

```bash
npx playwright test --update-snapshots
```

Review diff sebelum commit.

Jangan gunakan sebagai “fix failing CI”.

---

# 164. Install Browsers CI

Baseline:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Jika PR hanya Chromium:

```bash
npx playwright install chromium --with-deps
```

Sesuaikan dengan browser project CI.

---

# 165. E2E Environment Variables

Candidate:

```text
E2E_BASE_URL
E2E_API_URL
E2E_FREE_EMAIL
E2E_FREE_PASSWORD
E2E_LMS_EMAIL
E2E_LMS_PASSWORD
E2E_SENSEI_EMAIL
E2E_SENSEI_PASSWORD
E2E_ADMIN_EMAIL
E2E_ADMIN_PASSWORD
E2E_RUN_ID
```

Lebih baik account dapat dibuat via factory sehingga credential statis diminimalkan.

---

# 166. Environment Guard

Sebelum test mutating:

```text
if target is production → refuse destructive setup
```

Buat explicit helper:

```ts
assertSafeE2EEnvironment();
```

yang memeriksa base URL/environment.

Tujuan:

> mencegah suite cleanup/setup salah mengarah ke production.

---

# 167. Database Safety

Integrated E2E menggunakan database khusus.

Contoh naming:

```text
hiru_e2e
hiru_test
```

Bukan production database.

Reset command harus mengecek database name/environment sebelum berjalan.

---

# 168. Storage Safety

Storage E2E:

- bucket/prefix khusus;
- cleanup prefix by run ID;
- tidak menghapus arbitrary key;
- tidak menggunakan production private media.

Contoh:

```text
e2e/<run-id>/...
```

---

# 169. Build Verification

Next.js official guidance menyarankan E2E dijalankan terhadap production code untuk perilaku lebih production-like.

Release E2E:

```text
npm run build
npm run start
Playwright
```

Dev mode tetap berguna saat iterasi lokal.

---

# 170. Laravel Preflight

Integrated E2E setup:

```bash
php artisan about
php artisan migrate:status
php artisan test
```

Jika memakai isolated E2E DB:

```text
migrate
seed deterministic baseline
start API
run Playwright
```

Exact command repository menjadi authority.

---

# 171. Health Check Gate

Sebelum browser suite integrated:

```text
frontend health
backend health
database reachable
storage test reachable bila diperlukan
```

Jika environment belum ready, fail dengan jelas.

Jangan menghasilkan ratusan UI failures karena API sebenarnya tidak start.

---

# 172. Test Runtime Budget

Kategori:

```text
smoke      → sangat cepat
critical   → cepat-menengah
full       → menengah
visual     → terpisah
race/slow  → scheduled/full
```

Exact target menit ditetapkan setelah repository berjalan.

Jangan mengunci angka sebelum baseline runtime nyata tersedia.

---

# 173. Quarantine Policy

Quarantine hanya boleh sementara.

Setiap quarantined test harus mempunyai:

```text
owner
reason
issue
date
exit condition
```

Jangan membuat folder “flaky ignored forever”.

Critical payment/auth/security test tidak boleh diam-diam di-skip.

---

# 174. `test.skip` Policy

Allowed:

- feature belum implemented dan jelas ditandai;
- browser limitation documented;
- temporary issue dengan tracking.

Not allowed:

- CI merah;
- flaky;
- data sulit disiapkan;
- test sering gagal.

---

# 175. `test.only` Guard

CI:

```ts
forbidOnly: !!process.env.CI
```

Agar accidental `test.only` tidak melewatkan suite.

---

# 176. Failed-test Stop Strategy

Untuk development:

```bash
npx playwright test --max-failures=1
```

berguna saat suite besar rusak fundamental.

CI penuh dapat memakai max failure sesuai kapasitas.

---

# 177. Browser Matrix Expansion

Tambah browser/device berdasarkan:

- real user analytics;
- bug history;
- client requirement.

Jangan menambah matrix hanya untuk angka coverage.

---

# 178. Security E2E Boundary

Playwright harus meng-cover representative:

- anonymous protected route;
- Free paid deep link;
- LMS Sensei deep link;
- user ownership;
- Admin route;
- draft leakage;
- invoice ownership;
- answer-key leakage.

Detailed authorization matrix tetap diuji kuat di Laravel feature tests.

---

# 179. No Secret in Browser Payload

Representative check:

- session/token tidak tampil di HTML;
- server secrets tidak ada bundle;
- assessment correct answers tidak ada pre-submit payload;
- private S3 credential tidak ada;
- Admin-only fields tidak dikirim ke student.

E2E dapat inspect network/DOM.

---

# 180. XSS Representative Regression

Untuk user-generated/admin rich content:

- seed payload test aman;
- render;
- pastikan script tidak dieksekusi.

Detailed sanitizer coverage di unit/feature test.

---

# 181. Open E2E Decisions

Belum boleh di-hardcode sebelum repository tersedia.

## OPEN-E2E-01 — Exact Playwright version

Ikuti package lock repository.

## OPEN-E2E-02 — CI provider

Belum dikunci.

## OPEN-E2E-03 — Visual baseline environment

Docker/Linux version final belum dikunci.

## OPEN-E2E-04 — Test DB reset strategy

Pilihan final bergantung arsitektur CI/backend.

## OPEN-E2E-05 — Auth setup method

UI vs API login setup ditentukan setelah Sanctum endpoint final.

## OPEN-E2E-06 — Test-support endpoint

Belum diputuskan apakah backend menyediakan test-only factory API.

## OPEN-E2E-07 — Unit test framework frontend

Tidak mempengaruhi Playwright contract langsung.

## OPEN-E2E-08 — Error monitoring integration

Jika Sentry/provider dipilih, E2E dapat menambahkan test error-boundary/reporting.

## OPEN-E2E-09 — Exact route naming

Tunggu repository implementation.

## OPEN-E2E-10 — Exact assessment persistence semantics

State machine sudah dikunci secara konsep, schema final backend belum tersedia.

---

# 182. Definition of E2E-Ready Feature

Feature dianggap E2E-ready jika:

```text
[ ] route nyata
[ ] stable accessible locator
[ ] deterministic test data
[ ] explicit loading state
[ ] explicit empty state
[ ] explicit error state
[ ] success state
[ ] entitlement behavior
[ ] API/mock contract known
[ ] cleanup strategy
[ ] no production dependency
```

---

# 183. Definition of E2E-Done Feature

```text
[ ] happy path
[ ] one relevant failure path
[ ] authorization/entitlement path
[ ] mobile smoke if user-facing critical
[ ] integrated test if persistence/business critical
[ ] trace readable
[ ] no arbitrary wait
[ ] no flaky retry dependency
[ ] added to correct regression suite
```

---

# 184. Definition of Release-safe Critical Flow

Critical flow release-safe jika:

```text
[ ] passes Chromium integrated
[ ] passes relevant backend tests
[ ] role boundary verified
[ ] persistence verified
[ ] retry/idempotency verified if write flow
[ ] responsive smoke
[ ] no uncaught console/server error
[ ] artifacts clean
[ ] no P0/P1 known regression
```

---

# 185. Final Test Execution Matrix

| Suite | Mock | Integrated | Chromium | Firefox/WebKit | Mobile |
|---|---:|---:|---:|---:|---:|
| Public smoke | ✓ | ✓ | ✓ | release | ✓ |
| Placement | ✓ | ✓ | ✓ | release | ✓ |
| Free | ✓ | ✓ | ✓ | release | smoke |
| LMS | ✓ | ✓ | ✓ | release | critical |
| Sensei | ✓ | ✓ | ✓ | release | critical |
| Admin | ✓ | ✓ | ✓ | optional/release | desktop |
| Assessment race | partial | ✓ | ✓ | selective | selective |
| Visual | ✓ | after integration | ✓ | selective | ✓ |
| A11y | ✓ | ✓ | ✓ | selective | selective |

---

# 186. Recommended Implementation Order

## E2E Batch A — Foundation

- Playwright install;
- config;
- baseURL;
- reporters;
- trace;
- smoke page;
- CI skeleton.

## E2E Batch B — Public + Auth

- Landing;
- Program;
- Register;
- Login;
- Placement skeleton.

## E2E Batch C — Role Fixtures

- Free;
- LMS;
- LMS + Sensei;
- Admin.

## E2E Batch D — LMS Golden Flow

- dashboard;
- journey;
- chapter;
- content;
- progress.

## E2E Batch E — Assessment

- runner;
- timer;
- autosave;
- submit;
- history;
- race.

## E2E Batch F — Sensei

- jadwal;
- replay;
- question;
- Mini Checkpoint.

## E2E Batch G — Admin + Cross-role

- invoice;
- content;
- assessment;
- Blog;
- access.

## E2E Batch H — Quality

- visual;
- mobile;
- accessibility;
- cross-browser;
- slow/error.

---

# 187. Minimal First Suite

Saat frontend pertama mulai coding, jangan menunggu semua screen selesai.

Mulai:

```text
1. Landing loads
2. Landing CTA navigates
3. Login screen
4. Free dashboard mock
5. LMS dashboard mock
6. Sensei dashboard mock
7. Admin screen mock
8. one locked entitlement
9. one Placement flow
10. one visual screenshot
```

Suite berkembang bersama feature.

---

# 188. Anti-pattern — Screenshot-only E2E

Screenshot pass tidak berarti:

- button bekerja;
- API benar;
- entitlement benar;
- data tersimpan.

Visual test harus melengkapi functional assertions.

---

# 189. Anti-pattern — One Giant Test

Jangan:

```text
Landing → register → invoice → admin → LMS → all content → tryout → blog
```

dalam satu test raksasa.

Pisahkan berdasarkan business boundary.

Pertahankan beberapa cross-role scenario khusus yang memang penting.

---

# 190. Anti-pattern — UI Setup untuk Semua

Jangan membuat setiap test:

```text
register → pay → admin verify → login
```

hanya untuk mencapai dashboard.

Gunakan factory/API setup.

UI path tersebut diuji sekali sebagai critical journey tersendiri.

---

# 191. Anti-pattern — CSS Selector

Jangan:

```ts
page.locator('div.flex:nth-child(4) > button')
```

Gunakan role/name/test id semantic.

---

# 192. Anti-pattern — Arbitrary Sleep

Jangan:

```ts
await page.waitForTimeout(5000);
```

Karena:

- lambat;
- flaky;
- bukan bukti state selesai.

Tunggu condition nyata.

---

# 193. Anti-pattern — Shared Mutable Account

Jangan parallel test menggunakan user yang sama ketika:

- progress berubah;
- invoice berubah;
- assessment attempt berubah;
- settings berubah.

Gunakan isolated fixtures.

---

# 194. Anti-pattern — Production Data

Tidak boleh:

- memakai user client;
- mengedit invoice real;
- membuat fake payment di production;
- menghapus content production.

---

# 195. Anti-pattern — Hardcoded Answer Key di Client Test Fixture Production

Mock fixture boleh tahu answer untuk scenario.

Tetapi implementation browser tidak boleh mendapatkan field seperti:

```json
{
  "correct_answer": "B"
}
```

sebelum submission bila security rule melarang.

E2E harus membantu mendeteksi leak tersebut.

---

# 196. Anti-pattern — Test Copy Lama

Jika copy Figma final berubah, update test.

Jangan membuat UI mempertahankan copy lama hanya karena locator `getByText()` failing.

Gunakan semantic contract yang memang penting.

---

# 197. Anti-pattern — Test Internal React State

E2E tidak perlu mengakses:

- React fiber;
- internal state;
- hook;
- component instance.

Test output user-observable dan API/business post-condition.

---

# 198. Anti-pattern — Snapshot Everything

Visual snapshot terlalu banyak menyebabkan:

- noise;
- maintenance;
- false positive.

Snapshot screen/component bernilai visual tinggi saja.

---

# 199. Anti-pattern — Retry sebagai Stability

Jika hanya pass retry:

> debug.

Jangan anggap green final tanpa melihat flaky report.

---

# 200. Final Verdict Batch 5

HIRU Academy sekarang memiliki blueprint E2E yang mengunci acceptance path lintas:

- public acquisition;
- Placement Test;
- Free;
- LMS;
- LMS + Sensei;
- Admin;
- invoice/payment handoff;
- referral/diskon;
- Blog/CMS;
- assessment integrity;
- visual fidelity;
- responsive;
- accessibility;
- cross-role state transition.

Arsitektur test sengaja dipisahkan menjadi:

```text
FRONTEND MOCK E2E
        ↓
INTEGRATED E2E
        ↓
RELEASE SMOKE / REGRESSION
```

agar fase frontend-first tetap cepat tanpa menciptakan ilusi bahwa backend/security sudah tervalidasi.

Playwright digunakan paling kuat untuk tiga hal:

1. **journey user nyata**;
2. **boundary antar membership/role**;
3. **state transition lintas sistem**, khususnya assessment dan Admin → Student.

Prinsip final:

> E2E harus membuktikan bahwa user yang tepat, pada state yang tepat, dapat melakukan aksi yang tepat, dan sistem menghasilkan state akhir yang tepat.

---

# Appendix A — Command Sheet

## Install

```bash
npm install
npx playwright install
```

CI:

```bash
npm ci
npx playwright install --with-deps
```

## Run

```bash
npx playwright test
npx playwright test --ui
npx playwright test --debug
npx playwright test --project=chromium
npx playwright test --grep "@critical"
```

## Report

```bash
npx playwright show-report
```

## Trace

```bash
npx playwright show-trace path/to/trace.zip
```

## Snapshot

```bash
npx playwright test --update-snapshots
```

Gunakan snapshot update hanya setelah visual review.

---

# Appendix B — Suggested Files

```text
tests/e2e/
├─ public/
│  ├─ landing.spec.ts
│  ├─ program.spec.ts
│  └─ blog.spec.ts
├─ auth/
│  ├─ login.spec.ts
│  └─ register.spec.ts
├─ placement/
│  └─ placement.spec.ts
├─ free/
│  └─ free-journey.spec.ts
├─ lms/
│  ├─ dashboard.spec.ts
│  ├─ journey.spec.ts
│  ├─ content.spec.ts
│  └─ tryout.spec.ts
├─ sensei/
│  ├─ schedule.spec.ts
│  ├─ replay.spec.ts
│  └─ mini-checkpoint.spec.ts
├─ admin/
│  ├─ invoice.spec.ts
│  ├─ user.spec.ts
│  ├─ content.spec.ts
│  ├─ assessment.spec.ts
│  └─ blog.spec.ts
├─ cross-role/
│  ├─ payment-activation.spec.ts
│  └─ publish-visibility.spec.ts
├─ regression/
│  ├─ assessment-races.spec.ts
│  └─ ownership.spec.ts
├─ visual/
│  ├─ public.visual.spec.ts
│  ├─ dashboard.visual.spec.ts
│  └─ assessment.visual.spec.ts
└─ accessibility/
   └─ critical-pages.a11y.spec.ts
```

---

# Appendix C — Suggested Playwright Support Files

```text
playwright/
├─ auth/
│  └─ .gitkeep
├─ fixtures/
│  ├─ test.ts
│  ├─ auth.fixture.ts
│  └─ api.fixture.ts
├─ factories/
│  ├─ user.factory.ts
│  ├─ invoice.factory.ts
│  ├─ assessment.factory.ts
│  └─ content.factory.ts
├─ pages/
│  ├─ LoginPage.ts
│  ├─ DashboardPage.ts
│  ├─ AssessmentRunnerPage.ts
│  └─ AdminInvoicePage.ts
├─ helpers/
│  ├─ env.ts
│  ├─ console.ts
│  ├─ network.ts
│  └─ ids.ts
└─ data/
   ├─ placement.ts
   └─ assessment.ts
```

---

# Appendix D — Critical Pre-merge Checklist

```text
PUBLIC
[ ] Landing
[ ] Program
[ ] Blog
[ ] Placement CTA

AUTH
[ ] Login
[ ] protected route

FREE
[ ] free chapter
[ ] paid locked
[ ] deep link denied

LMS
[ ] dashboard
[ ] journey
[ ] content
[ ] checkpoint
[ ] Try Out

SENSEI
[ ] jadwal
[ ] replay
[ ] Mini Checkpoint

ADMIN
[ ] invoice
[ ] user/access
[ ] content
[ ] assessment
[ ] blog

QUALITY
[ ] no console error
[ ] no unexpected 5xx
[ ] mobile critical
[ ] trace enabled
```

---

# Appendix E — Critical Release Checklist

```text
[ ] Production-like Next build
[ ] Integrated Laravel API
[ ] Dedicated E2E database
[ ] Test storage isolated
[ ] Auth state valid
[ ] Public acquisition PASS
[ ] Placement PASS
[ ] Free PASS
[ ] LMS PASS
[ ] Sensei PASS
[ ] Admin PASS
[ ] Payment activation PASS
[ ] Assessment race PASS
[ ] Blog publish PASS
[ ] Mobile PASS
[ ] Cross-browser critical PASS
[ ] Visual reviewed
[ ] Accessibility automated baseline
[ ] No P0/P1 unresolved
```

---

# Appendix F — Official Technical References

Dokumen ini diselaraskan dengan dokumentasi resmi berikut pada baseline 12 Agustus 2026:

1. Playwright — Authentication  
   `https://playwright.dev/docs/auth`

2. Playwright — Projects  
   `https://playwright.dev/docs/test-projects`

3. Playwright — Fixtures  
   `https://playwright.dev/docs/test-fixtures`

4. Playwright — Locators  
   `https://playwright.dev/docs/locators`

5. Playwright — Network  
   `https://playwright.dev/docs/network`

6. Playwright — Mock APIs  
   `https://playwright.dev/docs/mock`

7. Playwright — API Testing  
   `https://playwright.dev/docs/api-testing`

8. Playwright — Clock  
   `https://playwright.dev/docs/clock`

9. Playwright — Visual Comparisons  
   `https://playwright.dev/docs/test-snapshots`

10. Playwright — Accessibility Testing  
    `https://playwright.dev/docs/accessibility-testing`

11. Playwright — Emulation  
    `https://playwright.dev/docs/emulation`

12. Playwright — Continuous Integration  
    `https://playwright.dev/docs/ci`

13. Playwright — Best Practices  
    `https://playwright.dev/docs/best-practices`

14. Next.js App Router — Playwright Testing  
    `https://nextjs.org/docs/app/guides/testing/playwright`

15. Next.js App Router — Testing Overview  
    `https://nextjs.org/docs/app/guides/testing`

Version package repository tetap menjadi authority untuk syntax exact saat implementation.

---

# Appendix G — Anti-regression HIRU

E2E dianggap belum cukup walaupun green jika ternyata:

- test memock seluruh backend di integrated suite;
- Free masih bisa mengambil paid content via API;
- LMS bisa mengambil Sensei content;
- Admin action tidak benar-benar mengubah student state;
- answer key bocor;
- timer reset saat refresh;
- autosave race dapat overwrite jawaban terbaru;
- submit menghasilkan duplicate score;
- invoice verify duplicate entitlement;
- Blog draft public;
- visual snapshot di-update tanpa review;
- Flashcard flip hilang;
- Japanese/furigana hierarchy rusak;
- mobile assessment tidak usable;
- security control Batch 3 dilemahkan.

---

**END OF `05-E2E-PLAYWRIGHT.md`**
