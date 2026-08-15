# F-STATUS-SYSTEM — Page 09 / Belajar Mandiri

> Figma source: **Page 09 — E2E / Belajar Mandiri** (`388:9`)  
> Layer: **F — Status Sistem** (`388:15`)  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: every quoted visible string below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- Dynamic/backend-owned behavior: documented exactly as stated by Figma; do not simulate it as production authority.
- Do not paraphrase VERIFIED copy.
- Do not invent missing numbered conditions.
- Do not add backend/API/payment/storage/moderation implementation while working only on this frontend contract.

## Important numbering facts from active Figma

The active Layer F contains **33 top-level status frames**.

Numbering is intentionally/non-sequentially present in the source:

- Conditions `01–10`
- no top-level frame named `KONDISI 11`
- Conditions `12–14`
- no top-level frames named `KONDISI 15` or `KONDISI 16`
- Conditions `17–18`
- revision/state families `R2`, `R4-01` through `R4-05`, `R5`, `R6-01` through `R6-02`, and `R8-01` through `R8-08`

There are also **two different frames whose names contain `KONDISI R5`**:

- `405:7420` — `LMS / KONDISI R5 — Feedback Terkirim`
- `763:3244` — `LMS / KONDISI R5 — Level Selesai`

Do not rename, renumber, merge, or invent screens silently. Use node IDs to disambiguate.

---

# Frame inventory

| Figma frame | Screen |
|---|---|
| `390:2227` | LMS / KONDISI 01 — Login Berhasil — Pengalihan Hak Akses |
| `390:2242` | LMS / KONDISI 02 — Tautan Reset Terkirim |
| `390:2278` | LMS / KONDISI 03 — Tautan Reset Kedaluwarsa |
| `390:2314` | LMS / KONDISI 04 — Akun Terverifikasi |
| `390:2350` | LMS / KONDISI 05 — Placement Diproses |
| `390:2417` | LMS / KONDISI 06 — Kesalahan Placement |
| `390:2453` | LMS / KONDISI 07 — Invoice Dibuat |
| `390:2489` | LMS / KONDISI 08 — Menunggu Verifikasi Pembayaran |
| `405:7322` | LMS / KONDISI 09 — Hasil Checkpoint |
| `405:7382` | LMS / KONDISI 10 — Formulir Postingan Komunitas |
| `405:7420` | LMS / KONDISI R5 — Feedback Terkirim |
| `405:7441` | LMS / KONDISI 12 — Perpustakaan Kosong |
| `405:7468` | LMS / KONDISI 13 — Konten Terkunci |
| `405:7495` | LMS / KONDISI 14 — Keanggotaan Kedaluwarsa |
| `405:7576` | LMS / KONDISI 17 — Sertifikat Belum Tersedia |
| `405:7603` | LMS / KONDISI 18 — Laporan Komunitas Terkirim |
| `729:3333` | LMS / KONDISI R2 — Level Belum Dibeli |
| `750:3323` | LMS / KONDISI R4-01 — Akses Try Out Terkunci |
| `750:3349` | LMS / KONDISI R4-02 — Try Out Belum Dimulai |
| `750:3375` | LMS / KONDISI R4-03 — Percobaan Habis |
| `750:3401` | LMS / KONDISI R4-04 — Waktu Habis & Auto-submit |
| `750:3427` | LMS / KONDISI R4-05 — Ulasan Tidak Tersedia |
| `763:3244` | LMS / KONDISI R5 — Level Selesai |
| `813:3090` | LMS / KONDISI R8-01 — Kode Verifikasi Dikirim Ulang |
| `813:3104` | LMS / KONDISI R8-02 — Semua Notifikasi Dibaca |
| `813:3118` | LMS / KONDISI R8-03 — Pratinjau Lampiran Community |
| `813:3132` | LMS / KONDISI R8-04 — Balasan Community Terkirim |
| `813:3146` | LMS / KONDISI R8-05 — Gambar Ditambahkan |
| `813:3160` | LMS / KONDISI R8-06 — Sertifikat Diunduh |
| `813:3174` | LMS / KONDISI R8-07 — Sertifikat Siap Dibagikan |
| `813:3188` | LMS / KONDISI R8-08 — Verifikasi Sertifikat |
| `784:3247` | LMS / KONDISI R6-01 — Kode Referral Disalin |
| `784:3259` | LMS / KONDISI R6-02 — Bagikan Referral |

---

