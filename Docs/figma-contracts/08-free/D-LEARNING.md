# D-LEARNING — Page 08 / Free Member

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **D — Alur Belajar Utama** (`388:6`)  
> Screens: **FREE / 18–29**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED where listed**
- Runtime progress/timer/question values: **FIXTURE / MOCK where noted**
- Locked-state copy outside this layer: **use Layer F contract**
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API work while implementing this frontend-first layer.

---

# Shared student shell used in Layer D

All Layer D screens use the same student sidebar family.

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
- `Notifikasi`
- `Profil`
- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

## Common sidebar destinations visible in Figma

- Dashboard → `392:566`
- Kelas Saya → `392:785`
- Kumpulan Flashcard → `398:2069`
- Latihan Harian → `392:3311`
- Try Out → `753:2182` locked state
- Perpustakaan → `392:3045`
- Komunitas → `392:4143`
- Progres → `392:3598`
- Notifikasi → `392:4594`
- Profil → `392:4908`

Reuse the shared student navigation. Do not create a separate sidebar for every learning screen.

---

# Important fixture rule for FREE learning screens

Several Layer D learning frames visibly use:

- `N4`
- `CHAPTER 4`

even though the Free entitlement elsewhere in Page 08 states that Free access is **Chapter 1 on N1–N5**.

Treat `N4 / Chapter 4` in these content-detail frames as **design/demo fixture content**, not as a Free entitlement rule.

Do not silently rewrite the verified Figma copy inside this contract. During implementation, keep entitlement logic separate from sample lesson content.

---

# FREE / 18 — Level Journey

**Figma frame:** `392:785`

## Exact visible copy

### Header

- `KURSUS SAYA • AKSES FREE N1–N5`
- `Pilih level mana pun dan coba Chapter 1`
- `Free Member mendapat Chapter 1 pada N5, N4, N3, N2, dan N1. Pembelian level tidak harus berurutan.`

### Free access card

- `AKSES GRATIS AKTIF`
- `Chapter 1 tersedia pada seluruh N1–N5`
- `Pilih level untuk membuka Chapter 1. Chapter 2 dan seterusnya tetap terlihat, tetapi memerlukan upgrade pada level tersebut.`
- `Buka Chapter 1`
- `Kembali Dashboard`
- `◕`
- `Progress dari backend`

### Level section

- `Pilih level gratis`
- `Tidak ada prerequisite antarlevel. Semua level dapat dicoba melalui Chapter 1.`

#### N5

- `N5`
- `CHAPTER 1 GRATIS`
- `N5 — Dasar`
- `Chapter 1 terbuka. Chapter berikutnya tersedia setelah upgrade level N5.`
- `Buka Chapter 1 →`
- `→`

#### N4

- `N4`
- `CHAPTER 1 GRATIS`
- `N4 — Pemula Lanjutan`
- `Level terakhir yang dilihat. Chapter 1 tetap dapat dibuka kapan saja.`
- `Lanjutkan Chapter 1 →`
- `→`

#### N3

- `N3`
- `CHAPTER 1 GRATIS`
- `N3 — Menengah`
- `Chapter 1 terbuka tanpa harus menyelesaikan atau membeli N4.`
- `Buka Chapter 1 →`
- `→`

#### N2

- `N2`
- `CHAPTER 1 GRATIS`
- `N2 — Lanjut`
- `Chapter 1 terbuka tanpa prerequisite pembelian level sebelumnya.`
- `Buka Chapter 1 →`
- `→`

#### N1

- `N1`
- `CHAPTER 1 GRATIS`
- `N1 — Mahir`
- `Chapter 1 terbuka sebagai preview materi dan struktur level N1.`
- `Buka Chapter 1 →`
- `→`

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

The active Figma frame repeats `XP Mingguan` three times. Do not auto-correct that copy without a client/Figma revision.

### Announcement

- `ℹ`
- `Pengumuman`
- `Free Member dapat memilih N1–N5 secara bebas. Chapter 1 aktif pada setiap level; akses Chapter lanjutan mengikuti upgrade dan verifikasi backend.`

## Figma interactions

- `Buka Chapter 1` → `392:1005`
- `Kembali Dashboard` → `392:566`
- N5 card → `392:1005`
- N4 card → `392:1005`
- N3 card → `392:1005`
- N2 card → `392:1005`
- N1 card → `392:1005`

---

# FREE / 19 — Chapter Journey

**Figma frame:** `392:1005`

## Exact visible copy

### Header

- `LEVEL TERPILIH • CHAPTER JOURNEY`
- `Chapter 1 gratis, Chapter berikutnya tetap terlihat`
- `Konten Chapter 1 mengikuti level yang dipilih. Chapter 2+ memerlukan pembelian level tanpa prerequisite antarlevel.`

