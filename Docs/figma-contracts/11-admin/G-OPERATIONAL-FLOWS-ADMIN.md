# G-OPERATIONAL-FLOWS — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **G — Alur Operasional Admin** (`649:2602`)  
> Total top-level operational frames: **62**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: visible strings below are transcribed verbatim from the active Figma file.

# Why Layer G is important

Layer G **should not be skipped** for the Admin contract.

Layers B–E define the Admin modules and their forms. Layer F defines generic system states. Layer G defines what actually happens **after Admin presses operational actions** such as:

- save;
- publish;
- verify;
- reject;
- export;
- archive;
- close lead;
- approve testimonial;
- upload/publish replay;
- update access;
- restore Landing version;
- create user/program;
- revoke certificate;
- moderate Community;
- activate notification template;
- manage security.

Many buttons in Layers B–F explicitly navigate into Layer G. Without this contract, implementation would have to invent:

- success copy;
- validation copy;
- destructive confirmations;
- return destinations;
- audit behavior;
- permission semantics;
- draft/publish behavior;
- payment/referral activation behavior.

Therefore Layer G is important as the **operation-result contract**, but it does **not** mean 62 new Next.js routes should be created.

Most flows should reuse shared Admin dialogs/status components.

---

# Contract status

- Layer hierarchy: **VERIFIED**
- All 62 top-level frame IDs/names: **VERIFIED**
- Visible copy: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- Operational authority: **BACKEND / PERMISSION / AUDIT LATER**
- Do not paraphrase VERIFIED client-visible copy.
- Do not create real Backend workflows during this documentation phase.
- Do not treat browser state as authorization, payment verification, publication authority, audit authority, or certificate authority.

---

# Recommended implementation architecture

```text
Admin Operation Dialog
├── success
├── processing
├── validation
├── confirmation
└── destructive confirmation

Admin Editor Overlay
├── new program
├── new user
├── content editor
├── certificate template
├── announcement editor
├── notification template
└── Sensei availability

Admin Operational Result
├── save success
├── publish success
├── verification success
├── moderation result
├── export processing
└── audit result
```

Use configuration/data to supply:

- exact copy;
- originating module;
- destination;
- operation type;
- permission requirement;
- audit semantics.

Do not create 62 independent UI architectures.

---

# Frame inventory

## Core Admin operation flows

| Frame | Name |
|---|---|
| `649:2603` | ADMIN / ALUR 01 — Validasi Publikasi Blog |
| `649:2632` | ADMIN / ALUR 02 — Validasi Publikasi Replay Kelas |
| `649:2661` | ADMIN / ALUR 03 — Konfirmasi Tutup Lead |
| `649:2690` | ADMIN / ALUR 04 — Konfirmasi Tolak Testimoni |
| `649:2719` | ADMIN / ALUR 05 — Ekspor Lead |
| `649:2779` | ADMIN / ALUR 06 — Ekspor Invoice |
| `649:2839` | ADMIN / ALUR 07 — Ekspor Persetujuan |
| `649:2899` | ADMIN / ALUR 08 — Lead Sudah Dihubungi |
| `649:2959` | ADMIN / ALUR 09 — Link Daftar Terkirim |
| `649:3019` | ADMIN / ALUR 10 — Testimoni Disetujui |
| `649:3079` | ADMIN / ALUR 11 — Testimoni Unggulan |
| `649:3139` | ADMIN / ALUR 12 — Replay Kelas Berhasil Diunggah |
| `653:2638` | ADMIN / ALUR 13 — Validasi Publikasi Try Out |
| `653:2667` | ADMIN / ALUR 14 — Validasi Publikasi Pengumuman |
| `653:2696` | ADMIN / ALUR 15 — Konfirmasi Arsip Pengumuman |
| `657:2647` | ADMIN / ALUR 16 — Chapter Tersimpan |
| `657:2708` | ADMIN / ALUR 17 — Quiz Tersimpan |
| `657:2769` | ADMIN / ALUR 18 — Try Out Tersimpan |
| `657:2830` | ADMIN / ALUR 19 — Draft Blog Tersimpan |
| `657:2891` | ADMIN / ALUR 20 — Draft Pengumuman Tersimpan |
| `657:2952` | ADMIN / ALUR 21 — Jadwal Kelas Tersimpan |
| `657:3013` | ADMIN / ALUR 22 — Cohort Tersimpan |
| `657:3074` | ADMIN / ALUR 23 — Pengaturan Akses Tersimpan |
| `660:2671` | ADMIN / ALUR 24 — Akses Berhasil Diterapkan |
| `660:2731` | ADMIN / ALUR 25 — Invoice Terverifikasi |
| `660:2791` | ADMIN / ALUR 26 — Konfirmasi Tolak Invoice |

## Feedback revision flows

| Frame | Name |
|---|---|
| `770:2762` | ADMIN / ALUR R5-01 — Feedback Selesai |
| `770:2817` | ADMIN / ALUR R5-02 — Kandidat Testimoni Dibuat |

## Extended operational flows

| Frame | Name |
|---|---|
| `799:2675` | ADMIN / ALUR R7-01 — Aturan Akses Try Out Tersimpan |
| `806:2589` | ADMIN / ALUR R7-02 — Draft Landing Page Tersimpan |
| `806:2644` | ADMIN / ALUR R7-03 — Pratinjau Landing Page Siap |
| `806:2699` | ADMIN / ALUR R7-04 — Konfirmasi Publikasi Landing Page |
| `806:2723` | ADMIN / ALUR R7-05 — Landing Page Dipublikasikan |
| `806:2778` | ADMIN / ALUR R7-06 — Konfirmasi Pulihkan Versi Landing Page |
| `806:2802` | ADMIN / ALUR R7-07 — Versi Landing Page Dipulihkan |
| `809:2607` | ADMIN / ALUR R7-08 — Editor Program Baru |
| `809:2641` | ADMIN / ALUR R7-09 — Program Baru Tersimpan |

## R8 operation family

