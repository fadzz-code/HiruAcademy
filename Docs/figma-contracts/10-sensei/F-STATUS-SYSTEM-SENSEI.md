# F-STATUS-SYSTEM — Page 10 / Belajar dengan Sensei

> Figma source: **Page 10 — E2E / Belajar dengan Sensei** (`388:16`)  
> Layer: **F — Status Sistem** (`388:22`)  
> Visual treatment: follow `Docs/RefrensiHTML/DESIGN.md`.  
> Copy rule: all quoted visible copy below is transcribed verbatim from the active Figma file.

## Contract status

- Layer hierarchy: **VERIFIED**
- Visible copy: **VERIFIED**
- Figma frame IDs: **VERIFIED**
- Explicit prototype destinations: **VERIFIED**
- Runtime/backend-owned behavior: **do not treat frontend mocks as authority**
- Do not paraphrase VERIFIED copy.
- Do not invent missing numbered conditions.
- Do not create a separate route for every compact status state.
- Do not add Backend/API/Zoom/storage/payment implementation while applying this frontend-first contract.

---

# Important numbering / structure facts

The active Layer F contains these families:

- `KONDISI 01–14`
- no top-level `KONDISI 15`
- no top-level `KONDISI 16`
- `KONDISI 17–23`
- `KONDISI R2`
- `KONDISI R4-01` through `R4-05`
- three different frames whose names contain `KONDISI R5`
- `KONDISI R8-01` through `R8-10`

The three `R5` frames are:

- `765:4449` — Feedback Terkirim
- `765:4477` — Level Selesai
- `771:6898` — Draft Pertanyaan Tersimpan

Do not merge or renumber them silently. Use node IDs to disambiguate.

Referral states `R6-01`, `R6-02`, `R6-03` are physically located in Page 10 Layer E and are already documented in `E-SUPPORTING.md`.

---

# Recommended frontend form

Most frames are compact status states around `720px` wide.

Prefer a small reusable presentation system:

```text
Shared Status Dialog
├── success
├── error
├── processing
├── saved
├── confirmation
└── restricted

Shared Access/Availability Dialog
├── content locked
├── membership expired
├── level not purchased
├── Try Out unavailable
├── Zoom unavailable
└── certificate unavailable

Inline / contextual state
├── Checkpoint result
├── Community post form
├── Tanya Sensei submitted/draft
└── Library empty
```

Do **not** create dozens of independent React modal systems.

---

# KONDISI 01 — Login Berhasil — Pengalihan Hak Akses

**Figma frame:** `391:2227`

## Exact visible copy

- `Login berhasil`
- `Sistem memeriksa membership dan entitlement, lalu mengarahkan pengguna ke Dashboard Free, Belajar Mandiri, atau Belajar dengan Sensei.`
- `ℹ`
- `Pengumuman`
- `Tujuan dashboard ditentukan backend berdasarkan akses akun.`
- `Buka Dashboard`

## Action

- `Buka Dashboard` → `419:2690`

## OPEN COPY CONFLICT

Current product decision uses the same shared Login UI for:

- Free
- LMS
- Sensei
- Admin

The active Figma sentence lists only Free, Belajar Mandiri, and Belajar dengan Sensei.

Do not silently add `Admin` to the visible copy. Keep this exact Figma copy in the contract and resolve it in client/Figma copy review before final freeze.

---

# KONDISI 02 — Tautan Reset Terkirim

**Figma frame:** `391:2242`

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

- `Buka Reset Kata Sandi` → `391:1913`
- `Kirim Ulang` → `391:1814`

---

# KONDISI 03 — Tautan Reset Kedaluwarsa

**Figma frame:** `391:2278`

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

- `Minta Tautan Baru` → `391:1814`
- `Kembali Login` → `391:1761`

---

# KONDISI 04 — Akun Terverifikasi

**Figma frame:** `391:2314`

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

- `Lanjut ke Login` → `391:1761`
- `Kembali` → `391:1654`

---

# KONDISI 05 — Placement Diproses

**Figma frame:** `391:2350`

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

