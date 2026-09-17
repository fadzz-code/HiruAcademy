# Pre-Batch Legacy Audit

Sebelum eksekusi Batch 8, audit exhaustive terhadap sisa dependensi generic membuktikan:
- **AdminScreen consumers**: Hanya tersisa 2 route: `/admin/analitik` dan `/admin/pengaturan-integrasi` yang dilayani melalui catch-all `[...legacy]`. Seluruh 15 route Admin lainnya sudah berstatus dedicated.
- **admin-demo-store consumers**:
  1. `Frontend/src/components/admin-screen.tsx` (runtime generic screen)
  2. `Frontend/src/app/admin/page.tsx` (hanya untuk `draftItems` dan fallback legacy activities)
  3. `Frontend/src/lib/admin-analytics.ts` (hanya untuk status dummy analitik eksternal)
- **catch-all consumers**: Hanya `/admin/[...legacy]/page.tsx` yang membaca `screens["analitik"]` dan `screens["pengaturan-integrasi"]`.
- **remaining screens**: Tepat 2 screen configs di `admin-console.ts` (`analitik` dan `pengaturan-integrasi`).

# Analytics

## Data sources:
100% berasal dari dedicated typed stores terbitan Batch 2–7:
1. **Business Store** (`admin-business-store.ts`): data user terdaftar, keanggotaan aktif, invoice per status, komisi affiliate, pencairan komisi (payout).
2. **Placement Store** (`admin-placement-store.ts`): data leads dan hasil tes evaluasi level.
3. **Assessment Store** (`admin-assessment-store.ts`): bank soal latihan, checkpoint, try out, dan mini checkpoint.
4. **Curriculum Store** (`admin-curriculum-store.ts`): program belajar, chapter materi, flashcard deck, perpustakaan materi, dan rekaman kelas (replay).
5. **Class Operations Store** (`admin-class-operations-store.ts`): direktori Sensei, kelas aktif, jadwal sesi Zoom/Meet.
6. **Settings Store** (`admin-settings-store.ts`): status konfigurasi analitik eksternal (GA4 & Meta Pixel).

## Metrics:
Semua metrik diturunkan secara jujur (honest derived metrics) tanpa angka sintetis (zero fabricated KPIs):
- **Ringkasan**: Total Akun Demo, Keanggotaan Aktif, Invoice Menunggu Aksi, Invoice Terverifikasi/Aktif, Lead Placement Masuk, Konten Terbit, Sesi Mendatang.
- **Akuisisi**: Distribusi Target Ujian Placement, Distribusi Rekomendasi Hasil, Status Lead (Baru vs Dihubungi), Akun Siswa per Target JLPT, Ringkasan Transaksi Referral.
- **Pembelajaran**: Distribusi Konten Belajar Terbit (Program, Chapter, Soal Latihan/Assessment, Deck Flashcard, Materi Library, Replay Video), Sesi Kelas Terjadwal & Jam Belajar, Rasio Replay Terhubung.
- **Transaksi**: Distribusi Invoice per Status (Draft, Menunggu pembayaran, Sudah bayar, Diverifikasi, Aktif), Nilai Bruto Transaksi Terverifikasi/Aktif, Komisi Affiliate per Status, Payout Selesai Dicairkan.

## Filters:
- Filter rentang waktu terintegrasi: `7 Hari`, `30 Hari`, dan `Semua`.
- Menggunakan evaluasi timestamp absolut untuk entitas yang memiliki tanggal (`createdAt`, `verifiedAt`, `paidAt`, dsb.), dan memberi label eksplisit *(snapshot saat ini)* untuk data tanpa histori rentang waktu.

## Charts/distributions:
Menggunakan visual horizontal distribution bar semantik dengan label dan jumlah angka jelas tanpa ketergantungan library grafik berat.

## External analytics status:
Panel "Analitik Eksternal" menampilkan status nyata konfigurasi GA4 & Meta Pixel yang diturunkan dari Settings Store, lengkap dengan tautan langsung menuju `/admin/pengaturan-integrasi?tab=Integrasi`.

**Confirm: NO invented KPI.** (Tidak ada angka palsu "12.500 pengunjung", "konversi 8,7%", atau "42.000 page views").

# Settings

Dedicated settings workspace di `/admin/pengaturan-integrasi` dengan 6 tab operasional nyata:
1. **Umum**:
   - Nama Situs: `HIRU Academy` (dapat diedit).
   - Bahasa / Locale: `id-ID` (Bahasa Indonesia).
   - Zona Waktu: `Asia/Jakarta (WIB)` (standar tunggal).
2. **Branding**:
   - URL Logo, URL Favicon, Label Perusahaan / Pengelola.
   - Tidak merombak tema visual atau palet warna resmi yang sudah disetujui.
3. **Kontak**:
   - WhatsApp Admin Utama (satu-satunya sumber kanonikal kontak).
   - Email Dukungan, Alamat Kantor, Tautan Instagram.
