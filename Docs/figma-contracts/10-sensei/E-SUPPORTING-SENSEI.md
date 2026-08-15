# E-SUPPORTING — Page 10 / Belajar dengan Sensei

> Figma source: **Page 10 — E2E / Belajar dengan Sensei** (`388:16`)  
> Layer: **E — Fitur Pendukung** (`388:21`)  
> Screens: **SENSEI / 30–43, 45–52** + referral/reward states located inside Layer E  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Runtime/user/progress/cohort/schedule/replay/assessment values: **FIXTURE / BACKEND-DRIVEN where noted**
- State nodes reached outside Layer E are referenced by node ID only; their exact copy belongs to Layer F unless the state itself is physically located inside Layer E.
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API/Zoom/storage/payment implementation while extracting or applying this frontend-first contract.

## Important numbering fact

The active Page 10 Layer E contains:

- `SENSEI / 30` through `SENSEI / 43`
- no `SENSEI / 44`
- `SENSEI / 45` through `SENSEI / 52`

Do not invent a Screen 44.

Mini Checkpoint is **not** part of Layer E. It is a separate Page 10 **Layer J** and will be contracted separately.

---

# Layer E frame inventory

| Screen | Figma frame |
|---|---|
| SENSEI / 30 — Latihan Harian | `418:3231` |
| SENSEI / 31 — Daftar Try Out | `418:3518` |
| SENSEI / 32 — Informasi Try Out | `418:3922` |
| SENSEI / 33 — Pengerjaan Try Out | `418:4094` |
| SENSEI / 34 — Hasil Try Out | `418:4235` |
| SENSEI / 35 — Ulasan Jawaban | `418:4455` |
| SENSEI / 36 — Perpustakaan Materi | `418:4664` |
| SENSEI / 37 — Progres & Pencapaian | `418:4930` |
| SENSEI / 38 — Papan Peringkat | `418:5165` |
| SENSEI / 39 — Komunitas | `425:3073` |
| SENSEI / 40 — Detail Postingan Komunitas | `425:3293` |
| SENSEI / 41 — Tanya Sensei | `425:3524` |
| SENSEI / 42 — Pusat Sertifikat | `418:6119` |
| SENSEI / 43 — Detail Sertifikat | `418:6352` |
| SENSEI / 45 — Pusat Notifikasi | `418:6814` |
| SENSEI / 46 — Profil & Keanggotaan | `418:7128` |
| SENSEI / 47 — Perpanjangan | `418:7313` |
| SENSEI / 48 — Jadwal Zoom | `419:2913` |
| SENSEI / 49 — Detail Kelas | `419:3197` |
| SENSEI / 50 — Daftar Replay | `419:3437` |
| SENSEI / 51 — Pemutar Replay | `419:3711` |
| SENSEI / 52 — Feedback Penyelesaian Level | `765:4155` |
| KONDISI R6-01 — Kode Referral Disalin | `787:4251` |
| KONDISI R6-02 — Bagikan Referral | `787:4263` |
| KONDISI R6-03 — Reward Diskon Diterapkan | `787:30239` |

---

# Shared Sensei sidebar

Reuse the same shared student navigation already documented in Page 10 Layer C/D.

## Exact visible copy

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

## Common verified destinations

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

---

# SENSEI / 30 — Latihan Harian

**Figma frame:** `418:3231`

## Exact visible copy

- `LATIHAN HARIAN • BELAJAR DENGAN SENSEI`
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

- `Mulai Rekomendasi` → `418:1823`
- `Buka Daftar Try Out` → `418:3518`

### Metrics

- `4 aktivitas`
- `Target harian`
- `12 hari`
- `Hari beruntun`
- `18`
- `Selesai minggu ini`
- `82%`
- `Akurasi`

### Modes

- `PILIH MODE`
- `Latihan Harian`
- `Pilih aktivitas singkat tanpa masuk ke alur Try Out.`

#### Flashcard Review

- `札`
- `Flashcard Review`
- `REKOMENDASI`
- `Ulangi kosakata dan pola dengan confidence state.`
- `5–10 menit • deck level aktif`

Destination → `418:1823`

#### Audio Drill

- `聴`
- `Audio Drill`
- `TERSEDIA`
- `Latihan listening dari Chapter aktif.`
- `10 soal • hasil langsung`

Destination → `418:2641`

#### Reading Drill

- `読`
- `Reading Drill`
- `TERSEDIA`
- `Bacaan pendek dengan penjelasan jawaban.`
- `8 soal • fokus Dokkai`

Destination → `418:2839`

#### Checkpoint Retry

- `試`
- `Checkpoint Retry`
- `TERSEDIA`
- `Ulangi checkpoint sesuai attempt rule Chapter.`
- `Nilai terbaru tersimpan`

Destination → `418:3028`

### History

- `RIWAYAT HARIAN`
- `Aktivitas terakhir`
- `Riwayat latihan tetap terpisah dari hasil Try Out.`
- `Hari ini • Flashcard Review • 86% akurasi`
- `Kemarin • Audio Drill • 8/10 benar     |     2 hari lalu • Reading Drill • 7/8 benar`

## Fixture rule

Durations, counts, streak, accuracy, Chapter number, and history are design/runtime fixtures.

---

# SENSEI / 31 — Daftar Try Out

**Figma frame:** `418:3518`

## Exact visible copy

### Header

- `TRY OUT • SIMULASI JLPT`
- `Pilih Try Out yang tersedia`
- `Akses, tanggal, attempt, dan ulasan jawaban mengikuti konfigurasi Admin.`
- `BACKEND DRIVEN`

### Filters

- `ATURAN AKSES`
- `SEMUA LEVEL`
- `N4`
- `TERSEDIA`
- `SELESAI`
- `REVIEW AKTIF`

