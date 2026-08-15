# F-STATUS-SYSTEM — Page 11 / Admin

> Figma source: **Page 11 — E2E / Admin** (`388:23`)  
> Layer: **F — Status & Kondisi Sistem** (`388:29`)  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Top-level state-frame inventory: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- Permission, entitlement, payment verification, validation, audit, and export authority: **BACKEND-OWNED LATER**
- Do not paraphrase VERIFIED copy.
- Do not turn each compact status frame into a standalone route.
- Do not let browser-side Admin state become production authorization.

---

# Layer F frame inventory

The active Figma Layer F contains exactly **8 top-level frames**:

| Figma frame | Screen |
|---|---|
| `431:147` | ADMIN / KONDISI 00 — Pengalihan Hak Akses — Admin |
| `433:2555` | ADMIN / KONDISI 01 — Editor Akses Pengguna |
| `433:2568` | ADMIN / KONDISI 02 — Verifikasi Invoice |
| `433:2606` | ADMIN / KONDISI 03 — Tabel Kosong |
| `433:2630` | ADMIN / KONDISI 04 — Kesalahan Validasi |
| `433:2654` | ADMIN / KONDISI 05 — Konfirmasi Destruktif |
| `433:2678` | ADMIN / KONDISI 06 — Akses Ditolak |
| `433:2702` | ADMIN / KONDISI 07 — Proses Ekspor |

Do not invent additional numbered Admin system states inside Layer F.

More detailed Admin operational actions live in **Layer G — Admin Operations**, not here.

---

# Recommended frontend form

Most Layer F screens are compact system states.

Prefer reusable Admin primitives:

```text
Admin Status Dialog
├── empty
├── validation blocked
├── permission denied
└── export processing

Admin Sensitive Action Dialog
├── destructive confirmation
├── access editor
└── invoice verification

Admin Entitlement Redirect
└── login → Admin Console
```

Recommended behavior:

- `KONDISI 00` can be a transient redirect/confirmation state.
- `KONDISI 01` should behave like a focused access editor dialog/drawer/modal.
- `KONDISI 02` should behave like a focused invoice-verification dialog or dedicated detail overlay.
- `KONDISI 03–07` should normally reuse compact shared dialog/state primitives.
- Do not create eight independent UI systems.

---

# KONDISI 00 — Pengalihan Hak Akses — Admin

**Figma frame:** `431:147`  
**Size:** `720 × 408`

## Exact visible copy

- `Login berhasil`
- `Sistem memeriksa role Admin, permission, dan status akun sebelum membuka Admin Console.`
- `ℹ`
- `Pengumuman`
- `Tujuan dan menu Admin ditentukan backend berdasarkan permission akun.`
- `Buka Dashboard`

## Action

- `Buka Dashboard` → `431:152` — Dashboard Admin

## Critical auth rule

The latest product decision uses **one shared Login UI**.

Therefore this state means:

```text
Shared Login
  → backend checks role + permission + account status
  → Admin Console
```

Do not create a separate `/admin/login`.

Do not determine Admin access from:

- query parameter,
- browser local storage,
- frontend role switch,
- hidden menu state.

Those may exist only as deterministic development fixtures.

---

# KONDISI 01 — Editor Akses Pengguna

**Figma frame:** `433:2555`  
**Size:** `760 × 649`

## Exact visible copy

### Header

- `USER ACCESS EDITOR`
- `Ubah membership dan entitlement`

### Warning

- `×`
- `Pengumuman`
- `Perubahan akses sensitif wajib diverifikasi backend dan dicatat.`

### Membership

- `Membership`
- `Belajar Mandiri`
- `⌄`

### Level

- `Level`
- `N4`
- `⌄`

### Access period

- `Periode Akses`
- `Tanggal dari backend`
- `Teks bantuan opsional`

### Reason / summary

- `◇`
- `Ringkasan`

### Actions

- `Terapkan Perubahan`
- `Batal`

Destinations:

- `Terapkan Perubahan` → `660:2671` — operational state in Layer G
- `Batal` → `432:845` — User Management

## Critical governance rule

Changing user access is a **sensitive Admin action**.

Implementation must preserve the conceptual requirement for:

- backend permission check,
- validation,
- reason/context,
- audit event.

Do not make membership/entitlement editing a simple local dropdown update.

## Fixture values

- `Belajar Mandiri`
- `N4`
- access date

are example/editor values.

---

# KONDISI 02 — Verifikasi Invoice

**Figma frame:** `433:2568`  
**Size:** `820 × 891`

## Exact visible copy

### Header

- `INVOICE VERIFICATION`
- `INV•••001 • Menunggu verifikasi`

### Warning

- `×`
- `Pengumuman`
- `Verifikasi mengaktifkan membership dan reward referral yang memenuhi aturan; semua perubahan dicatat pada audit log.`

### Invoice summary

- `Pengguna`
- `Member •••1`

- `Program`
- `N4 • Belajar Mandiri`

- `Nominal`
- `Mengikuti data transaksi`

- `Status`
- `Menunggu verifikasi`

- `Sumber`
- `WhatsApp / admin flow`

### Payment proof

- `証`
- `Bukti pembayaran`
- `File, waktu unggah, dan metadata berasal dari backend.`
- `Lihat Bukti`

Destination:

- `Lihat Bukti` → `816:2898` — proof-preview operational state

### Activation section

- `Aktivasi membership & referral`

Fields:

- `Plan`
- `Belajar Mandiri`
- `⌄`

- `Periode Akses`
- `Dari konfigurasi produk`

### Referral rule

- `Reward hanya aktif jika kode valid, bukan self-referral, dan invoice tidak dibatalkan.`

### Notes

- `◇`
- `Ringkasan`

### Actions

- `Verifikasi & Aktifkan`
- `Tolak Invoice`
- `Kembali`

Destinations:

- `Verifikasi & Aktifkan` → `660:2731`
- `Tolak Invoice` → `660:2791`
- `Kembali` → `432:1192` — Invoice Management

## Critical transaction rule

Invoice verification can activate:

- membership,
- qualifying referral reward.

But only after backend verification.

Frontend must **not** treat:

- invoice creation,
- uploaded payment proof,
- WhatsApp message,
- local checkbox,
- button press alone

as verified payment.

## Referral guard

Reward activation requires the invoice/referral relationship to remain valid.

Figma explicitly states:

- code valid,
- not self-referral,
- invoice not cancelled.

---

# KONDISI 03 — Tabel Kosong

**Figma frame:** `433:2606`  
**Size:** `720 × 325`

## Exact visible copy

- `ADMIN • EMPTY`
- `Belum ada data untuk filter ini`
- `System State`
- `空`
- `Ubah filter, periode, atau kata kunci. Permission dan source data tetap diperiksa backend.`
- `Permission check`
- `Backend validation`
- `Audit event`
- `Reset Filter`
- `Kembali`

## Actions

- `Reset Filter` → `432:2934` — Analitik & Google Analytics
- `Kembali` → `432:2934`

## Interpretation

The prototype demonstrates the empty state from Analytics.

The UI pattern can be reused across Admin tables, but the exact destination/context must remain screen-aware.

Do **not** implement a global empty-state button that always routes to Analytics.

## Rule

An empty result must not bypass:

- permission,
- backend source validation,
- data-access policy.

---

# KONDISI 04 — Kesalahan Validasi

**Figma frame:** `433:2630`  
**Size:** `720 × 325`

## Exact visible copy

- `ADMIN • VALIDATION`
- `Konfigurasi belum dapat disimpan`
- `Blocked`
- `!`
- `Lengkapi field wajib dan periksa hubungan data sebelum menyimpan atau mempublikasikan.`
- `Permission check`
- `Backend validation`
- `Audit event`
- `Kembali ke Editor`
- `Lihat Error`

## Actions

- `Kembali ke Editor` → `431:406` — Chapter Builder
- `Lihat Error` → `431:406`

