# E-SUPPORTING — Page 08 / Free Member

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **E — Fitur Pendukung**  
> Screens: **FREE / 30–38**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Runtime/user/progress values: **FIXTURE / MOCK where noted**
- State/modal destinations: named here, exact state copy belongs to `F-STATES.md`
- Do not paraphrase VERIFIED copy.
- Do not add Backend/API work while implementing this frontend-first layer.

---

# Shared student shell used in Layer E

All screens use the same student sidebar family.

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

Reuse the shared student navigation. Do not build a separate sidebar per supporting screen.

Common verified destinations:

- Dashboard → `392:566`
- Kelas Saya → `392:785`
- Kumpulan Flashcard → `398:2069`
- Latihan Harian → `392:3311`
- Try Out → `753:2182`
- Perpustakaan → `392:3045`
- Komunitas → `392:4143`
- Progres → `392:3598`
- Notifikasi → `392:4594`
- Profil → `392:4908`

---

# FREE / 30 — Perpustakaan Materi — Limited

**Figma frame:** `392:3045`

## Exact visible copy

### Header

- `PERPUSTAKAAN MATERI`
- `Temukan kembali materi dari seluruh journey`
- `Akses material mengikuti level dan entitlement membership.`

### Search

- `⌕`
- `Cari materi, tata bahasa, kanji, atau audio`

Search interaction in Figma:

- Search field → `392:5320` — `FREE / STATE 10 — Library Empty`

This prototype destination is a state example. Do not interpret it as production search logic.

### Level/topic filters

- `Semua`
- `N5`
- `N4`
- `N3`
- `SSW`
- `Interview`

### Content-type filters

- `Semua`
- `Tata Bahasa`
- `Kanji`
- `Kosakata`
- `Audio`
- `Reading`

`SSW` and `Interview` are visible filters in this Figma screen. Do not reinterpret them as JLPT levels.

### Recommendation

- `Rekomendasi N4`

#### Tata Bahasa card

- `文`
- `Tata Bahasa`
- `Pola Kalimat Sehari-hari`
- `Modul Chapter 4 yang terakhir dibuka.`
- `Tersimpan`

Destination:

- `392:1638` — Modul Tata Bahasa

#### Kanji card

- `漢`
- `Kanji`
- `Keadaan, Waktu & Aktivitas`
- `Kanji chapter dengan bookmark dan catatan.`
- `Tersedia`

Destination:

- `392:1840` — Modul Huruf Jepang & Kanji

#### Audio card

- `聴`
- `Audio`
- `Simulasi Choukai N4`
- `Akses audio lengkap mengikuti membership.`
- `Terkunci`

Destination:

- `392:5347` — `FREE / STATE 11 — Content Locked`

### Recently opened

- `Baru dibuka`

Visible items:

- `語`
- `Flashcard Chapter 4`
- `Kosakata`

- `読`
- `Reading Aktivitas Harian`
- `Reading`

- `試`
- `Review Try Out 1`
- `Try Out`

## Fixture / access note

N4, Chapter 4, recent items, and material statuses are sample content/state in the design.

Do not use these examples to override Free entitlement rules.

---

# FREE / 31 — Latihan Harian — Terbatas

**Figma frame:** `392:3311`

## Exact visible copy

### Header

- `LATIHAN HARIAN • FREE MEMBER`
- `Latihan singkat berdasarkan progresmu • soal dapat memuat gambar dari Admin`
- `Aktivitas harian terpisah dari simulasi Try Out dan tidak mengurangi attempt Try Out.`
- `TERBATAS`

### Recommendation

- `REKOMENDASI HARI INI`
- `Perkuat Chapter 1 dalam 15–20 menit`
- `Urutan latihan dibuat dari kesalahan terakhir, confidence flashcard, dan checkpoint yang perlu diulang.`
- `Mulai Rekomendasi`
- `Lihat Try Out`

Destinations:

- `Mulai Rekomendasi` → `398:2069` — Kumpulan Flashcard
- `Lihat Try Out` → `753:2182` — Free locked Try Out state