### List

- `DAFTAR TRY OUT`
- `Simulasi yang tersedia`
- `Setiap kartu menjelaskan status, attempt, dan akses review.`

#### N4 Simulation 1

- `試`
- `Try Out N4 — Simulasi 1`
- `TERSEDIA`
- `Simulasi penuh dengan review jawaban setelah submit.`
- `100 soal • 90 menit • 2 attempt`

Destination → `418:3922`

#### N3 August

- `時`
- `Try Out N3 — Agustus`
- `MENUNGGU`
- `Dijadwalkan dan belum dapat dimulai.`
- `Mulai 12 Agustus • 1 attempt`

Destination → `752:4016` — state outside Layer E

#### N2 locked

- `鍵`
- `Try Out N2 — Latihan Resmi`
- `TERKUNCI`
- `Memerlukan level N2 aktif atau aturan khusus Admin.`
- `Level tidak aktif • review tersedia`

Destination → `752:3995`

#### Attempts exhausted

- `再`
- `Try Out N4 — Simulasi 2025`
- `ATTEMPT HABIS`
- `Seluruh attempt sudah digunakan.`
- `Nilai terakhir 78 • 0 attempt`

Destination → `752:4037`

#### Review disabled

- `答`
- `Try Out N4 — Review Tertutup`
- `SELESAI`
- `Hasil tersedia tetapi pembahasan dinonaktifkan.`
- `Nilai 82 • review off`

Destination → `752:4079`

#### Daily practice

- `練`
- `Latihan Harian`
- `AKTIF`
- `Kembali ke drill singkat dan rekomendasi harian.`
- `Tidak menggunakan attempt Try Out`

Destination → `418:3231`

### Footer rule

- `Try Out berbeda dari Latihan Harian: memiliki timer, jumlah soal, attempt, hasil, dan aturan review tersendiri.`

---

# SENSEI / 32 — Informasi Try Out

**Figma frame:** `418:3922`

## Exact visible copy

- `TRY OUT N4 • SIMULASI 1`
- `Periksa aturan sebelum memulai`
- `Attempt baru dicatat setelah sesi benar-benar dimulai.`
- `TERSEDIA`

### Summary

- `SIMULASI JLPT N4`
- `100 soal • 90 menit • 2 attempt tersedia`
- `Jawaban tersimpan otomatis. Saat waktu habis, sistem melakukan auto-submit dan mengarahkan ke hasil.`
- `Mulai Try Out`
- `Kembali ke Daftar`

Destinations:

- `Mulai Try Out` → `418:4094`
- `Kembali ke Daftar` → `418:3518`

### Rules

- `ATURAN SESI`
- `Yang perlu diperhatikan`
- `Semua ketentuan berasal dari konfigurasi Try Out di Admin.`

#### Access

- `鍵`
- `Akses`
- `AKTIF`
- `Belajar dengan Sensei • Level N4 aktif`
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

### Footer

- `Dengan memulai, pengguna menyetujui timer, autosave, auto-submit, dan pencatatan attempt.`
- `Koneksi terputus tidak menghapus jawaban yang sudah tersimpan di backend.`

---

# SENSEI / 33 — Pengerjaan Try Out

**Figma frame:** `418:4094`

## Exact visible copy

### Header / timer

- `TRY OUT N4 • SESI BERJALAN`
- `Soal 18 dari 100`
- `Jawaban tersimpan otomatis dan timer dikendalikan backend.`
- `ATTEMPT 1/2`
- `SISA WAKTU`
- `01:12:36`
- `Klik untuk melihat state waktu habis`

Timer destination → `752:4058`

### Metrics

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

### Controls

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

### Submit/footer

- `Akhiri & Kirim`
- `Kembali ke Daftar`
- `Jawaban terakhir tersimpan • 23:29 WIB`
- `Saat timer mencapai 00:00, sistem mengirim jawaban otomatis.`

Destinations:

- `Akhiri & Kirim` → `418:4235`
- `Kembali ke Daftar` → `418:3518`

## Frontend-first rule

Timer/autosave/attempt behavior may be visually simulated with deterministic state. Do not claim real server authority before backend integration.

---

# SENSEI / 34 — Hasil Try Out

**Figma frame:** `418:4235`

## Exact visible copy

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

- `Ulasan Jawaban` → `418:4455`
- `Kembali ke Daftar` → `418:3518`

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

### Recommendations

- `強`
- `Kekuatan`
- `AKTIF`
- `Kosakata dan listening menunjukkan hasil stabil.`
- `Pertahankan review flashcard`

Destination → `418:3231`

- `補`
- `Perlu Diperkuat`
- `REKOMENDASI`
- `Dokkai dan pola kalimat masih di bawah target.`
- `Direkomendasikan Reading Drill`

Destination → `418:2839`

### Attempts/review

- `ATTEMPT & REVIEW`
- `1 attempt tersisa • Ulasan jawaban aktif • Hasil tersimpan permanen`
- `Admin dapat mengubah jumlah attempt atau menonaktifkan review untuk Try Out berikutnya.`

---

# SENSEI / 35 — Ulasan Jawaban

**Figma frame:** `418:4455`

## Exact visible copy

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

- `Kembali ke Hasil` → `418:4235`
- `Latihan Rekomendasi` → `418:3231`

---

# SENSEI / 36 — Perpustakaan Materi

**Figma frame:** `418:4664`

## Exact visible copy

- `PERPUSTAKAAN MATERI`
- `Temukan kembali materi dari seluruh journey`
- `Akses material mengikuti level dan entitlement membership.`

### Search/filters

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

Search state destination → `418:7597`

### Materials

#### Grammar