## Interpretation

The prototype uses Chapter Builder as the example origin, but this validation pattern is relevant to multiple Admin editors.

Reuse the state presentation without hardcoding Chapter Builder as the destination for every validation failure.

## Rule

A failed validation must block save/publish when required relationships or fields are invalid.

Frontend visual validation may improve UX, but real sensitive publication validation remains server-authoritative later.

---

# KONDISI 05 — Konfirmasi Destruktif

**Figma frame:** `433:2654`  
**Size:** `720 × 325`

## Exact visible copy

- `ADMIN • CONFIRMATION`
- `Konfirmasi tindakan sensitif`
- `Confirm`
- `削`
- `Archive, reject, revoke, suspend, atau delete memerlukan alasan dan audit trail.`
- `Permission check`
- `Backend validation`
- `Audit event`
- `Konfirmasi Tindakan`
- `Batal`

## Actions

- `Konfirmasi Tindakan` → `431:923` — Content Library
- `Batal` → `431:923`

## Critical destructive-action rule

This is a **generic pattern**, demonstrated from Content Library.

Destructive Admin actions include examples such as:

- archive,
- reject,
- revoke,
- suspend,
- delete.

Do not make one generic confirmation blindly execute every destructive action.

Each real action must preserve its own:

- target,
- reason,
- permission,
- validation,
- audit event,
- post-action result.

## Context-aware implementation

The compact confirmation primitive can be shared, but the action configuration must be explicit.

---

# KONDISI 06 — Akses Ditolak

**Figma frame:** `433:2678`  
**Size:** `720 × 325`

## Exact visible copy

- `ADMIN • PERMISSION`
- `Kamu tidak memiliki permission`
- `Blocked`
- `鍵`
- `Role saat ini tidak diizinkan menjalankan tindakan sensitif ini. Backend menolak request.`
- `Permission check`
- `Backend validation`
- `Audit event`
- `Kembali ke Access`
- `Tutup`

## Actions

- `Kembali ke Access` → `432:982` — Access Settings
- `Tutup` → `432:982`

## Critical security rule

The exact copy explicitly says:

`Backend menolak request.`

A hidden/disabled UI control is not enough security.

Real implementation must reject the request server-side.

Frontend should still:

- avoid exposing unnecessary sensitive controls,
- provide clear denied state,
- not reveal secret details about authorization internals.

---

# KONDISI 07 — Proses Ekspor

**Figma frame:** `433:2702`  
**Size:** `720 × 347`

## Exact visible copy

- `ADMIN • EXPORT`
- `Export sedang diproses`
- `System State`
- `出`
- `Dataset, masking, permission, dan ukuran file diperiksa sebelum tautan download tersedia.`
- `Permission check`
- `Backend validation`
- `Audit event`
- `Kembali ke Analytics`
- `Tutup`

## Actions

- `Kembali ke Analytics` → `432:2934`
- `Tutup` → `432:2934`

## Export rule

Before a real downloadable file is made available, the system must conceptually validate:

- dataset scope,
- masking,
- permission,
- file/export size,
- audit event.

Do not generate/export sensitive Admin data directly from unrestricted browser state.

## Context note

The prototype uses Analytics as the origin/destination.

Layer B–E also contains exports for:

- Placement/Lead,
- Invoice,
- Referral,
- Assessment,
- Testimonial consent,
- Analytics,
- Audit.

The shared export-processing UI may be reused, but return destination must remain contextual.

---

# Verified Layer F flows

## Admin login / redirect

```text
Shared Login
  → Admin entitlement/permission check
  → KONDISI 00
  → Dashboard Admin
```

## User access

```text
User Management
  → Editor Akses Pengguna
      ├─ Batal → User Management
      └─ Terapkan Perubahan
          → Layer G access-update operation
```

## Invoice

```text
Invoice Management
  → Verifikasi Invoice
      ├─ Lihat Bukti → proof state
      ├─ Verifikasi & Aktifkan → Layer G verification flow
      ├─ Tolak Invoice → Layer G rejection flow
      └─ Kembali → Invoice Management
```

