# D-LEARNING — Page 10 / Belajar dengan Sensei

> Figma source: **Page 10 — E2E / Belajar dengan Sensei** (`388:16`)  
> Layer: **D — Alur Belajar**  
> Screens: **SENSEI / 18–29**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED where listed**
- Runtime/progress/question values: **FIXTURE / MOCK where noted**
- State destinations outside this layer are referenced by node ID only; their exact copy belongs to the relevant state/supporting contract.
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API work while implementing this frontend-first layer.

---

# Shared Sensei student shell

All Layer D screens use the same Sensei student sidebar family.

## Exact sidebar copy

- `Hiru Academy`
- `BELAJAR BAHASA JEPANG`
- `Dashboard`
- `Kelas Saya`
- `Kumpulan Flashcard`
- `Latihan Harian`
- `Try Out`
- `Perpustakaan`
- `Jadwal`
- `Replay`
- `Tanya Sensei`
- `Komunitas`
- `Progres`
- `Sertifikat`
- `Notifikasi`
- `Profil`
- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

## Common verified sidebar destinations

- Dashboard → `419:2690`
- Kelas Saya → `418:566`
- Kumpulan Flashcard → `418:1823`
- Latihan Harian → `418:3231`
- Try Out → `418:3518`
- Perpustakaan → `418:4664`
- Jadwal → `419:2913`
- Replay → `419:3437`
- Tanya Sensei → `425:3524`
- Komunitas → `425:3073`
- Progres → `418:4930`
- Sertifikat → `418:6119`
- Notifikasi → `418:6814`
- Profil → `418:7128`

Reuse the shared student navigation. Do not build a separate sidebar for each learning screen.

---

# Sensei entitlement principle for Layer D

Belajar dengan Sensei keeps the full LMS learning journey and adds cohort context.

The active Figma fixture shows:

- N4 and N3 active
- active cohorts tied to those levels
- N5, N2, and N1 not purchased
- current study example at N4 / Chapter 4

These are **sample account/cohort values**, not permanent business rules.

Important behavior verified by Figma:

- N1–N5 purchases are independent;
- purchased levels keep separate progress;
- cohort, schedule, and replay also follow the active level/program;
- unpurchased levels stay visible and can enter a purchase path;
- Chapter progression inside an active level remains separate from purchase entitlement;
- Sensei-owned supporting features remain available; do not downgrade them to LMS-style locked previews.

---

# SENSEI / 18 — Perjalanan Level

**Figma frame:** `418:566`

## Exact visible copy

### Header

- `KURSUS SAYA • LEVEL & COHORT AKTIF`
- `Kelola beberapa level aktif bersama Sensei`
- `Level N1–N5 dapat dibeli bebas. Jadwal, cohort, dan replay mengikuti level serta program yang aktif pada akun.`

### Active level summary

- `2 LEVEL AKTIF`
- `JLPT N4 dan N3 aktif bersama Sensei`
- `Lanjutkan N4 atau buka N3. Progress, jadwal kelas, dan replay disimpan per level serta cohort oleh backend.`
- `Lanjutkan N4`
- `Kembali Dashboard`
- `◕`
- `Progress dari backend`

Destinations:

- `Lanjutkan N4` → `418:786`
- `Kembali Dashboard` → `419:2690`

### Level section

- `Level berdasarkan pembelian`
- `Tidak ada prerequisite antarlevel. Status kelas aktif mengikuti entitlement dan cohort.`

#### N5

- `N5`
- `BELUM DIBELI`
- `N5 — Dasar`
- `Dapat dibeli langsung; cohort N4 dan N3 tetap aktif tanpa perubahan.`
- `Lihat Paket N5 →`
- `→`

Destination:

- `730:4009` — purchase/access state outside Layer D

#### N4

- `N4`
- `SEDANG DIPELAJARI`
- `N4 — Pemula Lanjutan`
- `Journey, kelas Sensei, jadwal, dan replay aktif pada level N4.`
- `Lanjutkan N4 →`
- `→`

Destination:

- `418:786`

#### N3

