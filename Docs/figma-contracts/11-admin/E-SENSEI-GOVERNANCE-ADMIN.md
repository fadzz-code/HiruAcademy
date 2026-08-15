# E-SENSEI-GOVERNANCE — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **E — Sensei & Tata Kelola** (`388:28`)  
> Screens: **ADMIN / 25–29**  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED where listed**
- Counts, names, cohorts, schedules, analytics metrics, audit events, integration states, and settings values: **DYNAMIC / FIXTURE**
- Permission/security/audit/integration behavior: **BACKEND AUTHORITY LATER**
- Do not paraphrase VERIFIED copy.
- Do not expose secrets, credentials, tokens, PII, Zoom links, or privileged configuration in frontend fixtures.
- Do not implement real cohort scheduling, analytics collection, audit persistence, MFA, storage, Zoom, email, payment/webhook, or security configuration during this contract-extraction phase.

## Numbering note

The active Layer E starts at:

- `ADMIN / 25 — Pengelolaan Sensei`

There is no active top-level `ADMIN / 24` frame inside Layer E.

Do not invent a Screen 24.

---

# Layer E frame inventory

| Screen | Figma frame |
|---|---|
| ADMIN / 25 — Pengelolaan Sensei | `432:2632` |
| ADMIN / 26 — Pengelolaan Cohort & Kelas | `432:2770` |
| ADMIN / 27 — Analitik & Google Analytics | `432:2934` |
| ADMIN / 28 — Audit Logs | `432:3518` |
| ADMIN / 29 — General Settings | `432:3681` |

---

# Shared Admin Console shell

Reuse the existing Admin Console navigation from Layers B–D.

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

Do not create separate Admin shells for Sensei, Analytics, Audit, or Settings.

---

# ADMIN / 25 — Pengelolaan Sensei

**Figma frame:** `432:2632`

## Exact visible copy

### Header

- `ADMIN • ACADEMIC TEAM`
- `Sensei Management`
- `Kelola profil, expertise, availability, cohort assignment, status, dan kapasitas jadwal Sensei.`
- `Availability`
- `Tambah Sensei`

Both top actions scroll to the Sensei editor/detail section in the active prototype.

### Summary

- `Active Sensei`
- `Dinamis`
- `Profile aktif.`

- `Assigned cohorts`
- `Dinamis`
- `Assignment dari backend.`

- `Available slots`
- `Dinamis`
- `Availability yang dapat dipakai.`

- `Capacity alerts`
- `Dinamis`
- `Melewati aturan kapasitas.`

### Search / filters

- `⌕`
- `Cari Sensei, expertise, cohort, atau status`
- `Semua`
- `N5`
- `N4`
- `N3`
- `Available`
- `Limited`

### Sensei list

#### Sensei 1

- `Sensei •••1`
- `N4 • Grammar • Speaking`
- `2 Cohort`
- `Assignment dinamis`
- `Active`
- `Kelola`

#### Sensei 2

- `Sensei •••2`
- `N5 • Foundation • Reading`
- `1 Cohort`
- `Assignment dinamis`
- `Active`
- `Kelola`

#### Sensei 3

- `Sensei •••3`
- `N3 • JLPT Strategy`
- `3 Cohort`
- `Assignment dinamis`
- `Limited`
- `Kelola`

#### Sensei 4

- `Sensei •••4`
- `Interview • SSW`
- `1 Cohort`
- `Assignment dinamis`
- `Active`
- `Kelola`

#### Sensei 5

- `Sensei •••5`
- `N4 • Listening`
- `0 Cohort`
- `Assignment dinamis`
- `Inactive`
- `Kelola`

All `Kelola` actions scroll to the shared Sensei detail/editor.

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected Sensei

- `Sensei •••1`
- `Profil publik, bio, dan kontak mengikuti data backend.`
- `Active`
- `N4 Expert`

### Expertise

- `EXPERTISE`
- `N4`
- `Grammar`
- `Speaking`
- `Cohort Coaching`

### Availability

- `Availability`

- `Senin`
- `Dinamis dari backend`

- `Rabu`
- `Dinamis dari backend`

- `Sabtu`
- `Limited`

### Cohort assignment

