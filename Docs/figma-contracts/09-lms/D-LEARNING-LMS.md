# D-LEARNING — Page 09 / Belajar Mandiri

> Figma source: **Page 09 — E2E / Belajar Mandiri** (`388:9`)  
> Layer: **D — Alur Belajar Utama**  
> Screens: **LMS / 18–29**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED where listed**
- Runtime/progress/question values: **FIXTURE / MOCK where noted**
- State destinations outside this layer: keep as references and document exact state copy in Layer F
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API work while implementing this frontend-first layer.

---

# Shared student shell used in Layer D

All Layer D screens use the LMS student sidebar family.

## Exact sidebar copy

- `Hiru Academy`
- `BELAJAR BAHASA JEPANG`
- `Dashboard`
- `Kelas Saya`
- `Kumpulan Flashcard`
- `Latihan Harian`
- `Try Out`
- `Perpustakaan`
- `Komunitas`
- `Progres`
- `Sertifikat`
- `Notifikasi`
- `Profil`
- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

## Common verified sidebar destinations

- Dashboard → `405:566`
- Kelas Saya → `405:785`
- Kumpulan Flashcard → `407:2695`
- Latihan Harian → `405:3045`
- Try Out → `405:3332`
- Perpustakaan → `405:4478`
- Komunitas → `405:5289`
- Progres → `405:4744`
- Sertifikat → `405:5963`
- Notifikasi → `405:6658`
- Profil → `405:6972`

Reuse the shared student navigation. Do not create a separate sidebar for every learning screen.

---

# LMS entitlement principle for Layer D

Belajar Mandiri can own multiple levels independently.

The Figma fixture currently shows:

- N4 active and being studied
- N3 owned
- N5, N2, and N1 not yet purchased

This is **sample account data**, not a permanent rule.

Important behavior:

- levels can be purchased independently;
- purchased levels keep separate progress;
- all Chapters are available within a purchased level according to that level's learning progression;
- unpurchased levels remain visible and can lead to the purchase/upgrade flow;
- Sensei-only features remain outside Layer D.

---

# LMS / 18 — Perjalanan Level

**Figma frame:** `405:785`

## Exact visible copy

### Header

- `KURSUS SAYA • LEVEL YANG DIMILIKI`
- `Kelola beberapa level aktif dalam satu akun`
- `Belajar Mandiri dapat memiliki lebih dari satu level aktif. Pembelian N1–N5 tidak harus mengikuti urutan.`

### Active-level highlight

- `2 LEVEL AKTIF`
- `JLPT N4 dan N3 aktif pada akun ini`
- `Lanjutkan level terakhir atau pilih level aktif lain. Progress setiap level disimpan secara terpisah oleh backend.`
- `Lanjutkan N4`
- `Kembali Dashboard`
- `◕`
- `Progress dari backend`

### Level section

- `Level berdasarkan pembelian`
- `Tidak ada prerequisite antarlevel. Status aktif mengikuti transaksi dan entitlement akun.`

### N5

- `N5`
- `BELUM DIBELI`
- `N5 — Dasar`
- `Level dapat dibeli langsung tanpa memengaruhi progress N4 dan N3.`
- `Lihat Paket N5 →`
- `→`

Destination:

- N5 card → `729:3333` — purchase/access state outside Layer D

### N4

- `N4`
- `SEDANG DIPELAJARI`
- `N4 — Pemula Lanjutan`
- `3 dari 12 Chapter selesai. Progress tersimpan pada level N4.`
- `Lanjutkan N4 →`
- `→`

Destination:

- N4 card → `405:1005` — Perjalanan Chapter

### N3

- `N3`
- `LEVEL DIMILIKI`
- `N3 — Menengah`
- `Level aktif kedua. Dapat dipelajari kapan saja tanpa menyelesaikan N4.`
- `Buka Journey N3 →`
- `→`

Destination:

- N3 card → `405:1005` — Perjalanan Chapter

### N2

- `N2`
- `BELUM DIBELI`
- `N2 — Lanjut`
- `Beli langsung saat dibutuhkan; tidak ada syarat menyelesaikan N3.`
- `Lihat Paket N2 →`
- `→`

Destination:

- N2 card → `729:3333`

### N1

- `N1`
- `BELUM DIBELI`
- `N1 — Mahir`
- `Level dapat dibeli independen sesuai target ujian pengguna.`
- `Lihat Paket N1 →`
- `→`

Destination:

- N1 card → `729:3333`

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

The active Figma repeats `XP Mingguan` three times. Preserve it as Figma copy until a client-approved correction exists.

### Announcement

