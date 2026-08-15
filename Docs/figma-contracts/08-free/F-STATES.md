# F-STATES — Page 08 / Free Member

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **F — State / Kondisi Sistem**  
> Scope: frontend states that complete flows from Shared A/B and Free Layers C–E.  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.

## Why this layer is included

Layer F is **important**, but it should **not become a collection of new routes/pages**.

Most Page 08 states are compact Figma frames around `720–780px` wide and are best implemented as:

- modal/dialog,
- status overlay,
- inline result/empty/error state,
- or transient confirmation state,

depending on the parent flow.

The goal is to make the frontend feel complete when a user clicks a locked action, finishes an assessment, hits an empty result, completes verification, etc.

Do not create a dedicated Next.js route for every state unless the existing route architecture genuinely requires it.

## State implementation principle

Prefer:

`existing screen → user action → state/modal → close/continue → existing screen`

instead of:

`new route for every state`

This keeps the frontend-first implementation simple and prevents over-engineering.

---

# Priority classification

## MUST IMPLEMENT for client-testable frontend

These materially affect core visible flows:

- Login success / role redirect
- Reset link sent
- Reset link expired
- Account verified
- Placement processing
- Placement error
- Invoice created
- Checkpoint result
- Library empty
- Content locked
- Membership expired
- Chapter lanjutan locked
- Try Out locked
- Community action locked
- Premium feature locked

## SMALL SUPPORTING STATES

These are lightweight confirmation/preview states and should reuse the same state/dialog system:

- Payment verification pending
- Verification code resent
- All notifications read
- Community attachment preview

They are still included because their exact client copy exists in Figma, but they do **not** justify separate architecture.

## Already documented elsewhere

`FREE / STATE R1 — Referral Diterapkan` (`705:2163`) is a **full checkout screen variation**, not a compact modal state.

It is already documented in:

`Docs/figma-contracts/shared/B-SHARED.md`

Do not duplicate its full copy here.

---

# FREE / STATE 01 — Login Success — Entitlement Redirect

**Figma frame:** `389:2227`  
**Recommended frontend form:** transient success dialog / redirect state.

## Exact visible copy

- `Login berhasil`
- `Sistem memeriksa entitlement Free Member, lalu mengarahkan pengguna ke Dashboard Free.`
- `ℹ`
- `Pengumuman`
- `Tujuan dashboard ditentukan backend berdasarkan akses akun.`
- `Buka Dashboard`

## Figma action

- `Buka Dashboard` → `392:566`

## Current product rule

Use the same login UI for all roles.

When real auth exists later, destination depends on authenticated role/entitlement:

- Free → Free Dashboard
- LMS → LMS Dashboard
- Sensei → Sensei Dashboard
- Admin → Admin Dashboard

For frontend-first work, deterministic role fixtures are acceptable.

---

# FREE / STATE 02 — Reset Link Sent

**Figma frame:** `389:2242`  
**Recommended frontend form:** success dialog/state.

## Exact visible copy

- `AUTH • EMAIL SENT`
- `Tautan pemulihan sudah dikirim`
- `Success`
- `郵`
- `Pesan tetap sama untuk email terdaftar maupun tidak terdaftar demi keamanan akun.`
- `Email ditampilkan termasking`
- `Tautan sekali pakai`
- `Masa berlaku dari backend`
- `✓`
- `Pengumuman`
- `Pesan tetap sama untuk email terdaftar maupun tidak terdaftar demi keamanan akun.`
- `Buka Reset Kata Sandi`
- `Kirim Ulang`

## Figma actions

- `Buka Reset Kata Sandi` → `389:1913`
- `Kirim Ulang` → `389:1814`

---

# FREE / STATE 03 — Reset Link Expired

**Figma frame:** `389:2278`  
**Recommended frontend form:** error dialog/state.

## Exact visible copy

- `AUTH • LINK EXPIRED`
- `Tautan reset sudah tidak berlaku`
- `Error`
- `期`
- `Tautan mungkin telah digunakan, melewati masa berlaku, atau dibatalkan oleh sistem.`
- `Tidak ada perubahan akun`
- `Token tidak dapat digunakan ulang`
- `Request baru diperlukan`
- `×`
- `Pengumuman`
- `Tautan mungkin telah digunakan, melewati masa berlaku, atau dibatalkan oleh sistem.`
- `Minta Tautan Baru`
- `Kembali Login`

## Figma actions

- `Minta Tautan Baru` → `389:1814`
- `Kembali Login` → `389:1761`

---

# FREE / STATE 04 — Account Verified

**Figma frame:** `389:2314`  
**Recommended frontend form:** success dialog/state.

## Exact visible copy

