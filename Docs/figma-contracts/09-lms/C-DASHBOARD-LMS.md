# C-DASHBOARD — LMS / 17 — Dasbor Belajar Mandiri

> Figma source: **Page 09 — E2E / Belajar Mandiri**  
> Layer: **C — Beranda Pengguna**  
> Screen: **LMS / 17 — Dasbor Belajar Mandiri**  
> Figma frame: `405:566`  
> Frame size: `1280 × 1582`  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Sidebar labels: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED where listed**
- Sensei-only locked-state popup copy: **NOT duplicated here** — extract in Page 09 Layer F
- Runtime/user/progress values: **FIXTURE / MOCK where noted**
- Do not paraphrase VERIFIED copy.
- Do not introduce Backend/API work while implementing this frontend-first screen.

---

# 1. Screen structure

The Figma screen has two main areas:

1. `Bilah Samping / LMS / Dasbor LMS`
2. `Dasbor Terpadu / Belajar Mandiri`

High-level content order:

1. Membership header
2. Lanjutkan Belajar
3. Aksi Cepat
4. Status Entitlement
5. Belajar Mandiri feature matrix
6. Sensei-only locked feature row
7. Progres / aktivitas dan motivasi
8. Achievement / Mini Checkpoint / Membership & Payment
9. Progress summary
10. Dashboard announcement

Reuse the same student dashboard/navigation family used by Free and Sensei. Differences should come from membership/entitlement configuration, not duplicated dashboard architecture.

---

# 2. Sidebar

## Brand

- `Hiru Academy`
- `BELAJAR BAHASA JEPANG`

## Primary navigation

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

## Bottom navigation / CTA

- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

## Figma interaction mapping

### Dashboard

Current screen / active state.

### Kelas Saya

Destination:

- `405:785` — LMS Level Journey

### Kumpulan Flashcard

Destination:

- `407:2695` — LMS Kumpulan Flashcard

### Latihan Harian

Destination:

- `405:3045` — LMS Latihan Harian

### Try Out

Destination:

- `405:3332` — LMS Daftar Try Out

### Perpustakaan

Destination:

- `405:4478` — LMS Perpustakaan

### Komunitas

Destination:

- `405:5289` — LMS Komunitas

### Progres

Destination:

- `405:4744` — LMS Progres & Pencapaian

### Sertifikat

Destination:

- `405:5963` — LMS Pusat Sertifikat

### Notifikasi

Destination:

- `405:6658` — LMS Pusat Notifikasi

### Profil

Destination:

- `405:6972` — LMS Profil & Keanggotaan

### Mulai Belajar / Pengaturan / Keluar

No prototype destination was verified from these nodes in this screen.

Status:

- `Mulai Belajar` → **OPEN**
- `Pengaturan` → **OPEN**
- `Keluar` → **OPEN**

Do not invent client-approved destinations from this screen alone.

---

# 3. Membership header

## Exact visible copy

- `BELAJAR MANDIRI • 2 LEVEL AKTIF`
- `Selamat datang, Hilmi`
- `Lanjutkan progress terakhir atau pilih level aktif lain.`
- `Belajar Mandiri`

## Fixture classification

The following are runtime/sample data in this design:

- `Hilmi`
- `2 LEVEL AKTIF`

Do not encode them as permanent product values.

---

# 4. Lanjutkan Belajar

## Exact visible copy

- `LANJUTKAN BELAJAR`
- `Chapter 4 — JLPT N4`
- `Progress terakhir berasal dari backend. N4 dan N3 aktif serta tersimpan terpisah.`
- `Lanjutkan Belajar`
- `Pilih Level`
- `▰`
- `56% selesai`

## Figma interactions

### Lanjutkan Belajar

Destination:

- `405:1216` — LMS Chapter Overview

### Pilih Level

Destination:

- `405:785` — LMS Level Journey

## Fixture classification

These visible values are sample/runtime state:

- `Chapter 4 — JLPT N4`
- `N4 dan N3 aktif`
- `56% selesai`

They describe the current Figma fixture, not a universal rule that every LMS user owns exactly N4 and N3.

---

# 5. Aksi Cepat

## Section heading

- `AKSI CEPAT`
- `Akses yang paling sering digunakan`
- `Satu pola tindakan yang sama di seluruh jenis akun.`

## Lanjutkan

- `▶`
- `Lanjutkan`
- `Chapter 4`

Destination:

- `405:1216`

## Pilih Level

- `LV`
- `Pilih Level`
- `2 level aktif`

Destination:

- `405:785`

## Flashcard

- `FC`
- `Flashcard`
- `Semua deck`

Destination:

- `407:2695`

## Latihan Harian

- `練`
- `Latihan Harian`
- `Aktif`

Destination:

- `405:3045`

## Try Out

- `試`
- `Try Out`
- `Simulasi JLPT`

Destination:

- `405:3332`

## Perpustakaan

- `本`
- `Perpustakaan`
- `Semua materi`

Destination:

- `405:4478`

## Icon/glyph note

`▶`, `LV`, `FC`, `練`, `試`, and `本` are icon/glyph content in the Figma design.

Purely decorative glyphs may use the approved icon treatment from `DESIGN.md`, but visible labels must remain verbatim.

---

# 6. Status Entitlement

## Exact visible copy

- `STATUS ENTITLEMENT`
- `Fitur dan hak aksesmu`
- `Semua fitur tetap terlihat; status ditentukan plan, level, dan backend.`

This screen intentionally keeps both available and Sensei-only features visible.

Do not hide Sensei-only features from Belajar Mandiri if Figma shows them as locked previews.

---

# 7. Belajar Mandiri entitlement matrix