### Access summary

- `AKSES FREE MEMBER`
- `Chapter 1 dari level pilihanmu`
- `Mulai materi gratis, lalu upgrade level ini jika ingin melanjutkan seluruh journey.`
- `▰`
- `Progress dari backend`

### Chapter 1

- `01`
- `Chapter 1 — Materi Pengenalan`
- `Video • dua modul • flashcard • audio • reading • checkpoint`
- `Mulai`

Figma destination:

- `392:1216` — Chapter Overview

### Chapter 2

- `02`
- `Chapter 2 — Materi Lanjutan`
- `Tersedia setelah upgrade level yang sedang dipilih.`
- `Upgrade`

Figma destination:

- `725:2226` — Chapter lanjutan terkunci

### Chapter 3

- `03`
- `Chapter 3 — Latihan Terarah`
- `Tersedia setelah upgrade level yang sedang dipilih.`
- `Upgrade`

Destination:

- `725:2226`

### Chapter 4

- `04`
- `Chapter 4 — Penguatan Materi`
- `Tersedia setelah upgrade level yang sedang dipilih.`
- `Upgrade`

Destination:

- `725:2226`

### Chapter 5

- `05`
- `Chapter 5 — Evaluasi`
- `Tersedia setelah upgrade level yang sedang dipilih.`
- `Upgrade`

Destination:

- `725:2226`

### Chapter 6

- `06`
- `Chapter 6 — Penerapan`
- `Tersedia setelah upgrade level yang sedang dipilih.`
- `Upgrade`

Destination:

- `725:2226`

### Footer / progress

- `Lanjutkan setelah Chapter 1`
- `Upgrade hanya diperlukan untuk Chapter lanjutan pada level yang dipilih; level lain tetap dapat dicoba melalui Chapter 1.`
- `♨`
- `XP Mingguan`
- `— XP`
- `Kembali ke Level`

`Kembali ke Level` → `392:785`

---

# FREE / 20 — Chapter Overview

**Figma frame:** `392:1216`

## Exact visible copy

### Header

- `N4 • CHAPTER 4`
- `Pola Kalimat dan Kehidupan Sehari-hari`
- `Selesaikan setiap modul untuk membuka checkpoint dan melanjutkan journey.`

### Chapter progress

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

- `392:1434`

#### Tata Bahasa

- `Modul Tata Bahasa`
- `Baca dan tandai poin penting.`
- `Belum Mulai`

Destination:

- `392:1638`

#### Huruf Jepang & Kanji

- `Modul Huruf Jepang & Kanji`
- `Pelajari huruf dan kanji terkait.`
- `Belum Mulai`

Destination:

- `392:1840`

#### Flashcard

- `Flashcard`
- `Ulangi kosakata dan pola penting.`
- `Belum Mulai`

Figma destination:

- `392:2042` — Flashcard Session

#### Audio

- `Audio Question`
- `Latih pemahaman listening.`
- `Belum Mulai`

Destination:

- `392:2455`

#### Reading

- `Reading Question`
- `Baca teks dan jawab pertanyaan.`
- `Belum Mulai`

Destination:

- `392:2653`

### Checkpoint locked presentation

- `CHECKPOINT TERKUNCI`
- `Selesaikan seluruh aktivitas sebelum checkpoint`
- `Status akan berubah otomatis setelah persyaratan chapter terpenuhi.`
- `Terkunci`

### Back action

- `Kembali ke Journey`

Destination:

- `392:1005`

## Fixture values

Treat these as sample/demo values:

- `N4`
- `CHAPTER 4`
- `2 dari 7 aktivitas selesai`

---

# FREE / 21 — Video Lesson

**Figma frame:** `392:1434`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • VIDEO`
- `Pola kalimat untuk aktivitas sehari-hari`
- `Tonton video, tandai selesai, lalu lanjutkan ke modul berikutnya.`

### Video area

- `▶`
- `Mulai video`
- `YouTube • lazy-loaded`
- `Durasi dan sumber video mengikuti konfigurasi konten.`

### Primary action

- `Tandai Selesai`

Destination:

- `392:1638` — Modul Tata Bahasa

### Tabs

- `Ringkasan`
- `Transkrip`
- `Catatan`

### Ringkasan

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

- `392:1216`

## Frontend-first note

Do not integrate real YouTube/content APIs during a copy/layout task. A deterministic media placeholder/player state is sufficient until media integration is explicitly scheduled.

---

# FREE / 22 — Modul Tata Bahasa

**Figma frame:** `392:1638`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • MODUL TATA BAHASA`
- `Modul Tata Bahasa — Pola Kalimat Sehari-hari`
- `Baca materi, bookmark halaman penting, dan lanjutkan setelah memahami contoh utama.`

