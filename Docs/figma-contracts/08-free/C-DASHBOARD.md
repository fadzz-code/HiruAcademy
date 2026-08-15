# C-DASHBOARD — FREE / 17 — Dasbor Free Member

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **C — Beranda Pengguna** (`388:5`)  
> Screen: **FREE / 17 — Dasbor Free Member**  
> Figma frame: `392:566`  
> Frame size: `1280 × 1582`  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Sidebar labels: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED where listed**
- Locked-state popup copy: **NOT defined here** — use Layer F contract when extracted
- Runtime/user/progress values: **FIXTURE / MOCK where noted**
- Do not paraphrase VERIFIED copy.
- Do not introduce Backend/API work while implementing this frontend screen.

---

# 1. Screen structure

The Figma screen has two main areas:

1. `Sidebar / Free / Dashboard Free`
2. `Dasbor Terpadu / Free Member`

High-level content order:

1. Membership header
2. Lanjutkan Belajar
3. Aksi Cepat
4. Status Entitlement
5. Entitlement feature matrix
6. Progres / aktivitas dan motivasi
7. Additional entitlement row
8. Progress summary
9. Dashboard announcement

Use the same shared student sidebar family for Free, LMS, and Sensei. Do not build a Free-only sidebar implementation if the existing shared navigation can represent the required entitlement state.

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
- `Notifikasi`
- `Profil`

## Bottom CTA / utility navigation

- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

## Figma interaction mapping

### Dashboard

- Current screen.
- Component state in Figma: `Active`.

### Kelas Saya

Figma click destination:

- `392:785` — `FREE / 18 — Level Journey`

### Kumpulan Flashcard

Figma click destination:

- `398:2069` — `FREE / 24 — Kumpulan Flashcard`

### Latihan Harian

Figma click destination:

- `392:3311` — `FREE / 31 — Latihan Harian — Terbatas`

### Try Out

Figma click destination:

- `753:2182` — Free locked Try Out state

### Perpustakaan

Figma click destination:

- `392:3045` — `FREE / 30 — Perpustakaan Materi — Limited`

### Komunitas

Figma click destination:

- `392:4143` — `FREE / 34 — Community — Read Only`

### Progres

Figma click destination:

- `392:3598` — `FREE / 32 — Progres & Achievement`

### Notifikasi

Figma click destination:

- `392:4594` — `FREE / 36 — Notification Center`

### Profil

Figma click destination:

- `392:4908` — `FREE / 37 — Profil & Membership`

### Mulai Belajar / Pengaturan / Keluar

The current Figma frame does not define a prototype destination on these nodes.

Status:

- `Mulai Belajar` → **OPEN**
- `Pengaturan` → **OPEN**
- `Keluar` → **OPEN**

Do not invent a client-approved destination from this screen alone.

---

# 3. Membership header

## Exact visible copy

- `FREE MEMBER • CHAPTER 1 PADA N1–N5`
- `Selamat datang, Hilmi`
- `Lanjutkan level terakhir atau pilih level lain untuk mencoba Chapter 1.`
- `Free Member`

## Data classification

`Hilmi` is sample user data in the Figma screen.

Implementation should preserve the exact surrounding copy while allowing the user name to come from deterministic frontend mock data during frontend-first development.

---

# 4. Lanjutkan Belajar

## Exact visible copy

- `LANJUTKAN BELAJAR`
- `Chapter 1 — JLPT N4`
- `Contoh level terakhir yang dibuka. Chapter 1 pada N1, N2, N3, N4, dan N5 tetap tersedia.`
- `Buka Chapter 1`
- `Pilih Level`
- `▰`
- `56% selesai`

## Figma interaction mapping

### Buka Chapter 1

Destination:

- `392:1216` — `FREE / 20 — Chapter Overview`

### Pilih Level

Destination:

- `392:785` — `FREE / 18 — Level Journey`

## Data classification

The following values are presentation fixtures in this frame:

- `JLPT N4`
- `56% selesai`

Do not encode N4 or 56% as permanent product rules.

---

# 5. Aksi Cepat

