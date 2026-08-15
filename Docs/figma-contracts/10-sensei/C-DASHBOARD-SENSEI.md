# C-DASHBOARD — SENSEI / 17 — Dasbor Belajar dengan Sensei

> Figma source: **Page 10 — E2E / Belajar dengan Sensei** (`388:16`)  
> Layer: **C — Dashboard**  
> Screen: **SENSEI / 17 — Dasbor Belajar dengan Sensei**  
> Figma frame: `419:2690`  
> Frame size: `1280 × 1582`  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Sidebar labels: **VERIFIED**
- Explicit Figma prototype destinations: **VERIFIED**
- Runtime/user/progress/cohort values: **FIXTURE / MOCK where noted**
- Do not paraphrase VERIFIED copy.
- Do not introduce Backend/API work while implementing this frontend-first screen.

---

# 1. Screen structure

The dashboard is one shared student-dashboard family configured for the highest student tier.

High-level content order:

1. Student sidebar
2. Membership/cohort header
3. Lanjutkan Belajar
4. Aksi Cepat
5. Status Entitlement
6. Standard LMS feature matrix
7. Sensei-specific feature matrix
8. Progres
9. Achievement / Mini Checkpoint / Membership & Payment
10. Progress summary
11. Dashboard announcement

Do not build a second dashboard architecture only for Sensei if the shared `StudentDashboard` can represent this contract through configuration.

---

# 2. Sidebar

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

## Verified sidebar destinations

- `Kelas Saya` → `418:566`
- `Kumpulan Flashcard` → `418:1823`
- `Latihan Harian` → `418:3231`
- `Try Out` → `418:3518`
- `Perpustakaan` → `418:4664`
- `Jadwal` → `419:2913`
- `Replay` → `419:3437`
- `Tanya Sensei` → `425:3524`
- `Komunitas` → `425:3073`
- `Progres` → `418:4930`
- `Sertifikat` → `418:6119`
- `Notifikasi` → `418:6814`
- `Profil` → `418:7128`

The Figma frame does not expose explicit prototype destinations for:

- `Dashboard` because this is the active screen
- `Mulai Belajar`
- `Pengaturan`
- `Keluar`

Do not invent final destinations from this screen alone.

---

# 3. Membership / cohort header

## Exact visible copy

- `BELAJAR DENGAN SENSEI • 2 LEVEL & COHORT AKTIF`
- `Selamat datang, Hilmi`
- `Lanjutkan belajar, periksa jadwal, atau buka replay kelas.`
- `Belajar dengan Sensei`

## Fixture classification

The following are sample/runtime values in this Figma:

- `Hilmi`
- `2 LEVEL & COHORT AKTIF`

Do not encode them as permanent product rules.

---

# 4. Lanjutkan Belajar

## Exact visible copy

- `LANJUTKAN BELAJAR`
- `Chapter 4 — JLPT N4`
- `Progress terakhir, jadwal, dan replay mengikuti level serta cohort aktif.`
- `Lanjutkan Belajar`
- `Lihat Jadwal`
- `▰`
- `56% selesai`

## Verified interactions

- main card action → `418:566` — Perjalanan Level
- `Lanjutkan Belajar` → `418:997` — Ringkasan Chapter
- `Lihat Jadwal` → `419:2913` — Jadwal Zoom

## Fixture classification

These values are sample/runtime:

- `Chapter 4 — JLPT N4`
- `56% selesai`

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

- `418:997`

## Jadwal Kelas

- `予`
- `Jadwal Kelas`
- `Sesi berikutnya`

Destination:

- `419:2913`

## Masuk Kelas

- `入`
- `Masuk Kelas`
- `Detail kelas`

Destination:

- `419:3197` — Detail Kelas

## Replay

- `再`
- `Replay`
- `Kelas tersimpan`

Destination:

- `419:3437`

## Tanya Sensei

- `先`
- `Tanya Sensei`
- `Kirim pertanyaan`

Destination:

- `425:3524`

## Mini Checkpoint

