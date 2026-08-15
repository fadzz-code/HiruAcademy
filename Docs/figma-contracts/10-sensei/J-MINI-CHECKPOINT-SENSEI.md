# J-MINI-CHECKPOINT — Page 10 / Belajar dengan Sensei

> Figma source: **Page 10 — E2E / Belajar dengan Sensei** (`388:16`)  
> Layer: **J — Mini Checkpoint Kelas** (`975:3907`)  
> Screens: **SENSEI / 53–57**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- Product scope: **VERIFIED — Belajar dengan Sensei only, N5–N2**
- Runtime/session/score/timer/attempt data: **DYNAMIC / FIXTURE**
- Prototype inconsistencies: **OPEN** where explicitly noted
- Do not paraphrase VERIFIED copy.
- Do not implement backend timer, autosave, scoring, attempt persistence, publish rules, or cohort authority during this frontend-first contract phase.

---

# Layer J frame inventory

| Screen | Figma frame |
|---|---|
| SENSEI / 53 — Mini Checkpoint Kelas | `975:3908` |
| SENSEI / 54 — Informasi Mini Checkpoint | `975:4040` |
| SENSEI / 55 — Pengerjaan Mini Checkpoint | `975:4148` |
| SENSEI / 56 — Hasil Mini Checkpoint | `975:4297` |
| SENSEI / 57 — Ulasan Mini Checkpoint | `975:4398` |

---

# Product scope verified by Figma

Mini Checkpoint is:

- exclusive to **Belajar dengan Sensei**;
- available for **N5, N4, N3, dan N2**;
- organized by **level → sesi → part**;
- cohort/progress driven;
- shorter than Try Out;
- still uses timer;
- supports passing score;
- supports review;
- supports optional question images from Admin;
- stores results/history;
- configured and published by Admin.

Do **not** add N1 unless a newer explicit client revision changes this.

Do not treat Mini Checkpoint as:

- ordinary Chapter Checkpoint;
- Latihan Harian;
- Try Out;
- a separate LMS/Mandiri entitlement.

---

# Shared Sensei shell

All screens reuse the same Sensei student navigation.

## Exact visible sidebar copy

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
- `Mulai Belajar` / `Aksi Utama` → `418:566`

Reuse the existing shared Sensei/student navigation. Do not create a Mini-Checkpoint-specific sidebar implementation.

---

# SENSEI / 53 — Mini Checkpoint Kelas

**Figma frame:** `975:3908`

## Exact visible copy

### Header

- `MINI CHECKPOINT • KELAS SENSEI`
- `Mini Checkpoint per level, sesi, dan part`
- `Khusus member Belajar dengan Sensei. Mini Checkpoint tersedia untuk N5, N4, N3, dan N2.`
- `COHORT DRIVEN`

### Progress/filter

- `PROGRES KELAS`
- `SEMUA COHORT`
- `N4`
- `TERSEDIA`
- `SELESAI`
- `REVIEW AKTIF`

### Section

- `DAFTAR MINI CHECKPOINT`
- `Pilih level dan Mini Checkpoint`
- `Struktur mengikuti sesi dan part. Setiap Mini Checkpoint memakai timer, skor, passing score, dan riwayat hasil.`

### N5

- `N5`
- `AKTIF SESUAI AKSES`
- `N5 sesi 1 part 1`
- `N5 sesi 1 part 2`
- `N5 sesi 2 part 1`
- `N5 sesi 2 part 2`
- `N5 sesi 3 part 1`
- `N5 sesi 3 part 2`

Card destination → `975:4040`

### N4

- `N4`
- `TERSEDIA`
- `N4 sesi 1 part 1`
- `N4 sesi 1 part 2`
- `N4 sesi 2 part 1`
- `N4 sesi 2 part 2`
- `N4 sesi 3 part 1`
- `N4 sesi 3 part 2`

Card destination → `975:4040`

### N3

- `N3`
- `AKTIF SESUAI AKSES`
- `N3 sesi 1 part 1`
- `N3 sesi 1 part 2`
- `N3 sesi 2 part 1`
- `N3 sesi 2 part 2`
- `N3 sesi 3 part 1`
- `N3 sesi 3 part 2`
- `N3 sesi 4 part 1`
- `N3 sesi 4 part 2`

