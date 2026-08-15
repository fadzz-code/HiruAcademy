# B-SHARED — Account, Login, Recovery, Checkout & Invoice

> Figma source: **Page 08 — E2E / Free Member** (`388:2`)  
> Layer: **B — Akun, Login & Pembelian** (`388:4`)  
> Scope: shared account/auth/commercial frontend baseline.  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Visible copy: **VERIFIED**
- Screen hierarchy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Exact prototype destinations for every clickable element: **PARTIAL / OPEN where not explicitly verified**
- Admin uses the same public Login / recovery UI; do not create a separate Admin login family.
- Admin account creation is not exposed through public registration.
- Role redirect after authentication is a product requirement; real authorization belongs to Backend later.
- Do not paraphrase VERIFIED copy.

---

# Shared Auth Decision

Frontend-first implementation uses one shared authentication family.

## Shared login

The same Login interface is used by:

- Free Member
- LMS / Belajar Mandiri
- LMS + Sensei
- Admin

After authentication:

- Free → Free student dashboard
- LMS → Belajar Mandiri dashboard
- Sensei → Belajar dengan Sensei dashboard
- Admin → Admin dashboard

## Registration

- Public registration is for eligible student/customer accounts.
- Do not expose public `Register as Admin`.
- Admin accounts are provisioned internally later.

## Latest client override — manual enrollment flow

This latest product decision overrides Verification Email as a mandatory customer journey while retaining its Figma frame below as historical/deferred reference.

- Account and paid entitlement are separate states.
- Every Student account receives baseline Free entitlement.
- Free registration activates baseline Free and continues directly to the Free dashboard.
- Belajar Mandiri and Belajar dengan Sensei registration creates an active Student account with baseline Free active and paid entitlement pending.
- Paid registration continues through Checkout → Invoice → WhatsApp Admin → Admin transaction verification.
- Frontend must not activate paid entitlement. Paid entitlement becomes active only after Backend/Admin verification.
- `FREE / 11 — Verifikasi Akun` is deferred and must not block active registration or be implemented as an active mandatory route.

## Important copy conflict

The active Figma Login frame currently contains:

`Akses setelah login mengikuti Free, LMS, atau LMS + Zoom pada akun.`

This exact Figma copy does not mention Admin, while the current product decision uses the same Login interface for Admin.

Do **not** silently rewrite this sentence during implementation.

Status for this one sentence: **OPEN — requires client/Figma copy alignment if the same message remains visible to Admin users.**

---

# FREE / 10 — Register + Referral

**Figma frame:** `389:1528`  
**Top-level structure:** Public Header → Register Main

## Exact visible copy

### Intro / supporting flow

- `Daftar dan simpan rekomendasi`
- `Simpan hasil dan mulai perjalananmu`
- `Target ujian dapat diubah. Kode referral bersifat opsional dan divalidasi sebelum invoice dibuat.`
- `Akun digunakan untuk progres, entitlement, invoice, community, dan rekomendasi belajar.`

### Step 01

- `01`
- `Buat akun`
- `Isi data dasar dan preferensi belajar.`

### Step 02

- `02`
- `Konfirmasi target & program`
- `Target ujian, level, dan plan dapat diperiksa kembali.`

### Step 03

- `03`
- `Hubungi admin`
- `Selesaikan verifikasi invoice melalui WhatsApp.`

### Registration fields

#### Nama

- `Nama Lengkap`
- `Masukkan nama lengkap`
- `Teks bantuan opsional`

#### Email

- `Email`
- `contoh@email.com`
- `Teks bantuan opsional`

#### WhatsApp

- `Nomor WhatsApp`
- `+62 8xx xxxx xxxx`
- `Teks bantuan opsional`

#### Password

- `Kata Sandi`
- `Minimal 8 karakter`
- `Teks bantuan opsional`

#### Target

- `Target Ujian`
- `N4`
- `⌄`

#### Cara belajar

- `Cara Belajar`
- `Belajar Mandiri`
- `⌄`

### Placement recommendation notice

- `Rekomendasi Placement: N4 • Target ujian tetap dapat disesuaikan oleh pengguna.`

### Referral