# Shared status-screen implementation rule

These screens are **states**, not a reason to create 33 unrelated page systems.

During frontend implementation:

- preserve the exact content and action destinations below;
- reuse a small shared status/confirmation presentation where the verified layout permits;
- keep each state addressable by its own deterministic configuration;
- do not collapse materially different flows such as Try Out timeout, membership expiry, certificate eligibility, and community submission into one generic business rule;
- visual styling comes from `Docs/RefrensiHTML/DESIGN.md`;
- real entitlement, token validity, autosave, payment verification, certificate verification, notification state, file permissions, moderation, and referral rules remain backend-owned later.

---

# KONDISI 01 — Login Berhasil — Pengalihan Hak Akses

**Figma frame:** `390:2227`

## Exact visible copy

- `Login berhasil`
- `Sistem memeriksa entitlement Belajar Mandiri, lalu mengarahkan pengguna ke Dashboard LMS.`
- `ℹ`
- `Pengumuman`
- `Tujuan dashboard ditentukan backend berdasarkan akses akun.`
- `Buka Dashboard`

## Action

- `Buka Dashboard` → `405:566` — Dashboard LMS

## Rule

The visible copy explicitly says dashboard routing is determined from backend entitlement. In the current frontend-only phase, any membership preview remains a deterministic mock and must not be represented as secure authorization.

---

# KONDISI 02 — Tautan Reset Terkirim

**Figma frame:** `390:2242`

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

## Actions

- `Buka Reset Kata Sandi` → `390:1913`
- `Kirim Ulang` → `390:1814`

## Security rule from Figma

The response must not disclose whether an email is registered. Token one-time use and expiry are backend-owned.

---

# KONDISI 03 — Tautan Reset Kedaluwarsa

**Figma frame:** `390:2278`

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

## Actions

- `Minta Tautan Baru` → `390:1814`
- `Kembali Login` → `390:1761`

---

# KONDISI 04 — Akun Terverifikasi

**Figma frame:** `390:2314`

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

## Actions

- `Lanjut ke Login` → `390:1761`
- `Kembali` → `390:1654`

## Entitlement rule

Account verification does not itself grant LMS access. Membership and entitlement remain separate.

---

# KONDISI 05 — Placement Diproses

**Figma frame:** `390:2350`

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

## Actions

- `Lihat Hasil` → `390:1409`
- `Kembali ke Soal` → `390:1291`

## Rule

Actual result calculation and persistence are not browser authority.

---

# KONDISI 06 — Kesalahan Placement

**Figma frame:** `390:2417`

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

## Actions

- `Coba Lagi` → `390:1291`
- `Kembali ke Landing` → `390:2`

## Rule

The copy requires retry behavior that does not duplicate results or lose attempts. Real idempotency belongs to backend implementation later.

---

# KONDISI 07 — Invoice Dibuat

**Figma frame:** `390:2453`

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

## Actions

- `Lihat Invoice` → `390:2145`
- `Kembali ke Ringkasan` → `390:1982`

## Commercial rule

Do not invent nominal, WhatsApp number, invoice data, referral discount, payment method, or activation behavior. Membership activation occurs only after verification according to the Figma copy.

---

# KONDISI 08 — Menunggu Verifikasi Pembayaran

**Figma frame:** `390:2489`

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

## Actions

- `Kembali ke Invoice` → `390:2145`
- `Tutup` → `390:2145`

## Rule

Pending payment must not activate membership in the frontend.

---

# KONDISI 09 — Hasil Checkpoint

**Figma frame:** `405:7322`

## Exact visible copy

### Header

- `CHECKPOINT • RESULT`
- `Checkpoint Chapter 4 selesai`
- `Completed`

### Metrics

- `—`
- `Skor`
- `—`
- `Jawaban benar`
- `—`
- `Durasi`

### Breakdown

- `Pemahaman materi`
- `Tata Bahasa`
- `Dinamis`
- `Huruf & Kanji`
- `Dinamis`
- `Audio & Reading`
- `Dinamis`

### Recommendation

- `REKOMENDASI`
- `Review area dengan confidence rendah sebelum melanjutkan chapter berikutnya. Nilai dan rekomendasi berasal dari backend.`

### Actions

- `Kembali ke Journey`
- `Ulangi Latihan`

Destinations:

- `Kembali ke Journey` → `405:1005`
- `Ulangi Latihan` → `405:3045`

## Dynamic values

