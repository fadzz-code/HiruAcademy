# B-MAIN-MANAGEMENT — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **B — Pengelolaan Utama** (`388:25`)  
> Screens: **ADMIN / 05–12 + ADMIN / 31 Mini Checkpoint Builder**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: quoted visible copy below is transcribed verbatim from the active Figma file.

## Why Page 11 starts from Layer B

The active Figma still contains Layer A:

- `ADMIN / 01 — Login Admin`
- `ADMIN / 02 — Lupa Kata Sandi`
- `ADMIN / 03 — Reset Kata Sandi`

However, the latest product decision uses **one shared Login UI** for Free, LMS, Sensei, and Admin.

Therefore:

- do **not** create `/admin/login`;
- do **not** build a second Admin auth UI;
- Admin uses the shared Login;
- after authentication, backend role/permission later determines access to the Admin Console;
- Page 11 Layer A is retained as historical/reference Figma material only;
- Admin-specific access/redirect state belongs to Page 11 Layer F.

For that reason the first active Admin implementation contract starts at **Layer B — Pengelolaan Utama**.

---

# Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma node IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Runtime totals, prices, scores, dates, user/lead data, timer, assessment configuration: **DYNAMIC / FIXTURE**
- Backend authority statements: preserved as product boundaries, not frontend implementation requirements yet
- Do not paraphrase VERIFIED copy.
- Do not create Backend/API/database/storage/payment functionality during this contract-extraction phase.
- Admin operations are permission-sensitive; frontend visibility must not be treated as real authorization.

---

# Layer B frame inventory

| Screen | Figma frame |
|---|---|
| ADMIN / 05 — Dashboard Admin | `431:152` |
| ADMIN / 06 — Pengelolaan Program | `431:218` |
| ADMIN / 07 — Penyusun Chapter | `431:406` |
| ADMIN / 08 — Penyusun Quiz | `431:582` |
| ADMIN / 09 — Penyusun Try Out | `431:727` |
| ADMIN / 10 — Pengelolaan Perpustakaan Konten | `431:923` |
| ADMIN / 11 — Penyusun Placement Test & Lead | `431:1116` |
| ADMIN / 12 — Assessment Results | `431:1323` |
| ADMIN / 31 — Mini Checkpoint Builder | `998:2616` |

---

# Shared Admin Console navigation

The same Admin Console shell is reused across Layer B.

## Exact visible navigation copy

- `Hiru Academy`
- `ADMIN CONSOLE`
- `Dashboard`
- `Program`
- `Content Builder`
- `Placement & Hasil`
- `Pengguna & Akses`
- `Transaksi`
- `Konten & Komunikasi`
- `Sensei & Cohort`
- `Analitik`
- `Pengaturan`
- `Keluar Admin`

## Verified top-level destinations

- Dashboard → `431:152`
- Program → `431:218`
- Content Builder → `431:406`
- Placement & Hasil → `431:1116`
- Pengguna & Akses → `432:845`
- Transaksi → `432:1192`
- Konten & Komunikasi → `432:1609`
- Sensei & Cohort → `432:2770`
- Analitik → `432:2934`
- Pengaturan → `432:3681`

Do not create a separate Admin sidebar for each screen.

---

# ADMIN / 05 — Dashboard Admin

**Figma frame:** `431:152`

## Exact visible copy

### Header

- `ADMIN • OPERATIONS OVERVIEW`
- `Dashboard Admin`
- `Configure, publish, operate, review, dan report dalam satu workspace.`
- `⌕`
- `Cari user, invoice, atau konten`
- `Buat Program`

`Buat Program` → `431:218`

### KPI cards

- `Total Pengguna`
- `—`
- `Data real-time dari backend`

- `Membership Aktif`
- `—`
- `Berdasarkan entitlement aktif`

- `Invoice Menunggu`
- `—`
- `Perlu verifikasi admin`

- `Insight Bisnis`
- `Live`
- `Dari transaksi terverifikasi`

### Quick actions

- `Quick actions`
- `Akses fungsi yang paling sering digunakan tanpa meninggalkan dashboard.`

#### Program

- `CHAPTER 01`
- `Pengelolaan Program`
- `Atur level, plan, harga dinamis, benefit, dan status publikasi.`
- `Kelola sekarang →`

Destination → `431:218`

#### Content Builder

- `CHAPTER 01`
- `Builder Konten`
- `Kelola chapter, dua modul, flashcard, quiz, dan Jepang Pemula.`
- `Kelola sekarang →`

Destination → `431:406`

#### Invoice Management

- `CHAPTER 01`
- `Invoice Management`
- `Verifikasi transaksi, aktifkan entitlement, dan catat status pembayaran.`
- `Periksa antrean →`

Destination → `432:1192`

### Operational queue

- `Antrean operasional`
- `Item membutuhkan pemeriksaan atau tindakan admin.`
- `Lihat Semua`

`Lihat Semua` scrolls within the Dashboard.

#### Queue item 1

- `Invoice menunggu verifikasi`
- `Invoice`
- `N4 • Sensei`
- `Perlu tindakan`
- `Dari backend`
- `Lihat Detail →`

Destination → `432:1192`

#### Queue item 2 — node naming note

The prototype node is named `Konten draft belum dipublikasikan` and routes to Content Library (`431:923`). Treat the item data as backend-driven operational content.

#### Queue item 3 — node naming note

The prototype node is named `Replay Zoom menunggu publikasi` and routes to Cohort & Kelas (`432:2770`).