- `Lihat Hasil` → `391:1409`
- `Kembali ke Soal` → `391:1291`

---

# KONDISI 06 — Kesalahan Placement

**Figma frame:** `391:2417`

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

- `Coba Lagi` → `391:1291`
- `Kembali ke Landing` → `391:2`

---

# KONDISI 07 — Invoice Dibuat

**Figma frame:** `391:2453`

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

- `Lihat Invoice` → `391:2145`
- `Kembali ke Ringkasan` → `391:1982`

---

# KONDISI 08 — Menunggu Verifikasi Pembayaran

**Figma frame:** `391:2489`

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

- `Kembali ke Invoice` → `391:2145`
- `Tutup` → `391:2145`

## Rule

Pending payment must not activate membership from frontend state.

---

# KONDISI 09 — Hasil Checkpoint

**Figma frame:** `418:7478`

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

## Actions

- `Kembali ke Journey` → `418:786`
- `Ulangi Latihan` → `418:3231`

## Fixture rule

Score, correct count, duration, area values, and recommendation remain dynamic/mock until backend implementation.

---

# KONDISI 10 — Formulir Postingan Komunitas

**Figma frame:** `418:7538`

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

- `Publikasikan` → `425:3073`
- `Batal` → `425:3073`

---

# KONDISI 11 — Tanya Sensei Terkirim

**Figma frame:** `418:7576`

## Exact visible copy

- `PERTANYAAN TERKIRIM`
- `Pertanyaan untuk Sensei berhasil disimpan`
- `✓`
- `Pengumuman`
- `Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`
- `TOPIK`
- `Penggunaan pola kalimat Chapter 4`
- `Status, Sensei yang menangani, dan waktu respons diperbarui melalui backend.`
- `Kembali ke Tanya Sensei`

## Action

- `Kembali ke Tanya Sensei` → `425:3524`

## Fixture rule

Topic, assigned Sensei, status, and response timing are dynamic.

---

# KONDISI 12 — Perpustakaan Kosong

**Figma frame:** `418:7597`

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

- `Reset Filter` → `418:4664`
- `Kembali` → `418:4664`

---

# KONDISI 13 — Konten Terkunci

**Figma frame:** `418:7624`

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

- `Lihat Membership` → `418:7313`
- `Kembali ke Library` → `418:4664`

## Important entitlement rule

Sensei is the highest student tier, but this state still exists because **content/item/level entitlement can differ from tier entitlement**.

Do not interpret this as a generic “upgrade Sensei to something higher” prompt.

---

# KONDISI 14 — Keanggotaan Kedaluwarsa

**Figma frame:** `418:7651`

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

- `Perpanjang Membership` → `418:7313`
- `Lihat Profil` → `418:7128`

---

# KONDISI 17 — Sertifikat Belum Tersedia

**Figma frame:** `418:7732`

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

- `Lihat Kriteria` → `418:6119`
- `Kembali` → `418:6119`

---

# KONDISI 18 — Laporan Komunitas Terkirim

**Figma frame:** `418:7759`

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

- `Kembali ke Community` → `425:3073`
- `Tutup` → `425:3073`

---

# KONDISI 19 — Jadwal Zoom Kosong

**Figma frame:** `419:3922`

## Exact visible copy

- `ZOOM • EMPTY`
- `Belum ada sesi pada periode ini`
- `Processing`
- `空`
- `Jadwal akan muncul setelah cohort dan sesi dipublikasikan admin.`
- `Backend status`
- `Dynamic schedule`
- `Entitlement check`
- `Kembali Jadwal`
- `Lihat Replay`

## Actions

- `Kembali Jadwal` → `419:2913`
- `Lihat Replay` → `419:3437`

## Implementation form

Prefer an empty state/dialog tied to the Schedule screen, not a new standalone route.

---

# KONDISI 20 — Tautan Zoom Belum Tersedia

**Figma frame:** `419:3949`

## Exact visible copy

