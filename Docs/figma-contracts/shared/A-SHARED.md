# A-SHARED — Public, Program, Blog & Placement

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **A — Pengenalan & Informasi Awal** (`388:3`)  
> Scope: shared public/frontend flow used as the baseline for student experiences.  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Exact prototype destinations for every clickable element: **PARTIAL / OPEN where not explicitly verified**
- Do not paraphrase any VERIFIED copy.
- Do not replace client-facing copy with PRD, ReferenceHTML, or AI-generated wording.

---

# Shared Public Header

Used by public screens where a public header is shown.

## Exact visible copy

- `Hiru Academy`
- `Program`
- `Coba Gratis`
- `Placement Test`
- `Testimoni`
- `Blog`
- `Login`

## Implementation notes

- Active navigation state changes per screen.
- Keep one shared public header implementation.
- Do not create role-specific public headers for Free, LMS, Sensei, or Admin.
- Exact visual styling follows `DESIGN.md`.

---

# Shared Public Footer

Shown on screens that include the public footer in Figma.

## Exact visible copy

- `⌁`
- `Hiru Academy`
- `Program`
- `Placement Test`
- `Testimoni`
- `Blog`
- `Kebijakan Privasi`
- `© 2026 Hiru Academy. Belajar Jepang dengan arah yang jelas.`

## Implementation notes

- Reuse one shared footer.
- The decorative `⌁` is a Figma text/icon placeholder; use the approved Hiru brand asset where appropriate according to the project branding rules.

---

# FREE / 01 — Landing Page

**Figma frame:** `389:2`  
**Top-level structure:** Public Header → Landing Content → Public Footer

## Exact visible copy

### Hero

- `PLATFORM BELAJAR BAHASA JEPANG #1`
- `Belajar Bahasa Jepang Terarah dari Dasar sampai Siap JLPT`
- `Placement test, learning journey, flashcard, latihan, try out, komunitas, dan kelas bersama Sensei tersedia dalam satu pengalaman belajar yang konsisten.`
- `Coba Gratis`
- `Lihat Program`
- `日本語を、もっと身近に。`
- `✓ Tanpa akun untuk mulai placement`
- `•`
- `✓ Hasil langsung dan rekomendasi level`
- `Mulai dari level yang tepat, lalu lanjutkan sesuai ritmemu.`

### Pilihan cara belajar

- `Pilih cara belajar yang paling sesuai`
- `Pilih cara belajar, lalu tentukan level N1–N5 secara bebas. Harga dan akses mengikuti konfigurasi sistem.`

#### Free Member

- `CHAPTER 01`
- `COBA GRATIS`
- `Free Member`
- `Chapter 1 gratis pada N1–N5, progres tersimpan, dan community read-only.`
- `Chapter 1 gratis pada N1–N5`
- `Progress belajar tetap tersimpan`
- `Community tersedia read-only`
- `Lanjutkan belajar →`

#### Belajar Mandiri

- `CHAPTER 01`
- `DIREKOMENDASIKAN`
- `Belajar Mandiri`
- `Journey penuh, latihan, try out, review, sertifikat, dan community write.`
- `Journey dan latihan penuh`
- `Try Out dan review jawaban`
- `Community write dan sertifikat`
- `Lanjutkan belajar →`

#### Belajar dengan Sensei

- `CHAPTER 01`
- `LMS + ZOOM`
- `Belajar dengan Sensei`
- `Semua fitur LMS ditambah cohort, jadwal Zoom, Sensei, dan replay.`
- `Semua fitur Belajar Mandiri`
- `Cohort dan kelas bersama Sensei`
- `Replay dan Tanya Sensei`
- `Lanjutkan belajar →`

### Alur belajar

- `Satu alur belajar dari placement sampai sertifikat`
- `Setiap langkah dirancang agar pengguna selalu mengetahui progres, akses, dan tindakan berikutnya.`

#### Placement Test

- `Placement Test`
- `Temukan level awal melalui soal bertahap dan rekomendasi program.`
- `Lanjutkan belajar →`
- `→`

#### Learning Journey

- `Learning Journey`
- `Ikuti chapter, video, dua modul, flashcard, audio, reading, dan checkpoint.`
- `Lanjutkan belajar →`
- `→`