- `ℹ`
- `Pengumuman`
- `Satu akun dapat memiliki beberapa level aktif. Progress disimpan per level, sedangkan level yang belum dibeli tetap terlihat dan dapat dibeli tanpa urutan.`

## Primary interactions

- `Lanjutkan N4` → `405:1005`
- `Kembali Dashboard` → `405:566`
- owned N4/N3 → `405:1005`
- unpurchased N5/N2/N1 → `729:3333`

## Fixture rule

Do not hardcode:

- exactly two active levels,
- N4 + N3 ownership,
- `3 dari 12 Chapter`,
- XP values.

They are account/demo fixtures.

---

# LMS / 19 — Perjalanan Chapter

**Figma frame:** `405:1005`

## Exact visible copy

### Header

- `LEVEL AKTIF TERPILIH • CHAPTER JOURNEY`
- `Lanjutkan Chapter pada level yang dipilih`
- `Nama level, daftar Chapter, dan progress dimuat berdasarkan level aktif yang dipilih dari halaman sebelumnya.`

### Level progress

- `PROGRES LEVEL TERPILIH`
- `Chapter 4 dari 12`
- `Progress contoh mengikuti level aktif; progress level lain tetap disimpan secara terpisah.`
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

- `405:1216` — Ringkasan Chapter

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

- `763:3244` — flow/state outside Layer D

### Milestone

- `Milestone berikutnya`
- `Selesaikan Chapter 4 untuk membuka materi berikutnya dan menjaga streak.`
- `♨`
- `XP Mingguan`
- `— XP`

### Back action

- `Kembali ke Level`

Destination:

- `405:785`

## Important interpretation

`Terkunci` on Chapter 05 in this fixture represents learning progression inside an owned level, not an unpaid-level entitlement lock.

Do not confuse:

- **unpurchased level lock**
with
- **next Chapter progression lock**.

The exact progression/business rule remains backend-authoritative later.

---

# LMS / 20 — Ringkasan Chapter

**Figma frame:** `405:1216`

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

### Activities

- `Aktivitas chapter`
- `Lanjutkan`

#### Video

- `Video Lesson`
- `Tonton penjelasan utama chapter.`
- `Belum Mulai`

Destination:

- `405:1434`

#### Modul Tata Bahasa

- `Modul Tata Bahasa`
- `Baca dan tandai poin penting.`
- `Belum Mulai`

Destination:

- `405:1638`

#### Modul Huruf Jepang & Kanji

- `Modul Huruf Jepang & Kanji`
- `Pelajari huruf dan kanji terkait.`
- `Belum Mulai`

Destination:

- `405:1840`

#### Flashcard

- `Flashcard`
- `Ulangi kosakata dan pola penting.`
- `Belum Mulai`

Destination:

- `405:2042`

#### Audio

- `Audio Question`
- `Latih pemahaman listening.`
- `Belum Mulai`

Destination:

- `405:2455`

#### Reading

- `Reading Question`
- `Baca teks dan jawab pertanyaan.`

Destination:

- `405:2653`

### Checkpoint lock presentation

- `CHECKPOINT TERKUNCI`
- `Selesaikan seluruh aktivitas sebelum checkpoint`
- `Status akan berubah otomatis setelah persyaratan chapter terpenuhi.`
- `Terkunci`

### Back action

- `Kembali ke Journey`

Destination:

- `405:1005`

## Fixture values

- N4
- Chapter 4
- `2 dari 7 aktivitas selesai`

are sample/runtime values.

---

# LMS / 21 — Pelajaran Video

**Figma frame:** `405:1434`

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

`Tandai Selesai` → `405:1638`

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

- `405:1216`

## Frontend-first rule

A deterministic/local video placeholder is sufficient until real media integration is explicitly scheduled.

---

# LMS / 22 — Modul Tata Bahasa

**Figma frame:** `405:1638`

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

- `Kembali ke Video` → `405:1434`
- `Modul Huruf & Kanji` → `405:1840`

## Frontend-first rule

Do not build storage/upload/document Backend during this screen task.

---

# LMS / 23 — Modul Huruf Jepang & Kanji

**Figma frame:** `405:1840`

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

### Method

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

- `Modul Tata Bahasa` → `405:1638`
- `Buka Kumpulan Flashcard` → `407:2695`

## Japanese mode rule

Use exactly two Japanese presentations:

- Jepang Profesional
- Jepang Pemula

Do not create a third text mode.

---

# LMS / 24 — Kumpulan Flashcard

**Figma frame:** `407:2695`

## Exact visible copy

### Header