| Frame | Name |
|---|---|
| `816:2610` | ADMIN / ALUR R8-01 — Bantuan Akses Admin |
| `816:2622` | ADMIN / ALUR R8-02 — Import Konten Diproses |
| `816:2634` | ADMIN / ALUR R8-03 — Editor Konten Dibuka |
| `816:2646` | ADMIN / ALUR R8-04 — Detail Hasil Assessment |
| `816:2658` | ADMIN / ALUR R8-05 — Editor Pengguna Baru |
| `816:2670` | ADMIN / ALUR R8-06 — Pengguna Baru Tersimpan |
| `816:2682` | ADMIN / ALUR R8-07 — Editor Template Sertifikat |
| `816:2694` | ADMIN / ALUR R8-08 — Aksi Sertifikat Diproses |
| `816:2706` | ADMIN / ALUR R8-09 — Konfirmasi Cabut Sertifikat |
| `816:2718` | ADMIN / ALUR R8-10 — Sertifikat Dicabut |
| `816:2730` | ADMIN / ALUR R8-11 — Editor Pengumuman Baru |
| `816:2742` | ADMIN / ALUR R8-12 — Aset Blog & Kategori |
| `816:2754` | ADMIN / ALUR R8-13 — Aturan Komunitas |
| `816:2766` | ADMIN / ALUR R8-14 — Lampiran Community Dibuka |
| `816:2778` | ADMIN / ALUR R8-15 — Moderasi Community Diproses |
| `816:2790` | ADMIN / ALUR R8-16 — Konfirmasi Moderasi Destruktif |
| `816:2802` | ADMIN / ALUR R8-17 — Tindakan Moderasi Selesai |
| `816:2814` | ADMIN / ALUR R8-18 — Editor Template Notifikasi |
| `816:2826` | ADMIN / ALUR R8-19 — Template Notifikasi Diproses |
| `816:2838` | ADMIN / ALUR R8-20 — Konfirmasi Aktivasi Template |
| `816:2850` | ADMIN / ALUR R8-21 — Profil & Ketersediaan Sensei |
| `816:2862` | ADMIN / ALUR R8-22 — Aksi Audit Diproses |
| `816:2874` | ADMIN / ALUR R8-23 — Pengaturan Tersimpan |
| `816:2886` | ADMIN / ALUR R8-24 — Keamanan Admin |
| `816:2898` | ADMIN / ALUR R8-25 — Pratinjau Bukti Pembayaran |

---

# ALUR 01 — Validasi Publikasi Blog

**Figma:** `649:2603`

Exact visible copy:

- `ADMIN • VALIDASI BLOG`
- `Artikel belum dapat dipublikasikan`
- `Validasi`
- `!`
- `Lengkapi metadata SEO, gambar mini, kategori, dan konten wajib sebelum publikasi.`
- `Validasi metadata`
- `Validasi media`
- `Audit publikasi`
- `Kembali ke Blog`
- `Periksa Editor`

Actions:

- `Kembali ke Blog` → `432:1743`
- `Periksa Editor` → `432:1743`

Rule: publication remains blocked until required content/media/SEO validation passes.

---

# ALUR 02 — Validasi Publikasi Replay Kelas

**Figma:** `649:2632`

Exact visible copy:

- `ADMIN • VALIDASI REPLAY`
- `Replay belum dapat dipublikasikan`
- `Validasi`
- `!`
- `Lengkapi link kelas, rekaman, visibility, dan data sesi sebelum replay dipublikasikan.`
- `Validasi rekaman`
- `Validasi akses`
- `Audit publikasi`
- `Kembali ke Replay`
- `Periksa Kelas`

Actions:

- both actions → `432:2770`

Rule: replay upload is not the same as replay publication.

---

# ALUR 03 — Konfirmasi Tutup Lead

**Figma:** `649:2661`

Exact visible copy:

- `ADMIN • KONFIRMASI LEAD`
- `Tutup lead ini?`
- `Konfirmasi`
- `削`
- `Lead akan ditutup dari pipeline aktif. Alasan dan aktivitas admin tetap dicatat.`
- `Periksa status lead`
- `Validasi permission`
- `Catat audit`
- `Konfirmasi Tutup`
- `Batal`

Actions:

- both → `431:1116`

---

# ALUR 04 — Konfirmasi Tolak Testimoni

**Figma:** `649:2690`

Exact visible copy:

- `ADMIN • MODERASI TESTIMONI`
- `Tolak testimoni ini?`
- `Konfirmasi`
- `削`
- `Testimoni tidak akan tampil publik. Catatan moderasi dan persetujuan tetap disimpan.`
- `Periksa persetujuan`
- `Validasi alasan`
- `Catat audit`
- `Konfirmasi Tolak`
- `Batal`

Actions:

- both → `432:1941`

Rule: rejection does not erase consent/moderation history.

---

# ALUR 05 — Ekspor Lead

**Figma:** `649:2719`

Exact visible copy:

- `ADMIN • EKSPOR LEAD`
- `Ekspor lead sedang diproses`
- `Proses`
- `出`
- `Filter, masking data, permission, dan format file diperiksa sebelum unduhan tersedia.`
- `Periksa permission`
- `Masking data lead`
- `Catat audit`
- `Kembali ke Lead`
- `Tutup`

Actions:

- both → `431:1116`

---

# ALUR 06 — Ekspor Invoice

**Figma:** `649:2779`

Exact visible copy:

- `ADMIN • EKSPOR INVOICE`
- `Ekspor invoice sedang diproses`
- `Proses`
- `出`
- `Periode, status transaksi, masking pengguna, dan format file sedang diverifikasi.`
- `Periksa periode`
- `Validasi transaksi`
- `Catat audit`
- `Kembali ke Invoice`
- `Tutup`

Actions:

- both → `432:1192`

---

# ALUR 07 — Ekspor Persetujuan

**Figma:** `649:2839`

Exact visible copy:

- `ADMIN • EKSPOR PERSETUJUAN`
- `Ekspor persetujuan sedang diproses`
- `Proses`
- `出`
- `Data persetujuan, masking identitas, permission, dan format file sedang diverifikasi.`
- `Periksa persetujuan`
- `Masking identitas`
- `Catat audit`
- `Kembali ke Testimoni`
- `Tutup`

