# Architecture

Batch 5 me-rebuild authoring & operasional experience khusus untuk domain Placement Test & Hasil:
1. **Placement Test Builder** (`/admin/placement-hasil` - Tab `Placement Test`)
2. **Aturan Rekomendasi Hasil** (`/admin/placement-hasil` - Tab `Aturan Hasil`)
3. **Hasil Tes** (`/admin/placement-hasil` - Tab `Hasil Tes`)
4. **Manajemen Lead** (`/admin/placement-hasil` - Tab `Lead`)

Implementasi 100% frontend prototype tanpa API backend, database, Laravel, atau server scoring:
- Model authoring tersimpan di browser `localStorage` dengan key: `hiru-admin-placement:v1`
- Adapter reaktif publik menggunakan `useSyncExternalStore` dengan event dispatching `hiru:placement-change`
- Proyeksi published otomatis mengalir ke halaman publik `/placement`, `/placement/question`, dan `/placement/result`
- Fallback ke static fixtures bawaan tetap aktif sehingga tidak pernah merusak demo yang ada.

## Route Migrated From AdminScreen

Route `/admin/placement-hasil` resmi dimigrasikan dari generic `AdminScreen` ke dedicated page:
- `Frontend/src/app/admin/placement-hasil/page.tsx`
- Dihapus dari `screens` map di `Frontend/src/lib/admin-console.ts` (tetap terdaftar di `adminMenu` group `Operasional`).
- Tidak lagi menggunakan layout kartu generik atau input draf seadanya.
- Sub-tampilan/tab diatur via state dan query params di dalam wrapper `<Suspense>`.

## Existing Placement Flow Found

Berdasarkan audit mendalam kode sumber:
- **Intro (`/placement`)**: Menampilkan headline, deskripsi, 3 kartu benefit hasil, 3 reminder persiapan tes, dan form data sebelum mulai (Nama, Nomor WhatsApp, Target Ujian, Checkbox Privasi, Checkbox Persetujuan WhatsApp).
- **Questions (`/placement/question`)**: Menampilkan 20 soal pilihan ganda dari `placementQuestions` di `public-mock.ts`, timer 5 menit (300 detik), breadcrumb badge area soal, pilihan radio A-D, dan tombol navigasi soal. Jawaban disimpan di `sessionStorage` (`hiru-placement-answers`).
- **Scoring (`calculatePlacementResult`)**: Menggunakan metode benar/salah (`correctAnswer`). Setiap jawaban benar menyumbang +20 poin per area (Bunpou, Moji・Goi, Dokkai, Choukai) dengan total skor rata-rata 0–100.
- **Result (`/placement/result`)**: Menampilkan ringkasan level evaluasi, visual bar nilai per area kemampuan, 3 kartu rekomendasi program (Sensei, LMS, Free) sesuai level hasil tes, serta CTA menuju `/register?placement=${level}&plan=${plan}`.
- **Identity/lead fields**: `/placement` secara eksplisit mengumpulkan data identitas calon siswa:
  - `name` (Nama Lengkap)
  - `whatsapp` (Nomor WhatsApp)
  - `target` (Target Ujian: Belum menentukan, N5, N4, N3, N2, N1)
  - `whatsappConsent` (Persetujuan dihubungi via WA)
  *(Tidak ada pengumpulan email atau password di alur placement publik)*.

## Reused Assessment Components

Memanfaatkan kembali pola arsitektur pertanyaan dari Batch 2:
- Struktur editor pertanyaan tunggal (prompt textarea, URL gambar, URL audio, penjelasan/pembahasan).
- Option repeater dengan semantic radio `isCorrect`, input teks opsi, tombol reorder naik/turun, dan hapus opsi.
- Aksi duplikasi pertanyaan, hapus pertanyaan dengan dialog konfirmasi, dan reorder pertanyaan berurutan.
- Menggunakan primitives: `AdminShell`, `AdminBreadcrumb`, `AdminPageHeader`, `AdminTabs`, `AdminDataTable`, `AdminStatusBadge`, `AdminDialog`, `AdminConfirmDialog`, `AdminEmptyState`, `AdminFilterToolbar`.