Score, correct answers, duration, breakdown, Chapter number, and recommendation are backend-driven fixtures. Preserve `—` and `Dinamis` where the Figma intentionally avoids inventing final values.

---

# KONDISI 10 — Formulir Postingan Komunitas

**Figma frame:** `405:7382`

## Exact visible copy

- `BUAT POSTINGAN`
- `Bagikan pertanyaan atau pengalaman belajar`
- `Kategori`
- `Diskusi Member`
- `⌄`
- `Judul`
- `Tulis judul postingan`
- `Teks bantuan opsional`
- `◇`
- `Ringkasan`
- `Postingan mengikuti aturan komunitas dan dapat melalui moderasi.`
- `Publikasikan`
- `Batal`

## Actions

- `Publikasikan` → `405:5289`
- `Batal` → `405:5289`

## Community rule

Belajar Mandiri has community write entitlement, but persistence/moderation remains backend-owned.

---

# KONDISI R5 — Feedback Terkirim

**Figma frame:** `405:7420`

## Exact visible copy

- `PERTANYAAN TERKIRIM`
- `Feedback berhasil disimpan`
- `✓`
- `Pengumuman`
- `Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`
- `TOPIK`
- `Evaluasi akhir level tersimpan`
- `Status, Sensei yang menangani, dan waktu respons diperbarui melalui backend.`
- `Lihat Progres`

## Action

The clickable prototype node is named `Tombol / Kembali Umpan Balik`, but its **visible label is** `Lihat Progres`.

- `Lihat Progres` → `405:4744`

## Visible-copy inconsistency — preserve, do not silently fix

This Figma state is named **Feedback Terkirim**, but visible copy also contains:

- `PERTANYAAN TERKIRIM`
- `Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`
- `Status, Sensei yang menangani, dan waktu respons diperbarui melalui backend.`

These strings appear verbatim in the active Figma. They look semantically closer to a question/Ask Sensei state than level feedback. Because copy authority is Figma, **do not rewrite them in implementation without an explicit client/Figma revision**. Mark this as a review item if the client later asks for semantic correction.

---

# KONDISI 12 — Perpustakaan Kosong

**Figma frame:** `405:7441`

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

## Actions

- `Reset Filter` → `405:4478`
- `Kembali` → `405:4478`

## Rule

An empty filter result does not bypass entitlement checks.

---

# KONDISI 13 — Konten Terkunci

**Figma frame:** `405:7468`

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

## Actions

- `Lihat Membership` → `405:7157`
- `Kembali ke Library` → `405:4478`

## Entitlement rule

A Belajar Mandiri user can still encounter locked material due to level or item entitlement. Do not model all LMS library content as globally unlocked.

---

# KONDISI 14 — Keanggotaan Kedaluwarsa

**Figma frame:** `405:7495`

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

## Actions

- `Perpanjang Membership` → `405:7157`
- `Lihat Profil` → `405:6972`

## Rule

Expired membership preserves account/progress presentation while learning access follows backend status.

---

# KONDISI 17 — Sertifikat Belum Tersedia

**Figma frame:** `405:7576`

## Exact visible copy

- `CERTIFICATE • UNAVAILABLE`
- `Sertifikat belum dapat diterbitkan`
- `Restricted`
- `証`
- `Selesaikan seluruh eligibility yang ditentukan program sebelum sertifikat digital tersedia.`
- `Journey belum lengkap`
- `Assessment perlu valid`
- `Issue oleh backend`
- `Lihat Kriteria`
- `Kembali`

## Actions

- `Lihat Kriteria` → `405:5963`
- `Kembali` → `405:5963`

## Rule

Certificate issuance is not a client-side achievement toggle. Journey completion, assessment validity, and issuance remain authoritative backend data later.

---

# KONDISI 18 — Laporan Komunitas Terkirim

**Figma frame:** `405:7603`

## Exact visible copy

- `COMMUNITY • REPORTED`
- `Laporan berhasil dikirim`
- `Success`
- `報`
- `Moderator akan meninjau konten dan alasan laporan. Status penanganan tidak selalu ditampilkan.`
- `Laporan tercatat`
- `Identitas dilindungi`
- `Moderasi mengikuti policy`
- `Kembali ke Community`
- `Tutup`

## Actions

- `Kembali ke Community` → `405:5289`
- `Tutup` → `405:5289`

## Rule

Do not expose reporter identity or invent moderation outcome/status in the frontend.

---