- `Cohort assignment`

- `N4 • Cohort Aktif`
- `Assigned`

- `N4 • Cohort Berikutnya`
- `Planned`

### Actions

- `Edit Profil`
- `Assign Cohort`
- `Availability`

Destinations:

- `Edit Profil` → `816:2850`
- `Assign Cohort` → `432:2770`
- `Availability` → `816:2850`

### Governance

- `CAPACITY & PRIVACY`
- `Assignment, availability, kontak, dan kapasitas mengikuti permission serta audit policy.`

## Rule

Sensei profile, contact, assignment, availability, and capacity are sensitive operational data.

Do not expose real contact data or allow local-only cohort assignment to become authoritative.

---

# ADMIN / 26 — Pengelolaan Cohort & Kelas

**Figma frame:** `432:2770`

## Exact visible copy

### Header

- `ADMIN • COHORT & KELAS`
- `Pengelolaan Cohort & Kelas`
- `Kelola program, periode, kapasitas, siswa, Sensei, jadwal kelas, replay, dan lifecycle cohort.`
- `Kalender`
- `Tambah Cohort`

Prototype behavior:

- `Kalender` scrolls to the schedule area
- `Tambah Cohort` scrolls to the cohort editor

### Summary

- `Cohort aktif`
- `Dinamis`
- `Cohort berjalan.`

- `Cohort direncanakan`
- `Dinamis`
- `Belum dimulai.`

- `Siswa terdaftar`
- `Dinamis`
- `Student dengan entitlement.`

- `Peringatan kapasitas`
- `Dinamis`
- `Mendekati atau melebihi aturan.`

### Search / filters

- `⌕`
- `Cari cohort, program, Sensei, atau status`
- `Semua`
- `Active`
- `Planned`
- `Completed`
- `N4`
- `N5`

### Cohort list

#### N4 active

- `班`
- `N4 • Cohort Aktif`
- `Belajar dengan Sensei`
- `Dinamis`
- `Dari konfigurasi`
- `Sensei •••1`
- `Assignment dinamis`
- `Active`
- `Kelola`

#### N4 planned

- `班`
- `N4 • Cohort Berikutnya`
- `Belajar dengan Sensei`
- `Dinamis`
- `Dari konfigurasi`
- `Sensei •••2`
- `Assignment dinamis`
- `Planned`
- `Kelola`

#### N5 active

- `班`
- `N5 • Cohort Dasar`
- `Belajar dengan Sensei`
- `Dinamis`
- `Dari konfigurasi`
- `Sensei •••2`
- `Assignment dinamis`
- `Active`
- `Kelola`

#### Completed

- `班`
- `N4 • Cohort Sebelumnya`
- `Belajar dengan Sensei`
- `Dinamis`
- `Dari konfigurasi`
- `Sensei •••1`
- `Assignment dinamis`
- `Completed`
- `Kelola`

#### Draft

- `班`
- `N3 • Cohort Draft`
- `Belajar dengan Sensei`
- `Dinamis`
- `Dari konfigurasi`
- `Belum assigned`
- `Assignment dinamis`
- `Draft`
- `Kelola`

All `Kelola` actions scroll to the shared cohort editor.

### Pagination

- `Menampilkan 1–20 dari 148 data`
- `‹`
- `1`
- `2`
- `3`
- `…`
- `8`
- `›`

### Selected cohort

- `班`
- `N4 • COHORT AKTIF`
- `Belajar dengan Sensei`
- `Active`

Fields:

- `Program`
- `N4 • Belajar dengan Sensei`
- `⌄`

- `Periode`
- `Tanggal dari backend`
- `Teks bantuan opsional`

- `Kapasitas`
- `Aturan dari admin`
- `Teks bantuan opsional`

- `Sensei`
- `Sensei •••1`
- `⌄`

### Runtime summary

- `—`
- `Students`

- `—`
- `Sessions`

- `—`
- `Replay`

### Session rules

- `ATURAN SESI`

- `Jumlah sesi`
- `Dinamis`

- `Durasi sesi`
- `Dinamis`

- `Reminder`
- `Dari konfigurasi`

- `Replay visibility`
- `Setelah publish`

- `Tanya Sensei`
- `Plan gated`