Actions:

- both → `432:1941`

---

# ALUR 08 — Lead Sudah Dihubungi

**Figma:** `649:2899`

Exact visible copy:

- `ADMIN • FOLLOW-UP LEAD`
- `Lead ditandai sudah dihubungi`
- `Berhasil`
- `✓`
- `Status lead berpindah ke Follow-up dan aktivitas kontak dicatat pada pipeline.`
- `Status diperbarui`
- `Admin tercatat`
- `Pipeline disinkronkan`
- `Kembali ke Lead`
- `Tutup`

Actions:

- both → `431:1116`

---

# ALUR 09 — Link Daftar Terkirim

**Figma:** `649:2959`

Exact visible copy:

- `ADMIN • REGISTRASI LEAD`
- `Link daftar berhasil dikirim`
- `Berhasil`
- `✓`
- `Tautan registrasi dikirim melalui kanal kontak yang tersedia dan aktivitas dicatat.`
- `Kontak tervalidasi`
- `Link dibuat`
- `Aktivitas dicatat`
- `Kembali ke Lead`
- `Tutup`

Actions:

- both → `431:1116`

---

# ALUR 10 — Testimoni Disetujui

**Figma:** `649:3019`

Exact visible copy:

- `ADMIN • MODERASI TESTIMONI`
- `Testimoni berhasil disetujui`
- `Berhasil`
- `✓`
- `Testimoni dapat tampil publik sesuai persetujuan dan kebijakan privasi yang berlaku.`
- `Persetujuan valid`
- `Konten disetujui`
- `Audit tersimpan`
- `Kembali ke Testimoni`
- `Tutup`

Actions:

- both → `432:1941`

---

# ALUR 11 — Testimoni Unggulan

**Figma:** `649:3079`

Exact visible copy:

- `ADMIN • TESTIMONI UNGGULAN`
- `Testimoni dijadikan unggulan`
- `Berhasil`
- `✓`
- `Testimoni disetujui dan ditandai sebagai unggulan untuk konteks publik yang relevan.`
- `Persetujuan valid`
- `Status unggulan aktif`
- `Audit tersimpan`
- `Kembali ke Testimoni`
- `Tutup`

Actions:

- both → `432:1941`

---

# ALUR 12 — Replay Kelas Berhasil Diunggah

**Figma:** `649:3139`

Exact visible copy:

- `ADMIN • UNGGAH REPLAY`
- `Replay kelas berhasil diunggah`
- `Berhasil`
- `✓`
- `Rekaman, transkrip, dan materi tersimpan. Publikasi tetap menunggu validasi admin.`
- `File tersimpan`
- `Metadata tervalidasi`
- `Audit tersimpan`
- `Kembali ke Replay`
- `Tutup`

Actions:

- both → `432:2770`

---

# ALUR 13 — Validasi Publikasi Try Out

**Figma:** `653:2638`

Exact visible copy:

- `ADMIN • VALIDASI TRY OUT`
- `Try Out belum dapat dipublikasikan`
- `Validasi`
- `!`
- `Lengkapi section, kumpulan soal, timer, scoring, dan aturan percobaan sebelum publikasi.`
- `Validasi section`
- `Validasi soal`
- `Audit publikasi`
- `Kembali ke Try Out`
- `Periksa Penyusun`

Actions:

- both → `431:727`

---

# ALUR 14 — Validasi Publikasi Pengumuman

**Figma:** `653:2667`

Exact visible copy:

- `ADMIN • VALIDASI PENGUMUMAN`
- `Pengumuman belum dapat dipublikasikan`
- `Validasi`
- `!`
- `Lengkapi audience, isi, jadwal, dan mode publikasi sebelum pengumuman diterbitkan.`
- `Validasi audience`
- `Validasi konten`
- `Audit publikasi`
- `Kembali ke Pengumuman`
- `Periksa Editor`

Actions:

- both → `432:1609`

---

# ALUR 15 — Konfirmasi Arsip Pengumuman

**Figma:** `653:2696`

Exact visible copy:

- `ADMIN • KONFIRMASI ARSIP`
- `Arsipkan pengumuman ini?`
- `Konfirmasi`
- `削`
- `Pengumuman akan dipindahkan dari daftar aktif. Riwayat publikasi dan audit tetap disimpan.`
- `Periksa status publikasi`
- `Validasi permission`
- `Catat audit`
- `Konfirmasi Arsip`
- `Batal`

Actions:

- both → `432:1609`

---

# ALUR 16 — Chapter Tersimpan

**Figma:** `657:2647`

Exact visible copy:

- `ADMIN • SIMPAN CHAPTER`
- `Perubahan chapter berhasil disimpan`
- `Berhasil`
- `✓`
- `Struktur chapter, modul, penilaian, dan aturan akses telah disimpan sebagai konfigurasi terbaru.`
- `Struktur tersimpan`
- `Modul disinkronkan`
- `Audit tersimpan`
- `Kembali ke Chapter`
- `Tutup`

Actions:

- both → `431:406`

---

# ALUR 17 — Quiz Tersimpan

**Figma:** `657:2708`

Exact visible copy:

- `ADMIN • SIMPAN QUIZ`
- `Quiz berhasil disimpan`
- `Berhasil`
- `✓`
- `Soal, jawaban, media, randomisasi, dan logika kelulusan telah disimpan.`
- `Soal tersimpan`
- `Aturan tervalidasi`
- `Audit tersimpan`
- `Kembali ke Quiz`
- `Tutup`

Actions:

- both → `431:582`

---

# ALUR 18 — Try Out Tersimpan

**Figma:** `657:2769`

Exact visible copy:

- `ADMIN • SIMPAN TRY OUT`
- `Try Out berhasil disimpan`
- `Berhasil`
- `✓`
- `Bagian, kumpulan soal, timer, scoring, dan aturan percobaan telah disimpan.`
- `Bagian tersimpan`
- `Soal disinkronkan`
- `Audit tersimpan`
- `Kembali ke Try Out`
- `Tutup`

Actions:

- both → `431:727`

---