# KONDISI R2 — Level Belum Dibeli

**Figma frame:** `729:3333`

## Exact visible copy

- `LEVEL • BELUM DIBELI`
- `Level ini belum aktif pada akunmu`
- `Belum Aktif`
- `鍵`
- `Pembelian level tidak harus berurutan. Kamu dapat membeli level ini kapan saja tanpa menyelesaikan level lain terlebih dahulu.`
- `Level independen`
- `Akses dari backend`
- `Progress level lain aman`
- `Beli Level Ini`
- `Kembali ke Level`

## Actions

- `Beli Level Ini` → `405:7157`
- `Kembali ke Level` → `405:785`

## Critical LMS rule

Purchased levels are **independent**, not sequential prerequisites. Do not force N5 → N4 → N3 purchase order.

---

# KONDISI R4-01 — Akses Try Out Terkunci

**Figma frame:** `750:3323`

## Exact visible copy

- `TRY OUT • AKSES TERKUNCI`
- `Try Out ini belum tersedia untuk akunmu`
- `Belum Aktif`
- `鍵`
- `Akses mengikuti plan, level, tanggal, dan prerequisite Chapter yang dikonfigurasi Admin.`
- `Aturan backend`
- `Level spesifik`
- `Progress aman`
- `Lihat Paket Level`
- `Kembali ke Try Out`

## Actions

- `Lihat Paket Level` → `405:7157`
- `Kembali ke Try Out` → `405:3332`

## Rule

Try Out access is not only membership-tier based. It may depend on plan, purchased level, date, and configured Chapter prerequisite.

---

# KONDISI R4-02 — Try Out Belum Dimulai

**Figma frame:** `750:3349`

## Exact visible copy

- `TRY OUT • BELUM DIMULAI`
- `Jadwal Try Out belum aktif`
- `Belum Aktif`
- `鍵`
- `Try Out akan terbuka otomatis sesuai tanggal mulai yang ditetapkan Admin.`
- `Jadwal backend`
- `Tidak mengurangi attempt`
- `Pengingat tersedia`
- `Kembali ke Daftar`
- `Kembali Dashboard`

## Actions

- `Kembali ke Daftar` → `405:3332`
- `Kembali Dashboard` → `405:566`

## Rule

Viewing a scheduled/not-yet-open Try Out does not consume an attempt.

---

# KONDISI R4-03 — Percobaan Habis

**Figma frame:** `750:3375`

## Exact visible copy

- `TRY OUT • ATTEMPT HABIS`
- `Seluruh percobaan sudah digunakan`
- `Belum Aktif`
- `鍵`
- `Admin menentukan jumlah attempt dan kemungkinan reset. Hasil terakhir tetap tersimpan.`
- `Attempt tercatat`
- `Hasil tersimpan`
- `Reset oleh Admin`
- `Lihat Hasil Terakhir`
- `Kembali ke Daftar`

## Actions

- `Lihat Hasil Terakhir` → `405:4049`
- `Kembali ke Daftar` → `405:3332`

## Rule

Attempt counts and reset authority are backend/Admin configuration, not hardcoded frontend rules.

---

# KONDISI R4-04 — Waktu Habis & Auto-submit

**Figma frame:** `750:3401`

## Exact visible copy

- `TRY OUT • WAKTU HABIS`
- `Jawaban otomatis dikirim`
- `Belum Aktif`
- `鍵`
- `Saat timer berakhir, jawaban yang tersimpan dikirim otomatis dan pengguna dapat membuka hasil.`
- `Autosave aktif`
- `Auto-submit`
- `Attempt tercatat`
- `Lihat Hasil`
- `Kembali ke Daftar`

## Actions

- `Lihat Hasil` → `405:4049`
- `Kembali ke Daftar` → `405:3332`

## Rule

The frontend prototype may reproduce the visual state, but real timer authority, autosave, submission, and attempt accounting belong to the server later.

---

# KONDISI R4-05 — Ulasan Tidak Tersedia

**Figma frame:** `750:3427`

## Exact visible copy

- `ULASAN • DINONAKTIFKAN`
- `Ulasan jawaban belum tersedia`
- `Belum Aktif`
- `鍵`
- `Admin dapat mengaktifkan atau menonaktifkan review per Try Out. Nilai dan hasil tetap tersimpan.`
- `Aturan per Try Out`
- `Nilai tersimpan`
- `Backend authority`
- `Kembali ke Hasil`
- `Kembali ke Daftar`