## Section heading

- `AKSI CEPAT`
- `Akses yang paling sering digunakan`
- `Satu pola tindakan yang sama di seluruh jenis akun.`

## Quick action — Lanjutkan

- `▶`
- `Lanjutkan`
- `Chapter 1`

Figma destination:

- `392:1216` — Chapter Overview

## Quick action — Pilih Level

- `LV`
- `Pilih Level`
- `N1–N5`

Figma destination:

- `392:785` — Level Journey

## Quick action — Flashcard

- `FC`
- `Flashcard`
- `Deck gratis`

Figma destination:

- `398:2069` — Kumpulan Flashcard

## Quick action — Latihan Harian

- `練`
- `Latihan Harian`
- `Akses terbatas`

Figma destination:

- `392:3311` — Latihan Harian — Terbatas

## Quick action — Komunitas

- `人`
- `Komunitas`
- `Baca saja`

Figma destination:

- `392:4143` — Community — Read Only

## Quick action — Upgrade / payment

- `↑`
- `Bayar via WA`
- `Buka akses`

Figma destination:

- `392:5093` — `FREE / 38 — Renewal & Upgrade`

## Icon/glyph note

`▶`, `LV`, `FC`, `練`, `人`, and `↑` are rendered as icon/glyph content in the Figma design.

The frontend may use the project-approved icon treatment from `DESIGN.md` instead of literal text glyphs when they serve purely as icons, but the visible labels beside/below them must remain verbatim.

---

# 6. Status Entitlement

## Section heading

- `STATUS ENTITLEMENT`
- `Fitur dan hak aksesmu`
- `Semua fitur tetap terlihat; status ditentukan plan, level, dan backend.`

This screen intentionally keeps unavailable features visible.

Frontend-first implementation must preserve the entitlement distinction without building Backend authorization yet.

---

# 7. Entitlement feature matrix — Row 1

## Perjalanan Level

- `道`
- `Perjalanan Level`
- `AKTIF`
- `Pilih N1–N5 dan simpan progress tiap level.`

Figma destination:

- `392:785` — Level Journey

## Chapter & Materi

- `章`
- `Chapter & Materi`
- `CHAPTER 1`
- `Chapter 1 tersedia pada setiap level.`

Figma destination:

- `392:1005` — Chapter Journey

## Latihan Harian

- `練`
- `Latihan Harian`
- `TERBATAS`
- `Latihan pilihan tersedia dalam akses terbatas.`

Figma destination:

- `392:3311` — Latihan Harian — Terbatas

---

# 8. Entitlement feature matrix — Row 2

## Try Out & Ulasan

- `試`
- `Try Out & Ulasan`
- `TERKUNCI`
- `Simulasi penuh dan review terbuka setelah akses berbayar aktif melalui WhatsApp Admin.`

Figma destination:

- `753:2182` — locked Try Out state

The exact locked-state/modal copy belongs to Layer F and must not be invented here.

## Community

- `人`
- `Community`
- `READ ONLY`
- `Percakapan dapat dibaca tanpa membuat post.`

Figma destination:

- `392:4143` — Community — Read Only

## Sertifikat

- `証`
- `Sertifikat`
- `TERKUNCI`
- `Terbit setelah syarat program berbayar terpenuhi.`

No explicit prototype destination is defined on this card in the current frame.

Locked behavior must follow the shared entitlement UX rule; exact popup copy must come from the verified Layer F contract.

---

# 9. Entitlement feature matrix — Row 3

## Jadwal Kelas

- `予`
- `Jadwal Kelas`
- `TERKUNCI`
- `Jadwal kelas terbuka pada Belajar dengan Sensei setelah akses berbayar aktif.`

No explicit prototype destination is defined on this card in this frame.

## Replay Kelas

- `再`
- `Replay Kelas`
- `TERKUNCI`
- `Replay tersedia pada Belajar dengan Sensei setelah akses berbayar aktif.`

No explicit prototype destination is defined on this card in this frame.

## Tanya Sensei

