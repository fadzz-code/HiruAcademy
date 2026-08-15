# C-USERS-TRANSACTIONS — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **C — Pengguna & Transaksi** (`388:26`)  
> Screens: **ADMIN / 13–17** + referral operational states located inside Layer C  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- PII, totals, prices, invoices, membership status, reward values, dates, and eligibility: **DYNAMIC / FIXTURE**
- Security-sensitive actions: **BACKEND / PERMISSION AUTHORITY LATER**
- Do not paraphrase VERIFIED copy.
- Do not expose real personal data in frontend fixtures.
- Do not implement payment verification, entitlement authority, certificate issuance, referral accounting, or audit persistence during this contract-extraction phase.

---

# Layer C frame inventory

| Screen | Figma frame |
|---|---|
| ADMIN / 13 — User Management | `432:845` |
| ADMIN / 14 — Access Settings | `432:982` |
| ADMIN / 15 — Pengelolaan Invoice | `432:1192` |
| ADMIN / 16 — Pengelolaan Referral & Diskon | `432:1309` |
| ADMIN / 17 — Certificate Management | `432:1478` |
| ADMIN / ALUR R6-01 — Aturan Referral Tersimpan | `788:2647` |
| ADMIN / ALUR R6-02 — Reward Diaktifkan | `788:2659` |
| ADMIN / ALUR R6-03 — Konfirmasi Batalkan Reward | `788:2683` |
| ADMIN / ALUR R6-04 — Reward Dibatalkan | `788:2671` |
| ADMIN / ALUR R6-05 — Ekspor Referral Diproses | `790:2631` |

---

# Shared Admin Console shell

Reuse the same Admin Console navigation from Layer B.

## Exact visible navigation copy

- `Hiru Academy`
- `ADMIN CONSOLE`
- `Dashboard`
- `Program`
- `Content Builder`
- `Placement & Hasil`
- `Pengguna & Akses`
- `Transaksi`
- `Konten & Komunikasi`
- `Sensei & Cohort`
- `Analitik`
- `Pengaturan`
- `Keluar Admin`

## Common verified destinations

- Dashboard → `431:152`
- Program → `431:218`
- Content Builder → `431:406`
- Placement & Hasil → `431:1116`
- Pengguna & Akses → `432:845`
- Transaksi → `432:1192`
- Konten & Komunikasi → `432:1609`
- Sensei & Cohort → `432:2770`
- Analitik → `432:2934`
- Pengaturan → `432:3681`

Do not create duplicated Admin shells per module.

---

# ADMIN / 13 — User Management

**Figma frame:** `432:845`

## Exact visible copy

### Header

- `ADMIN • USERS & ENTITLEMENT`
- `User Management`
- `Kelola akun, membership, entitlement, progres, referral source, dan status akses.`
- `Tambah Pengguna`
- `Dashboard`

Destinations:

- `Tambah Pengguna` → `816:2658`
- `Dashboard` → `431:152`

### Summary metrics

- `Total pengguna`
- `Dinamis`
- `Data real-time dari backend.`

- `Membership aktif`
- `Dinamis`
- `Berdasarkan entitlement aktif.`

- `Pending verification`
- `Dinamis`
- `Menunggu invoice atau review.`

- `Expired access`
- `Dinamis`
- `Dapat diarahkan ke renewal.`

### Search / filters

- `⌕`
- `Cari nama, email, WhatsApp, atau referral`
- `Semua`
- `Free Member`
- `Belajar Mandiri`
- `Belajar dengan Sensei`
- `Pending`

The search field prototype routes to:

- `433:2606` — table-empty state

This is a prototype state example, not production search logic.

### User table

Headers:

- `Pengguna`
- `Membership`
- `Status`
- `Sumber`
- `Aksi`

#### Member 1

- `Member •••1`
- `m•••1@example.com`
- `Belajar Mandiri`
- `Entitlement dari backend`
- `Aktif`
- `Referral / Organik`
- `Sumber dinamis`
- `Lihat Detail`

#### Member 2

- `Member •••2`
- `m•••2@example.com`
- `Free Member`
- `Entitlement dari backend`
- `Aktif`
- `Referral / Organik`
- `Sumber dinamis`
- `Lihat Detail`

#### Member 3

