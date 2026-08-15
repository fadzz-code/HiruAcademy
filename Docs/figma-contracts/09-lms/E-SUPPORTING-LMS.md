# E-SUPPORTING — Page 09 / Belajar Mandiri

> Figma source: **Page 09 — E2E / Belajar Mandiri** (`388:9`)  
> Layer: **E — Fitur Pendukung** (`388:14`)  
> Screens: **LMS / 30–43, 45–47**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Dynamic values, progress, scores, times, counts, names, dates, ranking, certificate values: **FIXTURE / BACKEND-DRIVEN where noted**
- State frames reached outside Layer E are referenced by node ID only. Their exact copy belongs to the relevant state contract and must not be invented here.
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API/storage/payment work while implementing this frontend-first layer.

## Layer E frame inventory

| Screen | Figma frame |
|---|---|
| LMS / 30 — Latihan Harian | `405:3045` |
| LMS / 31 — Daftar Try Out | `405:3332` |
| LMS / 32 — Informasi Try Out | `405:3736` |
| LMS / 33 — Pengerjaan Try Out | `405:3908` |
| LMS / 34 — Hasil Try Out | `405:4049` |
| LMS / 35 — Ulasan Jawaban | `405:4269` |
| LMS / 36 — Perpustakaan Materi | `405:4478` |
| LMS / 37 — Progres & Pencapaian | `405:4744` |
| LMS / 38 — Papan Peringkat | `405:4979` |
| LMS / 39 — Komunitas | `405:5289` |
| LMS / 40 — Detail Postingan Komunitas | `405:5509` |
| LMS / 41 — Feedback Penyelesaian Level | `405:5740` |
| LMS / 42 — Pusat Sertifikat | `405:5963` |
| LMS / 43 — Detail Sertifikat | `405:6196` |
| LMS / 45 — Pusat Notifikasi | `405:6658` |
| LMS / 46 — Profil & Keanggotaan | `405:6972` |
| LMS / 47 — Perpanjangan | `405:7157` |

**Important:** the active Page 09 Layer E does **not** contain an `LMS / 44` frame. Preserve the active Figma numbering; do not invent a missing screen.

---

# Shared LMS student shell

Layer E uses the same verified LMS student sidebar already documented in Layer D. Reuse it; do not create another sidebar implementation.

## Exact shared sidebar copy

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

## Common verified destinations

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

---

# LMS / 30 — Latihan Harian

**Figma frame:** `405:3045`

## Exact visible copy

### Header

- `LATIHAN HARIAN • BELAJAR MANDIRI`
- `Latihan singkat berdasarkan progresmu`
- `Aktivitas harian terpisah dari Try Out. Soal latihan dapat memuat gambar yang diunggah Admin.`
- `AKTIF`

### Recommendation

- `REKOMENDASI HARI INI`
- `Perkuat Chapter 4 dalam 15–20 menit`
- `Urutan latihan dibuat dari kesalahan terakhir, confidence flashcard, dan checkpoint yang perlu diulang.`
- `Mulai Rekomendasi`
- `Buka Daftar Try Out`

Destinations:

- `Mulai Rekomendasi` → `407:2695`
- `Buka Daftar Try Out` → `405:3332`

### Summary

- `4 aktivitas`
- `Target harian`
- `12 hari`
- `Hari beruntun`
- `18`
- `Selesai minggu ini`
- `82%`
- `Akurasi`

### Mode section

- `PILIH MODE`
- `Latihan Harian`
- `Pilih aktivitas singkat tanpa masuk ke alur Try Out.`

#### Flashcard Review

- `札`
- `Flashcard Review`
- `REKOMENDASI`
- `Ulangi kosakata dan pola dengan confidence state.`
- `5–10 menit • deck level aktif`

Destination:

- `407:2695`

#### Audio Drill

- `聴`
- `Audio Drill`
- `TERSEDIA`
- `Latihan listening dari Chapter aktif.`
- `10 soal • hasil langsung`

Destination:

- `405:2455`

#### Reading Drill

- `読`
- `Reading Drill`
- `TERSEDIA`
- `Bacaan pendek dengan penjelasan jawaban.`
- `8 soal • fokus Dokkai`

Destination:

- `405:2653`

#### Checkpoint Retry

- `試`
- `Checkpoint Retry`
- `TERSEDIA`
- `Ulangi checkpoint sesuai attempt rule Chapter.`
- `Nilai terbaru tersimpan`

Destination:

- `405:2842`

### History

- `RIWAYAT HARIAN`
- `Aktivitas terakhir`
- `Riwayat latihan tetap terpisah dari hasil Try Out.`
- `Hari ini • Flashcard Review • 86% akurasi`
- `Kemarin • Audio Drill • 8/10 benar     |     2 hari lalu • Reading Drill • 7/8 benar`

## Fixture / dynamic values

The recommendation, Chapter number, duration, counts, streak, completion, accuracy, and history are sample/backend-driven values. Do not turn them into permanent product constants.

---

# LMS / 31 — Daftar Try Out

**Figma frame:** `405:3332`

## Exact visible copy

### Header

- `TRY OUT • SIMULASI JLPT`
- `Pilih Try Out yang tersedia`
- `Akses, tanggal, attempt, dan ulasan jawaban mengikuti konfigurasi Admin.`
- `BACKEND DRIVEN`

### Filters / status

- `ATURAN AKSES`
- `SEMUA LEVEL`
- `N4`
- `TERSEDIA`
- `SELESAI`
- `REVIEW AKTIF`

### List heading