- `KUMPULAN FLASHCARD`
- `Hafalkan kosakata tanpa membuka Journey satu per satu`
- `Semua deck pada level dan membership aktif dapat dipelajari langsung. Progress serta jumlah kartu berasal dari backend.`
- `BELAJAR MANDIRI`

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
- `Belajar Mandiri mendapatkan seluruh deck yang termasuk level dan membership aktif.`
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

- `Akses Belajar Mandiri`
- `Semua deck pada level aktif tersedia. Progress, confidence, dan rekomendasi pengulangan disimpan oleh backend.`
- `Lihat Progress`

`Lihat Progress` → `405:4744`

## Interaction note

No explicit prototype destination was returned for the individual deck cards in this frame.

Do not invent a client-approved navigation path from this frame alone. Reuse the established Flashcard Session flow when implementing after the gap audit.

---

# LMS / 25 — Sesi Flashcard

**Figma frame:** `405:2042`

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

- `Kembali ke Kumpulan` → `407:2695`
- finish / `Lihat State Selesai` → `405:2273`

## Interaction behavior

Preserve the project's existing flashcard flip behavior and reduced-motion handling.

All counts shown here are fixture values.

---

# LMS / 26 — Flashcard Selesai

**Figma frame:** `405:2273`

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

- `Ulangi Kartu Sulit` → `405:2042`
- `Lanjut Audio Question` → `405:2455`

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

# LMS / 27 — Soal Audio

**Figma frame:** `405:2455`

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

- `Kembali Flashcard` → `405:2273`
- `Lanjut Reading` → `405:2653`

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

Audio time, question count, question, and answers are sample assessment content unless separately approved as production data.

---

# LMS / 28 — Soal Reading

**Figma frame:** `405:2653`

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

- `Kembali Audio` → `405:2455`
- `Lanjut Checkpoint` → `405:2842`

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

Jepang Pemula is a state/presentation of the same content, not a separate screen.

Use only:

- Jepang Profesional
- Jepang Pemula

---

# LMS / 29 — Checkpoint

**Figma frame:** `405:2842`

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

- `Kembali Reading` → `405:2653`
- `Selesaikan Checkpoint` → `405:7322` — result/state outside Layer D

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

Do not turn these design values into permanent product rules:

- `08:24`
- `10` questions
- question/answer content
- media/image requirement

Use deterministic mock state during frontend-first implementation.

---

# Layer D verified flow

```text
Perjalanan Level
  ├─ owned level → Perjalanan Chapter
  └─ unpurchased level → purchase/access state

Perjalanan Chapter
  → Ringkasan Chapter
  → Pelajaran Video
  → Modul Tata Bahasa
  → Modul Huruf Jepang & Kanji
  → Kumpulan Flashcard / Sesi Flashcard
  → Flashcard Selesai
  → Soal Audio
  → Soal Reading
  → Checkpoint
  → Checkpoint result/state
```

Additional milestone:

`Chapter Terakhir — Penyelesaian Level` → `763:3244`

This destination will be documented in the relevant later state/supporting contract rather than guessed here.

---

# Differences from Free Layer D that matter

Do not simply clone the Free contract.

Belajar Mandiri differs in important entitlement/copy behavior:

- can own multiple levels;
- purchased levels show full learning access;
- unpurchased levels remain visible;
- N4 and N3 are fixture examples of owned levels;
- Chapter Journey uses learning-progression states, not Free's Chapter-2+-requires-upgrade pattern;
- Flashcard collection is labelled `BELAJAR MANDIRI` and `FULL ACCESS`;
- LMS sidebar includes `Sertifikat`;
- the Kanji module CTA is `Buka Kumpulan Flashcard`;
- unpurchased level clicks route to a purchase/access state.

---

# Layer D frontend-first implementation rules

1. Exact copy and hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse Journey, Learning, Flashcard, and assessment components already present in the frontend.
4. Do not create separate implementations for N1–N5 when data/configuration can drive a shared screen.
5. Keep level ownership separate from Chapter progression.
6. Do not reuse Free's Chapter 1 entitlement logic for purchased LMS levels.
7. Preserve unpurchased levels as visible purchase candidates.
8. Use exactly two Japanese presentations: Jepang Profesional and Jepang Pemula.
9. Treat N4/N3, Chapter 4, progress, scores, timers, and question counts as deterministic fixtures unless separately approved.
10. Do not invent the copy of destination states `729:3333`, `763:3244`, or `405:7322`; document them when their relevant layer/state is extracted.
11. Do not build Backend progress, media, file storage, scoring, timer authority, attempts, persistence, or payment during this frontend-first batch.
12. Change only the active screen/batch during implementation and avoid unrelated refactors.