- `Member •••3`
- `m•••3@example.com`
- `Belajar dengan Sensei`
- `Entitlement dari backend`
- `Pending`
- `Referral / Organik`
- `Sumber dinamis`
- `Lihat Detail`

#### Member 4

- `Member •••4`
- `m•••4@example.com`
- `Belajar Mandiri`
- `Entitlement dari backend`
- `Expired`
- `Referral / Organik`
- `Sumber dinamis`
- `Lihat Detail`

All visible `Lihat Detail` actions → `433:2555` — Editor Akses Pengguna.

### Selected user detail

- `Member •••1`
- `Data contoh dimasking untuk desain.`
- `Belajar Mandiri`

Information cards:

- `階`
- `Level akses`
- `N4 • dari entitlement`

- `進`
- `Progres`
- `Data journey dari backend`

- `紹`
- `Referral source`
- `Kode / channel dinamis`

- `請`
- `Invoice terakhir`
- `Status transaksi terkait`

### Access action

- `Edit Akses`

Destination:

- `433:2555`

### Audit notice

- `AUDIT NOTE`
- `Perubahan akses perlu alasan dan log administrator.`

## Privacy / authority rule

The active design intentionally masks users and email addresses.

Real User Management later must preserve:

- permission checks,
- PII masking where appropriate,
- reason requirement for access changes,
- admin audit log.

Frontend role switches or local state are not authority.

---

# ADMIN / 14 — Access Settings

**Figma frame:** `432:982`

## Exact visible copy

### Header

- `ADMIN • ACCESS & GOVERNANCE`
- `Access Settings`
- `Kelola role teknis, plan entitlement, permission, feature access, backend authority, dan audit.`
- `Simpan Settings`
- `Dashboard`

Destinations:

- `Simpan Settings` → `657:3074`
- `Dashboard` → `431:152`

### Security announcement

- `×`
- `Pengumuman`
- `Authorization sensitif wajib diperiksa backend. UI hanya mencerminkan entitlement dan permission.`

This is a critical product boundary.

### Summary

- `Technical roles`
- `2`
- `Student dan Admin.`

- `Student plans`
- `3`
- `Free Member, Belajar Mandiri, Belajar dengan Sensei.`

- `Feature rules`
- `Dinamis`
- `Dikelola sebagai policy.`

- `Recent changes`
- `Dinamis`
- `Perubahan yang tercatat.`

### Tabs

- `Role Permissions`
- `Plan Entitlements`
- `Feature Flags`
- `Audit Log`
- `Gamification`

### Role permissions

- `Role permissions`
- `Role teknis berbeda dari plan siswa.`

#### Student

- `学`
- `Student`
- `Mengakses fitur sesuai entitlement plan.`
- `Default`

#### Admin

- `管`
- `Admin`
- `Mengelola konfigurasi dan operasi sensitif.`
- `Restricted`

### Permission matrix

Headers:

- `Permission`
- `Student`
- `Admin`
- `Backend Check`

Rows:

#### View learning content

- `View learning content`
- `✓`
- `✓`
- `Entitlement`

#### Manage content

- `Manage content`
- `—`
- `✓`
- `Permission`

#### Verify invoice

- `Verify invoice`
- `—`
- `✓`
- `Permission + Audit`

#### Change user access

- `Change user access`
- `—`
- `✓`
- `Permission + Reason`

#### View analytics

- `View analytics`
- `Limited`
- `✓`
- `Role + Privacy`

#### Export sensitive data

- `Export sensitive data`
- `—`
- `Restricted`
- `Permission + Audit`

### Plan entitlements

- `Plan entitlements`

#### Free

- `Free Member`
- `●`
- `1 chapter • community read`

#### LMS

- `Belajar Mandiri`
- `●`
- `Full journey • Try Out • write`

#### Sensei

- `Belajar dengan Sensei`
- `●`
- `Belajar dengan Sensei • cohort • Zoom • replay`

### Feature flags

- `Feature flags`

#### Placement

- `配`
- `Placement Test`
- `Public without account; lead required.`
- `On`

#### Certificate

- `証`
- `Digital Certificate`
- `Issued after eligibility.`
- `On`

#### Jepang Pemula

- `初`
- `Jepang Pemula`
- `Not a separate screen.`
- `Editor State`

#### Replay

- `再`
- `Replay`
- `Only after admin publish.`
- `Conditional`

#### Tanya Sensei

