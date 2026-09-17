# Architecture

Batch 4 me-rebuild authoring experience untuk domain Website & Marketing CMS:
1. **Landing Page CMS & Promo Campaigns** (`/admin/landing-page`)
2. **Blog & SEO** (`/admin/blog-seo`)
3. **Testimoni** (`/admin/testimoni`)
4. **Pengumuman** (`/admin/pengumuman`)

Implementasi tetap frontend-only tanpa backend API, database, auth, atau fake server.
State authoring dipersistensikan ke browser `localStorage` dengan versioning:
`hiru-admin-website:v1`

Hubungan antara model authoring dan target student/public menggunakan adapter reactive via `useSyncExternalStore`:
`authoring store (localStorage)`
  ↓
`website-store.ts (learner & public adapter)`
  ↓
`public & student views (/, /testimoni, /blog, /blog/article, /notifications)`

Prinsip deduplikasi & fallback:
Data yang dipublikasikan (`status === "Published"`) di-merge dengan static fixtures bawaan. Jika tidak ada data admin atau status masih `Draft`, static fixtures tetap tampil utuh sehingga visual dan demo student tidak pernah rusak.

## Routes Migrated From AdminScreen

Empat route resmi telah dimigrasikan dari generic `AdminScreen` ke dedicated page:
1. `/admin/landing-page` -> `Frontend/src/app/admin/landing-page/page.tsx`
2. `/admin/blog-seo` -> `Frontend/src/app/admin/blog-seo/page.tsx`
3. `/admin/testimoni` -> `Frontend/src/app/admin/testimoni/page.tsx`
4. `/admin/pengumuman` -> `Frontend/src/app/admin/pengumuman/page.tsx`

Keempat route telah dihapus dari `screens` map di `Frontend/src/lib/admin-console.ts`, sehingga catch-all `[...legacy]` tidak lagi memproses route-route ini. Sidebar active ancestor tetap bekerja normal karena segment-safe matching.

Static export compatibility (`output: "export"`):
Semua sub-halaman/editor menggunakan flat static route yang membungkus client component di dalam `<Suspense>` dengan query parameters (`?action=...`, `?id=...`, `?tab=...`), sehingga tidak ada kendala prerender Next.js.

## Landing Builder

### Sections:
Editor berbasis navigator bagian halaman (bukan 30 input sekaligus):
- **Hero**: Kicker/Eyebrow, Headline, Subheadline, Primary CTA Label & Destination, Secondary CTA Label & Destination.
- **Program & Harga**: Headline, Subheadline, Visibility toggle (data program/harga tetap mereferensikan Batch 3).
- **Alur Belajar (Flow)**: Headline, Subheadline, Visibility toggle.
- **LMS Showcase**: Headline, Subheadline, Visibility toggle.
- **Sensei**: Headline, Subheadline, Visibility toggle.
- **Testimoni**: Headline, Subheadline, Visibility toggle (hanya menampilkan testimoni yang di-mark `Featured`).
- **Artikel Blog**: Headline, Subheadline, Visibility toggle.
- **Placement CTA**: Headline, Subheadline, Button Label, Destination.

### Preview:
Preview interaktif menggunakan modal dialog yang menampilkan pratinjau bagian yang sedang diedit.

### Public Connection:
Terhubung ke homepage `/`:
- Teks hero, kicker, dan CTA otomatis ter-update saat status `Published`.
- Bagian yang di-toggle `isVisible: false` disembunyikan secara kondisional.
- Jika status masih `Draft`, homepage publik tetap menampilkan copy bawaan.

## Program Data Reuse

**PENTING: Base price TIDAK diduplikasi di Landing Store.**
- Identitas program, harga dasar Belajar Mandiri, harga dasar Belajar Bersama Sensei, dan ketersediaan program 100% bersumber dari Batch 3 Program Store (`admin-curriculum-store.ts`).
- Landing CMS hanya mengontrol copywriting judul section dan meng-overlay promosi aktif.

## Promotions

### Model:
- `name`: Nama kampanye
- `headline`: Copy promosi
- `targetProgramCodes`: Program yang menjadi sasaran (misal: `N4`, `N5`)
- `targetPlan`: `mandiri` | `sensei` | `both`
- `discountType`: `fixed` (potongan nominal) | `percentage` (persentase)
- `value`: Nilai diskon
- `badgeText`: Teks badge (misal: "PROMO SPESIAL")
- `startAt` & `endAt`: Jendela waktu berlaku
- `status`: `Draft` | `Published` | `Inactive`

### Date Behavior:
Evaluasi runtime lokal (`startAt <= now <= endAt`):
- Sebelum `startAt`: Belum aktif (tidak tampil di publik).
- Dalam rentang: Aktif (badge dan harga promo muncul di card program Landing).
- Setelah `endAt`: Kedaluwarsa (otomatis kembali ke harga dasar).

### Landing Connection:
Ketika ada promo aktif untuk N4 Belajar Mandiri:
- Card N4 di homepage `/` menampilkan badge promosi.
- Menampilkan harga promo yang dihitung dari base price minus diskon.
- Base price di Batch 3 Program Store tetap tidak berubah.

## Blog CMS

### Content Editor:
Editor terstruktur berbasis block (bukan WYSIWYG berat):
- Judul, Kategori, Ringkasan, Author, Featured Image URL & Alt Text.
- Body blocks yang mendukung: Paragraph, H2, H3, Bulleted List, Numbered List, Link, Image.
- Mendukung karakter bahasa Jepang dan Indonesia.

### Slug:
- Disarankan otomatis dari judul artikel saat pertama kali dibuat.
- Dapat diedit bebas oleh admin (URL friendly).
- Validasi pencegahan slug duplikat.