- `DAFTAR TRY OUT`
- `Simulasi yang tersedia`
- `Setiap kartu menjelaskan status, attempt, dan akses review.`

### Try Out N4 — Simulasi 1

- `試`
- `Try Out N4 — Simulasi 1`
- `TERSEDIA`
- `Simulasi penuh dengan review jawaban setelah submit.`
- `100 soal • 90 menit • 2 attempt`

Destination:

- `405:3736` — Informasi Try Out

### Try Out N3 — Agustus

- `時`
- `Try Out N3 — Agustus`
- `MENUNGGU`
- `Dijadwalkan dan belum dapat dimulai.`
- `Mulai 12 Agustus • 1 attempt`

Destination:

- `750:3349` — state outside Layer E contract

### Try Out N2 — Latihan Resmi

- `鍵`
- `Try Out N2 — Latihan Resmi`
- `TERKUNCI`
- `Memerlukan level N2 aktif atau aturan khusus Admin.`
- `Level tidak aktif • review tersedia`

Destination:

- `750:3323` — state outside Layer E contract

### Try Out N4 — Simulasi 2025

- `再`
- `Try Out N4 — Simulasi 2025`
- `ATTEMPT HABIS`
- `Seluruh attempt sudah digunakan.`
- `Nilai terakhir 78 • 0 attempt`

Destination:

- `750:3375` — state outside Layer E contract

### Try Out N4 — Review Tertutup

- `答`
- `Try Out N4 — Review Tertutup`
- `SELESAI`
- `Hasil tersedia tetapi pembahasan dinonaktifkan.`
- `Nilai 82 • review off`

Destination:

- `750:3427` — state outside Layer E contract

### Latihan Harian card

- `練`
- `Latihan Harian`
- `AKTIF`
- `Kembali ke drill singkat dan rekomendasi harian.`
- `Tidak menggunakan attempt Try Out`

Destination:

- `405:3045`

### Footer note

- `Try Out berbeda dari Latihan Harian: memiliki timer, jumlah soal, attempt, hasil, dan aturan review tersendiri.`

## Fixture / backend-driven rule

The titles, dates, question counts, duration, attempts, scores, and statuses shown are design fixtures representing supported states. Do not hardcode them globally.

---

# LMS / 32 — Informasi Try Out

**Figma frame:** `405:3736`

## Exact visible copy

### Header

- `TRY OUT N4 • SIMULASI 1`
- `Periksa aturan sebelum memulai`
- `Attempt baru dicatat setelah sesi benar-benar dimulai.`
- `TERSEDIA`

### Session summary

- `SIMULASI JLPT N4`
- `100 soal • 90 menit • 2 attempt tersedia`
- `Jawaban tersimpan otomatis. Saat waktu habis, sistem melakukan auto-submit dan mengarahkan ke hasil.`
- `Mulai Try Out`
- `Kembali ke Daftar`

Destinations:

- `Mulai Try Out` → `405:3908`
- `Kembali ke Daftar` → `405:3332`

### Rules

- `ATURAN SESI`
- `Yang perlu diperhatikan`
- `Semua ketentuan berasal dari konfigurasi Try Out di Admin.`

#### Access

- `鍵`
- `Akses`
- `AKTIF`
- `Belajar Mandiri • Level N4 aktif`
- `Plan dan level diverifikasi backend`

#### Time

- `時`
- `Waktu`
- `AKTIF`
- `90 menit sejak tombol mulai ditekan`
- `Timer tetap berjalan selama sesi`

#### Attempts

- `再`
- `Percobaan`
- `AKTIF`
- `2 attempt tersedia untuk akun ini`
- `Submit dan timeout mengurangi attempt`

#### Review

- `答`
- `Ulasan Jawaban`
- `AKTIF`
- `Aktif setelah hasil diproses`
- `Dapat dinonaktifkan per Try Out`

### Footer rules

- `Dengan memulai, pengguna menyetujui timer, autosave, auto-submit, dan pencatatan attempt.`
- `Koneksi terputus tidak menghapus jawaban yang sudah tersimpan di backend.`

## Frontend-first note

For the current frontend-only phase, represent these behaviors deterministically without pretending browser mocks are server-authoritative. Real timer, autosave, reconnect, attempt authority, and auto-submit belong to later backend integration.

---

# LMS / 33 — Pengerjaan Try Out

**Figma frame:** `405:3908`

## Exact visible copy

### Header

- `TRY OUT N4 • SESI BERJALAN`
- `Soal 18 dari 100`
- `Jawaban tersimpan otomatis dan timer dikendalikan backend.`
- `ATTEMPT 1/2`

### Timer

- `SISA WAKTU`
- `01:12:36`
- `Klik untuk melihat state waktu habis`

Timer prototype destination:

- `750:3401` — timeout state outside this contract

### Session metrics

- `14 / 100`
- `Soal dijawab`
- `3 soal`
- `Ditandai`
- `Aktif`
- `Autosave`

### Question

- `BAGIAN BUNPOU • SOAL 18`
- `Pilih jawaban yang paling tepat.`
- `日本へ行く前に、パスポートを＿＿＿＿。`
- `Gambar soal dari Admin (opsional)`

### Answers

- `A.  確認しておきます`
- `B.  確認しています`
- `C.  確認したことがあります`
- `D.  確認するでしょう`

### Question controls

- `Sebelumnya`
- `Tandai Soal`
- `Selanjutnya`

### Navigator