Card destination → `975:4040`

### N2

- `N2`
- `AKTIF SESUAI AKSES`
- `N2 sesi 1 part 1`
- `N2 sesi 1 part 2`
- `N2 sesi 2 part 1`
- `N2 sesi 2 part 2`
- `N2 sesi 3 part 1`
- `N2 sesi 3 part 2`
- `N2 sesi 4 part 1`
- `N2 sesi 4 part 2`

Card destination → `975:4040`

### Footer rule

- `Mini Checkpoint berbeda dari Try Out: soal lebih sedikit, tetapi tetap memakai timer. Passing score, review, media gambar, dan status publish diatur Admin.`

## Important interpretation

The session/part lists shown in Figma are example configuration.

Do not convert:

- N5 = exactly 3 sessions,
- N4 = exactly 3 sessions,
- N3 = exactly 4 sessions,
- N2 = exactly 4 sessions,
- exactly 2 parts/session

into universal product constants.

Admin configuration remains authoritative.

---

# SENSEI / 54 — Informasi Mini Checkpoint

**Figma frame:** `975:4040`

## Exact visible copy

### Header

- `MINI CHECKPOINT • N4 SESI 2 PART 1`
- `N4 sesi 2 part 1 siap dikerjakan`
- `Timer dimulai saat Mini Checkpoint dimulai.`
- `TERSEDIA`

### Main information

- `MINI CHECKPOINT KELAS`
- `Soal singkat • timer aktif • passing score dari Admin`
- `Jawaban tersimpan otomatis. Saat timer habis, sistem melakukan auto-submit dan menghitung skor.`

### Actions

- `Mulai Mini Checkpoint`
- `Kembali ke Daftar`

Verified destinations:

- `Mulai Mini Checkpoint` → `975:4148`
- `Kembali ke Daftar` → `975:3908`

### Rules

- `ATURAN SESI`
- `Yang perlu diperhatikan`
- `Aturan akses mengikuti cohort, progres pertemuan, dan konfigurasi Mini Checkpoint di Admin.`

#### Access

- `鍵`
- `Akses`
- `AKTIF`
- `Belajar dengan Sensei • Cohort aktif`
- `Plan, cohort, dan progres pertemuan diverifikasi backend`

#### Timer

- `時`
- `Timer`
- `AKTIF`
- `Durasi mengikuti konfigurasi Admin`
- `Dapat dikerjakan kapan saja sampai diselesaikan`

#### Frequency

- `再`
- `Frekuensi`
- `AKTIF`
- `Maksimal sekitar 2× per bulan sesuai jadwal cohort`
- `Khusus N5, N4, N3, dan N2 • sesi & part`

#### Review

- `答`
- `Ulasan Jawaban`
- `AKTIF`
- `Skor dan status lulus/tidak lulus tampil setelah submit`
- `Review dan media gambar mengikuti konfigurasi Mini Checkpoint`

### Consent / session behavior

- `Dengan memulai, pengguna menyetujui autosave, pencatatan hasil, dan aturan akses berdasarkan progres pertemuan.`
- `Koneksi terputus tidak menghapus jawaban yang tersimpan. Timer tetap mengikuti backend sampai submit atau waktu habis.`

## Important frequency interpretation

The active Figma says:

`Maksimal sekitar 2× per bulan sesuai jadwal cohort`

Treat this as client-visible current contract copy, but **not as a hardcoded scheduler formula**.

Actual availability still depends on Admin/cohort configuration.

---

# SENSEI / 55 — Pengerjaan Mini Checkpoint

**Figma frame:** `975:4148`

## Exact visible copy

### Header

- `MINI CHECKPOINT 02 • KELAS SENSEI`
- `Soal 4 dari 10`
- `Jawaban tersimpan otomatis. Timer dikendalikan backend.`
- `TIMER AKTIF`

### Session stats

- `4 / 10`
- `Soal dijawab`
- `1 soal`
- `Ditandai`
- `Aktif`
- `Autosave`

### Question

- `BAGIAN BUNPOU • SOAL 4`
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
- `4 dijawab • 1 ditandai`
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

### Final actions

- `Akhiri & Kirim`
- `Kembali ke Daftar`