#### Try Out JLPT

- `Try Out JLPT`
- `Kerjakan simulasi terstruktur, lihat hasil, lalu review jawaban.`
- `Lanjutkan belajar →`
- `→`

### Placement CTA

- `Belum tahu harus mulai dari level mana?`
- `Mulai Sekarang`
- `Belum yakin levelmu? Gunakan Placement Test. Sudah punya target? Coba Chapter 1 gratis pada level pilihanmu.`

## Latest client revision override — Batch 0.3

Latest client revision overrides Landing copy and presentation above:

- Remove Landing quick-info `Tanpa akun untuk mulai placement` and `Hasil langsung dan rekomendasi level`.
- Present Landing level copy as `N5–N1`; this changes presentation order only. Levels remain independent with no purchase prerequisite.
- Remove `CHAPTER 01` text from Landing plan cards while retaining plan badges and entitlement benefit copy.
- Replace Landing learning-flow section with latest client-revised title, subtitle, four steps, CTA labels, and destinations.

## Actions / frontend intent

Visible action labels that must exist:

- `Coba Gratis`
- `Lihat Program`
- `Lanjutkan belajar →`
- `Mulai Sekarang`
- public-header navigation
- public-footer navigation

Do not invent a destination when it has not yet been verified from the final flow contract.

---

# FREE / 02 — Program & Level

**Figma frame:** `389:137`  
**Top-level structure:** Public Header → Program Main

## Exact visible copy

### Hero / program selection

- `PROGRAM & LEVEL`
- `Pilih berdasarkan tujuan dan kemampuanmu`
- `Pilih cara belajar, lalu tentukan level N1–N5`
- `Semua level dapat dibeli secara bebas. Chapter di dalam level aktif tetap mengikuti urutan belajar yang terstruktur.`
- `Coba Placement Test`

### Alur memilih program

- `ALUR MEMILIH PROGRAM`
- `01 • Pilih cara belajar`
- `Free Member, Belajar Mandiri, atau Belajar dengan Sensei.`
- `02 • Pilih level N1–N5`
- `Semua level dapat dipilih tanpa membeli level sebelumnya.`
- `03 • Lihat ringkasan`
- `Harga muncul setelah pilihan lengkap.`

### Cara belajar

- `CARA BELAJAR`
- `Pilih cara belajar terlebih dahulu`

#### Free Member

- `CARA BELAJAR`
- `Coba Gratis`
- `Free Member`
- `Coba satu chapter lengkap sebelum memutuskan upgrade.`
- `1 chapter lengkap`
- `Community read-only`
- `Progress tersimpan`

#### Belajar Mandiri

- `CARA BELAJAR`
- `Direkomendasikan`
- `Belajar Mandiri`
- `Akses journey penuh, latihan, Try Out, review, dan sertifikat digital.`
- `Journey dan latihan penuh`
- `Try Out + review jawaban`
- `Community write + certificate`

#### Belajar dengan Sensei

- `CARA BELAJAR`
- `LMS + Zoom`
- `Belajar dengan Sensei`
- `Semua fitur LMS ditambah cohort, sesi Zoom, replay, dan Tanya Sensei.`
- `Journey dan latihan penuh`
- `Zoom bersama Sensei`
- `Replay setelah dipublikasikan`

### Level Journey

- `LEVEL JOURNEY`
- `Pilih level N1–N5 secara bebas`
- `Tidak ada prerequisite pembelian antarlevel.`

#### N5

- `N5`
- `Tersedia`
- `JLPT N5`
- `Dasar Bahasa Jepang`
- `Bangun fondasi huruf, kosakata, dan pola kalimat dasar secara bertahap.`
- `Hiragana & Katakana`
- `Fondasi Grammar`
- `Dapat dipilih langsung tanpa prerequisite`
- `→`

#### N4

- `N4`
- `Dipilih`
- `JLPT N4`
- `Pemula Lanjutan`
- `Lanjutkan pola kalimat, reading, listening, dan kanji sesuai target N4.`
- `Journey Aktif`
- `Contoh Terpilih`
- `Pilihan level contoh saat ini`
- `→`

#### N3