### Summary metrics

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
- `5–10 menit • deck level pilihan`

Destination:

- `398:2069`

#### Audio Drill

- `聴`
- `Audio Drill`
- `TERSEDIA`
- `Latihan listening dari Chapter aktif.`
- `10 soal • hasil langsung`

Destination:

- `392:2455` — Audio Question

#### Reading Drill

- `読`
- `Reading Drill`
- `TERSEDIA`
- `Bacaan pendek dengan penjelasan jawaban.`
- `8 soal • fokus Dokkai`

Destination:

- `392:2653` — Reading Question

#### Checkpoint Retry

- `試`
- `Checkpoint Retry`
- `TERSEDIA`
- `Ulangi checkpoint sesuai attempt rule Chapter.`
- `Nilai terbaru tersimpan`

Destination:

- `392:2842` — Checkpoint

### History

- `RIWAYAT HARIAN`
- `Aktivitas terakhir`
- `Riwayat latihan tetap terpisah dari hasil Try Out.`
- `Hari ini • Flashcard Review • 86% akurasi`
- `Kemarin • Audio Drill • 8/10 benar     |     2 hari lalu • Reading Drill • 7/8 benar`

## Fixture rule

The following are visible sample values, not permanent business rules:

- `15–20 menit`
- `4 aktivitas`
- `12 hari`
- `18`
- `82%`
- `5–10 menit`
- `10 soal`
- `8 soal`
- history scores/accuracy

Do not hardcode these as global assessment limits unless separately approved.

---

# FREE / 32 — Progres & Achievement

**Figma frame:** `392:3598`

## Exact visible copy

### Header

- `PROGRES & ACHIEVEMENT`
- `Rayakan progres tanpa kehilangan fokus`
- `Progress, streak, mastery, dan achievement dihitung dari journey serta aktivitas backend.`
- `Profil`

`Profil` → `392:4908`

### Member summary

- `MEMBER • LEVEL N4`
- `Perjalanan belajar terus bertumbuh`
- `Persentase dan milestone mengikuti completion serta assessment yang valid.`
- `12 Hari Streak`

### Metrics

- `65%`
- `Journey N4`

- `450`
- `Kanji mastered`

- `—`
- `Latihan selesai`

- `—`
- `Try Out terbaik`

### Milestone journey

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

### Achievement

- `Achievement`
- `Leaderboard`

`Leaderboard` → `392:3833`

#### Achievement 1

- `火`
- `Streak 7 Hari`
- `Belajar konsisten selama tujuh hari.`
- `Terbuka`

#### Achievement 2

- `札`
- `Flashcard Master`
- `Menyelesaikan target flashcard.`
- `Terbuka`

#### Achievement 3

- `試`
- `Try Out Finisher`
- `Menyelesaikan Try Out pertama.`
- `Belum terbuka`

#### Achievement 4

- `証`
- `Certificate Ready`
- `Memenuhi eligibility sertifikat.`
- `Belum terbuka`

## Fixture / entitlement note

`N4`, `12 Hari Streak`, `65%`, and `450` are sample profile/progress data.

The screen also previews locked Try Out and Certificate milestones. Do not use the sample achievement state to grant Free access to paid features.

---

# FREE / 33 — Leaderboard

**Figma frame:** `392:3833`

## Exact visible copy

### Header

- `LEADERBOARD`
- `Bandingkan konsistensi, bukan tekanan`
- `Poin, periode, cohort, rank, dan movement berasal dari backend serta dapat menggunakan nama samaran.`
- `Progres`

`Progres` → `392:3598`

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

### Ranking list

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

## Frontend-first note

Ranking, movement, points, period, cohort, and names may use deterministic mock data.

Do not build real ranking computation in this frontend phase.

---

# FREE / 34 — Community — Read Only

**Figma frame:** `392:4143`

## Exact visible copy

### Header

- `FORUM KOMUNITAS`
- `Berdiskusi, bertanya, dan berbagi perjalanan belajar`
- `Free Member dapat membaca. Post, komentar, dan Tanya Sensei tetap terkunci sesuai entitlement.`
- `Buat Postingan — Upgrade`