## Actions

- `Kembali ke Hasil` → `405:4049`
- `Kembali ke Daftar` → `405:3332`

## Rule

Do not expose answer review merely because a result exists.

---

# KONDISI R5 — Level Selesai

**Figma frame:** `763:3244`

## Exact visible copy

- `LEVEL SELESAI • FEEDBACK`
- `Selamat, seluruh Chapter pada level ini selesai`
- `Belum Aktif`
- `鍵`
- `Feedback akhir level tersedia setelah Chapter terakhir. Berikan rating, masukan, dan izin testimoni secara opsional.`
- `LEVEL SELESAI • FEEDBACK`
- `Nilai tersimpan`
- `Backend authority`
- `Berikan Feedback`
- `Lihat Progres`

## Actions

- `Berikan Feedback` → `405:5740`
- `Lihat Progres` → `405:4744`

## Trigger rule

The feedback invitation becomes available after the last Chapter of the active level is completed. Actual completion remains backend-authoritative later.

---

# KONDISI R8-01 — Kode Verifikasi Dikirim Ulang

**Figma frame:** `813:3090`

## Exact visible copy

- `AKUN • VERIFIKASI`
- `Kode verifikasi dikirim ulang`
- `Kode baru dikirim dan masa berlaku mengikuti aturan backend.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Verifikasi`
- `Tutup`

## Actions

- `Kembali ke Verifikasi` → `390:1654`
- `Tutup` → `390:1654`

---

# KONDISI R8-02 — Semua Notifikasi Dibaca

**Figma frame:** `813:3104`

## Exact visible copy

- `NOTIFIKASI`
- `Semua notifikasi ditandai sudah dibaca`
- `Status baca diperbarui tanpa mengubah destination CTA.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Notifikasi`
- `Ke Dashboard`

## Actions

- `Kembali ke Notifikasi` → `405:6658`
- `Ke Dashboard` → `405:566`

## Rule

Marking all notifications as read changes read state only; it must not mutate the notification CTA destination.

---

# KONDISI R8-03 — Pratinjau Lampiran Community

**Figma frame:** `813:3118`

## Exact visible copy

- `COMMUNITY`
- `Lampiran thread dibuka`
- `Lampiran dapat dilihat sesuai permission dan tetap terhubung dengan thread asal.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `405:5509`
- `Ke Community` → `405:5289`

## Rule

File access follows permission; do not invent direct public storage URLs.

---

# KONDISI R8-04 — Balasan Community Terkirim

**Figma frame:** `813:3132`

## Exact visible copy

- `COMMUNITY`
- `Balasan berhasil dikirim`
- `Balasan tersimpan pada thread dan dapat dimoderasi Admin.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `405:5509`
- `Ke Community` → `405:5289`

---

# KONDISI R8-05 — Gambar Ditambahkan

**Figma frame:** `813:3146`

## Exact visible copy

- `COMMUNITY`
- `Gambar berhasil ditambahkan`
- `File mengikuti batas ukuran, tipe media, dan moderasi backend.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `405:5509`
- `Ke Community` → `405:5289`

## OPEN values

Do not invent final maximum file size, MIME/type allowlist, image dimensions, storage path, or moderation limits.

---

# KONDISI R8-06 — Sertifikat Diunduh

**Figma frame:** `813:3160`

## Exact visible copy

- `SERTIFIKAT`
- `Sertifikat siap diunduh`
- `File sertifikat berasal dari versi terbit dan ID verifikasi tetap tercatat.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `405:6196`
- `Ke Profil` → `405:6972`

---

# KONDISI R8-07 — Sertifikat Siap Dibagikan

**Figma frame:** `813:3174`

## Exact visible copy

- `SERTIFIKAT`
- `Tautan sertifikat siap dibagikan`
- `Tautan publik menggunakan ID verifikasi dan tidak membuka data akun sensitif.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `405:6196`
- `Ke Profil` → `405:6972`

## Privacy rule

The share URL must not expose sensitive account data.

---

# KONDISI R8-08 — Verifikasi Sertifikat

**Figma frame:** `813:3188`

## Exact visible copy

- `SERTIFIKAT`
- `Sertifikat valid`
- `Nomor sertifikat, pemilik, level, dan tanggal terbit cocok dengan data backend.`
- `Perubahan dicatat backend dan mengikuti entitlement pengguna.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `405:6196`
- `Ke Profil` → `405:6972`