#### Visible additional queue example

- `Placement lead baru`
- `Placement`
- `N4 • 05 Agu`
- `Follow-up`
- `Dari backend`
- `Lihat Detail →`

#### Mini Checkpoint queue example

- `Mini Checkpoint 02 siap dibuka`
- `Mini Checkpoint`
- `N4 • Sesi 10`
- `Review`
- `Dari backend`
- `Lihat Detail →`

### Placement recap

- `REKAP PLACEMENT TERBARU`
- `Nama, WhatsApp, hasil, dan tanggal pengerjaan`
- `Buka Placement Leads →`

Destination → `431:1116`

Table headers:

- `Nama`
- `WhatsApp`
- `Target / Hasil`
- `Tanggal Pengerjaan`
- `Status`

Fixture rows:

- `Hilmi A.`
- `+62 812••••1234`
- `Target N4 • Rekomendasi N4`
- `05 Agu 2026 • 20:14 WIB`
- `Perlu follow-up`

- `Rina P.`
- `+62 813••••9821`
- `Target N5 • Rekomendasi N5`
- `05 Agu 2026 • 18:42 WIB`
- `Sudah dihubungi`

- `Dimas K.`
- `+62 857••••4402`
- `Target N4 • Rekomendasi N4`
- `04 Agu 2026 • 21:05 WIB`
- `Registered`

### Security announcement

- `×`
- `Pengumuman`
- `Akses sensitif, perubahan entitlement, transaksi, dan publikasi konten wajib diperiksa backend serta dicatat.`

### All Admin modules

- `ALL ADMIN MODULES`
- `Akses seluruh workflow operasional`
- `Gunakan modul sesuai permission. Data sensitif, entitlement, transaksi, dan publish state tetap diperiksa backend.`

Cards:

- `OPERATIONS`
- `Placement Test & Leads`
- `Builder placement, rekomendasi, dan lead.`
- `Buka modul`

Destination → `431:1116`

- `OPERATIONS`
- `Assessment Results`
- `Hasil checkpoint, Mini Checkpoint, quiz, dan Try Out.`
- `Buka modul`

Destination → `431:1323`

- `OPERATIONS`
- `Access Settings`
- `Role, entitlement, permission, dan flags.`
- `Buka modul`

Destination → `432:982`

- `OPERATIONS`
- `Referral & Diskon`
- `Kode, diskon dua arah, invoice, reward, dan audit.`
- `Buka modul`

Destination → `432:1309`

- `OPERATIONS`
- `Certificate`
- `Sertifikat digital dan validasi akses.`
- `Buka modul`

Destination → `432:1478`

- `OPERATIONS`
- `Announcement`
- `Target audience dan publish state.`
- `Buka modul`

Destination → `432:1609`

- `OPERATIONS`
- `Blog`
- `Artikel, category, draft, dan publish.`
- `Buka modul`

Destination → `432:1743`

- `OPERATIONS`
- `Testimonial`
- `Moderasi pengalaman pengguna.`
- `Buka modul`

Destination → `432:1941`

- `OPERATIONS`
- `Feedback Moderation`
- `Review feedback dan pertanyaan.`
- `Buka modul`

Destination → `432:2076`

- `OPERATIONS`
- `Community Moderation`
- `Post, komentar, report, dan tindakan.`
- `Buka modul`

Destination → `432:2199`

- `OPERATIONS`
- `Notification Templates`
- `Template email dan in-app notification.`
- `Buka modul`

Destination → `432:2320`

- `OPERATIONS`
- `Landing Page`
- `Hero, CTA, section, SEO, draft, dan publish.`
- `Buka modul`

Destination → `805:2532`

- `OPERATIONS`
- `Sensei Management`
- `Profil, assignment, dan availability.`
- `Buka modul`

Destination → `432:2632`

- `OPERATIONS`
- `Cohort & Kelas`
- `Cohort, peserta, Sensei, dan sesi.`
- `Buka modul`

Destination → `432:2770`

- `OPERATIONS`
- `Audit Logs`
- `Perubahan sensitif dan actor log.`
- `Buka modul`

Destination → `432:3518`

- `OPERATIONS`
- `General Settings`
- `Branding, security, integrations, defaults.`
- `Buka modul`

Destination → `432:3681`

## Dashboard rule

All KPI totals, queue entries, people, dates, and operational status are backend-driven fixtures. Do not hardcode the examples.

---

# ADMIN / 06 — Pengelolaan Program

**Figma frame:** `431:218`

## Exact visible copy

### Header

- `ADMIN • PRODUK & AKSES`
- `Kelola N1–N5 sebagai produk independen, harga, Chapter gratis, entitlement, dan status publikasi.`
- `Pengelolaan Program & Akses`
- `Tambah Program`
- `Dashboard`

Destinations:

- `Tambah Program` → `809:2607` — operational state/editor in Layer G
- `Dashboard` → `431:152`

### Summary

- `Program aktif`
- `Dinamis`
- `Dihitung dari status publikasi.`

- `Program draft`
- `Dinamis`
- `Menunggu konfigurasi atau review.`

- `Harga aktif`
- `Dari admin`
- `Tidak memakai harga hardcoded.`

- `Akses level`
- `Independen`
- `Bisa membeli level mana pun tanpa prerequisite antarlevel.`

### Search/status

- `⌕`
- `Cari level atau program`
- `Independen`
- `Dipublikasikan`
- `Draft`
- `Diarsipkan`

### Program list

#### N5