- `ZOOM • LINK UNAVAILABLE`
- `Link Zoom belum aktif`
- `Unavailable`
- `鍵`
- `Link tersedia sesuai waktu, status sesi, dan konfigurasi admin.`
- `Backend status`
- `Dynamic schedule`
- `Entitlement check`
- `Kembali ke Detail`
- `Lihat Jadwal`

## Actions

- `Kembali ke Detail` → `419:3197`
- `Lihat Jadwal` → `419:2913`

## Rule

Do not hardcode a Zoom URL merely to make the button work.

---

# KONDISI 21 — Replay Diproses

**Figma frame:** `419:3976`

## Exact visible copy

- `REPLAY • PROCESSING`
- `Replay sedang diproses`
- `Processing`
- `再`
- `Rekaman, transkrip, dan materi sedang disiapkan sebelum dipublikasikan.`
- `Backend status`
- `Dynamic schedule`
- `Entitlement check`
- `Kembali ke Replay`
- `Lihat Jadwal`

## Actions

- `Kembali ke Replay` → `419:3437`
- `Lihat Jadwal` → `419:2913`

---

# KONDISI 22 — Kesalahan Memuat Replay

**Figma frame:** `419:4034`

## Exact visible copy

- `REPLAY • ERROR`
- `Replay belum dapat dimuat`
- `Error`
- `!`
- `Coba kembali atau ulangi pemuatan. Status error dan sumber video diperiksa backend.`
- `Backend status`
- `Dynamic schedule`
- `Entitlement check`
- `Coba Lagi`
- `Kembali ke List`

## Actions

- `Coba Lagi` → `419:3711`
- `Kembali ke List` → `419:3437`

---

# KONDISI 23 — Pengingat Kelas Tersimpan

**Figma frame:** `419:4061`

## Exact visible copy

- `CLASS • REMINDER`
- `Pengingat kelas tersimpan`
- `Saved`
- `知`
- `Channel, lead time, dan delivery mengikuti preference serta konfigurasi kelas.`
- `Backend status`
- `Dynamic schedule`
- `Entitlement check`
- `Kembali ke Kelas`
- `Lihat Jadwal`

## Actions

- `Kembali ke Kelas` → `419:3197`
- `Lihat Jadwal` → `419:2913`

---

# KONDISI R2 — Level Belum Dibeli

**Figma frame:** `730:4009`

## Exact visible copy

- `LEVEL • BELUM DIBELI`
- `Level ini belum aktif pada akunmu`
- `Belum Aktif`
- `鍵`
- `Level dapat dibeli langsung tanpa menyelesaikan level lain. Cohort, jadwal kelas, replay, dan progress level aktif tetap tersimpan.`
- `Level independen`
- `Akses dari backend`
- `Cohort tetap aman`
- `Beli Level Ini`
- `Kembali ke Level`

## Actions

- `Beli Level Ini` → `418:7313`
- `Kembali ke Level` → `418:566`

## Rule

Level purchasing remains independent/non-sequential, while other active cohort data remains intact.

---

# KONDISI R4-01 — Akses Try Out Terkunci

**Figma frame:** `752:3995`

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

- `Lihat Paket Level` → `418:7313`
- `Kembali ke Try Out` → `418:3518`

## Rule

Even Sensei Try Out access can be item-specific. Do not treat all Try Out states as universally open merely because Sensei owns the feature family.

---

# KONDISI R4-02 — Try Out Belum Dimulai

**Figma frame:** `752:4016`

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

- `Kembali ke Daftar` → `418:3518`
- `Kembali Dashboard` → `419:2690`

---

# KONDISI R4-03 — Percobaan Habis

**Figma frame:** `752:4037`

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

- `Lihat Hasil Terakhir` → `418:4235`
- `Kembali ke Daftar` → `418:3518`

---

# KONDISI R4-04 — Waktu Habis & Auto-submit

**Figma frame:** `752:4058`

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

- `Lihat Hasil` → `418:4235`
- `Kembali ke Daftar` → `418:3518`

## Rule

Real timer, autosave, auto-submit, and attempt authority belong to backend later.

---

# KONDISI R4-05 — Ulasan Tidak Tersedia