## Placement Builder

Tab `Placement Test` menyediakan:
- **Pengaturan Umum**: Judul Tes, Headline Intro, Deskripsi Petunjuk, Estimasi Durasi (menit).
- **Daftar & Urutan Pertanyaan**:
  - Outline kiri interaktif dengan penomoran, cuplikan prompt, tombol naik/turun, dan tombol hapus.
  - Editor kanan untuk mengedit area soal (`Bunpou`, `Moji・Goi`, `Dokkai`, `Choukai`), teks soal, media, opsi jawaban A–D (dapat ditambah hingga 6 opsi), kunci jawaban benar (radio), dan pembahasan.
  - Aksi: Tambah Pertanyaan, Duplikat Pertanyaan, Hapus Pertanyaan.
  - Urutan soal tersimpan persisten.

## Recommendation Rules

Tab `Aturan Hasil` mengelola aturan pemetaan skor ke program belajar:
- Setiap aturan memiliki rentang skor: `minScore` s.d. `maxScore` (0–100).
- Program rekomendasi mereferensikan kode program Batch 3: `DASAR`, `N5`, `N4`, `N3`, `N2` (tidak mengarang program di luar kurikulum placement).
- Dilengkapi Judul Hasil dan Deskripsi Hasil yang akan tampil pada halaman `/placement/result`.
- **Utilitas Pratinjau Berdasarkan Skor**: Kotak simulasi bagi admin untuk memasukkan angka skor (0–100) dan langsung melihat aturan mana yang cocok, program yang direkomendasikan, serta teks hasil yang akan diterima siswa.

## Validation

- **Error Pemblokir Terbit (Publish BLOCKED)**:
  - Jumlah soal kosong (minimal 1 soal).
  - Soal memiliki teks pertanyaan kosong.
  - Soal memiliki kurang dari 2 opsi jawaban.
  - Soal tidak memiliki kunci jawaban benar (`isCorrect`).
  - Aturan rekomendasi kosong.
  - Aturan rekomendasi memiliki `minScore > maxScore`.
  - Rentang skor saling tumpang-tindih (overlapping ranges, misal: 10–20 dan 18–30).
  - Program rekomendasi tidak valid / tidak dipilih.
- **Warning Informatif (Tidak memblokir terbit)**:
  - Menampilkan peringatan jelas jika terdapat celah skor yang belum ter-cover aturan (misal: aturan 0–10 dan 20–30 memunculkan peringatan: *"Rentang skor 11–19 belum memiliki aturan rekomendasi."*).

## Preview

- **Pratinjau Tes**: Modal runner interaktif lengkap yang memungkinkan admin mencoba mengerjakan soal dari pertanyaan 1 hingga selesai, melihat penghitungan skor, dan melihat hasil rekomendasi tanpa mencatat data percobaan ke riwayat hasil tes publik.
- Focus trap, tombol tutup dialog, dan kembalinya fokus ke trigger trigger preview bekerja sesuai standar aksesibilitas Batch 1.

## Results

Tab `Hasil Tes`:
- Menampilkan data tabel percobaan placement test siswa dari `leads` store.
- Kolom: Tanggal, Nama Siswa, Target Ujian, Skor (0–100), Rekomendasi Level.
- Fitur pencarian nama dan filter level evaluasi.

## Lead Management