- `五`
- `JLPT N5`
- `Fondasi Bahasa Jepang dasar.`
- `Dipublikasikan`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Harga dan benefit mengikuti konfigurasi admin.`

Destination → `431:406`

#### N4

- `四`
- `JLPT N4`
- `Program aktif dengan chapter dan assessment.`
- `Dipublikasikan`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Harga dan benefit mengikuti konfigurasi admin.`

Destination → `431:406`

#### N3

- `三`
- `JLPT N3`
- `Program lanjutan yang dapat disiapkan sebagai draft.`
- `Draft`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Harga dan benefit mengikuti konfigurasi admin.`

Destination → `431:406`

#### N2

- `二`
- `JLPT N2`
- `Level lanjutan yang dapat dibeli tanpa prerequisite level lain.`
- `Draft`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Harga dan benefit mengikuti konfigurasi admin.`

Destination → `431:406`

#### N1

- `一`
- `JLPT N1`
- `Level tertinggi yang dapat dikonfigurasi dan dibeli secara independen.`
- `Draft`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Harga dan benefit mengikuti konfigurasi admin.`

Destination → `431:406`

### Entitlement matrix

- `Matriks hak akses`
- `Fitur`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`

Rows:

- `Akses Chapter`
- `Chapter 1 / level`
- `Level dibeli`
- `Level dibeli`

- `Try Out & Ulasan`
- `Konfigurasi`
- `Konfigurasi`
- `Konfigurasi`

- `Community write`
- `—`
- `✓`
- `✓`

- `Jadwal, Kelas & Replay`
- `Preview`
- `Upgrade`
- `Aktif`

### Product rules

- `あ`
- `い`
- `う`
- `Aturan produk`

- `価`
- `Harga dinamis`
- `Tampil setelah level dan plan dipilih.`

- `鍵`
- `Backend authority`
- `Entitlement wajib diperiksa server.`

- `公`
- `Publish state`
- `Perubahan draft tidak tampil ke siswa.`

- `録`
- `Audit perubahan`
- `Akses sensitif perlu dicatat.`

### CTA

- `Buka Chapter Builder`

Destination → `431:406`

## Important rule

This screen verifies:

- only N1–N5;
- level purchase is independent;
- price is dynamic/Admin-configured;
- entitlement is server-authoritative;
- draft product changes do not automatically become student-visible.

---

# ADMIN / 07 — Penyusun Chapter

**Figma frame:** `431:406`

## Exact visible copy

### Header

- `ADMIN • CONTENT BUILDER`
- `Chapter Builder`
- `Atur struktur chapter, modul, assessment, publish state, dan completion rules.`
- `Pengelolaan Program`
- `Simpan Perubahan`

Destinations:

- `Pengelolaan Program` → `431:218`
- `Simpan Perubahan` → `657:2647`

### Search/program

- `⌕`
- `Cari chapter atau modul`
- `Program`
- `JLPT N4`
- `⌄`
- `Program Published`

### Syllabus

- `章`
- `Syllabus N4`
- `Jumlah chapter dari backend`

- `Chapter 1: Dasar N4`
- `Published`

- `Chapter 2: Transportasi`
- `Published`

- `Chapter 3: Aktivitas Harian`
- `Published`

- `Chapter 4: Pola Kalimat`
- `Draft`

- `Chapter 5: Kondisi & Kesehatan`
- `Draft`

- `Tambah Chapter`

`Tambah Chapter` scrolls to the editor.

### Current editor

- `N4 • CHAPTER 4 • DRAFT`
- `Pola Kalimat dan Kehidupan Sehari-hari`
- `ID, slug, dan urutan dikelola sistem.`
- `Publish Chapter`

`Publish Chapter` → `433:2630` — validation state

Fields:

- `Judul Chapter`
- `Pola Kalimat dan Kehidupan Sehari-hari`
- `Teks bantuan opsional`
- `Urutan`
- `4`
- `Teks bantuan opsional`

### Content list

- `Konten chapter`

#### Video

- `映`
- `VIDEO`
- `Video Lesson`
- `Configured`
- `URL, durasi, subtitle, dan sumber video.`
- `Edit`

#### Grammar module

- `文`
- `MODUL`
- `Modul Tata Bahasa`
- `Configured`
- `PDF tata bahasa dengan nama file editable.`
- `Edit`

#### Japanese characters / Kanji module

- `字`
- `MODUL`
- `Huruf Jepang & Kanji`
- `Configured`
- `PDF kedua sesuai scope final.`
- `Edit`

#### Flashcard

- `札`
- `LATIHAN`
- `Flashcard`
- `Configured`
- `Deck kosakata dan grammar.`
- `Edit`

#### Audio

- `聴`
- `ASSESSMENT`
- `Audio Question`
- `Configured`
- `Audio player, soal, dan opsi jawaban.`
- `Edit`

#### Reading & Checkpoint

- `読`
- `ASSESSMENT`
- `Reading & Checkpoint`
- `Configured`
- `Teks profesional, state pemula, dan unlock rules.`
- `Edit`

All edit actions scroll to the shared editor area.

### Jepang Pemula editor

- `BUAT JEPANG PEMULA • STATE EDITOR`
- `Pilih teks Jepang Profesional lalu buat versi Jepang Pemula`
- `Hasil muncul di atas teks sumber dan tetap dapat diedit. Bukan screen terpisah.`
- `Buat Jepang Pemula`

## Critical Japanese-content rule

Exactly two presentations:

- Jepang Profesional
- Jepang Pemula