- `N3`
- `LEVEL & COHORT AKTIF`
- `N3 — Menengah`
- `Level aktif kedua dengan journey dan cohort yang disimpan terpisah.`
- `Buka Journey N3 →`
- `→`

Destination:

- `418:786`

#### N2

- `N2`
- `BELUM DIBELI`
- `N2 — Lanjut`
- `Dapat ditambahkan tanpa menyelesaikan N3; jadwal dibuat setelah aktivasi.`
- `Lihat Paket N2 →`
- `→`

Destination:

- `730:4009`

#### N1

- `N1`
- `BELUM DIBELI`
- `N1 — Mahir`
- `Beli independen sesuai target ujian dan ketersediaan cohort.`
- `Lihat Paket N1 →`
- `→`

Destination:

- `730:4009`

### Activity section

- `Aktivitas minggu ini`
- `★`
- `XP Mingguan`
- `— XP`
- `♨`
- `XP Mingguan`
- `— XP`
- `♛`
- `XP Mingguan`
- `— XP`

The Figma repeats `XP Mingguan` three times. Preserve the verified copy until the Figma/client source is explicitly revised.

### Announcement

- `ℹ`
- `Pengumuman`
- `Satu akun dapat memiliki beberapa level dan cohort aktif. Progress, jadwal, serta replay disimpan per level; pembelian level lain tidak harus berurutan.`

## Fixture rule

Do not hardcode:

- exactly two active levels;
- N4 and N3 ownership;
- cohort count;
- XP values.

---

# SENSEI / 19 — Perjalanan Chapter

**Figma frame:** `418:786`

## Exact visible copy

### Header

- `LEVEL AKTIF TERPILIH • CHAPTER JOURNEY`
- `Lanjutkan Chapter pada level dan cohort yang dipilih`
- `Nama level, Chapter, jadwal, dan progress dimuat berdasarkan level aktif yang dipilih.`

### Level progress

- `PROGRES LEVEL TERPILIH`
- `Chapter 4 dari 12`
- `Progress, kelas Sensei, dan replay level lain tetap disimpan secara terpisah.`
- `▰`
- `Progress dari backend`

### Chapter 01

- `01`
- `Tata Bahasa Dasar N4`
- `Video • 2 modul • flashcard • audio • reading • checkpoint`
- `Selesai`

### Chapter 02

- `02`
- `Transportasi dan Arah`
- `Video • 2 modul • flashcard • audio • reading • checkpoint`
- `Selesai`

### Chapter 03

- `03`
- `Aktivitas Harian`
- `Video • 2 modul • flashcard • audio • reading • checkpoint`
- `Selesai`

### Chapter 04

- `04`
- `Pola Kalimat & Kehidupan`
- `Video • 2 modul • flashcard • audio • reading • checkpoint`
- `Lanjutkan`

Destination:

- `418:997` — Ringkasan Chapter

### Chapter 05

- `05`
- `Kesehatan dan Kondisi`
- `Video • 2 modul • flashcard • audio • reading • checkpoint`
- `Terkunci`

### Final Chapter preview

- `12`
- `Chapter Terakhir — Penyelesaian Level`
- `Selesaikan seluruh aktivitas untuk membuka Feedback Akhir Level.`
- `Simulasi Akhir`

Destination:

- `765:4477` — completion/state flow outside Layer D

### Milestone

- `Milestone berikutnya`
- `Selesaikan Chapter 4 untuk membuka materi berikutnya dan menjaga streak.`
- `♨`
- `XP Mingguan`
- `— XP`

### Back action

- `Kembali ke Level`

Destination:

- `418:566`

## Important interpretation

`Terkunci` on Chapter 05 is a **learning progression state inside an owned level**, not a signal that Sensei lacks entitlement to the level.

Do not collapse:

- level purchase entitlement,
- cohort entitlement,
- Chapter progression,
- or Sensei feature entitlement

into one generic lock condition.

---

# SENSEI / 20 — Ringkasan Chapter

**Figma frame:** `418:997`

## Exact visible copy

### Header

- `N4 • CHAPTER 4`
- `Pola Kalimat dan Kehidupan Sehari-hari`
- `Selesaikan setiap modul untuk membuka checkpoint dan melanjutkan journey.`

### Progress