**Figma frame:** `752:4079`

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

- `Kembali ke Hasil` → `418:4235`
- `Kembali ke Daftar` → `418:3518`

---

# KONDISI R5 — Feedback Terkirim

**Figma frame:** `765:4449`

## Exact visible copy

- `FEEDBACK • TERSIMPAN`
- `Feedback akhir level berhasil dikirim`
- `Belum Aktif`
- `鍵`
- `Masukan tersimpan. Izin testimoni, bila dipilih, tetap menunggu moderasi Admin.`
- `FEEDBACK • TERSIMPAN`
- `Nilai tersimpan`
- `Backend authority`
- `Kembali ke Hasil`
- `Kembali ke Daftar`

## Actions

Visible labels and verified destinations:

- `Kembali ke Hasil` → `418:4930`
- `Kembali ke Daftar` → `419:2690`

## Copy/action naming note

The visible labels are generic `Kembali ke Hasil` / `Kembali ke Daftar`, while the destinations are Progress and Dashboard. Preserve visible Figma copy until client/Figma revision.

---

# KONDISI R5 — Level Selesai

**Figma frame:** `765:4477`

## Exact visible copy

- `LEVEL SELESAI • FEEDBACK`
- `Selamat, seluruh Chapter pada level ini selesai`
- `Belum Aktif`
- `鍵`
- `Feedback akhir level tersedia. Jadwal, replay, dan Tanya Sensei tetap tersimpan pada cohort aktif.`
- `LEVEL SELESAI • FEEDBACK`
- `Nilai tersimpan`
- `Backend authority`
- `Kembali ke Hasil`
- `Kembali ke Daftar`

## Actions

- `Kembali ke Hasil` → `765:4155` — Feedback Penyelesaian Level
- `Kembali ke Daftar` → `418:4930` — Progress

## Naming note

The visible button copy does not describe its destination very precisely. Do not silently rewrite it.

---

# KONDISI R5 — Draft Pertanyaan Tersimpan

**Figma frame:** `771:6898`

## Exact visible copy

- `Draft Pertanyaan Tersimpan`
- `Draft disimpan pada akun dan dapat dilanjutkan dari tab Draft.`
- `✓`
- `Pengumuman`
- `Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`
- `TOPIK`
- `Konteks pertanyaan tetap tersimpan`
- `Draft disimpan pada akun dan dapat dilanjutkan dari tab Draft.`
- `Kembali ke Tanya Sensei`

## Action

- `Kembali ke Tanya Sensei` → `425:3524`

## OPEN COPY CONSISTENCY

This is a **draft** state, but it includes:

`Pertanyaan tersimpan dan menunggu respons sesuai pengaturan admin.`

That wording implies a submitted question rather than an unsent draft.

Do not silently fix it; preserve the verified Figma copy and flag for later client/Figma review.

---

# KONDISI R8-01 — Kode Verifikasi Dikirim Ulang

**Figma frame:** `814:4069`

## Exact visible copy

- `AKUN • VERIFIKASI`
- `Kode verifikasi dikirim ulang`
- `Kode baru dikirim dan masa berlaku mengikuti aturan backend.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Verifikasi`
- `Tutup`

## Actions

- `Kembali ke Verifikasi` → `391:1654`
- `Tutup` → `391:1654`

---

# KONDISI R8-02 — Semua Notifikasi Dibaca

**Figma frame:** `814:4083`

## Exact visible copy

- `NOTIFIKASI`
- `Semua notifikasi ditandai sudah dibaca`
- `Status baca diperbarui dan CTA tetap mengikuti sesi serta entitlement.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Notifikasi`
- `Ke Dashboard`

## Actions

- `Kembali ke Notifikasi` → `418:6814`
- `Ke Dashboard` → `419:2690`

---

# KONDISI R8-03 — Pratinjau Lampiran Community

**Figma frame:** `814:4097`

## Exact visible copy