- `NAVIGATOR`
- `14 dijawab • 3 ditandai`
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
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`
- `24`
- `25`

### Submission / exit

- `Akhiri & Kirim`
- `Kembali ke Daftar`
- `Jawaban terakhir tersimpan • 23:29 WIB`
- `Saat timer mencapai 00:00, sistem mengirim jawaban otomatis.`

Destinations:

- `Akhiri & Kirim` → `405:4049`
- `Kembali ke Daftar` → `405:3332`

## Fixture rule

All session numbers, question text, answer choices, timer value, saved time, and attempt values are fixtures. The Figma copy describing backend authority must remain verbatim, but the frontend prototype must not claim actual persistence if it is not implemented.

---

# LMS / 34 — Hasil Try Out

**Figma frame:** `405:4049`

## Exact visible copy

### Header

- `TRY OUT N4 • HASIL`
- `Hasil simulasi berhasil diproses`
- `Skor, breakdown, dan rekomendasi berasal dari jawaban yang tersimpan.`
- `SELESAI`

### Score

- `SKOR AKHIR`
- `82 / 100`
- `Lulus target latihan • Attempt 1 dari 2 • Durasi 78 menit`
- `Ulasan Jawaban`
- `Kembali ke Daftar`

Destinations:

- `Ulasan Jawaban` → `405:4269`
- `Kembali ke Daftar` → `405:3332`

### Breakdown

- `RINGKASAN NILAI`
- `Performa per bagian`
- `Gunakan breakdown untuk menentukan latihan berikutnya.`

- `86%`
- `Moji Goi`

- `80%`
- `Bunpou`

- `78%`
- `Dokkai`

- `84%`
- `Choukai`

### Strength

- `強`
- `Kekuatan`
- `AKTIF`
- `Kosakata dan listening menunjukkan hasil stabil.`
- `Pertahankan review flashcard`

Prototype destination:

- `405:3045`

### Needs improvement

- `補`
- `Perlu Diperkuat`
- `REKOMENDASI`
- `Dokkai dan pola kalimat masih di bawah target.`
- `Direkomendasikan Reading Drill`

Prototype destination:

- `405:2653`

### Attempt / review summary

- `ATTEMPT & REVIEW`
- `1 attempt tersisa • Ulasan jawaban aktif • Hasil tersimpan permanen`
- `Admin dapat mengubah jumlah attempt atau menonaktifkan review untuk Try Out berikutnya.`

## Fixture values

Score, pass wording, duration, percentages, attempt count, and recommendation content are sample/backend-driven result values.

---

# LMS / 35 — Ulasan Jawaban

**Figma frame:** `405:4269`

## Exact visible copy

### Header

- `TRY OUT N4 • ULASAN`
- `Tinjau jawaban dan pembahasan`
- `Review tersedia karena diaktifkan pada konfigurasi Try Out ini.`
- `REVIEW AKTIF`

### Filters

- `FILTER JAWABAN`
- `SEMUA 100`
- `SALAH 18`
- `BENAR 82`
- `DITANDAI 3`
- `BUNPOU`

### Question list

- `DAFTAR SOAL`
- `Soal 1  •  Benar`
- `Soal 2  •  Benar`
- `Soal 3  •  Benar`
- `Soal 4  •  Salah`
- `Soal 5  •  Benar`
- `Soal 6  •  Benar`
- `Soal 7  •  Benar`
- `Soal 8  •  Benar`
- `Soal 9  •  Benar`
- `Soal 10  •  Benar`

### Selected question

- `SOAL 4 • BUNPOU`
- `日本へ行く前に、パスポートを＿＿＿＿。`
- `Jawabanmu`
- `B. 確認しています`
- `Jawaban benar`
- `A. 確認しておきます`

### Explanation

- `PEMBAHASAN`
- `Pola ～ておく digunakan untuk menyatakan persiapan yang dilakukan sebelumnya. Karena konteksnya “sebelum pergi ke Jepang”, jawaban A paling tepat.`
- `Rekomendasi: buka Modul Tata Bahasa Chapter 4 dan ulangi Reading Drill.`

### Actions / rule

- `Kembali ke Hasil`
- `Latihan Rekomendasi`
- `Ulasan hanya tampil jika access review diaktifkan Admin untuk Try Out tersebut.`
- `Jika dinonaktifkan, tombol Ulasan Jawaban diarahkan ke state “Ulasan Tidak Tersedia”.`

Destinations:

- `Kembali ke Hasil` → `405:4049`
- `Latihan Rekomendasi` → `405:3045`

## Fixture rule

All filter counts and example review content are fixtures. Review availability is configuration-driven.

---

# LMS / 36 — Perpustakaan Materi

**Figma frame:** `405:4478`

## Exact visible copy

### Header

- `PERPUSTAKAAN MATERI`
- `Temukan kembali materi dari seluruh journey`
- `Akses material mengikuti level dan entitlement membership.`

### Search / filters

- `⌕`
- `Cari materi, tata bahasa, kanji, atau audio`
- `Semua`
- `N5`
- `N4`
- `N3`
- `SSW`
- `Interview`
- `Semua`
- `Tata Bahasa`
- `Kanji`
- `Kosakata`
- `Audio`
- `Reading`
- `Rekomendasi N4`

Search prototype destination:

- `405:7441` — search state outside this contract

### Material 1

- `文`
- `Tata Bahasa`
- `Pola Kalimat Sehari-hari`
- `Modul Chapter 4 yang terakhir dibuka.`
- `Tersimpan`

Destination:

- `405:1638`

### Material 2

- `漢`
- `Kanji`
- `Keadaan, Waktu & Aktivitas`
- `Kanji chapter dengan bookmark dan catatan.`
- `Tersedia`

Destination:

- `405:1840`

### Material 3

- `聴`
- `Audio`
- `Simulasi Choukai N4`
- `Akses audio lengkap mengikuti membership.`
- `Terkunci`

Destination:

- `405:7468` — locked/access state outside this contract

### Recently opened

- `Baru dibuka`
- `語`
- `Flashcard Chapter 4`
- `Kosakata`
- `読`
- `Reading Aktivitas Harian`
- `Reading`
- `試`
- `Review Try Out 1`
- `Try Out`

## Entitlement note

The active Figma intentionally includes a `Terkunci` material even on Belajar Mandiri. Do not assume every library item is unlocked merely because the membership is LMS; access can also depend on level/material entitlement.

---

# LMS / 37 — Progres & Pencapaian

**Figma frame:** `405:4744`

## Exact visible copy

### Header

- `PROGRES & ACHIEVEMENT`
- `Rayakan progres tanpa kehilangan fokus`
- `Progress, streak, mastery, dan achievement dihitung dari journey serta aktivitas backend.`
- `Profil`

`Profil` → `405:6972`

### Member summary

- `MEMBER • LEVEL N4`
- `Perjalanan belajar terus bertumbuh`
- `Persentase dan milestone mengikuti completion serta assessment yang valid.`

### Stats

- `12 Hari Streak`
- `65%`
- `Journey N4`
- `450`
- `Kanji mastered`
- `—`
- `Latihan selesai`
- `—`
- `Try Out terbaik`

### Journey milestone

- `Milestone journey`

#### Milestone 1

- `✓`
- `Fondasi N4`
- `Chapter awal dan checkpoint`
- `Selesai`

#### Milestone 2

- `✓`
- `Rutinitas Harian`
- `Video, modul, dan latihan`
- `Selesai`

#### Milestone 3

- `03`
- `Pola Kalimat`
- `Chapter aktif`
- `Aktif`

#### Milestone 4

- `04`
- `Try Out N4`
- `Tersedia setelah journey`
- `Terkunci`

#### Milestone 5

- `05`
- `Sertifikat N4`
- `Mengikuti eligibility`
- `Terkunci`

### Tabs

- `Achievement`
- `Leaderboard`

`Leaderboard` → `405:4979`

### Achievement cards

- `火`
- `Streak 7 Hari`
- `Belajar konsisten selama tujuh hari.`
- `Terbuka`

- `札`
- `Flashcard Master`
- `Menyelesaikan target flashcard.`
- `Terbuka`

- `試`
- `Try Out Finisher`
- `Menyelesaikan Try Out pertama.`
- `Belum terbuka`

- `証`
- `Certificate Ready`
- `Memenuhi eligibility sertifikat.`
- `Belum terbuka`

## Fixture rule

Member level, streak, Journey percentage, Kanji count, milestones, and achievement states are account fixtures.

---

# LMS / 38 — Papan Peringkat

**Figma frame:** `405:4979`

## Exact visible copy

### Header

- `LEADERBOARD`
- `Bandingkan konsistensi, bukan tekanan`
- `Poin, periode, cohort, rank, dan movement berasal dari backend serta dapat menggunakan nama samaran.`
- `Progres`

`Progres` → `405:4744`

### Filters

- `Mingguan`
- `Bulanan`
- `N4`
- `Cohort`
- `Semua Member`

### Podium

- `#02`
- `Member •••2`
- `Poin —`