- `文`
- `Tata Bahasa`
- `Pola Kalimat Sehari-hari`
- `Modul Chapter 4 yang terakhir dibuka.`
- `Tersimpan`

Destination → `418:1419`

#### Kanji

- `漢`
- `Kanji`
- `Keadaan, Waktu & Aktivitas`
- `Kanji chapter dengan bookmark dan catatan.`
- `Tersedia`

Destination → `418:1621`

#### Audio

- `聴`
- `Audio`
- `Simulasi Choukai N4`
- `Akses audio lengkap mengikuti membership.`
- `Terkunci`

Destination → `418:7624`

### Recent

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

## Access note

Even Sensei can encounter a locked material card because item/level/content entitlement can differ from membership tier. Do not globally assume every library asset is unlocked.

---

# SENSEI / 37 — Progres & Pencapaian

**Figma frame:** `418:4930`

## Exact visible copy

- `PROGRES & ACHIEVEMENT`
- `Rayakan progres tanpa kehilangan fokus`
- `Progress, streak, mastery, dan achievement dihitung dari journey serta aktivitas backend.`
- `Profil`

`Profil` → `418:7128`

### Summary

- `MEMBER • LEVEL N4`
- `Perjalanan belajar terus bertumbuh`
- `Persentase dan milestone mengikuti completion serta assessment yang valid.`
- `12 Hari Streak`
- `65%`
- `Journey N4`
- `450`
- `Kanji mastered`
- `—`
- `Latihan selesai`
- `—`
- `Try Out terbaik`

### Milestones

- `Milestone journey`

- `✓`
- `Fondasi N4`
- `Chapter awal dan checkpoint`
- `Selesai`

- `✓`
- `Rutinitas Harian`
- `Video, modul, dan latihan`
- `Selesai`

- `03`
- `Pola Kalimat`
- `Chapter aktif`
- `Aktif`

- `04`
- `Try Out N4`
- `Tersedia setelah journey`
- `Terkunci`

- `05`
- `Sertifikat N4`
- `Mengikuti eligibility`
- `Terkunci`

### Achievement

- `Achievement`
- `Leaderboard`

`Leaderboard` → `418:5165`

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

---

# SENSEI / 38 — Papan Peringkat

**Figma frame:** `418:5165`

## Exact visible copy

- `LEADERBOARD`
- `Bandingkan konsistensi, bukan tekanan`
- `Poin, periode, cohort, rank, dan movement berasal dari backend serta dapat menggunakan nama samaran.`
- `Progres`

`Progres` → `418:4930`

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

- `04`
- `Member •••4`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `↑ 2`

- `05`
- `Member •••5`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `—`

- `06`
- `Member •••6`
- `Member community`
- `Poin —`
- `Poin dinamis`
- `↓ 1`

- `07`
- `Kamu`
- `Posisimu saat ini`
- `Poin —`
- `Poin dinamis`
- `↑ 3`

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

---

# SENSEI / 39 — Komunitas

**Figma frame:** `425:3073`

## Exact visible copy

### Header

- `FORUM KOMUNITAS`
- `Berdiskusi, bertanya, dan berbagi perjalanan belajar`
- `Belajar dengan Sensei dapat membuat post, membalas komentar, dan menggunakan Tanya Sensei sesuai entitlement.`
- `Buat Postingan`

`Buat Postingan` → `418:7538`

### Access cards

- `先`
- `SENSEI`
- `Tanya Sensei`
- `Pertanyaan untuk pengajar pada plan Belajar dengan Sensei.`

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

### Discussions

- `Diskusi terbaru`
- `Urutan dan engagement berasal dari data backend.`
- `⌕`
- `Cari diskusi atau topik`

#### Post 1

- `Tanya Sensei`
- `oleh Rina`
- `Perbedaan penggunaan に dan で untuk tempat?`
- `Pertanyaan grammar untuk memahami konteks aktivitas dan lokasi.`
- `Menunggu Jawaban`

Destination → `425:3293`

#### Post 2

- `Info dari Hiru`
- `oleh Dimas`
- `Pengingat jadwal dan materi minggu ini`
- `Periksa learning journey dan jadwal sesuai membership aktif.`
- `Terpublikasi`

#### Post 3

- `Diskusi Member`
- `oleh Ayu`
- `Tips menjaga konsistensi flashcard N4`
- `Berbagi cara mengatur deck, confidence state, dan kartu yang perlu diulang.`
- `Diskusi Aktif`

### Announcement

- `ℹ`
- `Pengumuman`
- `Hak baca, post, dan Tanya Sensei mengikuti entitlement membership.`

---

# SENSEI / 40 — Detail Postingan Komunitas

**Figma frame:** `425:3293`

## Exact visible copy

### Header

- `COMMUNITY • TANYA SENSEI`
- `Perbedaan penggunaan に dan で untuk tempat`
- `Hak baca, balas, Tanya Sensei, dan moderasi mengikuti entitlement serta backend.`
- `Kembali Community`

Destination → `425:3073`

### Original post

- `Rina • Member N4`
- `Waktu publikasi dari backend`
- `Tanya Sensei`
- `Perbedaan penggunaan に dan で untuk tempat?`
- `Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.`

### Attachment

- `文`
- `Screenshot materi Chapter 4`
- `File dan metadata berasal dari backend.`
- `Buka`

Destination → `814:4097`

### Engagement

- `♡ Suka • —`
- `Balasan • —`
- `Simpan`

### Replies

- `Balasan`

- `Sensei •••1`
- `Sensei`
- `Waktu dinamis`
- `Untuk lokasi keberadaan gunakan に, sedangkan で menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dihubungkan dengan materi terkait.`
- `Balas`
- `Suka`

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

