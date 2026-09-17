# Architecture

Batch 3 me-rebuild authoring experience untuk domain Learning Content:
1. **Program & Harga** (`/admin/program-harga`)
2. **Kurikulum & Materi** (`/admin/kurikulum-materi`)
   - Hub Kurikulum & Chapter Editor
   - Flashcard Deck Builder & Session Adapter
   - Perpustakaan Materi (Library)
   - Replay / Rekaman Kelas

Frontend tetap 100% prototype/demo tanpa API, database, auth, atau fake backend.
State authoring dipersistensikan ke browser `localStorage` dengan versioning:
`hiru-admin-curriculum:v1`

Hubungan antara model authoring dan target student/public menggunakan adapter reactive via `useSyncExternalStore`:
`authoring store (localStorage)`
  ↓
`curriculum-store.ts (learner adapter)`
  ↓
`public & student views (/program, /flashcards, /library, /replay, /learn/.../checkpoint)`

Prinsip deduplikasi & fallback:
Data yang dipublikasikan (`status === "Published"`) di-merge dengan static fixtures bawaan. Jika tidak ada data admin atau status masih `Draft`, static fixtures tetap tampil utuh sehingga visual dan demo student tidak pernah rusak.

## Routes Migrated From AdminScreen

Dua route resmi telah dimigrasikan dari generic `AdminScreen` ke dedicated page:
1. `/admin/program-harga` -> `Frontend/src/app/admin/program-harga/page.tsx`
2. `/admin/kurikulum-materi` -> `Frontend/src/app/admin/kurikulum-materi/page.tsx`

Keduanya telah dihapus dari `screens` map di `Frontend/src/lib/admin-console.ts`, sehingga catch-all `[...legacy]` tidak lagi memproses kedua route ini. Sidebar active ancestor tetap bekerja normal karena segment-safe matching.

Static export compatibility (`output: "export"`):
Semua sub-halaman/editor menggunakan flat static route yang membungkus client component di dalam `<Suspense>` dengan query parameters (`?id=...`, `?action=...`, `?tab=...`), sehingga tidak ada kendala prerender Next.js.

## Program Builder

### Fields:
- Program Code: `DASAR`, `N5`, `N4`, `N3`, `N2`, `SSW`, `INTERVIEW` (tidak ada N1 buatan)
- Nama Program
- Slug (URL friendly)
- Short Description & Description
- Belajar Mandiri: Base Price & Status Tersedia (Toggle)
- Belajar Bersama Sensei: Base Price & Status Tersedia (Toggle)
- Access Duration (Bulan)
- Sort Order

### Status:
- `Draft`: Hanya terlihat di admin
- `Published`: Aktif dan tampil di catalog publik
- `Archived`: Nonaktif (tidak ditawarkan untuk pendaftaran baru)

### Demo Connection:
Tersambung ke Public `/program`:
Ketika program N4 dipublikasikan dengan harga baru, kartu harga Belajar Mandiri dan Belajar Bersama Sensei pada `/program` otomatis menampilkan harga terbitan admin dengan fallback ke nilai default jika tidak ada update.

## Curriculum / Journey Builder

### Program:
Mendukung pemilihan program: `DASAR`, `N5`, `N4`, `N3`, `N2`, `SSW`, `INTERVIEW`.
Khusus untuk `INTERVIEW`, karena requirement kurikulum belum lengkap, sistem menampilkan notice yang jelas:
*"Struktur program belum dikonfigurasi. Kurikulum Interview sedang dalam tahap perancangan."*

### Chapter:
Daftar chapter per program dengan informasi:
- Judul & deskripsi
- Nomor urut
- Komponen aktivitas
- Status (Draft / Terbit)
- Kontrol pemindahan urutan (Naik / Turun)
- Edit & Hapus

### Activities:
Sesuai PRD, bobot progres ditampilkan secara informasional (read-only):
- **Dasar & SSW**: Video 25%, Modul PDF 25%, Flashcard 25%, Checkpoint 25%
- **N5 / N4 / N3 / N2**: Video 20%, Modul PDF 5%, Flashcard 20%, Audio 20%, Reading 20%, Checkpoint 15%

Editor chapter menyediakan input untuk setiap aktivitas:
- **Video**: Judul, Video URL (YouTube/MP4), Durasi (menit)
- **Modul PDF**: Judul, PDF URL / Dokumen ref
- **Flashcard**: RelationPicker memilih Flashcard Deck terdaftar
- **Audio (N5-N2)**: Judul Audio, Audio URL / ref
- **Reading (N5-N2)**: Judul Bacaan, Passage Text (support Japanese text)
- **Checkpoint**: RelationPicker memilih Assessment Checkpoint (dari Batch 2)

### Ordering:
Urutan chapter dapat dipindahkan ke atas / ke bawah dan langsung dipersistensikan ke storage demo.

## Checkpoint Relation

### Connection:
Chapter Editor menyediakan `RelationPicker` yang membaca seluruh assessment bertipe `checkpoint` yang telah dibuat dan dipublikasikan pada Batch 2 (`readAssessments()` di `admin-assessment-store.ts`).