- `Kode Referral (Opsional)`
- `Masukkan kode referral`
- `Opsional • divalidasi backend`
- `Kode valid memberi diskon pada pembelian ini. Pemilik kode menerima reward diskon setelah invoice diverifikasi Admin.`

### Progress notice

- `Progres placement dan rekomendasi level akan disimpan pada akun.`

### Actions

- `Buat Akun & Lanjut`
- `Kembali ke Program`

## Frontend-first rule

Use deterministic form state only when needed for the current screen flow. Do not implement real referral validation, account persistence, invoice activation, or WhatsApp integration during a copy/layout task.

---

# FREE / 11 — Verifikasi Akun

**Lifecycle:** HISTORICAL / DEFERRED — not part of the active customer registration journey under the latest client manual-enrollment decision. Do not use this screen as a blocking route.

**Figma frame:** `389:1654`  
**Top-level structure:** Auth Visual Panel → Auth Form Panel

## Exact visible copy

### Form panel

- `VERIFIKASI EMAIL`
- `Masukkan kode verifikasi`
- `Kode dikirim ke m•••@example.com. Alamat ditampilkan termasking dan masa berlaku mengikuti backend.`
- `KODE VERIFIKASI`
- `•`
- `—`
- `—`
- `—`
- `—`
- `—`
- `Belum menerima kode?`
- `Kirim Ulang`
- `Kirim ulang tersedia setelah timer dari backend selesai.`
- `Verifikasi Akun`
- `Ubah Email`

### Visual panel

- `う`
- `い`
- `あ`
- `VERIFIKASI AKUN`
- `Satu langkah lagi menuju dashboard belajar`
- `Masukkan kode yang dikirim ke email untuk memastikan akun benar-benar milikmu.`
- `あ`
- `い`
- `う`
- `え`
- `お`

### Announcement

- `Pengumuman`
- `Jangan membagikan kode verifikasi. Percobaan dan cooldown diperiksa oleh backend.`

## Frontend-first rule

Verification Email is historical/deferred under latest manual-enrollment decision and is not an active customer route. Do not create fake security guarantees in frontend code.

---

# FREE / 12 — Login

**Figma frame:** `389:1761`  
**Top-level structure:** Login Main

## Exact visible copy

### Supporting panel

- `Kembali ke perjalanan belajarmu`
- `Dashboard yang dibuka setelah login mengikuti membership dan entitlement akun.`
- `あ`
- `い`
- `う`
- `え`
- `お`

### Login form

- `Masuk ke Hiru Academy`
- `Gunakan email atau nomor WhatsApp dan kata sandi yang terhubung dengan membership-mu.`

#### Identity

- `Email / WhatsApp`
- `email atau nomor WhatsApp`
- `Teks bantuan opsional`

#### Password

- `Kata Sandi`
- `Masukkan kata sandi`
- `Teks bantuan opsional`

### Recovery / actions

- `Lupa kata sandi? Gunakan alur pemulihan akun.`
- `Masuk`
- `Belum punya akun? Daftar`

### Announcement

- `Pengumuman`
- `Akses setelah login mengikuti Free, LMS, atau LMS + Zoom pada akun.`

## Shared-login implementation rule

- Reuse this Login UI for student and Admin authentication.
- Do not create `/admin/login` as a separate design family.
- For frontend-first demo behavior, deterministic role fixtures may be used.
- Real role identity and redirect authority belong to Backend later.
- The announcement sentence that omits Admin is **OPEN COPY CONFLICT** as documented above.

---

# FREE / 13 — Lupa Kata Sandi

**Figma frame:** `389:1814`  
**Top-level structure:** Auth Visual Panel → Auth Form Panel

## Exact visible copy

### Form panel

- `LUPA KATA SANDI`
- `Pulihkan akses akunmu`
- `Masukkan email akun. Demi keamanan, hasil pengiriman menggunakan pesan yang sama untuk email terdaftar maupun tidak terdaftar.`

#### Email

- `Email`
- `contoh@email.com`
- `Teks bantuan opsional`

### Security notice

- `Tautan bersifat sekali pakai dan memiliki masa berlaku yang ditentukan backend.`
- `鍵`