- `#01`
- `Member •••1`
- `Poin —`

- `#03`
- `Member •••3`
- `Poin —`

### Ranking rows

#### Rank 04

- `04`
- `Member •••4`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `↑ 2`

#### Rank 05

- `05`
- `Member •••5`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `—`

#### Rank 06

- `06`
- `Member •••6`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `↓ 1`

#### Current user

- `07`
- `Kamu`
- `Posisimu saat ini`
- `Poin —`
- `Poin dinamis`
- `↑ 3`

#### Rank 08

- `08`
- `Member •••8`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `—`

### Announcement

- `ℹ`
- `Pengumuman`
- `Leaderboard dapat menggunakan nama samaran dan hanya menampilkan aktivitas yang diizinkan.`

## Fixture rule

All member aliases, positions, movements, filters, and points are backend-driven samples.

---

# LMS / 39 — Komunitas

**Figma frame:** `405:5289`

## Exact visible copy

### Header

- `FORUM KOMUNITAS`
- `Berdiskusi, bertanya, dan berbagi perjalanan belajar`
- `Free Member dapat membaca. Belajar Mandiri dapat membuat post, membalas komentar, dan melaporkan konten sesuai entitlement.`
- `Buat Postingan`

`Buat Postingan` → `405:7382` — create-post state outside this contract

### Entitlement summary

- `先`
- `BELAJAR MANDIRI`
- `Post & Comment`
- `Buat post, balas komentar, dan laporkan konten sesuai aturan komunitas.`

- `話`
- `LMS Write`
- `Diskusi Member`
- `Forum diskusi dengan sesama pembelajar.`

- `知`
- `Semua Akses`
- `Info dari Hiru`
- `Pengumuman, event, dan informasi akademi.`

- `働`
- `Read Access`
- `Kerja ke Jepang`
- `Informasi karier dan persiapan profesional.`

### Latest discussion

- `Diskusi terbaru`
- `Urutan dan engagement berasal dari data backend.`
- `⌕`
- `Cari diskusi atau topik`