`Jepang Pemula` is an editable state of the same content, not a separate third content mode or separate screen.

### Completion & access

- `Completion & Access`

- `重`
- `Completion weights`
- `Nilai dan bobot mengikuti konfigurasi admin.`

- `鍵`
- `Unlock rules`
- `Checkpoint dapat membutuhkan seluruh modul selesai.`

- `無`
- `Free access`
- `Chapter 1 dapat ditandai sebagai akses gratis.`

- `順`
- `Prerequisite`
- `Chapter mengikuti urutan atau aturan custom.`

### Footer

- `Buka Quiz Builder`

Destination → `431:582`

- `!`
- `Pengumuman`
- `Perubahan draft tidak tampil ke siswa sampai chapter dipublikasikan.`

---

# ADMIN / 08 — Penyusun Quiz

**Figma frame:** `431:582`

## Exact visible copy

### Header

- `ADMIN • ASSESSMENT BUILDER`
- `Quiz Builder`
- `Kelola Latihan dan Checkpoint Chapter: soal, gambar/audio, jawaban, penjelasan, randomization, timer, dan passing logic.`
- `Chapter Builder`
- `Simpan Quiz`

Destinations:

- `Chapter Builder` → `431:406`
- `Simpan Quiz` → `657:2708`

### Search / context

- `⌕`
- `Cari pertanyaan atau topik`
- `Assessment`
- `Chapter 4 • Checkpoint`
- `⌄`
- `Tambah Pertanyaan`

`Tambah Pertanyaan` scrolls to the question editor.

### Question bank

- `Bank pertanyaan`
- `Jumlah dan urutan dari konfigurasi.`

- `01`
- `Arti kosakata 毎朝`
- `Multiple Choice`
- `Ready`

- `02`
- `Pola kalimat rutinitas`
- `Multiple Choice`
- `Ready`

- `03`
- `Audio aktivitas pagi`
- `Audio`
- `Draft`

- `04`
- `Reading pendek`
- `Reading`
- `Ready`

- `05`
- `Kanji waktu`
- `Image`
- `Draft`

- `Import Pertanyaan`

`Import Pertanyaan` → `816:2622`

### Question editor

- `PERTANYAAN 01 • MULTIPLE CHOICE`
- `Editor pertanyaan`
- `Ready`

- `Tipe Soal`
- `Multiple Choice`
- `⌄`

- `Kesulitan`
- `Medium`
- `⌄`

- `◇`
- `Ringkasan`

### Optional media

- `画`
- `Media opsional`
- `Upload gambar atau audio sebagai media opsional pada soal Latihan atau Checkpoint.`
- `Upload Gambar / Audio`

Destination → `816:2622`

### Answers

- `Pilihan jawaban`
- `A. Setiap pagi`
- `Jawaban Benar`
- `B. Setiap malam`
- `Opsi`
- `C. Minggu depan`
- `Opsi`
- `D. Kemarin`
- `Opsi`

- `◇`
- `Ringkasan`

### Jepang Pemula

- `STATE JEPANG PEMULA`
- `Pilih teks Jepang Profesional pada prompt atau penjelasan.`
- `Buat Jepang Pemula`

### Assessment settings

- `Assessment settings`

- `乱`
- `Randomisasi soal`
- `Urutan dapat diacak per attempt.`
- `Config`

- `選`
- `Randomisasi opsi`
- `Pilihan jawaban dapat diacak.`
- `Config`

- `時`
- `Timer`
- `Durasi mengikuti assessment.`
- `Dinamis`

- `合`
- `Passing logic`
- `Nilai minimum dari admin.`
- `Dinamis`

- `再`
- `Attempt rules`
- `Jumlah percobaan dan cooldown.`
- `Dinamis`

### Student preview

- `Preview siswa`
- `Pilih arti yang tepat:`
- `毎朝`
- `A. Setiap pagi`
- `Buka Preview`

### Footer

- `Penyusun Try Out`

Destination → `431:727`

- `!`
- `Pengumuman`
- `Perubahan assessment aktif setelah disimpan dan dipublikasikan.`

---

# ADMIN / 09 — Penyusun Try Out

**Figma frame:** `431:727`

## Exact visible copy

### Header

- `ADMIN • KONFIGURASI TRY OUT`
- `Penyusun Try Out`
- `Atur bagian, bank soal, alokasi, timer, penilaian, kelulusan, percobaan, ulasan, dan status publikasi.`
- `Penyusun Quiz`
- `Simpan Try Out`

Destinations:

- `Penyusun Quiz` → `431:582`
- `Simpan Try Out` → `657:2769`

### Try Out context

- `Try Out`
- `JLPT N4 • Simulasi 1`
- `⌄`
- `Versi`
- `Draft Aktif`
- `⌄`
- `Pratinjau Try Out`
- `Publikasikan Try Out`

Destinations:

- `Pratinjau Try Out` scrolls within the frame
- `Publikasikan Try Out` → `653:2638`

### Metrics

- `Total soal`
- `Dinamis`
- `Dihitung dari section dan pool.`

- `Durasi`
- `Dinamis`
- `Timer mengikuti konfigurasi.`

- `Passing score`
- `Dinamis`
- `Nilai minimum dari admin.`

- `Aturan Percobaan`
- `Config`
- `Percobaan dan cooldown.`

### Sections

- `Section Try Out`
- `Urutan dan alokasi mengikuti konfigurasi.`

- `語`
- `Pengetahuan Bahasa`
- `Kosakata, grammar, kanji.`
- `Ready`