- `CHAPTER PROGRESS`
- `2 dari 7 aktivitas selesai`
- `Lanjutkan video, dua modul, flashcard, audio, reading, lalu checkpoint.`
- `▰`
- `Progress dari backend`

### Activity section

- `Aktivitas chapter`
- `Lanjutkan`

#### Video

- `Video Lesson`
- `Tonton penjelasan utama chapter.`
- `Belum Mulai`

Destination:

- `418:1215`

#### Modul Tata Bahasa

- `Modul Tata Bahasa`
- `Baca dan tandai poin penting.`
- `Belum Mulai`

Destination:

- `418:1419`

#### Modul Huruf Jepang & Kanji

- `Modul Huruf Jepang & Kanji`
- `Pelajari huruf dan kanji terkait.`
- `Belum Mulai`

Destination:

- `418:1621`

#### Flashcard

- `Flashcard`
- `Ulangi kosakata dan pola penting.`
- `Belum Mulai`

Destination:

- `418:2228`

#### Audio

- `Audio Question`
- `Latih pemahaman listening.`
- `Belum Mulai`

Destination:

- `418:2641`

#### Reading

- `Reading Question`
- `Baca teks dan jawab pertanyaan.`

Destination:

- `418:2839`

### Checkpoint lock presentation

- `CHECKPOINT TERKUNCI`
- `Selesaikan seluruh aktivitas sebelum checkpoint`
- `Status akan berubah otomatis setelah persyaratan chapter terpenuhi.`
- `Terkunci`

### Back action

- `Kembali ke Journey`

Destination:

- `418:786`

## Fixture values

- N4
- Chapter 4
- `2 dari 7 aktivitas selesai`

are sample/runtime values.

---

# SENSEI / 21 — Pelajaran Video

**Figma frame:** `418:1215`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • VIDEO`
- `Pola kalimat untuk aktivitas sehari-hari`
- `Tonton video, tandai selesai, lalu lanjutkan ke modul berikutnya.`

### Video

- `▶`
- `Mulai video`
- `YouTube • lazy-loaded`
- `Durasi dan sumber video mengikuti konfigurasi konten.`
- `Tandai Selesai`

Destination:

- `Tandai Selesai` → `418:1419`

### Tabs

- `Ringkasan`
- `Transkrip`
- `Catatan`

### Summary

- `Ringkasan materi`
- `Video membahas pola kalimat yang digunakan untuk menjelaskan rutinitas, kebiasaan, dan aktivitas sehari-hari. Gunakan transkrip dan catatan untuk meninjau kembali contoh penting.`

### Topic markers

- `時`
- `Waktu`
- `習`
- `Kebiasaan`
- `動`
- `Aktivitas`

### Chapter contents

- `Isi Chapter 4`
- `01`
- `Video Lesson`
- `02`
- `Modul Tata Bahasa`
- `03`
- `Modul Huruf & Kanji`
- `04`
- `Flashcard`
- `05`
- `Audio`
- `06`
- `Reading`
- `07`
- `Checkpoint`
- `Progress dari backend`

### Back action

- `Kembali ke Chapter`

Destination:

- `418:997`

## Frontend-first rule

Do not integrate real video/media backend during this contract phase. Deterministic local presentation is sufficient until media integration is explicitly scheduled.

---

# SENSEI / 22 — Modul Tata Bahasa

**Figma frame:** `418:1419`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • MODUL TATA BAHASA`
- `Modul Tata Bahasa — Pola Kalimat Sehari-hari`
- `Baca materi, bookmark halaman penting, dan lanjutkan setelah memahami contoh utama.`

### Document controls

- `N4-Chapter-04-Modul-Tata-Bahasa.pdf`
- `Nama file dapat diedit per chapter oleh admin.`
- `−`
- `100%`
- `+`
- `Unduh`

### Pages

- `文`
- `Halaman 1`
- `型`
- `Halaman 2`
- `例`
- `Halaman 3`
- `練`
- `Halaman 4`
- `要`
- `Halaman 5`

### Content

- `HALAMAN 1 • PENGANTAR`
- `Mengenal pola kalimat untuk rutinitas`
- `Pola kalimat membantu menyusun informasi tentang waktu, kebiasaan, dan aktivitas secara runtut.`