- `AUTH • VERIFIED`
- `Akun berhasil diverifikasi`
- `Success`
- `認`
- `Email telah terverifikasi. Akses dashboard tetap mengikuti membership dan entitlement akun.`
- `Email verified`
- `Status tercatat`
- `Akses diperiksa backend`
- `✓`
- `Pengumuman`
- `Email telah terverifikasi. Akses dashboard tetap mengikuti membership dan entitlement akun.`
- `Lanjut ke Login`
- `Kembali`

## Figma actions

- `Lanjut ke Login` → `389:1761`
- `Kembali` → `389:1654`

---

# FREE / STATE 05 — Placement Processing

**Figma frame:** `389:2350`  
**Recommended frontend form:** processing overlay/state on Placement flow.

## Exact visible copy

- `PLACEMENT • PROCESSING`
- `Sedang menganalisis jawaban`
- `Processing`
- `分`
- `Sistem menghitung hasil dan rekomendasi level. Jangan menutup halaman selama proses berlangsung.`
- `Jawaban tersimpan`
- `Analisis level berjalan`
- `Rekomendasi disiapkan`
- `ℹ`
- `Pengumuman`
- `Sistem menghitung hasil dan rekomendasi level. Jangan menutup halaman selama proses berlangsung.`
- `Lihat Hasil`
- `Kembali ke Soal`

## Figma actions

- `Lihat Hasil` → `389:1409`
- `Kembali ke Soal` → `389:1291`

## Frontend-first rule

Use a deterministic loading state. Do not build real placement scoring/backend processing yet.

---

# FREE / STATE 06 — Placement Error

**Figma frame:** `389:2417`  
**Recommended frontend form:** error state/dialog.

## Exact visible copy

- `PLACEMENT • ERROR`
- `Hasil belum dapat diproses`
- `Error`
- `!`
- `Jawaban tetap tersimpan. Coba proses kembali atau periksa koneksi sebelum mengulang.`
- `Attempt tidak hilang`
- `Tidak membuat hasil ganda`
- `Error tercatat backend`
- `×`
- `Pengumuman`
- `Jawaban tetap tersimpan. Coba proses kembali atau periksa koneksi sebelum mengulang.`
- `Coba Lagi`
- `Kembali ke Landing`

## Figma actions

- `Coba Lagi` → `389:1291`
- `Kembali ke Landing` → `389:2`

---

# FREE / STATE 07 — Invoice Created

**Figma frame:** `389:2453`  
**Recommended frontend form:** checkout success dialog/state.

## Exact visible copy

- `CHECKOUT • INVOICE CREATED`
- `Invoice berhasil dibuat`
- `Success`
- `請`
- `Lanjutkan ke detail invoice dan WhatsApp admin. Membership aktif setelah pembayaran diverifikasi.`
- `Nominal dari backend`
- `Status awal menunggu`
- `Referral tervalidasi`
- `✓`
- `Pengumuman`
- `Lanjutkan ke detail invoice dan WhatsApp admin. Membership aktif setelah pembayaran diverifikasi.`
- `Lihat Invoice`
- `Kembali ke Ringkasan`

## Figma actions

- `Lihat Invoice` → `389:2145`
- `Kembali ke Ringkasan` → `389:1982`

## Frontend-first rule

This is presentation-only until payment/backend work begins.

---

# FREE / STATE 08 — Payment Verification Pending

**Figma frame:** `389:2489`  
**Recommended frontend form:** pending status dialog.

## Exact visible copy

- `PAYMENT • PENDING`
- `Pembayaran menunggu verifikasi`
- `Pending`
- `待`
- `Bukti pembayaran telah diterima. Status dan estimasi verifikasi mengikuti antrean admin.`
- `Bukti tersimpan`
- `Belum mengaktifkan membership`
- `Notifikasi dikirim setelah verifikasi`
- `!`
- `Pengumuman`
- `Bukti pembayaran telah diterima. Status dan estimasi verifikasi mengikuti antrean admin.`
- `Kembali ke Invoice`
- `Tutup`

## Figma actions

- `Kembali ke Invoice` → `389:2145`
- `Tutup` → `389:2145`

## Frontend-first priority

Low/secondary. Reuse the generic status dialog system; do not create special architecture for it.

---

# FREE / STATE 09 — Checkpoint Result

**Figma frame:** `392:5258`  
**Recommended frontend form:** assessment result state/dialog or result panel.

## Exact visible copy

- `CHECKPOINT • RESULT`
- `Checkpoint Chapter 4 selesai`
- `Completed`
- `—`
- `Skor`
- `—`
- `Jawaban benar`
- `—`
- `Durasi`
- `Pemahaman materi`
- `Tata Bahasa`
- `Dinamis`
- `Huruf & Kanji`
- `Dinamis`
- `Audio & Reading`
- `Dinamis`
- `REKOMENDASI`
- `Review area dengan confidence rendah sebelum melanjutkan chapter berikutnya. Nilai dan rekomendasi berasal dari backend.`
- `Kembali ke Journey`
- `Ulangi Latihan`