## Rule

Certificate validity is a backend verification result, not a frontend assumption.

---

# KONDISI R6-01 — Kode Referral Disalin

**Figma frame:** `784:3247`

## Exact visible copy

- `REFERRAL • TERSALIN`
- `Kode referral berhasil disalin`
- `参`
- `Kode HIRU-HILMI siap dibagikan. Teman memperoleh diskon saat invoice dibuat, sedangkan reward milikmu aktif setelah pembayaran mereka diverifikasi Admin.`
- `Gunakan Reward`
- `Kembali Profil`

## Actions

- `Gunakan Reward` → `405:7157`
- `Kembali Profil` → `405:6972`

## Fixture rule

`HIRU-HILMI` is visible design fixture copy. Do not make it the permanent referral code for every user.

---

# KONDISI R6-02 — Bagikan Referral

**Figma frame:** `784:3259`

## Exact visible copy

- `REFERRAL • BAGIKAN`
- `Bagikan kode referral`
- `参`
- `Tautan dan template pesan berasal dari backend. Pada aplikasi nyata, aksi ini membuka native share atau WhatsApp dengan kode HIRU-HILMI.`
- `Salin Tautan`
- `Kembali Profil`

## Actions

- `Salin Tautan` → `784:3247`
- `Kembali Profil` → `405:6972`

## Rule

Do not invent the final referral URL, share template, WhatsApp number, or platform-specific share implementation during frontend-only work.

---

# Verified status flows

## Authentication

```text
Reset request
  → Tautan Reset Terkirim
      ├─ Buka Reset Kata Sandi
      └─ Kirim Ulang

Expired reset link
  ├─ Minta Tautan Baru
  └─ Kembali Login

Akun Terverifikasi
  ├─ Lanjut ke Login
  └─ Kembali

Kode Verifikasi Dikirim Ulang
  → Kembali ke Verifikasi
```

## Login entitlement

```text
Login berhasil
  → backend checks Belajar Mandiri entitlement
  → Dashboard LMS
```

## Placement

```text
Placement
  → Placement Diproses
      ├─ Lihat Hasil
      └─ Kembali ke Soal

Placement processing error
  ├─ Coba Lagi
  └─ Kembali ke Landing
```

## Checkout / payment

```text
Checkout
  → Invoice Dibuat
      → Lihat Invoice
          → Menunggu Verifikasi Pembayaran

Payment pending
  → membership remains inactive
```

## Level / learning

```text
Level belum dibeli
  ├─ Beli Level Ini → Renewal / membership path
  └─ Kembali ke Level

Checkpoint
  → Hasil Checkpoint
      ├─ Kembali ke Journey
      └─ Ulangi Latihan

Level selesai
  ├─ Berikan Feedback
  └─ Lihat Progres
```

## Try Out states

```text
Daftar Try Out
  ├─ Akses Terkunci
  ├─ Belum Dimulai
  ├─ Percobaan Habis
  └─ normal Info → Runner

Runner timer expires
  → Waktu Habis & Auto-submit
      → Hasil

Hasil
  ├─ review enabled → Ulasan Jawaban
  └─ review disabled → Ulasan Tidak Tersedia
```

## Community

```text
Komunitas
  → Buat Postingan
      ├─ Publikasikan → Komunitas
      └─ Batal → Komunitas

Detail Thread
  ├─ Lampiran → Pratinjau Lampiran
  ├─ Kirim Balasan → Balasan Terkirim
  ├─ Tambah Gambar → Gambar Ditambahkan
  └─ Report → Laporan Komunitas Terkirim
```

## Library

```text
Perpustakaan
  ├─ no search/filter result → Perpustakaan Kosong
  └─ inaccessible material → Konten Terkunci
       ├─ Lihat Membership
       └─ Kembali ke Library
```

## Certificate

```text
Certificate Center
  ├─ eligible/issued → Detail Sertifikat
  │    ├─ Download → Sertifikat Diunduh
  │    ├─ Share → Sertifikat Siap Dibagikan
  │    └─ Verify → Verifikasi Sertifikat
  └─ not eligible → Sertifikat Belum Tersedia
```

## Notifications

```text
Notification Center
  → Tandai Semua Dibaca
      ├─ Kembali ke Notifikasi
      └─ Ke Dashboard
```

## Referral