- `問`
- `Tanya Sensei`
- `Belajar dengan Sensei entitlement.`
- `Plan gated`

### Audit requirements

- `AUDIT REQUIREMENTS`
- `Catat actor, waktu, perubahan, alasan, target, dan hasil pemeriksaan backend.`

### Gamification policy

- `GAMIFICATION POLICY`
- `XP, streak, leaderboard, dan achievement`
- `Merged`

- `点`
- `XP source`
- `Event belajar tervalidasi backend.`
- `Dynamic`

- `火`
- `Streak policy`
- `Grace period dan reset rule.`
- `Config`

- `位`
- `Leaderboard privacy`
- `Alias, cohort, dan periode.`
- `Masked`

- `章`
- `Achievement rules`
- `Milestone tidak menggantikan certificate.`
- `Config`

## Critical role-model rule

This screen verifies a deliberate distinction:

```text
technical role:
Student | Admin

student plan:
Free Member | Belajar Mandiri | Belajar dengan Sensei
```

Do not model Free/LMS/Sensei as three separate technical security roles unless backend requirements later explicitly change this.

---

# ADMIN / 15 — Pengelolaan Invoice

**Figma frame:** `432:1192`

## Exact visible copy

### Header

- `ADMIN • TRANSACTIONS & ACTIVATION`
- `Invoice Management`
- `Kelola invoice, bukti pembayaran, verifikasi, aktivasi membership, dan audit trail.`
- `Export Data`
- `Dashboard`

Destinations:

- `Export Data` → `649:2779`
- `Dashboard` → `431:152`

### Summary

- `Menunggu verifikasi`
- `Dinamis`
- `Antrean transaksi dari backend.`

- `Terverifikasi`
- `Dinamis`
- `Membership telah diaktifkan.`

- `Ditolak / batal`
- `Dinamis`
- `Memerlukan alasan dan catatan.`

- `Nilai transaksi`
- `Dinamis`
- `Mengikuti data terverifikasi.`

### Search / filters

- `⌕`
- `Cari invoice, pengguna, atau program`
- `Semua`
- `Menunggu`
- `Terverifikasi`
- `Ditolak`
- `Periode`

### Table

Headers:

- `Invoice`
- `Pengguna`
- `Program`
- `Nominal`
- `Status`
- `Aksi`

#### Invoice 1

- `INV•••001`
- `Dibuat sistem`
- `Member •••1`
- `Data dimasking`
- `N4 • Belajar Mandiri`
- `Level dan plan`
- `Dinamis`
- `Dari backend`
- `Menunggu`
- `Lihat Detail`

#### Invoice 2

- `INV•••002`
- `Dibuat sistem`
- `Member •••2`
- `Data dimasking`
- `N4 • Belajar dengan Sensei`
- `Level dan plan`
- `Dinamis`
- `Dari backend`
- `Terverifikasi`
- `Lihat Detail`

#### Invoice 3

- `INV•••003`
- `Dibuat sistem`
- `Member •••3`
- `Data dimasking`
- `N5 • Belajar Mandiri`
- `Level dan plan`
- `Dinamis`
- `Dari backend`
- `Ditolak`
- `Lihat Detail`

#### Invoice 4

- `INV•••004`
- `Dibuat sistem`
- `Member •••4`
- `Data dimasking`
- `Renewal • LMS`
- `Level dan plan`
- `Dinamis`
- `Dari backend`
- `Menunggu`
- `Lihat Detail`

All `Lihat Detail` actions → `433:2568` — Verifikasi Invoice.

### Pagination

- `Pagination dan total data mengikuti backend.`
- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Critical announcement

- `!`
- `Pengumuman`
- `Aktivasi membership hanya dilakukan setelah transaksi diverifikasi.`

## Transaction rule

Frontend must never activate membership merely because:

- proof is uploaded,
- invoice exists,
- local UI state says paid.

Verification is the activation gate.

---

# ADMIN / 16 — Pengelolaan Referral & Diskon

**Figma frame:** `432:1309`

## Exact visible copy

### Header

- `TRANSAKSI • REFERRAL & DISKON`
- `Pengelolaan Referral & Diskon`
- `Kelola kode, diskon pengguna baru, reward pemilik kode, invoice, masa berlaku, dan audit dalam satu alur backend.`
- `Dashboard`
- `Simpan Aturan`

Destinations:

- `Dashboard` → `431:152`
- `Simpan Aturan` → `788:2647`

### Summary

- `Kode aktif`
- `128`
- `Kode yang dapat digunakan`

- `Penggunaan valid`
- `43`
- `Invoice memenuhi aturan`

- `Reward menunggu`
- `12`
- `Menunggu verifikasi invoice`

- `Reward tersedia`
- `18`
- `Dapat dipakai pada transaksi`

These values are fixture/backend-driven.

### Search / filters

- `⌕`
- `Cari kode, pemilik, pengguna, atau invoice`
- `Semua Status`
- `Menunggu`
- `Tersedia`
- `Digunakan`
- `Kedaluwarsa`
- `Dibatalkan`

### Queue

- `Antrean referral`
- `Data pengguna dimasking. Reward baru tersedia setelah invoice terverifikasi.`

#### Referral 1

- `HIRU-RINA`
- `Pemilik •••1`
- `Pengguna •••8`
- `INV •••1024`
- `Menunggu`
- `Reward belum aktif`
- `Diskon & status dari backend`

#### Referral 2

- `HIRU-DIMAS`
- `Pemilik •••2`
- `Pengguna •••9`
- `INV •••1017`
- `Tersedia`
- `Reward dapat digunakan`
- `Diskon & status dari backend`

#### Referral 3

- `HIRU-AYU`
- `Pemilik •••3`
- `Pengguna •••4`
- `INV •••1008`
- `Digunakan`
- `Dipakai pada renewal`
- `Diskon & status dari backend`

#### Referral 4

- `HIRU-HILMI`
- `Pemilik •••4`
- `Pengguna •••7`
- `INV •••0998`
- `Dibatalkan`
- `Invoice dibatalkan`
- `Diskon & status dari backend`

### Export

- `Ekspor Data`

Destination:

- `790:2631`

### Selected referral

- `DETAIL REFERRAL TERPILIH`
- `HIRU-RINA`
- `Pemilik •••1 → Pengguna •••8`
- `INVOICE TERVERIFIKASI`
- `INV •••1024`
- `Membership aktif • Reward tersedia`

- `Diskon pengguna baru`
- `Nilai dinamis`

- `Reward pemilik kode`
- `Nilai dinamis`

- `Berlaku hingga konfigurasi backend`

### Actions

- `Lihat Invoice` → `432:1192`
- `Lihat Pengguna` → `432:845`
- `Aktifkan Reward` → `788:2659`
- `Batalkan Reward` → `788:2683`

### Anti-self-referral

- `Anti self-referral: Aktif`
- `Reward tidak dibuat untuk invoice gagal, refund, atau kode milik sendiri.`

### Program rules

- `Aturan program`
- `Semua nilai berasal dari backend dan perubahan wajib masuk audit log.`

- `Diskon pengguna baru`
- `Dinamis per program`

- `Reward pemilik kode`
- `Dinamis per program`

- `Aktivasi reward`
- `Setelah invoice diverifikasi`

- `Masa berlaku`
- `Dari konfigurasi`

- `Batas penggunaan`
- `Per akun / per kode`

- `Self-referral`
- `Tidak diizinkan`

### Audit statement

- `Audit log menyimpan perubahan aturan, aktivasi reward, penggunaan, pembatalan, dan alasan.`

## Referral rule

Do not invent:

- discount amount,
- reward amount,
- expiration,
- usage limit,
- invoice mapping,
- reward activation before verification.

---

# ADMIN / ALUR R6-01 — Aturan Referral Tersimpan

**Figma frame:** `788:2647`

## Exact visible copy

- `REFERRAL & DISKON • BERHASIL`
- `Aturan referral berhasil disimpan`
- `✓`
- `Nilai diskon, reward, masa berlaku, batas penggunaan, dan anti self-referral telah diperbarui serta dicatat pada audit log.`
- `Kembali ke Referral`
- `Lihat Audit Log`

## Actions

- `Kembali ke Referral` → `432:1309`
- `Lihat Audit Log` → `432:3518`

---

# ADMIN / ALUR R6-02 — Reward Diaktifkan

**Figma frame:** `788:2659`

## Exact visible copy