- `Kirim Balasan` → `814:4111`
- `Tambah Gambar` → `814:4125`

### Context

- `Konteks belajar`
- `章`
- `Chapter 4`
- `Pola kalimat sehari-hari.`
- `文`
- `Tata Bahasa`
- `Partikel lokasi dan aktivitas.`
- `先`
- `Tanya Sensei`
- `Fitur paket Belajar dengan Sensei.`

### Thread rules

- `Aturan thread`
- `Gunakan bahasa yang sopan`
- `Jangan membagikan data pribadi`
- `Media dapat melalui moderasi`
- `Report dan removal dicatat`

Report destination → `418:7759`

### Announcement

- `ℹ`
- `Pengumuman`
- `Hak balas dan Tanya Sensei mengikuti membership. Konten dapat dimoderasi sesuai aturan komunitas.`

---

# SENSEI / 41 — Tanya Sensei

**Figma frame:** `425:3524`

## Exact visible copy

### Header

- `TANYA SENSEI`
- `Kirim pertanyaan yang terhubung ke materi, Chapter, replay, atau soal.`
- `Pertanyaan dikirim ke antrean Sensei dan tim akademik sesuai konteks belajar.`
- `Buka Community`

`Buka Community` → `425:3073`

### Tabs/status

- `Tanya Sensei`
- `SENSEI`
- `Riwayat Pertanyaan`
- `Semua Plan`
- `Draft`
- `Tersimpan`

### Composer

- `Tulis pertanyaan untuk Sensei`
- `Pilih konteks agar pertanyaan terhubung dengan chapter, materi, replay, atau soal tertentu.`

- `Konteks`
- `Chapter 4 • Video Lesson`
- `⌄`

- `Jenis`
- `Pertanyaan Materi`
- `⌄`

- `Judul Pertanyaan`
- `Ringkas pertanyaanmu`
- `Teks bantuan opsional`

- `◇`
- `Ringkasan`

### Attachment

- `画`
- `Lampiran gambar opsional`
- `Tambahkan screenshot materi atau soal bila diperlukan.`
- `Pilih Gambar`

Destination → `814:4195`

### Submit/draft

- `Pertanyaan dapat ditinjau dan diarahkan ke Sensei yang sesuai.`
- `Kirim Pertanyaan`
- `Simpan Draft`

Destinations:

- `Kirim Pertanyaan` → `418:7576`
- `Simpan Draft` → `771:6898`

### Routing

- `Sensei / Tim Akademik`
- `Penanggung jawab dan estimasi respons berasal dari routing backend.`
- `SENSEI`
- `Waktu respons`
- `Ditentukan admin berdasarkan antrean dan jenis pertanyaan.`

### History

- `Riwayat terakhir`
- `Pertanyaan grammar Chapter 3`
- `Terjawab`
- `Pertanyaan replay kelas`
- `Diproses`
- `Catatan materi kanji`
- `Draft`

## Rule

Sensei assignment and response timing are backend/admin-driven. Do not invent a fixed Sensei identity or SLA.

---

# SENSEI / 42 — Pusat Sertifikat

**Figma frame:** `418:6119`

## Exact visible copy

- `CERTIFICATE CENTER`
- `Sertifikat digital dari milestone yang tervalidasi`
- `Eligibility, issuance, download, dan status sertifikat berasal dari backend. Scope menggunakan sertifikat digital saja.`
- `Profil`

`Profil` → `418:7128`

### Summary

- `DIGITAL CREDENTIALS`
- `Satu sertifikat telah diterbitkan`
- `Jumlah, program, dan eligibility mengikuti progres serta assessment yang valid.`

### Flow

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

Destination → `418:6352`

#### N4

- `鍵`
- `Sertifikat belum tersedia`
- `Sertifikat JLPT N4`
- `Program JLPT N4`
- `Eligible • Pending`
- `Lihat Kriteria`

Destination → `418:7732`

#### N3

- `鍵`
- `Sertifikat belum tersedia`
- `Sertifikat JLPT N3`
- `Program JLPT N3`
- `Belum Eligible`
- `Lihat Kriteria`

Prototype destination → `418:6352`

### Announcement

- `ℹ`
- `Pengumuman`
- `Sertifikat diterbitkan otomatis atau melalui review setelah semua kriteria backend terpenuhi.`

---

# SENSEI / 43 — Detail Sertifikat

**Figma frame:** `418:6352`

## Exact visible copy

- `DIGITAL CERTIFICATE`
- `Sertifikat JLPT N5`
- `Data penerima, nomor verifikasi, issue date, download, dan revocation mengikuti backend.`
- `Certificate Center`

`Certificate Center` → `418:6119`

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

Destinations:

- `Download PDF` → `814:4139`
- `Bagikan` → `814:4153`
- `Salin Verification ID` → `814:4167`

### Activity

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

### Verification

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

### Notice

- `VERIFICATION`
- `Status validitas harus diperiksa melalui backend. Data desain menggunakan nilai termasking.`

---

# SENSEI / 45 — Pusat Notifikasi

**Figma frame:** `418:6814`

## Exact visible copy

### Header

- `NOTIFICATION CENTER`
- `Informasi penting tanpa mengganggu fokus`
- `Notifikasi, status baca, trigger, waktu, dan delivery berasal dari backend serta preference akun.`
- `Profil`

`Profil` → `418:7128`

### Filters/action

- `Semua`
- `Belum Dibaca`
- `Belajar`
- `Kelas`
- `Akun`
- `Tandai Semua Dibaca`

Destination → `814:4083`

### Today

- `Hari ini`

#### Learning

- `章`
- `Belajar`
- `Waktu dari backend`
- `Materi Chapter 4 tersedia`
- `Lanjutkan video, modul, dan latihan pada journey aktif.`
- `Buka Chapter`