- `読`
- `Reading`
- `Teks pendek dan panjang.`
- `Ready`

- `聴`
- `Listening`
- `Audio dan percakapan.`
- `Draft`

- `Tambah Section`

### Current section editor

- `SECTION 01 • READY`
- `Pengetahuan Bahasa`
- `Ready`

- `Nama Section`
- `Pengetahuan Bahasa`
- `Teks bantuan opsional`

- `Urutan`
- `1`
- `Teks bantuan opsional`

### Question pools

- `Question pools`

- `語`
- `Kosakata N4`
- `Pool aktif`
- `Alokasi`
- `Dinamis`
- `Teks bantuan opsional`
- `Aktif`

- `文`
- `Grammar Chapter 1–12`
- `Pool aktif`
- `Alokasi`
- `Dinamis`
- `Teks bantuan opsional`
- `Aktif`

- `字`
- `Kanji N4`
- `Pool aktif`
- `Alokasi`
- `Dinamis`
- `Teks bantuan opsional`
- `Aktif`

### Section rules

- `Aturan section`

- `乱`
- `Randomisasi`
- `Ambil soal dari pool secara acak.`

- `時`
- `Timer section`
- `Durasi dapat diatur per section.`

- `戻`
- `Navigasi`
- `Atur izin kembali ke soal sebelumnya.`

### Allocation preview

- `Preview alokasi`
- `Kosakata`
- `Grammar`
- `Kanji`

### General settings

- `Pengaturan Umum`

- `時`
- `Total timer`
- `Gabungan atau per section.`
- `Dinamis`

- `点`
- `Scoring`
- `Bobot dan konversi nilai.`
- `Config`

- `合`
- `Passing logic`
- `Nilai lulus per assessment.`
- `Dinamis`

- `再`
- `Aturan Percobaan`
- `Percobaan dan cooldown.`
- `Config`

- `見`
- `Ulasan Jawaban`
- `Tampilkan review setelah selesai.`
- `Aktif`

- `保`
- `Autosave`
- `Simpan progres runner.`
- `Aktif`

### Publication checklist

- `Daftar Periksa Publikasi`
- `✓`
- `Semua section ready`
- `✓`
- `Question pool mencukupi`
- `!`
- `Listening media tersedia`
- `✓`
- `Scoring tervalidasi`
- `✓`
- `Result & review aktif`

- `!`
- `Pengumuman`
- `Try Out tidak dapat dipublikasikan sampai semua section dan media wajib siap.`

### Question image

- `MEDIA SOAL`
- `Upload gambar per soal (opsional). Gambar tampil di runner Try Out dan review jawaban.`
- `Upload Gambar`

### Access rules

- `ATURAN AKSES TRY OUT`
- `Atur siapa yang dapat membuka Try Out, kapan tersedia, prerequisite Chapter, jumlah attempt, dan izin ulasan.`

Fields:

- `Plan:`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`

- `Level`
- `N1–N5 / pilih beberapa`

- `Jadwal Akses`
- `Tanggal mulai dan berakhir`

- `Prerequisite`
- `Chapter tertentu / tanpa syarat`

- `Produk`
- `Plan + level yang dipilih`

- `Jumlah Attempt`
- `Dinamis dari Admin`

- `Cooldown`
- `Jeda antarpercobaan`

- `Ulasan Jawaban`
- `Aktif / Nonaktif`

- `Status Publikasi`
- `Draft / Terjadwal / Aktif`

### Backend rule

- `Backend memeriksa plan, level, tanggal, prerequisite, attempt, dan status review pada setiap akses.`

### Save access rule

- `Simpan Aturan Akses`

Destination → `799:2675`

## Important assessment rule

Do not hardcode Try Out question count, duration, passing score, attempt count, cooldown, review state, or access dates globally.

---

# ADMIN / 10 — Pengelolaan Perpustakaan Konten

**Figma frame:** `431:923`

## Exact visible copy

### Header

- `ADMIN • CONTENT LIBRARY`
- `Content Library Management`
- `Kelola reusable video, dua modul PDF, flashcard, audio, reading, image, dan metadata konten.`
- `Bulk Import CSV`
- `Tambah Konten`
- `Chapter Builder`

Destinations:

- `Bulk Import CSV` → `816:2622`
- `Tambah Konten` scrolls to editor
- `Chapter Builder` → `431:406`

### Summary

- `Published assets`
- `Dinamis`
- `Konten aktif dan reusable.`

- `Draft assets`
- `Dinamis`
- `Menunggu kelengkapan.`

- `Validation issues`
- `Dinamis`
- `File atau metadata bermasalah.`

- `Jepang Pemula`
- `Dinamis`
- `Konten dengan state pemula.`

### Filters

- `Semua`
- `Video`
- `PDF Modules`
- `Flashcard`
- `Audio`
- `Reading`
- `Images`
- `⌕`
- `Cari judul, tipe, level, atau chapter`
- `Level`
- `Semua Level`
- `⌄`
- `Status`
- `Semua Status`
- `⌄`

### Asset examples

#### Video

- `映`
- `Video Chapter 4`
- `Video`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Published`
- `Profesional`
- `Edit`

#### Grammar PDF

- `文`
- `Modul Tata Bahasa Ch.4`
- `PDF`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Published`
- `Pemula Ready`
- `Edit`

#### Kanji PDF

- `字`
- `Modul Huruf & Kanji Ch.4`
- `PDF`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Published`
- `Pemula Ready`
- `Edit`