Ketika Checkpoint di-assign ke Chapter N4 Chapter 4:
- Student membuka `/learn/n4/chapter-4/checkpoint`
- Halaman checkpoint student secara dinamis menggunakan daftar soal yang telah dibuat di admin assessment store.
- Kunci jawaban tetap aman dan dihitung di client prototype runner.

### Access Rules Preserved:
Gating membership (Free hanya preview Chapter 1, LMS/Sensei akses penuh) dan progres lock tidak diubah sama sekali. Jika chapter berstatus `lockedByProgress`, student tetap diarahkan ke Lesson Overview.

## Flashcard Builder

### Deck:
- Judul deck
- Program (`DASAR` s.d. `SSW`)
- Level & Chapter asosiasi
- Status (Draft / Terbit)
- Sort order

### Cards:
Setiap deck berisi kumpulan kartu dengan struktur:
- Sisi Depan (Front / Kanji / Kosakata)
- Sisi Belakang (Back / Arti Indonesia)
- Cara Baca (Furigana / Hiragana)
- Penjelasan & Kalimat Contoh
- Aksi: Tambah Kartu, Duplikat Kartu, Hapus Kartu, Geser Urutan (Naik / Turun)

### Preview:
Preview interaktif 3D card flip (Front -> Flip -> Back) menggunakan animasi CSS yang mulus sesuai standar visual siswa.

### Student Connection:
- Terhubung ke `/flashcards?membership=lms`: Deck yang diterbitkan muncul di daftar koleksi flashcard siswa.
- Terhubung ke `/learn/[level]/[chapter]/flashcards`: Kartu-kartu dari deck yang di-assign ke chapter otomatis digunakan di sesi belajar flashcard chapter tersebut.

## Material Library

Area "Perpustakaan Materi" di Kurikulum & Materi:
- Kelola materi pendukung siswa: PDF, Video, Audio, Reading, Tata Bahasa, Kanji, Kosakata
- Input: Judul, Level, Jenis Materi, Deskripsi, URL Dokumen/Media, Status
- **Student Connection**: Materi berstatus `Published` otomatis muncul di `/library?membership=lms` dengan fallback ke fixtures bawaan.

## Replay

Area "Replay Rekaman" di Kurikulum & Materi:
- Kelola rekaman kelas Zoom / YouTube untuk siswa Sensei
- Input: Judul Sesi, Program/Level, Nama Sensei, Tanggal, URL YouTube (otomatis mengekstrak YouTube Video ID), Durasi, Deskripsi, Status
- **Student Connection**: Rekaman berstatus `Published` otomatis muncul di `/replay?membership=sensei` dan membuka player dengan video ID yang bersangkutan.

## Published Data Adapters

File `Frontend/src/lib/curriculum-store.ts` menyediakan adapter reaktif:
- `readPublishedPrograms()`
- `readPublishedChapters(programCode)`
- `readPublishedDecks(programCode?)`
- `readPublishedMaterials(programCode?)`
- `readPublishedReplays()`
- `usePublishedCurriculum()` hook via `useSyncExternalStore` dengan event dispatching otomatis saat admin menyimpan perubahan di tab yang sama.

## Fixture Fallback Strategy

Setiap view student (Program, Flashcards, Library, Replay, Checkpoint) menerapkan deduplikasi:
```ts
const items = [...fixtures.filter(f => !published.some(p => p.id === f.id)), ...published];
```
Jika admin belum menerbitkan data atau storage kosong, 100% fixture bawaan tetap berjalan normal.

## Access Rules Preserved

- Free tier: Chapter 1 preview tetap berlaku.
- LMS tier: Akses mandiri Dasar, N5, N4 tetap berlaku.
- Sensei tier: Akses kelas, replay, dan bimbingan tetap berlaku.
- Tidak ada hak akses yang dapat di-bypass dari editor admin.

## Responsive

Uji otomatis Playwright membuktikan seluruh tampilan bebas horizontal overflow pada viewport:
- **360px**: Card layout adaptif, mobile outline/editor tabs, overflow 0px.
- **390px**: Full mobile builder flow, input stack, action bar sticky, overflow 0px.
- **768px**: Tablet view, dual column form, modal preview responsive.
- **820px**: Tablet landscape / iPad Air, layout stabil.
- **1024px**: Desktop sidebar & two-column workspace.
- **1440px**: Desktop widescreen, spacious layout.

## Regression

- **Batch 1 (Admin Console & Dashboard)**: 38/38 tests PASS.
- **Batch 2 (Assessment Builder & Bank Soal)**: 11/11 tests PASS.
- **Batch 3 (Curriculum & Learning Content)**: 11/11 tests PASS.
- **Total Playwright Suites**: 60 tests PASS tanpa kegagalan.

## Validation

- `npx next typegen`: PASS
- `npm run lint`: PASS (0 warnings, 0 errors)
- `npm run typecheck`: PASS (0 errors)
- `npm run build`: PASS (269/269 static pages generated)
- `playwright`: 60 tests passed

## Remaining OPEN

- Integrasi upload file fisik (S3 / Cloud Storage) untuk video, audio, dan PDF menunggu implementasi backend.
- Pengaturan promo/diskon dinamis akan ditangani pada batch Marketing/Website.
- Struktur kurikulum Interview menunggu konfirmasi silabus final dari client.
- Otentikasi dan hak akses backend Admin menunggu implementasi Laravel Sanctum.