Destination → `418:997`

#### Zoom

- `時`
- `Class`
- `Waktu dari backend`
- `Pengingat sesi Zoom`
- `Jadwal, Sensei, dan link mengikuti konfigurasi admin.`
- `Lihat Jadwal`

Destination → `419:2913`

#### Replay

- `再`
- `Class`
- `Waktu dari backend`
- `Replay kelas sudah dipublikasikan`
- `Replay dapat ditonton selama entitlement aktif.`
- `Buka Replay`

Destination → `419:3437`

### Previous

- `Sebelumnya`

#### Achievement

- `火`
- `Achievement`
- `Waktu dari backend`
- `Achievement baru terbuka`
- `Streak belajar berhasil mencapai milestone baru.`
- `Lihat Achievement`

Destination → `418:4930`

#### Account

- `期`
- `Account`
- `Waktu dari backend`
- `Periode membership akan berakhir`
- `Tanggal dan opsi renewal mengikuti data backend.`
- `Lihat Membership`

Destination → `418:7128`

#### Certificate

- `証`
- `Achievement`
- `Waktu dari backend`
- `Sertifikat digital tersedia`
- `Sertifikat dapat dilihat dan diunduh dari Certificate Center.`
- `Buka Sertifikat`

Destination → `418:6119`

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Preferences

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

---

# SENSEI / 46 — Profil & Keanggotaan

**Figma frame:** `418:7128`

## Exact visible copy

### Header/profile

- `AKUN & MEMBERSHIP`
- `Profil dan status belajarmu`
- `Kelola informasi akun, membership, sertifikat, dan preferensi.`
- `Hilmi`
- `hilmi.student@example.com`
- `Level N4`

### Membership

- `STATUS MEMBERSHIP`
- `Belajar Mandiri`
- `Periode akses dan tanggal akhir berasal dari backend.`
- `Perpanjang Membership`

Destinations:

- membership card → `418:7651`
- `Perpanjang Membership` → `418:7313`

### Stats

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

`Sertifikat N5` → `418:6119`

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

`Notifikasi` → `418:6814`

### Referral

- `REFERRAL & DISKON`
- `Kode referral saya`
- `HIRU-HILMI`
- `Teman mendapat diskon. Reward milikmu aktif setelah invoice teman diverifikasi Admin.`
- `1 reward diskon tersedia`
- `Nilai & masa berlaku dari backend`
- `Salin Kode`
- `Bagikan`
- `Gunakan`

Destinations:

- `Salin Kode` → `787:4251`
- `Bagikan` → `787:4263`
- `Gunakan` → `418:7313`

## OPEN COPY/CONTEXT ALIGNMENT

This is a **Page 10 / Belajar dengan Sensei** profile frame, but its visible membership value is:

`Belajar Mandiri`

Do not silently rewrite it in code. Preserve the Figma contract and flag this exact value for client/Figma reconciliation before final client-copy freeze.

Global product entitlement remains: this Page 10 role is Belajar dengan Sensei.

---

# SENSEI / 47 — Perpanjangan

**Figma frame:** `418:7313`

## Exact visible copy

### Header/current state

- `MEMBERSHIP RENEWAL`
- `Lanjutkan akses tanpa kehilangan progres`
- `Harga dan periode baru tampil setelah plan dipilih; data berasal dari konfigurasi admin.`
- `Membership Aktif`
- `Belajar Mandiri • N4`
- `Tanggal berakhir dan sisa hari ditampilkan dari backend. Progres tetap tersimpan setelah renewal.`

### Plans

- `Pilih plan lanjutan`

#### LMS

- `LMS`
- `Belajar Mandiri`
- `Journey penuh, try out, review, sertifikat, dan community write.`
- `Harga dinamis setelah pilihan`

#### Sensei

- `SENSEI`
- `Belajar dengan Sensei`
- `Semua LMS ditambah cohort, jadwal Zoom, Sensei, dan replay.`
- `Harga dinamis setelah pilihan`

### Referral reward

- `REWARD REFERRAL TERSEDIA`
- `Gunakan reward diskon pada invoice renewal berikutnya`
- `Nilai, batas penggunaan, dan masa berlaku dihitung backend.`
- `Gunakan Reward`

Destination → `787:30239`

### Summary

- `RINGKASAN RENEWAL`
- `Belajar Mandiri • periode baru`
- `Nominal dan tanggal aktif baru mengikuti pilihan dan verifikasi invoice.`
- `Buat Invoice & Buka WhatsApp`

Destination → `391:2453`

### Announcement/back

- `!`
- `Pengumuman`
- `Membership aktif setelah pembayaran via WhatsApp dan invoice diverifikasi Admin.`
- `Kembali ke Profil`

`Kembali ke Profil` → `418:7128`

## OPEN CONTEXT ALIGNMENT

This Sensei Page 10 frame currently presents:

- `Belajar Mandiri • N4`
- `Belajar Mandiri • periode baru`

This may be a renewal-plan example state, but the Figma alone does not establish why a Sensei account is currently represented as Belajar Mandiri.

Do not silently change these strings. Keep them as verified Figma copy and resolve before final client-copy freeze if needed.

---

# SENSEI / 48 — Jadwal Zoom

**Figma frame:** `419:2913`

## Exact visible copy

### Header

- `BELAJAR DENGAN SENSEI • JADWAL KELAS`
- `Jadwal cohort dan sesi bersama Sensei`
- `Tanggal, jam, durasi, Sensei, cohort, dan link kelas mengikuti konfigurasi admin.`
- `Lihat Replay`

`Lihat Replay` → `419:3437`

### Calendar controls