## Perjalanan Level

- `道`
- `Perjalanan Level`
- `AKTIF`
- `Kelola N4 dan N3 aktif dalam satu akun.`

Destination:

- `405:785`

## Chapter & Materi

- `章`
- `Chapter & Materi`
- `AKTIF`
- `Seluruh Chapter terbuka pada level yang dibeli.`

Destination:

- `405:1005` — LMS Chapter Journey

## Latihan Harian

- `練`
- `Latihan Harian`
- `AKTIF`
- `Latihan harian terbuka pada level aktif.`

Destination:

- `405:3045`

## Try Out & Ulasan

- `試`
- `Try Out & Ulasan`
- `AKTIF`
- `Try Out dan ulasan jawaban tersedia.`

Destination:

- `405:3332`

## Community

- `人`
- `Community`
- `AKTIF`
- `Buat postingan dan balas percakapan.`

Destination:

- `405:5289`

## Sertifikat

- `証`
- `Sertifikat`
- `AKTIF`
- `Sertifikat tersedia setelah syarat terpenuhi.`

Destination:

- `405:5963`

## Entitlement meaning

For Belajar Mandiri, these are presented as available capabilities.

This does **not** mean the frontend should invent final server authorization, certificate eligibility rules, level ownership, assessment attempt limits, or content availability logic.

---

# 8. Sensei-only locked row

## Jadwal Kelas

- `予`
- `Jadwal Kelas`
- `TERKUNCI`
- `Buka Jadwal Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin.`

Destination:

- `740:3344` — LMS / condition: Sensei feature locked

## Replay Kelas

- `再`
- `Replay Kelas`
- `TERKUNCI`
- `Buka Replay Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin.`

Destination:

- `740:3344`

## Tanya Sensei

- `先`
- `Tanya Sensei`
- `TERKUNCI`
- `Buka Tanya Sensei melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin.`

Destination:

- `740:3344`

## Locked behavior

These capabilities remain visible as previews for Belajar Mandiri.

When clicked:

- do not navigate into real Sensei content;
- use the verified Page 09 locked state from Layer F;
- do not invent popup copy before Layer F is extracted.

---

# 9. Progres section

## Exact visible copy

- `PROGRES`
- `Aktivitas dan motivasi`
- `Nilai aktual mengikuti aktivitas yang tersimpan di backend.`

Frontend-first implementation may use deterministic mock values.

Do not build real progress persistence during this screen task.

---

# 10. Additional entitlement row

## Achievement

- `★`
- `Achievement`
- `AKTIF`
- `Achievement, streak, dan milestone tersedia pada Belajar Mandiri.`

Destination:

- `405:4744` — Progres & Pencapaian

## Mini Checkpoint Kelas

- `✓`
- `Mini Checkpoint Kelas`
- `TERKUNCI`
- `Khusus Belajar dengan Sensei. Buka akses melalui WhatsApp Admin.`

Destination:

- `740:3344` — Sensei feature locked state

## Membership & Payment

- `WA`
- `Membership & Payment`
- `WA`
- `Renewal atau upgrade dilanjutkan melalui WhatsApp Admin.`

Destination:

- `405:7157` — LMS renewal/membership flow

---

# 11. Progress summary

## Exact visible copy

### XP

- `★`
- `XP Mingguan`
- `— XP`

### Streak

- `♨`
- `Streak Belajar`
- `— hari`

### Active levels

- `⌕`
- `Level Aktif`
- `2 level`

## Fixture classification

- `— XP`
- `— hari`
- `2 level`

are runtime/sample values.

Do not fabricate final XP or streak calculation rules during frontend-first work.

---

# 12. Dashboard announcement

## Exact visible copy

- `!`
- `Pengumuman`
- `Seluruh fitur Belajar Mandiri aktif. Jadwal, replay, Tanya Sensei, dan Mini Checkpoint tetap terlihat sebagai akses Belajar dengan Sensei melalui WhatsApp Admin.`

Do not paraphrase this client-visible copy.

---

# 13. Entitlement summary for LMS dashboard

| Feature | Visible state |
|---|---|
| Perjalanan Level | `AKTIF` |
| Chapter & Materi | `AKTIF` |
| Latihan Harian | `AKTIF` |
| Try Out & Ulasan | `AKTIF` |
| Community | `AKTIF` |
| Sertifikat | `AKTIF` |
| Achievement | `AKTIF` |
| Jadwal Kelas | `TERKUNCI` |
| Replay Kelas | `TERKUNCI` |
| Tanya Sensei | `TERKUNCI` |
| Mini Checkpoint Kelas | `TERKUNCI` |
| Membership & Payment | `WA` |

Core distinction:

- Belajar Mandiri features → available
- Sensei-specific features → visible but locked
- Membership/payment → available via renewal/upgrade flow

---

# 14. Frontend-first implementation rules

When this dashboard is implemented or revised:

1. Exact copy and content hierarchy come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse existing shared `StudentNavigation` and `StudentDashboard` architecture where possible.
4. Do not build a second LMS-only dashboard system if membership configuration can drive the shared dashboard.
5. Belajar Mandiri must not accidentally expose Sensei Schedule, Replay, Tanya Sensei, or Mini Checkpoint.
6. Do not hide those Sensei-only features when Figma requires locked previews.
7. Use deterministic frontend fixtures for user name, owned levels, progress, XP, and streak.
8. Do not invent final level ownership, progress calculations, certificate eligibility, pricing, or payment rules.
9. Do not add Laravel/API/payment/auth work during this frontend-first screen task.
10. Exact locked-state/modal wording comes from Page 09 Layer F, not from AI.
11. Do not modify unrelated screens while fixing this dashboard.