- `✓`
- `Mini Checkpoint`
- `N4 sesi 2 part 1`

Destination:

- `975:3908` — Mini Checkpoint Kelas

## Icon/glyph rule

`▶`, `予`, `入`, `再`, `先`, and `✓` are icon/glyph content in the Figma.

Pure icon treatment may follow `DESIGN.md`, but labels must remain verbatim.

## Fixture classification

`N4 sesi 2 part 1` is sample current-cohort state, not a permanent Mini Checkpoint rule.

---

# 6. Status Entitlement

## Exact visible copy

- `STATUS ENTITLEMENT`
- `Fitur dan hak aksesmu`
- `Semua fitur tetap terlihat; status ditentukan plan, level, dan backend.`

Sensei is the highest student tier in the current product model.

Features owned by Sensei must not incorrectly display an Upgrade prompt.

---

# 7. Standard LMS feature matrix

## Perjalanan Level

- `道`
- `Perjalanan Level`
- `AKTIF`
- `Kelola N4 dan N3 beserta cohort aktif.`

Destination:

- `418:566`

## Chapter & Materi

- `章`
- `Chapter & Materi`
- `AKTIF`
- `Seluruh Chapter terbuka pada level aktif.`

Destination:

- `418:786` — Perjalanan Chapter

## Latihan Harian

- `練`
- `Latihan Harian`
- `AKTIF`
- `Latihan harian tersedia pada setiap level aktif.`

Destination:

- `418:3231`

## Try Out & Ulasan

- `試`
- `Try Out & Ulasan`
- `AKTIF`
- `Try Out dan ulasan jawaban tersedia.`

Destination:

- `418:3518`

## Community

- `人`
- `Community`
- `AKTIF`
- `Buat postingan dan diskusi bersama cohort.`

Destination:

- `425:3073`

## Sertifikat

- `証`
- `Sertifikat`
- `AKTIF`
- `Sertifikat tersedia setelah syarat terpenuhi.`

Destination:

- `418:6119`

---

# 8. Sensei-specific feature matrix

## Jadwal Kelas

- `予`
- `Jadwal Kelas`
- `AKTIF`
- `Jadwal mengikuti cohort dan konfigurasi Admin.`

Destination:

- `419:2913`

## Replay Kelas

- `再`
- `Replay Kelas`
- `AKTIF`
- `Buka kembali sesi yang telah dipublikasikan.`

Destination:

- `419:3437`

## Tanya Sensei

- `先`
- `Tanya Sensei`
- `AKTIF`
- `Kirim pertanyaan terkait materi kepada Sensei.`

Destination:

- `425:3524`

## Entitlement rule

For Belajar dengan Sensei:

- Jadwal Kelas → available
- Replay Kelas → available
- Tanya Sensei → available
- Mini Checkpoint Kelas → available

Do not reuse the LMS locked-state behavior for these features.

---

# 9. Progres section

## Exact visible copy

- `PROGRES`
- `Aktivitas dan motivasi`
- `Nilai aktual mengikuti aktivitas yang tersimpan di backend.`

Frontend-first implementation may use deterministic fixtures.

Do not build progress persistence during this screen task.

---

# 10. Additional entitlement row

## Achievement

- `★`
- `Achievement`
- `AKTIF`
- `Achievement, streak, dan milestone tersedia sesuai progres belajar.`

Destination:

- `418:4930`

## Mini Checkpoint Kelas

- `✓`
- `Mini Checkpoint Kelas`
- `AKTIF`
- `Dibuka sesuai level, sesi, dan part. Timer dimulai saat Mini Checkpoint dimulai.`

Destination:

- `975:3908`

## Membership & Payment

- `WA`
- `Membership & Payment`
- `WA`
- `Renewal atau perubahan akses dilanjutkan melalui WhatsApp Admin.`

Destination:

- `418:7313`

## Mini Checkpoint rule

This dashboard verifies that Mini Checkpoint belongs to the Sensei tier.

Current product structure remains:

- N5–N2
- level → sesi → part

However, exact available levels/sessions/parts and timer rules must follow their own verified Mini Checkpoint contracts rather than being inferred from this dashboard fixture.

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

### Cohort sessions

- `⌕`
- `Sesi Cohort`
- `— sesi`

## Runtime rule

Do not invent XP, streak, or cohort-session counts merely to fill the UI.

Use deterministic placeholder/mock values until real data exists.

---

# 12. Dashboard announcement

## Exact visible copy

- `!`
- `Pengumuman`
- `Journey, latihan, Try Out, community, sertifikat, jadwal, replay, dan Tanya Sensei aktif sesuai level serta cohort.`

This is client-visible copy and must not be paraphrased.

---

# 13. Entitlement summary

| Feature | Visible state |
|---|---|
| Perjalanan Level | `AKTIF` |
| Chapter & Materi | `AKTIF` |
| Latihan Harian | `AKTIF` |
| Try Out & Ulasan | `AKTIF` |
| Community | `AKTIF` |
| Sertifikat | `AKTIF` |
| Jadwal Kelas | `AKTIF` |
| Replay Kelas | `AKTIF` |
| Tanya Sensei | `AKTIF` |
| Achievement | `AKTIF` |
| Mini Checkpoint Kelas | `AKTIF` |
| Membership & Payment | `WA` |

Core distinction from LMS:

**Sensei owns the Sensei-specific features. They are not premium previews to be unlocked again.**

---

# 14. Verified dashboard destinations

```text
Dashboard Sensei
├─ Kelas Saya → 418:566
├─ Kumpulan Flashcard → 418:1823
├─ Latihan Harian → 418:3231
├─ Try Out → 418:3518
├─ Perpustakaan → 418:4664
├─ Jadwal → 419:2913
├─ Replay → 419:3437
├─ Tanya Sensei → 425:3524
├─ Komunitas → 425:3073
├─ Progres → 418:4930
├─ Sertifikat → 418:6119
├─ Notifikasi → 418:6814
├─ Profil → 418:7128
├─ Chapter → 418:997
├─ Detail Kelas → 419:3197
├─ Mini Checkpoint → 975:3908
└─ Membership / Renewal → 418:7313
```

---

# 15. Differences from Page 09 / Belajar Mandiri

Do not simply clone the LMS dashboard contract.

Important differences verified in Figma:

- header says `BELAJAR DENGAN SENSEI • 2 LEVEL & COHORT AKTIF`;
- sidebar adds `Jadwal`, `Replay`, and `Tanya Sensei`;
- quick actions include Jadwal, Masuk Kelas, Replay, Tanya Sensei, and Mini Checkpoint;
- Jadwal Kelas is `AKTIF`;
- Replay Kelas is `AKTIF`;
- Tanya Sensei is `AKTIF`;
- Mini Checkpoint Kelas is `AKTIF`;
- Community description references discussion with cohort;
- progress summary contains `Sesi Cohort`;
- announcement explicitly includes jadwal, replay, and Tanya Sensei.

---

# 16. Frontend-first implementation rules

When this dashboard is implemented or revised:

1. Exact visible copy and content hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse existing shared `StudentNavigation` and `StudentDashboard`.
4. Do not create a parallel Sensei-only student shell if configuration can express this screen.
5. All normal LMS features remain available.
6. Jadwal, Replay, Tanya Sensei, and Mini Checkpoint are available Sensei entitlements.
7. Do not show Upgrade prompts for features already owned by Sensei.
8. Cohort-specific content may use deterministic frontend fixture data.
9. User name, levels, Chapter, progress, cohort count, and Mini Checkpoint current part remain replaceable fixture data.
10. Do not build real cohort scheduling, Zoom integration, replay storage/media, Ask Sensei persistence, Mini Checkpoint server timer/scoring, payment, or Backend APIs during this frontend-first screen task.
11. Do not invent copy for later Sensei screens before their contracts are extracted.
12. Do not modify unrelated screens while fixing this dashboard.