### Student placement

- `PENEMPATAN SISWA`
- `Student dapat ditambahkan bila entitlement dan kapasitas valid.`

Actions:

- `Simpan Cohort`
- `Kelola Student`
- `Kelola Jadwal`

Destinations:

- `Simpan Cohort` → `657:3013`
- `Kelola Student` → `432:845`
- `Kelola Jadwal` scrolls to schedule area

### Governance

- `TATA KELOLA`
- `Periode, kapasitas, assignment, dan perubahan lifecycle harus tervalidasi serta tercatat.`

---

# Mini Checkpoint block inside Cohort Management

## Exact visible copy

- `MINI CHECKPOINT KELAS`
- `Evaluasi singkat per level, sesi, dan part`
- `Kelola Mini Checkpoint`

Destination:

- `Kelola Mini Checkpoint` → `998:2616`

### Scope

- `JUMLAH CHECKPOINT`
- `N5, N4, N3, N2`
- `Backend configurable`

- `UNLOCK`
- `Per sesi dan part`
- `Berdasarkan sesi selesai`

- `STRUKTUR`
- `Sesi & part`
- `Mengikuti konfigurasi level`

- `WAKTU`
- `Timer configurable`
- `Timer dimulai saat mulai`

- `JUMLAH SOAL`
- `Lebih sedikit dari Try Out`
- `Diatur Admin`

### Backend rule

- `ATURAN BACKEND`
- `Mini Checkpoint khusus Belajar dengan Sensei. Struktur mengikuti level N5–N2, sesi, dan part. Timer, passing score, soal, gambar, review, dan publish diatur Admin; hasil masuk assessment history.`

## Critical scope rule

Mini Checkpoint remains:

```text
Belajar dengan Sensei only
N5–N2
level → sesi → part
```

Do not add N1 without later client authority.

---

# Jadwal Kelas & Replay block

## Exact visible copy

- `JADWAL KELAS & REPLAY`
- `Kelola sesi cohort tanpa modul Zoom khusus. Platform, link kelas, reminder, dan replay tersimpan pada cohort.`

Fields:

- `Nama Sesi`
- `Chapter 4 — Kelas bersama Sensei`

- `Tanggal & Waktu`
- `Tanggal dan waktu dari Admin`

- `Durasi`
- `Dinamis per sesi`

- `Sensei`
- `Assignment cohort aktif`

- `Platform Kelas`
- `Zoom / Meet / platform eksternal`

- `Link Kelas`
- `URL dinamis dari Admin`

- `Reminder`
- `In-app dan email`

- `Status Sesi`
- `Draft / Terjadwal / Selesai`

- `Link Replay`
- `URL atau file rekaman`

- `Visibilitas`
- `Setelah dipublikasikan`

- `Status Replay`
- `Belum ada / Draft / Tersedia`

### Audit / entitlement rule

- `Perubahan link kelas dan replay tercatat pada audit log serta hanya tersedia bagi entitlement cohort aktif.`

### Actions

- `Simpan Jadwal`
- `Unggah Replay`
- `Publikasikan Replay`

Destinations:

- `Simpan Jadwal` → `657:2952`
- `Unggah Replay` → `649:3139`
- `Publikasikan Replay` → `649:2632`

## Important architecture rule

The active Figma explicitly says:

`Kelola sesi cohort tanpa modul Zoom khusus.`

Therefore do not build a separate Zoom administration product/module unless a later requirement explicitly changes this.

Zoom/Meet/external platform details belong to the Cohort session configuration.

---

# ADMIN / 27 — Analitik & Google Analytics

**Figma frame:** `432:2934`

## Exact visible copy

### Header

- `ADMIN • ANALITIK & GOOGLE ANALYTICS`
- `Analitik & Google Analytics`
- `Pantau acquisition dan campaign melalui Google Analytics; transaksi, membership, entitlement, dan diskon tetap berasal dari backend.`
- `Periode`
- `Periode dari backend`
- `⌄`
- `Ekspor`
- `Dashboard`

Destinations:

- `Ekspor` → `433:2702`
- `Dashboard` → `431:152`

### KPI

- `Pembelajar aktif`
- `Dinamis`
- `Data real-time dari backend.`