- `COMMUNITY`
- `Lampiran thread dibuka`
- `Lampiran tersedia sesuai permission thread dan aturan moderasi.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `425:3293`
- `Ke Community` → `425:3073`

---

# KONDISI R8-04 — Balasan Community Terkirim

**Figma frame:** `814:4111`

## Exact visible copy

- `COMMUNITY`
- `Balasan berhasil dikirim`
- `Balasan tersimpan dan dapat dimoderasi Admin.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `425:3293`
- `Ke Community` → `425:3073`

---

# KONDISI R8-05 — Gambar Ditambahkan

**Figma frame:** `814:4125`

## Exact visible copy

- `COMMUNITY`
- `Gambar berhasil ditambahkan`
- `Media mengikuti batas ukuran, tipe file, dan moderasi backend.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Thread`
- `Ke Community`

## Actions

- `Kembali ke Thread` → `425:3293`
- `Ke Community` → `425:3073`

## OPEN limits

Do not invent:

- maximum file size
- MIME allowlist
- media dimensions
- storage path
- moderation threshold

---

# KONDISI R8-06 — Sertifikat Diunduh

**Figma frame:** `814:4139`

## Exact visible copy

- `SERTIFIKAT`
- `Sertifikat siap diunduh`
- `File berasal dari versi terbit dan ID verifikasi tetap tercatat.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `418:6352`
- `Ke Profil` → `418:7128`

---

# KONDISI R8-07 — Sertifikat Siap Dibagikan

**Figma frame:** `814:4153`

## Exact visible copy

- `SERTIFIKAT`
- `Tautan sertifikat siap dibagikan`
- `Tautan publik memakai ID verifikasi tanpa membuka data akun sensitif.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `418:6352`
- `Ke Profil` → `418:7128`

---

# KONDISI R8-08 — Verifikasi Sertifikat

**Figma frame:** `814:4167`

## Exact visible copy

- `SERTIFIKAT`
- `Sertifikat valid`
- `Pemilik, level, cohort, dan tanggal terbit cocok dengan data backend.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Sertifikat`
- `Ke Profil`

## Actions

- `Kembali ke Sertifikat` → `418:6352`
- `Ke Profil` → `418:7128`

## Rule

Certificate validation remains a backend result.

---

# KONDISI R8-09 — Replay Tersimpan

**Figma frame:** `814:4181`

## Exact visible copy

- `REPLAY KELAS`
- `Replay disimpan ke daftar`
- `Replay ditambahkan ke daftar tersimpan pengguna dan tetap mengikuti visibility cohort.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Replay`
- `Lihat Daftar Replay`

## Actions

- `Kembali ke Replay` → `419:3711`
- `Lihat Daftar Replay` → `419:3437`

## Rule

Saving a replay does not override cohort visibility/entitlement.

---

# KONDISI R8-10 — Lampiran Pertanyaan Ditambahkan

**Figma frame:** `814:4195`

## Exact visible copy

- `TANYA SENSEI`
- `Lampiran berhasil ditambahkan`
- `File akan dikirim bersama pertanyaan dan hanya dapat diakses Sensei atau tim akademik terkait.`
- `Perubahan dicatat backend dan mengikuti cohort serta entitlement aktif.`
- `Kembali ke Pertanyaan`
- `Ke Dashboard`

## Actions

- `Kembali ke Pertanyaan` → `425:3524`
- `Ke Dashboard` → `419:2690`

## Privacy rule

Question attachments must not be exposed as public files.

---

# Verified main state flows

## Shared authentication / commercial

```text
Login
  → Login Berhasil
      → Dashboard Sensei

Forgot Password
  → Reset Link Sent
  → Reset / Expired

Verification
  → Account Verified

Checkout
  → Invoice Created
  → Payment Pending
```

## Learning

```text
Checkpoint
  → Hasil Checkpoint
      ├─ Journey
      └─ Latihan Harian

Unpurchased level
  → Level Belum Dibeli
      ├─ Renewal / purchase flow
      └─ back to Level
```

## Try Out

```text
Daftar Try Out
  ├─ normal → Info → Runner → Hasil → Review
  ├─ Akses Terkunci
  ├─ Belum Dimulai
  ├─ Attempt Habis
  └─ Review Tidak Tersedia

Runner timeout
  → Waktu Habis & Auto-submit
  → Hasil
```