`Buat Postingan — Upgrade` → `767:2326` — `FREE / STATE R5 — Aksi Komunitas Terkunci`

### Community access cards

#### Tanya Sensei

- `先`
- `TERKUNCI`
- `Tanya Sensei`
- `Tersedia pada paket Belajar dengan Sensei.`

#### Diskusi Member

- `話`
- `LMS Write`
- `Diskusi Member`
- `Forum diskusi dengan sesama pembelajar.`

#### Info dari Hiru

- `知`
- `Semua Akses`
- `Info dari Hiru`
- `Pengumuman, event, dan informasi akademi.`

#### Kerja ke Jepang

- `働`
- `Read Access`
- `Kerja ke Jepang`
- `Informasi karier dan persiapan profesional.`

### Latest discussions

- `Diskusi terbaru`
- `Urutan dan engagement berasal dari data backend.`
- `⌕`
- `Cari diskusi atau topik`

#### Post 1

- `READ ONLY`
- `oleh Rina`
- `Perbedaan penggunaan に dan で untuk tempat?`
- `Pertanyaan grammar untuk memahami konteks aktivitas dan lokasi.`
- `Menunggu Jawaban`

Destination:

- `392:4363` — Community Post Detail — Read Only

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
- `Free Member memiliki akses baca. Post, komentar, dan Tanya Sensei tetap terkunci.`

## Entitlement rule

Free is read-only in Community.

Do not implement successful post/comment/Tanya Sensei submission for Free.

---

# FREE / 35 — Community Post Detail — Read Only

**Figma frame:** `392:4363`

## Exact visible copy

### Header

- `COMMUNITY • DISKUSI MATERI`
- `Perbedaan penggunaan に dan で untuk tempat`
- `Free Member dapat membaca thread. Hak balas dan pelaporan mengikuti entitlement.`
- `Kembali Community`

`Kembali Community` → `392:4143`

### Post author / status

- `Rina • Member N4`
- `Waktu publikasi dari backend`
- `READ ONLY`

### Post

- `Perbedaan penggunaan に dan で untuk tempat?`
- `Saya masih bingung membedakan partikel untuk lokasi keberadaan dan tempat aktivitas pada contoh Chapter 4. Mohon penjelasan beserta contoh tambahan.`

### Attachment

- `文`
- `Screenshot materi Chapter 4`
- `File dan metadata berasal dari backend.`
- `Buka`

`Buka` → `812:2423` — `FREE / STATE R8-03 — Pratinjau Lampiran Community`

### Engagement summary

- `♡ Suka • —`
- `Balasan • —`
- `Simpan`

### Replies

- `Balasan`

#### Sensei reply

- `Sensei •••1`
- `Sensei`
- `Waktu dinamis`
- `Untuk lokasi keberadaan gunakan に, sedangkan で menunjukkan tempat berlangsungnya aktivitas. Contoh lengkap dapat dihubungkan dengan materi terkait.`
- `Balas`
- `Suka`

#### Member reply

- `Dimas`
- `Member`
- `Waktu dinamis`
- `Penjelasan ini membantu. Saya juga membandingkannya dengan contoh pada reading.`
- `Balas`
- `Suka`

### Reply composer — locked for Free

- `Tulis balasan`
- `◇`
- `Ringkasan`
- `Balas — Upgrade`
- `Lampiran — Upgrade`

Both upgrade actions route to:

- `767:2326` — `FREE / STATE R5 — Aksi Komunitas Terkunci`

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
- `Thread komunitas untuk chapter, materi, dan latihan.`

### Thread rules

- `Aturan thread`
- `Gunakan bahasa yang sopan`
- `Jangan membagikan data pribadi`
- `Media dapat melalui moderasi`
- `Report dan removal dicatat`

### Announcement

- `ℹ`
- `Pengumuman`
- `Free Member dapat membaca. Balasan dan pelaporan mengikuti membership.`

## Frontend-first note

Replies, engagement counts, timestamps, author names, attachment metadata, and saved state are fixtures/dynamic values.