### Post 1

- `DISKUSI MATERI`
- `oleh Rina`
- `Perbedaan penggunaan に dan で untuk tempat?`
- `Pertanyaan grammar untuk memahami konteks aktivitas dan lokasi.`
- `Menunggu Jawaban`

Destination:

- `405:5509`

### Post 2

- `Info dari Hiru`
- `oleh Dimas`
- `Pengingat jadwal dan materi minggu ini`
- `Periksa learning journey dan jadwal sesuai membership aktif.`
- `Terpublikasi`

### Post 3

- `Diskusi Member`
- `oleh Ayu`
- `Tips menjaga konsistensi flashcard N4`
- `Berbagi cara mengatur deck, confidence state, dan kartu yang perlu diulang.`
- `Diskusi Aktif`

### Announcement

- `ℹ`
- `Pengumuman`
- `Hak baca, post, komentar, dan pelaporan mengikuti entitlement membership.`

## LMS entitlement

This Figma explicitly defines Belajar Mandiri as having **write access** for community post/comment/report behavior.

---

# LMS / 40 — Detail Postingan Komunitas

**Figma frame:** `405:5509`

## Exact visible copy

### Header

- `COMMUNITY • DISKUSI MATERI`
- `Perbedaan penggunaan に dan で untuk tempat`
- `Hak baca, balas, lapor, dan moderasi mengikuti entitlement serta backend.`
- `Kembali Community`

`Kembali Community` → `405:5289`

### Original post

- `Rina • Member N4`
- `Waktu publikasi dari backend`
- `DISKUSI MATERI`
- `Perbedaan penggunaan に dan で untuk tempat?`
- `Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.`

### Attachment

- `文`
- `Screenshot materi Chapter 4`
- `File dan metadata berasal dari backend.`
- `Buka`

`Buka` → `813:3118` — attachment state outside this contract

### Engagement

- `♡ Suka • —`
- `Balasan • —`
- `Simpan`

### Replies

- `Balasan`

#### Reply 1

- `Sensei •••1`
- `Sensei`
- `Waktu dinamis`
- `Untuk lokasi keberadaan gunakan に, sedangkan で menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dihubungkan dengan materi terkait.`
- `Balas`
- `Suka`

#### Reply 2

- `Dimas`
- `Member`
- `Waktu dinamis`
- `Penjelasan ini membantu. Saya juga membandingkannya dengan contoh pada reading.`
- `Balas`
- `Suka`

### Reply composer

- `Tulis balasan`
- `◇`
- `Ringkasan`
- `Kirim Balasan`
- `Tambah Gambar`

Destinations:

- `Kirim Balasan` → `813:3132`
- `Tambah Gambar` → `813:3146`

### Learning context

- `Konteks belajar`

- `章`
- `Chapter 4`
- `Pola kalimat sehari-hari.`

- `文`
- `Tata Bahasa`
- `Partikel lokasi dan aktivitas.`

- `先`
- `Diskusi Materi`
- `Thread komunitas untuk membahas chapter, materi, dan latihan.`

### Thread rules

- `Aturan thread`
- `Gunakan bahasa yang sopan`
- `Jangan membagikan data pribadi`
- `Media dapat melalui moderasi`
- `Report dan removal dicatat`

`Report dan removal dicatat` → `405:7603` — moderation/report state outside this contract

### Announcement

- `ℹ`
- `Pengumuman`
- `Hak balas dan pelaporan mengikuti membership. Konten dapat dimoderasi sesuai aturan komunitas.`

---

# LMS / 41 — Feedback Penyelesaian Level

**Figma frame:** `405:5740`

## Exact visible copy

### Header

- `FEEDBACK AKHIR LEVEL • BELAJAR MANDIRI`
- `Bagikan pengalaman setelah seluruh Chapter selesai`
- `Form ini hanya muncul setelah Chapter terakhir pada level aktif selesai.`
- `LEVEL SELESAI`

### Completion summary

- `N4 • BELAJAR MANDIRI`
- `12 dari 12 Chapter selesai`
- `Progress dan status selesai berasal dari backend.`

### Overall rating

- `Penilaian keseluruhan`
- `Pilih rating untuk materi, latihan, dan pengalaman belajar.`
- `★`
- `★`
- `★`
- `★`
- `★`

### Rating categories

- `Materi`
- `Video, modul, dan contoh.`
- `★★★★☆`

- `Latihan`
- `Latihan, checkpoint, dan Try Out.`
- `★★★★☆`

- `Pengalaman`
- `Alur, progress, dan kemudahan.`
- `★★★★☆`

### Feedback

- `Ceritakan pengalamanmu`
- `Apa yang paling membantu dan apa yang perlu diperbaiki?`
- `Tulis masukan untuk tim akademik dan pengembangan produk…`

### Testimonial consent

- `Saya bersedia masukan ini dipertimbangkan sebagai testimoni publik Hiru Academy.`
- `Opsional. Feedback tidak otomatis dipublikasikan dan tetap menunggu moderasi Admin.`

### Actions / note

- `Kirim Feedback`
- `Lewati untuk Sekarang`
- `Feedback dan testimoni disimpan sebagai dua status berbeda.`
- `Tanpa izin, feedback hanya digunakan untuk evaluasi internal.`

Destinations:

- `Kirim Feedback` → `405:7420` — submitted state outside this contract
- `Lewati untuk Sekarang` → `405:4744`

## Trigger rule

This screen is shown only after completion of the final Chapter for the active level, according to the Figma copy. Actual completion must later be backend-authoritative.