#### Flashcard

- `札`
- `Deck Kosakata Chapter 4`
- `Flashcard`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Review`
- `Pemula Ready`
- `Edit`

#### Audio

- `聴`
- `Audio Rutinitas Pagi`
- `Audio`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Draft`
- `Profesional`
- `Edit`

#### Reading

- `読`
- `Reading Aktivitas Harian`
- `Reading`
- `N4 • Chapter 4`
- `Reusable assignment`
- `Published`
- `Pemula Ready`
- `Edit`

#### Image

- `画`
- `Illustration Set N4`
- `Image`
- `Shared Library`
- `Reusable assignment`
- `Published`
- `Profesional`
- `Edit`

All list `Edit` actions scroll to the shared editor.

### Pagination fixture

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected content

- `文`
- `Modul Tata Bahasa Chapter 4`
- `PDF • N4 • Chapter 4 • Published`
- `Published`

- `File name`
- `Editable per chapter`

- `Version`
- `Dikelola sistem`

- `Assignments`
- `Chapter dan library`

- `Jepang Pemula`
- `Ready`

- `Validation`
- `Passed`

### Jepang Pemula

- `JEPANG PEMULA`
- `State konten tersimpan dan dapat diedit; bukan screen terpisah.`

### Actions

- `Edit Konten`
- `Duplikasi`
- `Archive`

Destinations:

- `Edit Konten` → `816:2634`
- `Duplikasi` → `816:2634`
- `Archive` → `433:2654`

### Announcement

- `!`
- `Pengumuman`
- `Konten tidak dapat dipublikasikan jika file atau metadata wajib belum valid.`

---

# ADMIN / 11 — Penyusun Placement Test & Lead

**Figma frame:** `431:1116`

## Exact visible copy

### Header

- `ADMIN • PLACEMENT BUILDER & LEADS`
- `Placement Test Builder & Leads`
- `Kelola konfigurasi placement, question pool, rekomendasi level, lead, dan follow-up pipeline.`
- `Export`
- `Assign Leads`

Destinations:

- `Export` → `649:2719`
- `Assign Leads` scrolls to assignment controls

### Metrics

- `New leads`
- `Dinamis`
- `Lead placement baru.`

- `Follow-up`
- `Dinamis`
- `Sudah dihubungi.`

- `Registered`
- `Dinamis`
- `Sudah membuat akun.`

- `Conversion`
- `Dinamis`
- `Dihitung dari backend.`

### Filters

- `⌕`
- `Cari lead termasking, level, source, atau status`
- `Semua`
- `New`
- `Follow-up`
- `Registered`
- `N5`
- `N4`
- `N3`

### Lead list

#### Lead 1

- `Lead •••1`
- `Kontak dimasking`
- `N4`
- `Rekomendasi placement`
- `Landing • Organik`
- `Source / referral dinamis`
- `New Lead`
- `Detail`

#### Lead 2

- `Lead •••2`
- `Kontak dimasking`
- `N5`
- `Rekomendasi placement`
- `Referral • AFF•••02`
- `Source / referral dinamis`
- `Follow-up`
- `Detail`

#### Lead 3

- `Lead •••3`
- `Kontak dimasking`
- `N4`
- `Rekomendasi placement`
- `Blog • CTA`
- `Source / referral dinamis`
- `Registered`
- `Detail`

#### Lead 4

- `Lead •••4`
- `Kontak dimasking`
- `N3`
- `Rekomendasi placement`
- `Landing • Organik`
- `Source / referral dinamis`
- `Follow-up`
- `Detail`

#### Lead 5

- `Lead •••5`
- `Kontak dimasking`
- `N5`
- `Rekomendasi placement`
- `Placement Direct`
- `Source / referral dinamis`
- `Expired`
- `Detail`

All Detail actions scroll to the lead-detail area.

### Pagination fixture

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Placement builder

- `PLACEMENT TEST BUILDER`
- `20 soal • 5 menit • hasil langsung`
- `Config Ready`

- `20`
- `Soal`

- `5m`
- `Timer`

- `4`
- `Section`

- `Auto`
- `Result`

Sections:

- `Bunpou`
- `Moji Goi`
- `Dokkai`
- `Choukai`

- `Question pool, scoring, dan rekomendasi level mengikuti backend.`
- `Kelola Builder`

`Kelola Builder` → `431:582`

## Exact-copy scope note

`20 soal • 5 menit • hasil langsung` is explicit visible Figma copy for Placement. Preserve it unless a later client revision changes it.

### Selected lead

- `LEAD •••1`
- `Rekomendasi N4`
- `New Lead`
- `N4`
- `Level`
- `—`
- `Score`
- `Lead`
- `Type`

Fields:

- `Nama`
- `Hilmi A.`

- `WhatsApp`
- `+62 812••••1234`

- `Target Ujian`
- `JLPT N4 • Desember 2026`

- `Rekomendasi`
- `N4`

- `Tanggal Pengerjaan`
- `05 Agustus 2026 • 20:14 WIB`

- `Source`
- `Landing • Organik`

- `Account Status`
- `Belum terdaftar`

### Pipeline

- `FOLLOW-UP PIPELINE`
- `✓`
- `Placement selesai`
- `2`
- `Follow-up admin`
- `3`
- `Register account`
- `4`
- `Invoice dibuat`
- `5`
- `Membership aktif`

### Lead actions