### Autosave notice

- `Jawaban terakhir tersimpan • 23:29 WIB`
- `Saat timer mencapai 00:00, sistem mengirim jawaban otomatis dan menghitung skor.`

## VERIFIED prototype destinations

Current Figma prototype:

- `Akhiri & Kirim` → `418:4235`
- `Kembali ke Daftar` → `418:3518`

## OPEN PROTOTYPE DESTINATION CONFLICT

These destinations belong to the **regular Try Out flow**:

- `418:4235` = Sensei Try Out result
- `418:3518` = Sensei Try Out list

This conflicts with the Layer J Mini Checkpoint flow, which has dedicated frames:

- Mini Checkpoint result → `975:4297`
- Mini Checkpoint list → `975:3908`

Do **not** copy the wrong Try Out destinations into implementation merely because they are wired in the current prototype.

Recommended implementation intent, pending final Figma correction:

```text
Akhiri & Kirim → SENSEI / 56 (`975:4297`)
Kembali ke Daftar → SENSEI / 53 (`975:3908`)
```

Status: **OPEN PROTOTYPE WIRING CONFLICT**

## Fixture rule

Do not hardcode:

- 10 questions,
- question 4,
- 4/10 answered,
- 1 marked,
- `23:29 WIB`,
- question content,
- answers.

These are sample runtime values.

---

# SENSEI / 56 — Hasil Mini Checkpoint

**Figma frame:** `975:4297`

## Exact visible copy

### Header

- `MINI CHECKPOINT • N4 SESI 2 PART 1 • HASIL`
- `Hasil Mini Checkpoint berhasil diproses`
- `Skor, status kelulusan, review, dan rekomendasi berasal dari jawaban yang tersimpan.`
- `SELESAI`

### Score

- `SKOR AKHIR`
- `8 / 10`
- `LULUS • Passing score mengikuti Admin • Durasi tersimpan`
- `Ulasan Jawaban`
- `Kembali ke Daftar`
- `LULUS`

Verified destinations:

- `Ulasan Jawaban` → `975:4398`
- `Kembali ke Daftar` → `975:3908`

### Breakdown

- `RINGKASAN NILAI`
- `Performa per bagian`
- `Lulus jika skor ≥ passing score Admin. Tidak lulus jika skor < passing score Admin.`

Values:

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

Card destination → `418:3231`

### Needs improvement

- `補`
- `Perlu Diperkuat`
- `REKOMENDASI`
- `Dokkai dan pola kalimat masih di bawah target.`
- `Direkomendasikan Reading Drill`

Card destination → `418:2839`

### Class progress / review

- `PROGRES KELAS & REVIEW`
- `N4 sesi 2 part 1 • Ulasan jawaban aktif • Hasil tersimpan permanen`
- `Admin mengatur timer, passing score, jumlah soal, media gambar, review, dan publikasi Mini Checkpoint.`

## Passing rule

Do not hardcode a numeric passing score.

The verified relationship is:

```text
score >= Admin passing score → LULUS
score < Admin passing score → TIDAK LULUS
```

The numeric threshold remains Admin/backend configuration.

## Fixture rule

The following are sample values:

- N4 / sesi 2 / part 1,
- 8/10,
- all percentage breakdowns,
- recommendation content.

---

# SENSEI / 57 — Ulasan Mini Checkpoint

**Figma frame:** `975:4398`

## Exact visible copy

### Header

- `MINI CHECKPOINT • N4 SESI 2 PART 1 • ULASAN`
- `Tinjau jawaban dan pembahasan`
- `Review tersedia sesuai konfigurasi Mini Checkpoint. Soal dapat memuat gambar dari Admin.`
- `REVIEW AKTIF`

### Filters

- `FILTER JAWABAN`
- `SEMUA 10`
- `SALAH 2`
- `BENAR 8`
- `DITANDAI 1`
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

### Selected answer

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

### Actions

- `Kembali ke Hasil`
- `Latihan Rekomendasi`

Verified destinations:

- `Kembali ke Hasil` → `975:4297`
- `Latihan Rekomendasi` → `418:3231`

### Review rule