---

# LMS / 42 — Pusat Sertifikat

**Figma frame:** `405:5963`

## Exact visible copy

### Header

- `CERTIFICATE CENTER`
- `Sertifikat digital dari milestone yang tervalidasi`
- `Eligibility, issuance, download, dan status sertifikat berasal dari backend. Scope menggunakan sertifikat digital saja.`
- `Profil`

`Profil` → `405:6972`

### Summary

- `DIGITAL CREDENTIALS`
- `Satu sertifikat telah diterbitkan`
- `Jumlah, program, dan eligibility mengikuti progres serta assessment yang valid.`

### Flow indicators

- `✓`
- `Selesaikan journey`
- `✓`
- `Penuhi assessment`
- `✓`
- `Sertifikat terbit`
- `4`
- `Download / share`

### Certificates

- `Sertifikatmu`

#### N5

- `証`
- `DIGITAL`
- `Sertifikat JLPT N5`
- `Member •••1`
- `Program JLPT N5`
- `Sertifikat JLPT N5`
- `Program JLPT N5`
- `Diterbitkan`
- `Lihat Sertifikat`

Destination:

- `405:6196`

#### N4

- `鍵`
- `Sertifikat belum tersedia`
- `Sertifikat JLPT N4`
- `Program JLPT N4`
- `Eligible • Pending`
- `Lihat Kriteria`

Destination:

- `405:7576` — criteria state outside this contract

#### N3

- `鍵`
- `Sertifikat belum tersedia`
- `Sertifikat JLPT N3`
- `Program JLPT N3`
- `Belum Eligible`
- `Lihat Kriteria`

Prototype destination:

- `405:6196`

Preserve the active Figma prototype destination as documented; do not infer a different destination silently.

### Announcement

- `ℹ`
- `Pengumuman`
- `Sertifikat diterbitkan otomatis atau melalui review setelah semua kriteria backend terpenuhi.`

## Scope rule

The Figma explicitly says the scope is **digital certificates only**.

---

# LMS / 43 — Detail Sertifikat

**Figma frame:** `405:6196`

## Exact visible copy

### Header

- `DIGITAL CERTIFICATE`
- `Sertifikat JLPT N5`
- `Data penerima, nomor verifikasi, issue date, download, dan revocation mengikuti backend.`
- `Certificate Center`

`Certificate Center` → `405:5963`

### Certificate

- `証`
- `DIGITAL`
- `SERTIFIKAT KELULUSAN`
- `Member •••1`
- `Telah menyelesaikan program JLPT N5`

### Actions

- `Download PDF`
- `Bagikan`
- `Salin Verification ID`

Prototype destinations:

- `Download PDF` → `813:3160`
- `Bagikan` → `813:3174`
- `Salin Verification ID` → `813:3188`

These are state/action prototypes outside this contract. Do not invent storage/share behavior.

### Certificate activity

- `Aktivitas sertifikat`

- `公`
- `Diterbitkan`
- `Issue time dari backend`
- `Tercatat`

- `下`
- `Diunduh`
- `Download log dari backend`
- `Tercatat`

- `共`
- `Dibagikan`
- `Share event opsional`
- `Opsional`

### Status / verification

- `Status & verifikasi`
- `Issued • Valid`

- `Penerima`
- `Member •••1`

- `Program`
- `JLPT N5`

- `Verification ID`
- `CERT•••N5`

- `Issue date`
- `Dari backend`

- `Status`
- `Valid`

- `Format`
- `Digital PDF`

### Eligibility

- `Eligibility`
- `✓`
- `Journey selesai`
- `✓`
- `Assessment memenuhi rule`
- `✓`
- `Membership valid saat completion`
- `✓`
- `Tidak ada revocation`

### Verification note

- `VERIFICATION`
- `Status validitas harus diperiksa melalui backend. Data desain menggunakan nilai termasking.`

## Fixture rule

Recipient, Verification ID, issue date, activity, and validity shown in the design are masked/sample data, not production certificate records.

---

# LMS / 45 — Pusat Notifikasi

**Figma frame:** `405:6658`

## Exact visible copy

### Header

- `NOTIFICATION CENTER`
- `Informasi penting tanpa mengganggu fokus`
- `Notifikasi, status baca, trigger, waktu, dan delivery berasal dari backend serta preference akun.`
- `Profil`

`Profil` → `405:6972`

### Filters

- `Semua`
- `Belum Dibaca`
- `Belajar`
- `Kelas`
- `Akun`
- `Tandai Semua Dibaca`

`Tandai Semua Dibaca` → `813:3104` — action state outside this contract

### Today

- `Hari ini`

#### Learning notification

- `章`
- `Belajar`
- `Waktu dari backend`
- `Materi Chapter 4 tersedia`
- `Lanjutkan video, modul, dan latihan pada journey aktif.`
- `Buka Chapter`

Destination:

- `405:1216`

#### Class notification

- `時`
- `Class`
- `Waktu dari backend`
- `Pengingat sesi Zoom`
- `Jadwal, Sensei, dan link mengikuti konfigurasi admin.`
- `Lihat Jadwal`

Destination:

- `740:3344` — Sensei-locked state for LMS

#### Feedback notification

- `再`
- `Class`
- `Waktu dari backend`
- `Feedback materi sudah diperbarui`
- `Perubahan feedback mengikuti proses review tim akademik.`
- `Buka Feedback`

Destination:

- `405:5740`

### Previous

- `Sebelumnya`

#### Achievement notification