- `Assign To`
- `Admin / Sales`
- `⌄`
- `◇`
- `Ringkasan`
- `Mark Contacted`
- `Kirim Link Daftar`
- `Close Lead`

Destinations:

- `Mark Contacted` → `649:2899`
- `Kirim Link Daftar` → `649:2959`
- `Close Lead` → `649:2661`

### Privacy

- `PRIVACY`
- `Akses data lead, export, dan follow-up mengikuti role serta audit policy.`

## Privacy rule

Keep personal lead data masked in frontend fixtures. Real access/export must later be permission controlled and audited.

---

# ADMIN / 12 — Assessment Results

**Figma frame:** `431:1323`

## Exact visible copy

### Header

- `ADMIN • ASSESSMENT REPORTING`
- `Assessment Results`
- `Tinjau Placement, Checkpoint Chapter, Mini Checkpoint, Try Out, skor, status lulus/tidak lulus, timer, review, dan hasil per level.`
- `Ekspor`

`Ekspor` → `433:2702`

### Metrics

- `Completed attempts`
- `Dinamis`
- `Attempt yang selesai.`

- `Passed`
- `Dinamis`
- `Mengikuti passing logic.`

- `Needs review`
- `Dinamis`
- `Performa di bawah rule.`

- `Review opened`
- `Dinamis`
- `Pengguna membuka review.`

### Filters

- `⌕`
- `Cari pengguna termasking atau assessment`
- `Tipe`
- `Semua Assessment`
- `⌄`
- `Level`
- `Semua Level`
- `⌄`
- `Periode`
- `Periode Backend`
- `⌄`

### Result rows

#### Try Out

- `Member •••1`
- `Data pengguna dimasking`
- `Try Out N4 • Simulasi 1`
- `N4`
- `153 / 180`
- `Nilai contoh / backend`
- `Passed`
- `Detail`

#### Checkpoint

- `Member •••2`
- `Data pengguna dimasking`
- `Checkpoint Chapter 4`
- `N4`
- `8 / 10`
- `Nilai contoh / backend`
- `Passed`
- `Detail`

#### Placement

- `Member •••3`
- `Data pengguna dimasking`
- `Placement Test`
- `Rekomendasi N5`
- `Completed`
- `Nilai contoh / backend`
- `Completed`
- `Detail`

#### Mini Checkpoint

- `Member •••4`
- `Data pengguna dimasking`
- `Mini Checkpoint N4 • Sesi 2 Part 1`
- `N4`
- `—`
- `82 • LULUS`
- `LULUS`
- `Detail`

#### Other Checkpoint

- `Member •••5`
- `Data pengguna dimasking`
- `Checkpoint Chapter 3`
- `N4`
- `—`
- `Nilai contoh / backend`
- `Completed`
- `Detail`

### Pagination fixture

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected result fixture

- `MEMBER •••1`
- `Mini Checkpoint N4 • Sesi 2 Part 1`
- `LULUS`
- `82`
- `Total Score / Status`
- `12:34`
- `Waktu / Timer`
- `8 / 10`
- `Benar`

### Breakdown

- `Breakdown per section`
- `Pengetahuan Bahasa`
- `86%`
- `Reading`
- `78%`
- `Listening`
- `67%`

### Review

- `REVIEW STATE`
- `Review jawaban tersedia sesuai konfigurasi assessment dan permission.`
- `Buka Review`
- `Unduh`
- `Attempt Detail`

Destinations:

- `Buka Review` → `816:2646`
- `Unduh` → `433:2702`
- `Attempt Detail` → `816:2646`

### Governance

- `DATA GOVERNANCE`
- `Nilai, export, dan data pengguna mengikuti permission, masking, serta backend source of truth.`

---

# ADMIN / 31 — Mini Checkpoint Builder

**Figma frame:** `998:2616`

## Exact visible copy

### Header

- `ADMIN • MINI CHECKPOINT BUILDER`
- `Mini Checkpoint Builder`
- `Kelola Mini Checkpoint khusus LMS Plus: level N5–N2, sesi, part, timer, passing score, soal, gambar, review, dan publish.`
- `Chapter Builder`
- `Simpan Mini Checkpoint`

Prototype destination note:

The Figma node for `Simpan Mini Checkpoint` is currently named `Tombol / Simpan Quiz` and routes to `657:2708`.

Preserve the visible label `Simpan Mini Checkpoint`; do not expose internal node naming to users.

### Search/context

- `⌕`
- `Cari pertanyaan atau topik`
- `Mini Checkpoint`
- `N4 • Sesi 2 • Part 1`
- `⌄`
- `Tambah Pertanyaan`

`Tambah Pertanyaan` scrolls to the editor.

### Level / session / part

- `LEVEL / SESI / PART`
- `Level: N4`
- `Sesi: 2`
- `Part: 1`
- `Timer: Config`
- `Passing: Config`

### Question bank

- `Bank pertanyaan`
- `Jumlah dan urutan dari konfigurasi.`

- `01`
- `Arti kosakata 毎朝`
- `Multiple Choice`
- `Ready`

- `02`
- `Pola kalimat rutinitas`
- `Multiple Choice`
- `Ready`

- `03`
- `Audio aktivitas pagi`
- `Audio`
- `Draft`

- `04`
- `Reading pendek`
- `Reading`
- `Ready`

- `05`
- `Kanji waktu`
- `Image`
- `Draft`

- `Import Pertanyaan`

`Import Pertanyaan` → `816:2622`

### Editor

- `PERTANYAAN 01 • MULTIPLE CHOICE`
- `Editor pertanyaan`
- `Ready`