- `Ulasan hanya tampil jika review diaktifkan Admin. Media gambar pada soal ikut ditampilkan bila tersedia.`
- `Jika dinonaktifkan, tombol Ulasan Jawaban diarahkan ke state “Ulasan Tidak Tersedia”.`

## Review-unavailable behavior

The active Figma states the intended disabled-review behavior in copy but does not provide a dedicated Mini-Checkpoint-specific Layer J frame for it.

Reuse the existing assessment review-unavailable state pattern rather than inventing a new page, while preserving Mini Checkpoint context.

---

# Verified intended Layer J flow

```text
SENSEI / 53 — Mini Checkpoint Kelas
        ↓ choose level / sesi / part
SENSEI / 54 — Informasi Mini Checkpoint
        ↓ Mulai Mini Checkpoint
SENSEI / 55 — Pengerjaan
        ↓ submit / timeout
SENSEI / 56 — Hasil
        ├─ Ulasan Jawaban
        │      ↓
        │  SENSEI / 57 — Ulasan
        │      ↓
        │  kembali ke Hasil
        │
        ├─ Kembali ke Daftar
        │      ↓
        │  SENSEI / 53
        │
        ├─ Strength → Latihan Harian
        └─ Recommendation → Reading Drill
```

### Important prototype correction

Current Screen 55 prototype mistakenly points submit/back into regular Try Out.

Implementation should not reproduce that cross-flow mistake.

---

# Distinction from other assessment families

## Mini Checkpoint vs Chapter Checkpoint

Chapter Checkpoint:

- belongs to normal Chapter learning sequence;
- gates Chapter progression where configured.

Mini Checkpoint:

- belongs to Sensei/cohort learning;
- organized by session and part;
- tied to class progress.

## Mini Checkpoint vs Try Out

Try Out:

- larger simulation assessment;
- separate list/info/runner/result/review family;
- assessment-specific access/attempt configuration.

Mini Checkpoint:

- fewer questions;
- cohort/session/part based;
- Sensei-only;
- remains independently configured.

## Mini Checkpoint vs Latihan Harian

Latihan Harian:

- short daily practice/recommendation;
- not a formal cohort Mini Checkpoint.

Do not collapse all three into a single product concept even if the frontend reuses one configurable assessment runner.

---

# Admin contract alignment

Page 11 Admin already verifies that Mini Checkpoint Builder supports:

- `N5–N2`;
- level;
- sesi;
- part;
- timer;
- passing score;
- question configuration;
- optional images;
- review;
- publish;
- assessment history.

Layer J student behavior must stay compatible with that Admin contract.

---

# Dynamic / fixture values that must remain replaceable

Do not hardcode as universal rules:

- N4 as selected/current level;
- sesi 2 / part 1;
- exact session counts per level;
- exactly 2 parts per session;
- exactly 10 questions;
- `8 / 10`;
- attempt count;
- `23:29 WIB`;
- percentage breakdowns;
- exact question/answer text;
- current recommendations;
- timer duration;
- passing-score number;
- exact publication schedule.

Backend/Admin/cohort configuration remains the later source of truth.

---

# Layer J frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse the existing Sensei/student shell.
4. Reuse the existing configurable assessment runner where compatible; do not fork a second large assessment engine only for Mini Checkpoint.
5. Keep Mini Checkpoint as a distinct assessment type/configuration.
6. Restrict product scope to Belajar dengan Sensei.
7. Restrict supported levels to N5–N2 unless client authority changes.
8. Model level → sesi → part as configurable data.
9. Keep cohort/progress access distinct from general membership entitlement.
10. Timer starts when Mini Checkpoint starts.
11. Preserve autosave/auto-submit UX visually, but do not claim real backend persistence before integration.
12. Passing score is Admin-configured.
13. Review availability is Admin-configured.
14. Optional question images are Admin-configured.
15. Do not hardcode question count or attempt/frequency values globally.
16. Do not reproduce the current Screen 55 wrong Try Out prototype destinations.
17. Do not create separate pages for review-unavailable if a shared assessment state can represent it.
18. Do not build Laravel/Sanctum, server timer, autosave persistence, assessment scoring authority, attempt enforcement, cohort progress authority, image storage, or publication backend during this contract phase.
19. Preserve exact OPEN prototype conflict notes until the Figma wiring is corrected.