- `Konversi membership`
- `Dinamis`
- `Data real-time dari backend.`

- `Learning engagement`
- `Dinamis`
- `Data real-time dari backend.`

- `Transaksi terverifikasi`
- `Dinamis`
- `Data real-time dari backend.`

### Learning activity

- `Aktivitas belajar`
- `Bentuk visual ilustratif; nilai aktual berasal dari backend.`
- `Backend + GA4`

### Membership funnel

- `Membership funnel`
- `Landing → Placement → Register → Invoice → Active`

Stages:

- `Visitor • —`
- `Placement lead • —`
- `Registered • —`
- `Invoice • —`
- `Membership active • —`

### Learning engagement

- `Learning engagement`
- `Intensitas visual mengikuti aktivitas harian; tidak menampilkan angka lama.`

### Plan distribution

- `Distribusi plan`
- `Nilai aktual mengikuti membership aktif.`

- `Free Member`
- `—`

- `Belajar Mandiri`
- `—`

- `Belajar dengan Sensei`
- `—`

### Assessment performance

- `Assessment performance`
- `Checkpoint dan Try Out dipisahkan per level dan section.`

- `Checkpoint completion`
- `Try Out completion`
- `Review opened`

### Data trust / governance

- `Kepercayaan Data & Tata Kelola`

- `源`
- `Sumber`
- `GA untuk traffic dan campaign; backend untuk transaksi serta entitlement.`

- `時`
- `Pembaruan`
- `Tampilkan waktu pembaruan data.`

- `隠`
- `Privasi`
- `Masking untuk data sensitif.`

- `出`
- `Ekspor`
- `Export mengikuti role dan permission.`

### GA4 section

- `GOOGLE ANALYTICS & CONVERSION EVENTS`
- `Gunakan GA4 untuk source/medium, UTM, dan funnel akuisisi. Nilai transaksi serta status akses tetap diverifikasi backend.`

Status labels:

- `GA4 Terhubung`
- `UTM & Source Aktif`
- `Backend Sinkron`

### Event names

- `landing_view`
- `Landing dibuka`

- `free_trial_click`
- `Klik Coba Gratis`

- `placement_start`
- `Placement dimulai`

- `placement_complete`
- `Placement selesai`

- `plan_select`
- `Plan dipilih`

- `level_select`
- `Level dipilih`

- `sign_up`
- `Registrasi selesai`

- `referral_apply`
- `Kode referral diterapkan`

- `invoice_create`
- `Invoice dibuat`

- `payment_verified`
- `Pembayaran diverifikasi`

- `tryout_complete`
- `Try Out selesai`

- `feedback_submit`
- `Feedback dikirim`

### Critical analytics rule

- `Google Analytics tidak mengaktifkan membership, menghitung reward referral, atau memverifikasi invoice. Semua keputusan tersebut berasal dari backend.`

## Source-of-truth rule

Use GA/GA4 for:

- traffic,
- source/medium,
- UTM,
- campaign/acquisition funnel.

Use backend for:

- transaction value,
- payment verification,
- membership state,
- entitlement,
- referral reward,
- learning authority.

Do not use GA events as business-state authority.

---

# ADMIN / 28 — Audit Logs

**Figma frame:** `432:3518`

## Exact visible copy

### Header

- `ADMIN • SECURITY & TRACEABILITY`
- `Audit Logs`
- `Tinjau actor, target, event, timestamp, reason, outcome, permission, dan perubahan sensitif.`
- `Ekspor Audit`

Destination:

- `Ekspor Audit` → `433:2702`

### Summary

- `Events`
- `Dinamis`
- `Jumlah event pada periode.`

- `Sensitive changes`
- `Dinamis`
- `Akses, transaksi, permission.`

- `Denied actions`
- `Dinamis`
- `Aksi yang ditolak backend.`

- `Export events`
- `Dinamis`
- `Export yang tercatat.`

### Filters

- `⌕`
- `Cari event, actor termasking, target, atau reason`
- `Category`
- `Semua Event`
- `⌄`
- `Outcome`
- `Semua Outcome`
- `⌄`
- `Periode`
- `Periode Backend`
- `⌄`

### Audit rows