### File / document controls

- `N4-Chapter-04-Modul-Tata-Bahasa.pdf`
- `Nama file dapat diedit per chapter oleh admin.`
- `−`
- `100%`
- `+`
- `Unduh`

### Page markers

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

### Structure section

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

### Pagination / navigation

- `Halaman 1 dari 12`
- `Kembali ke Video`
- `Modul Huruf & Kanji`

Destinations:

- `Kembali ke Video` → `392:1434`
- `Modul Huruf & Kanji` → `392:1840`

## Frontend-first note

The PDF filename, zoom percentage, page number, and material content are presentation fixtures/configurable content. Do not build document storage/upload Backend during this task.

---

# FREE / 23 — Modul Huruf Jepang & Kanji

**Figma frame:** `392:1840`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • MODUL HURUF JEPANG & KANJI`
- `Modul Huruf Jepang & Kanji — Chapter 4`
- `Pelajari huruf dan kanji chapter dengan contoh bacaan serta konteks penggunaan.`

### File / controls

- `N4-Chapter-04-Modul-Huruf-Jepang-Kanji.pdf`
- `Nama file dapat diedit per chapter oleh admin.`
- `−`
- `100%`
- `+`
- `Unduh`

### Page markers

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

### Pagination / navigation

- `Halaman 1 dari 12`
- `Modul Tata Bahasa`
- `Mulai Flashcard`

Destinations:

- `Modul Tata Bahasa` → `392:1638`
- `Mulai Flashcard` → `392:2042`

## Japanese mode rule

This screen explicitly references `Jepang Pemula`.

Project rule remains exactly two Japanese presentations:

- Jepang Profesional
- Jepang Pemula

Do not introduce a third mode.

---

# FREE / 24 — Kumpulan Flashcard

**Figma frame:** `398:2069`

## Exact visible copy

### Header

- `KUMPULAN FLASHCARD`
- `Hafalkan kosakata tanpa membuka Journey satu per satu`
- `Deck yang tersedia mengikuti chapter dan membership aktif. Progress serta jumlah kartu berasal dari backend.`
- `FREE • LIMITED`

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

### Search / filter

- `⌕`
- `Cari deck, chapter, atau kosakata`
- `Semua Deck`
- `N5`
- `Chapter 1`
- `Perlu Diulang`

### Deck section

- `Deck yang dapat dipelajari`
- `Free Member hanya mendapat deck dari chapter yang sudah terbuka.`
- `1 CHAPTER AKTIF`

### Deck 1

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Kosakata Chapter 1`
- `Kosakata utama dari chapter gratis yang sudah terbuka.`
- `Progress dan confidence diperbarui otomatis.`
- `Mulai`

Destination:

- `392:2042`

### Deck 2

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Huruf Jepang Dasar`
- `Deck penguatan hiragana, katakana, dan pengenalan kanji.`
- `Progress dan confidence diperbarui otomatis.`
- `Lanjutkan`

Destination:

- `392:2042`

### Deck 3

- `JLPT N5 • CHAPTER 1`
- `TERSEDIA`
- `Pola Kalimat Chapter 1`
- `Flashcard grammar ringkas untuk review cepat.`
- `Progress dan confidence diperbarui otomatis.`
- `Ulangi`

Destination:

- `392:2042`

### Locked deck

- `JLPT N5 • CHAPTER 2`
- `TERKUNCI`
- `Kosakata Chapter 2`
- `Deck berikutnya mengikuti akses chapter dan membership.`
- `Buka chapter atau upgrade untuk mengakses.`
- `Terkunci`

### Access notice

- `Akses Free Member`
- `Deck chapter berikutnya tetap ditampilkan sebagai locked card. Upgrade membership tidak menghapus progress yang sudah tersimpan.`
- `Lihat Membership`

`Lihat Membership` → `392:5093`

## Frontend-first note

Search/filter/progress values can be deterministic frontend state. Do not build persistence or Backend confidence scoring during this task.

---

# FREE / 25 — Flashcard Session

**Figma frame:** `392:2042`

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

### Utility / tips

- `Kembali ke Modul`
- `Tips mengulang`
- `Ucapkan kata sebelum membalik kartu.`
- `Baca contoh kalimat setelah melihat arti.`
- `Pilih Ulangi bila belum yakin.`

### XP

- `★`
- `XP Mingguan`
- `— XP`

### Card front

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

## Figma interactions

- `Kembali ke Modul` → `392:1840`
- `Lihat State Selesai` / finish action → `392:2273`

## Interaction behavior

The frontend should preserve the existing flashcard flip behavior already defined by the project design rules, including reduced-motion support.

Counts and chapter/level shown here are fixtures.

---

# FREE / 26 — Flashcard Selesai

**Figma frame:** `392:2273`

## Exact visible copy

### Completion

- `FLASHCARD SELESAI`
- `Deck Chapter 4 sudah ditinjau`
- `Kartu yang sulit dapat diulang sebelum melanjutkan ke Audio Question.`

### Card / total

- `日本語`
- `にほんご`
- `Klik untuk melihat arti`
- `20 kartu selesai`
- `Sebagian besar kartu sudah dipahami. Ulangi kartu yang ditandai Sulit sebelum checkpoint.`

### Confidence summary

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

- `Ulangi Kartu Sulit` → `392:2042`
- `Lanjut Audio Question` → `392:2455`

### Repeat section

- `Kartu yang perlu diulang`

Three example cards show:

- `日本語`
- `にほんご`
- `Klik untuk melihat arti`

### Announcement

- `✓`
- `Pengumuman`
- `Progress deck disimpan. Lanjutkan ke Audio Question atau ulangi kartu sulit.`

## Fixture values

The counts `20`, `13`, `5`, and `2` are sample/demo values in this Figma frame.

---

# FREE / 27 — Audio Question

**Figma frame:** `392:2455`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • AUDIO QUESTION`
- `Dengarkan percakapan dan pilih jawaban yang tepat`
- `Audio dapat diputar ulang sesuai konfigurasi soal.`