- `N3`
- `Tersedia`
- `JLPT N3`
- `Tingkat Menengah`
- `Fokus reading, bunpou, kosakata, dan kanji untuk target ujian N3.`
- `Reading & Bunpou`
- `Kanji & Goi`
- `Dapat dipilih langsung tanpa prerequisite`
- `→`

#### N2

- `N2`
- `Tersedia`
- `JLPT N2`
- `Tingkat Lanjut`
- `Perkuat pemahaman kompleks, kecepatan reading, dan listening untuk N2.`
- `Listening & Dokkai`
- `Strategi JLPT`
- `Dapat dipilih langsung tanpa prerequisite`
- `→`

#### N1

- `N1`
- `Tersedia`
- `JLPT N1`
- `Tingkat Mahir`
- `Latih akurasi bahasa tingkat tinggi dan strategi ujian JLPT N1.`
- `Reading & Bunpou`
- `Strategi JLPT`
- `Dapat dipilih langsung tanpa prerequisite`
- `→`

### Ringkasan pilihan

- `RINGKASAN PILIHAN`
- `JLPT N4 • Belajar Mandiri`
- `Contoh pilihan aktif ditampilkan di bawah; level lain dapat dipilih secara independen.`
- `Lanjutkan Pendaftaran`

## Actions / frontend intent

Visible action labels that must exist:

- `Coba Placement Test`
- plan selection
- N1–N5 level selection
- `Lanjutkan Pendaftaran`

The screen uses examples/selection states. Do not convert the example fixture into a permanent business rule.

---

# FREE / 03 — Program Detail

**Figma frame:** `389:475`  
**Top-level structure:** Public Header → Program Detail Main → Public Footer

## Exact visible copy

### Hero

- `CONTOH LEVEL TERPILIH • JLPT N4`
- `Pelajari level targetmu melalui journey yang terstruktur`
- `Contoh ini menampilkan JLPT N4. Struktur konten menyesuaikan level N1–N5 yang dipilih pengguna.`
- `Level N4`
- `Journey Lengkap`
- `JLPT Ready`
- `Pilih Program`
- `Coba Placement`

### Fasilitas belajar

- `Fasilitas belajar lengkap`
- `Setiap chapter menggabungkan pemahaman materi, latihan aktif, dan evaluasi.`

#### Video

- `Video Penjelasan`
- `Penjelasan utama chapter dengan progres belajar yang tercatat.`

#### Modul

- `Modul`
- `Modul Tata Bahasa serta Modul Huruf Jepang & Kanji.`

#### Latihan

- `Latihan`
- `Latihan audio, reading, dan penguatan materi harian.`

#### Checkpoint

- `Checkpoint`
- `Evaluasi pemahaman di akhir chapter sebelum melanjutkan.`

#### Flashcard

- `Flashcard`
- `Deck kosakata dan pola penting dengan sesi pengulangan.`

#### Try Out

- `Try Out JLPT`
- `Simulasi soal JLPT tahun sebelumnya, hasil, dan ulasan jawaban.`

### Alur belajar

- `ALUR BELAJAR`
- `Progress dari backend`
- `Video → Modul → Latihan → Checkpoint → Flashcard → Try Out`
- `Free Member membuka Chapter 1 pada setiap N1–N5. Plan berbayar membuka seluruh chapter pada level yang dibeli.`

### Perbandingan plan

#### Free

- `Free`
- `Free Member`
- `Chapter 1 gratis pada setiap N1–N5.`

#### LMS

- `LMS`
- `Belajar Mandiri`
- `Journey penuh, try out, review, dan sertifikat.`

#### LMS + Zoom

- `LMS + Zoom`
- `Belajar dengan Sensei`
- `Semua LMS ditambah cohort, kelas langsung, Sensei, dan replay.`

## Actions / frontend intent

Visible action labels:

- `Pilih Program`
- `Coba Placement`

---

# FREE / 04 — Testimoni

**Figma frame:** `389:607`  
**Top-level structure:** Public Header → Testimonials Main → Public Footer

## Exact visible copy

### Hero

- `CERITA PEMBELAJAR`
- `Perjalanan yang berbeda, sistem belajar yang tetap terarah`
- `Testimoni hanya tampil pada halaman ini setelah pengguna memberi izin dan Admin menyetujui publikasinya.`

### Indicators