#### User access

- `鍵`
- `User Access Updated`
- `Event category dari sistem`
- `Admin •••1`
- `Actor dimasking`
- `Member •••1`
- `Target dimasking`
- `Success`
- `Detail`

#### Invoice

- `請`
- `Invoice Verified`
- `Event category dari sistem`
- `Admin •••2`
- `Actor dimasking`
- `INV•••001`
- `Target dimasking`
- `Success`
- `Detail`

#### Publish

- `公`
- `Chapter Published`
- `Event category dari sistem`
- `Admin •••1`
- `Actor dimasking`
- `N4 • Chapter 4`
- `Target dimasking`
- `Success`
- `Detail`

#### Export

- `録`
- `Sensitive Export`
- `Event category dari sistem`
- `Admin •••3`
- `Actor dimasking`
- `User Dataset`
- `Target dimasking`
- `Denied`
- `Detail`

#### Replay

- `公`
- `Replay Published`
- `Event category dari sistem`
- `Admin •••2`
- `Actor dimasking`
- `Replay •••4`
- `Target dimasking`
- `Success`
- `Detail`

#### Permission change

- `録`
- `Permission Change`
- `Event category dari sistem`
- `Admin •••1`
- `Actor dimasking`
- `Role Policy`
- `Target dimasking`
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

### Selected event

- `鍵`
- `USER ACCESS UPDATED`
- `Perubahan entitlement pengguna`
- `Success`

Fields:

- `Actor`
- `Admin •••1`

- `Target`
- `Member •••1`

- `Timestamp`
- `Dari backend`

- `IP / Device`
- `Dimasking sesuai policy`

- `Reason`
- `Upgrade membership terverifikasi`

- `Outcome`
- `Success`

### Change diff

- `CHANGE DIFF`

#### Before

- `BEFORE`
- `Plan: Free Member • Level: N4 • Access: Chapter 1`

#### After

- `AFTER`
- `Plan: Belajar Mandiri • Level: N4 • Access: Full Journey`

### Evidence

- `REASON & EVIDENCE`
- `Reason, related invoice, actor permission, dan backend checks tersimpan sebagai metadata event.`

### Actions

- `Salin ID Event`
- `Data Terkait`
- `Ekspor Event`

Destinations:

- `Salin ID Event` → `816:2862`
- `Data Terkait` → `816:2862`
- `Ekspor Event` → `433:2702`

### Retention / access

- `RETENTION & ACCESS`
- `Retention, export, dan visibility audit log mengikuti policy, permission, serta backend source of truth.`

## Audit rule

Audit logs must not be treated as editable content.

They describe recorded outcomes/evidence of sensitive operations.

---

# ADMIN / 29 — General Settings

**Figma frame:** `432:3681`

## Exact visible copy

### Header

- `ADMIN • SYSTEM CONFIGURATION`
- `General Settings`
- `Kelola branding, support placeholders, locale, defaults, privacy, security, integrations, dan feature settings.`
- `Review Changes`
- `Simpan Pengaturan`

Destinations:

- `Review Changes` → `433:2678`
- `Simpan Pengaturan` → `816:2874`

### Security announcement

- `×`
- `Pengumuman`
- `Jangan menyimpan secret, token, atau credential sensitif langsung pada UI atau file desain.`

## Tabs / sections

- `Branding`
- `Locale & Defaults`
- `Support`
- `Privacy & Security`
- `Integrations`
- `Admin Profile`

---

# Branding

- `Branding`
- `Logo, nama produk, warna, favicon, dan asset publik mengikuti brand system.`

- `Hiru Academy`
- `Nama dan asset aktual mengikuti konfigurasi branding.`

Actions/fields:

- `Ganti Logo`
- `Nama Produk`
- `Hiru Academy`
- `Teks bantuan opsional`
- `Nama Pendek`
- `Hiru`
- `Teks bantuan opsional`
- `◇`
- `Ringkasan`

`Ganti Logo` → `816:2874`

## Branding rule

Do not allow arbitrary visual-system changes that contradict approved design tokens/brand rules.

---

# Locale & System Defaults

- `Locale & System Defaults`
- `Format bahasa, timezone, tanggal, mata uang, dan default application state.`