# ALUR 19 — Draft Blog Tersimpan

**Figma:** `657:2830`

Exact visible copy:

- `ADMIN • SIMPAN DRAFT BLOG`
- `Draft artikel berhasil disimpan`
- `Berhasil`
- `✓`
- `Judul, isi, metadata SEO, kategori, dan gambar mini telah disimpan sebagai draft.`
- `Konten tersimpan`
- `Metadata tersimpan`
- `Audit tersimpan`
- `Kembali ke Blog`
- `Tutup`

Actions:

- both → `432:1743`

---

# ALUR 20 — Draft Pengumuman Tersimpan

**Figma:** `657:2891`

Exact visible copy:

- `ADMIN • SIMPAN PENGUMUMAN`
- `Draft pengumuman berhasil disimpan`
- `Berhasil`
- `✓`
- `Audience, isi, jadwal, dan mode publikasi telah disimpan sebagai draft.`
- `Audience tersimpan`
- `Konten tersimpan`
- `Audit tersimpan`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `432:1609`

---

# ALUR 21 — Jadwal Kelas Tersimpan

**Figma:** `657:2952`

Exact visible copy:

- `ADMIN • SIMPAN JADWAL`
- `Jadwal kelas berhasil disimpan`
- `Berhasil`
- `✓`
- `Cohort, Sensei, tanggal, durasi, link Zoom, agenda, dan pengingat telah disimpan.`
- `Jadwal tersimpan`
- `Pengingat tersimpan`
- `Audit tersimpan`
- `Kembali ke Kelas`
- `Tutup`

Actions:

- both → `432:2770`

## Context note

Layer E says class platform can be `Zoom / Meet / platform eksternal`, while this result copy specifically says `link Zoom`.

Preserve Figma copy. Do not use this single state to redefine the broader platform rule.

---

# ALUR 22 — Cohort Tersimpan

**Figma:** `657:3013`

Exact visible copy:

- `ADMIN • SIMPAN COHORT`
- `Perubahan cohort berhasil disimpan`
- `Berhasil`
- `✓`
- `Program, periode, kapasitas, Sensei, aturan sesi, dan assignment telah disimpan.`
- `Cohort tersimpan`
- `Kapasitas tervalidasi`
- `Audit tersimpan`
- `Kembali ke Cohort`
- `Tutup`

Actions:

- both → `432:2770`

---

# ALUR 23 — Pengaturan Akses Tersimpan

**Figma:** `657:3074`

Exact visible copy:

- `ADMIN • SIMPAN AKSES`
- `Pengaturan akses berhasil disimpan`
- `Berhasil`
- `✓`
- `Role, entitlement, permission, periode akses, dan alasan perubahan telah disimpan.`
- `Akses tervalidasi`
- `Permission disinkronkan`
- `Audit tersimpan`
- `Kembali ke Akses`
- `Tutup`

Actions:

- both → `432:982`

---

# ALUR 24 — Akses Berhasil Diterapkan

**Figma:** `660:2671`

Exact visible copy:

- `ADMIN • TERAPKAN AKSES`
- `Perubahan akses berhasil diterapkan`
- `Berhasil`
- `✓`
- `Membership, level, entitlement, permission, dan periode akses telah diperbarui.`
- `Akses diperbarui`
- `Permission disinkronkan`
- `Audit tersimpan`
- `Kembali ke Pengguna`
- `Tutup`

Actions:

- both → `432:845`

---

# ALUR 25 — Invoice Terverifikasi

**Figma:** `660:2731`

Exact visible copy:

- `ADMIN • VERIFIKASI INVOICE`
- `Invoice berhasil diverifikasi`
- `Berhasil`
- `✓`
- `Membership aktif dan reward referral yang valid diproses sesuai aturan backend.`
- `Transaksi diverifikasi`
- `Membership aktif dan reward referral yang valid diproses sesuai aturan backend.`
- `Audit tersimpan`
- `Kembali ke Invoice`
- `Tutup`

Actions:

- both → `432:1192`

## Critical rule

This is the verified activation boundary:

```text
invoice verified
→ membership active
→ valid referral reward processed
```

Do not activate membership earlier.

---

# ALUR 26 — Konfirmasi Tolak Invoice

**Figma:** `660:2791`

Exact visible copy:

- `ADMIN • KONFIRMASI INVOICE`
- `Tolak invoice ini?`
- `Konfirmasi`
- `削`
- `Invoice akan ditandai ditolak. Alasan verifikasi dan tindakan admin tetap dicatat.`
- `Periksa bukti bayar`
- `Validasi alasan`
- `Catat audit`
- `Konfirmasi Tolak`
- `Batal`

Actions:

- both → `432:1192`

---

# ALUR R5-01 — Feedback Selesai

**Figma:** `770:2762`

Exact visible copy:

- `Status feedback diperbarui dan tercatat pada audit log.`
- `Feedback ditandai selesai`
- `Berhasil`
- `✓`
- `Status feedback diperbarui dan tercatat pada audit log.`
- `Persetujuan valid`
- `Konten disetujui`
- `Audit tersimpan`
- `Kembali ke Feedback`
- `Tutup`

Actions:

- both → `432:2076`

## Copy note

The first visible text duplicates the explanatory sentence. Preserve current Figma until revised.

---

# ALUR R5-02 — Kandidat Testimoni Dibuat

**Figma:** `770:2817`

Exact visible copy:

- `Kandidat masuk ke Moderasi Testimoni dan belum otomatis dipublikasikan.`
- `Kandidat testimoni berhasil dibuat`
- `Berhasil`
- `✓`
- `Kandidat masuk ke Moderasi Testimoni dan belum otomatis dipublikasikan.`
- `Persetujuan valid`
- `Konten disetujui`
- `Audit tersimpan`
- `Buka Testimoni`
- `Tutup`

Actions:

- both → `432:1941`

## Critical rule

Candidate creation is **not publication**.

---

# ALUR R7-01 — Aturan Akses Try Out Tersimpan

**Figma:** `799:2675`

Exact visible copy:

- `ADMIN • ATURAN AKSES`
- `Aturan akses Try Out berhasil disimpan`
- `Berhasil`
- `✓`
- `Plan, level, jadwal, prerequisite, attempt, cooldown, dan izin ulasan telah diperbarui.`
- `Plan & level tersimpan`
- `Jadwal & attempt tersimpan`
- `Audit akses tersimpan`
- `Kembali ke Try Out`
- `Tutup`

Actions:

- both → `431:727`

---

# ALUR R7-02 — Draft Landing Page Tersimpan

**Figma:** `806:2589`

Exact visible copy:

- `ADMIN • LANDING PAGE DRAFT`
- `Draft Landing Page berhasil disimpan`
- `Berhasil`
- `Berhasil`
- `✓`
- `Konten, visibility, urutan section, CTA, media, dan SEO disimpan sebagai draft.`
- `Konten tersimpan`
- `Urutan tersimpan`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `805:2532`

## OPEN naming/copy inconsistency

This Landing Page state uses the visible label:

`Kembali ke Pengumuman`

but the destination is Landing Page Management (`805:2532`).

Do not silently rewrite the Figma contract. For implementation, record this as copy-review before final client freeze.

---

# ALUR R7-03 — Pratinjau Landing Page Siap

**Figma:** `806:2644`

Exact visible copy:

- `ADMIN • PRATINJAU LANDING PAGE`
- `Pratinjau Landing Page siap`
- `Berhasil`
- `Pratinjau`
- `✓`
- `Pratinjau menggunakan data draft dan tidak mengubah halaman publik yang aktif.`
- `Desktop siap`
- `CTA tervalidasi`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `805:2532`

## Critical draft rule

Preview does not change public content.

---

# ALUR R7-04 — Konfirmasi Publikasi Landing Page

**Figma:** `806:2699`

Exact visible copy:

- `ADMIN • PUBLIKASI LANDING PAGE`
- `Publikasikan Landing Page?`
- `Validasi`
- `Konfirmasi`
- `!`
- `Versi draft akan menggantikan versi publik setelah semua CTA, media, visibility, dan SEO tervalidasi.`
- `Validasi CTA`
- `Validasi media & SEO`
- `Kembali ke Blog`
- `Periksa Editor`

Actions:

- `Kembali ke Blog` → `805:2532`
- `Periksa Editor` → `806:2723`

## OPEN copy/action naming

This is a Landing Page publication flow but the visible action says `Kembali ke Blog`.

Preserve the Figma copy in the contract; resolve with client/Figma before final implementation copy freeze.

---

# ALUR R7-05 — Landing Page Dipublikasikan

**Figma:** `806:2723`

Exact visible copy:

- `ADMIN • LANDING PAGE PUBLIK`
- `Landing Page berhasil dipublikasikan`
- `Berhasil`
- `Berhasil`
- `✓`
- `Versi publik telah diperbarui dan versi sebelumnya tetap tersimpan pada riwayat.`
- `Versi publik aktif`
- `Cache diperbarui`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `805:2532`

---

# ALUR R7-06 — Konfirmasi Pulihkan Versi Landing Page

**Figma:** `806:2778`

Exact visible copy:

- `ADMIN • RIWAYAT LANDING PAGE`
- `Pulihkan versi sebelumnya?`
- `Validasi`
- `Konfirmasi`
- `!`
- `Versi terpilih akan menjadi draft aktif. Halaman publik tidak berubah sampai versi tersebut dipublikasikan.`
- `Versi dipilih`
- `Draft baru dibuat`
- `Kembali ke Blog`
- `Periksa Editor`

Actions:

- `Kembali ke Blog` → `805:2532`
- `Periksa Editor` → `806:2802`

## Critical restore rule

Restoring a historical version creates/sets a **draft**. It does not immediately replace the public page.

---

# ALUR R7-07 — Versi Landing Page Dipulihkan

**Figma:** `806:2802`

Exact visible copy:

- `ADMIN • RIWAYAT LANDING PAGE`
- `Versi sebelumnya berhasil dipulihkan`
- `Berhasil`
- `Berhasil`
- `✓`
- `Konten versi terpilih menjadi draft aktif dan dapat ditinjau sebelum publikasi.`
- `Draft dipulihkan`
- `Versi publik tetap aktif`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `805:2532`

---

# ALUR R7-08 — Editor Program Baru

**Figma:** `809:2607`

Exact visible copy:

- `ADMIN • PROGRAM BARU`
- `Buat produk level baru`
- `Level dapat dibuat tanpa prerequisite antarlevel dan tetap memakai aturan entitlement backend.`
- `Level`
- `N1–N5`
- `Status`
- `Draft`
- `Plan`
- `Free / Mandiri / Sensei`
- `Harga`
- `Dinamis dari Admin`
- `Chapter Gratis`
- `Chapter 1 / level`
- `Masa Akses`
- `Dinamis per produk`
- `Aturan penting`
- `Satu pengguna dapat memiliki beberapa level aktif. Publish hanya dilakukan setelah harga, Chapter, benefit, dan access rule tervalidasi.`
- `Simpan Program`
- `Batal`

Actions:

- `Simpan Program` → `809:2641`
- `Batal` → `431:218`

## Rule

Program starts as draft and remains level-independent.

---

# ALUR R7-09 — Program Baru Tersimpan

**Figma:** `809:2641`

Exact visible copy:

- `ADMIN • PROGRAM BARU`
- `Program baru berhasil disimpan`
- `Berhasil`
- `Berhasil`
- `✓`
- `Level, plan, harga, Chapter gratis, masa akses, dan status draft telah disimpan.`
- `Produk tersimpan`
- `Entitlement tersimpan`
- `Kembali ke Pengumuman`
- `Tutup`

Actions:

- both → `431:218`

## OPEN copy naming

The destination is Program Management, while the visible return copy says `Kembali ke Pengumuman`.

Preserve and flag for copy review.

---

# ALUR R8-01 — Bantuan Akses Admin

**Figma:** `816:2610`

Exact visible copy:

- `AKSES ADMIN`
- `Permintaan bantuan akses dicatat`
- `Super Admin menerima konteks akun dan dapat membantu aktivasi atau pemulihan akses.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Login`
- `Lupa Kata Sandi`