## Figma actions

- `Kembali ke Journey` → `392:1005`
- `Ulangi Latihan` → `392:3311`

## Fixture rule

Score, correct-answer count, duration, area result, and recommendation data must remain deterministic mock/runtime values in frontend-first work.

---

# FREE / STATE 10 — Library Empty

**Figma frame:** `392:5320`  
**Recommended frontend form:** inline empty state inside Perpustakaan.

## Exact visible copy

- `LIBRARY • EMPTY`
- `Belum ada materi pada filter ini`
- `Confirmation`
- `空`
- `Ubah level, kategori, atau kata kunci untuk menemukan materi yang tersedia.`
- `Filter dapat direset`
- `Entitlement tetap diperiksa`
- `Data berasal dari backend`
- `Reset Filter`
- `Kembali`

## Figma actions

- `Reset Filter` → `392:3045`
- `Kembali` → `392:3045`

## Implementation rule

Prefer an inline empty-state component, not a new route.

---

# FREE / STATE 11 — Content Locked

**Figma frame:** `392:5347`  
**Recommended frontend form:** locked-access modal/dialog.

## Exact visible copy

- `CONTENT • LOCKED`
- `Materi belum termasuk dalam aksesmu`
- `Restricted`
- `鍵`
- `Akses mengikuti level dan plan membership. Progress yang sudah tersimpan tidak hilang.`
- `Plan gated`
- `Backend authority`
- `Renewal atau upgrade tersedia`
- `Lihat Membership`
- `Kembali ke Library`

## Figma actions

- `Lihat Membership` → `392:5093`
- `Kembali ke Library` → `392:3045`

---

# FREE / STATE 12 — Membership Expired

**Figma frame:** `392:5374`  
**Recommended frontend form:** membership warning/status modal.

## Exact visible copy

- `MEMBERSHIP • EXPIRED`
- `Periode membership telah berakhir`
- `Restricted`
- `期`
- `Kamu tetap dapat melihat data akun, tetapi akses belajar mengikuti status membership aktif.`
- `Progress tetap tersimpan`
- `Akses dikunci backend`
- `Periode baru dari admin`
- `Perpanjang Membership`
- `Lihat Profil`

## Figma actions

- `Perpanjang Membership` → `392:5093`
- `Lihat Profil` → `392:4908`

---

# FREE / STATE R2 — Chapter Lanjutan Terkunci

**Figma frame:** `725:2226`  
**Recommended frontend form:** locked-access modal.

## Exact visible copy

- `Bayar via WhatsApp`
- `Chapter berikutnya terbuka setelah akses berbayar level ini diverifikasi.`
- `PAYMENT`
- `鍵`
- `Chapter 1 tetap dapat dipelajari. Chapter 2 dan seterusnya terbuka setelah level ini dibeli dan entitlement diverifikasi.`
- `Chapter 1 tetap aktif`
- `Akses dari backend`
- `Beli level kapan saja`
- `Bayar via WhatsApp`
- `Kembali ke Chapter`

## Figma actions

- primary package/payment action → `392:5093`
- `Kembali ke Chapter` → `392:1005`

## Importance

**High.** This is required to make the Free Chapter Journey behave correctly.

Do not navigate Free users into Chapter 2+ content.

---

# FREE / STATE R4 — Try Out Terkunci

**Figma frame:** `753:2182`  
**Recommended frontend form:** locked-access modal or locked Try Out state.

## Exact visible copy

- `Bayar via WhatsApp`
- `Try Out belum termasuk dalam Free Member`
- `PAYMENT`
- `鍵`
- `Try Out tetap terlihat sebagai preview. Buka akses melalui pembayaran via WhatsApp Admin.`
- `Latihan Harian tetap aktif`
- `Try Out backend-driven`
- `Progress tetap aman`
- `Bayar via WhatsApp`
- `Kembali ke Latihan`

## Figma actions

- primary package/payment action → `392:5093`
- `Kembali ke Latihan` → `392:3311`

## Importance

**High.** This is one of the core Free entitlement behaviors.

---

# FREE / STATE R5 — Aksi Komunitas Terkunci

**Figma frame:** `767:2326`  
**Recommended frontend form:** locked-action modal.

## Exact visible copy

- `KOMUNITAS • AKSES BACA`
- `Free Member hanya dapat membaca percakapan`
- `PAYMENT`
- `鍵`
- `Postingan, balasan, dan lampiran terbuka setelah akses berbayar aktif. Pembayaran diarahkan melalui WhatsApp Admin.`
- `Percakapan tetap terlihat`
- `KOMUNITAS • AKSES BACA`
- `Riwayat baca aman`
- `Bayar via WhatsApp`
- `Kembali ke Latihan`