- `‹`
- `Periode aktif dari admin`
- `›`
- `Cohort Aktif`
- `Kalender`
- `Daftar`
- `Sen`
- `Sel`
- `Rab`
- `Kam`
- `Jum`
- `Sab`
- `Min`

Calendar cells intentionally use runtime placeholders including repeated:

- `—`
- `Zoom`
- `Replay`

A calendar session cell routes to `419:3922` — schedule empty/state node outside this Layer E contract.

### Sessions

- `Sesi mendatang`
- `Data sesi diperbarui oleh admin.`

#### Live session

- `Chapter 4 • Sesi Live`
- `Hari/Tanggal • Jam WIB • Sensei dari admin`
- `Terjadwal`

Destination → `419:3197`

#### Cohort consultation

- `Konsultasi Cohort`
- `Jadwal dan topik mengikuti cohort aktif`
- `Terjadwal`

#### Previous

- `Sesi sebelumnya`
- `Replay tersedia setelah dipublikasikan`
- `Selesai`

### Announcement/back

- `ℹ`
- `Pengumuman`
- `Link Zoom aktif sesuai waktu dan status yang ditentukan admin.`
- `Kembali Dashboard`

`Kembali Dashboard` → `419:2690`

## Schedule rule

Do not invent final dates, Zoom URLs, Sensei name, duration, cohort code, or session counts.

---

# SENSEI / 49 — Detail Kelas

**Figma frame:** `419:3197`

## Exact visible copy

### Header

- `DETAIL KELAS • DATA DINAMIS`
- `Chapter 4 — Sesi bersama Sensei`
- `Seluruh detail kelas berasal dari konfigurasi cohort dan admin.`
- `Kembali Jadwal`

`Kembali Jadwal` → `419:2913`

### Session

- `Cohort Aktif`
- `Terjadwal`
- `Zoom`
- `Sensei dan jadwal dari admin`
- `Hari/Tanggal • Jam WIB • Durasi dinamis • Link Zoom tersedia sesuai status sesi.`
- `Link Aktif Saat Sesi`

Zoom action destination → `419:3949` — link-not-available/state node outside Layer E

### Agenda

- `Agenda kelas`
- `01`
- `Review materi Chapter 4`
- `02`
- `Latihan pola kalimat`
- `03`
- `Tanya jawab dan rangkuman kelas`
- `04`
- `Arahan aktivitas berikutnya`

### Materials

- `Materi pendukung`

- `文`
- `Ringkasan grammar`
- `Dibuka dari material chapter.`

- `字`
- `Kanji sesi`
- `Daftar kanji yang dibahas.`

- `問`
- `Pertanyaan cohort`
- `Topik yang dikirim sebelum kelas.`

- `あ`
- `い`
- `う`

### Reminder

- `Pengingat kelas`
- `知`
- `Notifikasi aplikasi`
- `Aktif`
- `郵`
- `Email reminder`
- `Mengikuti pengaturan`
- `時`
- `Pengingat waktu`
- `Dari admin`

Notification reminder action → `419:4061`

### Replay/announcement

- `Lihat Replay`

Destination → `419:3437`

- `ℹ`
- `Pengumuman`
- `Link, jadwal, Sensei, dan status replay diperbarui oleh admin.`

---

# SENSEI / 50 — Daftar Replay

**Figma frame:** `419:3437`

## Exact visible copy

### Header

- `BELAJAR DENGAN SENSEI • REPLAY KELAS`
- `Tonton kembali sesi yang telah dipublikasikan`
- `Sensei, cohort, durasi, dan status replay berasal dari admin.`
- `Lihat Jadwal`

`Lihat Jadwal` → `419:2913`

### Search/filter

- `⌕`
- `Cari replay, chapter, atau Sensei`
- `Semua`
- `Chapter 4`
- `Tersimpan`

### Latest replay

- `Replay terbaru`
- `▶`
- `REPLAY TERBARU`
- `Dipublikasikan`
- `Cohort Aktif`
- `Chapter 4 — Pola Kalimat dan Kehidupan`
- `Replay untuk cohort aktif; tampil setelah sesi dipublikasikan.`
- `Sensei dari admin`
- `Durasi dan publikasi dinamis`
- `Putar Replay`

The latest replay card routes to `419:3976` (processing/status state), while its open action routes to `419:3711`.

### Other replay cards

- `Replay lainnya`

#### Grammar

- `▶`
- `REPLAY`
- `Dipublikasikan`
- `Cohort Aktif`
- `Review Grammar N4`
- `Pembahasan latihan dan contoh kalimat.`
- `Sensei dari admin`
- `Durasi dan publikasi dinamis`
- `Buka Replay`

Destination → `419:3711`

#### Kanji

- `▶`
- `REPLAY`
- `Dipublikasikan`
- `Cohort Aktif`
- `Kanji & Reading`
- `Review kanji dan strategi reading.`
- `Sensei dari admin`
- `Durasi dan publikasi dinamis`
- `Buka Replay`

Destination → `419:3711`

#### Consultation

- `▶`
- `REPLAY`
- `Dipublikasikan`
- `Cohort Aktif`
- `Konsultasi Cohort`
- `Tanya jawab dan arahan belajar.`
- `Sensei dari admin`
- `Durasi dan publikasi dinamis`
- `Buka Replay`

Destination → `419:3711`

### Announcement

- `ℹ`
- `Pengumuman`
- `Replay tampil setelah admin mempublikasikan rekaman sesi.`

---

# SENSEI / 51 — Pemutar Replay

**Figma frame:** `419:3711`

## Exact visible copy

### Header