- `Alumni`
- `2.300+`
- `Merasa lebih terarah`
- `92%`
- `Rating pengalaman`
- `4,9 / 5`

### Testimonials

#### Rina

- `★★★★★`
- `Journey membantu saya tahu apa yang harus dipelajari setelah menyelesaikan satu materi.`
- `Rina`
- `Free Member → LMS`

#### Dimas

- `★★★★★`
- `Checkpoint dan review membuat progres lebih mudah dipantau tanpa merasa terburu-buru.`
- `Dimas`
- `Belajar Mandiri`

#### Ayu

- `★★★★★`
- `Jadwal, replay, dan learning journey terasa menyatu dalam satu alur belajar.`
- `Ayu`
- `Belajar dengan Sensei`

### Supporting values

- `進`
- `Progress terlihat`
- `Pengguna memahami langkah yang sudah dan belum selesai.`

- `続`
- `Belajar konsisten`
- `Aktivitas disusun agar mudah diteruskan.`

- `選`
- `Akses transparan`
- `Free, LMS, dan LMS + Zoom dibedakan secara jelas.`

### CTA

- `Mulai dari Placement Test atau lihat program yang sesuai`
- `Mulai Placement`
- `Lihat Program`
- `Gunakan hasil placement untuk menentukan level, lalu pilih Free, Mandiri, atau belajar dengan Sensei.`

## Authority note

Latest client revision resolves the middle testimonial indicator as `92%` with label `Merasa lebih terarah`, overriding the older Figma value `Kelulusan 96%`.

---

# FREE / 05 — Blog List

**Figma frame:** `389:697`  
**Top-level structure:** Public Header → Blog Main → Public Footer

## Exact visible copy

### Hero

- `HIRU INSIGHT`
- `Belajar strategi, budaya, dan perjalanan menuju JLPT`
- `Baca insight, lalu gunakan Placement Test untuk menentukan level dan program belajar yang paling relevan.`

### Search

- `⌕`
- `Cari artikel atau topik`

### Featured article

- `Strategi membangun rutinitas belajar N4`
- `道`
- `Susun ritme belajar mingguan dengan video, modul, flashcard, latihan, dan checkpoint tanpa kehilangan fokus.`
- `Baca Artikel`
- `FEATURED`

### Artikel terbaru

- `Artikel terbaru`

#### Grammar

- `文`
- `GRAMMAR`
- `Cara memahami pola kalimat tanpa menghafal berlebihan`
- `Gunakan konteks, contoh, dan latihan singkat untuk memperkuat pemahaman.`
- `Baca Artikel`

#### Listening

- `聴`
- `LISTENING`
- `Latihan listening yang efektif untuk pemula`
- `Bangun kebiasaan mendengar melalui audio pendek dan pengulangan terarah.`
- `Baca Artikel`

#### JLPT

- `試`
- `JLPT`
- `Mempersiapkan try out pertama dengan tenang`
- `Kenali struktur soal, manajemen waktu, dan cara membaca hasil evaluasi.`
- `Baca Artikel`

### CTA

- `Ubah insight menjadi langkah belajar berikutnya`
- `Mulai Placement`
- `Lihat Program`
- `Mulai Hiru Quick Check sekitar 5 menit atau lihat program berdasarkan kebutuhanmu.`

## Actions / frontend intent

- Search field is visually present.
- `Baca Artikel`
- `Mulai Placement`
- `Lihat Program`

Do not invent real search/backend behavior during frontend-first work unless the active frontend task explicitly requires it.

---

# FREE / 06 — Blog Detail

**Figma frame:** `389:892`  
**Top-level structure:** Public Header → Article Main → Public Footer

## Exact visible copy

### Article header

- `BELAJAR EFEKTIF • 8 MENIT BACA`
- `Strategi membangun rutinitas belajar N4 yang realistis`
- `Rutinitas yang baik bukan tentang belajar selama mungkin, tetapi menjaga urutan aktivitas yang konsisten dan mudah diulang.`

### Reading progress / topics

- `Progress membaca`
- `72% selesai`
- `Topik terkait`
- `Grammar N4`
- `Latihan listening`
- `Persiapan try out`
- `Kembali ke Blog`

### Visual/article marker

- `道`
- `LEARNING PATH`

### Article body