```text
Profil
  ├─ Salin Kode → Kode Referral Disalin
  │    └─ Gunakan Reward → Renewal
  └─ Bagikan → Bagikan Referral
       └─ Salin Tautan → Kode Referral Disalin
```

---

# Backend-authority statements verified in Layer F

Layer F repeatedly makes the following product boundaries explicit:

- login destination follows account entitlement;
- reset-link lifetime and one-time validity are backend-owned;
- account verification is separate from membership entitlement;
- Placement processing/results are persisted and server-controlled;
- retry must not create duplicate results;
- invoice nominal/status/referral validation come from backend;
- pending payment does not activate membership;
- Checkpoint score/breakdown/recommendation are dynamic;
- community content can be moderated;
- library access still checks entitlement;
- learning access locks when membership expires while progress stays stored;
- level purchase is independent/non-sequential;
- Try Out access can depend on plan, level, date, Chapter prerequisite, attempt count, and review configuration;
- real Try Out timer/autosave/auto-submit/attempt recording are server-controlled;
- certificate eligibility/issuance/verification are backend-owned;
- notification read status is persisted separately from CTA destination;
- attachment access follows permission;
- community media limits are backend-defined;
- referral links/templates/rewards depend on backend/payment verification.

For the current frontend-first phase, these statements must be **represented visually and structurally without falsely implementing security/business authority in the browser**.

---

# OPEN / fixture values

Do not promote these visible examples into final product constants:

- `Belajar Mandiri` as a simulated entitlement source in frontend preview
- active Chapter `4`
- referral code `HIRU-HILMI`
- Placement recommendation/result data
- invoice nominal
- payment verification estimate
- Checkpoint scores/correct counts/duration
- category defaults
- certificate identifiers
- file size/type/media limits
- Try Out plan/level/date/prerequisite configuration
- attempt counts/reset rules
- actual reset token expiry
- final referral URL/share template/WhatsApp destination

---

# Figma-copy review notes

These are **not permission to rewrite the contract**; they are observations to keep visible for later client/Figma reconciliation.

1. `405:7420` is named `Feedback Terkirim`, but visible copy contains:
   - `PERTANYAAN TERKIRIM`
   - `Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`
   - `Status, Sensei yang menangani, dan waktu respons diperbarui melalui backend.`

2. The active Figma has no top-level status frames numbered `11`, `15`, or `16`.

3. Two different frames use `KONDISI R5` in their names.

4. Some prototype layer names and visible button labels differ. Implementation copy must use the **visible Figma text**, while prototype destination should follow the verified node destination. Examples:
   - node name `Tombol / Buka Dasbor` → visible `Buka Dashboard`
   - node name `Tombol / Kembali Perjalanan` → visible `Kembali ke Journey`
   - node name `Tombol / Kembali Umpan Balik` → visible `Lihat Progres`

5. Status badges intentionally mix Indonesian and English visible strings such as:
   - `Success`
   - `Error`
   - `Processing`
   - `Pending`
   - `Completed`
   - `Confirmation`
   - `Restricted`
   - `Belum Aktif`

Preserve them until the Figma/client source is explicitly revised.

---

# Layer F frontend-first implementation rules

1. Exact visible copy and state meaning follow this contract.
2. Visual styling follows `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse status/confirmation primitives where layout truly repeats; do not create 33 independent design systems.
4. Do not over-abstract business behavior into one generic status engine if that would erase meaningful per-state rules.
5. Preserve exact status labels, punctuation, Japanese symbols, capitalization, and mixed-language strings from Figma.
6. Preserve verified prototype destinations.
7. Do not invent missing conditions or silently “fix” duplicated numbering.
8. Do not correct the Feedback Terkirim copy inconsistency without a Figma/client revision.
9. Membership, level, item, Try Out, certificate, file, community, notification, and referral access must remain distinguishable.
10. Do not treat every lock as an Upgrade modal:
    - some states are expired membership,
    - some are level not purchased,
    - some are item entitlement,
    - some are date-gated,
    - some are attempt-exhausted,
    - some are review-disabled,
    - some are eligibility failures.
11. Keep current frontend mocks deterministic and replaceable.
12. Do not implement Laravel/Sanctum, Postgres, server timer, autosave, idempotency, payment verification, certificate issuance, storage, moderation backend, notification delivery, referral accounting, or secure token handling during this contract-extraction phase.
13. Do not touch unrelated frontend screens while implementing a single status-screen batch later.
14. Validate exact copy against this contract before marking any status screen client-copy-complete.