- `REWARD • TERSEDIA`
- `Reward diskon berhasil diaktifkan`
- `✓`
- `Reward pemilik kode sekarang tersedia karena invoice pengguna baru sudah diverifikasi. Nilai dan masa berlaku mengikuti aturan program.`
- `Kembali ke Referral`
- `Lihat Invoice`

## Actions

- `Kembali ke Referral` → `432:1309`
- `Lihat Invoice` → `432:1192`

---

# ADMIN / ALUR R6-03 — Konfirmasi Batalkan Reward

**Figma frame:** `788:2683`

## Exact visible copy

- `KONFIRMASI • DESTRUKTIF`
- `Batalkan reward referral?`
- `✓`
- `Gunakan tindakan ini hanya jika invoice dibatalkan, refund, self-referral, atau pelanggaran aturan terverifikasi.`
- `Batalkan Reward`
- `Kembali`

## Actions

- `Batalkan Reward` → `788:2671`
- `Kembali` → `432:1309`

## Destructive-action rule

Destructive referral operations require a verified reason/context. In real implementation, audit reason should not be omitted.

---

# ADMIN / ALUR R6-04 — Reward Dibatalkan

**Figma frame:** `788:2671`

## Exact visible copy

- `REWARD • DIBATALKAN`
- `Reward referral berhasil dibatalkan`
- `✓`
- `Status reward dibatalkan, alasan tersimpan, dan perubahan dicatat pada audit log. Membership pengguna tidak terpengaruh.`
- `Kembali ke Referral`
- `Lihat Pengguna`

## Actions

- `Kembali ke Referral` → `432:1309`
- `Lihat Pengguna` → `432:845`

## Important rule

Cancelling a referral reward does **not** itself revoke the user's membership.

---

# ADMIN / ALUR R6-05 — Ekspor Referral Diproses

**Figma frame:** `790:2631`

## Exact visible copy

- `REFERRAL & DISKON • EKSPOR`
- `Ekspor data referral sedang diproses`
- `✓`
- `File memuat kode, pengguna terkait, invoice, diskon, reward, status, dan audit sesuai filter aktif.`
- `Kembali ke Referral`
- `Lihat Audit Log`

## Actions

- `Kembali ke Referral` → `432:1309`
- `Lihat Audit Log` → `432:3518`

## Export rule

Real export must later respect:

- Admin permission,
- current filters,
- PII/privacy policy,
- audit logging.

---

# ADMIN / 17 — Certificate Management

**Figma frame:** `432:1478`

## Exact visible copy

### Header

- `ADMIN • DIGITAL CREDENTIALS`
- `Certificate Management`
- `Kelola eligibility, issuance, digital preview, download log, revocation, reissue, dan audit.`
- `Template`
- `Terbitkan yang Memenuhi`

Destinations:

- `Template` → `816:2682`
- `Terbitkan yang Memenuhi` → `816:2694`

### Summary

- `Eligible`
- `Dinamis`
- `Memenuhi kriteria program.`

- `Issued`
- `Dinamis`
- `Sertifikat digital diterbitkan.`

- `Pending`
- `Dinamis`
- `Menunggu review atau issue.`

- `Revoked`
- `Dinamis`
- `Dicabut dengan alasan tercatat.`

### Filters

- `⌕`
- `Cari penerima termasking, program, atau status`
- `Program`
- `Semua Program`
- `⌄`
- `Status`
- `Semua Status`
- `⌄`

### Certificate rows

#### Member 1

- `Member •••1`
- `Data penerima dimasking`
- `JLPT N5`
- `Kriteria dari backend`
- `Eligible`
- `Issued`
- `Detail`

#### Member 2

- `Member •••2`
- `Data penerima dimasking`
- `JLPT N4`
- `Kriteria dari backend`
- `Eligible`
- `Pending`
- `Detail`

#### Member 3

- `Member •••3`
- `Data penerima dimasking`
- `JLPT N4`
- `Kriteria dari backend`
- `Not Eligible`
- `Pending`
- `Detail`

#### Member 4

- `Member •••4`
- `Data penerima dimasking`
- `JLPT N5`
- `Kriteria dari backend`
- `Eligible`
- `Revoked`
- `Detail`

#### Member 5

- `Member •••5`
- `Data penerima dimasking`
- `JLPT N3`
- `Kriteria dari backend`
- `Not Eligible`
- `Pending`
- `Detail`

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected certificate

- `MEMBER •••1`
- `JLPT N5 • Digital Certificate`
- `Eligible`
- `Issued`