### Keywords

- `時`
- `waktu`
- `毎`
- `setiap`
- `習`
- `kebiasaan`

### Structure

- `Struktur dasar`
- `Mulai dari penanda waktu, subjek atau topik, lalu aktivitas. Perhatikan perubahan bentuk kata kerja sesuai konteks dan tingkat kesopanan.`

### Example

- `Contoh`
- `毎朝、日本語を勉強します。 • Saya belajar Bahasa Jepang setiap pagi.`

### Bookmark & notes

- `Bookmark & Catatan`
- `★`
- `Pola utama`
- `Tandai struktur kalimat yang sering digunakan.`
- `文`
- `Contoh`
- `Bandingkan beberapa konteks penggunaan.`
- `練`
- `Latihan`
- `Coba tulis satu kalimat rutinitasmu.`

### Navigation

- `Halaman 1 dari 12`
- `Kembali ke Video`
- `Modul Huruf & Kanji`

Destinations:

- `Kembali ke Video` → `418:1215`
- `Modul Huruf & Kanji` → `418:1621`

## Frontend-first rule

Do not build document upload/storage backend during this task.

---

# SENSEI / 23 — Modul Huruf Jepang & Kanji

**Figma frame:** `418:1621`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • MODUL HURUF JEPANG & KANJI`
- `Modul Huruf Jepang & Kanji — Chapter 4`
- `Pelajari huruf dan kanji chapter dengan contoh bacaan serta konteks penggunaan.`

### Document controls

- `N4-Chapter-04-Modul-Huruf-Jepang-Kanji.pdf`
- `Nama file dapat diedit per chapter oleh admin.`
- `−`
- `100%`
- `+`
- `Unduh`

### Pages

- `字`
- `Halaman 1`
- `読`
- `Halaman 2`
- `書`
- `Halaman 3`
- `例`
- `Halaman 4`
- `復`
- `Halaman 5`

### Content

- `HALAMAN 1 • KANJI UTAMA`
- `Kanji untuk waktu dan aktivitas`
- `Pelajari bentuk, bacaan, arti, dan contoh penggunaan setiap kanji dalam kalimat.`

### Kanji examples

- `時`
- `waktu / ji`
- `朝`
- `pagi / asa`
- `毎`
- `setiap / mai`

### Learning method

- `Cara mempelajari kanji`
- `Amati komponen bentuk, hubungkan dengan arti, lalu ulangi melalui flashcard dan contoh kalimat. Gunakan Jepang Pemula bila teks profesional perlu disederhanakan.`

### Reading example

- `Contoh bacaan`
- `毎朝（まいあさ）• setiap pagi　時間（じかん）• waktu / durasi`

### Bookmark & notes

- `Bookmark & Catatan`
- `字`
- `Bentuk`
- `Perhatikan komponen dan arah goresan.`
- `読`
- `Bacaan`
- `Catat on-yomi dan kun-yomi yang relevan.`
- `復`
- `Ulangi`
- `Lanjutkan ke flashcard setelah membaca.`

### Navigation

- `Halaman 1 dari 12`
- `Modul Tata Bahasa`
- `Buka Kumpulan Flashcard`

Destinations:

- `Modul Tata Bahasa` → `418:1419`
- `Buka Kumpulan Flashcard` → `418:1823`

## Japanese mode rule

Use exactly two Japanese presentations:

- Jepang Profesional
- Jepang Pemula

Do not create a third mode.

---

# SENSEI / 24 — Kumpulan Flashcard

**Figma frame:** `418:1823`

## Exact visible copy

### Header

- `KUMPULAN FLASHCARD`
- `Hafalkan kosakata tanpa membuka Journey satu per satu`
- `Semua deck pada level dan membership aktif dapat dipelajari langsung. Progress serta jumlah kartu berasal dari backend.`
- `SENSEI`

### Summary metrics

- `KARTU DIPELAJARI`
- `—`
- `Progress tersimpan`

- `PERLU DIULANG`
- `—`
- `Berdasarkan confidence`

- `DECK SELESAI`
- `—`
- `Dari backend`

- `STREAK FLASHCARD`
- `—`
- `Hari aktif`

### Search / filters

- `⌕`
- `Cari deck, chapter, atau kosakata`
- `Semua Deck`
- `N5`
- `Chapter 1`
- `Perlu Diulang`

### Deck section

- `Deck yang dapat dipelajari`
- `Belajar dengan Sensei mendapatkan seluruh deck pada level dan membership aktif.`
- `FULL ACCESS`

### Deck 1

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Kosakata Chapter 1`
- `Kosakata utama dari chapter gratis yang sudah terbuka.`
- `Progress dan confidence diperbarui otomatis.`
- `Mulai`