**Status: Implemented**
- **Alasan**: Berdasarkan audit kode aktual, halaman `/placement` mengumpulkan data kontak nyata (`name`, `whatsapp`, `target`, dan persetujuan kontak).
- Tab `Lead` menampilkan:
  - Kolom: Tanggal, Nama Calon Siswa, WhatsApp, Target Ujian, Rekomendasi Level, Status Kontak.
  - Status Lead: `Baru` (badge oranye/pending) dan `Sudah Dihubungi` (badge hijau/active).
  - Tindakan: Tombol toggle status (Tandai Sudah Dihubungi / Tandai Baru) dan tautan langsung `Chat WhatsApp` (`wa.me`).
  - Filter pencarian nama/WA dan filter status lead (`Semua`, `Baru`, `Sudah Dihubungi`).

## Admin → Public Connection

### `/placement`:
Mengonsumsi `usePublishedPlacement()`. Teks intro heading, deskripsi petunjuk, estimasi durasi, dan jumlah soal terbitan admin otomatis meng-update banner intro halaman tanpa mengubah layout atau form.

### `/placement/question`:
Mengonsumsi pertanyaan terbitan admin (`questions`) beserta opsi dan area soal. Timer runner menyesuaikan durasi yang diatur di admin. Fallback ke 20 soal `placementQuestions` jika data admin kosong.

### `/placement/result`:
Menghitung skor evaluasi dan menentukan level rekomendasi berdasarkan `rules` terbitan admin. Kartu program yang direkomendasikan menyesuaikan level hasil tes. Ketika siswa menyelesaikan tes dengan mengisi nama/WA, catatan lead & hasil otomatis tersimpan ke store demo admin.

## Fixture Fallback

Menerapkan pola deduplikasi dan fallback aman:
- Jika admin belum mempublikasikan konfigurasi, public runner dan result menggunakan `placementQuestions` dan `calculatePlacementResult` default dari `public-mock.ts`.
- Status `Draft` di admin tersimpan terpisah dan tidak pernah memengaruhi publik sebelum tombol `Terbitkan` ditekan.

## Static Export

- Halaman `/admin/placement-hasil` dibungkus `<Suspense>` untuk menjamin kompatibilitas penuh dengan Next.js `output: "export"`.
- Seluruh query parameters (`?tab=...`) bekerja pada sisi klien tanpa memerlukan dynamic route segments di server.
- `npm run build` berhasil mengekspor 270/270 static pages.

## Responsive

Uji otomatis Playwright membuktikan seluruh tampilan bebas horizontal overflow pada viewport:
- **360px**: Card layout adaptif, list pertanyaan wrap, form stack, overflow 0px.
- **390px**: Mobile workspace outline/editor mode, opsi jawaban stack, overflow 0px.
- **768px**: Tablet view, dual column form, modal preview responsive.
- **820px**: Tablet landscape / iPad Air, layout stabil.
- **1024px**: Desktop sidebar & two-column outline/editor workspace.
- **1440px**: Desktop widescreen, spacious layout.

## Regression

- **Batch 1 (Admin Console & Dashboard)**: 37/37 tests PASS.
- **Batch 2 (Assessment Builder & Bank Soal)**: 11/11 tests PASS.
- **Batch 3 (Curriculum & Learning Content)**: 11/11 tests PASS.
- **Batch 4 (Website & Marketing CMS)**: 29/29 tests PASS.
- **Batch 5 (Placement Test, Rules & Results)**: 15/15 tests PASS.
- **Total Playwright Suites**: 103 tests PASS tanpa kegagalan.

## Validation

- `npx next typegen`: PASS
- `npm run lint`: PASS (0 warnings, 0 errors)
- `npm run typecheck`: PASS (0 errors)
- `npm run build`: PASS (270/270 static pages generated)
- `playwright`: 103 tests passed

## Remaining OPEN

- Integrasi pengiriman WhatsApp otomatis via WhatsApp Business API / Webhook menunggu implementasi backend.
- Penyimpanan lead dan hasil tes di database PostgreSQL terpusat menunggu integrasi API Laravel.
- Kebijakan retensi dan persetujuan privasi PII siswa tingkat lanjut menunggu konfirmasi legal client.