- `先`
- `Tanya Sensei`
- `TERKUNCI`
- `Tanya Sensei tersedia setelah akses Belajar dengan Sensei aktif.`

No explicit prototype destination is defined on this card in this frame.

## Locked behavior

These are Sensei-only capabilities presented as locked previews for Free.

Do not create real Sensei functionality while implementing the Free dashboard.

Exact locked-state message/action must be sourced from the relevant verified state contract in Layer F.

---

# 10. Progres section

## Exact visible copy

- `PROGRES`
- `Aktivitas dan motivasi`
- `Nilai aktual mengikuti aktivitas yang tersimpan di backend.`

Frontend-first implementation may use deterministic mock values.

Do not add Backend progress persistence during this screen task.

---

# 11. Additional entitlement row — Revisi 05 Agustus

The active Figma frame contains an additional entitlement row named:

`Baris Fitur 4 / Revisi 05 Agustus`

## Achievement

- `★`
- `Achievement`
- `TERKUNCI`
- `Achievement penuh terbuka setelah akses berbayar aktif.`

Figma destination:

- `819:6443` — Free premium locked state

## Mini Checkpoint Kelas

- `✓`
- `Mini Checkpoint Kelas`
- `TERKUNCI`
- `Khusus member belajar bersama Sensei.`

Figma destination:

- `819:6443` — Free premium locked state

## Membership & Payment

- `WA`
- `Membership & Payment`
- `WA`
- `Pilih paket dan lanjutkan pembayaran melalui WhatsApp Admin.`

Figma destination:

- `392:5093` — Renewal & Upgrade

## Implementation note

`WA`, `★`, and `✓` are icon/status glyphs in this design. They may use the approved `DESIGN.md` icon treatment when used as visual icons.

---

# 12. Progress summary

## Exact visible copy

### XP

- `XP Mingguan`
- `— XP`
- `★`

### Streak

- `Streak Belajar`
- `— hari`
- `♨`

### Free level access

- `Level Gratis`
- `5 level`
- `⌕`

## Data classification

`— XP` and `— hari` represent unresolved/runtime activity values in the design.

`5 level` corresponds to the visible Free access presentation across N1–N5 on this screen.

Do not fabricate XP or streak values merely to make the UI appear complete.

---

# 13. Dashboard announcement

## Exact visible copy

- `!`
- `Pengumuman`
- `Chapter lanjutan, Try Out, sertifikat, jadwal, replay, Tanya Sensei, Achievement, dan Mini Checkpoint tetap terlihat sebagai preview akses berbayar melalui WhatsApp Admin.`

This announcement is part of the Free dashboard and must not be paraphrased.

---

# 14. Entitlement summary for this screen

The visible Free dashboard communicates the following frontend states:

| Feature | Visible state |
|---|---|
| Perjalanan Level | `AKTIF` |
| Chapter & Materi | `CHAPTER 1` |
| Latihan Harian | `TERBATAS` |
| Try Out & Ulasan | `TERKUNCI` |
| Community | `READ ONLY` |
| Sertifikat | `TERKUNCI` |
| Jadwal Kelas | `TERKUNCI` |
| Replay Kelas | `TERKUNCI` |
| Tanya Sensei | `TERKUNCI` |
| Achievement | `TERKUNCI` |
| Mini Checkpoint Kelas | `TERKUNCI` |
| Membership & Payment | `WA` |

Do not hide locked premium features from the Free dashboard.

---

# 15. Frontend-first implementation rules

When this screen is implemented or revised:

1. Exact copy and content hierarchy come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse existing `StudentNavigation` / shared dashboard components where they can express this contract.
4. Do not rebuild the student shell only to match this one role.
5. Do not invent copy.
6. Do not invent XP, streak, prices, invoice data, or Backend progress values.
7. Do not build Laravel/API/payment/auth integration during this screen task.
8. Use deterministic frontend mock data for runtime values when needed.
9. Keep all premium features visible in their required locked/read-only/limited state.
10. Locked cards must not grant access to protected features.
11. Exact locked modal/state wording must come from the verified Layer F contract.
12. Do not modify unrelated screens while fixing this dashboard.