### Actions

- `Kirim Tautan Reset`
- `Kembali ke Login`

### Visual panel

- `う`
- `い`
- `あ`
- `PEMULIHAN AKUN`
- `Tenang, perjalanan belajarmu tetap tersimpan`
- `Kami akan mengirimkan tautan pemulihan ke email yang terhubung dengan akun.`
- `あ`
- `い`
- `う`
- `え`
- `お`

### Announcement

- `ℹ`
- `Pengumuman`
- `Periksa inbox dan folder spam. Jangan pernah membagikan tautan reset kepada siapa pun.`

---

# FREE / 14 — Reset Kata Sandi

**Figma frame:** `389:1913`  
**Top-level structure:** Auth Visual Panel → Auth Form Panel

## Exact visible copy

### Visual panel

- `KEAMANAN AKUN`
- `Buat kata sandi baru yang lebih kuat`
- `Gunakan kombinasi yang unik dan tidak digunakan pada layanan lain.`
- `あ`
- `い`
- `う`
- `え`
- `お`

### Form panel

- `RESET KATA SANDI`
- `Tetapkan kata sandi baru`
- `Tautan reset dan identitas akun diperiksa oleh backend sebelum perubahan disimpan.`

#### New password

- `Kata Sandi Baru`
- `Masukkan kata sandi baru`
- `Teks bantuan opsional`

#### Confirmation

- `Konfirmasi Kata Sandi`
- `Ulangi kata sandi baru`
- `Teks bantuan opsional`

### Password strength

- `KEKUATAN KATA SANDI`
- `✓ Minimal 8 karakter`
- `✓ Huruf besar & kecil`
- `✓ Angka`
- `✓ Simbol disarankan`

### Actions

- `Simpan Kata Sandi`
- `Kirim Ulang Tautan`

### Announcement

- `✓`
- `Pengumuman`
- `Setelah berhasil, sesi lama dapat dihentikan dan kamu perlu login kembali.`

## Important

The password requirements above are visible Figma copy. Backend security policy remains authoritative later; do not treat frontend-only validation as security enforcement.

---

# FREE / 15 — Checkout & Order Summary

**Figma frame:** `389:1982`  
**Top-level structure:** Public Header → Checkout Main → Public Footer

## Exact visible copy

### Breadcrumb / intro

- `Program & Level`
- `→`
- `Order Summary`
- `Periksa pilihan sebelum membuat invoice`
- `Harga, periode, benefit, dan entitlement berasal dari konfigurasi admin setelah level dan plan dipilih.`

### Active selection

- `JLPT N4`
- `Pilihan Aktif`
- `Ubah Pilihan`
- `四`
- `Belajar Mandiri`

#### Benefits

- `章`
- `Journey penuh`
- `Chapter, latihan, checkpoint.`

- `試`
- `Try Out & Review`
- `Runner, hasil, dan review.`

- `話`
- `Community write`
- `Akses diskusi member.`

### Referral

- `Kode referral untuk diskon (opsional)`
- `Pengguna baru mendapat diskon. Reward pemilik kode aktif setelah pembayaran diverifikasi Admin.`
- `Kode Referral`
- `Masukkan kode jika ada`
- `Terapkan`
- `Teks bantuan opsional`

### Order summary

- `Ringkasan pesanan`
- `Program`
- `JLPT N4`
- `Plan`
- `Belajar Mandiri`
- `Periode`
- `Dinamis dari admin`
- `Harga`
- `Dinamis setelah pilihan`
- `Referral`
- `Belum diterapkan`
- `TOTAL`
- `Mengikuti harga aktif di backend`

### Before invoice

- `SEBELUM MEMBUAT INVOICE`
- `Pilihan level dan plan sudah benar`
- `Harga dan periode mengikuti konfigurasi aktif`
- `Membership aktif setelah invoice diverifikasi admin`
- `Ketentuan pembelian dan privacy telah dibaca`

### Primary action

- `Buat Invoice & Buka WhatsApp`

### Announcement

- `ℹ`
- `Pengumuman`
- `Invoice dibuat sebagai pencatatan backend, lalu pembayaran dilanjutkan melalui WhatsApp Admin.`