Fields:

- `Bahasa`
- `Indonesia`
- `⌄`

- `Timezone`
- `Asia/Jakarta`
- `⌄`

- `Mata Uang`
- `IDR`
- `⌄`

Defaults:

- `章`
- `Default Program`
- `Tidak dipilih otomatis tanpa data.`

- `役`
- `Default Role`
- `Student untuk akun baru.`

- `知`
- `Notification`
- `Mengikuti preference user.`

## Rule

Do not invent a default learning program/level for new accounts.

---

# Support & Public Contact

- `Support & Public Contact`
- `Kontak support, WhatsApp, email, dan jam layanan harus diisi dari data client.`

Fields:

- `Email Support`
- `Belum diberikan client`
- `Teks bantuan opsional`

- `WhatsApp Support`
- `Belum diberikan client`
- `Teks bantuan opsional`

- `Jam Layanan`
- `Belum diberikan client`
- `Teks bantuan opsional`

### Announcement

- `!`
- `Pengumuman`
- `Kontak publik tidak boleh dipublikasikan sebelum data resmi client tersedia.`

## Critical OPEN data

Support email, WhatsApp, and operating hours are explicitly unavailable in the active Figma.

Do not invent placeholders that look real.

---

# Admin Profile / Security

- `ADMIN •••1`
- `Profile dan role dari backend`
- `MFA Required`

Fields:

- `Email`
- `Dimasking`

- `Role`
- `Permission-driven`

- `Password`
- `Last changed dinamis`

- `Active sessions`
- `Backend data`

- `Recovery`
- `Policy-controlled`

Actions:

- `Kelola MFA`
- `Ubah Password`

Both route to:

- `816:2886`

### Security note

- `SECURITY NOTE`
- `Jangan tampilkan credential, recovery secret, atau session token pada UI.`

---

# Privacy & Security

- `Privacy & Security`
- `Aturan data, masking, session, permission, dan audit.`

### Data masking

- `隠`
- `Data masking`
- `Masking PII pada list, export, dan desain.`
- `Configured`

### Backend authorization

- `鍵`
- `Backend authorization`
- `Semua akses sensitif diperiksa server.`
- `Configured`

### Session policy

- `時`
- `Session policy`
- `Durasi dan logout mengikuti security config.`
- `Pending`

### Audit logging

- `録`
- `Audit logging`
- `Actor, target, reason, dan outcome dicatat.`
- `Configured`

### Data retention

- `保`
- `Data retention`
- `Periode retention perlu policy resmi.`
- `Missing`

## OPEN policy

The active Figma explicitly marks data-retention policy as:

`Missing`

Do not invent retention periods.

---

# Integrations

- `Integrations`
- `Status koneksi tanpa menampilkan secret atau credential.`

### Zoom

- `会`
- `Zoom integration`
- `Connection status dan account reference.`
- `Pending`

### Email

- `郵`
- `Email provider`
- `Provider dan delivery status.`
- `Pending`

### Payment

- `払`
- `Payment / verification`
- `Flow transaksi dan webhook status.`
- `Pending`

### Media storage

- `像`
- `Media storage`
- `Storage status untuk file dan replay.`
- `Configured`

### Analytics

- `分`
- `Analytics`
- `Event collection dan privacy state.`
- `Pending`

## Integration rule

UI may show integration status/reference only.

Never show or persist raw:

- secret,
- API key,
- webhook secret,
- OAuth token,
- credential.

---

# Feature Defaults

- `Feature Defaults`
- `Default state produk; entitlement tetap berasal dari backend.`

### Placement Test

- `Placement Test`
- `Public tanpa akun, lead wajib.`
- `On`

### Digital Certificate

- `Digital Certificate`
- `Digital only.`
- `On`

### Community

- `Community`
- `Read/write sesuai plan.`
- `On`

### Jepang Pemula

- `Jepang Pemula`
- `Bukan screen terpisah.`
- `Editor State`

### Zoom & Replay

- `Zoom & Replay`
- `Hanya Belajar dengan Sensei dan publish admin.`
- `Conditional`

### Save/review rule

- `SAVE & REVIEW`
- `Perubahan branding, privacy, integration, atau default sensitif perlu review, backend validation, dan audit log.`