### Deck 2

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Huruf Jepang Dasar`
- `Deck penguatan hiragana, katakana, dan pengenalan kanji.`
- `Progress dan confidence diperbarui otomatis.`
- `Lanjutkan`

### Deck 3

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Pola Kalimat Chapter 1`
- `Flashcard grammar ringkas untuk review cepat.`
- `Progress dan confidence diperbarui otomatis.`
- `Ulangi`

### Deck 4

- `JLPT N5 • CHAPTER 2`
- `TERSEDIA`
- `Kosakata Chapter 2`
- `Kosakata lanjutan untuk chapter berikutnya pada level aktif.`
- `Progress dan confidence diperbarui otomatis.`
- `Mulai`

### Access summary

- `Akses Belajar dengan Sensei`
- `Semua deck pada level aktif tersedia. Progress, confidence, dan rekomendasi pengulangan disimpan oleh backend.`
- `Lihat Progress`

Destination:

- `Lihat Progress` → `418:4930`

## Interaction note

The individual deck cards in this frame do not expose verified prototype destinations.

Do not invent a client-approved destination from this screen alone. Reuse the shared Flashcard Session architecture later only when the implementation batch maps the intended deck-entry behavior.

---

# SENSEI / 25 — Sesi Flashcard

**Figma frame:** `418:2228`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • FLASHCARD`
- `Ulangi kosakata dan pola penting`
- `Balik kartu, pilih tingkat keyakinan, lalu lanjutkan sampai seluruh deck selesai.`

### Deck summary

- `Deck Chapter 4`
- `7 dari 20 kartu`

### Categories

- `語`
- `Kosakata`
- `8 kartu`

- `文`
- `Pola Kalimat`
- `7 kartu`

- `字`
- `Kanji`
- `5 kartu`

### Utility

- `Kembali ke Kumpulan`
- `Tips mengulang`
- `Ucapkan kata sebelum membalik kartu.`
- `Baca contoh kalimat setelah melihat arti.`
- `Pilih Ulangi bila belum yakin.`

### XP

- `★`
- `XP Mingguan`
- `— XP`

### Card

- `日本語`
- `にほんご`
- `Klik untuk melihat arti`
- `Klik kartu untuk melihat arti dan contoh.`

### Controls

- `Balik Kartu`
- `Ulangi`
- `Sulit`
- `Mudah`
- `Lihat State Selesai`

Destinations:

- `Kembali ke Kumpulan` → `418:1823`
- finish / `Lihat State Selesai` → `418:2459`

## Interaction behavior

Preserve the project's established flashcard flip interaction and reduced-motion behavior.

Counts shown here are fixture values.

---

# SENSEI / 26 — Flashcard Selesai

**Figma frame:** `418:2459`

## Exact visible copy

### Completion

- `FLASHCARD SELESAI`
- `Deck Chapter 4 sudah ditinjau`
- `Kartu yang sulit dapat diulang sebelum melanjutkan ke Audio Question.`

### Summary

- `日本語`
- `にほんご`
- `Klik untuk melihat arti`
- `20 kartu selesai`
- `Sebagian besar kartu sudah dipahami. Ulangi kartu yang ditandai Sulit sebelum checkpoint.`

### Confidence

- `13`
- `Mudah`
- `5`
- `Sulit`
- `2`
- `Ulangi`

### Actions

- `Ulangi Kartu Sulit`
- `Lanjut Audio Question`

Destinations:

- `Ulangi Kartu Sulit` → `418:2228`
- `Lanjut Audio Question` → `418:2641`

### Repeat section

- `Kartu yang perlu diulang`

Three visible example cards repeat:

- `日本語`
- `にほんご`
- `Klik untuk melihat arti`

### Announcement

- `✓`
- `Pengumuman`
- `Progress deck disimpan. Lanjutkan ke Audio Question atau ulangi kartu sulit.`

## Fixture values

`20`, `13`, `5`, and `2` are sample/demo values.

---

# SENSEI / 27 — Soal Audio

**Figma frame:** `418:2641`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • AUDIO QUESTION`
- `Dengarkan percakapan dan pilih jawaban yang tepat`
- `Audio dapat diputar ulang sesuai konfigurasi soal.`