- `REPLAY • CHAPTER 4 • COHORT AKTIF`
- `Pola Kalimat dan Kehidupan Sehari-hari`
- `Sumber video, durasi, Sensei, chapter markers, dan materi berasal dari admin.`
- `Kembali ke Replay`

`Kembali ke Replay` → `419:3437`

### Player

- `❚❚`
- `Mulai video`
- `Replay • lazy-loaded`
- `Sensei dan cohort dari admin`
- `Tanggal sesi • durasi • status publikasi dinamis`

Player error/status destination → `419:4034`

### Save

- `Simpan Replay`

Destination → `814:4181`

### Tabs/content

- `Ringkasan`
- `Transkrip`
- `Materi`
- `Catatan`

- `Ringkasan kelas`
- `Replay mencakup review Chapter 4, latihan pola kalimat, diskusi cohort, serta arahan aktivitas berikutnya.`

- `文`
- `Grammar`
- `例`
- `Contoh`
- `問`
- `Tanya Jawab`

### Transcript

- `TRANSKRIP PREVIEW`
- `Transkrip lengkap mengikuti file yang dipublikasikan admin. Gunakan marker waktu untuk melompat ke bagian tertentu.`

### Markers

- `Chapter markers`
- `00:00`
- `Pembukaan`
- `08:20`
- `Review materi`
- `24:15`
- `Latihan bersama`
- `46:40`
- `Tanya jawab`
- `58:10`
- `Arahan berikutnya`

### Related materials

- `Materi terkait`
- `文`
- `Ringkasan Grammar`
- `字`
- `Daftar Kanji`
- `練`
- `Latihan Sesi`

### Detail/status

- `Lihat Detail Kelas`

Destination → `419:3197`

- `Status publikasi`
- `Replay, transkrip, dan materi tersedia setelah admin mempublikasikannya.`

## Replay rule

Do not build real media storage/transcoding or hardcode chapter markers as final data during frontend-first implementation.

---

# SENSEI / 52 — Feedback Penyelesaian Level

**Figma frame:** `765:4155`

## Exact visible copy

### Header

- `FEEDBACK AKHIR LEVEL • BELAJAR DENGAN SENSEI`
- `Bagikan pengalaman setelah seluruh Chapter selesai`
- `Form ini hanya muncul setelah Chapter terakhir pada level aktif selesai.`
- `LEVEL SELESAI`

### Completion

- `N4 • BELAJAR DENGAN SENSEI`
- `12 dari 12 Chapter selesai`
- `Progress dan status selesai berasal dari backend.`

### Rating

- `Penilaian keseluruhan`
- `Pilih rating untuk materi, latihan, dan pengalaman belajar.`
- `★`
- `★`
- `★`
- `★`
- `★`

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

### Actions

- `Kirim Feedback`
- `Lewati untuk Sekarang`

Destinations:

- `Kirim Feedback` → `765:4449`
- `Lewati untuk Sekarang` → `418:4930`

### Footer

- `Feedback dan testimoni disimpan sebagai dua status berbeda.`
- `Tanpa izin, feedback hanya digunakan untuk evaluasi internal.`

---

# Referral / reward states physically inside Layer E

These are small state variations and should reuse shared confirmation/state UI rather than become independent route families.

## KONDISI R6-01 — Kode Referral Disalin

**Figma frame:** `787:4251`

### Exact visible copy

- `REFERRAL • TERSALIN`
- `Kode referral berhasil disalin`
- `参`
- `Kode HIRU-HILMI siap dibagikan. Teman memperoleh diskon saat invoice dibuat, sedangkan reward milikmu aktif setelah pembayaran mereka diverifikasi Admin.`
- `Gunakan Reward`
- `Kembali Profil`

Destinations:

- `Gunakan Reward` → `418:7313`
- `Kembali Profil` → `418:7128`

`HIRU-HILMI` is a fixture referral code.

---

## KONDISI R6-02 — Bagikan Referral

**Figma frame:** `787:4263`

### Exact visible copy

- `REFERRAL • BAGIKAN`
- `Bagikan kode referral`
- `参`
- `Tautan dan template pesan berasal dari backend. Pada aplikasi nyata, aksi ini membuka native share atau WhatsApp dengan kode HIRU-HILMI.`
- `Salin Tautan`
- `Kembali Profil`

Destinations:

- `Salin Tautan` → `787:4251`
- `Kembali Profil` → `418:7128`

Do not invent the final share URL, WhatsApp number, or backend message template.

---

## KONDISI R6-03 — Reward Diskon Diterapkan

**Figma frame:** `787:30239`

This is a full renewal-screen variation.

### Exact visible copy

- `MEMBERSHIP RENEWAL`
- `Lanjutkan akses tanpa kehilangan progres`
- `Harga dan periode baru tampil setelah plan dipilih; data berasal dari konfigurasi admin.`
- `Membership Aktif`
- `Belajar Mandiri • N4`
- `Tanggal berakhir dan sisa hari ditampilkan dari backend. Progres tetap tersimpan setelah renewal.`

### Plans

- `Pilih plan lanjutan`
- `LMS`
- `Belajar Mandiri`
- `Journey penuh, try out, review, sertifikat, dan community write.`
- `Harga dinamis setelah pilihan`
- `SENSEI`
- `Belajar dengan Sensei`
- `Semua LMS ditambah cohort, jadwal Zoom, Sensei, dan replay.`
- `Harga dinamis setelah pilihan`

### Applied reward

- `REWARD REFERRAL DITERAPKAN`
- `Reward diskon akan mengurangi total invoice renewal`
- `Status reward menjadi digunakan setelah invoice terverifikasi.`

### Summary/action