## Frontend-first rule

Do not invent prices, periods, discounts, bank details, Admin phone numbers, invoice IDs, or activation behavior. Use presentation/mock state only until Backend/commercial integration is explicitly started.

---

# FREE / STATE R1 — Referral Diterapkan

**Figma frame:** `705:2163`  
**Top-level structure:** Public Header → Checkout Main → Public Footer

This state is a variation of `FREE / 15 — Checkout & Order Summary`.

## Exact visible copy that changes / matters for this state

### Referral applied

- `Kode referral diterapkan`
- `Kode valid memberi diskon pada pembelian ini. Pemilik kode menerima reward setelah invoice diverifikasi.`
- `Kode Referral`
- `HIRU-N4-2026`
- `Diterapkan`
- `Kode valid • diskon aktif`

### Summary state

- `Referral`
- `Valid • diskon aktif`
- `Harga`
- `Harga sebelum diskon`
- `TOTAL`
- `Harga aktif − diskon referral`
- `Nilai final dihitung backend`

### Action

- `Buat Invoice`

### Announcement

- `ℹ`
- `Pengumuman`
- `Reward pemilik kode aktif setelah pembayaran invoice ini diverifikasi Admin.`

## Shared unchanged copy

The rest of the visible checkout structure matches the Checkout/Order Summary contract above, including:

- `Program & Level`
- `Order Summary`
- `Periksa pilihan sebelum membuat invoice`
- `JLPT N4`
- `Belajar Mandiri`
- benefit cards
- `SEBELUM MEMBUAT INVOICE`
- shared public header/footer

---

# FREE / 16 — Invoice + WhatsApp

**Figma frame:** `389:2145`  
**Top-level structure:** Public Header → Invoice Main

## Exact visible copy

### Status / intro

- `INVOICE BERHASIL DIBUAT`
- `Menunggu Verifikasi`
- `Selesaikan verifikasi melalui WhatsApp Admin`
- `Nomor admin, detail rekening, nominal final, dan proses aktivasi berasal dari konfigurasi backend.`

### Detail Pesanan

- `Detail Pesanan`

- `Invoice ID`
- `Dibuat otomatis oleh sistem`

- `Level`
- `N4`

- `Program`
- `Belajar Mandiri`

- `Harga`
- `Harga sebelum diskon dari backend`

- `Referral`
- `Kode valid • diskon diterapkan`

- `Total`
- `Nominal final setelah diskon dari backend`

- `Status`
- `Menunggu verifikasi`

### Verification steps

#### Step 1

- `1`
- `Buka WhatsApp`
- `Gunakan nomor admin dari sistem.`

#### Step 2

- `2`
- `Terima instruksi`
- `Admin mengirim detail pembayaran.`

#### Step 3

- `3`
- `Verifikasi`
- `Membership aktif setelah transaksi diverifikasi.`

### Actions

- `Buka WhatsApp Admin`
- `Kembali ke Program`

### Backend notice

- `Aksi WhatsApp akan menggunakan nomor dan template pesan dari backend; tidak ada nomor placeholder pada desain.`

### Announcement

- `!`
- `Pengumuman`
- `Membership dan reward referral belum aktif sampai transaksi diverifikasi oleh Admin.`

## Frontend-first rule

For current frontend work:

- show the designed state using deterministic mock values where needed;
- do not hardcode a fake Admin WhatsApp number;
- do not activate membership from the browser;
- do not build real payment verification yet.

---

# Layer B implementation rule

When implementing any screen covered by this contract:

1. Use this contract for exact visible copy and hierarchy.
2. Use `Docs/RefrensiHTML/DESIGN.md` for visual styling.
3. Reuse one shared auth family.
4. Reuse one shared public header/footer family.
5. Admin uses the same Login/recovery family; no public Admin registration.
6. Do not invent Backend behavior during frontend-first tasks.
7. Do not invent price, period, referral value, WhatsApp number, invoice ID, or payment status.
8. Keep fixture values deterministic.
9. If copy conflicts with a newer client decision, mark that exact item OPEN and resolve it instead of silently paraphrasing.