Prototype destinations:

- `Kembali ke Login` → `431:2`
- `Lupa Kata Sandi` → `431:27`

## IMPORTANT AUTH CONFLICT

These destinations belong to the old Page 11 Admin-specific auth frames.

Latest product decision overrides this:

- one shared Login;
- one shared Forgot/Reset flow;
- no `/admin/login`.

Therefore:

- preserve this Figma state as reference;
- **do not implement separate Admin auth routes**;
- remap this operational intent to shared auth when implementation begins.

Status: **OPEN PROTOTYPE DESTINATION CONFLICT**

---

# ALUR R8-02 — Import Konten Diproses

**Figma:** `816:2622`

Exact visible copy:

- `KONTEN`
- `Import atau unggah media diproses`
- `File divalidasi sebelum masuk ke bank soal atau perpustakaan konten.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Konten`
- `Lihat Audit`

Actions:

- `Kembali ke Konten` → `431:923`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-03 — Editor Konten Dibuka

**Figma:** `816:2634`

Exact visible copy:

- `KONTEN`
- `Konten siap diedit atau diduplikasi`
- `Perubahan disimpan sebagai draft dan tidak langsung mengganti versi publik.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Konten`
- `Lihat Audit`

Actions:

- `Kembali ke Konten` → `431:923`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-04 — Detail Hasil Assessment

**Figma:** `816:2646`

Exact visible copy:

- `ASSESSMENT`
- `Detail attempt dan ulasan tersedia`
- `Admin dapat melihat jawaban, skor, section, waktu, dan status ulasan pengguna.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Hasil`
- `Ekspor Data`

Actions:

- `Kembali ke Hasil` → `431:1323`
- `Ekspor Data` → `433:2702`

---

# ALUR R8-05 — Editor Pengguna Baru

**Figma:** `816:2658`

Exact visible copy:

- `PENGGUNA`
- `Tambahkan pengguna baru`
- `Isi identitas, role, level, plan, masa akses, dan status verifikasi.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Simpan Pengguna`
- `Batal`

Actions:

- `Simpan Pengguna` → `816:2670`
- `Batal` → `432:845`

## Role-model rule

Keep:

- technical role;
- plan;
- level;
- entitlement

as distinct fields/concepts.

---

# ALUR R8-06 — Pengguna Baru Tersimpan

**Figma:** `816:2670`

Exact visible copy:

- `PENGGUNA`
- `Pengguna baru berhasil disimpan`
- `Akun dan entitlement awal tercatat. Perubahan sensitif masuk audit log.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Pengguna`
- `Lihat Audit`

Actions:

- `Kembali ke Pengguna` → `432:845`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-07 — Editor Template Sertifikat

**Figma:** `816:2682`

Exact visible copy:

- `SERTIFIKAT`
- `Template sertifikat siap diedit`
- `Logo, judul, penandatangan, nomor, dan metadata verifikasi dapat diperbarui.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Sertifikat`
- `Lihat Audit`

Actions:

- `Kembali ke Sertifikat` → `432:1478`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-08 — Aksi Sertifikat Diproses

**Figma:** `816:2694`

Exact visible copy:

- `SERTIFIKAT`
- `Aksi sertifikat berhasil diproses`
- `Penerbitan, unduh, atau terbit ulang mengikuti eligibility dan versi template aktif.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Sertifikat`
- `Lihat Audit`

Actions:

- `Kembali ke Sertifikat` → `432:1478`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-09 — Konfirmasi Cabut Sertifikat

**Figma:** `816:2706`

Exact visible copy:

- `SERTIFIKAT • DESTRUKTIF`
- `Cabut sertifikat ini?`
- `Sertifikat tidak lagi valid untuk verifikasi publik. Alasan pencabutan wajib dicatat.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Cabut Sertifikat`
- `Batal`

Actions:

- `Cabut Sertifikat` → `816:2718`
- `Batal` → `432:1478`

---

# ALUR R8-10 — Sertifikat Dicabut

**Figma:** `816:2718`

Exact visible copy:

- `SERTIFIKAT`
- `Sertifikat berhasil dicabut`
- `Status publik dinonaktifkan dan peristiwa pencabutan masuk audit log.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Sertifikat`
- `Lihat Audit`

Actions:

- `Kembali ke Sertifikat` → `432:1478`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-11 — Editor Pengumuman Baru

**Figma:** `816:2730`

Exact visible copy:

- `PENGUMUMAN`
- `Pengumuman baru siap dibuat`
- `Atur audience, isi, jadwal, CTA, dan mode publikasi sebelum disimpan.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Pengumuman`
- `Lihat Audit`

Actions:

- `Kembali ke Pengumuman` → `432:1609`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-12 — Aset Blog & Kategori

**Figma:** `816:2742`

Exact visible copy:

- `BLOG`
- `Kategori atau gambar mini siap dikelola`
- `Perubahan disimpan pada draft artikel dan divalidasi sebelum publikasi.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Blog`
- `Lihat Audit`

Actions:

- `Kembali ke Blog` → `432:1743`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-13 — Aturan Komunitas

**Figma:** `816:2754`

Exact visible copy:

- `COMMUNITY`
- `Aturan komunitas tersedia`
- `Admin dapat meninjau panduan posting, lampiran, laporan, dan sanksi moderasi.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Moderasi`
- `Lihat Audit`

Actions:

- `Kembali ke Moderasi` → `432:2199`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-14 — Lampiran Community Dibuka

**Figma:** `816:2766`

Exact visible copy:

- `COMMUNITY`
- `Lampiran postingan dapat ditinjau`
- `Admin dapat memeriksa media sebelum mempertahankan atau menghapus postingan.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Moderasi`
- `Lihat Audit`

Actions:

- `Kembali ke Moderasi` → `432:2199`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-15 — Moderasi Community Diproses

**Figma:** `816:2778`

Exact visible copy:

- `COMMUNITY`
- `Keputusan moderasi berhasil disimpan`
- `Postingan dipertahankan atau penulis diberi peringatan sesuai aksi Admin.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Moderasi`
- `Lihat Audit`