### Audio player

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

- `Kembali Flashcard` → `392:2273`
- `Lanjut Reading` → `392:2653`

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

Question text, answer options, time, and question count are design/sample assessment data unless separately approved as production content.

---

# FREE / 28 — Reading Question

**Figma frame:** `392:2653`

## Exact visible copy

### Header

- `N4 • CHAPTER 4 • READING QUESTION`
- `Baca teks pendek lalu jawab pertanyaan`
- `Teks Jepang Profesional dapat memiliki state Jepang Pemula pada implementasi.`

### Reading text

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

- `Kembali Audio` → `392:2455`
- `Lanjut Checkpoint` → `392:2842`

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

This frame confirms that the beginner presentation is a **state**, not a separate screen.

Use only:

- Jepang Profesional
- Jepang Pemula

Do not create a third Japanese-text mode.

---

# FREE / 29 — Checkpoint

**Figma frame:** `392:2842`

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
- `Gambar soal dari Admin (opsional)`
- `毎朝`
- `まいあさ`

### Answers

- `A. Setiap pagi`
- `B. Setiap malam`
- `C. Minggu depan`
- `D. Kemarin`

### Navigation

- `Kembali Reading`
- `Selesaikan Checkpoint`

Destinations:

- `Kembali Reading` → `392:2653`
- `Selesaikan Checkpoint` → `392:5258` — Checkpoint Result state

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

## Fixture / runtime rule

The following are sample/runtime values in this Figma frame:

- `08:24`
- `1 dari 10 soal`
- question content
- answer options
- optional image placeholder

Do not turn them into permanent global assessment limits unless separately defined by approved product requirements.

---

# Layer D flow map

The verified Figma flow for the main Free learning path is:

`Level Journey`
→ `Chapter Journey`
→ `Chapter Overview`
→ `Video Lesson`
→ `Modul Tata Bahasa`
→ `Modul Huruf Jepang & Kanji`
→ `Flashcard Session`
→ `Flashcard Selesai`
→ `Audio Question`
→ `Reading Question`
→ `Checkpoint`
→ `Checkpoint Result state`

Additional entry:

`Kumpulan Flashcard`
→ `Flashcard Session`

Locked Chapter 2+:

`Chapter Journey`
→ `725:2226` locked chapter state

---

# Layer D frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the existing Journey, Learning, Flashcard, and assessment components where possible.
4. Do not create separate implementations per level when configuration/data can drive one shared component.
5. Free entitlement remains Chapter 1 on N1–N5; sample `N4 / Chapter 4` content must not redefine entitlement.
6. Use only the two approved Japanese presentations: Jepang Profesional and Jepang Pemula.
7. Keep Chapter 2+ visible but locked.
8. Do not invent locked-state copy; use the verified Layer F contract.
9. Do not build Backend progress, media, storage, assessment persistence, or scoring during frontend-first copy/layout work.
10. Runtime values may use deterministic frontend mocks.
11. Do not invent question counts, timers, scores, or production learning content from these fixtures.
12. Change only the active screen/batch during implementation; do not refactor unrelated frontend areas.