- `RINGKASAN RENEWAL`
- `Belajar Mandiri • periode baru`
- `Harga aktif − reward diskon • total final dihitung backend saat invoice dibuat.`
- `Buat Invoice Renewal`
- `!`
- `Pengumuman`
- `Reward dan membership baru aktif setelah invoice renewal diverifikasi Admin.`
- `Kembali ke Profil`

Destinations:

- `Buat Invoice Renewal` → `391:2453`
- `Kembali ke Profil` → `418:7128`

## OPEN CONTEXT ALIGNMENT

Like `SENSEI / 47`, this Page 10 state currently uses `Belajar Mandiri` as the active/summary plan. Preserve the exact Figma copy and resolve later rather than silently rewriting.

---

# Verified Layer E flow map

## Practice / Try Out

```text
Latihan Harian
  ├─ Flashcard Review → Kumpulan Flashcard
  ├─ Audio Drill → Soal Audio
  ├─ Reading Drill → Soal Reading
  ├─ Checkpoint Retry → Checkpoint
  └─ Daftar Try Out

Daftar Try Out
  → Informasi
  → Runner
  → Hasil
  → Ulasan

Alternative Try Out cards
  → scheduled / locked / attempts exhausted / review disabled states
```

## Community / Tanya Sensei

```text
Komunitas
  ├─ Buat Postingan → state/form
  └─ Tanya Sensei post → Detail Postingan
       ├─ Lampiran
       ├─ Balasan
       ├─ Tambah Gambar
       └─ Report

Tanya Sensei
  ├─ Upload gambar
  ├─ Kirim Pertanyaan
  └─ Simpan Draft
```

## Schedule / Replay

```text
Jadwal Zoom
  ├─ Detail Kelas
  │    ├─ Zoom availability state
  │    ├─ reminder state
  │    └─ Daftar Replay
  └─ Daftar Replay
       ├─ replay processing state
       └─ Pemutar Replay
            ├─ replay error/status state
            ├─ save replay state
            └─ Detail Kelas
```

## Certificate

```text
Pusat Sertifikat
  ├─ Detail Sertifikat
  │    ├─ download state
  │    ├─ share state
  │    └─ verification state
  └─ certificate-unavailable criteria state
```

## Membership / Referral

```text
Profil
  ├─ Perpanjangan
  ├─ Salin Kode → R6-01
  └─ Bagikan → R6-02

Perpanjangan
  ├─ Gunakan Reward → R6-03
  └─ Buat Invoice → invoice state
```

---

# Page 10 entitlement rules verified by Layer E

For **Belajar dengan Sensei**:

- Latihan Harian is active.
- Try Out follows item/configuration access rules but the feature family is available.
- Community has write access.
- Tanya Sensei is directly available.
- Schedule/Jadwal is available.
- Replay is available after publication.
- Certificate Center is available subject to certificate eligibility.
- Notifications include class and replay events.
- Profile, membership, referral, and renewal are available.
- Sensei-owned features must not show a generic upgrade prompt merely because they are premium on lower tiers.
- Individual content or Try Out items can still be unavailable due to level, schedule, publication, attempt, review, or content-specific rules.

---

# Important Figma copy/context conflicts

Do **not** silently fix these in frontend code.

## Profile membership mismatch

Page 10 `SENSEI / 46` visibly says:

`Belajar Mandiri`

inside `STATUS MEMBERSHIP`.

This conflicts with the role/page context `Belajar dengan Sensei`.

Status: **OPEN COPY/CONTEXT ALIGNMENT**

## Renewal active-plan mismatch

Page 10 `SENSEI / 47` visibly says:

- `Belajar Mandiri • N4`
- `Belajar Mandiri • periode baru`

The reward-applied renewal state repeats the same context.

Status: **OPEN COPY/CONTEXT ALIGNMENT**

These may represent a deliberate plan-selection fixture or stale copied text. The contract records the active Figma verbatim; client/Figma revision should resolve it before final copy freeze.

---

# Dynamic / fixture values that must remain replaceable

Do not promote these to final business rules merely because they appear in the Figma example:

- N4 / Chapter 4
- daily-practice duration/counts
- streak and accuracy values
- Try Out question counts, timer, attempts, scores, dates, percentages
- leaderboard ranks/aliases
- certificate examples and verification IDs
- notification count `148`
- user name/email
- referral code `HIRU-HILMI`
- reward count/value
- plan prices and periods
- Zoom dates/times/links
- Sensei identity
- cohort name/count
- replay duration/publication date
- chapter markers
- Ask Sensei routing/SLA
- file/media limits
- feedback ratings

---

# Layer E frontend-first implementation rules

1. Exact copy, hierarchy, and explicit action destinations come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the shared student sidebar/shell.
4. Reuse the existing generic `AssessmentRunner` for Try Out where compatible.
5. Keep Latihan Harian separate from Try Out.
6. Keep level/item/schedule/attempt/review/publication locks distinct from membership-tier locks.
7. Community and Tanya Sensei are writable/available for this tier.
8. Jadwal and Replay are available Sensei entitlements.
9. Replay access still depends on publication/status.
10. Certificate eligibility remains independent from tier entitlement.
11. Keep all dynamic names, dates, scores, ranks, counts, plan values, schedule data, and replay data deterministic and replaceable.
12. Do not pretend frontend mocks are authoritative backend state.
13. Do not build Laravel/Sanctum, Postgres, Zoom integration, replay upload/transcoding/storage, file upload storage, server assessment timer/autosave/attempts, notification delivery, certificate issuance, community moderation backend, Ask Sensei routing, referral accounting, invoice activation, or payment verification during this contract phase.
14. Do not invent copy for external state nodes; extract them in Layer F.
15. Preserve OPEN copy/context conflicts rather than silently correcting them.
16. Do not include Mini Checkpoint here; Page 10 Layer J is its own contract.