Actions:

- `Kembali ke Moderasi` → `432:2199`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-16 — Konfirmasi Moderasi Destruktif

**Figma:** `816:2790`

Exact visible copy:

- `COMMUNITY • DESTRUKTIF`
- `Lanjutkan tindakan moderasi?`
- `Penghapusan postingan atau penangguhan penulis harus memiliki alasan yang dapat diaudit.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Konfirmasi Tindakan`
- `Batal`

Actions:

- `Konfirmasi Tindakan` → `816:2802`
- `Batal` → `432:2199`

---

# ALUR R8-17 — Tindakan Moderasi Selesai

**Figma:** `816:2802`

Exact visible copy:

- `COMMUNITY`
- `Tindakan moderasi selesai`
- `Konten atau akses penulis diperbarui dan notifikasi dikirim sesuai kebijakan.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Moderasi`
- `Lihat Audit`

Actions:

- `Kembali ke Moderasi` → `432:2199`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-18 — Editor Template Notifikasi

**Figma:** `816:2814`

Exact visible copy:

- `NOTIFIKASI`
- `Template notifikasi siap diedit`
- `Kelola variable, audience, channel, isi, dan versi template.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Template`
- `Lihat Audit`

Actions:

- `Kembali ke Template` → `432:2320`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-19 — Template Notifikasi Diproses

**Figma:** `816:2826`

Exact visible copy:

- `NOTIFIKASI`
- `Perubahan template berhasil diproses`
- `Tes terkirim atau versi baru tersimpan tanpa mengubah template aktif secara otomatis.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Template`
- `Lihat Audit`

Actions:

- `Kembali ke Template` → `432:2320`
- `Lihat Audit` → `432:3518`

## Critical versioning rule

Saving/testing a template does **not** automatically activate it.

---

# ALUR R8-20 — Konfirmasi Aktivasi Template

**Figma:** `816:2838`

Exact visible copy:

- `NOTIFIKASI`
- `Aktifkan versi template ini?`
- `Versi aktif akan digunakan untuk pengiriman berikutnya setelah validasi variable dan channel.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Aktifkan Template`
- `Batal`

Actions:

- `Aktifkan Template` → `816:2826`
- `Batal` → `432:2320`

---

# ALUR R8-21 — Profil & Ketersediaan Sensei

**Figma:** `816:2850`

Exact visible copy:

- `SENSEI`
- `Profil atau ketersediaan siap diperbarui`
- `Perubahan assignment dan jadwal divalidasi terhadap cohort aktif.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Sensei`
- `Lihat Cohort`

Actions:

- `Kembali ke Sensei` → `432:2632`
- `Lihat Cohort` → `432:2770`

---

# ALUR R8-22 — Aksi Audit Diproses

**Figma:** `816:2862`

Exact visible copy:

- `AUDIT`
- `Aksi audit berhasil diproses`
- `ID event disalin, record terkait dibuka, atau data ekspor disiapkan sesuai permission.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Audit`
- `Dashboard`

Actions:

- `Kembali ke Audit` → `432:3518`
- `Dashboard` → `431:152`

---

# ALUR R8-23 — Pengaturan Tersimpan

**Figma:** `816:2874`

Exact visible copy:

- `PENGATURAN`
- `Pengaturan berhasil disimpan`
- `Konfigurasi umum atau aset brand telah diperbarui dan dicatat pada audit log.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Pengaturan`
- `Lihat Audit`

Actions:

- `Kembali ke Pengaturan` → `432:3681`
- `Lihat Audit` → `432:3518`

---

# ALUR R8-24 — Keamanan Admin

**Figma:** `816:2886`

Exact visible copy:

- `KEAMANAN`
- `Pengaturan keamanan siap dikelola`
- `MFA dan perubahan kata sandi membutuhkan autentikasi ulang serta audit.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Pengaturan`
- `Lihat Audit`

Actions:

- `Kembali ke Pengaturan` → `432:3681`
- `Lihat Audit` → `432:3518`

## Critical security rule

MFA/password changes require reauthentication in addition to permission/audit behavior.

Do not implement them as an ordinary settings toggle.

---

# ALUR R8-25 — Pratinjau Bukti Pembayaran

**Figma:** `816:2898`

Exact visible copy:

- `INVOICE`
- `Bukti pembayaran dapat ditinjau`
- `Admin memeriksa identitas, nominal, waktu transaksi, dan kecocokan invoice sebelum verifikasi.`
- `Aksi mengikuti permission Admin dan dicatat pada audit log.`
- `Kembali ke Invoice`
- `Lanjut Verifikasi`

Actions:

- `Kembali ke Invoice` → `432:1192`
- `Lanjut Verifikasi` → `433:2568`

## Critical payment rule

Proof preview is only evidence review.

It does not activate membership.

---

# Major verified Admin operation chains

## User access

```text
User Management
→ Editor Akses Pengguna
→ Terapkan Perubahan
→ Akses Berhasil Diterapkan
→ User Management
```

## Invoice verification

```text
Invoice Management
→ Verifikasi Invoice
→ Lihat Bukti
→ Pratinjau Bukti Pembayaran
→ Lanjut Verifikasi
→ Verifikasi & Aktifkan
→ Invoice Terverifikasi
→ membership active
→ valid referral reward processed
```

Rejection:

```text
Verifikasi Invoice
→ Tolak Invoice
→ Konfirmasi Tolak Invoice
→ Invoice Management
```

## Lead

```text
Placement Lead
├─ Mark Contacted → Lead Sudah Dihubungi
├─ Kirim Link Daftar → Link Daftar Terkirim
├─ Close Lead → Konfirmasi Tutup Lead
└─ Export → Ekspor Lead
```

## Content publication

```text
Blog
├─ Save Draft → Draft Blog Tersimpan
└─ Publish → Validasi Publikasi Blog

Announcement
├─ Save Draft → Draft Pengumuman Tersimpan
├─ Publish → Validasi Publikasi Pengumuman
└─ Archive → Konfirmasi Arsip Pengumuman

Try Out
├─ Save → Try Out Tersimpan
├─ Save Access Rule → Aturan Akses Try Out Tersimpan
└─ Publish → Validasi Publikasi Try Out
```