Free must not gain write access from frontend state.

---

# FREE / 36 — Notification Center

**Figma frame:** `392:4594`

## Exact visible copy

### Header

- `NOTIFICATION CENTER`
- `Informasi penting tanpa mengganggu fokus`
- `Notifikasi, status baca, trigger, waktu, dan delivery berasal dari backend serta preference akun.`
- `Profil`

`Profil` → `392:4908`

### Filters/actions

- `Semua`
- `Belum Dibaca`
- `Belajar`
- `Kelas`
- `Akun`
- `Tandai Semua Dibaca`

`Tandai Semua Dibaca` → `812:2409` — `FREE / STATE R8-02 — Semua Notifikasi Dibaca`

### Today

- `Hari ini`

#### Learning notification

- `章`
- `Belajar`
- `Waktu dari backend`
- `Materi Chapter 4 tersedia`
- `Lanjutkan video, modul, dan latihan pada journey aktif.`
- `Buka Chapter`

`Buka Chapter` → `392:1216`

#### Class notification

- `時`
- `Class`
- `Waktu dari backend`
- `Pengingat sesi Zoom`
- `Jadwal, Sensei, dan link mengikuti konfigurasi admin.`
- `Lihat Jadwal`

No explicit prototype destination is defined for `Lihat Jadwal` in this frame.

Status: **OPEN interaction**

#### Progress notification

- `再`
- `Class`
- `Waktu dari backend`
- `Progress chapter diperbarui`
- `Perubahan progress mengikuti aktivitas dan data backend.`
- `Buka Progress`

`Buka Progress` → `392:3598`

### Previous

- `Sebelumnya`

#### Achievement notification

- `火`
- `Achievement`
- `Waktu dari backend`
- `Achievement baru terbuka`
- `Streak belajar berhasil mencapai milestone baru.`
- `Lihat Achievement`

`Lihat Achievement` → `392:3598`

#### Membership notification

- `期`
- `Account`
- `Waktu dari backend`
- `Periode membership akan berakhir`
- `Tanggal dan opsi renewal mengikuti data backend.`
- `Lihat Membership`

`Lihat Membership` → `392:4908`

#### Certificate notification

- `証`
- `Achievement`
- `Waktu dari backend`
- `Sertifikat digital tersedia`
- `Sertifikat dapat dilihat dan diunduh dari Certificate Center.`
- `Buka Sertifikat`

No explicit prototype destination is defined for `Buka Sertifikat` in this frame.

Status: **OPEN interaction**

### Pagination fixture

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

#### In-App

- `知`
- `In-App`
- `Pengumuman dan aktivitas aplikasi.`
- `Aktif`

#### Email

- `郵`
- `Email`
- `Kelas, akun, dan transaksi.`
- `Aktif`

#### Learning

- `章`
- `Belajar`
- `Journey, latihan, dan achievement.`
- `Aktif`

#### Community

- `話`
- `Community`
- `Balasan dan aktivitas thread.`
- `Opsional`

#### Promotion

- `営`
- `Promosi`
- `Konten marketing opsional.`
- `Off`

### Announcement

- `ℹ`
- `Pengumuman`
- `Notifikasi transaksi dan keamanan tertentu tetap dikirim sesuai kebutuhan sistem.`

## Fixture note

The list includes learning, Zoom/class, achievement, membership, and certificate examples. Treat these as notification fixtures/categories, not proof that Free currently owns every referenced feature.

---

# FREE / 37 — Profil & Membership

**Figma frame:** `392:4908`

## Exact visible copy

### Header

- `AKUN & MEMBERSHIP`
- `Profil dan status belajarmu`
- `Kelola informasi akun, membership, sertifikat, dan preferensi.`

### Profile fixture

- `Hilmi`
- `hilmi.student@example.com`
- `Level N4`

### Membership

- `STATUS MEMBERSHIP`
- `Free Member`
- `Periode akses dan tanggal akhir berasal dari backend.`
- `Perpanjang Membership`

`Perpanjang Membership` → `392:5093`

The membership card itself routes to:

- `392:5374` — `FREE / STATE 12 — Membership Expired`

This is a prototype state example, not a rule that every profile load is expired.

### Progress metrics

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

### Account settings

- `Pengaturan akun`

#### Edit profile

- `人`
- `Edit Profil`
- `Nama, WhatsApp, dan preferensi belajar.`

No explicit destination in this frame.

#### Change password

- `鍵`
- `Ganti Kata Sandi`
- `Perbarui keamanan akun.`

No explicit destination in this frame.

#### Notifications

- `知`
- `Notifikasi`
- `Atur pengingat belajar dan informasi kelas.`

Destination:

- `392:4594`

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

`Gunakan` → `392:5093`

## Fixture / entitlement conflict note

The active design shows:

- `Sertifikat N5` → `Diterbitkan`

while other Free entitlement screens present Certificate as locked for Free.

Do not silently resolve this contradiction in code.

Status: **OPEN CONTENT/ENTITLEMENT ALIGNMENT**

Until resolved, this visible text remains Figma-verbatim in the contract, but it must not be used to redefine the global Free entitlement rule.

`Hilmi`, email, N4, 65%, 450, 12, referral code, and reward count are sample data.

---

# FREE / 38 — Renewal & Upgrade

**Figma frame:** `392:5093`

## Exact visible copy

### Header

- `MEMBERSHIP RENEWAL`
- `Lanjutkan akses tanpa kehilangan progres`
- `Harga dan periode baru tampil setelah plan dipilih; data berasal dari konfigurasi admin.`

### Current membership card

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

- `389:2453` — `FREE / STATE 07 — Invoice Created`

### Announcement

- `!`
- `Pengumuman`
- `Membership aktif setelah pembayaran via WhatsApp dan invoice diverifikasi Admin.`

### Back action

- `Kembali ke Profil`

Destination:

- `392:4908`

## Context conflict note

This frame belongs to Page 08 / Free and is named `FREE / 38`, but the current membership card visibly says:

- `Belajar Mandiri • N4`

This may be a renewal/upgrade example state, but the Figma frame alone does not prove the intended account-state precondition.

Status: **OPEN CONTEXT ALIGNMENT**

Do not silently replace the text, and do not redefine Free membership as Belajar Mandiri.

## Frontend-first rule

Do not invent:

- price
- period
- invoice amount
- referral reward value
- WhatsApp number
- payment verification
- membership activation

Use deterministic frontend presentation until commercial Backend work is explicitly started.

---

# Verified Layer E state destinations

These destinations are referenced by Layer E screens and will be documented with exact copy in Layer F:

- `392:5320` — `FREE / STATE 10 — Library Empty`
- `392:5347` — `FREE / STATE 11 — Content Locked`
- `767:2326` — `FREE / STATE R5 — Aksi Komunitas Terkunci`
- `812:2423` — `FREE / STATE R8-03 — Pratinjau Lampiran Community`
- `812:2409` — `FREE / STATE R8-02 — Semua Notifikasi Dibaca`
- `392:5374` — `FREE / STATE 12 — Membership Expired`
- `389:2453` — `FREE / STATE 07 — Invoice Created`

Do not invent the exact state/modal messages before `F-STATES.md` is verified.

---

# Layer E frontend-first implementation rules

1. Exact visible copy and content hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the shared student navigation and existing reusable frontend components.
4. Do not create duplicate Community, Notification, Progress, or entitlement systems only for Free.
5. Free Community remains read-only.
6. Free Latihan remains limited.
7. Locked content remains visible where Figma shows it.
8. Do not invent locked-state copy; use the verified Layer F state contract.
9. Treat user names, email, rank, progress, scores, activity history, notification counts, and referral values as deterministic fixtures.
10. Do not build Backend ranking, notifications, referrals, payments, storage, media moderation, or persistence during this frontend-first batch.
11. Do not use Figma fixture data to override global entitlement rules.
12. Preserve explicit OPEN conflicts instead of silently “fixing” Figma copy.
13. Change only the active supporting screen/batch during implementation; avoid unrelated refactors.