### Audio

- `❚❚`
- `Percakapan tentang rutinitas pagi`
- `01:12 / 02:14`

### Question

- `SOAL 1 DARI 5`
- `Apa aktivitas yang dilakukan pembicara setiap pagi?`
- `Dengarkan audio sampai selesai sebelum memilih jawaban.`

### Answers

- `A. Membaca koran`
- `B. Belajar Bahasa Jepang`
- `C. Berangkat ke stasiun`
- `D. Memasak sarapan`

### Navigation

- `Kembali Flashcard`
- `Lanjut Reading`

Destinations:

- `Kembali Flashcard` → `418:2459`
- `Lanjut Reading` → `418:2839`

### Progress

- `Audio Progress`
- `1 dari 5 soal`
- `Navigasi soal`
- `1`
- `2`
- `3`
- `4`
- `5`

### Information

- `Informasi`
- `Jawaban dapat diubah sebelum assessment diselesaikan.`

## Fixture rule

Audio timing, question count, content, and answer options are design/sample assessment data unless separately approved as production content.

---

# SENSEI / 28 — Soal Reading

**Figma frame:** `418:2839`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • READING QUESTION`
- `Baca teks pendek lalu jawab pertanyaan`
- `Teks Jepang Profesional dapat memiliki state Jepang Pemula pada implementasi.`

### Reading

- `TEKS BACAAN`
- `毎朝、田中さんは七時に起きます。朝ご飯を食べてから、日本語を三十分勉強します。そのあと、八時に会社へ行きます。`
- `Jepang Pemula tersedia sebagai state editor, bukan screen terpisah.`

### Question

- `SOAL 1 DARI 5`
- `Apa yang dilakukan Tanaka setelah sarapan?`

### Answers

- `A. Pergi ke perusahaan`
- `B. Belajar Bahasa Jepang`
- `C. Tidur kembali`
- `D. Membaca buku`

### Navigation

- `Kembali Audio`
- `Lanjut Checkpoint`

Destinations:

- `Kembali Audio` → `418:2641`
- `Lanjut Checkpoint` → `418:3028`

### Progress

- `Reading Progress`
- `1 dari 5 soal`
- `Navigasi soal`
- `1`
- `2`
- `3`
- `4`
- `5`

### Announcement

- `ℹ`
- `Pengumuman`
- `Jawaban dapat diubah sebelum assessment diselesaikan.`

## Japanese mode rule

Jepang Pemula is a presentation/state of the same content, not a separate screen.

Use only:

- Jepang Profesional
- Jepang Pemula

---

# SENSEI / 29 — Checkpoint

**Figma frame:** `418:3028`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • CHECKPOINT`
- `Uji pemahaman sebelum melanjutkan journey`
- `Checkpoint menggabungkan materi video, dua modul, flashcard, audio, dan reading.`

### Timer

- `◷`
- `08:24`

### Question

- `SOAL 1 DARI 10`
- `Pilih arti yang tepat untuk kata berikut:`
- `毎朝`
- `まいあさ`
- `Gambar soal dari Admin (opsional)`

### Answers

- `A. Setiap pagi`
- `B. Setiap malam`
- `C. Minggu depan`
- `D. Kemarin`

### Navigation

- `Kembali Reading`
- `Selesaikan Checkpoint`

Destinations:

- `Kembali Reading` → `418:2839`
- `Selesaikan Checkpoint` → `418:7478` — result/state outside Layer D

### Progress