## Replay

```text
Cohort & Kelas
├─ Save Schedule → Jadwal Kelas Tersimpan
├─ Upload Replay → Replay Kelas Berhasil Diunggah
└─ Publish Replay → Validasi Publikasi Replay Kelas
```

Upload does not equal publish.

## Feedback → testimonial

```text
Feedback
├─ Tandai Selesai → Feedback Selesai
└─ Buat Kandidat Testimoni
    → Kandidat Testimoni Dibuat
    → Testimonial Moderation
        ├─ Approve → Testimoni Disetujui
        ├─ Approve & Feature → Testimoni Unggulan
        └─ Reject → Konfirmasi Tolak Testimoni
```

Candidate does not equal published testimonial.

## Landing Page

```text
Landing Management
├─ Save Draft
│   → Draft Landing Page Tersimpan
├─ Preview
│   → Pratinjau Landing Page Siap
├─ Publish
│   → Konfirmasi Publikasi
│   → Landing Page Dipublikasikan
└─ Restore Version
    → Konfirmasi Pulihkan
    → Versi Dipulihkan as draft
    → publish separately later
```

## Certificate

```text
Certificate Management
├─ Template → Editor Template Sertifikat
├─ Issue / Download / Reissue → Aksi Sertifikat Diproses
└─ Revoke
    → Konfirmasi Cabut Sertifikat
    → Sertifikat Dicabut
```

## Community moderation

```text
Community Moderation
├─ Rules
├─ Attachment Preview
├─ Keep / Warn → Moderasi Community Diproses
└─ Remove / Suspend
    → Konfirmasi Moderasi Destruktif
    → Tindakan Moderasi Selesai
```

## Notification template

```text
Notification Templates
├─ Editor
├─ Test / Save Version
│   → Template Notifikasi Diproses
└─ Activate
    → Konfirmasi Aktivasi Template
    → processed
```

Saving/testing does not automatically activate a template.

---

# Audit semantics verified throughout Layer G

A repeated contract pattern appears throughout the layer:

`Aksi mengikuti permission Admin dan dicatat pada audit log.`

Operational actions must preserve enough information later to record at least:

- actor;
- target;
- action/event;
- reason where applicable;
- permission/result;
- before/after where applicable;
- timestamp;
- outcome.

Do not treat audit as a decorative frontend label.

---

# Destructive actions that require explicit context

Layer G verifies special handling for:

- closing a lead;
- rejecting a testimonial;
- archiving an announcement;
- rejecting an invoice;
- revoking a certificate;
- removing Community content;
- suspending a Community author.

A shared destructive-confirmation component is appropriate, but the actual operation must remain context-specific.

---

# Publication boundaries

Layer G verifies separate concepts for:

```text
draft
preview
validation
publish
published result
archive/restore
```

Do not merge these into one generic `Save` state.

This is especially important for:

- Blog;
- Announcement;
- Try Out;
- Replay;
- Landing Page.

---

# OPEN Figma copy/prototype inconsistencies

Preserve these in the contract and resolve before final client-copy freeze.

## Landing Page return labels

Several Landing operation states visibly say:

- `Kembali ke Pengumuman`
- `Kembali ke Blog`

while routing back to `805:2532` Landing Page Management.

Affected examples:

- `806:2589`
- `806:2644`
- `806:2699`
- `806:2723`
- `806:2778`
- `806:2802`

## Program result return label

`809:2641` — Program Baru Tersimpan visibly says:

- `Kembali ke Pengumuman`

but routes to Program Management (`431:218`).

## Admin auth destination conflict

`816:2610` routes to old Admin Login/Forgot frames:

- `431:2`
- `431:27`

Latest product decision uses shared auth.

Do not implement those Admin-specific auth routes.

## Duplicate visible labels

Some Figma success states include repeated `Berhasil` strings.

Preserve them as source copy until corrected.

---

# Dynamic / fixture values

Do not hardcode:

- specific lead identities;
- invoice IDs;
- member identities;
- plan/level examples;
- current prices;
- access periods;
- active program values;
- current file names;
- schedule dates;
- Zoom links;
- cohort identities;
- certificate numbers;
- template versions;
- export size;
- audit IDs;
- exact permission state.

---

# Layer G implementation priority

Layer G is important to **contract**, but not every state has equal implementation priority.

## Priority 1 — required for core Admin workflow

Implement/reuse first:

- save success;
- validation blocked;
- destructive confirmation;
- access update;
- payment proof preview;
- invoice verification/rejection;
- publication validation;
- export processing;
- permission/audit result semantics.

## Priority 2 — module-specific operational states

Add as each Admin module becomes client-testable:

- Lead follow-up;
- testimonial moderation;
- replay upload/publish;
- feedback candidate;
- Landing draft/preview/publish/restore;
- certificate revoke;
- community moderation;
- notification-template activation;
- Sensei availability;
- security settings.

This prevents overengineering while preserving the full Figma contract.

---

# Frontend-first implementation rules

1. Exact copy and verified destinations come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse shared Admin operation/status primitives.
4. Do not create 62 routes.
5. Keep return destination contextual.
6. Keep draft, validation, preview, publish, and published-result states distinct.
7. Keep upload separate from publication.
8. Keep payment proof separate from invoice verification.
9. Keep invoice verification as the membership activation boundary.
10. Keep testimonial candidate creation separate from testimonial approval/publication.
11. Keep notification template save/test separate from activation.
12. Keep Landing version restoration as draft restoration, not immediate public rollback.
13. Destructive actions require context/reason/audit semantics.
14. Sensitive actions require permission semantics.
15. Do not use old Admin-specific Login destinations despite R8-01 prototype links; shared auth remains the product decision.
16. Do not implement Laravel/Sanctum, Postgres, real audit persistence, file storage, export generation, payment verification, publication backend, MFA, notification delivery, certificate authority, moderation backend, or permission enforcement during this contract phase.
17. Implement the smallest reusable operational primitives first, then connect module-specific flows.