- `火`
- `Achievement`
- `Waktu dari backend`
- `Achievement baru terbuka`
- `Streak belajar berhasil mencapai milestone baru.`
- `Lihat Achievement`

Destination:

- `405:4744`

#### Account notification

- `期`
- `Account`
- `Waktu dari backend`
- `Periode membership akan berakhir`
- `Tanggal dan opsi renewal mengikuti data backend.`
- `Lihat Membership`

Destination:

- `405:6972`

#### Certificate notification

- `証`
- `Achievement`
- `Waktu dari backend`
- `Sertifikat digital tersedia`
- `Sertifikat dapat dilihat dan diunduh dari Certificate Center.`
- `Buka Sertifikat`

Destination:

- `405:5963`

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Notification preferences

- `Preferensi notifikasi`
- `Channel dan kategori mengikuti pengaturan akun.`

- `知`
- `In-App`
- `Pengumuman dan aktivitas aplikasi.`
- `Aktif`

- `郵`
- `Email`
- `Kelas, akun, dan transaksi.`
- `Aktif`

- `章`
- `Belajar`
- `Journey, latihan, dan achievement.`
- `Aktif`

- `話`
- `Community`
- `Balasan dan aktivitas thread.`
- `Opsional`

- `営`
- `Promosi`
- `Konten marketing opsional.`
- `Off`

### Announcement

- `ℹ`
- `Pengumuman`
- `Notifikasi transaksi dan keamanan tertentu tetap dikirim sesuai kebutuhan sistem.`

## LMS entitlement note

A class/Zoom notification is visible in the notification feed but its `Lihat Jadwal` action goes to `740:3344`, the LMS Sensei-feature locked state. Do not expose Sensei schedule access to Belajar Mandiri.

---

# LMS / 46 — Profil & Keanggotaan

**Figma frame:** `405:6972`

## Exact visible copy

### Header

- `AKUN & MEMBERSHIP`
- `Profil dan status belajarmu`
- `Kelola informasi akun, membership, sertifikat, dan preferensi.`

### Account fixture

- `Hilmi`
- `hilmi.student@example.com`
- `Level N4`

### Membership

- `STATUS MEMBERSHIP`
- `Belajar Mandiri`
- `Periode akses dan tanggal akhir berasal dari backend.`
- `Perpanjang Membership`

Destinations:

- membership card → `405:7495` — membership state outside this contract
- `Perpanjang Membership` → `405:7157`

### Learning stats

- `65%`
- `Progres N4`
- `450`
- `Kanji dikuasai`
- `12`
- `Hari beruntun`

### Certificates

- `Sertifikat`
- `Diterbitkan`
- `Sertifikat N5`
- `Belum Memenuhi`
- `Sertifikat N4`

`Sertifikat N5` → `405:5963`

### Account settings

- `Pengaturan akun`

- `人`
- `Edit Profil`
- `Nama, WhatsApp, dan preferensi belajar.`

- `鍵`
- `Ganti Kata Sandi`
- `Perbarui keamanan akun.`

- `知`
- `Notifikasi`
- `Atur pengingat belajar dan informasi kelas.`

`Notifikasi` → `405:6658`

### Referral & discount

- `REFERRAL & DISKON`
- `Kode referral saya`
- `HIRU-HILMI`
- `Teman mendapat diskon. Reward milikmu aktif setelah invoice teman diverifikasi Admin.`
- `1 reward diskon tersedia`
- `Nilai & masa berlaku dari backend`
- `Salin Kode`
- `Bagikan`
- `Gunakan`

Prototype destinations:

- `Salin Kode` → `784:3247`
- `Bagikan` → `784:3259`
- `Gunakan` → `405:7157`

## Fixture / backend-driven values

Name, email, active level, progress, Kanji count, streak, certificate states, referral code, and reward count are sample account data.

---

# LMS / 47 — Perpanjangan

**Figma frame:** `405:7157`

## Exact visible copy

### Header

- `MEMBERSHIP RENEWAL`
- `Lanjutkan akses tanpa kehilangan progres`
- `Harga dan periode baru tampil setelah plan dipilih; data berasal dari konfigurasi admin.`

### Current membership

- `Membership Aktif`
- `Belajar Mandiri • N4`
- `Tanggal berakhir dan sisa hari ditampilkan dari backend. Progres tetap tersimpan setelah renewal.`

### Plan selection

- `Pilih plan lanjutan`

#### LMS

- `LMS`
- `Belajar Mandiri`
- `Journey penuh, try out, review, sertifikat, dan community write.`
- `Harga dinamis setelah pilihan`

#### LMS + Zoom

- `LMS + Zoom`
- `Belajar dengan Sensei`
- `Semua LMS ditambah cohort, jadwal Zoom, Sensei, dan replay.`
- `Harga dinamis setelah pilihan`

### Referral reward

- `REWARD REFERRAL TERSEDIA`
- `Gunakan reward diskon pada invoice renewal berikutnya`
- `Nilai, batas penggunaan, dan masa berlaku dihitung backend.`
- `Gunakan Reward`

### Renewal summary

- `RINGKASAN RENEWAL`
- `Belajar Mandiri • periode baru`
- `Nominal dan tanggal aktif baru mengikuti pilihan dan verifikasi invoice.`
- `Buat Invoice & Buka WhatsApp`

Destination:

- `Buat Invoice & Buka WhatsApp` → `390:2453`

### Announcement / back

- `!`
- `Pengumuman`
- `Membership aktif setelah pembayaran via WhatsApp dan invoice diverifikasi Admin.`
- `Kembali ke Profil`