## Figma actions

- primary package/payment action → `392:5093`
- return action → `392:4143` — Community

## Importance

**High.** Required to preserve Free read-only Community behavior.

---

# FREE / STATE R8-01 — Kode Verifikasi Dikirim Ulang

**Figma frame:** `812:2395`  
**Recommended frontend form:** small confirmation modal/toast-like state.

## Exact visible copy

- `AKUN • VERIFIKASI`
- `Kode verifikasi dikirim ulang`
- `Tautan atau kode baru telah dikirim. Masa berlaku kode lama mengikuti aturan backend.`
- `Perubahan dicatat backend dan tidak menghapus progres pengguna.`
- `Kembali ke Verifikasi`
- `Tutup`

## Figma actions

- `Kembali ke Verifikasi` → `389:1654`
- `Tutup` → `389:1654`

## Priority

Secondary. Reuse generic confirmation UI.

---

# FREE / STATE R8-02 — Semua Notifikasi Dibaca

**Figma frame:** `812:2409`  
**Recommended frontend form:** confirmation modal/toast-like state.

## Exact visible copy

- `NOTIFIKASI`
- `Semua notifikasi ditandai sudah dibaca`
- `Status baca telah diperbarui. CTA pada setiap notifikasi tetap dapat dibuka sesuai entitlement.`
- `Perubahan dicatat backend dan tidak menghapus progres pengguna.`
- `Kembali ke Notifikasi`
- `Ke Dashboard`

## Figma actions

- `Kembali ke Notifikasi` → `392:4594`
- `Ke Dashboard` → `392:566`

## Priority

Secondary. Reuse generic confirmation UI.

---

# FREE / STATE R8-03 — Pratinjau Lampiran Community

**Figma frame:** `812:2423`  
**Recommended frontend form:** attachment preview modal.

## Exact visible copy

- `COMMUNITY • READ ONLY`
- `Lampiran dapat dilihat`
- `Free Member dapat melihat lampiran thread, tetapi tetap tidak dapat membalas atau mengunggah konten.`
- `Perubahan dicatat backend dan tidak menghapus progres pengguna.`
- `Kembali ke Thread`
- `Lihat Paket`

## Figma actions

- `Kembali ke Thread` → `392:4363`
- `Lihat Paket` → `392:5093`

## Priority

Secondary but useful for a complete Community read-only demo.

---

# FREE / STATE R3 — Fitur Premium Terkunci

**Figma frame:** `819:6443`  
**Recommended frontend form:** generic premium-access modal.

## Exact visible copy

- `FITUR BERBAYAR • WHATSAPP`
- `Akses ini belum aktif pada Free Member`
- `PAYMENT`
- `鍵`
- `Fitur tetap terlihat sebagai preview. Pilih paket, buat invoice, lalu lanjutkan pembayaran melalui WhatsApp Admin.`
- `Preview tersedia`
- `Akses dari backend`
- `Progress tetap aman`
- `Bayar via WhatsApp`
- `Kembali Dashboard`

## Figma actions

- primary package/payment action → `392:5093`
- `Kembali Dashboard` → `392:566`

## Importance

**High as a reusable fallback.**

Use this generic state for Free premium features that do not have a more specific locked contract.

If a feature has a specific state such as:

- Chapter locked,
- Try Out locked,
- Community action locked,
- Content locked,

prefer the feature-specific state instead of this generic one.

---

# Recommended frontend state architecture

Keep this intentionally small.

A sufficient frontend-first implementation is:

```text
Shared Status Dialog
├── success
├── error
├── processing
├── pending
└── confirmation

Shared Access Dialog
├── generic premium
├── chapter locked
├── try out locked
├── community locked
├── content locked
└── membership expired

Inline State
├── library empty
└── assessment result where appropriate

Attachment Preview
└── community attachment
```

Do not create nineteen independent React modal implementations.

A configurable shared dialog/state component is enough as long as:

- exact copy comes from the relevant contract,
- buttons behave according to the verified flow,
- locked actions do not grant access,
- keyboard/focus/Escape behavior follows the project accessibility rules,
- mobile presentation remains usable.

---

# Layer F frontend-first implementation rules

1. Layer F is important because it defines what happens **between** normal screens.
2. Most states are UI states/modals, not new pages.
3. Reuse shared state/dialog components.
4. Do not create a new route for every state.
5. Exact visible copy comes from this contract.
6. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
7. Locked actions must not navigate into protected content.
8. Free read-only/limited/locked entitlement must remain intact.
9. Backend wording in Figma does not mean Backend must be built now.
10. Use deterministic frontend state for loading, success, error, result, and pending conditions.
11. Do not simulate fake security guarantees; real authority moves to Backend later.
12. `STATE R1 — Referral Diterapkan` stays in `shared/B-SHARED.md` and should not be duplicated.