## Community / Tanya Sensei

```text
Community
  → Buat Postingan
  → publish / cancel

Thread
  ├─ attachment preview
  ├─ reply submitted
  ├─ image added
  └─ report submitted

Tanya Sensei
  ├─ submit → Tanya Sensei Terkirim
  ├─ draft → Draft Pertanyaan Tersimpan
  └─ attachment → Lampiran Pertanyaan Ditambahkan
```

## Schedule / Replay

```text
Jadwal
  ├─ empty period → Jadwal Zoom Kosong
  └─ Detail Kelas
       ├─ Zoom link unavailable
       ├─ reminder saved
       └─ Replay

Replay List
  ├─ Replay processing
  └─ Replay Player
       ├─ load error
       └─ replay saved
```

## Certificate

```text
Certificate Center
  ├─ unavailable criteria
  └─ Detail Certificate
       ├─ downloaded
       ├─ share ready
       └─ verified
```

## Level completion / feedback

```text
Final Chapter
  → Level Selesai
  → Feedback Penyelesaian Level
  → Feedback Terkirim
```

---

# Backend-authority boundaries verified in Layer F

The Figma explicitly treats the following as backend/admin authority later:

- login entitlement routing
- verification/reset token validity
- Placement processing and retry/idempotency
- invoice/payment status
- learning result/progress persistence
- item/level/content entitlement
- membership expiry
- certificate eligibility/issuance/verification
- Try Out access/date/prerequisite/attempt/review/timer/autosave/auto-submit
- community moderation
- file/media permissions
- Zoom schedule/link availability
- cohort visibility
- replay processing/publication/source
- reminder channel/lead time/delivery
- Tanya Sensei routing/handler/response time
- notification read state
- referral/payment activation elsewhere

Current frontend work should visually represent these states with deterministic mocks without claiming real server authority.

---

# Figma copy review notes

Do not rewrite these automatically.

1. `KONDISI 01` shared-login copy does not mention Admin despite current shared-login product decision.
2. No top-level `KONDISI 15` or `16` appears in active Layer F.
3. Three different frames are named `KONDISI R5`.
4. `Draft Pertanyaan Tersimpan` contains a sentence implying the question is waiting for a response.
5. Feedback/Level-Selesai buttons use generic visible labels whose destinations are Progress/Dashboard/Feedback rather than literal “Hasil/Daftar”.
6. Status labels intentionally mix languages, for example:
   - `Success`
   - `Error`
   - `Processing`
   - `Pending`
   - `Completed`
   - `Confirmation`
   - `Restricted`
   - `Unavailable`
   - `Saved`
   - `Belum Aktif`

Preserve them until the active Figma/client source changes.

---

# Layer F frontend-first implementation rules

1. Exact copy and destination behavior come from this contract.
2. Visual styling comes from `Docs/RefrensiHTML/DESIGN.md`.
3. Reuse compact shared status/dialog primitives where appropriate.
4. Do not make every state a standalone Next.js route.
5. Do not reduce every lock to an Upgrade modal.
6. Distinguish:
   - level not purchased,
   - item/content entitlement,
   - expired membership,
   - scheduled Try Out,
   - exhausted attempts,
   - disabled review,
   - Zoom unavailable,
   - replay processing/error,
   - certificate eligibility,
   - cohort visibility.
7. Sensei-owned core features must not show a lower-tier upgrade prompt.
8. Preserve cohort-specific state in Schedule, Replay, certificate verification, and supporting features.
9. Keep fixtures deterministic and replaceable.
10. Do not build real Laravel/Sanctum, Postgres, Zoom integration, replay storage/transcoding, file storage, server timer/autosave, payment verification, moderation backend, certificate issuance, notification delivery, or Ask Sensei routing during this contract-extraction/frontend phase.
11. Do not silently correct the OPEN copy issues documented above.
12. Validate exact client-visible copy against this file before marking Page 10 Layer F complete.