4. **Integrasi**:
   - Google Analytics 4 (GA4).
   - Meta Pixel.
   - Provider Pertemuan Daring (Informasional: Tautan Manual / Zoom / Google Meet).
   - Konfigurasi Email Pengirim (Nama & Alamat Pengirim).
   - Pengaturan WhatsApp Invoice (Nomor & Template Pesan tersinkronisasi langsung dengan Business Store).
5. **Privasi**:
   - Path Kebijakan Privasi (`/kebijakan-privasi`).
   - Path Syarat & Ketentuan (`/syarat-ketentuan`).
   - Toggle Persetujuan Pelacakan Analitik.
6. **Profil Admin**:
   - Nama Tampilan, Alamat Email, URL Foto Profil.

# GA4

- **Configuration**: Toggle aktifkan GA4 & Input Measurement ID (`ga4MeasurementId`).
- **Validation**: Wajib berformat `G-XXXXXXXXXX` (regex: `/^G-[A-Z0-9]+$/i`).
- **Status Otomatis**:
  - Jika dinonaktifkan: `Nonaktif`.
  - Jika aktif tapi format ID salah/kosong: `Perlu dilengkapi`.
  - Jika aktif dan format ID valid: `Siap digunakan`.
- **Runtime loader**: Tidak memuat script pelacak pihak ketiga secara diam-diam karena belum ada CMP/cookie banner resmi di frontend prototype.
- **Consent behavior**: Terhubung dengan kebijakan privasi dan menunggu persetujuan pelacakan pengguna di lingkungan produksi.

# Meta Pixel

- **Configuration**: Toggle aktifkan Meta Pixel & Input Pixel ID (`metaPixelId`).
- **Validation**: Wajib berisi 5–20 digit angka (regex: `/^\d{5,20}$/`).
- **Status Otomatis**:
  - Jika dinonaktifkan: `Nonaktif`.
  - Jika aktif tapi kosong/salah: `Perlu dilengkapi`.
  - Jika aktif dan valid: `Siap digunakan`.
- **Runtime loader**: Disimpan sebagai konfigurasi terverifikasi tanpa injeksi script eksternal di lingkungan demo. Tidak menyimpan access token atau secret sensitif di browser.

# WhatsApp Canonical Source

- **Owner**: `Frontend/src/lib/admin-settings-store.ts` (`hiru-admin-settings:v1`).
- **Invoice consumer**: Fungsi `getInvoiceWhatsAppUrl()` di `Frontend/src/lib/business-store.ts` dan halaman `/invoice` membaca nomor WhatsApp langsung dari Settings Store kanonikal (`store.settings.contact.whatsappNumber`).
- **Sinkronisasi**: Mengubah nomor WhatsApp di tab Kontak Settings otomatis meng-update nomor tujuan WhatsApp di halaman Invoice Admin maupun Invoice Publik.
- **Confirm**: Tidak ada duplikasi sumber nomor WhatsApp (zero duplicate settings).

# Dashboard Final Data Migration

- **Draft metric**: Kartu "Item draf" di `/admin` kini dihitung dari data toko khusus yang terdaftar:
  `draftAssessments` + `draftChapters` + `draftArticles` + `draftCampaigns`.
- **Invoice/Payout metrics**: Diturunkan langsung dari `admin-business-store.ts` (`invoices` dan `payouts`).
- **Legacy demo-store dependency**: Dihilangkan 100%. File `admin/page.tsx` tidak lagi mengimpor `useAdminStore` atau `admin-demo-store.ts`.

# Generic Admin Cleanup

1. **AdminScreen**:
   **REMOVED**. File `Frontend/src/components/admin-screen.tsx` telah dihapus. Zero consumers.
2. **admin-demo-store**:
   **REMOVED**. File `Frontend/src/lib/admin-demo-store.ts` telah dihapus. Zero consumers.
3. **screens registry**:
   **REMOVED**. Konfigurasi `screens` dan type `ScreenConfig` di `Frontend/src/lib/admin-console.ts` telah dihapus.
4. **/admin/[...legacy]**:
   **REMOVED**. Folder catch-all `Frontend/src/app/admin/[...legacy]` telah dihapus. Path yang tidak terdaftar akan otomatis menghasilkan 404 standar Next.js.
5. **Legacy CSS removed**:
   Dihapus dari `Frontend/src/app/globals.css`:
   - `.console-page`, `.console-summary`, `.console-panel`, `.console-toolbar`, `.console-list`, `.console-row`, `.console-delete`, `.console-empty`, `.console-notice`, `.console-editor`, `.console-action-grid`, `.console-tabs`, `.console-inside`, `.console-chain`.
   - Hanya `.console-nav-group` yang dipertahankan karena secara sah digunakan oleh `admin-navigation.tsx`.

# Final Admin Route Inventory

Seluruh 17 route Admin resmi kini berstatus **DEDICATED** (tanpa fallback catch-all atau komponen generik):