- `Mulai dari target kecil`
- `Pilih satu aktivitas utama setiap hari: menonton materi, membaca modul, mengulang flashcard, atau mengerjakan latihan. Urutan kecil yang berulang lebih mudah dipertahankan daripada jadwal yang terlalu padat.`
- `“Progres yang terlihat membantu kebiasaan bertahan.”`
- `Gunakan checkpoint dan indikator progres sebagai penanda langkah berikutnya.`
- `Gabungkan pemahaman dan evaluasi`
- `Setelah memahami materi, lanjutkan ke latihan dan checkpoint. Try out digunakan untuk menilai kesiapan secara menyeluruh, bukan menggantikan proses belajar harian.`

### CTA

- `Temukan level sebelum memilih program`
- `Mulai Placement`
- `Lihat Program`
- `Mulai Placement Test sekitar 5 menit, lalu bandingkan program yang direkomendasikan.`

---

# FREE / 07 — Placement Start

**Figma frame:** `389:1003`  
**Top-level structure:** Public Header → Placement Main

## Exact visible copy

### Hero

- `PLACEMENT TEST`
- `Cari titik mulai yang lebih tepat`
- `Kenali levelmu sebelum memulai journey`
- `Isi Nama, WhatsApp, dan Target Ujian, lalu jawab 20 soal sekitar 5 menit. Tidak perlu login untuk memulai.`
- `Tanpa login`
- `20 soal • ±5 menit`
- `Hasil langsung`
- `Isi Data & Mulai Tes`
- `Lihat Program`

### Hasil yang kamu dapatkan

- `HASIL YANG KAMU DAPATKAN`
- `Analisis 4 area`
- `Bunpou, Moji Goi, Dokkai, dan Choukai.`
- `Rekomendasi level`
- `N5, N4, atau level lain sesuai hasil tes.`
- `Rekomendasi program`
- `LMS + Sensei utama, Mandiri sebagai alternatif.`

### Cara kerja

- `CARA KERJA`
- `20 soal • ±5 menit • hasil langsung.`
- `Tiga langkah sederhana sebelum melihat hasil`

#### Step 01

- `01`
- `JAWAB SOAL`
- `Kerjakan soal bertahap`
- `Soal dibagi per section agar lebih mudah dipahami dan ditinjau.`

#### Step 02

- `02`
- `LIHAT PROGRESS`
- `Pantau kemajuan pengerjaan`
- `Progress dan jawaban tersimpan selama sesi placement berlangsung.`

#### Step 03

- `03`
- `DAPATKAN HASIL`
- `Lihat rekomendasi level`
- `Hasil menampilkan analisis empat area, level, dan rekomendasi program.`

### Sebelum mulai

- `SEBELUM MULAI`
- `Pastikan sesi placement berjalan lancar`
- `Siapkan data dasar`
- `Nama, WhatsApp, dan Target Ujian diisi sebelum tes dimulai.`
- `Kerjakan secara mandiri`
- `Jawaban digunakan untuk menentukan rekomendasi level.`
- `Gunakan koneksi stabil`
- `Jawaban tersimpan, tetapi koneksi stabil tetap disarankan.`

### Waktu & hasil

- `WAKTU & HASIL`
- `20 soal • ±5 menit`
- `Hiru Quick Check terdiri dari 20 soal, sekitar 5 menit, dengan hasil langsung setelah tes selesai.`

### Data & privasi

- `DATA & PRIVASI`
- `Digunakan untuk hasil dan tindak lanjut`
- `Data lead tidak menggantikan akun. Akses belajar tetap mengikuti registrasi dan membership.`

### Data sebelum tes

- `DATA SEBELUM TES`
- `Isi data untuk hasil dan follow-up`

#### Nama

- `Nama Lengkap`
- `Masukkan nama lengkap`
- `Teks bantuan opsional`

#### WhatsApp

- `Nomor WhatsApp`
- `+62 8xx xxxx xxxx`
- `Teks bantuan opsional`

#### Target

- `Target Ujian`
- `Pilih N1–N5`
- `⌄`

#### Consent

- `Data digunakan untuk menampilkan hasil dan follow-up Hiru Academy.`
- `Saya menyetujui data digunakan untuk hasil Placement Test dan tindak lanjut.`