- `Tipe Soal`
- `Multiple Choice`
- `⌄`

- `Kesulitan`
- `Medium`
- `⌄`

- `◇`
- `Ringkasan`

### Optional media

- `画`
- `Media opsional`
- `Upload gambar opsional untuk soal Mini Checkpoint.`
- `Upload Gambar`

Destination → `816:2622`

### Answers

- `Pilihan jawaban`
- `A. Setiap pagi`
- `Jawaban Benar`
- `B. Setiap malam`
- `Opsi`
- `C. Minggu depan`
- `Opsi`
- `D. Kemarin`
- `Opsi`

- `◇`
- `Ringkasan`

### Jepang Pemula

- `STATE JEPANG PEMULA`
- `Pilih teks Jepang Profesional pada prompt atau penjelasan.`
- `Buat Jepang Pemula`

### Settings

- `Mini Checkpoint settings`

- `乱`
- `Randomisasi soal`
- `Urutan dapat diacak per attempt.`
- `Config`

- `選`
- `Randomisasi opsi`
- `Pilihan jawaban dapat diacak.`
- `Config`

- `時`
- `Timer`
- `Durasi mengikuti assessment.`
- `Dinamis`

- `合`
- `Passing logic`
- `Nilai minimum dari admin.`
- `Dinamis`

- `再`
- `Attempt rules`
- `Jumlah percobaan dan cooldown.`
- `Dinamis`

### Student preview

- `Preview siswa`
- `Pilih arti yang tepat:`
- `毎朝`
- `A. Setiap pagi`
- `Buka Preview`

### Footer

- `Cohort & Kelas`

The prototype destination for the final button goes to:

- `432:2770`

- `!`
- `Pengumuman`
- `Perubahan assessment aktif setelah disimpan dan dipublikasikan.`

## Mini Checkpoint rule

The active Admin Figma explicitly states:

- Mini Checkpoint is for `LMS Plus`;
- supported levels are `N5–N2`;
- structure is level → sesi → part;
- timer, passing score, attempts, questions, review, and publication are configurable.

Do not expand this to N1 unless a later client revision explicitly says so.

---

# Verified Layer B operational flow

```text
Dashboard Admin
├─ Program
│   └─ Chapter Builder
│       ├─ Quiz Builder
│       │   └─ Try Out Builder
│       └─ Content Library
├─ Placement Test & Leads
├─ Assessment Results
└─ Mini Checkpoint Builder

Try Out Builder
└─ Access-rule state / publication validation

Mini Checkpoint Builder
└─ Cohort & Kelas
```

---

# Important Admin product rules verified in Layer B

- Admin Console is permission-sensitive.
- Admin does not need a separate public Login UI under the latest product decision.
- N1–N5 products are independent; there is no purchase prerequisite between levels.
- Prices are dynamic and Admin-configured.
- Free Chapter access is configurable and Chapter 1 can be marked free.
- Draft content/product changes are not student-visible until published.
- Japanese content uses exactly two states: Jepang Profesional and Jepang Pemula.
- Quiz/Checkpoint settings are configurable, not hardcoded.
- Try Out access can depend on plan, level, date, Chapter prerequisite, attempts, cooldown, review permission, and publication status.
- Placement active Figma uses 20 questions, about 5 minutes, four sections, and direct result.
- Lead/contact data must be masked and permission/audit controlled.
- Assessment results aggregate Placement, Chapter Checkpoint, Mini Checkpoint, Quiz, and Try Out.
- Mini Checkpoint is N5–N2 and uses level → sesi → part.
- All security-sensitive, entitlement, transaction, publish, export, and PII operations remain backend-authoritative later.

---

# Dynamic / fixture values that must remain replaceable

Do not promote these examples into permanent constants unless separately approved:

- KPI totals
- exact queue items
- `Hilmi A.`, `Rina P.`, `Dimas K.`
- masked WhatsApp values
- dates/times
- active/draft counts
- actual prices
- chapter counts
- N4 / Chapter 4 as current editor fixture
- assessment question examples
- `Medium`
- Try Out question counts/timers/pass score/attempts
- Content Library `148` result count
- lead count/conversion
- referral/source examples
- Assessment Result scores
- Mini Checkpoint example `N4 • Sesi 2 • Part 1`
- Mini Checkpoint score `82`
- timer `12:34`
- section percentages

---

# Layer B frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse one Admin Console shell/navigation.
4. Do not build a separate `/admin/login`; reuse shared auth.
5. Keep Admin frontend permission-aware in presentation, but do not treat browser checks as production authorization.
6. Keep N1–N5 product configuration independent.
7. Do not hardcode prices or commercial values.
8. Preserve draft/published distinction.
9. Use only Jepang Profesional and Jepang Pemula.
10. Keep assessment settings configurable rather than hardcoded into shared components.
11. Keep Try Out, Chapter Checkpoint, Placement, and Mini Checkpoint conceptually distinct even if shared UI primitives are reused.
12. Mini Checkpoint remains N5–N2 unless client authority changes.
13. Keep PII masked in deterministic fixtures.
14. Do not implement Laravel/Sanctum, database persistence, file storage, bulk import, export generation, payment verification, server timers, scoring authority, audit logging, role enforcement, or publication backend during this contract phase.
15. Operational/state nodes reached from this layer are documented later in Page 11 Layer F/G; do not invent their exact copy.
16. Avoid unrelated frontend refactors when implementing one Admin screen batch.