`Kembali ke Profil` → `405:6972`

## Frontend-first rule

Do not invent final price, renewal period, discount amount, WhatsApp contact, payment gateway, invoice number, or activation logic. These values remain dynamic/open until the commercial/backend phase.

---

# Layer E verified flows

## Latihan Harian

```text
Latihan Harian
  ├─ Flashcard Review → Kumpulan Flashcard
  ├─ Audio Drill → Soal Audio
  ├─ Reading Drill → Soal Reading
  ├─ Checkpoint Retry → Checkpoint
  └─ Buka Daftar Try Out → Daftar Try Out
```

## Try Out

```text
Daftar Try Out
  → Informasi Try Out
  → Pengerjaan Try Out
  → Hasil Try Out
  → Ulasan Jawaban

Daftar Try Out also exposes:
  ├─ Menunggu state
  ├─ Terkunci state
  ├─ Attempt Habis state
  └─ Review Tertutup state

Timer → Waktu Habis state
```

The exact state screens reached through `750:*` nodes are not duplicated here; document them in the Page 09 status contract.

## Community

```text
Komunitas
  ├─ Buat Postingan → create-post state
  └─ Postingan → Detail Postingan
       ├─ attachment action
       ├─ reply action
       ├─ add-image action
       └─ report/moderation state
```

## Progress / certificate

```text
Progres & Pencapaian
  ↔ Papan Peringkat

Progres
  → Profil

Pusat Sertifikat
  → Detail Sertifikat
  → download/share/copy verification actions
```

## Membership

```text
Profil & Keanggotaan
  → Perpanjangan
      → invoice / WhatsApp flow

Profil
  → Notifikasi
  → Certificate Center
```

---

# Page 09 Layer E entitlement rules verified from Figma

For **Belajar Mandiri**:

- Latihan Harian is active.
- Try Out is available according to per-Try-Out access/configuration.
- Try Out supports explicit states such as available, scheduled/waiting, locked by level/rule, attempts exhausted, and review disabled.
- Perpustakaan access is membership + level/material entitlement driven; individual material can still be locked.
- Community allows post, comment/reply, and report behavior.
- Progres & Achievement is available.
- Leaderboard is available.
- Certificate Center is available, while each certificate still has eligibility/issuance state.
- Notifications are available.
- Profile & membership management is available.
- Renewal can keep LMS or select LMS + Zoom.
- Sensei schedule is **not** an LMS entitlement; a Zoom/class notification routes to the Sensei-feature locked state.

Do not use Free entitlement rules for LMS supporting features.

---

# Differences from Free that matter in Layer E

Do not simply clone the Free supporting-feature behavior.

- LMS has active Latihan Harian rather than Free-limited behavior.
- LMS has Try Out list/info/runner/result/review access when configured.
- LMS community is write-capable: post, reply/comment, and report.
- LMS has Certificate Center and digital certificate flows.
- LMS has full profile/membership/renewal presentation.
- LMS can receive renewal and referral reward UI.
- LMS still does **not** gain Sensei-only schedule/replay/Tanya Sensei/Mini Checkpoint access.
- Locks inside Try Out, Library, Certificates, and milestones can come from item-level rules, level ownership, attempts, eligibility, or configuration—not only membership tier.

---

# Dynamic / fixture values that must remain replaceable

Do not hardcode the following as final product rules merely because they appear in the Figma example:

- N4 as the active level
- Chapter 4
- 15–20 minute recommendation
- 4 daily activities
- 12-day streak
- 18 completed activities
- 82% accuracy
- drill question counts
- Try Out titles and dates
- 100 questions / 90 minutes / 2 attempts
- `01:12:36`
- `23:29 WIB`
- Try Out score `82 / 100`
- section percentages
- ranking positions and movement
- aliases/member names
- `12 dari 12 Chapter`
- rating values
- certificate programs/statuses
- `148` notifications
- user `Hilmi`
- email `hilmi.student@example.com`
- `450` Kanji
- referral code `HIRU-HILMI`
- reward quantity
- renewal price or period

These are deterministic design fixtures or values explicitly described by the Figma as backend-driven.

---

# Layer E frontend-first implementation rules

1. Exact visible copy, hierarchy, supported states, and explicit button destinations come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the existing shared LMS navigation; do not recreate the sidebar.
4. Reuse the existing `AssessmentRunner` family for Try Out where it fits the verified Figma flow.
5. Keep Latihan Harian separate from Try Out as Figma explicitly requires.
6. Preserve per-item access states; do not reduce all locks to membership-level Upgrade logic.
7. Community for LMS is writable; do not reuse Free read-only behavior.
8. Sensei-owned features remain locked/unavailable for LMS even when surfaced contextually.
9. Certificates are digital-only in the current Figma contract.
10. Keep names, progress, scores, timers, attempts, ranks, certificate data, notifications, and referral values deterministic and replaceable.
11. Do not pretend frontend state is real backend persistence.
12. Do not implement Laravel, Sanctum, database persistence, server timer, autosave, attempt authority, certificate issuance, file upload/storage, moderation backend, email delivery, payment verification, invoice activation, or WhatsApp integration during this frontend-only contract phase.
13. Do not invent copy for external destination/state nodes. Extract those from the appropriate Figma layer before implementation if needed.
14. Change only the active screen/batch during implementation; avoid unrelated refactors and speculative abstractions.
15. Preserve exact Japanese text, punctuation, capitalization, bullets, dashes, symbols, and spacing intent from the VERIFIED copy.