1. `/admin` -> `Frontend/src/app/admin/page.tsx` (`AdminDashboardPage`)
2. `/admin/landing-page` -> `Frontend/src/app/admin/landing-page/page.tsx` (`LandingPageStudio`)
3. `/admin/program-harga` -> `Frontend/src/app/admin/program-harga/page.tsx` (`ProgramPricingBuilder`)
4. `/admin/kurikulum-materi` -> `Frontend/src/app/admin/kurikulum-materi/page.tsx` (`CurriculumBuilder`)
5. `/admin/bank-soal` -> `Frontend/src/app/admin/bank-soal/page.tsx` (`AssessmentHub`)
6. `/admin/bank-soal/baru` -> `Frontend/src/app/admin/bank-soal/baru/page.tsx` (`AssessmentTypeSelector`)
7. `/admin/testimoni` -> `Frontend/src/app/admin/testimoni/page.tsx` (`TestimonialStudio`)
8. `/admin/blog-seo` -> `Frontend/src/app/admin/blog-seo/page.tsx` (`BlogSeoStudio`)
9. `/admin/pengumuman` -> `Frontend/src/app/admin/pengumuman/page.tsx` (`AnnouncementStudio`)
10. `/admin/placement-hasil` -> `Frontend/src/app/admin/placement-hasil/page.tsx` (`PlacementBuilder`)
11. `/admin/pengguna-akses` -> `Frontend/src/app/admin/pengguna-akses/page.tsx` (`UserMembershipOperations`)
12. `/admin/invoice` -> `Frontend/src/app/admin/invoice/page.tsx` (`InvoiceOperations`)
13. `/admin/affiliate-komisi` -> `Frontend/src/app/admin/affiliate-komisi/page.tsx` (`AffiliateOperations`)
14. `/admin/pencairan-komisi` -> `Frontend/src/app/admin/pencairan-komisi/page.tsx` (`AffiliateOperations`)
15. `/admin/sensei` -> `Frontend/src/app/admin/sensei/page.tsx` (`SenseiDirectory`)
16. `/admin/kelas-jadwal` -> `Frontend/src/app/admin/kelas-jadwal/page.tsx` (`ClassOperations`)
17. `/admin/analitik` -> `Frontend/src/app/admin/analitik/page.tsx` (`AdminAnalyticsDashboard`)
18. `/admin/pengaturan-integrasi` -> `Frontend/src/app/admin/pengaturan-integrasi/page.tsx` (`AdminSettingsWorkspace`)

# Dead Affordance Audit

- Tombol "Simpan Pengaturan" palsu pada tab Branding, Kontak, Privasi, dan Profil tanpa input telah dihapus dan diganti dengan form input nyata dan tombol simpan yang berfungsi.
- Tombol "Simpan Integrasi" yang redundan telah diintegrasikan dengan validasi status otomatis (`Nonaktif` / `Perlu dilengkapi` / `Siap digunakan`).
- Pesan petunjuk analitik "Hubungkan sumber data sebelum menampilkan metrik" tanpa aksi telah diganti dengan navigasi tautan nyata ke pengaturan integrasi.
- Seluruh 17 menu navigasi terbukti memiliki route dan target fungsional nyata.

# Responsive

Uji otomatis Playwright membuktikan seluruh tampilan bebas horizontal overflow pada viewport:
- **360px**: Form pengaturan stack, tabel analitik wrap, overflow 0px.
- **390px**: Mobile dashboard, panel metrik, tabs, overflow 0px.
- **768px**: Tablet portrait, dual column bento, overflow 0px.
- **820px**: Tablet landscape / iPad Air, layout stabil.
- **1024px**: Desktop sidebar & multi-column workspace.
- **1440px**: Desktop widescreen, spacious layout.

# Regression

Semua 8 test suites Playwright lulus 100%:
- **Batch 1 (Admin Console & Dashboard)**: 31/31 tests PASS.
- **Batch 2 (Assessment Builder & Bank Soal)**: 11/11 tests PASS.
- **Batch 3 (Curriculum & Learning Content)**: 11/11 tests PASS.
- **Batch 4 (Website & Marketing CMS)**: 29/29 tests PASS.
- **Batch 5 (Placement Test, Rules & Results)**: 15/15 tests PASS.
- **Batch 6 (Business Operations & Finance)**: 33/33 tests PASS.
- **Batch 7 (Sensei, Classes & Schedule)**: 6/6 tests PASS.
- **Batch 8 (Analytics, Settings & Cleanup)**: 21/21 tests PASS.
- **Total Playwright Regression**: **157 tests PASS** tanpa kegagalan.

# Validation

- `npx next typegen`: PASS
- `npm run lint`: PASS (0 warnings, 0 errors)
- `npm run typecheck`: PASS (0 errors)
- `npm run build`: PASS (270/270 static pages generated)
- `playwright`: 157 tests passed

# Remaining OPEN

- Integrasi API produksi Laravel Sanctum, PostgreSQL, dan Redis caching.
- Injeksi script pelacak pihak ketiga (GA4 / Meta Pixel) di lingkungan live setelah banner cookie consent resmi disetujui oleh tim legal client.
- Akun otentikasi login multi-admin dan sistem perizinan (RBAC) tingkat backend.
- Pengaturan integrasi SMTP email dan integrasi webhook WhatsApp Gateway produksi.