- `Checkpoint Progress`
- `1 dari 10 soal`
- `Navigasi soal`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`

### Information

- `Informasi`
- `Jawaban dapat diubah sebelum assessment diselesaikan.`

### Submission

- `Pengiriman Jawaban`
- `Jawaban dikirim setelah checkpoint diselesaikan.`

## Fixture rule

Do not turn these Figma examples into permanent product rules:

- `08:24`
- 10 questions
- N4 / Chapter 4
- question/answer content
- optional media placeholder

---

# Verified Layer D flow

```text
Perjalanan Level
  ├─ owned level/cohort → Perjalanan Chapter
  └─ unpurchased level → purchase/access state

Perjalanan Chapter
  → Ringkasan Chapter
  → Pelajaran Video
  → Modul Tata Bahasa
  → Modul Huruf Jepang & Kanji
  → Kumpulan Flashcard
  → Sesi Flashcard
  → Flashcard Selesai
  → Soal Audio
  → Soal Reading
  → Checkpoint
  → Checkpoint result/state
```

Additional completion path:

```text
Chapter Terakhir — Penyelesaian Level
  → `765:4477`
```

Unpurchased level path:

```text
N5 / N2 / N1 belum dibeli
  → `730:4009`
```

Checkpoint result:

```text
Selesaikan Checkpoint
  → `418:7478`
```

Exact copy for those destination states must be extracted from their own Page 10 state/supporting layer before implementation if required.

---

# Differences from Page 09 / LMS Layer D

Do not merely duplicate the LMS contract.

Page 10 Sensei adds these verified differences:

- Level header references **LEVEL & COHORT AKTIF**.
- Active-level copy links progress with **jadwal kelas** and **replay**.
- N4 is described with active Journey, Sensei class, schedule, and replay.
- N3 is `LEVEL & COHORT AKTIF`.
- N2 activation copy references schedule creation after activation.
- N1 purchase copy references cohort availability.
- Chapter Journey copy says schedule and progress are loaded by the selected active level.
- Chapter progress copy preserves Sensei class and replay state for other levels.
- Flashcard collection badge is `SENSEI`.
- Flashcard access copy says `Akses Belajar dengan Sensei`.
- Sensei sidebar retains `Jadwal`, `Replay`, and `Tanya Sensei` across learning screens.

The main content sequence remains compatible with the shared Journey/Learning/Flashcard architecture.

---

# Dynamic / fixture values that must remain replaceable

Do not hardcode these as final business rules:

- `2 LEVEL AKTIF`
- N4 and N3 as the owned levels
- active cohort count
- N4 / Chapter 4
- `Chapter 4 dari 12`
- `2 dari 7 aktivitas selesai`
- XP values
- file names/page count
- Flashcard deck counts
- confidence totals
- audio duration
- 5 Audio questions
- 5 Reading questions
- Checkpoint timer `08:24`
- 10 Checkpoint questions
- example Japanese assessment content
- cohort availability
- schedule creation timing

They are fixture/configuration/backend-driven values in the design.

---

# Layer D frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the existing Journey, Learning, Flashcard, student shell, and assessment components.
4. Do not create separate implementations for N1–N5 when data/configuration can drive shared screens.
5. Keep level ownership, cohort entitlement, Chapter progression, and Sensei feature entitlement as distinct concepts.
6. Do not apply Free Chapter-1-only logic to Sensei.
7. Do not apply LMS Sensei-feature locks to Sensei-owned features.
8. Preserve unpurchased levels as visible purchase candidates.
9. Use exactly two Japanese presentations: Jepang Profesional and Jepang Pemula.
10. Treat all progress, chapter, timer, question, deck, cohort, and score-like values as deterministic fixtures unless separately approved.
11. Do not invent exact copy for external state nodes `730:4009`, `765:4477`, or `418:7478`.
12. Do not build Backend progress persistence, cohort scheduling, Zoom integration, replay storage, media storage, assessment persistence, server timer, scoring, attempts, certificate logic, or payment during this frontend-first contract phase.
13. Change only the active screen/batch during implementation; avoid unrelated refactors and speculative abstractions.
14. Preserve the existing flashcard flip feel and reduced-motion behavior.