### SEO:
- SEO Title (dengan counter karakter rekomendasi).
- Meta Description (dengan counter karakter rekomendasi).
- Canonical URL, Index/Noindex toggle.
- Social (OpenGraph) Title, Description, Image.
- **SERP Preview**: Pratinjau visual tampilan hasil pencarian Google.
- **Social Card Preview**: Pratinjau kartu OpenGraph media sosial.

### Public Connection:
- Terhubung ke `/blog`: Artikel terbit otomatis muncul di daftar artikel dengan badge kategori dan ringkasan.
- Draft tidak muncul di publik.

### Static Export Limitations:
Karena Next.js menggunakan `output: "export"`, penambahan artikel dinamis di runtime `localStorage` tidak dapat membuat file HTML baru pada `/blog/[slug]` di server build.
Solusi arsitektur yang aman dan valid:
- Artikel dinamis diarahkan ke reader statis `/blog/article?slug=...` yang dibungkus `<Suspense>`.
- Route ini merender konten blocks secara aman menggunakan kelas CSS visual bawaan blog detail (`blog-detail-page`, `blog-article`, dsb.) tanpa merombak visual.
- Fixture bawaan tetap dapat diakses di `/blog/strategi-rutinitas-belajar-n4`.
- *Catatan teknis:* Meta tag SEO runtime via `document.title` hanya aktif di browser client; crawling SEO mesin pencari pada static export tetap membutuhkan build/deploy ulang dari sumber data server.

## Testimonials

### Workflow:
- Tahap persetujuan: `Draft` -> `Approved` / `Rejected`.
- Publikasi: `Published`.
- Flag `Featured` (Unggulan) untuk memilih testimoni yang tampil di homepage.

### Featured:
- Testimoni yang berstatus `Published` dan `Featured: true` otomatis tampil di carousel/grid Testimoni pada Homepage `/`.
- Seluruh testimoni yang berstatus `Published` otomatis tampil di halaman katalog `/testimoni`.

### Public Connection:
- Terhubung ke `/` (section Testimoni).
- Terhubung ke `/testimoni` (katalog testimoni publik).
- Testimoni bawaan tetap berfungsi sebagai fallback jika storage kosong.

## Announcements

### Audience:
Dapat ditargetkan secara spesifik:
- `all`: Semua member
- `free`: Member Free Trial
- `lms`: Member Belajar Mandiri
- `sensei`: Member Belajar Bersama Sensei

### Scheduling & Priority:
- Waktu mulai & selesai (`startAt` & `endAt`).
- Prioritas: `Normal` atau `Penting`.
- CTA Label & Destination path.

### Student Connection:
- Terhubung ke `/notifications?membership=...`.
- Notifikasi aktif yang sesuai dengan membership siswa otomatis disuntikkan ke feed notifikasi siswa dengan badge prioritas, tanggal, dan link tindakan.
- Member dengan tier yang tidak sesuai (misal: pengumuman khusus LMS dibuka oleh Free) tidak akan melihat pengumuman tersebut.

## Shared Components Reused

Menggunakan kembali fondasi dari Batch 1 & 2:
- `AdminShell`, `AdminBreadcrumb`, `AdminPageHeader`, `AdminTabs`
- `AdminDataTable` (dengan filter toolbar & pagination)
- `AdminStatusBadge` (dengan semantic coloring)
- `AdminDialog` & `AdminConfirmDialog` (dengan accessible focus trap, Escape, dan focus return)
- `AdminEmptyState`
- Toast notifikasi simpan/terbit dan dirty guard (`beforeunload` & konfirmasi navigasi).

## Fixture Fallback Strategy

Setiap view target (Landing, Testimoni, Blog, Notifikasi) menerapkan deduplikasi:
```ts
const items = [...publishedData, ...fallbackFixtures.filter(f => !publishedData.some(p => p.id === f.id))];
```
Jika admin belum menerbitkan konten, seluruh data bawaan tetap tampil 100% utuh.

## Responsive

Uji otomatis Playwright membuktikan seluruh tampilan bebas horizontal overflow pada viewport:
- **360px**: Card layout adaptif, mobile section tabs, form stack, overflow 0px.
- **390px**: Full mobile builder flow, input stack, action bar sticky, overflow 0px.
- **768px**: Tablet view, dual column form, modal preview responsive.
- **820px**: Tablet landscape / iPad Air, layout stabil.
- **1024px**: Desktop sidebar & two-column workspace.
- **1440px**: Desktop widescreen, spacious layout.

## Regression

- **Batch 1 (Admin Console & Dashboard)**: 37/37 tests PASS.
- **Batch 2 (Assessment Builder & Bank Soal)**: 11/11 tests PASS.
- **Batch 3 (Curriculum & Learning Content)**: 11/11 tests PASS.
- **Batch 4 (Website & Marketing CMS)**: 29/29 tests PASS.
- **Total Playwright Suites**: 88 tests PASS tanpa kegagalan.

## Validation

- `npx next typegen`: PASS
- `npm run lint`: PASS (0 warnings, 0 errors)
- `npm run typecheck`: PASS (0 errors)
- `npm run build`: PASS (270/270 static pages generated)
- `playwright`: 88 tests passed

## Remaining OPEN

- Unggah file gambar fisik (CDN/S3) untuk thumbnail blog/testimoni menunggu integrasi backend (saat ini menggunakan URL reference).
- Penyimpanan data permanen multi-user menunggu backend Laravel Sanctum & PostgreSQL (saat ini prototype menggunakan localStorage terisolasi per browser).
- Prerendering SEO tags untuk artikel dinamis yang dibuat setelah build memerlukan SSR atau incremental regeneration di production server.