## Validation

```text
Admin Editor
  → Validation failure
  → KONDISI 04
      → return to editor / error context
```

## Destructive operation

```text
Sensitive destructive action
  → KONDISI 05
      ├─ confirm → context-specific operation
      └─ cancel → origin
```

## Permission denial

```text
Sensitive request
  → backend rejects request
  → KONDISI 06
```

## Export

```text
Export request
  → permission + masking + dataset validation
  → KONDISI 07
  → download becomes available only after processing
```

---

# Shared implementation matrix

| State | Recommended UI form | New route? |
|---|---|---|
| Admin redirect | transient status / redirect screen | No dedicated Admin login route |
| User Access Editor | modal / drawer / focused editor | Usually no |
| Invoice Verification | large modal / detail overlay | Usually no |
| Empty table | inline state or compact dialog | No |
| Validation error | dialog + inline field errors | No |
| Destructive confirmation | modal/dialog | No |
| Permission denied | modal/dialog / blocked state | No |
| Export processing | modal/dialog / asynchronous status | No |

The verified Figma sizes support state/dialog treatment rather than eight standalone pages.

---

# Backend-authority boundaries verified in Layer F

Layer F makes these boundaries explicit:

- Admin destination is permission-driven.
- sensitive access changes require backend verification.
- access changes are audited.
- invoice verification controls membership activation.
- referral reward activation depends on verified transaction rules.
- payment proof metadata comes from backend.
- empty data still respects permission/source checks.
- invalid configuration can block save/publish.
- destructive actions require reason + audit trail.
- backend can deny unauthorized actions.
- exports require permission + masking + validation before download.

The frontend must visually support these rules without pretending to enforce them securely by itself.

---

# Dynamic / fixture values

Do not hardcode:

- `INV•••001`
- `Member •••1`
- N4
- Belajar Mandiri
- invoice amount
- payment-proof file metadata
- access period
- export dataset/file size
- current permission
- editor origin
- exact destructive target

---

# Figma/context notes

## 1. Generic states use specific prototype destinations

Some states are generic patterns but their current Figma prototype returns to one example module:

- Empty state → Analytics
- Validation → Chapter Builder
- Destructive confirmation → Content Library
- Permission denied → Access Settings
- Export → Analytics

Do not assume those destinations are universal.

Use context-aware return destinations when reusing the component.

## 2. Shared login remains authoritative product decision

Layer F correctly provides an Admin redirect state but does not require a separate Admin Login screen.

Keep shared auth.

## 3. Layer G remains necessary

Layer F intentionally stops at generic states/entry dialogs.

The following destinations still need exact operational contracts from **Layer G**:

- access update flow
- invoice verify/reject results
- payment proof preview
- publishing operations
- export operations
- destructive action results
- settings/security actions
- other Admin operation states

Do not invent those exact copies here.

---

# Layer F frontend-first implementation rules

1. Exact visible copy and action labels come from this contract.
2. Visual treatment comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse a small set of Admin state/dialog primitives.
4. Do not create separate routes for compact status frames unless a later route architecture explicitly requires it.
5. Use shared Login; do not add `/admin/login`.
6. Never treat browser-side Admin role state as authorization.
7. User access changes must preserve reason/permission/audit semantics.
8. Payment proof does not equal payment verification.
9. Membership activation happens only after verified invoice flow.
10. Referral reward activation must preserve invoice/referral guards.
11. Destructive actions require explicit confirmation plus context-specific reason/audit semantics.
12. Permission denial must reflect backend rejection later.
13. Exports must preserve permission and masking.
14. Generic state components must use context-aware return destinations.
15. Do not implement Laravel/Sanctum, Postgres, payment verification, real file preview/storage, audit persistence, export generation, role enforcement, or secure authorization during this documentation phase.
16. Continue to Page 11 Layer G before implementing exact Admin operational result states.