#### Submit

- `Mulai Placement Test`

## Frontend-first behavior

For current frontend-first work, the form may use deterministic mock/session state. Do not build real lead storage, WhatsApp integration, scoring service, or Backend APIs during a copy/layout task.

---

# FREE / 08 — Placement Question

**Figma frame:** `389:1291`  
**Top-level structure:** Assessment Top Bar → Question Main

## Exact visible copy

### Assessment top bar

- `PLACEMENT TEST`
- `In Progress`
- `Soal 8 dari 20`

### Question

- `SOAL 08 / 20 • BUNPOU`
- `Teks pertanyaan`

### Guidance

- `Tips menjawab`
- `Baca instruksi sebelum memilih jawaban.`
- `Gunakan audio player sampai selesai bila tersedia.`
- `Jawaban dapat diubah sebelum lanjut.`

### Progress / configuration hints

- `Progress tes`
- `Progress dari backend`
- `Jenis soal dapat mencakup teks, gambar, audio, atau reading.`
- `Timer aktif bila dikonfigurasi`

### Answer examples

- `A. Pilihan pertama`
- `B. Pilihan kedua`
- `C. Pilihan ketiga`
- `D. Pilihan keempat`

### Media/accessibility hint

- `Gambar dapat diperbesar • Alt text tersedia`

### Navigation

- `Sebelumnya`
- `Lanjut`

## Data note

This frame visibly contains example question/answer content. Treat it as a frontend fixture unless separately defined as final assessment content.

---

# FREE / 09 — Placement Result

**Figma frame:** `389:1409`  
**Top-level structure:** Public Header → Result Main

## Exact visible copy

### Result hero

- `HASIL PLACEMENT TEST`
- `Rekomendasi utama: N4 bersama Sensei`
- `Hasil empat area menunjukkan titik awal JLPT N4. Program bersama Sensei menjadi rekomendasi utama; Belajar Mandiri tetap tersedia sebagai alternatif.`
- `Daftar & Simpan Hasil`
- `Ulangi Tes`

### Summary

- `Level Rekomendasi`
- `N4`
- `Area yang diukur`
- `Bunpou–Choukai`
- `Status`
- `Siap Mulai`

### Analisis kemampuan

- `Analisis kemampuan`
- `Skor contoh pada desain; nilai aktual dan interpretasi berasal dari backend Placement Test.`

#### Scores shown in Figma

- `Bunpou`
- `78 / 100`
- `Moji Goi`
- `72 / 100`
- `Dokkai`
- `68 / 100`
- `Choukai`
- `64 / 100`

### Program yang direkomendasikan

- `Program yang direkomendasikan`
- `Pilih rekomendasi setelah membuat akun. Harga dan benefit mengikuti konfigurasi level serta plan.`

#### Main recommendation

- `★ REKOMENDASI UTAMA`
- `N4 Belajar dengan Sensei`
- `Journey penuh dengan cohort, kelas langsung, Sensei, replay, dan dukungan belajar.`
- `Pilih Belajar dengan Sensei →`

#### Mandiri alternative

- `ALTERNATIF MANDIRI`
- `N4 Belajar Mandiri`
- `Journey penuh, latihan, try out, dan review mandiri sesuai ritmemu.`
- `Pilih Belajar Mandiri →`

#### Free

- `COBA GRATIS`
- `Mulai dengan Free Member`
- `Coba satu chapter lengkap sebelum menentukan upgrade.`
- `Mulai Free Member →`

## Fixture rule

The visible N4 recommendation and scores are example result data in this design. Preserve them for frontend/demo fidelity where this exact fixture is required, but do not encode them as permanent scoring business rules.

---

# Layer A implementation rule

When implementing any screen covered by this contract:

1. Use this contract for exact visible copy and screen/content hierarchy.
2. Use `Docs/RefrensiHTML/DESIGN.md` for visual treatment.
3. Reuse existing frontend components where possible.
4. Do not redesign unrelated screens.
5. Do not invent missing copy.
6. Do not introduce Backend/API work during frontend-first copy/layout tasks.
7. Keep sample result/progress values deterministic and clearly separate from final business rules.
8. If a Figma/client conflict is found, stop on that exact conflicting item and resolve authority instead of silently choosing a value.