---

# Verified Layer E operational flows

## Sensei

```text
Sensei Management
├─ Add / Edit Sensei
├─ Availability
└─ Assign Cohort
    → Cohort & Kelas
```

## Cohort

```text
Cohort & Kelas
├─ Add / Edit Cohort
├─ Manage Students → User Management
├─ Manage Schedule
├─ Mini Checkpoint → Mini Checkpoint Builder
├─ Save Schedule
├─ Upload Replay
└─ Publish Replay
```

## Analytics

```text
Analytics
├─ Backend learning/business metrics
├─ GA4 acquisition/campaign events
└─ Export → permission-controlled export state
```

## Audit

```text
Audit Logs
├─ Search / filter events
├─ View change diff / evidence
├─ Copy Event ID
├─ Related Data
└─ Export Event
```

## Settings

```text
General Settings
├─ Review Changes
├─ Save Settings
├─ Replace Logo
└─ MFA / Password security flow
```

Exact modal/state copy for `649:*`, `657:*`, `816:*`, and `433:*` destinations belongs to Page 11 Layer F/G and must not be invented here.

---

# Core product rules verified from Layer E

- Sensei profiles, assignments, availability, and capacity are permission/audit controlled.
- Cohort placement requires valid entitlement and capacity.
- Session/replay lifecycle belongs inside Cohort management.
- There is no separate Zoom Admin module in the active Figma.
- External class platform may be Zoom, Meet, or another configured platform.
- Replay is visible only after publication and to active cohort entitlement.
- Mini Checkpoint is Sensei-only, N5–N2, structured by level → sesi → part.
- GA4 is for acquisition/campaign analytics, not transaction or entitlement authority.
- Payment verification, membership activation, and referral reward remain backend authority.
- Audit logs capture actor, target, event, timestamp, reason, outcome, permission, and evidence.
- Sensitive export is permission/audit controlled.
- Secrets/tokens/credentials must never be stored or displayed in Admin UI/design.
- Support email/WhatsApp/hours remain OPEN until client provides official values.
- Data retention remains OPEN because the Figma marks the policy `Missing`.
- New-account default role is Student.
- No default program should be selected without data.
- Digital Certificate remains digital-only.
- Jepang Pemula remains an editor state, not a separate screen.
- Zoom & Replay are conditional to Belajar dengan Sensei and Admin publication.

---

# Dynamic / fixture values that must remain replaceable

Do not hardcode:

- number of Sensei
- number of cohorts
- availability slots
- cohort capacity
- Sensei expertise examples
- Sensei assignment counts
- `148` pagination totals
- N4/N5 cohort examples
- current session title
- platform/Zoom URL
- schedule dates/durations
- replay URL/file
- analytics KPI values
- funnel values
- GA connection status
- audit event examples
- actor/target aliases
- IP/device
- version/event IDs
- branding asset values beyond approved brand source
- support contact data
- session-policy duration
- retention period
- provider/credential details
- integration connection state

---

# Layer E frontend-first implementation rules

1. Exact visible copy and hierarchy come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse one Admin Console shell.
4. Keep Sensei identity/contact data masked in fixtures.
5. Keep cohort entitlement, capacity, assignment, and lifecycle as distinct concerns.
6. Do not build a separate Zoom Admin module; class platform configuration lives under Cohort & Kelas.
7. Do not publish Replay before its publish state.
8. Mini Checkpoint remains N5–N2 and Sensei-only.
9. GA4 events must never activate membership, verify payment, or calculate referral reward.
10. Keep backend business metrics distinct from analytics/event tracking.
11. Audit logs are append/record semantics, not editable CMS content.
12. Sensitive settings changes require review/audit semantics.
13. Never expose tokens, secrets, credentials, recovery secrets, or session tokens.
14. Do not invent official support contact data.
15. Do not invent a data-retention period.
16. Do not implement Laravel/Sanctum, Postgres persistence, Zoom/Meet connection, replay storage, email provider, payment webhook, analytics SDK, MFA backend, audit storage, export generation, secret management, or policy enforcement during this documentation phase.
17. Exact external state/modal copy is extracted later in Page 11 Layer F/G.