Certificate preview:

- `SERTIFIKAT DIGITAL`
- `Member •••1`
- `Telah menyelesaikan program JLPT N5`

### Eligibility

- `ELIGIBILITY`
- `✓`
- `Program selesai`
- `✓`
- `Assessment memenuhi rule`
- `✓`
- `Membership valid saat completion`
- `✓`
- `Tidak ada revocation aktif`

### Download & audit

- `DOWNLOAD & AUDIT LOG`
- `Issue time, downloads, reissue, revocation, actor, dan reason berasal dari backend.`

### Actions

- `Unduh`
- `Terbitkan Ulang`
- `Cabut`

Destinations:

- `Unduh` → `816:2694`
- `Terbitkan Ulang` → `816:2694`
- `Cabut` → `816:2706`

### Scope

- `DIGITAL ONLY`
- `Scope MVP menggunakan sertifikat digital; tidak menggunakan sertifikat fisik lama.`

## Certificate rule

The current product scope is **digital-only certificates**.

Do not build physical certificate fulfillment or shipping workflow.

Issuance/revocation remains backend and audit controlled.

---

# Verified Layer C operational flows

## User access

```text
User Management
  ├─ Add User → new-user editor
  └─ User Detail / Edit Access
       → Editor Akses Pengguna
       → access-change operational state
```

## Access governance

```text
Access Settings
  → Save Settings
  → Access Settings Saved state
```

## Invoice

```text
Invoice Management
  → Invoice Detail
  → Verification state

Export Data
  → export operational flow
```

## Referral

```text
Referral Management
  ├─ Save Rules → R6-01
  ├─ Activate Reward → R6-02
  ├─ Cancel Reward → R6-03 confirm → R6-04 cancelled
  └─ Export Data → R6-05
```

## Certificate

```text
Certificate Management
  ├─ Template editor
  ├─ Issue eligible
  ├─ Download / Reissue
  └─ Revoke → confirmation / operational flow
```

---

# Core rules verified from Layer C

- User/account data is intentionally masked in Admin presentation fixtures.
- Technical role and student plan are separate concepts.
- Technical roles shown are `Student` and `Admin`.
- Student plans shown are `Free Member`, `Belajar Mandiri`, and `Belajar dengan Sensei`.
- Sensitive authorization must be checked by backend.
- Changing user access requires permission, reason, and audit.
- Exporting sensitive data requires permission and audit.
- Membership activation occurs only after invoice verification.
- Referral reward activation occurs after invoice verification.
- Self-referral is not allowed.
- Failed/cancelled/refunded/self-referral transactions should not create valid referral rewards.
- Cancelling a referral reward does not automatically cancel membership.
- Certificate scope is digital-only.
- Certificate eligibility, issue, reissue, revocation, download log, actor, and reason are backend/audit data.
- Gamification does not replace certificate eligibility.
- Jepang Pemula remains an editor state, not a separate screen.

---

# Dynamic / fixture values

Do not hardcode these examples:

- all user counts,
- `128`, `43`, `12`, `18` referral metrics,
- `148` pagination totals,
- member aliases,
- masked emails,
- referral codes,
- invoice IDs,
- program/level examples,
- statuses shown in sample rows,
- discount/reward values,
- reward expiry,
- certificate recipients/programs,
- certificate counts,
- eligibility status examples,
- progress/referral source/invoice data.

---

# Layer C frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse one Admin Console shell.
4. Keep PII masked in fixtures.
5. Separate technical role from student plan.
6. Do not model browser/UI permission as production authorization.
7. Do not activate membership before verified payment.
8. Do not activate referral rewards before verified qualifying invoices.
9. Preserve anti-self-referral behavior in the contract.
10. Do not invent discount/reward amounts or validity periods.
11. Do not let reward cancellation revoke membership unless a separate verified membership action requires it.
12. Certificate is digital-only in current MVP scope.
13. Do not issue/revoke certificates purely from local frontend state.
14. Reuse confirmation/status primitives for compact referral operations.
15. Do not implement Laravel/Sanctum, database persistence, payment verification, audit persistence, export generation, PII authorization, referral accounting, certificate issuance, or revocation backend during this documentation phase.
16. Exact operational modal/state copy outside the R6 states above belongs to Page 11 Layer F/G and must not be invented.
